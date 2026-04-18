// 文件用途：通用区块容器组件，复用 section 与页面宽度约束。

// 模块功能：组合基础容器类名，并允许页面传入扩展 className 和 id。
function SectionShell({ children, className = '', id }) {
  const classes = ['section-shell', 'section-container', className].filter(Boolean).join(' ')

  return (
    <section className={classes} id={id}>
      {children}
    </section>
  )
}

export default SectionShell
