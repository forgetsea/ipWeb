// 文件用途：应用入口，负责把 React 应用挂载到页面根节点。
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// 模块功能：为全站提供 StrictMode 和 BrowserRouter 运行环境。
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
