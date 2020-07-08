import { app, BrowserWindow, nativeImage } from 'electron'
import * as path from 'path'
import * as url from 'url'
import { getWindowBounds, setWindowBounds } from '../src/utils/windowBoundsController'

let mainWindow: Electron.BrowserWindow | null

function createWindow () {
  const icon = nativeImage.createFromPath(
    `${app.getAppPath()}/assets/icon/128x128.png`
  )

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
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  mainWindow.on('close', () => {
    setWindowBounds(mainWindow?.getBounds())
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)
app.allowRendererProcessReuse = true
