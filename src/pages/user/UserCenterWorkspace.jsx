// 文件用途：用户中心工作区布局，包含侧边栏导航和子页面内容区。
import { NavLink, Outlet } from 'react-router-dom'
import { userCenterNavItems } from './userCenterData'
import { useUserCenter } from './useUserCenter'

// 模块功能：渲染用户中心二级导航、全局状态提示和当前子路由页面。
function UserCenterWorkspace() {
  const context = useUserCenter()
  const { status } = context

  return (
    <section className="user-center-grid section-container">
      <aside className="user-panel user-sidebar">
        <nav className="user-center-nav user-sidebar-nav" aria-label="用户中心功能">
          {userCenterNavItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="user-content">
        {status.message ? (
          <div className={`user-status is-${status.type}`} role="status">
            {status.message}
          </div>
        ) : null}

        <Outlet context={context} />
      </div>
    </section>
  )
}

export default UserCenterWorkspace
