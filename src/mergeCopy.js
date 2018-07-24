const fse = require('fs-extra');
const path = require('path');

function mergeCopy({ fromPath, toPath, ignores }) {
  let fromStat, toStat, needCopy;
  console.log(fromPath, toPath);
  if (fse.existsSync(fromPath)) {
    fromStat = fse.lstatSync(fromPath);
  }
  if (fse.existsSync(toPath)) {
    toStat = fse.lstatSync(toPath) || {
      atimeMs: -1,
      blksize: -1,
      isDirectory: false,
    };
  }
  if (fromStat) {
    if (!toStat) {
      needCopy = true;
    } else if (
      fromStat.atimeMs < toStat.atimeMs &&
      fromStat.blksize !== toStat.blksize
    ) {
      needCopy = true;
    }
  }
  if (needCopy) {
    if (fromStat.isDirectory) {
      const files = fse.readdirSync(fromPath, 'utf8');
      for (let i = 0, l = files.length; i < l; i++) {
        const ele = files[i];
        mergeCopy(ele, toPath + '/' + ele);
      }
    } else {
      fse.copyFileSync(fromPath, toPath);
      console.log('copyTo: ', toPath);
    }
  }
}

module.exports = mergeCopy;
