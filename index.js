// main.js
const { app, BrowserWindow } = require('electron')

// 建立應用程式視窗的函式
function createWindow () {
  // 建立一個瀏覽器視窗
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 啟用 Node.js 整合，讓渲染程序可以使用 Node.js API
      nodeIntegration: true,
      // 確保上下文隔離
      contextIsolation: false 
    }
  })

  // 載入應用程式的 HTML 檔案
  mainWindow.loadFile('index.html')

  // (可選) 開啟開發者工具
  // mainWindow.webContents.openDevTools()
}

// 當 Electron 完成初始化並準備好建立瀏覽器視窗時，呼叫 createWindow
app.whenReady().then(createWindow)

// 監聽所有視窗都關閉的事件
app.on('window-all-closed', () => {
  // 在 macOS 上，除非使用者明確使用 Cmd + Q 退出，否則應用程式通常會保持啟動
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 監聽應用程式啟動的事件 (macOS)
app.on('activate', () => {
  // 在 macOS 上，當 dock 圖示被點擊且沒有其他視窗開啟時，重新建立一個視窗
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})