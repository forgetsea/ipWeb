import { fetchUsage } from '../../services/userCenterService'
import { buttonVariants } from '../../components/ui/button-variants'
import { ipTypeOptions, orderStatusLabels, packageTypeLabels, userTypeLabels } from './userCenterData'
import { UserMetricGrid, UserPanel, UserSectionHeader } from './userUi'
import { useUserCenter } from './useUserCenter'

function UserOverviewPage() {
  const { account, isSubmitting, requireOrderNo, runAction } = useUserCenter()

  const handleUsage = () => {
    const order = requireOrderNo()
    if (!order) return
    runAction({
      key: 'usage',
      action: () => fetchUsage(order),
      successMessage: '额度信息已刷新。',
      updateAccount: true,
    })
  }

  const settings = account.settings || {}
  const packageTypeText = packageTypeLabels[account.packageType] || userTypeLabels[account.userType] || '-'
  const ipTypeText =
    ipTypeOptions.find((option) => option.value === String(settings.iptype ?? account.iptype ?? '0'))?.label || 'JSON'

  const overviewItems = [
    { label: '订单号', value: account.orderNo || '-' },
    { label: '订单状态', value: orderStatusLabels[account.orderStatus] || account.orderStatus || '-' },
    { label: '套餐类型', value: packageTypeText },
    { label: '订单金额', value: account.amount ?? '-' },
    { label: account.displayLimitLabel || '次数上限', value: account.dayfetchlimit ?? '-' },
    { label: '剩余额度', value: account.leftNum ?? account.remainingQuota ?? '-' },
    { label: '总额度', value: account.allNum ?? account.totalQuota ?? '-' },
    { label: '已用额度', value: account.usedQuota ?? '-' },
    { label: 'Session 时间', value: settings.sessTime ?? account.sessTime ?? '-' },
    { label: '返回格式', value: ipTypeText },
    { label: '白名单数量', value: account.whitelist.length },
    { label: 'API 开关', value: Number(account.isLocked) === 0 ? '开启' : '关闭' },
  ]

  const timeItems = [
    { label: '下单时间', value: account.createdAt || '-' },
    { label: '支付时间', value: account.paidAt || '-' },
    { label: '生效时间', value: account.activeAt || '-' },
    { label: '结束时间', value: account.expiredAt || '-' },
  ]

  return (
    <UserPanel>
      <UserSectionHeader
        eyebrow="Overview"
        title="账户概览"
        actions={
          <button type="button" className={buttonVariants({ variant: 'secondary' })} onClick={handleUsage}>
            {isSubmitting === 'usage' ? '查询中...' : '刷新额度'}
          </button>
        }
      />

      <div className="mt-6">
        <UserMetricGrid items={overviewItems} />
      </div>
      <div className="mt-4">
        <UserMetricGrid items={timeItems} columns="xl:grid-cols-4" />
      </div>
    </UserPanel>
  )
}

export default UserOverviewPage
