// 文件用途：用户中心子页面读取父路由共享状态的专用 hook。
import { useOutletContext } from 'react-router-dom'

// 模块功能：封装 useOutletContext，减少子页面对路由实现细节的感知。
export function useUserCenter() {
  return useOutletContext()
}
