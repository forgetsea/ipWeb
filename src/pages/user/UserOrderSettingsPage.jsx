import { useState } from 'react'
import { updateDailyLimit, updateOrderSettings } from '../../services/userCenterService'
import { initialLimitForm, initialSettingsForm, ipTypeOptions, visibilityFields } from './userCenterData'
import { useUserCenter } from './useUserCenter'

function UserOrderSettingsPage() {
  const { account, isSubmitting, requireCredentials, runAction, updateForm } = useUserCenter()
  const [settingsForm, setSettingsForm] = useState(initialSettingsForm)
  const [limitForm, setLimitForm] = useState(initialLimitForm)

  const handleSettingsSubmit = (event) => {
    event.preventDefault()

    const credentials = requireCredentials()

    if (!credentials) return

    runAction({
      key: 'settings',
      action: () => updateOrderSettings({ ...credentials, ...settingsForm }),
      successMessage: '订单设置已提交。',
      updateAccount: true,
    })
  }

  const handleLimitSubmit = (event) => {
    event.preventDefault()

    const credentials = requireCredentials()

    if (!credentials) return

    runAction({
      key: 'limit',
      action: () => updateDailyLimit({ ...credentials, ...limitForm }),
      successMessage: '每日次数上限已提交。',
      updateAccount: true,
    })
  }

  return (
    <section className="user-panel">
      <div className="user-section-title">
        <div>
          <p>Order</p>
          <h2>创建订单账户</h2>
        </div>
        <span>当前上限：{account.dayfetchlimit}</span>
      </div>

      <form className="user-form" onSubmit={handleSettingsSubmit}>
        <div className="setting-switches">
          {visibilityFields.map((field) => (
            <label key={field.name} className="user-switch">
              <span>{field.label}</span>
              <select name={field.name} value={settingsForm[field.name]} onChange={updateForm(setSettingsForm)}>
                <option value="0">不显示</option>
                <option value="1">显示</option>
              </select>
            </label>
          ))}
        </div>

        <div className="user-form-grid">
          <label className="user-field">
            <span>返回格式</span>
            <select name="iptype" value={settingsForm.iptype} onChange={updateForm(setSettingsForm)}>
              {ipTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="user-field">
            <span>会话时长</span>
            <input
              name="sessTime"
              type="number"
              min="1"
              max="5"
              value={settingsForm.sessTime}
              onChange={updateForm(setSettingsForm)}
            />
          </label>
          <button type="submit" className="primary-button user-form-submit">
            {isSubmitting === 'settings' ? '提交中...' : '保存订单设置'}
          </button>
        </div>
      </form>

      <form className="user-inline-form" onSubmit={handleLimitSubmit}>
        <label className="user-field">
          <span>每日次数上限</span>
          <input
            name="dayfetchlimit"
            type="number"
            min="1"
            value={limitForm.dayfetchlimit}
            onChange={updateForm(setLimitForm)}
          />
        </label>
        <button type="submit" className="ghost-button">
          {isSubmitting === 'limit' ? '提交中...' : '更新上限'}
        </button>
      </form>
    </section>
  )
}

export default UserOrderSettingsPage
