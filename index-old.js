#!/usr/bin/env node
/*
* @Author: ym 
* @Date: 2018-02-15 15:26:28 
 * @Last Modified by: ym
 * @Last Modified time: 2018-02-16 13:42:50
 */

const os = require('os');
const fse = require('fs-extra');
const package = require('./package.json');
const program = require('commander');
const homedir = os.userInfo().homedir;

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
  const { to, libs } = require(homedir + '/' + '/npmbackuprc.js');
  if (to[0] === '~') {
    to = to.replace('~', homedir);
  }
  return { to, libs };
}

const options = {
  tag: 'default',
  isUseSource: false,
};

function setTag(val) {
  options.tag = val || 'default';
}
function setUseSourceList() {
  options.isUseSource = true;
}

function getPaths(val = '', to) {
  const fromVal = val;
  const toVal = val;
  if (fromVal[0] === '~') {
    fromVal = fromVal.replace('~', homedir);
    toVal = toVal.replace('~/', '');
  }
  const fromFile = fromVal;
  const toFile = to + options.tag + '/' + val;
  return { fromFile, toFile };
}

function init(val) {
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
  const { libs, to } = loadBackuprc();
  realFunc.doSave = () => {
    libs.map(v => {
      const { fromFile, toFile } = getPaths(v, to);
      const isHas = fse.pathExistsSync(fromFile);
      if (isHas) {
        fse.copySync(fromFile, toFile);
      }
    });
  };
}

function doLoad(val) {
  const { libs, to } = loadBackuprc();
  realFunc.doLoad = () => {
    libs.map(v => {
      const { fromFile, toFile } = getPaths(v, to);
      const isHas = fse.pathExistsSync(toFile);
      if (isHas) {
        fse.copySync(toFile, fromFile);
      }
    });
  };
}

// 最后运行之前保存的函数
program
  .version(package.version, '-v, --version')
  .option('-s, --source', 'use source all-list', setUseSourceList)
  .option('-t, --tag <n>', 'Add peppers', setTag)
  .option('init <n>', 'init npmbackuprc', init)
  .option('init, --init', 'init npmbackuprc', init)
  .option('save, --save', 'Add peppers', doSave)
  .option('load, --load', 'Add peppers', doLoad)
  .parse(process.argv);

console.log(`Start...`);
realFunc.doLoad();
realFunc.doSave();
console.log(`Done!`);
