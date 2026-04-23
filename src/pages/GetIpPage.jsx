import SiteFooter from '../components/layout/SiteFooter'
import SiteHeader from '../components/layout/SiteHeader'
import { navItems } from '../data/homeData'
import './GetIpPage.css'

const filterGroups = [
  {
    label: '提取数量',
    values: ['1 个', '5 个', '10 个', '20 个'],
  },
  {
    label: '协议格式',
    values: ['HTTP', 'HTTPS', 'SOCKS5'],
  },
  {
    label: '返回格式',
    values: ['JSON', 'TXT', '逗号分隔'],
  },
]

const fieldItems = ['国家', '省份', '城市', '运营商', '端口', '剩余时长', '鉴权账号', '过期时间']

const sectionNavItems = [
  { id: 'getip-hero', label: '页面概览' },
  { id: 'getip-api', label: 'API 获取' },
  { id: 'getip-result', label: '结果预览' },
]

const bannerStats = [
  { label: '默认套餐', value: '余额套餐' },
  { label: '支持协议', value: 'HTTP / SOCKS5' },
  { label: '返回形式', value: '链接 + 结果预览' },
]

function GetIpPage() {
  return (
    <div className="getip-page">
      <SiteHeader navItems={navItems} />

      <main className="getip-main section-container">
        <div className="getip-layout">
          <aside className="getip-sidebar">
            <nav className="getip-side-nav" aria-label="提取IP页面导航">
              {sectionNavItems.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  <strong>{item.label}</strong>
                </a>
              ))}
            </nav>
          </aside>

          <div className="getip-content">
            <section id="getip-hero" className="getip-hero getip-anchor-section">
              <div className="getip-hero-banner">
                <div className="getip-hero-copy">
                  <span className="eyebrow">Get IP</span>
                  <h1>在线提取代理 IP</h1>
                  <p>
                    这里将提取 IP 的常用操作整合成一个工作台。你可以先在 API 获取区生成提取参数，再在结果预览区查看链接、
                    返回样例和接入方式。
                  </p>
                </div>

                <div className="getip-hero-stat-grid">
                  {bannerStats.map((item) => (
                    <div key={item.label} className="getip-hero-stat">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="getip-api" className="getip-config-panel getip-anchor-section">
              <div className="getip-panel-head">
                <p>API 获取</p>
                <h2>生成你的 API 提取参数</h2>
              </div>

              <div className="getip-package-card">
                <span>当前套餐</span>
                <strong>静态机房 IP 次数包</strong>
                <p>剩余 5,380 次，可直接用于 API 提取。</p>
              </div>

              {filterGroups.map((group) => (
                <section key={group.label} className="getip-filter-group">
                  <header>
                    <strong>{group.label}</strong>
                  </header>
                  <div className="getip-chip-row">
                    {group.values.map((value, index) => (
                      <button key={value} type="button" className={`getip-chip${index === 0 ? ' is-active' : ''}`}>
                        {value}
                      </button>
                    ))}
                  </div>
                </section>
              ))}

              <section className="getip-filter-group">
                <header>
                  <strong>地区筛选</strong>
                </header>
                <div className="getip-form-grid">
                  <label className="getip-field">
                    <span>国家</span>
                    <select defaultValue="美国">
                      <option>美国</option>
                      <option>日本</option>
                      <option>新加坡</option>
                    </select>
                  </label>
                  <label className="getip-field">
                    <span>州 / 省</span>
                    <input defaultValue="California" />
                  </label>
                  <label className="getip-field">
                    <span>城市</span>
                    <input defaultValue="Los Angeles" />
                  </label>
                  <label className="getip-field">
                    <span>运营商</span>
                    <select defaultValue="不限">
                      <option>不限</option>
                      <option>AT&T</option>
                      <option>Verizon</option>
                    </select>
                  </label>
                </div>
              </section>

              <section className="getip-filter-group">
                <header>
                  <strong>返回字段</strong>
                </header>
                <div className="getip-field-list">
                  {fieldItems.map((item, index) => (
                    <label key={item} className={`getip-checkbox${index < 5 ? ' is-active' : ''}`}>
                      <input type="checkbox" defaultChecked={index < 5} />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </section>

              <div className="getip-config-actions">
                <button type="button" className="primary-button">
                  生成提取链接
                </button>
                <button type="button" className="ghost-button">
                  重置配置
                </button>
              </div>
            </section>

            <section id="getip-result" className="getip-result-config-panel getip-anchor-section">
              <div className="getip-panel-head">
                <p>结果预览</p>
                <h2>接口链接与返回结果</h2>
              </div>

              <section className="getip-result-card">
                <span>提取链接</span>
                <code>https://api.qijiip.com/getip?num=10&protocol=https&country=US&format=json</code>
              </section>

              <section className="getip-result-card">
                <span>示例返回</span>
                <pre>{`{
  "code": 0,
  "message": "success",
  "data": [
    {
      "ip": "23.41.88.10",
      "port": 9000,
      "country": "US",
      "city": "Los Angeles",
      "expireAt": "2026-04-23 12:40:00"
    }
  ]
}`}</pre>
              </section>

              <section className="getip-doc-grid">
                <div className="getip-doc-card">
                  <strong>鉴权方式</strong>
                  <p>支持账号密钥或白名单鉴权，两种模式可按套餐切换。</p>
                </div>
                <div className="getip-doc-card">
                  <strong>提取频控</strong>
                  <p>接口默认按套餐上限限流，建议客户端本地缓存 1 到 3 秒。</p>
                </div>
                <div className="getip-doc-card">
                  <strong>推荐接入</strong>
                  <p>支持 Python、Node.js、Java，建议先用 JSON 格式联调。</p>
                </div>
              </section>

              <section className="getip-code-card">
                <div className="getip-code-head">
                  <strong>Python 示例</strong>
                  <span>快速联调</span>
                </div>
                <pre>{`import requests

url = "https://api.qijiip.com/getip?num=10&protocol=https&format=json"
resp = requests.get(url, timeout=10)
print(resp.json())`}</pre>
              </section>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export default GetIpPage
