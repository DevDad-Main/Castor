import { cn } from "cn"
import { SparkleIcon } from "lucide-react"
import { display } from "../lib/fonts"

export const CastorGlyph = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        "bg-gradient-to-br from-ring via-ring to-twin text-background grid place-items-center rounded-[10px] shadow-[0_0_24px_-6px_var(--ring)]",
        className
      )}
    >
      <SparkleIcon className="size-[55%]" strokeWidth={2.4} />
    </span>
  )
}

export const CastorWordmark = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        "text-xl font-semibold tracking-tight",
        display.className,
        className
      )}
    >
      Castor
    </span>
  )
}

export const CastorLogo = ({
  className,
  wordmarkClassName,
}: {
  className?: string
  wordmarkClassName?: string
}) => {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <CastorGlyph className="size-8" />
      <CastorWordmark className={wordmarkClassName} />
    </span>
  )
}