
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "elevated" | "gradient" | "outline" | "glass" | "accent" | "frosted" | "colorful" | "modern" | "interactive"
  }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground transition-all duration-200",
      {
        "shadow-md hover:shadow-lg": variant === "default",
        "shadow-xl hover:shadow-2xl": variant === "elevated",
        "bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg hover:shadow-xl": variant === "gradient",
        "border-2 hover:border-primary/50": variant === "outline",
        "bg-white/80 backdrop-blur-md dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl": variant === "glass",
        "bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border-0 shadow-lg hover:shadow-xl": variant === "accent",
        "backdrop-blur-lg bg-white/40 dark:bg-gray-900/40 border border-white/20 dark:border-gray-800/30 shadow-lg hover:shadow-xl": variant === "frosted",
        "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-0 shadow-md hover:shadow-lg": variant === "colorful",
        "bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl rounded-2xl p-1": variant === "modern",
        "bg-white dark:bg-gray-800 border hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-md hover:shadow-blue-100 dark:hover:shadow-blue-900/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1": variant === "interactive",
      },
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    variant?: "default" | "gradient" | "accent"
  }
>(({ className, variant = "default", ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      {
        "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400": variant === "gradient",
        "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600": variant === "accent"
      },
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
