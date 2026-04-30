import { cn } from '../../lib/utils'

function SectionShell({ children, className = '', id }) {
  return (
    <section
      id={id}
      className={cn(
        'section-container relative pt-10 sm:pt-12 lg:pt-14',
        "before:absolute before:left-0 before:top-0 before:h-px before:w-[min(140px,28vw)] before:bg-gradient-to-r before:from-[#0d6efd]/35 before:to-transparent",
        className,
      )}
    >
      {children}
    </section>
  )
}

export default SectionShell
