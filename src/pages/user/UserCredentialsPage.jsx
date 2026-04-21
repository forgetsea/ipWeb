import { syncOrderApiInfo } from '../../services/userCenterService'
import { orderStatusLabels, packageTypeLabels, userTypeLabels } from './userCenterData'
import { useUserCenter } from './useUserCenter'

function UserCredentialsPage() {
  const {
    account,
    credentialForm,
    handleRefresh,
    handleUsage,
    isSubmitting,
    orders,
    refreshOrders,
    requireOrderNo,
    runAction,
    selectOrder,
    setCredentialForm,
    updateForm,
  } = useUserCenter()

  const handleSync = () => {
    const order = requireOrderNo()

    if (!order) return

    runAction({
      key: 'sync',
      action: () => syncOrderApiInfo(order.orderNo),
      successMessage: '订单 API 信息已同步。',
    })
  }

  return (
    <section className="user-panel">
      <div className="user-section-title">
        <div>
          <p>Order API</p>
          <h2>订单 API 信息</h2>
        </div>
        <span>API 账号通常等于订单号，API 密钥由平台服务器维护，不在前端展示。</span>
      </div>

      <form className="user-form user-form-grid">
        <label className="user-field">
          <span>订单号</span>
          <input
            name="orderNo"
            list="user-order-nos"
            value={credentialForm.orderNo}
            onChange={updateForm(setCredentialForm)}
            placeholder="例如 P202604200001"
          />
          <datalist id="user-order-nos">
            {orders.map((item) => (
              <option key={item.orderNo} value={item.orderNo}>
                {item.packageName || item.orderNo}
              </option>
            ))}
          </datalist>
        </label>

        <div className="user-action-row user-form-submit">
          <button type="button" className="primary-button" onClick={handleRefresh}>
            {isSubmitting === 'refresh' ? '刷新中...' : '刷新当前订单'}
          </button>
          <button type="button" className="ghost-button" onClick={handleUsage}>
            {isSubmitting === 'usage' ? '查询中...' : '查询额度'}
          </button>
          <button type="button" className="ghost-button" onClick={handleSync}>
            {isSubmitting === 'sync' ? '同步中...' : '同步上游'}
          </button>
          <button type="button" className="ghost-button" onClick={() => refreshOrders()}>
            {isSubmitting === 'orders-load' ? '刷新中...' : '刷新订单列表'}
          </button>
        </div>
      </form>

      {orders.length ? (
        <div className="order-list">
          {orders.map((item) => {
            const isActive = item.orderNo === credentialForm.orderNo
            const packageText = packageTypeLabels[item.packageType] || userTypeLabels[item.userType] || '订单套餐'

            return (
              <button
                key={item.orderNo}
                type="button"
                className={`order-list-item${isActive ? ' is-active' : ''}`}
                onClick={() => selectOrder(item.orderNo)}
              >
                <strong>{item.packageName || item.orderNo}</strong>
                <span>{item.orderNo}</span>
                <span>{orderStatusLabels[item.orderStatus] || item.orderStatus || '-'}</span>
                <span>{packageText}</span>
              </button>
            )
          })}
        </div>
      ) : (
        <p className="user-note">当前还没有可选订单，可以手动输入订单号后刷新。</p>
      )}

      <div className="user-key-value-grid">
        <div>
          <span>API 账号</span>
          <strong>{account.apiAccount || account.orderNo || '-'}</strong>
        </div>
        <div>
          <span>订单状态</span>
          <strong>{orderStatusLabels[account.orderStatus] || account.orderStatus || '-'}</strong>
        </div>
        <div>
          <span>支付状态</span>
          <strong>{account.payStatus || '-'}</strong>
        </div>
        <div>
          <span>套餐名称</span>
          <strong>{account.packageName || '-'}</strong>
        </div>
      </div>
    </section>
  )
}

export default UserCredentialsPage
