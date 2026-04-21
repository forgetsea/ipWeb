import { fetchUsage } from '../../services/userCenterService'
import { ipTypeOptions, orderStatusLabels, packageTypeLabels, userTypeLabels } from './userCenterData'
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
  const ipTypeText = ipTypeOptions.find((option) => option.value === String(settings.iptype ?? account.iptype ?? '0'))?.label || 'JSON'

  return (
    <section className="user-panel">
      <div className="user-section-title">
        <div>
          <p>Overview</p>
          <h2>账户概览</h2>
        </div>
        <button type="button" className="ghost-button" onClick={handleUsage}>
          {isSubmitting === 'usage' ? '查询中...' : '刷新额度'}
        </button>
      </div>

      <div className="user-overview-grid">
        <div>
          <span>订单号</span>
          <strong>{account.orderNo || '-'}</strong>
        </div>
        <div>
          <span>订单状态</span>
          <strong>{orderStatusLabels[account.orderStatus] || account.orderStatus || '-'}</strong>
        </div>
        <div>
          <span>套餐类型</span>
          <strong>{packageTypeText}</strong>
        </div>
        <div>
          <span>订单金额</span>
          <strong>{account.amount ?? '-'}</strong>
        </div>
        <div>
          <span>{account.displayLimitLabel || '次数上限'}</span>
          <strong>{account.dayfetchlimit ?? '-'}</strong>
        </div>
        <div>
          <span>剩余额度</span>
          <strong>{account.leftNum ?? account.remainingQuota ?? '-'}</strong>
        </div>
        <div>
          <span>总额度</span>
          <strong>{account.allNum ?? account.totalQuota ?? '-'}</strong>
        </div>
        <div>
          <span>已用额度</span>
          <strong>{account.usedQuota ?? '-'}</strong>
        </div>
        <div>
          <span>Session 时间</span>
          <strong>{settings.sessTime ?? account.sessTime ?? '-'}</strong>
        </div>
        <div>
          <span>返回格式</span>
          <strong>{ipTypeText}</strong>
        </div>
        <div>
          <span>白名单数量</span>
          <strong>{account.whitelist.length}</strong>
        </div>
        <div>
          <span>API 开关</span>
          <strong>{Number(account.isLocked) === 0 ? '开启' : '关闭'}</strong>
        </div>
      </div>

      <div className="user-key-value-grid">
        <div>
          <span>下单时间</span>
          <strong>{account.createdAt || '-'}</strong>
        </div>
        <div>
          <span>支付时间</span>
          <strong>{account.paidAt || '-'}</strong>
        </div>
        <div>
          <span>生效时间</span>
          <strong>{account.activeAt || '-'}</strong>
        </div>
        <div>
          <span>结束时间</span>
          <strong>{account.expiredAt || '-'}</strong>
        </div>
      </div>
    </section>
  )
}

export default UserOverviewPage
