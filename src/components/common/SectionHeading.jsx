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
