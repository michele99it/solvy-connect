
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-[1.02] active:scale-[0.98]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        "solvy-blue": "bg-gradient-to-r from-[#3a8dff] to-[#439cf8] text-white hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-blue-300/30 hover:shadow-blue-400/40",
        "contact": "bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-green-300/30 hover:shadow-green-400/40", 
        "solver": "bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-purple-300/30 hover:shadow-purple-400/40",
        "premium": "bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-amber-300/30 hover:shadow-amber-400/40",
        "connect": "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-blue-300/30 hover:shadow-purple-300/30",
        "glass": "bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/30 hover:scale-[1.02] active:scale-[0.98] shadow-sm",
        "modern": "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20 hover:shadow-blue-600/30 font-medium",
        "accent": "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/20 hover:shadow-pink-500/30 font-medium",
        "soft": "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 hover:scale-[1.02] active:scale-[0.98] border border-blue-100 dark:border-blue-800",
        "primary-soft": "bg-primary/10 text-primary hover:bg-primary/20 hover:scale-[1.02] active:scale-[0.98] border border-primary/20",
        "3d": "bg-gradient-to-b from-blue-500 to-blue-600 text-white border-b-4 border-blue-700 hover:from-blue-600 hover:to-blue-700 active:border-b-0 active:border-t-4 active:translate-y-[4px] active:scale-[0.98] shadow-lg shadow-blue-500/20 hover:shadow-blue-600/30",
        "tech": "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white hover:scale-[1.02] active:scale-[0.98] shadow-md transition-all duration-500 shadow-blue-300/30 hover:shadow-blue-400/40",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        xs: "h-7 text-xs rounded-md px-2 py-1", // Extra small size for mobile
        pill: "h-9 rounded-full px-4 py-2", // Pill shaped button
        "pill-lg": "h-11 rounded-full px-6 py-2.5 text-base", // Large pill shaped button
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

export { Button, buttonVariants }
