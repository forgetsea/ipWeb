// 文件用途：用户中心初始表单、示例账户、选项和数据适配工具。
import { appRoutes } from '../../router'

// 模块功能：API 凭据表单初始值。
export const initialCredentialForm = {
  username: '',
  password: '',
}

// 模块功能：基础资料表单初始值。
export const initialProfileForm = {
  displayName: '天启用户',
  company: '',
  phone: '',
  email: '',
}

// 模块功能：密码修改表单初始值。
export const initialPasswordForm = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

// 模块功能：订单字段设置表单初始值。
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

// 模块功能：每日提取上限表单初始值。
export const initialLimitForm = {
  dayfetchlimit: '10000',
}

// 模块功能：白名单表单初始值。
export const initialWhitelistForm = {
  ipAddress: '',
}

// 模块功能：IP 提取测试表单初始值。
export const initialExtractForm = {
  count: '10',
  regionCode: '',
}

// 模块功能：后端未接通前用于页面展示的账户示例数据。
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

// 供应商订单设置使用 0/1 字符串开关，保持表单值和接口字段一致。
export const visibilityFields = [
  { name: 'outip', label: '真实 IP' },
  { name: 'lsp', label: '运营商' },
  { name: 'prov', label: '省份' },
  { name: 'city', label: '城市' },
  { name: 'endtime', label: '有效时间' },
  { name: 'ifs', label: '当日去重' },
]

// 模块功能：供应商 IP 返回格式选项。
export const ipTypeOptions = [
  { value: '0', label: 'JSON' },
  { value: '1', label: 'CRLF 换行' },
  { value: '2', label: 'CR 换行' },
  { value: '3', label: 'LF 换行' },
  { value: '4', label: '逗号分隔' },
]

// 模块功能：用户中心侧边栏导航配置。
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

// 模块功能：从接口结果里读取提示文案，没有则使用页面传入的兜底文案。
export function getMessage(result, fallback) {
  return result?.message || fallback
}

// 供应商返回是 snake_case，页面状态使用 camelCase；这里做一次边界转换。
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
