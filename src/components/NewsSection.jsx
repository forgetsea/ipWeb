import SectionHeading from './SectionHeading'

function NewsSection({ articles }) {
  return (
    <section className="section-block news-layout section-container">
      <SectionHeading
        eyebrow="资讯中心"
        title="底部资讯列表区"
        description="这一段对应官网常见的 SEO 内容布局，适合后续接 CMS 或静态文章数据。"
      />

      <div className="news-list">
        {articles.map((article, index) => (
          <article key={article} className="news-card">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{article}</h3>
            <a href="#!">查看详情</a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default NewsSection
