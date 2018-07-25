const fse = require('fs-extra');
const path = require('path');
const md5 = require('blueimp-md5');
const options = require('./options');
const jszip = require('jszip');
let allDirIgnores = [];
let allFileIgnores = [];
let rootDirIgnores = [];
let rootFileIgnores = [];
let rootPath;

function mergeCopy({ fromPath = '', toPath = '', ignores }) {
  if (ignores) {
    for (let i = 0, l = ignores.length; i < l; i++) {
      let ele = ignores[i] || '';
      let isAllCheck = false;
      if (ele.indexOf('*/') > -1) {
        isAllCheck = true;
      }
      if (ele.indexOf('/') > -1 && ele.charAt(ele.length - 1) !== '/') {
        isAllCheck = true;
      }
      if (ele.indexOf('/') > 0) {
        isAllCheck = true;
      }
      if (isAllCheck) {
        if (ele.charAt(ele.length - 1) === '/') {
          ele = ele.replace('*/', '');
          ele = ele.replace('**/', '');
          ele = ele.substring(0, ele.length - 1);
          allDirIgnores.push(ele);
        } else {
          ele = ele.replace('*/', '');
          allFileIgnores.push(ele);
          if (options.dirIgnoreSlash) {
            allDirIgnores.push(ele);
          }
        }
      } else {
        if (ele.charAt(ele.length - 1) === '/') {
          ele = ele.substring(0, ele.length - 1);
          rootDirIgnores.push(ele);
        } else {
          rootFileIgnores.push(ele);
          if (options.dirIgnoreSlash) {
            rootDirIgnores.push(ele);
          }
        }
      }
    }
  }

  let fromStat = null;
  let toStat = null;
  if (fse.existsSync(fromPath)) {
    fromStat = fse.lstatSync(fromPath);
  }
  if (fse.existsSync(toPath)) {
    toStat = fse.lstatSync(toPath);
  }
  if (isChangeNeedCopy(fromStat, toStat, fromPath, toPath)) {
    const isRootDir = path.dirname(fromPath) === rootPath;
    if (fromStat.isDirectory()) {
      const checkIgnores = isRootDir ? rootDirIgnores : allDirIgnores;
      if (isNeedIgnore(checkIgnores, fromPath) === false) {
        const files = fse.readdirSync(fromPath);
        for (let i = 0, l = files.length; i < l; i++) {
          const ele = files[i];
          let nextFromPath, nextToPath;
          if (fromPath.charAt(fromPath.length - 1) === '/') {
            nextFromPath = fromPath + ele;
            nextToPath = toPath + ele;
          } else {
            nextFromPath = fromPath + '/' + ele;
            nextToPath = toPath + '/' + ele;
          }
          mergeCopy({
            fromPath: nextFromPath,
            toPath: nextToPath,
          });
        }
      }
    } else if (fromStat.isFile()) {
      const checkIgnores = isRootDir ? rootFileIgnores : allFileIgnores;
      if (isNeedIgnore(checkIgnores, fromPath) === false) {
        if (options.isLogCopyFile === true) {
          console.log(fromPath);
        }
        fse.ensureDirSync(path.dirname(toPath));
        fse.copySync(fromPath, toPath);
      }
    }
  }
}

function isNeedIgnore(checkIgnores, fromPath) {
  let isNeedIgnore = false;
  for (let i = 0, l = checkIgnores.length; i < l; i++) {
    const ele = checkIgnores[i];
    if (ele.indexOf('/') > -1) {
      if (fromPath.indexOf(ele) > -1) {
        isNeedIgnore = true;
      }
    } else {
      if (ele === path.basename(fromPath)) {
        isNeedIgnore = true;
      }
    }
  }
  return isNeedIgnore;
}

function isChangeNeedCopy(
  fromStat = new fse.Stats(),
  toStat = new fse.Stats(),
  fromPath = '',
  toPath = '',
) {
  let needCopy = false;
  if (fromStat) {
    if (fromStat.isDirectory()) {
      if (options.isZipMiniFiles) {
        const files = fse.readdirSync(fromPath);
        const equilSize = fromStat.size / files.length;
        if (
          equilSize < 2048 &&
          files.length > 20 &&
          fromStat.size < 1024 * 10 // 10mb
        ) {
          needCopy = false;
          let mtimeTree = {};
          for (let i = 0, l = files.length; i < l; i++) {
            const filePath = fromPath + '/' + files[i];
            const fileStat = fse.lstatSync(filePath);
            mtimeTree[filePath] = fileStat.mtimeMs;
          }
          fse.writeFile(
            toPath + '_npmbackup_mtime.json',
            JSON.stringify(mtimeTree),
          );
          const zip = new jszip();
          archiveFilesToZip(zip, fromPath, toPath);
          zip.generateAsync({ type: 'uint8array' }).then(function(content) {
            fse.writeFileSync(toPath + '_npmbackup_uint.zip', content);
          });
        } else {
          needCopy = true;
        }
      } else {
        needCopy = true;
      }
    } else if (!toStat) {
      needCopy = true;
    } else if (fromStat.mtimeMs > toStat.mtimeMs) {
      if (fromStat.size > 4096) {
        needCopy = fromStat.size !== toStat.size;
      } else if (options.useMd5) {
        if (fromStat.isFile()) {
          let fromData = fse.readFileSync(fromPath);
          let toData = fse.readFileSync(toPath);
          needCopy = md5(fromData) !== md5(toData);
        }
      } else {
        needCopy = true;
      }
    }
  }
  return needCopy;
}

function archiveFilesToZip(zip = new jszip(), fromPath = '', toPath = '') {
  const files = fse.readdirSync(fromPath);
  for (let i = 0, l = files.length; i < l; i++) {
    const filePath = fromPath + '/' + files[i];
    const fileStat = fse.lstatSync(filePath);
    if (fileStat.isDirectory()) {
      archiveFilesToZip(
        zip.folder(files[i]),
        filePath,
        toPath + '/' + files[i],
      );
    } else {
      zip.file(files[i], fse.readFileSync(filePath));
    }
  }
}

module.exports = mergeCopy;
