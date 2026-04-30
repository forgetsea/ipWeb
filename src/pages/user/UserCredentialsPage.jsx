import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { buttonVariants } from '../../components/ui/button-variants'
import { appRoutes } from '../../router'
import { orderStatusLabels, packageTypeLabels, userTypeLabels } from './userCenterData'
import { UserPanel, UserSectionHeader } from './userUi'
import { useUserCenter } from './useUserCenter'

const previewPackages = [
  {
    orderNo: 'PREVIEW-001',
    packageId: 20001,
    packageName: '动态住宅 IP 月包',
    packageType: 'time_based',
    userType: 0,
    apiAccount: 'preview_key_alpha',
    sessTime: 120,
    dayfetchlimit: 3000,
    usedQuota: 1280,
    activeAt: '2026-04-01 00:00:00',
    expiredAt: '2026-04-30 23:59:59',
    orderStatus: 'active',
    remark: '示例预览数据，仅用于查看表格样式',
  },
  {
    orderNo: 'PREVIEW-002',
    packageId: 20002,
    packageName: '静态机房 IP 次数包',
    packageType: 'balance',
    userType: 1,
    apiAccount: 'preview_key_beta',
    sessTime: 60,
    dayfetchlimit: 10000,
    usedQuota: 4620,
    activeAt: '2026-04-05 10:00:00',
    expiredAt: '2026-06-05 10:00:00',
    orderStatus: 'paid',
    remark: '示例预览数据，仅用于查看表格样式',
  },
]

function formatDateRange(startAt, endAt) {
  if (!startAt && !endAt) return '-'
  return `${startAt || '-'} ~ ${endAt || '-'}`
}

function getPackageTypeText(item) {
  return packageTypeLabels[item.packageType] || userTypeLabels[item.userType] || '订单套餐'
}

function getExtractKeyText(item) {
  return item.extractKey || item.apiKey || item.apiAccount || '前端暂未返回'
}

function getExtractedCount(item) {
  if (item.usedQuota != null) return item.usedQuota
  if (item.allNum != null && item.leftNum != null) return Number(item.allNum) - Number(item.leftNum)
  return '-'
}

function getStatusText(item) {
  if (Number(item.isLocked) === 1) return '已关闭'
  return orderStatusLabels[item.orderStatus] || item.orderStatus || '-'
}

function getActionText(item) {
  return Number(item.isLocked) === 1 ? '查看' : '管理'
}

function getMenuPosition(triggerRect) {
  const menuWidth = 132
  const left = Math.min(window.innerWidth - menuWidth - 16, Math.max(16, triggerRect.left))
  return { top: triggerRect.bottom + 6, left }
}

