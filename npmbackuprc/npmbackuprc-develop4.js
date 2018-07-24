module.exports = {
  /*
    to: backup path
    libs: need copy files or dirs | 需要拷贝的文件或文件夹
    ignores: ignore files or dirs | 需要忽略拷贝的文件夹或文件夹

    if you use iCloud, set
    to: ~/Library/Mobile Documents/com~apple~CloudDocs/npmbackup/
    
  */

  to: '~/Desktop/test-save',
  libs: [
    '~/Desktop/test-work',
  ],
  ignores: [
    '*/.fseventsd/',
    '*/.Spotlight-V100/',
    '*/.Trashes/',
    '*/node_modules/',
    '*/build/',
    '*/.cache/',
    '*/.dist/',
    '*/dev-web/',
    '*/dev-wechat/',
    '*/.DS_Store',
    '*/._.*',
    '*/ffs_log',
  ],
};
