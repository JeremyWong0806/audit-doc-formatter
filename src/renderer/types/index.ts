// 格式配置类型
export interface FormatConfig {
  // 标题样式
  title1: TitleStyle
  title2: TitleStyle
  title3: TitleStyle

  // 正文样式
  body: BodyStyle
  emphasis: EmphasisStyle

  // 段落规则
  paragraph: ParagraphRules

  // 特殊格式
  special: SpecialFormats
}

export interface TitleStyle {
  fontFamily: string
  fontSize: number
  bold: boolean
  alignment: 'left' | 'center' | 'right'
  spaceBefore: number
  spaceAfter: number
}

export interface BodyStyle {
  fontFamily: string
  fontSize: number
  alignment: 'left' | 'center' | 'right' | 'justify'
  firstLineIndent: number
  lineSpacing: number
}

export interface EmphasisStyle {
  fontFamily: string
  fontSize: number
  bold: boolean
  color: string
  underline: boolean
}

export interface ParagraphRules {
  reportTitle: ParagraphRule
  reportNumber: ParagraphRule
  normal: ParagraphRule
  list: ParagraphRule
}

export interface ParagraphRule {
  spaceAfter: number
  spaceBefore: number
  alignment: 'left' | 'center' | 'right' | 'justify'
}

export interface SpecialFormats {
  tableTitle: FormatStyle
  footnote: FormatStyle
  headerFooter: FormatStyle
}

export interface FormatStyle {
  fontFamily: string
  fontSize: number
  alignment: 'left' | 'center' | 'right'
  spaceBefore: number
  spaceAfter: number
}

// 文档内容类型
export interface DocumentContent {
  content: string
  lastModified: Date
}

// 电子API类型
export interface ElectronAPI {
  saveConfig: (config: string) => Promise<{ success: boolean; path?: string; error?: string }>
  loadConfig: () => Promise<{ success: boolean; content?: string; error?: string }>
  saveWord: (arrayBuffer: ArrayBuffer) => Promise<{ success: boolean; path?: string; error?: string }>
  openDocument: () => Promise<{ success: boolean; content?: string; path?: string; error?: string }>
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

// 解析后的文档块
export interface ParsedBlock {
  type: 'title1' | 'title2' | 'title3' | 'body' | 'emphasis' | 'list' | 'table' | 'empty'
  content: string
  level?: number
  items?: string[]
  rows?: string[][]
}
