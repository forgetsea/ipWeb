// 文件用途：通用区块标题组件，统一首页各 section 的标题结构。

// 模块功能：按需渲染 eyebrow、标题和描述，保持区块标题样式一致。
function SectionHeading({ eyebrow, title, description }) {
  return (
    <header className="section-heading">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  )
}

export default SectionHeading
