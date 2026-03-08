import React, { useState, useEffect, useCallback } from 'react'
import { FormatConfig } from './types'
import { defaultFormatConfig, parseContent } from './utils/defaultConfig'
import { generateWordDocument } from './utils/generateWord'
import Toolbar from './components/Toolbar'
import ConfigPanel from './components/ConfigPanel'
import Editor from './components/Editor'
import Preview from './components/Preview'
import StatusBar from './components/StatusBar'
import './styles/App.css'

const App: React.FC = () => {
  // 状态管理
  const [config, setConfig] = useState<FormatConfig>(defaultFormatConfig)
  const [content, setContent] = useState<string>('')
  const [previewHtml, setPreviewHtml] = useState<string>('')
  const [isExporting, setIsExporting] = useState(false)
  const [statusMessage, setStatusMessage] = useState('就绪')

  // 实时预览更新
  useEffect(() => {
    const html = parseContent(content)
    setPreviewHtml(html)
  }, [content])

  // 新建文档
  const handleNew = useCallback(() => {
    setContent('')
    setConfig(defaultFormatConfig)
    setStatusMessage('新建文档')
  }, [])

  // 打开文档
  const handleOpen = useCallback(async () => {
    try {
      const result = await window.electronAPI.openDocument()
      if (result.success && result.content) {
        setContent(result.content)
        setStatusMessage('文档已打开')
      }
    } catch (error) {
      setStatusMessage('打开文档失败')
    }
  }, [])

  // 保存配置
  const handleSaveConfig = useCallback(async () => {
    try {
      const result = await window.electronAPI.saveConfig(JSON.stringify(config, null, 2))
      if (result.success) {
        setStatusMessage('配置已保存')
      }
    } catch (error) {
      setStatusMessage('保存配置失败')
    }
  }, [config])

  // 加载配置
  const handleLoadConfig = useCallback(async () => {
    try {
      const result = await window.electronAPI.loadConfig()
      if (result.success && result.content) {
        const loadedConfig = JSON.parse(result.content) as FormatConfig
        setConfig(loadedConfig)
        setStatusMessage('配置已加载')
      }
    } catch (error) {
      setStatusMessage('加载配置失败')
    }
  }, [])

  // 导出Word
  const handleExport = useCallback(async () => {
    if (!content.trim()) {
      setStatusMessage('内容为空，无法导出')
      return
    }

    setIsExporting(true)
    try {
      const arrayBuffer = await generateWordDocument(content, config)
      const result = await window.electronAPI.saveWord(arrayBuffer)
      if (result.success) {
        setStatusMessage('Word文档已导出')
      } else {
        setStatusMessage('导出取消')
      }
    } catch (error) {
      setStatusMessage('导出失败')
    } finally {
      setIsExporting(false)
    }
  }, [content, config])

  // 内容变化
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent)
  }, [])

  // 配置变化
  const handleConfigChange = useCallback((newConfig: FormatConfig) => {
    setConfig(newConfig)
  }, [])

  return (
    <div className="app">
      <Toolbar
        onNew={handleNew}
        onOpen={handleOpen}
        onSaveConfig={handleSaveConfig}
        onLoadConfig={handleLoadConfig}
        onExport={handleExport}
        isExporting={isExporting}
      />

      <div className="main-content">
        <ConfigPanel
          config={config}
          onConfigChange={handleConfigChange}
        />

        <Editor
          content={content}
          onContentChange={handleContentChange}
        />

        <Preview
          html={previewHtml}
          config={config}
        />
      </div>

      <StatusBar
        message={statusMessage}
        wordCount={content.length}
        configCount={Object.keys(config).length}
      />
    </div>
  )
}

export default App
