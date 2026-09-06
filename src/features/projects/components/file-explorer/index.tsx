import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "cn"
import { FolderIcon } from "@react-symbols/icons/utils"
import {
  ChevronRight,
  ChevronsUpIcon,
  FilePlusCornerIcon,
  FolderPlusIcon,
} from "lucide-react"
import { useState } from "react"
import { Id } from "../../../../../convex/_generated/dataModel"
import { useProject } from "../hooks/use-projects"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  useCreateFile,
  useCreateFolder,
  useFolderContents,
} from "../hooks/use-files"
import { CreateInput } from "./create-input"
import { LoadingRow } from "./loading-row"
import { Tree } from "./tree"
import { getItemPadding } from "./constants"

const PanelAction = ({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: (e: React.MouseEvent) => void
  children: React.ReactNode
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            aria-label={label}
            className="text-muted-foreground hover:bg-accent/60 hover:text-foreground grid size-6 cursor-pointer place-items-center rounded transition-colors"
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const ExplorerActions = ({
  onNewFile,
  onNewFolder,
  onCollapse,
}: {
  onNewFile: () => void
  onNewFolder: () => void
  onCollapse: () => void
}) => {
  return (
    <>
      <PanelAction
        label="New file"
        onClick={(e) => {
          e.stopPropagation()
          onNewFile()
        }}
      >
        <FilePlusCornerIcon className="size-3.5" />
      </PanelAction>

      <PanelAction
        label="New folder"
        onClick={(e) => {
          e.stopPropagation()
          onNewFolder()
        }}
      >
        <FolderPlusIcon className="size-3.5" />
      </PanelAction>

      <PanelAction
        label="Collapse all"
        onClick={(e) => {
          e.stopPropagation()
          onCollapse()
        }}
      >
        <ChevronsUpIcon className="size-3.5" />
      </PanelAction>
    </>
  )
}

export const FileExplorer = ({
  projectId,
  creating,
  onCreating,
  collapseKey,
}: {
  projectId: Id<"projects">
  creating: "file" | "folder" | null
  onCreating: (type: "file" | "folder" | null) => void
  collapseKey: number
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const rootOpen = isOpen || creating !== null

  const project = useProject(projectId)
  const rootFiles = useFolderContents({ projectId, enabled: rootOpen })

  const createFile = useCreateFile()
  const createFolder = useCreateFolder()
  const handleCreateFile = (name: string) => {
    onCreating(null)

    if (creating == "file") {
      createFile({
        projectId,
        name,
        content: "",
        parentId: undefined,
      })
    } else {
      createFolder({
        projectId,
        name,
        parentId: undefined,
      })
    }
  }

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="min-h-0 flex-1">
        <button
          onClick={() => setIsOpen((value) => !value)}
          className="hover:bg-accent/50 flex h-7 w-full cursor-pointer items-center gap-1.5 pr-2 text-left"
          style={{ paddingLeft: getItemPadding(0, false) }}
        >
          <ChevronRight
            className={cn(
              "text-muted-foreground size-4 shrink-0",
              rootOpen && "rotate-90"
            )}
          />
          <FolderIcon
            folderName={project?.name ?? "workspace"}
            className="text-muted-foreground size-4 shrink-0"
          />
          <span className="text-foreground truncate text-sm font-medium">
            {project?.name ?? "Loading..."}
          </span>
        </button>

        {rootOpen && (
          <>
            {rootFiles === undefined && <LoadingRow level={0} />}
            {creating && (
              <CreateInput
                type={creating}
                level={0}
                onSubmit={handleCreateFile}
                onCancel={() => onCreating(null)}
              />
            )}
            {rootFiles?.map((item) => (
              <Tree
                key={`${item._id}-${collapseKey}`}
                item={item}
                level={0}
                projectId={projectId}
              />
            ))}
          </>
        )}
      </ScrollArea>
    </div>
  )
}
