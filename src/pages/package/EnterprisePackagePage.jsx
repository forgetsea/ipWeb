import { enterprisePackagePage } from '../../data/packageData'
import { PackagePlans, PackageSummary } from './packageUi'

function EnterprisePackagePage() {
  return (
    <div className="grid gap-6">
      <PackageSummary {...enterprisePackagePage.summaryCard} />
      <PackagePlans countText="共 8 个套餐" plans={enterprisePackagePage.plans} actionLabel="联系咨询" />
    </div>
  )
}

export default EnterprisePackagePage