function UserCredentialsPage() {
  const { credentialForm, isSubmitting, orders, refreshOrders, selectOrder } = useUserCenter()
  const tableWrapRef = useRef(null)
  const dragStateRef = useRef({ isDragging: false, pointerId: null, startX: 0, startScrollLeft: 0 })
  const [actionMenu, setActionMenu] = useState(null)
  const tableRows = orders.length ? orders : previewPackages
  const selectedOrderText = orders.length ? credentialForm.orderNo || '-' : '示例预览'

  useEffect(() => {
    if (!actionMenu) return undefined
    const handlePointerDown = (event) => {
      if (event.target.closest('.user-table-action-trigger, .user-table-action-menu')) return
      setActionMenu(null)
    }
    const handleWindowChange = () => setActionMenu(null)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('resize', handleWindowChange)
    window.addEventListener('scroll', handleWindowChange, true)
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('resize', handleWindowChange)
      window.removeEventListener('scroll', handleWindowChange, true)
    }
  }, [actionMenu])

  const handlePointerDown = (event) => {
    const container = tableWrapRef.current
    if (!container || event.pointerType === 'touch' || event.target.closest('.user-table-action-trigger')) return
    dragStateRef.current = {
      isDragging: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: container.scrollLeft,
    }
    container.classList.add('cursor-grabbing')
    container.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event) => {
    const container = tableWrapRef.current
    const dragState = dragStateRef.current
    if (!container || !dragState.isDragging) return
    container.scrollLeft = dragState.startScrollLeft - (event.clientX - dragState.startX)
  }

  const handlePointerEnd = (event) => {
    const container = tableWrapRef.current
    const dragState = dragStateRef.current
    if (!container || !dragState.isDragging) return

    dragStateRef.current = { isDragging: false, pointerId: null, startX: 0, startScrollLeft: 0 }
    container.classList.remove('cursor-grabbing')
    if (dragState.pointerId != null && container.hasPointerCapture(dragState.pointerId)) {
      container.releasePointerCapture(dragState.pointerId)
    }
    if (event.target?.closest('tr')) event.preventDefault()
  }

  const toggleActionMenu = (event, item) => {
    event.stopPropagation()
    if (orders.length) selectOrder(item.orderNo)
    const nextPosition = getMenuPosition(event.currentTarget.getBoundingClientRect())
    setActionMenu((current) => (current?.orderNo === item.orderNo ? null : { orderNo: item.orderNo, ...nextPosition }))
  }

  return (
    <UserPanel>
      <UserSectionHeader eyebrow="Packages" title="用户套餐列表" compact />

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm leading-7 text-[color:var(--muted-strong)]">
          当前选中订单：<strong className="text-slate-900">{selectedOrderText}</strong>
        </div>
        <button type="button" className={buttonVariants({ variant: 'secondary' })} onClick={() => refreshOrders()}>
          {isSubmitting === 'orders-load' ? '刷新中...' : '刷新套餐列表'}
        </button>
      </div>

      {!orders.length ? <p className="mt-3 text-sm text-[color:var(--muted-strong)]">当前展示的是预设示例套餐。</p> : null}

      <div
        ref={tableWrapRef}
        className="mt-5 hidden max-w-full overflow-x-auto overflow-y-hidden rounded-[24px] border border-slate-200/70 bg-[#f4f9ff]/70 cursor-grab overscroll-x-contain md:block"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onPointerLeave={handlePointerEnd}
      >
        <table className="w-max min-w-[1480px] border-collapse" aria-label="用户套餐列表">
          <thead>
            <tr className="bg-[#e8f1ff]/96 text-left text-sm font-black text-slate-900">
              {['套餐ID', '套餐名称', '套餐类型', '提取密钥', 'IP时效(s)', '提取上限', '已提取', '套餐起止时间', '状态', '备注', '操作'].map(
                (title, index) => (
                  <th
                    key={title}
                    className={`border-b border-slate-200/70 px-4 py-4 whitespace-nowrap ${
                      index === 10 ? 'sticky right-0 z-10 bg-[#e8f1ff]/98 shadow-[-14px_0_24px_rgba(16,47,102,0.08)]' : ''
                    }`}
                  >
                    {title}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((item) => {
              const isActive = orders.length && item.orderNo === credentialForm.orderNo
              const isMenuOpen = actionMenu?.orderNo === item.orderNo

              return (
                <tr
                  key={item.orderNo}
                  className={`cursor-pointer transition ${isActive ? 'bg-[#0d6efd]/8' : 'hover:bg-[#0d6efd]/6'}`}
                  onClick={orders.length ? () => selectOrder(item.orderNo) : undefined}
                >
                  <td className="border-b border-slate-200/70 px-4 py-4 text-sm text-slate-600">{item.packageId || item.id || '-'}</td>
                  <td className="border-b border-slate-200/70 px-4 py-4 text-sm"><strong className="text-slate-900">{item.packageName || item.orderNo}</strong></td>
                  <td className="border-b border-slate-200/70 px-4 py-4 text-sm text-slate-600">{getPackageTypeText(item)}</td>
                  <td className="border-b border-slate-200/70 px-4 py-4 text-sm text-slate-600">{getExtractKeyText(item)}</td>
                  <td className="border-b border-slate-200/70 px-4 py-4 text-sm text-slate-600">{item.sessTime ?? item.settings?.sessTime ?? '-'}</td>
                  <td className="border-b border-slate-200/70 px-4 py-4 text-sm text-slate-600">{item.dayfetchlimit ?? '-'}</td>
                  <td className="border-b border-slate-200/70 px-4 py-4 text-sm text-slate-600">{getExtractedCount(item)}</td>
                  <td className="border-b border-slate-200/70 px-4 py-4 text-sm text-slate-600">{formatDateRange(item.activeAt, item.expiredAt)}</td>
                  <td className="border-b border-slate-200/70 px-4 py-4 text-sm text-slate-600">{getStatusText(item)}</td>
                  <td className="border-b border-slate-200/70 px-4 py-4 text-sm text-slate-600">{item.remark || item.note || item.displayLimitLabel || '-'}</td>
                  <td className="sticky right-0 border-b border-slate-200/70 bg-[#f8fbff]/98 px-4 py-4 shadow-[-14px_0_24px_rgba(16,47,102,0.08)]">
                    <button
                      type="button"
                      className={`user-table-action-trigger inline-flex items-center gap-2 text-sm font-bold ${isMenuOpen ? 'text-[#1677ff]' : 'text-slate-900'}`}
                      onClick={(event) => toggleActionMenu(event, item)}
                    >
                      <span>{getActionText(item)}</span>
                      <span className="h-0 w-0 border-x-[5px] border-x-transparent border-t-[6px] border-t-slate-500" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-5 grid gap-4 md:hidden">
        {tableRows.map((item) => {
          const isActive = orders.length && item.orderNo === credentialForm.orderNo

          return (
            <div
              key={item.orderNo}
              className={`rounded-[24px] border p-5 shadow-sm transition ${
                isActive
                  ? 'border-[#1677ff]/30 bg-[#eef5ff]'
                  : 'border-slate-200/70 bg-[#f8fbff]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                    套餐 ID {item.packageId || item.id || '-'}
                  </p>
                  <h3 className="mt-2 text-lg font-black leading-7 text-slate-900">
                    {item.packageName || item.orderNo}
                  </h3>
                </div>
                <span className="shrink-0 rounded-full bg-[#1677ff]/8 px-3 py-1 text-xs font-bold text-[#1677ff]">
                  {getStatusText(item)}
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ['套餐类型', getPackageTypeText(item)],
                  ['提取密钥', getExtractKeyText(item)],
                  ['IP时效(s)', item.sessTime ?? item.settings?.sessTime ?? '-'],
                  ['提取上限', item.dayfetchlimit ?? '-'],
                  ['已提取', getExtractedCount(item)],
                  ['套餐起止时间', formatDateRange(item.activeAt, item.expiredAt)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
                    <span className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                      {label}
                    </span>
                    <strong className="mt-1 block break-all text-sm leading-6 text-slate-900">
                      {value}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
                <span className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  备注
                </span>
                <p className="mt-1 break-words text-sm leading-6 text-[color:var(--muted-strong)]">
                  {item.remark || item.note || item.displayLimitLabel || '-'}
                </p>
              </div>

              <div className="mt-4 grid gap-3">
                <button
                  type="button"
                  className={buttonVariants({ variant: isActive ? 'default' : 'secondary', fullWidth: true })}
                  onClick={() => orders.length && selectOrder(item.orderNo)}
                >
                  {isActive ? '当前已选中' : getActionText(item)}
                </button>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    to={appRoutes.packageBalance}
                    className={buttonVariants({ variant: 'secondary', fullWidth: true })}
                  >
                    续费
                  </Link>
                  <Link
                    to={appRoutes.getIp}
                    className={buttonVariants({ variant: 'outline', fullWidth: true })}
                  >
                    API提取
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {actionMenu ? (
        <div
          className="user-table-action-menu fixed z-40 grid w-[100px] gap-1 rounded-2xl border border-slate-200 bg-white/98 p-1.5 shadow-[0_20px_46px_rgba(16,47,102,0.16)]"
          style={{ top: actionMenu.top, left: actionMenu.left }}
          role="menu"
        >
          <Link to={appRoutes.packageBalance} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 no-underline hover:bg-[#0d6efd]/8" onClick={() => setActionMenu(null)}>
            续费
          </Link>
          <Link to={appRoutes.getIp} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 no-underline hover:bg-[#0d6efd]/8" onClick={() => setActionMenu(null)}>
            API提取
          </Link>
        </div>
      ) : null}
    </UserPanel>
  )
}

export default UserCredentialsPage
