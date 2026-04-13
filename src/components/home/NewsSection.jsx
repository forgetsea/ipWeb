import SectionHeading from '../common/SectionHeading'

function NewsSection({ articles }) {
  return (
    <section className="section-block news-layout section-container">
      <SectionHeading
        eyebrow="安全合规"
        title="安全合规是我们的承诺"
        description="奇迹 IP 始终坚守安全合规原则，致力于提供安全、稳定、优质的大数据代理服务，保障用户合法权益，推动全球大数据业务的健康有序发展。"
      />

      <div className="news-list">
        {articles.map((article, index) => (
          <article key={article} className="news-card">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{article}</h3>
            <a href="#!">了解更多</a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default NewsSection
