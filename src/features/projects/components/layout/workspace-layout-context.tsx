"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react"

import { Id } from "../../../../../convex/_generated/dataModel"
import {
  DEFAULT_LAYOUT,
  type DockSide,
  type PanelId,
  type WorkspaceLayout,
  loadLayout,
  saveLayout,
} from "./config"

interface LayoutStore {
  value: WorkspaceLayout
  listeners: Set<() => void>
}

const stores = new Map<string, LayoutStore>()

const getStore = (projectId: string): LayoutStore => {
  let store = stores.get(projectId)
  if (!store) {
    store = { value: loadLayout(projectId), listeners: new Set() }
    stores.set(projectId, store)
  }
  return store
}

const subscribeToStore = (projectId: string, listener: () => void) => {
  const store = getStore(projectId)
  store.listeners.add(listener)
  return () => {
    store.listeners.delete(listener)
  }
}

const updateLayout = (
  projectId: string,
  updater: (prev: WorkspaceLayout) => WorkspaceLayout
) => {
  const store = getStore(projectId)
  store.value = updater(store.value)
  saveLayout(projectId, store.value)
  store.listeners.forEach((listener) => listener())
}

interface WorkspaceLayoutContextValue {
  layout: WorkspaceLayout
  has: (id: PanelId) => boolean
  sideOf: (id: PanelId) => DockSide | null
  movePanel: (id: PanelId, to: DockSide) => void
  togglePanel: (id: PanelId) => void
  setSplit: (value: boolean) => void
  reset: () => void
  draggingId: PanelId | null
  setDraggingId: (id: PanelId | null) => void
}

const WorkspaceLayoutContext =
  createContext<WorkspaceLayoutContextValue | null>(null)

export const WorkspaceLayoutProvider = ({
  projectId,
  children,
}: {
  projectId: Id<"projects">
  children: React.ReactNode
}) => {
  const [draggingId, setDraggingId] = useState<PanelId | null>(null)

  const layout = useSyncExternalStore(
    useCallback(
      (listener) => subscribeToStore(projectId, listener),
      [projectId]
    ),
    useCallback(() => getStore(projectId).value, [projectId]),
    useCallback(() => DEFAULT_LAYOUT, [])
  )

  useEffect(() => {
    const clearDrag = () => setDraggingId(null)
    document.addEventListener("dragend", clearDrag, true)
    return () => {
      document.removeEventListener("dragend", clearDrag, true)
    }
  }, [setDraggingId])

  const has = useCallback(
    (id: PanelId) => layout.left.includes(id) || layout.right.includes(id),
    [layout]
  )

  const sideOf = useCallback(
    (id: PanelId): DockSide | null => {
      if (layout.left.includes(id)) return "left"
      if (layout.right.includes(id)) return "right"
      return null
    },
    [layout]
  )

  const movePanel = useCallback(
    (id: PanelId, to: DockSide) => {
      updateLayout(projectId, (prev) => {
        const remove = (arr: PanelId[]) => arr.filter((p) => p !== id)
        const next = {
          left: remove(prev.left),
          right: remove(prev.right),
          split: prev.split,
        }
        next[to] = [...next[to], id]
        return next
      })
    },
    [projectId]
  )

  const togglePanel = useCallback(
    (id: PanelId) => {
      updateLayout(projectId, (prev) => {
        const visible = prev.left.includes(id) || prev.right.includes(id)
        if (!visible) {
          return { ...prev, right: [...prev.right, id] }
        }
        return {
          left: prev.left.filter((p) => p !== id),
          right: prev.right.filter((p) => p !== id),
          split: prev.split,
        }
      })
    },
    [projectId]
  )

  const setSplit = useCallback(
    (value: boolean) => {
      updateLayout(projectId, (prev) => ({ ...prev, split: value }))
    },
    [projectId]
  )

  const reset = useCallback(() => {
    updateLayout(projectId, () => ({ ...DEFAULT_LAYOUT }))
  }, [projectId])

  const value = useMemo(
    () => ({
      layout,
      has,
      sideOf,
      movePanel,
      togglePanel,
      setSplit,
      reset,
      draggingId,
      setDraggingId,
    }),
    [layout, has, sideOf, movePanel, togglePanel, setSplit, reset, draggingId]
  )

  return (
    <WorkspaceLayoutContext.Provider value={value}>
      {children}
    </WorkspaceLayoutContext.Provider>
  )
}

export const useWorkspaceLayout = () => {
  const context = useContext(WorkspaceLayoutContext)
  if (!context) {
    throw new Error(
      "useWorkspaceLayout must be used within a WorkspaceLayoutProvider"
    )
  }
  return context
}
