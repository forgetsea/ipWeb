import { useState } from 'react'
import { buttonVariants } from '../../components/ui/button-variants'
import { addWhitelist, deleteWhitelist, fetchWhitelist } from '../../services/userCenterService'
import { initialWhitelistForm, parseIps } from './userCenterData'
import { TextArea, UserField, UserPanel, UserSectionHeader } from './userUi'
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
    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(280px,1.05fr)]">
      <UserPanel>
        <UserSectionHeader
          eyebrow="Whitelist"
          title="IP 白名单"
          compact
          actions={
            <button type="button" className={buttonVariants({ variant: 'secondary' })} onClick={refreshWhitelist}>
              {isSubmitting === 'whitelist-refresh' ? '刷新中...' : '刷新'}
            </button>
          }
        />

        <form className="mt-5 grid gap-5" onSubmit={handleWhitelistSubmit('add')}>
          <UserField label="IP 地址">
            <TextArea
              name="ipsText"
              value={whitelistForm.ipsText}
              onChange={updateForm(setWhitelistForm)}
              placeholder="可输入多个 IP，用换行、空格、逗号或分号分隔"
            />
          </UserField>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="submit" className={buttonVariants({})}>
              {isSubmitting === 'whitelist-add' ? '添加中...' : '批量添加'}
            </button>
            <button
              type="button"
              className={buttonVariants({ variant: 'secondary' })}
              onClick={handleWhitelistSubmit('delete')}
            >
              {isSubmitting === 'whitelist-delete' ? '删除中...' : '批量删除'}
            </button>
          </div>
        </form>
      </UserPanel>

      <UserPanel>
        <UserSectionHeader eyebrow="Current" title="当前白名单" compact />
        <div className="mt-5 flex min-h-40 flex-wrap gap-3 rounded-[24px] bg-[#f4f9ff]/82 p-4">
          {account.whitelist.length ? (
            account.whitelist.map((ip) => (
              <span key={ip} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800">
                {ip}
              </span>
            ))
          ) : (
            <p className="text-sm leading-7 text-[color:var(--muted-strong)]">当前订单还没有白名单记录。</p>
          )}
        </div>
      </UserPanel>
    </div>
  )
}

export default UserWhitelistPage
