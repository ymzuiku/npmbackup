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
    path.resolve(__dirname, '../npmbackuprc.js'),
    homedir + '/' + '/npmbackuprc.js',
  );
}

function loadBackuprc() {
  let rcUrl = homedir + '/' + '/npmbackuprc.js';
  if (options.isUseDevelop) {
    rcUrl = path.resolve(__dirname, '../npmbackuprc/npmbackuprc-develop.js');
  }
  let { to = '', libs = [], ignores = [], zips = [] } = require(rcUrl);
  to = to.replace('~', homedir);
  if (to.charAt(to.length - 1) !== '/') {
    to += '/';
  }
  for (let i = 0, l = libs.length; i < l; i++) {
    libs[i] = libs[i].replace('~', homedir);
  }
  for (let i = 0, l = ignores.length; i < l; i++) {
    ignores[i] = ignores[i].replace('~', homedir);
  }
  for (let i = 0, l = zips.length; i < l; i++) {
    zips[i] = zips[i].replace('~', homedir);
  }
  return { to, libs, ignores, zips };
}

function getPaths(val = '', to) {
  let fromPath = val;
  let toSubPath = fromPath.replace(homedir, '~');
  if (toSubPath.charAt(0) !== '/') {
    toSubPath = '/' + toSubPath;
  }
  let toPath = to + options.tag + toSubPath;
  return { fromPath, toPath };
}

function doInit(val) {
  if (val === 'develop' || val === 'd') {
    fse.copySync(
      path.resolve(__dirname, '../npmbackuprc/npmbackuprc-develop.js'),
      homedir + '/' + '/npmbackuprc.js',
    );
    console.log(`Use develop config...`);
  } else if (val === 'clear') {
    fse.copySync(
      path.resolve(__dirname, '../npmbackuprc/npmbackuprc-clear.js'),
      homedir + '/' + '/npmbackuprc.js',
    );
    console.log(`Use clear config...`);
  } else {
    fse.copySync(
      path.resolve(__dirname, '../npmbackuprc/npmbackuprc-default.js'),
      homedir + '/' + '/npmbackuprc.js',
    );
    console.log(`Use default config...`);
  }
  console.log(`Create file in "~/npmbackuprc.js" , please edit it.`);
}

function doSave(val) {
  const { libs, to, ignores, zips } = loadBackuprc();
  realFunc.doSave = () => {
    libs.map(v => {
      let { fromPath, toPath } = getPaths(v, to);
      mergeCopy({
        fromPath,
        toPath,
        ignores,
        zips,
        type:'save',
      });
    });
  };
}

function doLoad(val) {
  const { libs, to, ignores, zips } = loadBackuprc();
  realFunc.doLoad = () => {
    libs.map(v => {
      let { fromPath, toPath } = getPaths(v, to);
      mergeCopy({
        fromPath: toPath,
        toPath: fromPath,
        ignores,
        zips,
        type:'load',
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
