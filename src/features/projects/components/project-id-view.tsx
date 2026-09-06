"use client"

import { cn } from "cn"
import { useState } from "react"
import { Allotment } from "allotment"
import { FaGithub } from "react-icons/fa"
import {
  CheckIcon,
  ChevronDownIcon,
  Code2Icon,
  Columns2Icon,
  EyeIcon,
  FileTextIcon,
  LayoutPanelLeftIcon,
  MonitorIcon,
  RotateCcwIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ALL_PANELS, PANEL_META, type PanelId } from "./layout/config"
import { useWorkspaceLayout } from "./layout/workspace-layout-context"

const DEFAULT_MAIN_SIZE = 1000
const DEFAULT_PREVIEW_SIZE = 460

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
        "text-muted-foreground hover:text-foreground hover:bg-accent/40 border-border/60 relative flex h-full cursor-pointer items-center gap-2 border-r px-3.5 text-sm transition-colors",
        isActive && "bg-background text-foreground"
      )}
    >
      {icon}
      {label}
    </button>
  )
}

const LayoutMenu = () => {
  const { has, togglePanel, reset } = useWorkspaceLayout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-muted-foreground hover:bg-accent/50 hover:text-foreground flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-sm transition-colors">
          <LayoutPanelLeftIcon className="size-3.5" />
          Layout
          <ChevronDownIcon className="size-3.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="text-xs">Panels</DropdownMenuLabel>
        {ALL_PANELS.map((id: PanelId) => {
          const meta = PANEL_META[id]
          const Icon = meta.icon
          return (
            <DropdownMenuItem
              key={id}
              onClick={() => togglePanel(id)}
              className="flex items-center justify-between gap-3"
            >
              <span className="flex items-center gap-2">
                <Icon className="text-muted-foreground size-4" />
                {meta.label}
              </span>
              {has(id) && (
                <CheckIcon className="text-muted-foreground size-3.5" />
              )}
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => reset()}>
          <RotateCcwIcon className="text-muted-foreground size-4" />
          Reset layout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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

const ProjectIdView = () => {
  const { layout, setSplit } = useWorkspaceLayout()
  const [activeView, setActiveView] = useState<"editor" | "preview">("editor")

  const isSplit = layout.split

  return (
    <div className="flex h-full flex-col">
      <nav className="bg-sidebar border-border/60 flex h-9 shrink-0 items-stretch border-b">
        <Tab
          icon={<Code2Icon className="size-4" />}
          label="Code"
          isActive={activeView === "editor" && !isSplit}
          onClick={() => {
            setSplit(false)
            setActiveView("editor")
          }}
        />
        <Tab
          icon={<Columns2Icon className="size-4" />}
          label="Side by side"
          isActive={isSplit}
          onClick={() => setSplit(true)}
        />
        <Tab
          icon={<EyeIcon className="size-4" />}
          label="Preview"
          isActive={activeView === "preview" && !isSplit}
          onClick={() => {
            setSplit(false)
            setActiveView("preview")
          }}
        />

        <div className="ml-auto flex items-center gap-1 pr-2">
          <button className="text-muted-foreground hover:bg-accent/50 hover:text-foreground flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-sm transition-colors">
            <FaGithub className="size-3.5" />
            Export
          </button>
          <LayoutMenu />
        </div>
      </nav>

      <div className="relative min-h-0 flex-1">
        {isSplit ? (
          <Allotment
            defaultSizes={[DEFAULT_MAIN_SIZE, DEFAULT_PREVIEW_SIZE]}
            className="h-full"
          >
            <Allotment.Pane className="min-w-0">
              <BlankEditor />
            </Allotment.Pane>
            <Allotment.Pane minSize={240} preferredSize={DEFAULT_PREVIEW_SIZE}>
              <div className="border-border/60 h-full border-l">
                <BlankPreview />
              </div>
            </Allotment.Pane>
          </Allotment>
        ) : (
          <>
            <div
              className={cn(
                "absolute inset-0",
                activeView === "editor" ? "visible" : "invisible"
              )}
            >
              <BlankEditor />
            </div>
            <div
              className={cn(
                "absolute inset-0",
                activeView === "preview" ? "visible" : "invisible"
              )}
            >
              <BlankPreview />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProjectIdView
