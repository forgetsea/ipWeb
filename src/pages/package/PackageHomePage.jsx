import SiteFooter from '../../components/layout/SiteFooter'
import SiteHeader from '../../components/layout/SiteHeader'
import { navItems } from '../../data/homeData'
import { packageHomeHero, packageSections } from '../../data/packageData'
import { PackageCards, PackageHero } from './packageUi'

function PackageHomePage() {
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
          sideField="title"
        />
        <PackageCards items={packageSections} />
      </main>
      <SiteFooter />
    </div>
  )
}

export default PackageHomePage
