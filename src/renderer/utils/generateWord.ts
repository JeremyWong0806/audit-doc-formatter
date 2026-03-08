import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType
} from 'docx'
import { FormatConfig, ParsedBlock } from '../types'

// 解析内容为块
export const parseToBlocks = (content: string): ParsedBlock[] => {
  const lines = content.split('\n')
  const blocks: ParsedBlock[] = []

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith('# ')) {
      blocks.push({ type: 'title1', content: trimmed.slice(2) })
    } else if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'title2', content: trimmed.slice(3) })
    } else if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'title3', content: trimmed.slice(4) })
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      blocks.push({ type: 'list', content: trimmed.slice(2), level: 0 })
    } else if (/^\d+\.\s/.test(trimmed)) {
      blocks.push({ type: 'list', content: trimmed.replace(/^\d+\.\s/, ''), level: 1 })
    } else if (/^\|.+\|$/.test(trimmed)) {
      // 表格行
      const cells = trimmed.split('|').slice(1, -1).map(c => c.trim())
      if (!blocks.length || blocks[blocks.length - 1].type !== 'table') {
        blocks.push({ type: 'table', content: '', rows: [] })
      }
      if (!/^-+$/.test(cells[0] || '')) {
        (blocks[blocks.length - 1].rows as string[][]).push(cells)
      }
    } else if (trimmed === '') {
      blocks.push({ type: 'empty', content: '' })
    } else {
      // 检查是否有强调文字
      const hasEmphasis = /\[([^\]]+)\]/.test(trimmed)
      blocks.push({ type: hasEmphasis ? 'emphasis' : 'body', content: trimmed })
    }
  }

  return blocks
}

// 创建段落
const createParagraph = (
  text: string,
  config: FormatConfig,
  blockType: string
): Paragraph => {
  const runs: TextRun[] = []

  // 处理强调文字 [文字]
  const emphasisRegex = /\[([^\]]+)\]/g
  let lastIndex = 0
  let match

  while ((match = emphasisRegex.exec(text)) !== null) {
    // 添加普通文字
    if (match.index > lastIndex) {
      runs.push(new TextRun({
        text: text.slice(lastIndex, match.index),
        font: config.body.fontFamily,
        size: config.body.fontSize * 2
      }))
    }

    // 添加强调文字
    runs.push(new TextRun({
      text: match[1],
      font: config.emphasis.fontFamily,
      size: config.emphasis.fontSize * 2,
      bold: config.emphasis.bold,
      color: config.emphasis.color,
      underline: config.emphasis.underline ? {} : undefined
    }))

    lastIndex = match.index + match[0].length
  }

  // 添加剩余文字
  if (lastIndex < text.length) {
    runs.push(new TextRun({
      text: text.slice(lastIndex),
      font: config.body.fontFamily,
      size: config.body.fontSize * 2
    }))
  }

  if (runs.length === 0) {
    runs.push(new TextRun({
      text: text,
      font: config.body.fontFamily,
      size: config.body.fontSize * 2
    }))
  }

  // 处理不同类型的段落
  if (blockType === 'title1') {
    return new Paragraph({
      children: [new TextRun({
        text: text,
        font: config.title1.fontFamily,
        size: config.title1.fontSize * 2,
        bold: config.title1.bold
      })],
      alignment: 'center',
      spacing: { before: config.title1.spaceBefore * 8, after: config.title1.spaceAfter * 8 },
      heading: HeadingLevel.HEADING_1
    })
  }

  if (blockType === 'title2') {
    return new Paragraph({
      children: [new TextRun({
        text: text,
        font: config.title2.fontFamily,
        size: config.title2.fontSize * 2,
        bold: config.title2.bold
      })],
      alignment: 'left',
      spacing: { before: config.title2.spaceBefore * 8, after: config.title2.spaceAfter * 8 },
      heading: HeadingLevel.HEADING_2
    })
  }

  if (blockType === 'title3') {
    return new Paragraph({
      children: [new TextRun({
        text: text,
        font: config.title3.fontFamily,
        size: config.title3.fontSize * 2,
        bold: config.title3.bold
      })],
      alignment: 'left',
      spacing: { before: config.title3.spaceBefore * 8, after: config.title3.spaceAfter * 8 },
      heading: HeadingLevel.HEADING_3
    })
  }

  if (blockType === 'list') {
    return new Paragraph({
      children: runs,
      alignment: 'left',
      spacing: { before: config.paragraph.list.spaceBefore * 8, after: config.paragraph.list.spaceAfter * 8 }
    })
  }

  // 普通段落
  return new Paragraph({
    children: runs,
    alignment: 'both',
    spacing: { before: config.paragraph.normal.spaceBefore * 8, after: config.paragraph.normal.spaceAfter * 8 },
    indent: {
      firstLine: config.body.firstLineIndent * 8
    }
  })
}

// 创建表格
const createTable = (rows: string[][], config: FormatConfig): Table => {
  const tableRows = rows.map(row =>
    new TableRow({
      children: row.map(cell =>
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({
              text: cell,
              font: config.body.fontFamily,
              size: config.body.fontSize * 2
            })],
            alignment: 'center'
          })]
        })
      )
    })
  )

  return new Table({
    rows: tableRows,
    width: { size: 100, type: WidthType.PERCENTAGE }
  })
}

// 生成Word文档
export const generateWordDocument = async (
  content: string,
  config: FormatConfig
): Promise<ArrayBuffer> => {
  const blocks = parseToBlocks(content)
  const children: (Paragraph | Table)[] = []

  for (const block of blocks) {
    if (block.type === 'table' && block.rows) {
      children.push(createTable(block.rows, config))
    } else if (block.type !== 'empty' && block.type !== 'table') {
      children.push(createParagraph(block.content, config, block.type))
    }
  }

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: {
            width: 11906,
            height: 16838
          },
          margin: {
            top: 1440,
            right: 1440,
            bottom: 1440,
            left: 1440
          }
        }
      },
      children
    }]
  })

  const buffer = await Packer.toBuffer(doc)
  // 将Buffer转换为ArrayBuffer
  const arrayBuffer = new ArrayBuffer(buffer.length)
  const view = new Uint8Array(arrayBuffer)
  for (let i = 0; i < buffer.length; i++) {
    view[i] = buffer[i]
  }
  return arrayBuffer
}
