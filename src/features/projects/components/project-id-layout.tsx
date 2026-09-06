"use client"

import { useState } from "react"
import { Allotment } from "allotment"
import "allotment/dist/style.css"

import { GitBranchIcon } from "lucide-react"

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
const SIDEBAR_HEIGHT_SIZES = [300, 900, 360]

const StatusBar = () => {
  return (
    <footer className="bg-sidebar border-border/60 flex h-7 shrink-0 items-center justify-between border-t px-3">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <GitBranchIcon className="text-muted-foreground size-3.5" />
          <span className="text-muted-foreground text-xs">main</span>
        </span>
        <span className="text-muted-foreground hidden text-xs sm:block">
          0 problems
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-muted-foreground hidden text-xs md:block">
          TypeScript
        </span>
        <span className="text-muted-foreground hidden text-xs lg:block">
          UTF-8
        </span>
        <span className="text-muted-foreground text-xs">Ln 1, Col 1</span>
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
  const { layout, draggingId } = useWorkspaceLayout()
  const [leftSize, rightSize] = SIDEBAR_HEIGHT_SIZES

  const hasLeft = layout.left.length > 0
  const hasRight = layout.right.length > 0

  const sizes = [
    ...(hasLeft ? [leftSize] : []),
    900,
    ...(hasRight ? [rightSize] : []),
  ]

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
      >
        {hasLeft && (
          <Allotment.Pane
            snap
            minSize={MIN_SIDEBAR_WIDTH}
            preferredSize={leftSize}
          >
            <Dock side="left" renderPanel={renderPanel} />
          </Allotment.Pane>
        )}

        <Allotment.Pane className="min-h-0">{children}</Allotment.Pane>

        {hasRight && (
          <Allotment.Pane snap minSize={280} preferredSize={rightSize}>
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
      <div className="bg-background flex h-screen w-full flex-col">
        <Navbar projectId={projectId} />
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <WorkspaceDocks projectId={projectId}>{children}</WorkspaceDocks>
        </div>
        <StatusBar />
      </div>
    </WorkspaceLayoutProvider>
  )
}
