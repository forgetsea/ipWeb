import { balancePackagePage } from '../../data/packageData'
import { PackagePlans, PackageSummary } from './packageUi'

function BalancePackagePage() {
  return (
    <div className="grid gap-6">
      <PackageSummary {...balancePackagePage.summaryCard} />
      <PackagePlans countText="共 8 个套餐" plans={balancePackagePage.plans} />
    </div>
  )
}

export default BalancePackagePage
