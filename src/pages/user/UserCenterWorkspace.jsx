import { NavLink, Outlet } from 'react-router-dom'
import { userCenterNavItems } from './userCenterData'
import { useUserCenter } from './useUserCenter'

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
