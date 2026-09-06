import { ChevronRightIcon } from "lucide-react"
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils"
import { useState } from "react"
import { getItemPadding } from "./constants"
import { cn } from "cn"

export const RenameInput = ({
  type,
  defaultValue,
  isOpen,
  level,
  onSubmit,
  onCancel,
}: {
  type: "file" | "folder"
  defaultValue: string
  isOpen?: boolean
  level: number
  onSubmit: (name: string) => void
  onCancel: () => void
}) => {
  const [value, setValue] = useState(defaultValue)

  const handleSubmit = () => {
    const trimmedValue = value.trim() || defaultValue
    onSubmit(trimmedValue)
  }

  return (
    <div
      className="border-ring/40 bg-accent/60 flex h-7 w-full items-center gap-1 rounded border"
      style={{ paddingLeft: getItemPadding(level, type === "file") }}
    >
      <div className="flex items-center gap-1.5">
        {type === "folder" && (
          <ChevronRightIcon
            className={cn(
              "text-muted-foreground size-4 shrink-0",
              isOpen && "rotate-90"
            )}
          />
        )}

        {type === "file" && (
          <FileIcon
            fileName={value}
            autoAssign
            className="text-muted-foreground size-4 shrink-0"
          />
        )}

        {type === "folder" && (
          <FolderIcon folderName={value} className="size-4" />
        )}
      </div>
      <input
        autoFocus
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="text-foreground flex-1 bg-transparent text-sm outline-none"
        onBlur={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit()
          }

          if (e.key === "Escape") {
            onCancel()
          }
        }}
        onFocus={(e) => {
          if (type === "folder") {
            e.currentTarget.select()
          } else {
            const value = e.currentTarget.value
            const lastDotIndex = value.lastIndexOf(".")
            if (lastDotIndex > 0) {
              e.currentTarget.setSelectionRange(0, lastDotIndex)
            } else {
              e.currentTarget.select()
            }
          }
        }}
      />
    </div>
  )
}
