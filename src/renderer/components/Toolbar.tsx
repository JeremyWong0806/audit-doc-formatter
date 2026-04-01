import React from 'react'
import './Toolbar.css'

interface ToolbarProps {
  onNew: () => void
  onOpen: () => void
  onSaveConfig: () => void
  onLoadConfig: () => void
  onExport: () => void
  isExporting: boolean
}

const Toolbar: React.FC<ToolbarProps> = ({
  onNew,
  onOpen,
  onSaveConfig,
  onLoadConfig,
  onExport,
  isExporting
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button className="toolbar-btn" onClick={onNew} title="新建文档">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 1h5l4 4v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm5 0v4h4L9 1z" />
          </svg>
          新建
        </button>
        <button className="toolbar-btn" onClick={onOpen} title="打开文档">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h3.172a1.5 1.5 0 0 1 1.06.44l.329.329a.5.5 0 0 0 .353.146H13.5A1.5 1.5 0 0 1 15 4.914V12.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 2 12.5v-9z" />
          </svg>
          打开
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button className="toolbar-btn" onClick={onSaveConfig} title="保存格式配置">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 2v12h12V4.828L11.172 2H2zm1 1h7v3H3V3zm8 0h.172L13 4.828V13H3V8h10V3H11z" />
          </svg>
          保存配置
        </button>
        <button className="toolbar-btn" onClick={onLoadConfig} title="加载格式配置">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a.5.5 0 0 1 .5.5v4.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 6.293V1.5A.5.5 0 0 1 8 1z" />
            <path d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
          </svg>
          加载配置
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button
          className="toolbar-btn primary"
          onClick={onExport}
          disabled={isExporting}
          title="导出Word文档"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0l4 5H9v6H7V5H4l4-5zm6 9v4H2v-4H0v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5h-2z" />
          </svg>
          {isExporting ? '导出中...' : '导出Word'}
        </button>
      </div>

      <div className="toolbar-title">审计报告格式编辑器</div>
    </div>
  )
}

export default Toolbar
