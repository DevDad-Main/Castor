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
        "relative flex h-full cursor-pointer items-center gap-2 px-3.5 text-sm transition-colors",
        isActive
          ? "text-zinc-100"
          : "text-zinc-500 hover:text-zinc-300"
      )}
    >
      {icon}
      {label}
      {isActive && (
        <span className="bg-twin absolute inset-x-3 bottom-0 h-0.5 rounded-full" />
      )}
    </button>
  )
}

const LayoutMenu = () => {
  const { has, togglePanel, reset } = useWorkspaceLayout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-zinc-400 hover:bg-landing-card/60 hover:text-zinc-100 flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-sm transition-colors">
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
    <div className="flex h-full w-full flex-col">
      <div className="relative bg-[linear-gradient(180deg,oklch(0.17_0.014_264),oklch(0.145_0.012_264))] flex min-h-0 flex-1 flex-col items-center justify-center gap-3 overflow-hidden text-center">
        <div
          aria-hidden
          className="animate-aurora pointer-events-none absolute -top-24 -left-32 size-[480px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.16_262/0.09),transparent_65%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.7 0.14 262 / 0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(60% 60% at 50% 50%, black, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(60% 60% at 50% 50%, black, transparent 80%)",
          }}
        />
        <FileTextIcon className="text-zinc-600 size-10" />
        <div className="flex flex-col gap-1">
          <span className="text-zinc-200 text-sm font-medium">
            No file open
          </span>
          <span className="text-zinc-500 text-xs">
            Select a file from the explorer to start editing
          </span>
        </div>
        <span className="font-mono text-[11px] text-zinc-600">
          <kbd className="bg-landing-card border-landing-line text-zinc-400 rounded border px-1.5 py-0.5">
            ⌘
          </kbd>
          {" + "}
          <kbd className="bg-landing-card border-landing-line text-zinc-400 rounded border px-1.5 py-0.5">
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
      <div className="bg-landing-card/50 border-landing-line/60 flex h-9 shrink-0 items-center gap-2 border-b px-3">
        <div className="border-landing-line bg-landing/80 flex w-full max-w-md items-center gap-2 rounded-md border px-2.5 py-1 text-xs">
          <span className="font-mono text-[11px] text-zinc-400">
            castor.app/workspace
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <span className="relative flex size-1.5">
              <span className="bg-emerald-400 absolute inline-flex size-full animate-ping rounded-full opacity-60" />
              <span className="bg-emerald-400 relative inline-flex size-1.5 rounded-full" />
            </span>
            <span className="font-mono text-[10px] text-zinc-500">live</span>
          </span>
        </div>
      </div>

      <div className="bg-[radial-gradient(80%_90%_at_50%_0%,oklch(0.42_0.12_262/0.14),oklch(0.15_0.012_264)_60%)] flex min-h-0 flex-1 flex-col items-center justify-center gap-3 text-center">
        <MonitorIcon className="text-zinc-600 size-10" />
        <div className="flex flex-col gap-1">
          <span className="text-zinc-200 text-sm font-medium">
            Preview not shared
          </span>
          <span className="text-zinc-500 text-xs">
            Open a file and switch to Preview to render your workspace.
          </span>
        </div>
      </div>
    </div>
  )
}

const ProjectIdView = () => {
  const { layout, setSplit, setSplitSizes } = useWorkspaceLayout()
  const [activeView, setActiveView] = useState<"editor" | "preview">("editor")

  const isSplit = layout.split

  return (
    <div className="flex h-full flex-col">
      <nav className="bg-landing/95 border-landing-line/60 flex h-9 shrink-0 items-stretch border-b px-1">
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

        <div className="ml-auto flex items-center gap-1 pr-1">
          <button className="text-zinc-400 hover:bg-landing-card/60 hover:text-zinc-100 flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-sm transition-colors">
            <FaGithub className="size-3.5" />
            Export
          </button>
          <LayoutMenu />
        </div>
      </nav>

      <div className="relative min-h-0 flex-1">
        {isSplit ? (
          <Allotment
            defaultSizes={[
              layout.splitSizes.main,
              layout.splitSizes.preview,
            ]}
            onDragEnd={(sizes) =>
              setSplitSizes({ main: sizes[0], preview: sizes[1] })
            }
            className="h-full"
          >
            <Allotment.Pane className="min-w-0">
              <BlankEditor />
            </Allotment.Pane>
            <Allotment.Pane minSize={240} preferredSize={layout.splitSizes.preview}>
              <div className="h-full border-l border-landing-line/60">
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
