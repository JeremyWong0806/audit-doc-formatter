import React, { useState } from 'react'
import { FormatConfig, TitleStyle, BodyStyle, EmphasisStyle } from '../types'
import './ConfigPanel.css'

interface ConfigPanelProps {
  config: FormatConfig
  onConfigChange: (config: FormatConfig) => void
}

interface ConfigItemProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

const ConfigItem: React.FC<ConfigItemProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="config-item">
      <div className="config-item-header" onClick={() => setIsOpen(!isOpen)}>
        <span className={`config-arrow ${isOpen ? 'open' : ''}`}>▶</span>
        <span>{title}</span>
      </div>
      {isOpen && <div className="config-item-content">{children}</div>}
    </div>
  )
}

interface StyleInputProps {
  label: string
  value: string | number
  onChange: (value: string | number) => void
  type?: 'text' | 'number' | 'select'
  options?: { value: string; label: string }[]
  step?: number
}

const StyleInput: React.FC<StyleInputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  options,
  step = 1
}) => {
  return (
    <div className="style-input">
      <label>{label}</label>
      {type === 'select' ? (
        <select
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) =>
            onChange(type === 'number' ? Number(e.target.value) : e.target.value)
          }
          step={step}
        />
      )}
    </div>
  )
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onConfigChange }) => {
  const updateTitle = (level: 'title1' | 'title2' | 'title3', field: keyof TitleStyle, value: string | number | boolean) => {
    onConfigChange({
      ...config,
      [level]: { ...config[level], [field]: value }
    })
  }

  const updateBody = (field: keyof BodyStyle, value: string | number) => {
    onConfigChange({
      ...config,
      body: { ...config.body, [field]: value }
    })
  }

  const updateEmphasis = (field: keyof EmphasisStyle, value: string | number | boolean) => {
    onConfigChange({
      ...config,
      emphasis: { ...config.emphasis, [field]: value }
    })
  }

  return (
    <div className="config-panel">
      <h3 className="config-title">格式配置</h3>

      <ConfigItem title="一级标题" defaultOpen={true}>
        <StyleInput
          label="字体"
          value={config.title1.fontFamily}
          onChange={(v) => updateTitle('title1', 'fontFamily', v as string)}
          type="select"
          options={[
            { value: '宋体', label: '宋体' },
            { value: '黑体', label: '黑体' },
            { value: '楷体', label: '楷体' },
            { value: '微软雅黑', label: '微软雅黑' }
          ]}
        />
        <StyleInput
          label="字号"
          value={config.title1.fontSize}
          onChange={(v) => updateTitle('title1', 'fontSize', v as number)}
          type="number"
          step={1}
        />
        <StyleInput
          label="对齐"
          value={config.title1.alignment}
          onChange={(v) => updateTitle('title1', 'alignment', v as string)}
          type="select"
          options={[
            { value: 'left', label: '左对齐' },
            { value: 'center', label: '居中' },
            { value: 'right', label: '右对齐' }
          ]}
        />
        <StyleInput
          label="段前间距"
          value={config.title1.spaceBefore}
          onChange={(v) => updateTitle('title1', 'spaceBefore', v as number)}
          type="number"
        />
        <StyleInput
          label="段后间距"
          value={config.title1.spaceAfter}
          onChange={(v) => updateTitle('title1', 'spaceAfter', v as number)}
          type="number"
        />
        <StyleInput
          label="加粗"
          value={config.title1.bold ? '是' : '否'}
          onChange={(v) => updateTitle('title1', 'bold', v === '是')}
          type="select"
          options={[
            { value: '是', label: '是' },
            { value: '否', label: '否' }
          ]}
        />
      </ConfigItem>

      <ConfigItem title="二级标题">
        <StyleInput
          label="字体"
          value={config.title2.fontFamily}
          onChange={(v) => updateTitle('title2', 'fontFamily', v as string)}
          type="select"
          options={[
            { value: '宋体', label: '宋体' },
            { value: '黑体', label: '黑体' },
            { value: '楷体', label: '楷体' },
            { value: '微软雅黑', label: '微软雅黑' }
          ]}
        />
        <StyleInput
          label="字号"
          value={config.title2.fontSize}
          onChange={(v) => updateTitle('title2', 'fontSize', v as number)}
          type="number"
        />
        <StyleInput
          label="对齐"
          value={config.title2.alignment}
          onChange={(v) => updateTitle('title2', 'alignment', v as string)}
          type="select"
          options={[
            { value: 'left', label: '左对齐' },
            { value: 'center', label: '居中' },
            { value: 'right', label: '右对齐' }
          ]}
        />
        <StyleInput
          label="段前间距"
          value={config.title2.spaceBefore}
          onChange={(v) => updateTitle('title2', 'spaceBefore', v as number)}
          type="number"
        />
        <StyleInput
          label="段后间距"
          value={config.title2.spaceAfter}
          onChange={(v) => updateTitle('title2', 'spaceAfter', v as number)}
          type="number"
        />
      </ConfigItem>

      <ConfigItem title="三级标题">
        <StyleInput
          label="字体"
          value={config.title3.fontFamily}
          onChange={(v) => updateTitle('title3', 'fontFamily', v as string)}
          type="select"
          options={[
            { value: '宋体', label: '宋体' },
            { value: '黑体', label: '黑体' },
            { value: '楷体', label: '楷体' },
            { value: '微软雅黑', label: '微软雅黑' }
          ]}
        />
        <StyleInput
          label="字号"
          value={config.title3.fontSize}
          onChange={(v) => updateTitle('title3', 'fontSize', v as number)}
          type="number"
        />
        <StyleInput
          label="段前间距"
          value={config.title3.spaceBefore}
          onChange={(v) => updateTitle('title3', 'spaceBefore', v as number)}
          type="number"
        />
        <StyleInput
          label="段后间距"
          value={config.title3.spaceAfter}
          onChange={(v) => updateTitle('title3', 'spaceAfter', v as number)}
          type="number"
        />
      </ConfigItem>

      <ConfigItem title="正文样式">
        <StyleInput
          label="字体"
          value={config.body.fontFamily}
          onChange={(v) => updateBody('fontFamily', v as string)}
          type="select"
          options={[
            { value: '宋体', label: '宋体' },
            { value: '黑体', label: '黑体' },
            { value: '楷体', label: '楷体' },
            { value: '微软雅黑', label: '微软雅黑' }
          ]}
        />
        <StyleInput
          label="字号"
          value={config.body.fontSize}
          onChange={(v) => updateBody('fontSize', v as number)}
          type="number"
        />
        <StyleInput
          label="对齐"
          value={config.body.alignment}
          onChange={(v) => updateBody('alignment', v as string)}
          type="select"
          options={[
            { value: 'left', label: '左对齐' },
            { value: 'justify', label: '两端对齐' },
            { value: 'center', label: '居中' }
          ]}
        />
        <StyleInput
          label="首行缩进"
          value={config.body.firstLineIndent}
          onChange={(v) => updateBody('firstLineIndent', v as number)}
          type="number"
        />
        <StyleInput
          label="行距"
          value={config.body.lineSpacing}
          onChange={(v) => updateBody('lineSpacing', v as number)}
          type="number"
          step={0.5}
        />
      </ConfigItem>

      <ConfigItem title="强调文字">
        <StyleInput
          label="字体"
          value={config.emphasis.fontFamily}
          onChange={(v) => updateEmphasis('fontFamily', v as string)}
          type="select"
          options={[
            { value: '宋体', label: '宋体' },
            { value: '黑体', label: '黑体' },
            { value: '楷体', label: '楷体' }
          ]}
        />
        <StyleInput
          label="字号"
          value={config.emphasis.fontSize}
          onChange={(v) => updateEmphasis('fontSize', v as number)}
          type="number"
        />
        <StyleInput
          label="颜色"
          value={config.emphasis.color}
          onChange={(v) => updateEmphasis('color', v as string)}
          type="text"
        />
        <StyleInput
          label="下划线"
          value={config.emphasis.underline ? '是' : '否'}
          onChange={(v) => updateEmphasis('underline', v === '是')}
          type="select"
          options={[
            { value: '是', label: '是' },
            { value: '否', label: '否' }
          ]}
        />
      </ConfigItem>

      <div className="config-help">
        <h4>使用帮助</h4>
        <ul>
          <li><code># 标题</code> 一级标题</li>
          <li><code>## 标题</code> 二级标题</li>
          <li><code>### 标题</code> 三级标题</li>
          <li><code>[文字]</code> 强调文字</li>
          <li><code>- 项目</code> 无序列表</li>
          <li><code>1. 项目</code> 有序列表</li>
          <li><code>| 列1 | 列2 |</code> 表格</li>
        </ul>
      </div>
    </div>
  )
}

export default ConfigPanel
