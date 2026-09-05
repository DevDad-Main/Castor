"use client"

import { Poppins } from "next/font/google"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { ProjectsList } from "./projects-list"
import { useCreateProject, useProjects } from "./hooks/use-projects"
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator"
import { format } from "date-fns"
import { ArrowUpRightIcon, BoxesIcon, PlusIcon } from "lucide-react"
import { FaGithub } from "react-icons/fa"

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

export const ProjectsView = () => {
  const createProject = useCreateProject()
  const projects = useProjects()

  const projectCount = projects?.length ?? 0

  const handleCreateProject = () => {
    const projectName = uniqueNamesGenerator({
      dictionaries: [adjectives, animals, colors],
      separator: "-",
      length: 3,
      style: "lowerCase",
      seed: "castor",
    })

    createProject({
      name: projectName,
    })
  }

  return (
    <div className="bg-sidebar relative flex min-h-screen flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.6562_0.1826_262.74/0.14),transparent_70%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pt-10 pb-16 md:px-10 md:pt-14">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-ring text-background shadow-ring/25 grid size-10 place-items-center rounded-xl shadow-lg">
              <BoxesIcon className="size-5" strokeWidth="2.2" />
            </span>
            <span
              className={cn(
                "text-xl font-semibold tracking-tight",
                font.className
              )}
            >
              Castor
            </span>
          </div>
        </header>

        <main className="flex flex-1 flex-col">
          <section className="mt-12 md:mt-16">
            <span className="flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="relative flex size-1.5">
                <span className="bg-emerald-400 absolute inline-flex size-full animate-ping rounded-full opacity-60" />
                <span className="bg-emerald-400 relative inline-flex size-1.5 rounded-full" />
              </span>
              {format(new Date(), "EEEE, MMMM d")}
            </span>

            <h1
              className={cn(
                "mt-5 text-4xl font-semibold tracking-tight md:text-5xl",
                font.className
              )}
            >
              {getGreeting()}
            </h1>

            <p className="text-muted-foreground mt-3 text-sm md:text-base">
              {projectCount === 0
                ? "Your AI-powered cloud IDE — create your first project and start building."
                : `Your AI-powered cloud IDE — you have ${projectCount} ${
                    projectCount === 1 ? "project" : "projects"
                  }. Pick up where you left off.`}
            </p>
          </section>

          <section className="mt-8 grid gap-3 sm:grid-cols-2">
            <Button
              variant="default"
              onClick={handleCreateProject}
              className="group relative flex h-auto flex-col items-stretch gap-5 rounded-2xl p-5 text-left shadow-lg shadow-black/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
            >
              <div className="flex w-full items-center justify-between">
                <span className="bg-primary-foreground/10 text-primary-foreground grid size-10 place-items-center rounded-xl">
                  <PlusIcon className="size-5" />
                </span>
                <Kbd className="bg-primary-foreground/10 text-primary-foreground/80 border-none">
                  ⌘ J
                </Kbd>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold">New project</span>
                <span className="text-primary-foreground/70 text-sm">
                  Spin up a fresh cloud workspace
                </span>
              </div>

              <ArrowUpRightIcon className="text-primary-foreground/70 absolute right-4 bottom-4 size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Button>

            <Button
              variant="outline"
              onClick={() => {}}
              className="group border-border/80 relative flex h-auto flex-col items-stretch gap-5 rounded-2xl p-5 text-left transition-all hover:-translate-y-0.5 hover:bg-background"
            >
              <div className="flex w-full items-center justify-between">
                <span className="bg-accent text-accent-foreground grid size-10 place-items-center rounded-xl">
                  <FaGithub className="size-5" />
                </span>
                <Kbd className="border bg-background/60">⌘ I</Kbd>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold">
                  Import project
                </span>
                <span className="text-muted-foreground text-sm">
                  Bring a repository in from GitHub
                </span>
              </div>

              <ArrowUpRightIcon className="text-muted-foreground absolute right-4 bottom-4 size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Button>
          </section>

          <section className="mt-10">
            <ProjectsList onViewAll={() => {}} />
          </section>
        </main>
      </div>
    </div>
  )
}