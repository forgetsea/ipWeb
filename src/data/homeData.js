import { appRoutes } from '../router'

export const navItems = [
  { label: '首页', to: appRoutes.home },
  { label: '套餐购买', to: appRoutes.package },
  { label: '提取IP', to: appRoutes.getIp },
  { label: '产品介绍', href: '#features' },
  { label: '安全合规', href: '#news' },
  { label: '企业服务', href: '#enterprise' },
]

export const featureItems = [
  {
    title: '海外静态住宅代理',
    bullets: [
      '纯净资源，高匿名性，可用率高达 99.9%',
      '真实 IP 地址，长效固定，稳定性强',
      '全球节点丰富，支持业务灵活切换出口',
      '适合账号运营、地区验证等场景',
    ],
  },
  {
    title: '海外动态住宅代理',
    bullets: [
      '来源纯净，真实高匿，稳定性强',
      '高带宽高连通率，支持自动切换 IP',
      '千万级优质资源池',
      'API 接口丰富，调用便捷',
    ],
  },
  {
    title: '海外动态 IDC 代理',
    bullets: [
      '超高速数据传输，不限流量',
      'IDC 数据中心原生 IP',
      '网络可用率高达 99.9%',
      '支持 HTTP、HTTPS、SOCKS 多协议',
    ],
  },
]

export const planItems = [
  {
    name: '海外动态 IDC 代理',
    price: '¥29',
    unit: '/起',
    points: ['超高速传输', '不限流量', '多协议支持'],
  },
  {
    name: '海外动态住宅代理',
    price: '¥79',
    unit: '/起',
    points: ['千万级资源池', '自动切换 IP', 'API 调用便捷'],
  },
  {
    name: '海外静态住宅代理',
    price: '¥199',
    unit: '/起',
    points: ['真实固定 IP', '超强稳定性', '高匿名纯净资源'],
  },
]

export const sceneItems = [
  '跨境电商',
  '品牌保护',
  '市场调研',
  '数据采集',
  '聚合比价',
  'SEO 优化',
  '舆情监测',
  '社媒营销',
]

export const logoItems = ['Amazon', 'TikTok', 'Shopee', 'eBay', 'Google', 'Meta']

export const articleItems = ['100% 合规运营', '24h 安全健康', '0 个安全事故']

export const heroStats = [
  { value: '99.9%', label: '可用率支持' },
  { value: '200+', label: '覆盖国家地区' },
  { value: '24h', label: '安全健康守护' },
]

export const enterpriseMetrics = [
  { value: '5000万+', label: '可调度代理资源' },
  { value: '7*24', label: '小时响应支持' },
  { value: '1V1', label: '专业顾问技术服务' },
]
