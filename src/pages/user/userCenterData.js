import { appRoutes } from '../../router'

export const initialCredentialForm = {
  username: '',
  password: '',
}

export const initialProfileForm = {
  displayName: '天启用户',
  company: '',
  phone: '',
  email: '',
}

export const initialPasswordForm = {
  currentPassword: '',
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
  iptype: '0',
  sessTime: '1',
}

export const initialLimitForm = {
  dayfetchlimit: '10000',
}

export const initialWhitelistForm = {
  ipAddress: '',
}

export const initialExtractForm = {
  count: '10',
  regionCode: '',
}

export const sampleAccount = {
  isLocked: '0',
  usertype: '0',
  dayfetchlimit: '10000',
  sessTime: '1',
  iptype: '0',
  whitelist: ['123.123.123.1', '123.123.123.2'],
  leftNum: 10000,
  allNum: 10000,
}

export const visibilityFields = [
  { name: 'outip', label: '真实 IP' },
  { name: 'lsp', label: '运营商' },
  { name: 'prov', label: '省份' },
  { name: 'city', label: '城市' },
  { name: 'endtime', label: '有效时间' },
  { name: 'ifs', label: '当日去重' },
]

export const ipTypeOptions = [
  { value: '0', label: 'JSON' },
  { value: '1', label: 'CRLF 换行' },
  { value: '2', label: 'CR 换行' },
  { value: '3', label: 'LF 换行' },
  { value: '4', label: '逗号分隔' },
]

export const userCenterNavItems = [
  { to: appRoutes.userCenterCredentials, label: 'API 凭据' },
  { to: appRoutes.userCenterOverview, label: '账户概览' },
  { to: appRoutes.userCenterProfile, label: '基础资料' },
  { to: appRoutes.userCenterSecurity, label: '安全设置' },
  { to: appRoutes.userCenterOrders, label: '订单设置' },
  { to: appRoutes.userCenterWhitelist, label: '白名单' },
  { to: appRoutes.userCenterExtract, label: 'IP 提取' },
  { to: appRoutes.userCenterApiReference, label: '接口参考' },
]

export function getMessage(result, fallback) {
  return result?.message || fallback
}

export function normalizeAccountData(result, currentAccount) {
  const userData = result?.data?.user_data || {}

  return {
    ...currentAccount,
    ...userData,
    whitelist: result?.data?.whitelist || currentAccount.whitelist,
    leftNum: userData.left_num ?? currentAccount.leftNum,
    allNum: userData.all_num ?? currentAccount.allNum,
  }
}
