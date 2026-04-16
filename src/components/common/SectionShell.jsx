function SectionShell({ children, className = '', id }) {
  const classes = ['section-shell', 'section-container', className].filter(Boolean).join(' ')

  return (
    <section className={classes} id={id}>
      {children}
    </section>
  )
}

export default SectionShell
