import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { appRoutes } from '../../router'
import { orderStatusLabels, packageTypeLabels, userTypeLabels } from './userCenterData'
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
  if (!startAt && !endAt) {
    return '-'
  }

  return `${startAt || '-'} ~ ${endAt || '-'}`
}

function getPackageTypeText(item) {
  return packageTypeLabels[item.packageType] || userTypeLabels[item.userType] || '订单套餐'
}

function getExtractKeyText(item) {
  return item.extractKey || item.apiKey || item.apiAccount || '前端暂未返回'
}

function getExtractedCount(item) {
  if (item.usedQuota != null) {
    return item.usedQuota
  }

  if (item.allNum != null && item.leftNum != null) {
    return Number(item.allNum) - Number(item.leftNum)
  }

  return '-'
}

function getStatusText(item) {
  if (Number(item.isLocked) === 1) {
    return '已关闭'
  }

  return orderStatusLabels[item.orderStatus] || item.orderStatus || '-'
}

function getActionText(item) {
  return Number(item.isLocked) === 1 ? '查看' : '管理'
}

function getMenuPosition(triggerRect) {
  const menuWidth = 132
  const left = Math.min(window.innerWidth - menuWidth - 16, Math.max(16, triggerRect.left))

  return {
    top: triggerRect.bottom + 6,
    left,
  }
}

function UserCredentialsPage() {
  const { credentialForm, isSubmitting, orders, refreshOrders, selectOrder } = useUserCenter()
  const tableWrapRef = useRef(null)
  const dragStateRef = useRef({
    isDragging: false,
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
  })
  const [actionMenu, setActionMenu] = useState(null)
  const tableRows = orders.length ? orders : previewPackages
  const selectedOrderText = orders.length ? credentialForm.orderNo || '-' : '示例预览'

  useEffect(() => {
    if (!actionMenu) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (event.target.closest('.user-table-action-trigger, .user-table-action-menu')) {
        return
      }

      setActionMenu(null)
    }

    const handleWindowChange = () => {
      setActionMenu(null)
    }

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

    if (!container || event.pointerType === 'touch' || event.target.closest('.user-table-action-trigger')) {
      return
    }

    dragStateRef.current = {
      isDragging: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: container.scrollLeft,
    }

    container.classList.add('is-dragging')
    container.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event) => {
    const container = tableWrapRef.current
    const dragState = dragStateRef.current

    if (!container || !dragState.isDragging) {
      return
    }

    const deltaX = event.clientX - dragState.startX
    container.scrollLeft = dragState.startScrollLeft - deltaX
  }

  const handlePointerEnd = (event) => {
    const container = tableWrapRef.current
    const dragState = dragStateRef.current

    if (!container || !dragState.isDragging) {
      return
    }

    dragStateRef.current = {
      isDragging: false,
      pointerId: null,
      startX: 0,
      startScrollLeft: 0,
    }

    container.classList.remove('is-dragging')

    if (dragState.pointerId != null && container.hasPointerCapture(dragState.pointerId)) {
      container.releasePointerCapture(dragState.pointerId)
    }

    if (event.target?.closest('tr')) {
      event.preventDefault()
    }
  }

  const toggleActionMenu = (event, item) => {
    event.stopPropagation()

    if (orders.length) {
      selectOrder(item.orderNo)
    }

    const nextPosition = getMenuPosition(event.currentTarget.getBoundingClientRect())

    setActionMenu((current) =>
      current?.orderNo === item.orderNo ? null : { orderNo: item.orderNo, ...nextPosition },
    )
  }

  return (
    <section className="user-panel">
      <div className="user-section-title">
        <div>
          <p>Packages</p>
          <h2>用户套餐列表</h2>
        </div>
      </div>

      <div className="user-action-row user-table-toolbar">
        <div className="user-note">
          当前选中订单：<strong>{selectedOrderText}</strong>
        </div>
        <button type="button" className="ghost-button" onClick={() => refreshOrders()}>
          {isSubmitting === 'orders-load' ? '刷新中...' : '刷新套餐列表'}
        </button>
      </div>

      {!orders.length ? <p className="user-note">当前展示的是预设示例套餐</p> : null}

      <div
        ref={tableWrapRef}
        className="user-table-wrap"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onPointerLeave={handlePointerEnd}
      >
        <table className="user-table" aria-label="用户套餐列表">
          <thead>
            <tr>
              <th>套餐ID</th>
              <th>套餐名称</th>
              <th>套餐类型</th>
              <th>提取密钥</th>
              <th>IP时效(s)</th>
              <th>提取上限</th>
              <th>已提取</th>
              <th>套餐起止时间</th>
              <th>状态</th>
              <th>备注</th>
              <th className="user-table-action-cell">操作</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((item) => {
              const isActive = orders.length && item.orderNo === credentialForm.orderNo
              const isMenuOpen = actionMenu?.orderNo === item.orderNo

              return (
                <tr key={item.orderNo} className={isActive ? 'is-active' : ''} onClick={orders.length ? () => selectOrder(item.orderNo) : undefined}>
                  <td>{item.packageId || item.id || '-'}</td>
                  <td>
                    <strong>{item.packageName || item.orderNo}</strong>
                  </td>
                  <td>{getPackageTypeText(item)}</td>
                  <td>{getExtractKeyText(item)}</td>
                  <td>{item.sessTime ?? item.settings?.sessTime ?? '-'}</td>
                  <td>{item.dayfetchlimit ?? '-'}</td>
                  <td>{getExtractedCount(item)}</td>
                  <td>{formatDateRange(item.activeAt, item.expiredAt)}</td>
                  <td>{getStatusText(item)}</td>
                  <td>{item.remark || item.note || item.displayLimitLabel || '-'}</td>
                  <td className="user-table-action-cell">
                    <button
                      type="button"
                      className={`user-table-action-trigger${isMenuOpen ? ' is-open' : ''}`}
                      onClick={(event) => toggleActionMenu(event, item)}
                    >
                      <span>{getActionText(item)}</span>
                      <span className="user-table-action-caret" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {actionMenu ? (
        <div className="user-table-action-menu" style={{ top: actionMenu.top, left: actionMenu.left }} role="menu">
          <Link to={appRoutes.packageBalance} className="user-table-action-link" onClick={() => setActionMenu(null)}>
            <strong>续费</strong>
          </Link>
          <Link to={appRoutes.getIp} className="user-table-action-link" onClick={() => setActionMenu(null)}>
            <strong>API提取</strong>
          </Link>
        </div>
      ) : null}
    </section>
  )
}

export default UserCredentialsPage
