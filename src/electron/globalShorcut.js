import defaultShortcuts from '@/utils/shortcuts';
const { globalShortcut } = require('electron');

const clc = require('cli-color');
const log = text => {
  console.log(`${clc.blueBright('[globalShortcut.js]')} ${text}`);
};

export function registerGlobalShortcut(win, store) {
  log('registerGlobalShortcut');
  let shortcuts = store.get('settings.shortcuts');
  if (shortcuts === undefined) {
    shortcuts = defaultShortcuts;
  }
  const list = ['play', 'next', 'previous', 'increaseVolume', 'decreaseVolume', 'like', 'minimize']
  list.forEach(item => {
    globalShortcut.register(
      shortcuts.find(s => s.id === item).globalShortcut,
      () => {
          win.webContents.send(item);
      }
    );
  })
  globalShortcut.register('CommandOrControl+Shift+i', function () {
    win.webContents.openDevTools()
  })
}
