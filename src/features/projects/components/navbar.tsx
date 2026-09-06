"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Allotment } from "allotment"
import { Id } from "../../../../convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { cn } from "cn"
import { Poppins } from "next/font/google"
import { UserButton } from "@clerk/nextjs"
import { useProject, useRenameProject } from "./hooks/use-projects"
import { useState } from "react"
import { CloudCheckIcon, LoaderIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const Navbar = ({ projectId }: { projectId: Id<"projects"> }) => {
  const project = useProject(projectId)
  const renameProject = useRenameProject({ projectId })

  const [isRenaming, setIsRenaming] = useState(false)
  const [name, setName] = useState("")

  const handleStartRename = () => {
    if (!project) {
      return
    }

    setName(project.name)
    setIsRenaming(true)
  }

  //#region Handle Submit
  const handleSubmit = () => {
    if (!project) return

    setIsRenaming(false)

    const trimmedName = name.trim()

    if (!trimmedName || trimmedName === project.name) {
      return
    }

    renameProject({ id: projectId, name: trimmedName })
  }
  //#endregion

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    } else if (e.key === "Escape") {
      setIsRenaming(false)
    }
  }

  return (
    <nav className="bg-sidebar flex items-center justify-between gap-x-2 border-b p-2">
      <div className="flex items-center gap-x-2">
        <Breadcrumb>
          <BreadcrumbList className="gap-0!">
            <BreadcrumbItem>
              <BreadcrumbLink className="flex items-center gap-1.5" asChild>
                <Button
                  variant={"ghost"}
                  className="h-7! w-fit! p-1.5!"
                  asChild
                >
                  <Link href="/">
                    <Image src="/logo.svg" alt="Logo" width={20} height={20} />
                    <span className={cn("text-sm font-medium", font.className)}>
                      Castor
                    </span>
                  </Link>
                </Button>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="mr-1 ml-0!" />

            <BreadcrumbItem>
              {isRenaming ? (
                <input
                  autoFocus
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={(e) => e.currentTarget.select()}
                  onBlur={handleSubmit}
                  onKeyDown={handleKeyDown}
                  className="text-foreground focus:ring-ring max-w-40 truncate bg-transparent text-sm font-medium outline-none focus:ring-1 focus:ring-inset"
                />
              ) : (
                <BreadcrumbPage
                  onClick={() => handleStartRename}
                  className="hover:text-primary max-w-40 cursor-pointer truncate text-sm font-medium"
                >
                  {project?.name ?? "Loading..."}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {project?.importStatus === "importing" ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <LoaderIcon className="text-muted-foreground size-4 animate-spin" />
              </TooltipTrigger>
              <TooltipContent>Importing...</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          project?.updatedAt && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CloudCheckIcon className="text-muted-foreground size-4" />
                </TooltipTrigger>
                <TooltipContent>
                  Saved{" "}
                  {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        )}
      </div>
      <div className="flex items-center gap-2">
        <UserButton />
      </div>
    </nav>
  )
}
