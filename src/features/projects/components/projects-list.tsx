import { Kbd } from "@/components/ui/kbd"
import { Doc } from "../../../../convex/_generated/dataModel"
import Link from "next/link"
import {
  AlertCircleIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChevronRightIcon,
  FolderIcon,
  GlobeIcon,
  Loader2Icon,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { FaGithub } from "react-icons/fa"
import { cn } from "cn"
import { useProjectsPartial } from "./hooks/use-projects"

const formatTimeStamp = (timestamp: number) =>
  formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
  })

const ProjectIcon = ({
  project,
  size = "md",
}: {
  project: Doc<"projects">
  size?: "sm" | "md" | "lg"
}) => {
  const box = {
    sm: "size-7 rounded-md",
    md: "size-8 rounded-lg",
    lg: "size-10 rounded-xl",
  }[size]
  const icon = { sm: "size-3.5", md: "size-4", lg: "size-5" }[size]

  if (project.importStatus === "completed") {
    return (
      <span
        className={cn(
          "bg-emerald-500/15 text-emerald-500 grid shrink-0 place-items-center",
          box
        )}
      >
        <FaGithub className={icon} />
      </span>
    )
  }

  if (project.importStatus === "failed") {
    return (
      <span
        className={cn(
          "bg-red-500/15 text-red-500 grid shrink-0 place-items-center",
          box
        )}
      >
        <AlertCircleIcon className={icon} />
      </span>
    )
  }

  if (project.importStatus === "importing") {
    return (
      <span
        className={cn(
          "bg-sky-500/15 text-sky-500 grid shrink-0 place-items-center",
          box
        )}
      >
        <Loader2Icon className={cn(icon, "animate-spin")} />
      </span>
    )
  }

  return (
    <span
      className={cn(
        "bg-muted/70 text-muted-foreground grid shrink-0 place-items-center",
        box
      )}
    >
      <GlobeIcon className={icon} />
    </span>
  )
}

const getStatusLabel = (
  project: Doc<"projects">
): { label: string; className: string } | null => {
  switch (project.importStatus) {
    case "completed":
      return { label: "Imported", className: "text-emerald-500" }
    case "failed":
      return { label: "Import failed", className: "text-red-500" }
    case "importing":
      return { label: "Importing", className: "text-sky-500" }
    default:
      return null
  }
}

interface ProjectsListProps {
  onViewAll: () => void
}

const ContinueCard = ({ data }: { data: Doc<"projects"> }) => {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-muted-foreground px-1 text-xs font-medium tracking-wide uppercase">
        Continue where you left off
      </span>

      <Link
        href={`/projects/${data._id}`}
        className="group border-border/80 hover:border-ring/40 hover:shadow-[0_16px_48px_-16px_var(--ring)] relative flex items-center gap-4 overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5"
      >
        <ProjectIcon project={data} size="lg" />

        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold tracking-tight">
            {data.name}
          </p>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Updated {formatTimeStamp(data.updatedAt)}
          </p>
        </div>

        <span className="border-border/80 hover:border-ring/40 text-foreground bg-background grid size-9 shrink-0 place-items-center rounded-full border shadow-sm transition-all group-hover:translate-x-0.5">
          <ArrowUpRightIcon className="size-4" />
        </span>

        <span
          aria-hidden
          className="bg-gradient-to-r from-transparent to-ring/10 pointer-events-none absolute inset-y-0 right-0 w-1/3"
        />
      </Link>
    </div>
  )
}

const ProjectItem = ({ data }: { data: Doc<"projects"> }) => {
  const status = getStatusLabel(data)

  return (
    <li>
      <Link
        href={`/projects/${data._id}`}
        className="hover:bg-accent/50 group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors"
      >
        <ProjectIcon project={data} size="md" />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{data.name}</p>
          <p className="text-muted-foreground text-xs">
            {formatTimeStamp(data.updatedAt)}
          </p>
        </div>

        {status && (
          <span
            className={cn("hidden text-xs font-medium sm:block", status.className)}
          >
            {status.label}
          </span>
        )}

        <ArrowRightIcon className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
      </Link>
    </li>
  )
}

export const ProjectsList = ({ onViewAll }: ProjectsListProps) => {
  const projects = useProjectsPartial(6)

  if (projects === undefined) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="bg-muted h-4 w-40 animate-pulse rounded-full" />
          <div className="bg-card/70 h-24 animate-pulse rounded-2xl" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-muted h-4 w-32 animate-pulse rounded-full" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-muted/50 h-12 animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="border-border/80 bg-card/30 flex flex-col items-center gap-5 rounded-2xl border border-dashed px-6 py-14 text-center">
        <span className="bg-muted/70 text-muted-foreground grid size-14 place-items-center rounded-2xl">
          <FolderIcon className="size-6" />
        </span>

        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold">No projects yet</p>
          <p className="text-muted-foreground text-sm">
            Create your first project to spin up an AI-powered cloud IDE
            workspace.
          </p>
        </div>
      </div>
    )
  }

  const [mostRecent, ...rest] = projects

  return (
    <div className="flex flex-col gap-2">
      <ContinueCard data={mostRecent} />

      {rest.length > 0 && (
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                Recent projects
              </span>
              <span className="bg-muted/80 text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                {rest.length}
              </span>
            </div>

            <button
              onClick={onViewAll}
              className="text-muted-foreground hover:text-foreground group flex items-center gap-1.5 text-xs font-medium transition-colors"
            >
              View all
              <Kbd className="border bg-background/60">⌘K</Kbd>
              <ChevronRightIcon className="group-hover:translate-x-0.5 size-3.5 transition-transform" />
            </button>
          </div>

          <ul className="flex flex-col gap-0.5">
            {rest.map((project) => (
              <ProjectItem key={project._id} data={project} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}