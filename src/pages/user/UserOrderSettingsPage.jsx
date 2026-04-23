import { useMemo, useState } from 'react'
import { updateOrderLimit, updateOrderSettings } from '../../services/userCenterService'
import { initialSettingsForm, ipTypeOptions, visibilityFields } from './userCenterData'
import { useUserCenter } from './useUserCenter'

function normalizeSettingsForm(account) {
  return {
    ...initialSettingsForm,
    ...Object.fromEntries(Object.entries(account.settings || {}).map(([key, value]) => [key, String(value)])),
  }
}

function normalizeLimitForm(account) {
  return {
    dayfetchlimit: String(account.dayfetchlimit ?? account.settings?.dayfetchlimit ?? 0),
  }
}

function UserOrderSettingsPage() {
  const { account, isSubmitting, requireOrderNo, runAction, setStatus } = useUserCenter()
  const [settingsDrafts, setSettingsDrafts] = useState({})
  const [limitDrafts, setLimitDrafts] = useState({})

  const currentOrderNo = account.orderNo || ''
  const defaultSettingsForm = useMemo(() => normalizeSettingsForm(account), [account])
  const defaultLimitForm = useMemo(() => normalizeLimitForm(account), [account])
  const settingsForm = currentOrderNo ? settingsDrafts[currentOrderNo] || defaultSettingsForm : defaultSettingsForm
  const limitForm = currentOrderNo ? limitDrafts[currentOrderNo] || defaultLimitForm : defaultLimitForm

  const handleSettingsChange = (event) => {
    const { name, value } = event.target

    setSettingsDrafts((current) => ({
      ...current,
      [currentOrderNo]: {
        ...settingsForm,
        [name]: value,
      },
    }))
  }

  const handleLimitChange = (event) => {
    const { name, value } = event.target

    setLimitDrafts((current) => ({
      ...current,
      [currentOrderNo]: {
        ...limitForm,
        [name]: value,
      },
    }))
  }

  const handleSettingsSubmit = (event) => {
    event.preventDefault()

    const order = requireOrderNo()

    if (!order) return

    runAction({
      key: 'settings',
      action: () => updateOrderSettings({ ...order, ...settingsForm }),
      successMessage: '订单设置已保存。',
      updateAccount: true,
      afterSuccess: () => {
        setSettingsDrafts((current) => {
          const next = { ...current }
          delete next[order.orderNo]
          return next
        })
      },
    })
  }

  const handleLimitSubmit = (event) => {
    event.preventDefault()

    const order = requireOrderNo()

    if (!order) return

    const nextLimit = Number(limitForm.dayfetchlimit)

    if (!Number.isFinite(nextLimit) || nextLimit < 0) {
      setStatus({ type: 'error', message: '次数上限必须是大于等于 0 的数字。' })
      return
    }

    runAction({
      key: 'limit',
      action: () => updateOrderLimit({ ...order, dayfetchlimit: nextLimit }),
      successMessage: '次数上限已更新。',
      updateAccount: true,
      afterSuccess: () => {
        setLimitDrafts((current) => {
          const next = { ...current }
          delete next[order.orderNo]
          return next
        })
      },
    })
  }

  return (
    <section className="user-panel">
      <div className="user-section-title">
        <div>
          <p>Order</p>
          <h2>订单设置</h2>
        </div>
        <span>设置接口只修改显示项、去重、返回格式和 session。次数上限需通过单独接口维护。</span>
      </div>

      <div className="user-key-value-grid">
        <div>
          <span>订单类型</span>
          <strong>{Number(account.userType) === 0 ? '包时型 / 每日上限' : '次数型 / 总次数'}</strong>
        </div>
        <div>
          <span>当前上限文案</span>
          <strong>{account.displayLimitLabel || '次数上限'}</strong>
        </div>
      </div>

      <form className="user-form" onSubmit={handleSettingsSubmit}>
        <div className="setting-switches">
          {visibilityFields.map((field) => (
            <label key={field.name} className="user-switch">
              <span>{field.label}</span>
              <select name={field.name} value={settingsForm[field.name]} onChange={handleSettingsChange}>
                <option value="0">不显示</option>
                <option value="1">显示</option>
              </select>
            </label>
          ))}
        </div>

        <div className="user-form-grid">
          <label className="user-field">
            <span>返回格式</span>
            <select name="iptype" value={settingsForm.iptype} onChange={handleSettingsChange}>
              {ipTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="user-field">
            <span>Session 时间</span>
            <input name="sessTime" type="number" min="1" value={settingsForm.sessTime} onChange={handleSettingsChange} />
          </label>
          <button type="submit" className="primary-button user-form-submit">
            {isSubmitting === 'settings' ? '提交中...' : '保存订单设置'}
          </button>
        </div>
      </form>

      <form className="user-inline-form" onSubmit={handleLimitSubmit}>
        <label className="user-field">
          <span>{account.displayLimitLabel || '次数上限'}</span>
          <input name="dayfetchlimit" type="number" min="0" value={limitForm.dayfetchlimit} onChange={handleLimitChange} />
        </label>
        <button type="submit" className="primary-button user-form-submit">
          {isSubmitting === 'limit' ? '提交中...' : '保存次数上限'}
        </button>
      </form>
    </section>
  )
}

export default UserOrderSettingsPage
