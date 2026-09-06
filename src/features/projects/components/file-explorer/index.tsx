import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "cn"
import { FolderIcon } from "@react-symbols/icons/utils"
import {
  ChevronRight,
  ChevronsUpIcon,
  FilePlusCornerIcon,
  FileStackIcon,
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

export const FileExplorer = ({ projectId }: { projectId: Id<"projects"> }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [collapseKey, setCollapseKey] = useState(0)
  const [creating, setCreating] = useState<"file" | "folder" | null>(null)

  const project = useProject(projectId)
  const rootFiles = useFolderContents({ projectId, enabled: isOpen })

  const createFile = useCreateFile()
  const createFolder = useCreateFolder()
  const handleCreateFile = (name: string) => {
    setCreating(null)

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

  const startCreating = (type: "file" | "folder") => {
    setIsOpen(true)
    setCreating(type)
  }

  return (
    <div className="bg-sidebar group/panel flex h-full flex-col">
      <div className="border-border/60 flex h-9 shrink-0 items-center gap-1.5 border-b px-2">
        <FileStackIcon className="text-muted-foreground size-4" />
        <span className="text-muted-foreground text-xs font-medium">
          Explorer
        </span>

        <div className="ml-auto flex items-center gap-0.5 opacity-0 transition-opacity group-hover/panel:opacity-100">
          <PanelAction
            label="New file"
            onClick={(e) => {
              e.stopPropagation()
              startCreating("file")
            }}
          >
            <FilePlusCornerIcon className="size-3.5" />
          </PanelAction>

          <PanelAction
            label="New folder"
            onClick={(e) => {
              e.stopPropagation()
              startCreating("folder")
            }}
          >
            <FolderPlusIcon className="size-3.5" />
          </PanelAction>

          <PanelAction
            label="Collapse all"
            onClick={(e) => {
              e.stopPropagation()
              setCollapseKey((prev) => prev + 1)
            }}
          >
            <ChevronsUpIcon className="size-3.5" />
          </PanelAction>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <button
          onClick={() => setIsOpen((value) => !value)}
          className="hover:bg-accent/50 flex h-7 w-full cursor-pointer items-center gap-1.5 pr-2 text-left"
          style={{ paddingLeft: getItemPadding(0, false) }}
        >
          <ChevronRight
            className={cn(
              "text-muted-foreground size-4 shrink-0",
              isOpen && "rotate-90"
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

        {isOpen && (
          <>
            {rootFiles === undefined && <LoadingRow level={0} />}
            {creating && (
              <CreateInput
                type={creating}
                level={0}
                onSubmit={handleCreateFile}
                onCancel={() => setCreating(null)}
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
