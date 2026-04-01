import React, { useRef, useEffect } from 'react'
import './Editor.css'

interface EditorProps {
  content: string
  onContentChange: (content: string) => void
}

const Editor: React.FC<EditorProps> = ({ content, onContentChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 自动调整textarea高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [content])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab键插入空格
    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = textareaRef.current
      if (textarea) {
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const newValue = content.substring(0, start) + '  ' + content.substring(end)
        onContentChange(newValue)
        // 设置光标位置
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2
        }, 0)
      }
    }
  }

  return (
    <div className="editor">
      <div className="editor-header">
        <h3>内容编辑</h3>
        <span className="editor-hint">支持Markdown简化语法</span>
      </div>
      <div className="editor-content">
        <div className="line-numbers">
          {content.split('\n').map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          className="editor-textarea"
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="在这里输入审计报告内容...

使用说明:
# 一级标题
## 二级标题
### 三级标题

[强调文字]

- 列表项
1. 有序列表

| 表格列1 | 表格列2 |
|---|---|
| 内容1 | 内容2"
          spellCheck={false}
        />
      </div>
    </div>
  )
}

export default Editor
