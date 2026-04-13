const partnerLinks = ['代理导航', '跨境工具', '数据平台', '浏览器环境', '开发文档', '营销社区']

const businessItems = ['商务合作', '渠道代理', '企业采购', '媒体联络']

const companyInfo = [
  '公司名称：某某网络科技有限公司',
  '办公地址：上海市浦东新区示例商务园 A 栋 8 层',
  '服务热线：400-800-1234',
  '企业邮箱：business@example.com',
]

function SiteFooter() {
  return (
    <footer className="site-footer section-container">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="brand-lockup">
            <div className="brand-mark">TQ</div>
            <div>
              <p className="brand-name">天启 IP</p>
              <p className="brand-subtitle">全球高质量代理服务</p>
            </div>
          </div>
          <p className="footer-intro">
            提供面向跨境电商、社媒营销、数据采集和企业网络场景的代理服务解决方案。当前为演示版页脚，文案为模拟内容。
          </p>
        </div>

        <div className="footer-column">
          <h3>商务合作</h3>
          <ul className="footer-list">
            {businessItems.map((item) => (
              <li key={item}>
                <a href="#!">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h3>友情链接</h3>
          <ul className="footer-list footer-links">
            {partnerLinks.map((item) => (
              <li key={item}>
                <a href="#!">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column footer-qr">
          <h3>扫码咨询</h3>
          <div className="qr-placeholder" aria-hidden="true" />
          <p>微信客服二维码占位</p>
          <p>后续可替换为真实二维码图片</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-company">
          <h3>公司信息</h3>
          <ul className="footer-list">
            {companyInfo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="footer-records">
          <p>Copyright © 2026 Tianqi IP Clone. All Rights Reserved.</p>
          <p>沪 ICP 备 2026000000 号-1 | 沪公网安备 31000000000000 号</p>
          <p>本页面为 React 练习复刻页面，非真实商业官网。</p>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
