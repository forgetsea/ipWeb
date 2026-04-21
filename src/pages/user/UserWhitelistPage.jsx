import { useState } from 'react'
import { addWhitelist, deleteWhitelist, fetchWhitelist } from '../../services/userCenterService'
import { initialWhitelistForm, parseIps } from './userCenterData'
import { useUserCenter } from './useUserCenter'

function UserWhitelistPage() {
  const { account, isSubmitting, requireOrderNo, runAction, setStatus, updateForm } = useUserCenter()
  const [whitelistForm, setWhitelistForm] = useState(initialWhitelistForm)

  const refreshWhitelist = () => {
    const order = requireOrderNo()

    if (!order) return

    runAction({
      key: 'whitelist-refresh',
      action: () => fetchWhitelist(order),
      successMessage: '白名单已刷新。',
      updateAccount: true,
    })
  }

  const handleWhitelistSubmit = (actionType) => (event) => {
    event.preventDefault()

    const order = requireOrderNo()

    if (!order) return

    const ips = parseIps(whitelistForm.ipsText)

    if (!ips.length) {
      setStatus({ type: 'error', message: '请输入要操作的白名单 IP。' })
      return
    }

    runAction({
      key: `whitelist-${actionType}`,
      action: () => (actionType === 'add' ? addWhitelist({ ...order, ips }) : deleteWhitelist({ ...order, ips })),
      successMessage: actionType === 'add' ? '白名单添加请求已提交。' : '白名单删除请求已提交。',
      updateAccount: false,
      afterSuccess: () => {
        setWhitelistForm(initialWhitelistForm)
        refreshWhitelist()
      },
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
          <button type="button" className="ghost-button" onClick={refreshWhitelist}>
            {isSubmitting === 'whitelist-refresh' ? '刷新中...' : '刷新'}
          </button>
        </div>

        <form className="user-form" onSubmit={handleWhitelistSubmit('add')}>
          <label className="user-field">
            <span>IP 地址</span>
            <textarea
              name="ipsText"
              value={whitelistForm.ipsText}
              onChange={updateForm(setWhitelistForm)}
              placeholder="可输入多个 IP，用换行、空格、逗号或分号分隔"
            />
          </label>
          <div className="user-action-row">
            <button type="submit" className="primary-button">
              {isSubmitting === 'whitelist-add' ? '添加中...' : '批量添加'}
            </button>
            <button type="button" className="ghost-button" onClick={handleWhitelistSubmit('delete')}>
              {isSubmitting === 'whitelist-delete' ? '删除中...' : '批量删除'}
            </button>
          </div>
        </form>
      </div>

      <div className="whitelist-list">
        {account.whitelist.length ? (
          account.whitelist.map((ip) => <span key={ip}>{ip}</span>)
        ) : (
          <p className="user-note">当前订单还没有白名单记录。</p>
        )}
      </div>
    </section>
  )
}

export default UserWhitelistPage
