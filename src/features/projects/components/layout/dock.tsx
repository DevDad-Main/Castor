"use client"

import { useState } from "react"
import { GripVertical, MoreHorizontal, MoveLeft, MoveRight } from "lucide-react"

import { cn } from "cn"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { PANEL_META, type DockSide, type PanelId } from "./config"
import { useWorkspaceLayout } from "./workspace-layout-context"

const PANEL_DRAG_TYPE = "application/x-castor-panel"

export const DragTarget = ({ side }: { side: DockSide }) => {
  const { movePanel, setDraggingId } = useWorkspaceLayout()
  const [isDragTarget, setIsDragTarget] = useState(false)

  return (
    <div
      className={cn(
        "absolute inset-y-0 z-10 flex w-24 items-center justify-center p-2",
        side === "left" ? "left-0" : "right-0"
      )}
      onDragOver={(e) => {
        if (e.dataTransfer.types.includes(PANEL_DRAG_TYPE)) {
          e.preventDefault()
          e.dataTransfer.dropEffect = "move"
          setIsDragTarget(true)
        }
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsDragTarget(false)
        }
      }}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragTarget(false)
        const id = e.dataTransfer.getData(PANEL_DRAG_TYPE) as PanelId
        if (id) {
          movePanel(id, side)
          setDraggingId(null)
        }
      }}
    >
      <div
        className={cn(
          "border-border/50 text-muted-foreground/50 flex h-full w-full items-center justify-center rounded-lg border border-dashed text-xs transition-colors",
          isDragTarget &&
            "bg-ring/5 border-ring/70 ring-ring/60 text-muted-foreground ring-1 ring-inset"
        )}
      >
        Dock {side}
      </div>
    </div>
  )
}

export const DockPanel = ({
  id,
  actions,
  children,
}: {
  id: PanelId
  actions?: React.ReactNode
  children: React.ReactNode
}) => {
  const { sideOf, movePanel, togglePanel, setDraggingId } = useWorkspaceLayout()

  const side = sideOf(id)
  const meta = PANEL_META[id]
  const Icon = meta.icon

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData(PANEL_DRAG_TYPE, id)
    setDraggingId(id)
  }

  const handleDragEnd = () => {
    setDraggingId(null)
  }

  return (
    <section
      data-panel={id}
      className="bg-sidebar flex min-h-0 min-w-0 flex-1 flex-col"
    >
      <header
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="hover:bg-accent/30 border-border/60 flex h-9 shrink-0 cursor-grab items-center gap-1.5 border-b px-2 select-none active:cursor-grabbing"
        title={`Drag to move ${meta.label}. Right-click for options.`}
      >
        <GripVertical className="text-muted-foreground/50 size-3.5 shrink-0" />
        <Icon className="text-muted-foreground size-4 shrink-0" />
        <span className="text-foreground truncate text-xs font-medium">
          {meta.label}
        </span>

        <div className="ml-auto flex min-w-0 items-center gap-0.5">
          {actions}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label={`${meta.label} panel options`}
                className="text-muted-foreground hover:bg-accent/60 hover:text-foreground grid size-6 shrink-0 cursor-pointer place-items-center rounded"
              >
                <MoreHorizontal className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel className="text-xs">
                {meta.label}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {side && (
                <DropdownMenuItem
                  onClick={() =>
                    movePanel(id, side === "left" ? "right" : "left")
                  }
                >
                  {side === "left" ? (
                    <MoveRight className="size-4" />
                  ) : (
                    <MoveLeft className="size-4" />
                  )}
                  Move to {side === "left" ? "right" : "left"}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => togglePanel(id)}>
                Close panel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="min-h-0 min-w-0 flex-1">{children}</div>
    </section>
  )
}

export const Dock = ({
  side,
  renderPanel,
  className,
}: {
  side: DockSide
  renderPanel: (id: PanelId) => {
    actions?: React.ReactNode
    content: React.ReactNode
  }
  className?: string
}) => {
  const { layout, movePanel, setDraggingId, draggingId } = useWorkspaceLayout()
  const [isDragTarget, setIsDragTarget] = useState(false)

  const panelIds = layout[side]

  if (panelIds.length === 0) {
    return null
  }

  const hasDraggingPanel = draggingId !== null && !panelIds.includes(draggingId)

  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col",
        isDragTarget && "ring-ring/60 bg-ring/5 rounded-md ring-1 ring-inset",
        className
      )}
      onDragOver={(e) => {
        if (e.dataTransfer.types.includes(PANEL_DRAG_TYPE)) {
          e.preventDefault()
          e.dataTransfer.dropEffect = "move"
          setIsDragTarget(true)
        }
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsDragTarget(false)
        }
      }}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragTarget(false)
        const id = e.dataTransfer.getData(PANEL_DRAG_TYPE) as PanelId
        if (id) {
          movePanel(id, side)
          setDraggingId(null)
        }
      }}
    >
      {panelIds.map((id) => {
        const { actions, content } = renderPanel(id)
        return (
          <DockPanel key={id} id={id} actions={actions}>
            {content}
          </DockPanel>
        )
      })}

      {hasDraggingPanel && !isDragTarget && (
        <div
          aria-hidden
          className="bg-border/40 mx-1 mb-1 h-1 shrink-0 rounded-full"
        />
      )}
    </div>
  )
}
