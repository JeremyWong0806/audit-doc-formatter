# 审计报告格式编辑器 (AuditDocFormatter)

一个用于审计报告的Word文档格式自动编辑工具，帮助审计师专注于内容编辑，无需手动调整格式。

## 功能特性

- **格式配置**: 自定义标题、正文、强调文字等样式
- **实时预览**: 编辑内容即时显示Word效果
- **一键导出**: 快速生成标准Word文档(.docx)
- **配置保存**: 格式配置可保存复用

## 支持平台

- macOS (Apple Silicon)
- Windows (x64)

## 快速开始

### 安装

#### macOS
1. 解压 `AuditDocFormatter-1.0.0-arm64-mac.zip`
2. 双击运行 `AuditDocFormatter.app`

#### Windows
1. 解压 `AuditDocFormatter-win-arm64.zip`
2. 双击运行 `AuditDocFormatter.exe`

### 开发

```bash
# 克隆项目
git clone <repository-url>
cd audit-doc-formatter

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run electron:build
```

## 使用说明

### 标记语法

```
# 一级标题
## 二级标题
### 三级标题
[强调文字]
- 无序列表
1. 有序列表
| 表格列1 | 表格列2 |
|---|---|
| 内容1 | 内容2 |
```

### 配置格式

在左侧面板可以配置:
- 一级/二级/三级标题样式（字体、字号、对齐、间距）
- 正文样式（字体、字号、行距、首行缩进）
- 强调文字样式（字体、颜色、下划线）

## 技术栈

- Electron
- React
- TypeScript
- docx.js

## 许可证

MIT
