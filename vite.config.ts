import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import path from 'path'

// 获取Electron路径的函数
function getElectronPath() {
  try {
    return require('electron')
  } catch {
    return 'electron'
  }
}

export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        entry: 'src/main/main.ts',
        onstart({ startup }) {
          // 延迟启动，确保构建完成
          setTimeout(() => {
            startup()
          }, 500)
        },
        vite: {
          build: {
            outDir: 'dist-electron',
            minify: false,
            rollupOptions: {
              output: {
                format: 'cjs'
              }
            }
          }
        }
      },
      {
        entry: 'src/preload/preload.ts',
        onstart({ reload }) {
          reload()
        },
        vite: {
          build: {
            outDir: 'dist-electron',
            minify: false,
            rollupOptions: {
              output: {
                format: 'cjs'
              }
            }
          }
        }
      }
    ]),
    renderer()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/renderer')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
