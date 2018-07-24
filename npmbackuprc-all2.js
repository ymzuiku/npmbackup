module.exports = {
  to: '~/Library/Mobile Documents/com~apple~CloudDocs/npmbackup/',
  libs: [
    '~/.bash_profile',
    '~/.vimrc',

    '~/Library/Application Support/Code/User/snippets',
    '~/Library/Application Support/Code/User/keybindings.json',
    '~/Library/Application Support/Code/User/settings.json',
    // '~/.vscode/extensions',

    '~/Library/Application Support/com.bohemiancoding.sketch3',
    '~/Library/Preferences/com.bohemiancoding.sketch3.plist',

    '~/Library/Containers/com.seriflabs.affinitydesigner.beta/shortcuts.affshortcuts',
    '~/Library/Containers/com.seriflabs.affinitydesigner.beta/preferences.dat',
    '~/Library/Containers/com.seriflabs.affinitydesigner.beta/user',
    '~/Library/Containers/com.seriflabs.affinitydesigner/shortcuts.affshortcuts',
    '~/Library/Containers/com.seriflabs.affinitydesigner/preferences.dat',
    '~/Library/Containers/com.seriflabs.affinitydesigner/user',

    '~/Library/Application Support/Keyboard Maestro',

    // '~/Library/Application Support/Dash/library.dash',
    // '~/Library/Preferences/com.kapeli.dash.plist',
    // '~/Library/Preferences/com.kapeli.dashdoc.plist',

    '~/Library/Preferences/com.apple.dt.Xcode.plist',
    '~/Library/Application Support/Developer/Shared/Xcode/Plug-ins',
    '~/Library/Developer/Xcode/UserData/CodeSnippets',
    '~/Library/Developer/Xcode/UserData/FontAndColorThemes',
    '~/Library/Developer/Xcode/UserData/KeyBindings',
    '~/Library/Developer/Xcode/UserData/Debugger',
    '~/Library/Developer/Xcode/UserData/xcdebugger',
    '~/Library/Developer/Xcode/UserData/SearchScopes.xcsclist',
    '~/Library/Developer/Xcode/Templates',

    // '~/Library/Application Support/Sublime Text 3/Packages/User',
    // '~/.config/sublime-text-3/Packages/User',

    // '~/Library/Preferences/com.binarynights.ForkLift-3.plist',
    // '~/Library/Preferences/com.googlecode.iterm2.plist',

    '~/npmbackuprc.json',
  ],
  ignores: [
    '*/.fseventsd/',
    '*/.Spotlight-V100/',
    '*/.Trashes/',
    '*/node_modules/',
    '*/.DS_Store',
    '*/._.*',
    '*/ffs_log',
  ],
};
