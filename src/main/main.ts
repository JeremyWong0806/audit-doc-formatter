import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import path from 'path'
import fs from 'fs'

// 简单日志函数
const log = {
  info: (...args: unknown[]) => console.log('[INFO]', new Date().toISOString(), ...args),
  error: (...args: unknown[]) => console.error('[ERROR]', new Date().toISOString(), ...args)
}

let mainWindow: BrowserWindow | null = null

const createWindow = () => {
  log.info('Creating main window...')

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 700,
    title: '审计报告格式编辑器',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  // 开发环境加载本地服务器
  if (process.env.NODE_ENV === 'development' || process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  log.info('Main window created successfully')
}

// 保存配置
ipcMain.handle('save-config', async (_event, config: string) => {
  try {
    const result = await dialog.showSaveDialog(mainWindow!, {
      title: '保存格式配置',
      defaultPath: 'audit-format-config.json',
      filters: [{ name: 'JSON', extensions: ['json'] }]
    })

    if (!result.canceled && result.filePath) {
      fs.writeFileSync(result.filePath, config, 'utf-8')
      return { success: true, path: result.filePath }
    }
    return { success: false }
  } catch (error) {
    log.error('Save config error:', error)
    return { success: false, error: String(error) }
  }
})

// 加载配置
ipcMain.handle('load-config', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow!, {
      title: '加载格式配置',
      filters: [{ name: 'JSON', extensions: ['json'] }],
      properties: ['openFile']
    })

    if (!result.canceled && result.filePaths.length > 0) {
      const content = fs.readFileSync(result.filePaths[0], 'utf-8')
      return { success: true, content }
    }
    return { success: false }
  } catch (error) {
    log.error('Load config error:', error)
    return { success: false, error: String(error) }
  }
})

// 保存Word文件
ipcMain.handle('save-word', async (_event, arrayBuffer: ArrayBuffer) => {
  try {
    const result = await dialog.showSaveDialog(mainWindow!, {
      title: '导出Word文档',
      defaultPath: '审计报告.docx',
      filters: [{ name: 'Word文档', extensions: ['docx'] }]
    })

    if (!result.canceled && result.filePath) {
      const buffer = Buffer.from(arrayBuffer)
      fs.writeFileSync(result.filePath, buffer)
      return { success: true, path: result.filePath }
    }
    return { success: false }
  } catch (error) {
    log.error('Save word error:', error)
    return { success: false, error: String(error) }
  }
})

// 加载文档
ipcMain.handle('open-document', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow!, {
      title: '打开文档',
      filters: [
        { name: '文本文件', extensions: ['txt', 'md'] },
        { name: '所有文件', extensions: ['*'] }
      ],
      properties: ['openFile']
    })

    if (!result.canceled && result.filePaths.length > 0) {
      const content = fs.readFileSync(result.filePaths[0], 'utf-8')
      return { success: true, content, path: result.filePaths[0] }
    }
    return { success: false }
  } catch (error) {
    log.error('Open document error:', error)
    return { success: false, error: String(error) }
  }
})

app.whenReady().then(() => {
  log.info('App is ready, creating window...')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
