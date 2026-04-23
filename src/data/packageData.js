import { appRoutes } from '../router'

export const packageHomeHero = {
  eyebrow: '套餐购买',
  title: '按业务类型选择合适的代理套餐方案',
  description: '不同套餐分类',
}

export const packageSections = [
  {
    key: 'balance',
    title: '余额套餐',
    badge: '充值有赠送',
    path: appRoutes.packageBalance,
    summary: '先充值再使用，适合按需提取、按场景灵活调度的业务。',
    points: ['支持余额账户按需扣费', '可按地区、时效、数量提取', '适合波动型和探索型业务'],
  },
  {
    key: 'timed',
    title: '包时套餐',
    badge: '低至 3.5 折',
    path: appRoutes.packageTimed,
    summary: '按采购周期购买代理资源，适合有稳定调用计划的任务。',
    points: ['包含短效 IP 与长效 IP', '支持月、季、半年、年度折扣', '适合持续抓取与批量调度'],
  },
  {
    key: 'fixed',
    title: '固定IP套餐',
    badge: '高品质资源',
    path: appRoutes.packageFixed,
    summary: '面向固定出口和长期会话场景，有效期内可反复使用。',
    points: ['IP 无需重复提取', '支持自定义城市开通', '适合账号稳定与白名单场景'],
  },
  {
    key: 'enterprise',
    title: '企业套餐',
    badge: '商务咨询',
    path: appRoutes.packageEnterprise,
    summary: '适合团队接入、批量采购和更复杂的调度治理需求。',
    points: ['覆盖更多城市与资源类型', '支持共享与独享两种模式', '并发与提取能力更高'],
  },
]

export const balancePackagePage = {
  summaryCard: {
    title: '余额套餐概览',
    description: '适合灵活提取和动态调用，先充值后消耗',
    points: ['充值有赠送', '提取更灵活', '适合动态业务', '支持 API', '地区可选', '适合批量'],
  },
  plans: [
    { name: '体验充值包', badge: '新手', price: '¥100', unit: '起充', description: '适合测试接入与小规模验证。', points: ['赠送 10%', '支持 API 提取', '短效长效可用'] },
    { name: '基础业务包', badge: '常用', price: '¥500', unit: '起充', description: '适合日常运营与稳定提取需求。', points: ['赠送 20%', '支持地区选择', '适合小团队'] },
    { name: '增长调度包', badge: '推荐', price: '¥1000', unit: '起充', description: '适合多任务并行和中期使用。', points: ['赠送 30%', '提取更灵活', '支持后台调用'] },
    { name: '扩容储值包', badge: '热销', price: '¥3000', unit: '起充', description: '适合业务扩容与更大资源调度。', points: ['赠送 40%', '适合稳定业务', '调度空间更大'] },
    { name: '企业储备包', badge: '高配', price: '¥10000', unit: '起充', description: '适合企业长期储值和批量消耗。', points: ['赠送 50%', '多业务共用', '适合长期投入'] },
    { name: '灵活采集包', badge: '动态', price: '¥800', unit: '参考', description: '适合频繁切换地区与时效的采集业务。', points: ['地区灵活', '按需提取', '适合采集场景'] },
    { name: '运营提取包', badge: '运营', price: '¥1500', unit: '参考', description: '适合注册、养号、铺货等运营任务。', points: ['适合账号业务', '短效调用', '支持多地区'] },
    { name: '批量调用包', badge: '批量', price: '¥5000', unit: '参考', description: '适合批量提取与多项目统一管理。', points: ['统一余额池', '适合批量', '便于扩展'] },
  ],
}

export const timedPackagePage = {
  summaryCard: {
    title: '包时套餐概览',
    description: '适合有明确周期的业务采购，短效与长效资源分层配置',
    points: ['短效长效', '周期折扣', '适合长期', '预算清晰', '支持批量', '高性价比'],
  },
  plans: [
    { name: '短效 3 分钟包', badge: '短效', price: '¥0.005', unit: '/IP', description: '适合极短会话与快速切换任务。', points: ['按量采购', '高频切换', '适合采集'] },
    { name: '短效 5 分钟包', badge: '短效', price: '¥0.01', unit: '/IP', description: '适合轻量轮换与短周期验证。', points: ['灵活调用', '适合验证', '支持折扣'] },
    { name: '短效 10 分钟包', badge: '常用', price: '¥0.02', unit: '/IP', description: '适合更稳定的短时会话任务。', points: ['稳定一些', '适合运营', '支持批量'] },
    { name: '短效 15 分钟包', badge: '推荐', price: '¥0.03', unit: '/IP', description: '适合短时驻留与较高成功率需求。', points: ['驻留更久', '适合脚本', '支持长期采购'] },
    { name: '长效 1 小时包', badge: '长效', price: '¥0.5', unit: '/IP', description: '适合基础长效会话场景。', points: ['1 小时驻留', '适合长连', '支持折扣周期'] },
    { name: '长效 4 小时包', badge: '长效', price: '¥1', unit: '/IP', description: '适合持续任务和连续访问需求。', points: ['更长时效', '适合任务运行', '性价比更高'] },
    { name: '长效 12 小时包', badge: '热销', price: '¥2.5', unit: '/IP', description: '适合白天任务与更长驻留业务。', points: ['12 小时', '适合运营', '支持月季采购'] },
    { name: '长效 24 小时包', badge: '全天', price: '¥3.5', unit: '/IP', description: '适合全天候运行和稳定长连接场景。', points: ['24 小时', '适合全天业务', '低至 3.5 折'] },
  ],
}

