"use client"

import { SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, GitBranchIcon } from "lucide-react"
import { cn } from "cn"
import { Reveal } from "../lib/hooks"
import { display } from "../lib/fonts"
import { CastorGlyph } from "./brand"

const PresenceChip = ({
  name,
  color,
  ring,
}: {
  name: string
  color: string
  ring: string
}) => (
  <span
    className={`flex items-center gap-1.5 rounded-full bg-landing-card px-2.5 py-1 font-mono text-[11px] ${color} ring-1 ${ring} shadow-lg`}
  >
    <span className="size-1.5 animate-pulse rounded-full bg-current" />
    {name}
  </span>
)

export const Collaboration = () => {
  return (
    <section id="teams" className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,oklch(0.6_0.12_255/0.12),transparent_70%)] blur-2xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <div className="flex items-center gap-2">
              <GitBranchIcon className="size-4 text-twin" />
              <span className="font-mono text-xs tracking-[0.25em] text-twin uppercase">
                _teams
              </span>
            </div>
            <h2
              className={cn(
                "mt-4 text-3xl font-semibold tracking-tight sm:text-5xl",
                display.className
              )}
            >
              Named for a star.
              <br />
              Built for two.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
              Castor is the brightest star in Gemini — the constellation of the
              twins. So the premise was always teamwork: one window, two
              carets, shared context.
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
              Workspaces land soon: invite a teammate, work in the same
              preview, and review in the same tab where the code lives.
              Pollux is coming home.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <SignUpButton>
                <Button size="lg" className="gap-2">
                  join the workspace waitlist
                  <ArrowRightIcon className="size-4" />
                </Button>
              </SignUpButton>
              <span className="font-mono text-xs text-zinc-500">
                eta — when it feels ready
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <div className="relative rounded-2xl border border-landing-line bg-landing-card/50 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between border-b border-landing-line px-4 py-3">
              <span className="font-mono text-xs text-zinc-400">
                you + pollux · orbit.tsx
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400/80">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                shared session
              </span>
            </div>

            <div className="p-4 font-mono text-[13px] leading-7">
              <div className="flex items-start gap-3">
                <span className="w-6 text-right text-zinc-600 select-none">
                  1
                </span>
                <span className="text-violet-300">import</span>
                <span className="text-sky-300">{"{ defer }"}</span>
                <span className="text-violet-300">from</span>
                <span className="text-emerald-300">{"\"@castor/pubsub\""}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 text-right text-zinc-600 select-none">
                  2
                </span>
                <span className="text-zinc-600">
                  {"// "}your turn — caret moves together
                </span>
              </div>

              <div className="relative mt-2 flex items-start gap-3 rounded-lg bg-twin/10 px-3 py-2">
                <span className="absolute -left-2 top-1/2 -translate-y-1/2">
                  <span className="animate-caret block h-[1.2em] w-[2px] rounded-sm bg-twin" />
                </span>
                <span className="w-6 text-right text-zinc-600 select-none">
                  3
                </span>
                <span className="text-sky-300">{"<DeployButton"}</span>
                <span className="text-amber-300">checked</span>
                <span className="text-sky-300">{" />"}</span>
                <span className="text-zinc-400">{"// "}pollux ran the tests ✓</span>
                <div className="absolute -top-5 right-0">
                  <PresenceChip
                    name="pollux"
                    color="text-twin"
                    ring="ring-twin/40"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-landing-line px-4 py-3 font-mono text-[11px] text-zinc-500">
              <PresenceChip name="you" color="text-sky-300" ring="ring-sky-300/30" />
              <span className="h-4 w-px bg-landing-line" />
              <span className="truncate">
                pollux: <span className="text-emerald-400">lgtm</span> — deploy
                when green
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] tracking-wide text-zinc-600">
            <CastorGlyph className="size-3.5" />
            two stars, one workspace
          </div>
        </Reveal>
      </div>
    </section>
  )
}