// 文件用途：用户中心账户概览页，展示提取额度、会话和白名单摘要。
import { fetchUsage } from '../../services/userCenterService'
import { ipTypeOptions } from './userCenterData'
import { useUserCenter } from './useUserCenter'

// 模块功能：读取共享账户状态，并支持手动刷新提取余量。
function UserOverviewPage() {
  const { account, isSubmitting, requireCredentials, runAction } = useUserCenter()

  const handleUsage = () => {
    const credentials = requireCredentials()

    if (!credentials) return

    runAction({
      key: 'usage',
      action: () => fetchUsage(credentials),
      successMessage: '提取余量已刷新。',
      updateAccount: true,
    })
  }

  return (
    <section className="user-panel">
      <div className="user-section-title">
        <div>
          <p>Overview</p>
          <h2>账户概览</h2>
        </div>
        <button type="button" className="ghost-button" onClick={handleUsage}>
          {isSubmitting === 'usage' ? '查询中...' : '刷新余量'}
        </button>
      </div>

      <div className="user-overview-grid">
        <div>
          <span>每日上限</span>
          <strong>{account.dayfetchlimit}</strong>
        </div>
        <div>
          <span>会话时长</span>
          <strong>{account.sessTime}</strong>
        </div>
        <div>
          <span>返回格式</span>
          <strong>{ipTypeOptions.find((option) => option.value === account.iptype)?.label || 'JSON'}</strong>
        </div>
        <div>
          <span>白名单数量</span>
          <strong>{account.whitelist.length}</strong>
        </div>
      </div>
    </section>
  )
}

export default UserOverviewPage
