import { appRoutes } from '../../router'

export const initialCredentialForm = {
  orderNo: '',
}

export const initialProfileForm = {
  nickname: '',
  phone: '',
}

export const initialPasswordForm = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export const initialSettingsForm = {
  outip: '0',
  lsp: '0',
  prov: '0',
  city: '0',
  endtime: '0',
  ifs: '0',
  sessTime: '1',
  iptype: '0',
}

export const initialWhitelistForm = {
  ipsText: '',
}

export const initialExtractForm = {
  count: '10',
  regionCode: '',
}

export const sampleAccount = {
  orderNo: 'P202604200001',
  apiAccount: 'P202604200001',
  packageName: '',
  orderStatus: 'active',
  payStatus: '',
  isLocked: 0,
  userType: 1,
  packageType: 'balance',
  amount: 0,
  dayfetchlimit: 0,
  displayLimitLabel: '总次数',
  dailyLimit: null,
  totalQuota: 10000,
  remainingQuota: 8000,
  usedQuota: 2000,
  leftNum: 8000,
  allNum: 10000,
  createdAt: '',
  paidAt: '',
  activeAt: '',
  expiredAt: '',
  settings: initialSettingsForm,
  whitelist: ['123.123.123.1', '123.123.123.2'],
}

export const orderStatusLabels = {
  pending_payment: '待支付',
  paid: '已支付',
  provisioning: '开通中',
  active: '生效中',
  failed: '开通失败',
  expired: '已失效',
  closed: '已关闭',
}

export const packageTypeLabels = {
  time_based: '包时型',
  balance: '余额 / 次数型',
}

export const userTypeLabels = {
  0: '包时型',
  1: '次数型',
}

export const visibilityFields = [
  { name: 'outip', label: '真实 IP' },
  { name: 'lsp', label: '运营商' },
  { name: 'prov', label: '省份' },
  { name: 'city', label: '城市' },
  { name: 'endtime', label: '结束时间' },
  { name: 'ifs', label: '去重' },
]

export const ipTypeOptions = [
  { value: '0', label: 'JSON' },
  { value: '1', label: 'CRLF 换行' },
  { value: '2', label: 'CR 换行' },
  { value: '3', label: 'LF 换行' },
  { value: '4', label: '逗号分隔' },
]

export const userCenterNavItems = [
  { to: appRoutes.userCenterProfile, label: '基础资料' },
  { to: appRoutes.userCenterOverview, label: '账户概览' },
  { to: appRoutes.userCenterCredentials, label: '套餐列表' },
  { to: appRoutes.userCenterSecurity, label: '安全设置' },
  { to: appRoutes.userCenterOrders, label: '订单设置' },
  { to: appRoutes.userCenterWhitelist, label: '白名单' },
  { to: appRoutes.userCenterExtract, label: 'IP 提取' },
]

export function getMessage(result, fallback) {
  return result?.message || fallback
}

function normalizeSettings(settings, fallbackSettings = initialSettingsForm) {
  return {
    ...fallbackSettings,
    ...Object.fromEntries(
      Object.entries(settings || {}).map(([key, value]) => [key, value == null ? fallbackSettings[key] : String(value)]),
    ),
  }
}

function getDisplayLimitLabel(data, currentAccount) {
  if (data.displayLimitLabel) {
    return data.displayLimitLabel
  }

  const userType = data.userType ?? data.settings?.userType ?? currentAccount.userType ?? currentAccount.settings?.userType
  return Number(userType) === 0 ? '每日次数上限' : '总次数'
}

export function normalizeAccountData(result, currentAccount) {
  const data = result?.data || {}
  const settings = normalizeSettings(data.settings, currentAccount.settings || initialSettingsForm)
  const whitelist = data.whitelist || data.list || currentAccount.whitelist || []
  const leftNum = data.leftNum ?? data.remainingQuota ?? currentAccount.leftNum
  const allNum = data.allNum ?? data.totalQuota ?? currentAccount.allNum

  return {
    ...currentAccount,
    ...data,
    settings,
    whitelist,
    userType: data.userType ?? data.settings?.userType ?? currentAccount.userType,
    dayfetchlimit: data.dayfetchlimit ?? data.settings?.dayfetchlimit ?? currentAccount.dayfetchlimit,
    displayLimitLabel: getDisplayLimitLabel(data, currentAccount),
    leftNum,
    allNum,
    remainingQuota: data.remainingQuota ?? leftNum,
    totalQuota: data.totalQuota ?? allNum,
  }
}

export function normalizeOrderList(result) {
  const list = result?.data?.list || []

  return list.map((item) =>
    normalizeAccountData(
      {
        data: {
          ...item,
          settings: item.settings || { userType: item.userType, dayfetchlimit: item.dayfetchlimit },
          whitelist: item.whitelist || [],
        },
      },
      sampleAccount,
    ),
  )
}

export function parseIps(value) {
  return value
    .split(/[\s,，;；]+/)
    .map((item) => item.trim())
    .filter(Boolean)
}
