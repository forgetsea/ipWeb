import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677ff]/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-[#1677ff] to-[#0f66db] text-white shadow-[0_18px_36px_rgba(22,119,255,0.22)] hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(22,119,255,0.28)]',
        secondary:
          'border border-[#1677ff]/15 bg-white/80 text-slate-800 shadow-[0_12px_30px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 hover:bg-white',
        outline:
          'border border-[#1677ff]/30 bg-white text-[#1677ff] hover:-translate-y-0.5 hover:bg-[#f4f8ff]',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 rounded-lg px-3.5 text-sm',
        lg: 'h-12 px-6 text-base',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
