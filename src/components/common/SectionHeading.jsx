function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const center = align === 'center'

  return (
    <header className={`mb-7 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow ? (
        <span className={`eyebrow ${center ? 'justify-center' : ''}`}>{eyebrow}</span>
      ) : null}
      <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-7 text-[color:var(--muted-strong)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  )
}

export default SectionHeading
