/*
* @Author: ym 
* @Date: 2018-02-15 15:26:28 
 * @Last Modified by: ym
 * @Last Modified time: 2018-02-16 13:42:50
 */

const os = require('os');
const path = require('path');
const fse = require('fs-extra');
const homedir = os.userInfo().homedir;
const mergeCopy = require('./mergeCopy');
const options = require('./options');

const realFunc = {
  doLoad: () => {},
  doSave: () => {},
};

let isHas = fse.pathExistsSync(homedir + '/' + '/npmbackuprc.js');
if (!isHas) {
  fse.copySync(
    __dirname + '/npmbackuprc.js',
    homedir + '/' + '/npmbackuprc.js',
  );
}

function loadBackuprc() {
  let rcUrl = homedir + '/' + '/npmbackuprc.js';
  if (options.isUseSource) {
    rcUrl = path.resolve(__dirname, '../npmbackuprc-all.js');
  }
  let { to, libs, ignores } = require(rcUrl);
  to = to.replace('~', homedir);
  for (let i = 0, l = libs.length; i < l; i++) {
    libs[i] = libs[i].replace('~', homedir);
  }
  for (let i = 0, l = ignores.length; i < l; i++) {
    ignores[i] = ignores[i].replace('~', homedir);
  }
  return { to, libs, ignores };
}

function getPaths(val = '', to) {
  let fromPath = val;
  let toPath = to + options.tag + fromPath;
  return { fromPath, toPath };
}

function doInit(val) {
  if (val === 'all') {
    fse.copySync(
      __dirname + '/npmbackuprc-all.js',
      homedir + '/' + '/npmbackuprc.js',
    );
  } else {
    fse.copySync(
      __dirname + '/npmbackuprc.js',
      homedir + '/' + '/npmbackuprc.js',
    );
  }
}

function doSave(val) {
  const { libs, to, ignores } = loadBackuprc();
  realFunc.doSave = () => {
    libs.map(v => {
      let { fromPath, toPath } = getPaths(v, to);
      mergeCopy({
        fromPath,
        toPath,
        ignores,
      });
    });
  };
}

function doLoad(val) {
  const { libs, to, ignores } = loadBackuprc();
  realFunc.doLoad = () => {
    libs.map(v => {
      let { fromPath, toPath } = getPaths(v, to);
      mergeCopy({
        toPath,
        fromPath,
        ignores,
      });
    });
  };
}

module.exports = {
  realFunc,
  doSave,
  doInit,
  doLoad,
};
