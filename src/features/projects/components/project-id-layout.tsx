"use client"

import { Allotment } from "allotment"
import "allotment/dist/style.css"

import { GitBranchIcon } from "lucide-react"

import { Id } from "../../../../convex/_generated/dataModel"
import { Navbar } from "./navbar"
import { CopilotPanel } from "./copilot-panel"

const MIN_SIDEBAR_WIDTH = 240
const MAX_SIDEBAR_WIDTH = 560
const DEFAULT_CONVERSATION_SIDEBAR_WIDTH = 340
const DEFAULT_MAIN_SIZE = 1000

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

export const ProjectIdLayout = ({
  children,
  projectId,
}: {
  children: React.ReactNode
  projectId: Id<"projects">
}) => {
  return (
    <div className="bg-background flex h-screen w-full flex-col">
      <Navbar projectId={projectId} />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Allotment
          className="flex-1"
          defaultSizes={[DEFAULT_CONVERSATION_SIDEBAR_WIDTH, DEFAULT_MAIN_SIZE]}
        >
          <Allotment.Pane
            snap
            minSize={MIN_SIDEBAR_WIDTH}
            maxSize={MAX_SIDEBAR_WIDTH}
            preferredSize={DEFAULT_CONVERSATION_SIDEBAR_WIDTH}
          >
            <CopilotPanel />
          </Allotment.Pane>

          <Allotment.Pane className="min-h-0">{children}</Allotment.Pane>
        </Allotment>
      </div>
      <StatusBar />
    </div>
  )
}
