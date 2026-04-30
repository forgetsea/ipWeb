import { useMemo, useState } from 'react'
import { buttonVariants } from '../../components/ui/button-variants'
import { updateOrderLimit, updateOrderSettings } from '../../services/userCenterService'
import { initialSettingsForm, ipTypeOptions, visibilityFields } from './userCenterData'
import {
  SelectInput,
  TextInput,
  UserField,
  UserMetricGrid,
  UserPanel,
  UserSectionHeader,
} from './userUi'
import { useUserCenter } from './useUserCenter'

function normalizeSettingsForm(account) {
  return {
    ...initialSettingsForm,
    ...Object.fromEntries(Object.entries(account.settings || {}).map(([key, value]) => [key, String(value)])),
  }
}

function normalizeLimitForm(account) {
  return { dayfetchlimit: String(account.dayfetchlimit ?? account.settings?.dayfetchlimit ?? 0) }
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
      [currentOrderNo]: { ...settingsForm, [name]: value },
    }))
  }

  const handleLimitChange = (event) => {
    const { name, value } = event.target
    setLimitDrafts((current) => ({
      ...current,
      [currentOrderNo]: { ...limitForm, [name]: value },
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
    <UserPanel>
      <UserSectionHeader
        eyebrow="Order"
        title="订单设置"
        description="设置接口只修改显示项、去重、返回格式和 session。次数上限需通过单独接口维护。"
      />

      <div className="mt-6">
        <UserMetricGrid
          items={[
            {
              label: '订单类型',
              value: Number(account.userType) === 0 ? '包时型 / 每日上限' : '次数型 / 总次数',
            },
            { label: '当前上限文案', value: account.displayLimitLabel || '次数上限' },
          ]}
          columns="xl:grid-cols-2"
        />
      </div>

      <form className="mt-6 grid gap-6" onSubmit={handleSettingsSubmit}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibilityFields.map((field) => (
            <div key={field.name} className="rounded-[24px] bg-[#f4f9ff]/82 p-4">
              <UserField label={field.label}>
                <SelectInput name={field.name} value={settingsForm[field.name]} onChange={handleSettingsChange}>
                  <option value="0">不显示</option>
                  <option value="1">显示</option>
                </SelectInput>
              </UserField>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <UserField label="返回格式">
            <SelectInput name="iptype" value={settingsForm.iptype} onChange={handleSettingsChange}>
              {ipTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectInput>
          </UserField>
          <UserField label="Session 时间">
            <TextInput name="sessTime" type="number" min="1" value={settingsForm.sessTime} onChange={handleSettingsChange} />
          </UserField>
          <div className="flex items-end">
            <button type="submit" className={buttonVariants({ fullWidth: true })}>
              {isSubmitting === 'settings' ? '提交中...' : '保存订单设置'}
            </button>
          </div>
        </div>
      </form>

      <form className="mt-6 grid gap-4 border-t border-slate-200/70 pt-6 md:grid-cols-[minmax(0,1fr)_auto]" onSubmit={handleLimitSubmit}>
        <UserField label={account.displayLimitLabel || '次数上限'}>
          <TextInput name="dayfetchlimit" type="number" min="0" value={limitForm.dayfetchlimit} onChange={handleLimitChange} />
        </UserField>
        <div className="flex items-end">
          <button type="submit" className={buttonVariants({})}>
            {isSubmitting === 'limit' ? '提交中...' : '保存次数上限'}
          </button>
        </div>
      </form>
    </UserPanel>
  )
}

export default UserOrderSettingsPage
