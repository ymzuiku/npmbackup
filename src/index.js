const { realFunc, doInit, doLoad, doSave } = require('./io');

function run() {
  if (options.error) {
    console.warn(options.error);
  } else {
    console.time('Done');
    console.log('Sync files...');
    realFunc.doLoad();
    realFunc.doSave();
    console.log(`merged ${options.mergeFilesCount} files`);
    console.timeEnd(`Done`);
  }
}

function api({ type, isDevelop, option }) {
  options = { ...options, option };
  if (type === 'init') {
    doInit();
  } else if (type === 'save') {
    doSave();
  } else if (type === 'load') {
    doLoad();
  }
  run();
}

module.exports = api;
