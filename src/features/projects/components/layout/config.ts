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
  dockSizes: { left: number; main: number; right: number }
  splitSizes: { main: number; preview: number }
}

export const DEFAULT_DOCK_SIZES = { left: 280, main: 900, right: 260 }

export const DEFAULT_SPLIT_SIZES = { main: 1000, preview: 460 }

export const DEFAULT_LAYOUT: WorkspaceLayout = {
  left: ["explorer"],
  right: ["copilot"],
  split: false,
  dockSizes: DEFAULT_DOCK_SIZES,
  splitSizes: DEFAULT_SPLIT_SIZES,
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

const clampSide = (value: unknown, fallback: number) => {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback
  return Math.min(800, Math.max(140, value))
}

const clampMain = (value: unknown, fallback: number) => {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback
  return Math.min(1600, Math.max(400, value))
}

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
      dockSizes: {
        left: clampSide(parsed.dockSizes?.left, DEFAULT_DOCK_SIZES.left),
        main: clampMain(parsed.dockSizes?.main, DEFAULT_DOCK_SIZES.main),
        right: clampSide(parsed.dockSizes?.right, DEFAULT_DOCK_SIZES.right),
      },
      splitSizes: {
        main: clampMain(parsed.splitSizes?.main, DEFAULT_SPLIT_SIZES.main),
        preview: clampSide(
          parsed.splitSizes?.preview,
          DEFAULT_SPLIT_SIZES.preview
        ),
      },
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
