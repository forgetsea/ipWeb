// 文件用途：官网首页页面，组合首屏、产品、套餐、企业和品牌区块。
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
import './HomePage.css'

// 模块功能：把首页数据分发给各展示组件，形成完整首页。
function HomePage() {
  return (
    <div className="home-page">
      <SiteHeader navItems={navItems} />
      <main className="home-main">
        <HeroSection stats={heroStats} />
        <FeaturesSection items={featureItems} />
        <SceneStrip scenes={sceneItems} />
        <PlansSection plans={planItems} />
        <EnterpriseSection metrics={enterpriseMetrics} />
        <NewsSection articles={articleItems} />
        <BrandsSection logos={logoItems} />
      </main>
      <SiteFooter />
    </div>
  )
}

export default HomePage
