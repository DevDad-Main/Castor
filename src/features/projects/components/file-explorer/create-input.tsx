import { ChevronRightIcon } from "lucide-react"
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils"
import { useState } from "react"
import { getItemPadding } from "./constants"

export const CreateInput = ({
  type,
  level,
  onSubmit,
  onCancel,
}: {
  type: "file" | "folder"
  level: number
  onSubmit: (name: string) => void
  onCancel: () => void
}) => {
  const [value, setValue] = useState("")

  const handleSubmit = () => {
    const trimmedValue = value.trim()
    if (trimmedValue) {
      onSubmit(trimmedValue)
    } else {
      onCancel()
    }
  }

  return (
    <div
      className="border-twin/30 bg-landing-card/60 flex h-7 w-full items-center gap-1 rounded border"
      style={{ paddingLeft: getItemPadding(level, type === "file") }}
    >
      <div className="flex items-center gap-1.5">
        {type === "folder" && (
          <ChevronRightIcon className="text-zinc-500 size-4 shrink-0" />
        )}

        {type === "file" && (
          <FileIcon
            fileName={value}
            autoAssign
            className="text-zinc-500 size-4 shrink-0"
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
        placeholder={type === "file" ? "name.tsx" : "folder-name"}
        className="placeholder:text-zinc-600 text-zinc-200 flex-1 bg-transparent text-sm outline-none"
        onBlur={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit()
          }

          if (e.key === "Escape") {
            onCancel()
          }
        }}
      />
    </div>
  )
}
