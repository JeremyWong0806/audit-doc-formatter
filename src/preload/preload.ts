import { contextBridge, ipcRenderer } from 'electron'

// 暴露API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 保存配置
  saveConfig: (config: string) => ipcRenderer.invoke('save-config', config),

  // 加载配置
  loadConfig: () => ipcRenderer.invoke('load-config'),

  // 保存Word文件
  saveWord: (arrayBuffer: ArrayBuffer) => ipcRenderer.invoke('save-word', arrayBuffer),

  // 打开文档
  openDocument: () => ipcRenderer.invoke('open-document')
})
