// 文件用途：用户中心白名单页，管理允许访问接口的 IP 地址。
import { useState } from 'react'
import { updateWhitelist } from '../../services/userCenterService'
import { initialWhitelistForm } from './userCenterData'
import { useUserCenter } from './useUserCenter'

// 模块功能：提交白名单新增/删除请求，并展示当前白名单列表。
function UserWhitelistPage() {
  const { account, isSubmitting, requireCredentials, runAction, setStatus, updateForm } = useUserCenter()
  const [whitelistForm, setWhitelistForm] = useState(initialWhitelistForm)

  const handleWhitelistSubmit = (op) => (event) => {
    event.preventDefault()

    const credentials = requireCredentials()

    if (!credentials) return

    if (!whitelistForm.ipAddress.trim()) {
      setStatus({ type: 'error', message: '请输入要操作的白名单 IP。' })
      return
    }

    runAction({
      key: `whitelist-${op}`,
      action: () =>
        updateWhitelist({
          ...credentials,
          op,
          ip_address: whitelistForm.ipAddress.trim(),
        }),
      successMessage: op === 'add' ? '白名单添加请求已提交。' : '白名单删除请求已提交。',
      updateAccount: true,
    })
  }

  return (
    <section className="user-panel user-two-column">
      <div>
        <div className="user-section-title compact">
          <div>
            <p>Whitelist</p>
            <h2>IP 白名单</h2>
          </div>
        </div>

        <form className="user-form" onSubmit={handleWhitelistSubmit('add')}>
          <label className="user-field">
            <span>IP 地址</span>
            <input
              name="ipAddress"
              value={whitelistForm.ipAddress}
              onChange={updateForm(setWhitelistForm)}
              placeholder="例如 123.123.123.123"
            />
          </label>
          <div className="user-action-row">
            <button type="submit" className="primary-button">
              {isSubmitting === 'whitelist-add' ? '添加中...' : '添加'}
            </button>
            <button type="button" className="ghost-button" onClick={handleWhitelistSubmit('del')}>
              {isSubmitting === 'whitelist-del' ? '删除中...' : '删除'}
            </button>
          </div>
        </form>
      </div>

      <div className="whitelist-list">
        {account.whitelist.map((ip) => (
          <span key={ip}>{ip}</span>
        ))}
      </div>
    </section>
  )
}

export default UserWhitelistPage
