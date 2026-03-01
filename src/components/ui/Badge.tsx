import * as React from "react"
import { cn } from "../../utils/cn"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "success" | "warning"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
        {
          "border-transparent bg-orange-100 text-orange-800": variant === "default",
          "border-transparent bg-green-100 text-green-800": variant === "secondary",
          "border-transparent bg-red-100 text-red-800": variant === "destructive",
          "text-stone-800 border-stone-200": variant === "outline",
          "border-transparent bg-emerald-100 text-emerald-800": variant === "success",
          "border-transparent bg-yellow-100 text-yellow-800": variant === "warning",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
