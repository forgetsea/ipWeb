import { NavLink, Outlet } from 'react-router-dom'
import { StatusMessage } from '../../components/ui/surface'
import { cn } from '../../lib/utils'
import { userCenterNavItems } from './userCenterData'
import { useUserCenter } from './useUserCenter'

function UserCenterWorkspace() {
  const context = useUserCenter()
  const { status } = context

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] lg:items-start">
      <aside className="lg:sticky lg:top-28">
        <div className="rounded-[32px] border border-white/70 bg-white/82 p-5 shadow-[0_18px_46px_rgba(15,23,42,0.08)] backdrop-blur-sm">
          <nav className="grid gap-2" aria-label="用户中心功能">
            {userCenterNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-2xl border border-slate-200/70 px-4 py-3 text-sm font-bold text-slate-600 no-underline transition hover:bg-[#1677ff]/8 hover:text-slate-900',
                    isActive && 'border-[#1677ff]/24 bg-[#1677ff]/8 text-slate-900',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      <div className="grid min-w-0 gap-4">
        <StatusMessage type={status.type} role="status">
          {status.message}
        </StatusMessage>
        <Outlet context={context} />
      </div>
    </section>
  )
}

export default UserCenterWorkspace
