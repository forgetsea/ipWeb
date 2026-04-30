import { Outlet } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import SiteFooter from '../../components/layout/SiteFooter'
import SiteHeader from '../../components/layout/SiteHeader'
import { Card, CardContent } from '../../components/ui/card'
import { navItems } from '../../data/homeData'
import { fetchOrderApiInfo, fetchOrderDetail, fetchOrders, fetchUsage } from '../../services/userCenterService'
import {
  getMessage,
  initialCredentialForm,
  normalizeAccountData,
  normalizeOrderList,
  orderStatusLabels,
  packageTypeLabels,
  sampleAccount,
  userTypeLabels,
} from './userCenterData'

function mergeOrderWorkspace(detailResult, apiResult) {
  return {
    ...detailResult,
    data: {
      ...(detailResult?.data || {}),
      ...(apiResult?.data || {}),
      settings: apiResult?.data?.settings || detailResult?.data?.settings,
      whitelist: apiResult?.data?.whitelist || detailResult?.data?.whitelist,
    },
  }
}

function UserCenterPage() {
  const [credentialForm, setCredentialForm] = useState(initialCredentialForm)
  const [account, setAccount] = useState(sampleAccount)
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState('')

  const updateForm = (setter) => (event) => {
    const { name, value } = event.target
    setter((current) => ({ ...current, [name]: value }))
  }

  const requireOrderNo = useCallback(() => {
    if (!credentialForm.orderNo.trim()) {
      setStatus({ type: 'error', message: '请先填写或选择订单号。' })
      return null
    }
    return { orderNo: credentialForm.orderNo.trim() }
  }, [credentialForm.orderNo])

  const runAction = useCallback(async ({ key, action, successMessage, updateAccount = false, afterSuccess }) => {
    setIsSubmitting(key)
    setStatus({ type: 'idle', message: '' })

    try {
      const result = await action()
      if (updateAccount) {
        setAccount((current) => normalizeAccountData(result, current))
      }
      if (afterSuccess) {
        afterSuccess(result)
      }
      setStatus({ type: 'success', message: getMessage(result, successMessage) })
      return result
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : '接口暂未联通，请稍后再试。',
      })
      return null
    } finally {
      setIsSubmitting('')
    }
  }, [])

  const selectOrder = useCallback(
    (orderNo) => {
      setCredentialForm({ orderNo })
      const selectedOrder = orders.find((item) => item.orderNo === orderNo)
      if (selectedOrder) {
        setAccount((previous) => normalizeAccountData({ data: selectedOrder }, previous))
      }
    },
    [orders],
  )

  const refreshOrders = useCallback(
    async ({ silent = false } = {}) => {
      setIsSubmitting('orders-load')
      if (!silent) setStatus({ type: 'idle', message: '' })

      try {
        const result = await fetchOrders({ page: 1, pageSize: 20 })
        const nextOrders = normalizeOrderList(result)
        setOrders(nextOrders)

        const currentOrderNo = credentialForm.orderNo.trim()
        const nextOrderNo =
          nextOrders.find((item) => item.orderNo === currentOrderNo)?.orderNo || nextOrders[0]?.orderNo || currentOrderNo

        if (nextOrderNo) {
          setCredentialForm({ orderNo: nextOrderNo })
          setAccount((current) => {
            const selectedOrder = nextOrders.find((item) => item.orderNo === nextOrderNo)
            return selectedOrder ? normalizeAccountData({ data: selectedOrder }, current) : current
          })
        }

        if (!silent) {
          setStatus({ type: 'success', message: getMessage(result, '订单列表已刷新。') })
        }

        return { result, nextOrderNo }
      } catch (error) {
        setStatus({
          type: 'error',
          message: error instanceof Error ? error.message : '订单列表加载失败，请稍后再试。',
        })
        return { result: null, nextOrderNo: '' }
      } finally {
        setIsSubmitting('')
      }
    },
    [credentialForm.orderNo],
  )

  const loadOrderWorkspace = useCallback(
    async (orderNo, key = 'refresh', successMessage = '订单信息已刷新。') =>
      runAction({
        key,
        action: async () => {
          const [detailResult, apiResult] = await Promise.all([fetchOrderDetail(orderNo), fetchOrderApiInfo(orderNo)])
          return mergeOrderWorkspace(detailResult, apiResult)
        },
        successMessage,
        updateAccount: true,
        afterSuccess: (result) => {
          const normalized = normalizeAccountData(result, sampleAccount)
          setOrders((current) => {
            const next = [...current]
            const index = next.findIndex((item) => item.orderNo === normalized.orderNo)
            if (index >= 0) {
              next[index] = { ...next[index], ...normalized }
              return next
            }
            return [normalized, ...next]
          })
        },
      }),
    [runAction],
  )

  useEffect(() => {
    let mounted = true
    async function bootstrap() {
      const { nextOrderNo } = await refreshOrders({ silent: true })
      if (mounted && nextOrderNo) {
        await loadOrderWorkspace(nextOrderNo, 'bootstrap', '订单信息已同步。')
      }
    }
    bootstrap()
    return () => {
      mounted = false
    }
  }, [loadOrderWorkspace, refreshOrders])

  const handleRefresh = () => {
    const order = requireOrderNo()
    if (!order) return
    loadOrderWorkspace(order.orderNo)
  }

  const handleUsage = () => {
    const order = requireOrderNo()
    if (!order) return
    runAction({
      key: 'usage',
      action: () => fetchUsage(order),
      successMessage: '额度信息已刷新。',
      updateAccount: true,
    })
  }

  const accountStatusText = Number(account.isLocked) === 0 ? '正常' : '已关闭'
  const accountTypeText = packageTypeLabels[account.packageType] || userTypeLabels[account.userType] || '订单套餐'

  const outletContext = {
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
    setAccount,
    setCredentialForm,
    setStatus,
    status,
    updateForm,
  }

  const summaryItems = [
    { label: '订单状态', value: orderStatusLabels[account.orderStatus] || account.orderStatus || '-' },
    { label: 'API 开关', value: accountStatusText },
    { label: '套餐类型', value: accountTypeText },
    { label: account.displayLimitLabel || '次数上限', value: account.dayfetchlimit ?? '-' },
  ]

  return (
    <div className="min-h-screen">
      <SiteHeader navItems={navItems} />

      <main className="section-container grid gap-6 pb-10 pt-28 sm:pt-32">
        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <span className="eyebrow">User Center</span>
            <h1 className="mt-5 max-w-[12ch] text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-[4rem]">
              管理你的订单 API
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--muted-strong)]">
              根据最新订单文档查看订单详情、额度、次数上限、API 开关、返回字段和白名单。
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {summaryItems.map((item) => (
              <Card key={item.label} className="rounded-[26px] border-white/70 bg-white/82">
                <CardContent className="grid min-h-28 gap-2 p-5">
                  <span className="text-sm font-semibold text-slate-500">{item.label}</span>
                  <strong className="text-2xl font-black text-slate-900">{item.value}</strong>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Outlet context={outletContext} />
      </main>

      <SiteFooter />
    </div>
  )
}

export default UserCenterPage
