import { fixedPackagePage } from '../../data/packageData'
import { PackagePlans, PackageSummary } from './packageUi'

function FixedPackagePage() {
  return (
    <div className="grid gap-6">
      <PackageSummary {...fixedPackagePage.summaryCard} />
      <PackagePlans countText="共 8 个套餐" plans={fixedPackagePage.plans} />
    </div>
  )
}

export default FixedPackagePage
