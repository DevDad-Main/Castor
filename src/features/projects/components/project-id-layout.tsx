"use client"

import { useState } from "react"
import { Allotment } from "allotment"
import "allotment/dist/style.css"

import { GitBranchIcon, CheckCircle2Icon } from "lucide-react"

import { Id } from "../../../../convex/_generated/dataModel"
import { Navbar } from "./navbar"
import { CopilotPanel } from "./copilot-panel"
import { ExplorerActions, FileExplorer } from "./file-explorer"
import { Dock, DragTarget } from "./layout/dock"
import {
  WorkspaceLayoutProvider,
  useWorkspaceLayout,
} from "./layout/workspace-layout-context"
import { type PanelId } from "./layout/config"

const MIN_SIDEBAR_WIDTH = 200

const StatusBar = () => {
  return (
    <footer className="bg-landing/80 border-landing-line/60 flex h-7 shrink-0 items-center justify-between border-t px-3">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <GitBranchIcon className="text-zinc-500 size-3.5" />
          <span className="font-mono text-[11px] text-zinc-400">main</span>
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2Icon className="size-3 text-emerald-500/80" />
          <span className="font-mono text-[11px] text-zinc-500">synced</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden font-mono text-[11px] text-zinc-500 sm:block">
          TypeScript
        </span>
        <span className="font-mono text-[11px] text-zinc-500">UTF-8</span>
      </div>
    </footer>
  )
}

const WorkspaceDocks = ({
  children,
  projectId,
}: {
  children: React.ReactNode
  projectId: Id<"projects">
}) => {
  const { layout, draggingId, setDockSizes } = useWorkspaceLayout()
  const hasLeft = layout.left.length > 0
  const hasRight = layout.right.length > 0

  const dockSizes = layout.dockSizes
  const sizes = [
    ...(hasLeft ? [dockSizes.left] : []),
    dockSizes.main,
    ...(hasRight ? [dockSizes.right] : []),
  ]

  const handleDockResize = (next: number[]) => {
    let i = 0
    const nextSizes = { ...dockSizes }
    if (hasLeft) nextSizes.left = next[i++]
    nextSizes.main = next[i++]
    if (hasRight) nextSizes.right = next[i]
    setDockSizes(nextSizes)
  }

  const [creating, setCreating] = useState<"file" | "folder" | null>(null)
  const [collapseKey, setCollapseKey] = useState(0)

  const renderPanel = (
    id: PanelId
  ): { actions?: React.ReactNode; content: React.ReactNode } => {
    if (id === "explorer") {
      return {
        actions: (
          <ExplorerActions
            onNewFile={() => setCreating("file")}
            onNewFolder={() => setCreating("folder")}
            onCollapse={() => setCollapseKey((prev) => prev + 1)}
          />
        ),
        content: (
          <FileExplorer
            projectId={projectId}
            creating={creating}
            onCreating={setCreating}
            collapseKey={collapseKey}
          />
        ),
      }
    }
    return { content: <CopilotPanel /> }
  }

  return (
    <div className="relative flex min-h-0 flex-1 overflow-hidden">
      <Allotment
        key={`${layout.left.join(",")}|${layout.right.join(",")}`}
        className="flex-1"
        defaultSizes={sizes}
        onDragEnd={handleDockResize}
      >
        {hasLeft && (
          <Allotment.Pane
            snap
            minSize={MIN_SIDEBAR_WIDTH}
            preferredSize={dockSizes.left}
          >
            <Dock side="left" renderPanel={renderPanel} />
          </Allotment.Pane>
        )}

        <Allotment.Pane className="min-h-0">{children}</Allotment.Pane>

        {hasRight && (
          <Allotment.Pane snap minSize={140} preferredSize={dockSizes.right}>
            <Dock side="right" renderPanel={renderPanel} />
          </Allotment.Pane>
        )}
      </Allotment>

      {draggingId !== null && !hasLeft && <DragTarget side="left" />}
      {draggingId !== null && !hasRight && <DragTarget side="right" />}
    </div>
  )
}

export const ProjectIdLayout = ({
  children,
  projectId,
}: {
  children: React.ReactNode
  projectId: Id<"projects">
}) => {
  return (
    <WorkspaceLayoutProvider projectId={projectId}>
      <div className="dark bg-landing text-foreground flex h-screen w-full flex-col antialiased">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.7 0.14 262 / 0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(80% 60% at 50% 0%, black, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(80% 60% at 50% 0%, black, transparent 70%)",
          }}
        />
        <div className="relative z-10 flex h-screen w-full flex-col">
          <Navbar projectId={projectId} />
          <div className="flex min-h-0 flex-1 overflow-hidden">
            <WorkspaceDocks projectId={projectId}>{children}</WorkspaceDocks>
          </div>
          <StatusBar />
        </div>
      </div>
    </WorkspaceLayoutProvider>
  )
}
