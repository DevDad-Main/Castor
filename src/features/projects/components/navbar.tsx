"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { UserButton } from "@clerk/nextjs"
import { formatDistanceToNow } from "date-fns"
import { FaGithub } from "react-icons/fa"
import {
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
          className="text-zinc-400 hover:bg-landing-card/60 hover:text-zinc-100 grid size-8 cursor-pointer place-items-center rounded-md transition-colors"
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
    <nav className="bg-landing/90 border-landing-line/60 flex h-12 shrink-0 items-center justify-between gap-2 border-b px-4 backdrop-blur-sm">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          variant="ghost"
          asChild
          className="h-8 w-fit! shrink-0 p-1.5! hover:bg-transparent"
        >
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="Castor" width={20} height={20} />
            <span
              className={cn(
                "text-base font-semibold tracking-tight text-zinc-100",
                display.className
              )}
            >
              Castor
            </span>
          </Link>
        </Button>

        <div className="bg-landing-line/40 h-5 w-px" />

        <div className="flex min-w-0 items-center gap-2">
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
                "bg-landing-card/60 text-foreground focus:ring-twin/30 h-7 max-w-48 rounded-md px-2 text-sm font-medium ring-1 outline-none ring-inset ring-landing-line",
                display.className
              )}
            />
          ) : (
            <button
              onClick={handleStartRename}
              className={cn(
                "hover:bg-landing-card/60 group flex h-7 max-w-56 items-center gap-1.5 rounded-md px-2 text-sm font-medium text-zinc-200 transition-colors",
                display.className
              )}
              title="Rename project"
            >
              <span className="truncate">{project?.name ?? "Loading..."}</span>
              <PencilIcon className="text-zinc-500 size-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          )}

          <div className="flex items-center gap-1.5 pl-1">
            {isImporting ? (
              <LoaderIcon className="text-zinc-400 size-3.5 animate-spin" />
            ) : (
              project?.updatedAt && (
                <div className="flex items-center gap-1.5">
                  <span className="relative flex size-1.5">
                    <span className="bg-emerald-400 absolute inline-flex size-full animate-ping rounded-full opacity-40" />
                    <span className="bg-emerald-400 relative inline-flex size-1.5 rounded-full" />
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500">
                    saved
                  </span>
                </div>
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

        <div className="px-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="font-mono text-[11px] text-zinc-500">
                  {isImporting
                    ? "importing…"
                    : project?.updatedAt
                      ? formatDistanceToNow(project.updatedAt, {
                          addSuffix: true,
                        })
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

        <div className="bg-landing-line/40 h-5 w-px" />

        <div className="pl-1">
          <UserButton />
        </div>
      </div>
    </nav>
  )
}
