"use client"

import type { ReactNode } from "react"
import { cn } from "cn"
import {
  CheckIcon,
  GitMergeIcon,
  GlobeIcon,
  LayersIcon,
  MousePointer2Icon,
} from "lucide-react"
import { Reveal, Spotlight } from "../lib/hooks"
import { display } from "../lib/fonts"
import { SESSION } from "../lib/vocab"

const SectionHead = ({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string
  title: ReactNode
  sub?: string
}) => (
  <Reveal>
    <div className="max-w-2xl">
      <div className="font-mono text-xs tracking-[0.25em] text-ring uppercase">
        {eyebrow}
      </div>
      <h2
        className={cn(
          "mt-3 text-3xl font-semibold tracking-tight sm:text-4xl",
          display.className
        )}
      >
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
          {sub}
        </p>
      )}
    </div>
  </Reveal>
)

const IconChip = ({ children }: { children: ReactNode }) => (
  <span className="grid size-8 place-items-center rounded-lg border border-landing-line bg-landing-card/70 text-twin">
    {children}
  </span>
)

const Chip = ({ label }: { label: string }) => (
  <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
    {label}
  </span>
)

export const Workflow = () => {
  const steps = [
    {
      n: "01",
      label: "open",
      line: "Spin a workspace from any repo in one click. No local setup, no flashing terminal.",
    },
    {
      n: "02",
      label: "invite",
      line: "Send the link. Teammates drop straight into the live editor — carets, cursors and all.",
    },
    {
      n: "03",
      label: "run",
      line: "Preview, terminal and comments sync for everyone, so decisions happen where the code lives.",
    },
  ]

  return (
    <section id="workflow" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          eyebrow="_workflow"
          title={
            <>
              Open, invite, run.
              <br />
              <span className="text-zinc-500">One continuous loop.</span>
            </>
          }
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 90}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-landing-line bg-landing-card/40 p-6 transition-colors hover:border-ring/40">
                <div
                  aria-hidden
                  className="absolute -top-10 -right-10 size-28 rounded-full bg-ring/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0"
                />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-zinc-600">
                    {step.n}
                  </span>
                  <span className="font-mono text-xs tracking-widest text-twin">
                    {step.label}_
                  </span>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-zinc-400">
                  {step.line}
                </p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-ring/60 to-transparent" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const PresenceCard = () => (
  <div className="flex h-full flex-col rounded-2xl border border-landing-line bg-landing-card/40 p-6">
    <div className="flex items-center justify-between">
      <IconChip>
        <MousePointer2Icon className="size-4" />
      </IconChip>
      <Chip label="presence" />
    </div>

    <h3 className="mt-5 text-xl font-semibold tracking-tight">
      Presence, native.
    </h3>
    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
      Every session shows the crew — cursors, carets and who&apos;s on which
      file, live from the first keystroke.
    </p>

    <div className="mt-auto pt-6">
      <div className="flex -space-x-2">
        {SESSION.crew.map((m) => (
          <span
            key={m.name}
            title={m.name}
            className={cn(
              "grid size-6 place-items-center rounded-full text-[9px] font-medium text-landing ring-2 ring-landing",
              m.color
            )}
          >
            {m.initial}
          </span>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-landing-line bg-[oklch(0.14_0.012_264)] px-2.5 py-2 font-mono text-[11px] text-zinc-400">
        <span className="text-zinc-600">7</span>{" "}
        <span className="text-sky-300">{"<h1>"}</span>
        <span className="text-zinc-200"> Two of you.</span>
        <span className="text-sky-300">{"</h1>"}</span>
        <span className="ml-1 inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-caret bg-sky-300" />
        <span className="ml-2 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-twin align-baseline" />
      </div>
      <p className="mt-2.5 font-mono text-[10px] text-zinc-500">
        pollux is on line 7 with you
      </p>
    </div>
  </div>
)

const PreviewCard = () => (
  <div className="flex h-full flex-col rounded-2xl border border-landing-line bg-landing-card/40 p-6">
    <div className="flex items-center justify-between">
      <IconChip>
        <GlobeIcon className="size-4" />
      </IconChip>
      <Chip label="preview" />
    </div>

    <h3 className="mt-5 text-xl font-semibold tracking-tight">
      One preview for all.
    </h3>
    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
      The in-browser render syncs to every teammate at once. What you see is
      the server.
    </p>

    <div className="mt-auto pt-6">
      <div className="rounded-lg border border-landing-line bg-[oklch(0.14_0.012_264)] p-3">
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-500">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          shared /preview
        </div>
        <p className="mt-2.5 text-sm font-semibold tracking-tight">
          One codebase.
        </p>
        <p className="mt-0.5 text-[10px] text-zinc-500">
          live for the whole crew
        </p>
        <div className="mt-3 flex gap-1.5">
          <span className="rounded bg-primary px-2 py-1 text-[9px] font-semibold text-primary-foreground">
            Deploy
          </span>
          <span className="rounded border border-landing-line px-2 py-1 text-[9px] text-zinc-400">
            Share
          </span>
        </div>
      </div>
      <p className="mt-2.5 font-mono text-[10px] text-emerald-400/80">
        <span className="size-1.5 inline-block rounded-full bg-emerald-400" />{" "}
        synced for every teammate
      </p>
    </div>
  </div>
)

const SyncCard = () => (
  <div className="flex h-full flex-col rounded-2xl border border-landing-line bg-landing-card/40 p-6">
    <div className="flex items-center justify-between">
      <IconChip>
        <GitMergeIcon className="size-4" />
      </IconChip>
      <Chip label="sync" />
    </div>

    <h3 className="mt-5 text-xl font-semibold tracking-tight">Zero drift.</h3>
    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
      Edits stream as you type and merge conflict-free — nothing out of date,
      nothing overwritten.
    </p>

    <div className="mt-auto pt-6 font-mono text-[11px]">
      <div className="flex items-center gap-2 rounded-lg border border-landing-line bg-[oklch(0.14_0.012_264)] px-2.5 py-1.5 text-zinc-400">
        <span className="size-1.5 rounded-full bg-sky-400" />
        <span className="text-zinc-300">you</span> · row 6
      </div>
      <div className="-mt-1.5 ml-6 flex items-center gap-2 rounded-lg border border-landing-line bg-[oklch(0.14_0.012_264)] px-2.5 py-1.5 text-zinc-400">
        <span className="size-1.5 rounded-full bg-twin" />
        <span className="text-zinc-300">pollux</span> · same row
      </div>
      <p className="mt-2.5 flex items-center gap-1.5 text-[10px] text-emerald-400/80">
        <CheckIcon className="size-3" /> merged — no conflict
      </p>
    </div>
  </div>
)

const LayerPane = ({
  name,
  layer,
  dot,
  caret,
  className,
}: {
  name: string
  layer: string
  dot: string
  caret: string
  className?: string
}) => (
  <div
    className={cn(
      "rounded-xl border border-landing-line bg-[oklch(0.155_0.014_264)]/95 p-3.5 font-mono text-[11px] leading-5 shadow-2xl backdrop-blur",
      className
    )}
  >
    <div className="flex items-center gap-1.5">
      <span className={cn("size-1.5 rounded-full", dot)} />
      <span className="text-zinc-300">{name}</span>
      <span className="ml-auto text-[9px] tracking-widest text-zinc-600">
        {layer}
      </span>
    </div>
    <div className="mt-2.5 truncate text-zinc-500">
      <span className="text-zinc-600">12</span>{" "}
      <span className="text-sky-300">{"<h1>"}</span>
      <span className="text-zinc-200"> Ship it, together.</span>
      <span className="text-sky-300">{"</h1>"}</span>
      <span className={cn("ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px]", caret)} />
    </div>
    <div className="truncate text-zinc-600">
      13 <span className="text-zinc-500">{"/* "}moves when they move{" */"}</span>
    </div>
  </div>
)

const MultiLayerCard = () => (
  <Spotlight className="rounded-2xl border border-landing-line bg-landing-card/40 p-6 md:p-8 md:col-span-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center justify-between gap-2">
        <IconChip>
          <LayersIcon className="size-4" />
        </IconChip>
        <Chip label="multilayer" />
      </div>
      <span className="rounded-full border border-dashed border-twin/50 px-2.5 py-1 font-mono text-[10px] text-twin">
        powered by liveblocks
      </span>
    </div>

    <h3 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
      Multilayer sessions.
    </h3>
    <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
      Same file, everyone in their own live viewport. Scroll free, snap to a
      caret, or follow a teammate&apos;s view — every layer stays one truth.
    </p>

    <div className="mt-8 grid gap-4 md:grid-cols-3">
      <LayerPane
        name="you"
        layer="layer 01"
        dot="bg-sky-400"
        caret="animate-caret bg-sky-300"
      />
      <LayerPane
        name="pollux"
        layer="layer 02"
        dot="bg-twin"
        caret="animate-caret bg-twin"
        className="md:-rotate-1 md:translate-y-1"
      />
      <LayerPane
        name="henge"
        layer="layer 03"
        dot="bg-violet-400"
        caret="animate-caret bg-violet-300"
        className="md:rotate-1 md:translate-y-2"
      />
    </div>

    <div className="mt-5 flex items-center gap-2 font-mono text-[10px] text-zinc-500">
      <span className="text-twin">✦</span>
      three layers, one file — scroll free, land together
    </div>
  </Spotlight>
)

export const Features = () => {
  return (
    <section id="product" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          eyebrow="_product"
          title={
            <>
              Multiplayer,
              <br />
              <span className="text-zinc-500">by default.</span>
            </>
          }
          sub="Every Castor session is live from the first keystroke — cursors, previews and comments flow to the whole workspace. No mode, no switch."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-2">
            <PresenceCard />
          </Reveal>
          <Reveal className="md:col-span-2" delay={70}>
            <PreviewCard />
          </Reveal>
          <Reveal className="md:col-span-2" delay={140}>
            <SyncCard />
          </Reveal>
          <Reveal className="md:col-span-6" delay={90}>
            <MultiLayerCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}