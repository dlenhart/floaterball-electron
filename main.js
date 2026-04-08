const { app, BrowserWindow, shell, Menu, nativeImage } = require('electron')
const path = require('path')

app.name = 'Floater Ball'

function createWindow () {
  const win = new BrowserWindow({
    width: 600,
    height: 430,
    resizable: false,
    title: 'Floater Ball',
    backgroundColor: '#0a0a0a',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    }
  })

  win.loadFile('game/index.html')

  win.webContents.on('will-navigate', (event, url) => {
    if (url.startsWith('https://')) {
      event.preventDefault()
      shell.openExternal(url)
    }
  })

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://')) {
      shell.openExternal(url)
    }
    return { action: 'deny' }
  })
}

app.whenReady().then(() => {
  app.setAboutPanelOptions({
    applicationName: 'Floater Ball',
    applicationVersion: '1.0.0',
    version: '',
    icon: nativeImage.createFromPath(path.join(__dirname, 'icon.png'))
  })

  const menu = Menu.buildFromTemplate([
    {
      label: 'Floater Ball',
      submenu: [
        { role: 'about', label: 'About Floater Ball' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide', label: 'Hide Floater Ball' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit', label: 'Quit Floater Ball' }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  app.quit()
})
