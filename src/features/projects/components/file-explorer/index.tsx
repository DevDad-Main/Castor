import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "cn"
import {
  ChevronRight,
  CopyMinusIcon,
  FilePlusCornerIcon,
  FolderPlusIcon,
} from "lucide-react"
import { useState } from "react"
import { Id } from "../../../../../convex/_generated/dataModel"
import { useProject } from "../hooks/use-projects"
import { Button } from "@/components/ui/button"
import {
  useCreateFile,
  useCreateFolder,
  useFolderContents,
} from "../hooks/use-files"
import { CreateInput } from "./create-input"
import { LoadingRow } from "./loading-row"
import { Tree } from "./tree"

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

  return (
    <div className="bg-sidebar h-full">
      <ScrollArea>
        <div
          role="button"
          onClick={() => setIsOpen((value) => !value)}
          className="group/project bg-accent flex h-5.5 w-full cursor-pointer items-center gap-0.5 text-left font-bold"
        >
          <ChevronRight
            className={cn(
              "text-muted-foreground size-4 shrink-0",
              isOpen && "rotate-90"
            )}
          />
          <p className="line-clamp-1 text-xs uppercase">
            {project?.name ?? "Loading..."}
          </p>
          <div className="ml-auto flex items-center gap-0.5 opacity-0 transition-none duration-0 group-hover/project:opacity-100">
            <Button
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setIsOpen(true)
                // Set creating to true
                setCreating("file")
              }}
              variant="highlight"
              size="icon-xxs"
            >
              <FilePlusCornerIcon className="size-3.5" />
            </Button>

            <Button
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setIsOpen(true)
                setCreating("folder")
              }}
              variant="highlight"
              size="icon-xxs"
            >
              <FolderPlusIcon className="size-3.5" />
            </Button>

            <Button
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                // reset Collapse
                setCollapseKey((prev) => prev + 1)
              }}
              variant="highlight"
              size="icon-xxs"
            >
              <CopyMinusIcon className="size-3.5" />
            </Button>
          </div>
        </div>

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
