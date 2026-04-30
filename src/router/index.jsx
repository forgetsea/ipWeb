// 文件用途：集中维护页面路径常量，避免组件里手写重复 URL。

// 模块功能：为导航、按钮和路由配置提供统一的路径来源。
export const appRoutes = {
  home: '/',
  package: '/package',
  packageBalance: '/package/balance',
  packageTimed: '/package/timed',
  packageFixed: '/package/fixed-ip',
  packageEnterprise: '/package/enterprise',
  getIp: '/getip',
  postalCodes: '/postal-codes',
  login: '/login',
  register: '/register',
  userCenter: '/user-center',
  userCenterCredentials: '/user-center/credentials',
  userCenterOverview: '/user-center/overview',
  userCenterProfile: '/user-center/profile',
  userCenterSecurity: '/user-center/security',
  userCenterOrders: '/user-center/orders',
  userCenterWhitelist: '/user-center/whitelist',
  userCenterExtract: '/user-center/extract',
  userCenterApiReference: '/user-center/api-reference',
}
