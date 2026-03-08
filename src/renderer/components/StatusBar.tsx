import React from 'react'
import './StatusBar.css'

interface StatusBarProps {
  message: string
  wordCount: number
  configCount: number
}

const StatusBar: React.FC<StatusBarProps> = ({ message, wordCount, configCount }) => {
  return (
    <div className="status-bar">
      <div className="status-left">
        <span className="status-message">{message}</span>
      </div>
      <div className="status-right">
        <span className="status-item">字数: {wordCount}</span>
        <span className="status-divider">|</span>
        <span className="status-item">格式规则: {configCount} 组</span>
      </div>
    </div>
  )
}

export default StatusBar
