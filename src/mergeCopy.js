const fse = require('fs-extra');
const path = require('path');

function mergeCopy({ fromPath, toPath, ignores }) {
  let fromStat, toStat, needCopy;
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
  console.log('fromStat', fromPath, fromStat);
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
  console.log(needCopy);
  if (needCopy) {
    if (fromStat.isDirectory) {
      console.log('is dir');
      const files = fse.readdirSync(fromPath, 'utf8');
      for (let i = 0, l = files.length; i < l; i++) {
        const ele = files[i];
        console.log(fromPath + ele, toPath + ele);
        mergeCopy(fromPath + ele, toPath + ele);
      }
    } else {
      console.log(',,', 'no dir');
      console.log('copyTo: ', toPath);
      fse.copyFileSync(fromPath, toPath);
    }
  }
}

module.exports = mergeCopy;
