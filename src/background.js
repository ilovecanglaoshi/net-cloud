'use strict'

import { app, protocol, BrowserWindow, globalShortcut } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
// const path = require('path')
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width:1002,
    height:681,
    minWidth: 1002,
    minHeight: 681,
    // frame:false,直接去除导航头部
    titleBarStyle: 'hidden',
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  //   // 创建系统托盘
  //   const tray = new Tray(path.resolve(__dirname, '../src/assets/net.png'));
  //   // 菜单模板
  //   // 菜单模板
  // let menu = [
  //   {
  //     label: '显示主窗口',
  //     id: 'show-window',
  //     enabled: !win.show,
  //     click() {
  //       win.show();
  //     }
  //   },
  //   {
  //     label: '退出',
  //     role: 'quit'
  //   }
  // ];
  // // 给系统托盘设置菜单
  // tray.setContextMenu(Menu.buildFromTemplate(menu));
  // // 给托盘图标设置气球提示
  // tray.setToolTip('Electron测试');

  //   // 窗口最小化
  // win.on('minimize', ev => {
  //   // 阻止最小化
  //   ev.preventDefault();
  //   // 隐藏窗口
  //   win.hide();
  // });

  // // 托盘图标被双击
  // tray.on('double-click', () => {
  //   // 显示窗口
  //   win.show();
  // });

  // // 窗口隐藏
  // win.on('hide', () => {
  //   // 启用菜单的显示主窗口项
  //   Menu.getMenuItemById('show-window').enabled = true;
  //   // 重新设置系统托盘菜单
  //   tray.setContextMenu(menu);
  // });
  //   // 窗口显示
  // win.on('show', () => {
  //   // 禁用显示主窗口项
  //   Menu.getMenuItemById('show-window').enabled = false;
  //   // 重新设置系统托盘菜单
  //   tray.setContextMenu(menu);
  // });


  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
    if (!process.env.IS_TEST) { // 设置快捷打开控制台
      globalShortcut.register('CommandOrControl+Shift+i', function () {
        win.webContents.openDevTools()
      })
    }
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
 
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}