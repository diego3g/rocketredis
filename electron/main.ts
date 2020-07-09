import { app, BrowserWindow, nativeImage, TouchBar } from 'electron'
import { autoUpdater } from 'electron-updater'
import * as path from 'path'
import * as url from 'url'

import {
  getWindowBounds,
  setWindowBounds
} from '../src/utils/windowBoundsController'

let mainWindow: Electron.BrowserWindow | null

const tbModalButton = new TouchBar.TouchBarButton({
  label: 'New Connection',
  icon: nativeImage.createFromPath(`${app.getAppPath()}/build/icon.png`),
  iconPosition: 'left',
  click: () => {
    mainWindow?.webContents.send('set-modal')
  }
})

const touchBar = new TouchBar({
  items: [tbModalButton]
})

function createWindow() {
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/build/icon.png`)

  if (app.dock) {
    app.dock.setIcon(icon)
  }

  mainWindow = new BrowserWindow({
    ...getWindowBounds(),
    icon,
    minWidth: 1000,
    minHeight: 600,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  if (process.platform === 'darwin') mainWindow.setTouchBar(touchBar)

  mainWindow.on('close', () => {
    setWindowBounds(mainWindow?.getBounds())
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()
  autoUpdater.checkForUpdatesAndNotify()
})
app.allowRendererProcessReuse = true
