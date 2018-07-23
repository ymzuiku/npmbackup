#!/usr/bin/env node
/*
* @Author: ym 
* @Date: 2018-02-15 15:26:28 
 * @Last Modified by: ym
 * @Last Modified time: 2018-02-16 13:42:50
 */

const os = require('os')
const fs = require('fs-extra')
const path = require('path')
const R = require('ramda')
const package = require('./package.json')
const program = require('commander');
const homedir = os.userInfo().homedir

let isHas = fs.pathExistsSync(homedir + '/' + '/npmbackuprc.json')
if (!isHas) {
  fs.copySync(__dirname + '/npmbackuprc.json', homedir + '/' + '/npmbackuprc.json')
}

var { to, libs } = require(homedir + '/' + '/npmbackuprc.json')
if(to[0] === '~'){
  to = to.replace('~', homedir)
}

var _doSave = ()=>{}, _doLoad = ()=>{}

var tag = 'defalut'
function setTag(val) {
  tag = val || 'defalut'
}

function getPaths(val = '') {
  console.log(val)
  let fromVal  = val
  let toVal = val
  if (fromVal[0] === '~') {
    fromVal = fromVal.replace('~', homedir)
    toVal = toVal.replace('~/', '')
  }
  var fromFile = fromVal
  var toFile = to + tag + '/' + val
  return { fromFile, toFile }
}

function doSave(val) {
  _doSave = function(){
    libs.map((v) => {
      let { fromFile, toFile } = getPaths(v)
      let isHas = fs.pathExistsSync(fromFile)
      if (isHas) {
        fs.copySync(fromFile, toFile)
      }
    })
  }
}

function doLoad(val) {
  _doLoad = function(){
    libs.map((v) => {
      let { fromFile, toFile } = getPaths(v)
      let isHas = fs.pathExistsSync(toFile)
      if (isHas) {
        fs.copySync(toFile, fromFile)
      }
    })
  }
}

function init(val) {
  if (val === 'all') {
    fs.copySync(__dirname + '/npmbackuprc-all.json', homedir + '/' + '/npmbackuprc.json')
  } else {
    fs.copySync(__dirname + '/npmbackuprc.json', homedir + '/' + '/npmbackuprc.json')
  }
}


program
  .version(package.version, '-v, --version')
  .option('-t, --tag <n>', 'Add peppers', setTag)
  .option('init <n>', 'init npmbackuprc', init)
  .option('init, --init', 'init npmbackuprc', init)
  .option('save, --save', 'Add peppers', doSave)
  .option('load, --load', 'Add peppers', doLoad)
  .parse(process.argv);

  // 最后运行之前保存的函数
  console.log(`Start...`)
  _doSave()
  _doLoad()
  console.log(`Done!`)