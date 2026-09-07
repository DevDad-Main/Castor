import { cn } from "cn"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  FilePlus2Icon,
  FolderPlusIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react"
import { getItemPadding } from "./constants"
import { Doc } from "../../../../../convex/_generated/dataModel"

export const baseRowClass = cn(
  "flex h-6 w-full items-center gap-1 rounded outline-none",
  "text-zinc-400 hover:bg-landing-card/70 hover:text-zinc-200",
  "focus-visible:ring-1 focus-visible:ring-ring/40 focus-visible:ring-inset"
)

export const TreeItemWrapper = ({
  item,
  children,
  level,
  isActive,
  onClick,
  onDoubleClick,
  onRename,
  onDelete,
  onCreateFile,
  onCreateFolder,
}: {
  item: Doc<"files">
  children: React.ReactNode
  level: number
  isActive?: boolean
  onClick?: () => void
  onDoubleClick?: () => void
  onRename?: () => void
  onDelete?: () => void
  onCreateFile?: () => void
  onCreateFolder?: () => void
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <button
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          className={cn(
            baseRowClass,
            isActive && "bg-landing-card/80 text-zinc-100"
          )}
          style={{ paddingLeft: getItemPadding(level, item.type === "file") }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              onRename?.()
            }
          }}
        >
          {children}
        </button>
      </ContextMenuTrigger>
      <ContextMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="w-56"
      >
        {item.type === "folder" && (
          <>
            <ContextMenuItem onClick={onCreateFile} className="gap-2 text-sm">
              <FilePlus2Icon className="text-muted-foreground size-3.5" />
              New File
              <ContextMenuShortcut className="font-mono">N</ContextMenuShortcut>
            </ContextMenuItem>

            <ContextMenuItem onClick={onCreateFolder} className="gap-2 text-sm">
              <FolderPlusIcon className="text-muted-foreground size-3.5" />
              New Folder
              <ContextMenuShortcut className="font-mono">F</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
          </>
        )}

        <ContextMenuItem onClick={onRename} className="gap-2 text-sm">
          <PencilIcon className="text-muted-foreground size-3.5" />
          Rename...
          <ContextMenuShortcut className="font-mono">↵</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem
          onClick={onDelete}
          variant="destructive"
          className="gap-2 text-sm"
        >
          <Trash2Icon className="size-3.5" />
          Delete Permanently
          <ContextMenuShortcut className="font-mono">⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
