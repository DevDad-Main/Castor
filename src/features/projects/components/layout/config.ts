import {
  FileStack as FileStackIcon,
  MessageSquareText as MessageSquareTextIcon,
} from "lucide-react"

export type PanelId = "explorer" | "copilot"

export type DockSide = "left" | "right"

export interface WorkspaceLayout {
  left: PanelId[]
  right: PanelId[]
  split: boolean
}

export const DEFAULT_LAYOUT: WorkspaceLayout = {
  left: ["explorer"],
  right: ["copilot"],
  split: false,
}

export const ALL_PANELS: PanelId[] = ["explorer", "copilot"]

export const PANEL_META: Record<
  PanelId,
  { label: string; icon: React.ElementType }
> = {
  explorer: { label: "Explorer", icon: FileStackIcon },
  copilot: { label: "Copilot", icon: MessageSquareTextIcon },
}

export const layoutStorageKey = (projectId: string) =>
  `castor:layout:${projectId}`

const isPanelId = (value: unknown): value is PanelId =>
  value === "explorer" || value === "copilot"

export const loadLayout = (projectId: string): WorkspaceLayout => {
  if (typeof window === "undefined") return DEFAULT_LAYOUT

  try {
    const raw = window.localStorage.getItem(layoutStorageKey(projectId))
    if (!raw) return DEFAULT_LAYOUT

    const parsed = JSON.parse(raw) as Partial<WorkspaceLayout>
    if (!Array.isArray(parsed.left) || !Array.isArray(parsed.right)) {
      return DEFAULT_LAYOUT
    }

    return {
      left: parsed.left.filter(isPanelId),
      right: parsed.right.filter(isPanelId),
      split: Boolean(parsed.split),
    }
  } catch {
    return DEFAULT_LAYOUT
  }
}

export const saveLayout = (projectId: string, layout: WorkspaceLayout) => {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(
      layoutStorageKey(projectId),
      JSON.stringify(layout)
    )
  } catch {
    // storage unavailable — layout simply won't persist
  }
}
