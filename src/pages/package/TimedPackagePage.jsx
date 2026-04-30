import { timedPackagePage } from '../../data/packageData'
import { PackagePlans, PackageSummary } from './packageUi'

function TimedPackagePage() {
  return (
    <div className="grid gap-6">
      <PackageSummary {...timedPackagePage.summaryCard} />
      <PackagePlans countText="共 8 个套餐" plans={timedPackagePage.plans} />
    </div>
  )
}

export default TimedPackagePage