export const fixedPackagePage = {
  summaryCard: {
    title: '固定IP套餐概览',
    description: '适合稳定固定出口、账号环境保持和长期任务驻留',
    points: ['固定出口', '长期稳定', '城市可选', '无需提取', '多协议支持', '适合白名单'],
  },
  plans: [
    { name: '7 天固定 IP', badge: '标准', price: '¥4.29', unit: '/IP/天', description: '适合短期固定出口测试。', points: ['7 天有效', '城市可选', '不限使用次数'] },
    { name: '30 天固定 IP', badge: '8 折', price: '¥1.33', unit: '/IP/天', description: '适合常规月度固定出口需求。', points: ['月度稳定', '适合账号业务', '成本更优'] },
    { name: '60 天固定 IP', badge: '7.5 折', price: '¥1.25', unit: '/IP/天', description: '适合双月持续运行场景。', points: ['双月使用', '更低单价', '适合连续任务'] },
    { name: '90 天固定 IP', badge: '7 折', price: '¥1.17', unit: '/IP/天', description: '适合季度固定出口项目。', points: ['季度采购', '长期稳定', '更高性价比'] },
    { name: '365 天固定 IP', badge: '6 折', price: '¥0.99', unit: '/IP/天', description: '适合全年稳定固定出口使用。', points: ['全年方案', '长期白名单', '单日成本低'] },
    { name: '上海固定出口', badge: '城市', price: '¥39', unit: '/IP 起', description: '适合华东地区固定访问需求。', points: ['上海城市', '固定出口', '适合运营'] },
    { name: '北京固定出口', badge: '城市', price: '¥39', unit: '/IP 起', description: '适合北方地区固定网络场景。', points: ['北京城市', '稳定出口', '长期可用'] },
    { name: '成都固定出口', badge: '城市', price: '¥39', unit: '/IP 起', description: '适合西南业务固定访问任务。', points: ['成都城市', '适合驻留', '支持多协议'] },
  ],
}

export const enterprisePackagePage = {
  summaryCard: {
    title: '企业套餐概览',
    description: '适合团队协作、批量采购和项目交付',
    points: ['共享资源', '独享资源', '支持定制', '项目交付', '高并发', '长期合作'],
  },
  plans: [
    { name: '共享资源基础版', badge: '企业', price: '咨询', unit: '方案价', description: '适合团队统一采购和共享调用。', points: ['统一采购', '共享资源池', '适合多项目'] },
    { name: '共享资源进阶版', badge: '热门', price: '咨询', unit: '方案价', description: '适合更高并发与更多城市覆盖。', points: ['更高并发', '覆盖更广', '适合增长期'] },
    { name: '独享资源标准版', badge: '独享', price: '咨询', unit: '方案价', description: '适合强调资源隔离和稳定性的业务。', points: ['资源隔离', '独享调用', '适合生产'] },
    { name: '独享资源旗舰版', badge: '高配', price: '咨询', unit: '方案价', description: '适合高带宽和核心链路场景。', points: ['高带宽', '更稳更快', '适合核心业务'] },
    { name: '城市定制方案', badge: '定制', price: '评估', unit: '定制价', description: '按目标城市组合进行资源交付。', points: ['城市可定制', '适合区域业务', '支持评估'] },
    { name: '数量定制方案', badge: '定制', price: '评估', unit: '定制价', description: '按业务规模规划资源数量和周期。', points: ['数量灵活', '适合批量', '便于扩容'] },
    { name: '项目交付方案', badge: '交付', price: '评估', unit: '项目价', description: '适合项目制接入与长期合作。', points: ['项目制', '顾问支持', '长期合作'] },
    { name: '混合资源方案', badge: '混合', price: '评估', unit: '组合价', description: '适合共享与独享资源混合使用。', points: ['共享+独享', '弹性更强', '适合复杂业务'] },
  ],
}
