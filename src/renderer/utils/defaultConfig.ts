import { FormatConfig } from '../types'

export const defaultFormatConfig: FormatConfig = {
  // 一级标题
  title1: {
    fontFamily: '黑体',
    fontSize: 16,
    bold: true,
    alignment: 'center',
    spaceBefore: 24,
    spaceAfter: 12
  },
  // 二级标题
  title2: {
    fontFamily: '黑体',
    fontSize: 14,
    bold: true,
    alignment: 'left',
    spaceBefore: 18,
    spaceAfter: 6
  },
  // 三级标题
  title3: {
    fontFamily: '楷体',
    fontSize: 13,
    bold: true,
    alignment: 'left',
    spaceBefore: 12,
    spaceAfter: 6
  },
  // 正文
  body: {
    fontFamily: '宋体',
    fontSize: 12,
    alignment: 'justify',
    firstLineIndent: 24,
    lineSpacing: 1.5
  },
  // 强调
  emphasis: {
    fontFamily: '楷体',
    fontSize: 12,
    bold: true,
    color: '#0000FF',
    underline: true
  },
  // 段落规则
  paragraph: {
    reportTitle: {
      spaceAfter: 24,
      spaceBefore: 0,
      alignment: 'center'
    },
    reportNumber: {
      spaceAfter: 12,
      spaceBefore: 0,
      alignment: 'right'
    },
    normal: {
      spaceAfter: 6,
      spaceBefore: 0,
      alignment: 'justify'
    },
    list: {
      spaceAfter: 0,
      spaceBefore: 6,
      alignment: 'left'
    }
  },
  // 特殊格式
  special: {
    tableTitle: {
      fontFamily: '宋体',
      fontSize: 12,
      alignment: 'center',
      spaceBefore: 12,
      spaceAfter: 6
    },
    footnote: {
      fontFamily: '宋体',
      fontSize: 10,
      alignment: 'left',
      spaceBefore: 0,
      spaceAfter: 0
    },
    headerFooter: {
      fontFamily: '宋体',
      fontSize: 10,
      alignment: 'center',
      spaceBefore: 0,
      spaceAfter: 0
    }
  }
}

// 标记语法解析
export const parseContent = (content: string): string => {
  let html = content

  // 转义HTML
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // 解析一级标题 (# 标题)
  html = html.replace(/^# (.+)$/gm, '<h1 class="title-1">$1</h1>')

  // 解析二级标题 (## 标题)
  html = html.replace(/^## (.+)$/gm, '<h2 class="title-2">$1</h2>')

  // 解析三级标题 (### 标题)
  html = html.replace(/^### (.+)$/gm, '<h3 class="title-3">$1</h3>')

  // 解析强调文字 [文字]
  html = html.replace(/\[([^\]]+)\]/g, '<span class="emphasis">$1</span>')

  // 解析无序列表 (- 或 * 开头)
  html = html.replace(/^[-*] (.+)$/gm, '<li class="list-item">$1</li>')

  // 解析有序列表 (1. 开头)
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="list-item numbered">$1</li>')

  // 解析表格
  html = html.replace(/^\|(.+)\|$/gm, (_match, p1) => {
    const cells = p1.split('|').map((cell: string) => cell.trim())
    const isHeader = cells.every((cell: string) => /^-+$/.test(cell))
    if (isHeader) return ''
    const cellTags = cells.map((cell: string) =>
      isHeader ? `<th>${cell}</th>` : `<td>${cell}</td>`
    ).join('')
    return `<tr>${cellTags}</tr>`
  })

  // 处理空行
  html = html.replace(/^\s*$/gm, '<br/>')

  // 换行处理
  html = html.replace(/\n/g, '<br/>')

  return html
}

// 获取字体名称映射
export const getFontFamily = (font: string): string => {
  const fontMap: Record<string, string> = {
    '宋体': 'SimSun',
    '黑体': 'SimHei',
    '楷体': 'KaiTi',
    '微软雅黑': 'Microsoft YaHei'
  }
  return fontMap[font] || font
}
