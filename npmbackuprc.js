module.exports = {
  to: '~/Library/Mobile Documents/com~apple~CloudDocs/npmbackup/',
  libs: [
    '~/npmbackuprc.json',
    '~/.bash_profile',
    '~/.vimrc',
  ],
  ignores: [
    '.fseventsd/',
    '.Spotlight-V100/',
    '.Trashes/',
    'node_modules/',
    '.DS_Store',
    '._.*',
    'ffs_log',
  ],
};
