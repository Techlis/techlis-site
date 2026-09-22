import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 touch-manipulation",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl sm:hover:scale-105 focus-visible:ring-primary/30 active:scale-95",
        destructive:
          "bg-red-500 text-white shadow-lg hover:bg-red-600 sm:hover:scale-105 focus-visible:ring-red-500/30 active:scale-95",
        outline:
          "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 sm:hover:scale-105 focus-visible:ring-primary/30 active:scale-95 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950",
        secondary:
          "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 sm:hover:scale-105 active:scale-95 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600",
        ghost:
          "text-gray-700 hover:bg-gray-100 sm:hover:scale-105 active:scale-95 dark:text-slate-300 dark:hover:bg-slate-800",
        luxury:
          "bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 shadow-lg hover:shadow-xl sm:hover:scale-105 focus-visible:ring-amber-400/30 active:scale-95",
        link: "text-primary-600 underline-offset-4 hover:underline active:opacity-70 dark:text-primary-400",
      },
      size: {
        default: "h-11 px-4 py-3 sm:px-6",
        sm: "h-9 px-2.5 py-2 sm:px-3 text-xs",
        lg: "h-12 px-6 py-4 sm:px-8 text-base",
        xl: "h-14 px-8 py-5 sm:px-10 text-lg",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
