import { Navigate, Outlet, useLocation } from 'react-router-dom'
import SiteFooter from '../../components/layout/SiteFooter'
import SiteHeader from '../../components/layout/SiteHeader'
import { Surface } from '../../components/ui/surface'
import { navItems } from '../../data/homeData'
import { packageHomeHero, packageSections } from '../../data/packageData'
import { appRoutes } from '../../router'
import { PackageHero, PackageTabs } from './packageUi'

function PackageLayoutPage() {
  const location = useLocation()

  if (location.pathname === appRoutes.package) {
    return <Navigate to={appRoutes.packageBalance} replace />
  }

  return (
    <div className="w-full overflow-x-clip pt-24 sm:pt-28">
      <SiteHeader navItems={navItems} />
      <main className="section-container grid gap-6 pb-10">
        <PackageHero
          eyebrow={packageHomeHero.eyebrow}
          title={packageHomeHero.title}
          description={packageHomeHero.description}
          sideTitle="套餐导航"
          sideItems={packageSections}
        />

        <PackageTabs items={packageSections} />

        <Surface className="rounded-[32px] border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(247,250,255,0.94))] p-6 sm:p-8">
          <Outlet />
        </Surface>
      </main>
      <SiteFooter />
    </div>
  )
}

export default PackageLayoutPage
