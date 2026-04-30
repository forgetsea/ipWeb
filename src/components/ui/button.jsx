import { cn } from '../../lib/utils'
import { buttonVariants } from './button-variants'

function Button({ className, variant, size, fullWidth, asChild = false, ...props }) {
  const Component = asChild ? 'span' : 'button'

  return (
    <Component
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    />
  )
}

export { Button }
