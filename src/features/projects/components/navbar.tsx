"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { UserButton } from "@clerk/nextjs"
import { formatDistanceToNow } from "date-fns"
import { FaGithub } from "react-icons/fa"
import {
  CheckIcon,
  LoaderIcon,
  PencilIcon,
  SettingsIcon,
  Share2Icon,
} from "lucide-react"

import { cn } from "cn"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { Id } from "../../../../convex/_generated/dataModel"
import { useProject, useRenameProject } from "./hooks/use-projects"
import { display } from "../lib/fonts"

const NavbarIconButton = ({
  label,
  onClick,
  children,
}: {
  label: string
  onClick?: () => void
  children: React.ReactNode
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          aria-label={label}
          className="text-muted-foreground hover:bg-accent/60 hover:text-foreground grid size-8 cursor-pointer place-items-center rounded-md transition-colors"
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export const Navbar = ({ projectId }: { projectId: Id<"projects"> }) => {
  const project = useProject(projectId)
  const renameProject = useRenameProject()

  const [isRenaming, setIsRenaming] = useState(false)
  const [name, setName] = useState("")

  const handleStartRename = () => {
    if (!project) {
      return
    }

    setName(project.name)
    setIsRenaming(true)
  }

  const handleSubmit = () => {
    if (!project) return

    setIsRenaming(false)

    const trimmedName = name.trim()

    if (!trimmedName || trimmedName === project.name) {
      return
    }

    renameProject({ id: projectId, name: trimmedName })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    } else if (e.key === "Escape") {
      setIsRenaming(false)
    }
  }

  const isImporting = project?.importStatus === "importing"

  return (
    <nav className="bg-sidebar border-border/60 flex h-11 shrink-0 items-center justify-between gap-2 border-b px-3">
      <div className="flex min-w-0 items-center gap-2">
        <Button
          variant="ghost"
          asChild
          className="h-8 w-fit! shrink-0 p-1.5! hover:bg-transparent"
        >
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Castor" width={18} height={18} />
            <span
              className={cn(
                "text-[15px] font-semibold tracking-tight",
                display.className
              )}
            >
              Castor
            </span>
          </Link>
        </Button>

        <Separator
          orientation="vertical"
          className="bg-border/60 h-5 w-px"
          decorative
        />

        <div className="flex min-w-0 items-center gap-1">
          {isRenaming ? (
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => e.currentTarget.select()}
              onBlur={handleSubmit}
              onKeyDown={handleKeyDown}
              className={cn(
                "bg-accent/60 text-foreground focus:ring-ring/50 h-7 max-w-48 rounded-md px-1.5 text-sm font-medium ring-1 outline-none ring-inset",
                display.className
              )}
            />
          ) : (
            <button
              onClick={handleStartRename}
              className={cn(
                "hover:bg-accent/60 group flex h-7 max-w-56 items-center gap-1.5 rounded-md px-1.5 text-sm font-medium transition-colors",
                display.className
              )}
              title="Rename project"
            >
              <span className="truncate">{project?.name ?? "Loading..."}</span>
              <PencilIcon className="text-muted-foreground/60 size-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          )}

          <div className="flex items-center gap-1.5 pl-1">
            {isImporting ? (
              <LoaderIcon className="text-muted-foreground size-3.5 animate-spin" />
            ) : (
              project?.updatedAt && (
                <CheckIcon className="size-3.5 text-emerald-500" />
              )
            )}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <NavbarIconButton label="Share">
          <Share2Icon className="size-4" />
        </NavbarIconButton>
        <NavbarIconButton label="Import from GitHub">
          <FaGithub className="size-4" />
        </NavbarIconButton>
        <NavbarIconButton label="Settings">
          <SettingsIcon className="size-4" />
        </NavbarIconButton>

        <div className="px-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-muted-foreground line-clamp-1 text-xs">
                  {isImporting
                    ? "Importing files…"
                    : project?.updatedAt
                      ? `Saved ${formatDistanceToNow(project.updatedAt, { addSuffix: true })}`
                      : ""}
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {isImporting
                  ? "Files are being imported from GitHub"
                  : "Changes are saved automatically"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Separator
          orientation="vertical"
          className="bg-border/60 h-5 w-px"
          decorative
        />

        <div className="pl-1">
          <UserButton />
        </div>
      </div>
    </nav>
  )
}
