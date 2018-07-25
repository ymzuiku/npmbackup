module.exports = {
  /*
    to: backup path
    libs: need copy files or dirs
    zips: need zip dirs
    ignores: ignore files or dirs
    
    if you use iCloud, set
    to: ~/Library/Mobile Documents/com~apple~CloudDocs/npmbackup/
  */

  to: '~/Desktop/npmbackupFiles',
  libs: [
    '~/npmbackuprc.json',
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
  ],
};
