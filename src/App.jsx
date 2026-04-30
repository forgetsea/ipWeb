// 文件用途：应用根组件，承接全局样式并渲染路由出口。
import AppRoutes from './app/AppRoutes'

// 模块功能：保持根组件轻量，把页面选择交给 AppRoutes。
function App() {
  return <AppRoutes />
}

export default App
