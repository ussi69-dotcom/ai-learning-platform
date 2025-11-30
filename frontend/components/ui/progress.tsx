import * as React from "react"

import { cn } from "@/lib/utils"

// Simplified Progress component without @radix-ui/react-progress dependency
// For basic visual progress bar
const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number }
>(({ className, value, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary", // bg-secondary should be defined in tailwind config
      className
    )}
    {...props}
  >
    <div
      className="h-full bg-primary transition-all" // bg-primary should be defined in tailwind config
      style={{ width: `${value || 0}%` }}
    />
  </div>
))
Progress.displayName = "Progress"

export { Progress }