#!/usr/bin/env node
/*
* @Author: ym 
* @Date: 2018-02-15 15:26:28 
 * @Last Modified by: ym
 * @Last Modified time: 2018-02-16 13:42:50
 */

const package = require('../package.json');
const options = require('./options');
const { realFunc, doInit, doLoad, doSave } = require('./io');
const argv = process.argv.splice(2);

for (let i = 0, l = argv.length; i < l; i++) {
  const ele = argv[i];
  // config
  if (ele === '-d' || ele === '--develop') {
    options.isUseDevelop = true;
  }
  if (ele === '-v' || ele === '--version') {
    console.log(package.version);
  }
  if (ele === '-h' || ele === '--hidden-log') {
    options.isLogCopyFile = false;
  }
  if (ele === '-t' || ele === '--tag') {
    if (argv.length >= i + 1) {
      options.tag = argv[i + 1] || 'default';
    } else {
      console.log('no value of --tag');
    }
  }
  if (ele === 'init') {
    let param;
    if (argv.length >= i + 1) {
      param = argv[i + 1];
    }
    doInit(param);
  } else if (ele === 'save') {
    doSave();
  } else if (ele === 'load') {
    doLoad();
  } else {
    // options.error = 'No input params';
  }
}

if (options.error) {
  console.warn(options.error);
} else {
  console.time('Done')
  console.log('Sync files...')
  realFunc.doLoad();
  realFunc.doSave();
  console.timeEnd(`Done`);
}
