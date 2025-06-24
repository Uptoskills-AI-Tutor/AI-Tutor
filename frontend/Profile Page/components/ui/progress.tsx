import * as React from "react"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: number
    max?: number
    indicatorColor?: string
  }
>(({ className, value, max = 100, indicatorColor, ...props }, ref) => {
  const percentage = value != null ? (Math.min(Math.max(value, 0), max) / max) * 100 : 0

  return (
    <div
      ref={ref}
      className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{
          width: `${percentage}%`,
          backgroundColor: indicatorColor,
        }}
      />
    </div>
  )
})
Progress.displayName = "Progress"

export { Progress }

