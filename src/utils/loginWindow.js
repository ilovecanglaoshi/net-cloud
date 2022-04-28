import {ipcMain, BrowserWindow} from 'electron'
let loginWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:10086'
  : `file://${__dirname}/index.html`
ipcMain.on('open-flow-window', function(){
  console.log('接受渲染进程的窗口创建请求');
  if(loginWindow) {
    loginWindow.show()
  }else{
    loginWindow = new BrowserWindow({
      // parent: mainWindow,
      modal: true,
      autoHideMenuBar: true,
      // resizable: false,
      backgroundColor:'white',
      width:350,
      height:530,
      transparent: true,
      frame:false, //直接去除导航头部
      titleBarStyle:false,
      webPreferences: {
        nodeIntegration: true,//默认是false,
        contextIsolation:false,
        enableRemoteModule:true,
      }
    });
    loginWindow.loadURL(winURL + '/#/login')
    // loginWindow.webContents.openDevTools()
  }
  loginWindow.once('ready-to-show', () => {
    loginWindow.show();
  });
  loginWindow.on('closed', () => {
    console.log('窗口被关闭，是否接受到通知？？');
    // const store = new Store();
    // if(store.get('user_info')) {
    //   event.sender.send('update')
    // }
    
    // ipcMain.send('update')
    loginWindow = null;
  });
  
});

