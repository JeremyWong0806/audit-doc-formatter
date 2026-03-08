import React, { useState, useMemo } from 'react'
import { FormatConfig } from '../types'
import './Preview.css'

interface PreviewProps {
  html: string
  config: FormatConfig
}

const Preview: React.FC<PreviewProps> = ({ html, config }) => {
  const [zoom, setZoom] = useState(100)

  // 生成动态样式
  const previewStyles = useMemo(() => {
    return `
      .preview-content {
        font-family: ${config.body.fontFamily}, var(--font-cn);
        font-size: ${config.body.fontSize}px;
        line-height: ${config.body.lineSpacing};
      }

      .preview-content h1.title-1 {
        font-family: ${config.title1.fontFamily}, var(--font-cn);
        font-size: ${config.title1.fontSize}pt;
        font-weight: ${config.title1.bold ? 'bold' : 'normal'};
        text-align: ${config.title1.alignment};
        margin-top: ${config.title1.spaceBefore}px;
        margin-bottom: ${config.title1.spaceAfter}px;
        color: var(--color-text);
      }

      .preview-content h2.title-2 {
        font-family: ${config.title2.fontFamily}, var(--font-cn);
        font-size: ${config.title2.fontSize}pt;
        font-weight: ${config.title2.bold ? 'bold' : 'normal'};
        text-align: ${config.title2.alignment};
        margin-top: ${config.title2.spaceBefore}px;
        margin-bottom: ${config.title2.spaceAfter}px;
        color: var(--color-text);
      }

      .preview-content h3.title-3 {
        font-family: ${config.title3.fontFamily}, var(--font-cn);
        font-size: ${config.title3.fontSize}pt;
        font-weight: ${config.title3.bold ? 'bold' : 'normal'};
        text-align: ${config.title3.alignment};
        margin-top: ${config.title3.spaceBefore}px;
        margin-bottom: ${config.title3.spaceAfter}px;
        color: var(--color-text);
      }

      .preview-content .emphasis {
        font-family: ${config.emphasis.fontFamily}, var(--font-cn);
        font-size: ${config.emphasis.fontSize}pt;
        font-weight: ${config.emphasis.bold ? 'bold' : 'normal'};
        color: ${config.emphasis.color};
        text-decoration: ${config.emphasis.underline ? 'underline' : 'none'};
      }

      .preview-content p {
        text-align: ${config.body.alignment};
        margin-top: ${config.paragraph.normal.spaceBefore}px;
        margin-bottom: ${config.paragraph.normal.spaceAfter}px;
        text-indent: ${config.body.firstLineIndent}px;
      }

      .preview-content li.list-item {
        margin-top: ${config.paragraph.list.spaceBefore}px;
        margin-bottom: ${config.paragraph.list.spaceAfter}px;
        margin-left: 20px;
      }

      .preview-content table {
        width: 100%;
        border-collapse: collapse;
        margin: 10px 0;
      }

      .preview-content td, .preview-content th {
        border: 1px solid var(--color-border);
        padding: 8px;
        text-align: center;
      }

      .preview-content th {
        background: var(--color-bg);
      }
    `
  }, [config])

  return (
    <div className="preview">
      <div className="preview-header">
        <h3>实时预览</h3>
        <div className="preview-zoom">
          <button onClick={() => setZoom(Math.max(50, zoom - 10))}>-</button>
          <span>{zoom}%</span>
          <button onClick={() => setZoom(Math.min(200, zoom + 10))}>+</button>
        </div>
      </div>
      <div className="preview-container">
        <div
          className="preview-page"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
          <style>{previewStyles}</style>
          <div
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  )
}

export default Preview
