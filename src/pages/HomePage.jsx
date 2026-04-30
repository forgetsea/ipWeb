import BrandsSection from '../components/home/BrandsSection'
import EnterpriseSection from '../components/home/EnterpriseSection'
import FeaturesSection from '../components/home/FeaturesSection'
import HeroSection from '../components/home/HeroSection'
import NewsSection from '../components/home/NewsSection'
import PlansSection from '../components/home/PlansSection'
import SceneStrip from '../components/home/SceneStrip'
import SiteFooter from '../components/layout/SiteFooter'
import SiteHeader from '../components/layout/SiteHeader'
import {
  articleItems,
  enterpriseMetrics,
  featureItems,
  heroStats,
  logoItems,
  navItems,
  planItems,
  sceneItems,
} from '../data/homeData'

function HomePage() {
  return (
    <div className="w-full overflow-x-clip pt-24 sm:pt-28">
      <SiteHeader navItems={navItems} />
      <main className="grid gap-3 pb-8">
        <HeroSection stats={heroStats} />
        <div id="features">
          <FeaturesSection items={featureItems} />
        </div>
        <SceneStrip scenes={sceneItems} />
        <div id="plans">
          <PlansSection plans={planItems} />
        </div>
        <div id="enterprise">
          <EnterpriseSection metrics={enterpriseMetrics} />
        </div>
        <div id="news">
          <NewsSection articles={articleItems} />
        </div>
        <BrandsSection logos={logoItems} />
      </main>
      <SiteFooter />
    </div>
  )
}

export default HomePage
