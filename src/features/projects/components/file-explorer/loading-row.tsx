import { cn } from "cn"
import { Spinner } from "@/components/ui/spinner"

import { getItemPadding } from "./constants"

export const LoadingRow = ({
  className,
  level = 0,
}: {
  className?: string
  level?: number
}) => {
  return (
    <div
      className={cn("flex h-6 items-center", className)}
      style={{ paddingLeft: getItemPadding(level, true) }}
    >
      <Spinner className="text-muted-foreground size-4" />
    </div>
  )
}
