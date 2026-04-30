import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { appRoutes } from '../../router'
import { buttonVariants } from '../ui/button-variants'
import { cn } from '../../lib/utils'

function SiteHeader({ navItems }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const getNavItem = (item) => (typeof item === 'string' ? { label: item, href: '#!' } : item)

  const renderNavItem = (item, onClick, mobile = false) => {
    const navItem = getNavItem(item)
    const className = cn(
      'rounded-full px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-[#1677ff]/8 hover:text-slate-900',
      mobile && 'rounded-2xl px-4 py-3 text-base',
    )

    if (navItem.to) {
      return (
        <Link key={navItem.label} to={navItem.to} className={className} onClick={onClick}>
          {navItem.label}
        </Link>
      )
    }

    return (
      <a key={navItem.label} href={navItem.href ?? '#!'} className={className} onClick={onClick}>
        {navItem.label}
      </a>
    )
  }

  useEffect(() => {
    const closeMenu = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', closeMenu)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('resize', closeMenu)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-[#f3f8ff]/95 via-[#f3f8ff]/80 to-transparent backdrop-blur-xl">
      <div className="section-container py-3">
        <div className="rounded-[28px] border border-white/60 bg-white/65 px-4 py-3 shadow-[0_18px_46px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-5 lg:px-6">
          <div className="flex items-center justify-between gap-3">
            <Link to={appRoutes.home} className="flex min-w-0 items-center gap-3 text-inherit no-underline">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#0d6efd] to-[#16c2a3] text-base font-black tracking-[0.18em] text-white shadow-[0_16px_30px_rgba(13,110,253,0.22)]">
                QJ
              </div>
              <div className="min-w-0">
                <p className="m-0 truncate text-sm font-black text-slate-900 sm:text-base">奇迹 IP</p>
                <p className="m-0 hidden truncate text-xs text-slate-500 sm:block">
                  一站式企业级 IP 代理服务平台
                </p>
              </div>
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="主导航">
              {navItems.map((item) => renderNavItem(item))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Link to={appRoutes.userCenter} className={buttonVariants({ variant: 'secondary' })}>
                用户中心
              </Link>
              <Link to={appRoutes.login} className={buttonVariants({ variant: 'secondary' })}>
                用户登录
              </Link>
              <Link to={appRoutes.register} className={buttonVariants()}>
                立即注册
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/90 text-slate-800 shadow-sm lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div
            id="mobile-navigation"
            className={cn(
              'grid overflow-hidden transition-all duration-300 lg:hidden',
              isMenuOpen ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
            )}
          >
            <div className="overflow-hidden">
              <div className="border-t border-slate-200/80 pt-4">
                <nav className="grid gap-1" aria-label="移动端主导航">
                  {navItems.map((item) => renderNavItem(item, () => setIsMenuOpen(false), true))}
                </nav>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <Link
                    to={appRoutes.userCenter}
                    className={buttonVariants({ variant: 'secondary' })}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    用户中心
                  </Link>
                  <Link
                    to={appRoutes.login}
                    className={buttonVariants({ variant: 'secondary' })}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    用户登录
                  </Link>
                  <Link
                    to={appRoutes.register}
                    className={buttonVariants({ fullWidth: true })}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    立即注册
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
