"use client"

import { cn } from "cn"
import { Id } from "../../../../convex/_generated/dataModel"
import { useState } from "react"
import { Allotment } from "allotment"
import { FaGithub } from "react-icons/fa"
import { Code2Icon, EyeIcon, FileTextIcon, MonitorIcon } from "lucide-react"
import { FileExplorer } from "./file-explorer"

const MIN_SIDEBAR_WIDTH = 200
const MAX_SIDEBAR_WIDTH = 480
const DEFAULT_SIDEBAR_WIDTH = 264
const DEFAULT_MAIN_SIZE = 1000

const Tab = ({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-muted-foreground hover:text-foreground hover:bg-accent/40 border-border/60 relative flex h-full items-center gap-2 border-r px-3.5 text-sm transition-colors",
        isActive && "bg-background text-foreground"
      )}
    >
      {icon}
      {label}
    </button>
  )
}

const BlankEditor = () => {
  return (
    <div className="bg-background flex h-full w-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2 text-center">
        <FileTextIcon className="text-muted-foreground/40 size-9" />
        <div className="flex flex-col gap-0.5">
          <span className="text-foreground text-sm font-medium">
            No file open
          </span>
          <span className="text-muted-foreground text-xs">
            Select a file from the explorer to start editing
          </span>
        </div>
        <span className="text-muted-foreground/70 mt-2 text-xs">
          <kbd className="bg-muted text-muted-foreground border-border rounded-sm border px-1.5 py-0.5 text-[11px]">
            ⌘
          </kbd>
          {" + "}
          <kbd className="bg-muted text-muted-foreground border-border rounded-sm border px-1.5 py-0.5 text-[11px]">
            O
          </kbd>
          {"  "}to open a file
        </span>
      </div>
    </div>
  )
}

const BlankPreview = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-border/60 bg-sidebar flex h-9 shrink-0 items-center gap-2 border-b px-3">
        <div className="text-muted-foreground border-border bg-background flex w-full max-w-md items-center gap-2 rounded-md border px-2.5 py-1 text-xs">
          <span>castor.app/workspace</span>
        </div>
      </div>

      <div className="bg-background flex min-h-0 flex-1 flex-col items-center justify-center gap-2 text-center">
        <MonitorIcon className="text-muted-foreground/40 size-9" />
        <div className="flex flex-col gap-0.5">
          <span className="text-foreground text-sm font-medium">
            Preview not shared
          </span>
          <span className="text-muted-foreground text-xs">
            Open a file and switch to Preview to render your workspace.
          </span>
        </div>
      </div>
    </div>
  )
}

const ProjectIdView = ({ projectId }: { projectId: Id<"projects"> }) => {
  const [activeView, setActiveView] = useState<"editor" | "preview">("editor")

  return (
    <div className="flex h-full flex-col">
      <nav className="bg-sidebar border-border/60 flex h-9 shrink-0 items-stretch border-b">
        <Tab
          icon={<Code2Icon className="size-4" />}
          label="Code"
          isActive={activeView === "editor"}
          onClick={() => setActiveView("editor")}
        />
        <Tab
          icon={<EyeIcon className="size-4" />}
          label="Preview"
          isActive={activeView === "preview"}
          onClick={() => setActiveView("preview")}
        />

        <div className="ml-auto flex items-center pr-2">
          <button className="text-muted-foreground hover:bg-accent/50 hover:text-foreground flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-sm transition-colors">
            <FaGithub className="size-3.5" />
            Export
          </button>
        </div>
      </nav>

      <div className="relative min-h-0 flex-1">
        <div
          className={cn(
            "absolute inset-0",
            activeView === "editor" ? "visible" : "invisible"
          )}
        >
          <Allotment
            defaultSizes={[DEFAULT_SIDEBAR_WIDTH, DEFAULT_MAIN_SIZE]}
            className="h-full"
          >
            <Allotment.Pane
              snap
              minSize={MIN_SIDEBAR_WIDTH}
              maxSize={MAX_SIDEBAR_WIDTH}
              preferredSize={DEFAULT_SIDEBAR_WIDTH}
            >
              <FileExplorer projectId={projectId} />
            </Allotment.Pane>

            <Allotment.Pane className="min-w-0">
              <BlankEditor />
            </Allotment.Pane>
          </Allotment>
        </div>
        <div
          className={cn(
            "absolute inset-0",
            activeView === "preview" ? "visible" : "invisible"
          )}
        >
          <BlankPreview />
        </div>
      </div>
    </div>
  )
}

export default ProjectIdView
