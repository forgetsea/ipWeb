import SectionHeading from '../common/SectionHeading'

const articleDetails = [
  {
    titleLines: ['100%', '合规运营'],
    description: '资质齐全，全程可审计',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 5 6v5c0 4.4 2.8 8.4 7 10 4.2-1.6 7-5.6 7-10V6l-7-3Z" />
        <path d="m9.5 12 1.8 1.8 3.7-4" />
      </svg>
    ),
  },
  {
    titleLines: ['24h', '安全健康'],
    description: '实时监测，稳定守护',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l2.8 1.7" />
      </svg>
    ),
  },
  {
    titleLines: ['0 个', '安全事故'],
    description: '严控风险，可靠运行',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="m8.5 12 2.3 2.3 4.7-5" />
      </svg>
    ),
  },
]

function NewsSection({ articles }) {
  return (
    <section className="section-block news-layout section-container">
      <SectionHeading
        eyebrow="安全合规"
        title="安全合规是我们的承诺"
        description="奇迹 IP 坚守安全合规原则，提供稳定、可靠、可审计的大数据代理服务。"
      />

      <div className="news-list">
        {articles.map((article, index) => {
          const detail = articleDetails[index] ?? articleDetails[0]

          return (
            <article key={article} className={`news-card`}>
              <div className="news-card-top">
                <span className="news-card-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="news-card-icon">{detail.icon}</span>
              </div>
              <h3>
                {(detail.titleLines ?? [article]).map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              <p className="news-card-description">{detail.description}</p>
              <a href="#!" className="news-card-link">
                了解更多
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default NewsSection
