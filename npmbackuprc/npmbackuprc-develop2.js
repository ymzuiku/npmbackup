module.exports = {
  /*
    to: backup path
    libs: need copy files or dirs
    zips: need zip dirs
    ignores: ignore files or dirs
  */

  to: '~/Desktop/test-save',
  libs: [
    '~/Desktop/test-work',
  ],
  ignores: [
    '*/.fseventsd',
    '*/.Spotlight-V100',
    '*/.Trashes',
    '*/node_modules',
    '*/build',
    '*/.cache',
    '*/.dist',
    '*/dev-web',
    '*/dev-wechat',
    '*/.DS_Store',
    '*/._.*',
    '*/ffs_log',
    '*/.sync.ffs_db',
  ],
  zips: [
    '*/.git',
    '*/libs',
    '*/bb',
  ]
};
