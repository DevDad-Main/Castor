"use client"

import { useState, type ReactNode } from "react"
import { cn } from "cn"
import {
  CommandIcon,
  MousePointer2Icon,
  PhoneIcon,
  SparkleIcon,
} from "lucide-react"
import { Kbd } from "@/components/ui/kbd"
import { Reveal, Spotlight } from "../lib/hooks"
import { display } from "../lib/fonts"
import { CastorGlyph } from "./brand"
import { MODELS } from "../lib/vocab"

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

export const Workflow = () => {
  const steps = [
    {
      n: "01",
      label: "chat",
      line: "Tell the agent what you want — it reads the codebase first.",
    },
    {
      n: "02",
      label: "code",
      line: "It edits in your branch. You keep the wheel.",
    },
    {
      n: "03",
      label: "preview",
      line: "Watch it render live, then ship when it's green.",
    },
  ]

  return (
    <section id="workflow" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          eyebrow="_workflow"
          title={
            <>
              Plan, code, run.
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
                    {step.label}_()
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

const AgentChatCard = () => {
  const [model, setModel] = useState<(typeof MODELS)[number]["id"]>("opus")
  const active = MODELS.find((m) => m.id === model)!

  return (
    <Spotlight className="rounded-2xl border border-landing-line bg-landing-card/40 p-6 md:col-span-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-ring/20 text-ring">
            <SparkleIcon className="size-4" />
          </span>
          <span className="font-mono text-xs tracking-widest text-zinc-300 uppercase">
            agent chat
          </span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-landing-line px-2.5 py-1 font-mono text-[10px] text-zinc-400">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
          streaming
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <div className="max-w-[70%] self-end rounded-2xl rounded-br-sm bg-primary/10 px-4 py-2.5 text-sm text-zinc-200">
          add a confirm dialog before we ship
        </div>

        <div className="max-w-[85%] self-start">
          <div className="flex items-center gap-2 px-1 pb-1.5">
            <CastorGlyph className="size-4" />
            <span className="font-mono text-[11px] text-zinc-500">
              agent · <span className="text-twin">{model}</span>
            </span>
          </div>
          <div className="rounded-2xl rounded-bl-sm border border-landing-line bg-landing-card/80 px-4 py-3 text-sm text-zinc-300">
            On it. Dropping a confirmation into{" "}
            <span className="font-mono text-sky-300">orbit.tsx</span> — and I
            softened the border while I was there.
            <div className="mt-3 rounded-lg bg-[oklch(0.14_0.012_264)] px-3 py-2 font-mono text-xs">
              <span className="text-emerald-400">+</span>{" "}
              <span className="text-sky-300">&lt;ConfirmationDialog</span>{" "}
              <span className="text-amber-300">{"tone=\"soft\""}</span>{" "}
              <span className="text-sky-300">/&gt;</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {MODELS.map((m) => (
          <button
            key={m.id}
            onClick={() => setModel(m.id)}
            className={cn(
              "font-mono rounded-lg border px-3 py-1.5 text-xs transition-all",
              model === m.id
                ? "border-ring/60 bg-ring/15 text-zinc-100 shadow-[0_0_16px_-6px_var(--ring)]"
                : "border-landing-line bg-landing-card/50 text-zinc-500 hover:border-ring/30 hover:text-zinc-300"
            )}
          >
            {m.label}
          </button>
        ))}
        <span className="font-mono text-[11px] text-zinc-600">
          + more models docked later
        </span>
      </div>
      <p className="mt-3 text-xs text-zinc-500 italic">{active.copy}</p>
      <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-zinc-600">
        <span>model://anthropic/{model}</span>
        <span className="h-px flex-1 bg-landing-line" />
        <span>0 tickets opened</span>
      </div>
    </Spotlight>
  )
}

const PreviewCard = () => {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop")

  return (
    <Spotlight className="rounded-2xl border border-landing-line bg-landing-card/40 p-6 md:col-span-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-widest text-zinc-300 uppercase">
          preview
        </span>
        <div className="flex items-center gap-1 rounded-lg border border-landing-line p-0.5">
          <button
            onClick={() => setDevice("desktop")}
            aria-label="Desktop preview"
            className={cn(
              "rounded-md px-2 py-1 transition-colors",
              device === "desktop"
                ? "bg-ring/20 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <MousePointer2Icon className="size-3.5" />
          </button>
          <button
            onClick={() => setDevice("mobile")}
            aria-label="Mobile preview"
            className={cn(
              "rounded-md px-2 py-1 transition-colors",
              device === "mobile"
                ? "bg-ring/20 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <PhoneIcon className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex h-52 items-center justify-center rounded-xl bg-[radial-gradient(80%_90%_at_50%_0%,oklch(0.42_0.12_262/0.2),oklch(0.15_0.012_264)_60%)] p-4">
        <div
          style={{
            width: device === "desktop" ? "100%" : "150px",
            transition: "width 400ms cubic-bezier(0.22,1,0.36,1)",
          }}
          className="mx-auto"
        >
          <div className="h-full rounded-lg border border-landing-line bg-landing-card p-4 shadow-xl">
            <div className="flex items-center gap-2">
              <CastorGlyph className="size-4" />
              <span className="font-mono text-[9px] text-zinc-500">
                space-station
              </span>
            </div>
            <p className="mt-2.5 text-sm font-semibold tracking-tight">
              One codebase.
            </p>
            <p className="mt-0.5 text-[10px] text-zinc-500">
  previews that don&apos;t lie
</p>
            <div
              className={cn(
                "mt-3 flex gap-1.5",
                device === "mobile" && "flex-col"
              )}
            >
              <span className="rounded bg-primary px-2 py-1 text-center text-[9px] font-semibold text-primary-foreground">
                Deploy
              </span>
              <span className="rounded border border-landing-line px-2 py-1 text-center text-[9px] text-zinc-400">
                Share
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-emerald-400/80">
        <span className="size-1.5 rounded-full bg-emerald-400" />
        synced to live preview
      </div>
    </Spotlight>
  )
}

const CmdPaletteCard = () => {
  const [open, setOpen] = useState(false)
  const [running, setRunning] = useState<string | null>(null)
  const commands = [
    { k: "ask the agent", keys: ["⌘", "K"], soon: false },
    { k: "open live preview", keys: ["⌥", "⌘", "P"], soon: false },
    { k: "invite a teammate", keys: ["·", "soon"], soon: true },
    { k: "deploy to prod", keys: ["⌥", "⌘", "S"], soon: false },
  ]

  return (
    <Spotlight className="rounded-2xl border border-landing-line bg-landing-card/40 p-6 md:col-span-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-widest text-zinc-300 uppercase">
          command bar
        </span>
        <CommandIcon className="size-4 text-zinc-500" />
      </div>

      <button
        onClick={() => setOpen(true)}
        className="mt-6 flex w-full items-center justify-between rounded-xl border border-landing-line bg-landing-card/70 px-3 py-2.5 text-left text-xs text-zinc-500 transition-colors hover:border-ring/40 hover:text-zinc-300"
      >
        ask castor to do anything…
        <Kbd className="border bg-landing-card/80">⌘K</Kbd>
      </button>

      {open && (
        <div className="mt-4 flex flex-col gap-1.5">
          {commands.map((cmd) => (
            <button
              key={cmd.k}
              disabled={cmd.soon}
              onClick={() => {
                setRunning(cmd.k)
                setTimeout(() => {
                  setRunning(null)
                  setOpen(false)
                }, 1200)
              }}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors",
                cmd.soon
                  ? "cursor-not-allowed text-zinc-700"
                  : "text-zinc-300 hover:bg-ring/15"
              )}
            >
              <span className="flex items-center gap-2">
                {running === cmd.k && (
                  <span className="size-1.5 animate-pulse rounded-full bg-twin" />
                )}
                {cmd.k}
              </span>
              <KbdGroup keys={cmd.keys} />
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-landing-line pt-3">
        {running ? (
          <span className="font-mono text-[11px] text-twin">
            ▸ running: {running}
          </span>
        ) : (
          <span className="font-mono text-[11px] text-zinc-600">
            power-ups docked {open ? "· tap a command" : "· hit ⌘K"}
          </span>
        )}
      </div>
    </Spotlight>
  )
}

const KbdGroup = ({ keys }: { keys: string[] }) => (
  <span className="flex items-center gap-0.5">
    {keys.map((k, i) => (
      <kbd
        key={i}
        className="rounded border border-landing-line bg-landing-card/80 px-1.5 py-0.5 font-mono text-[9px] text-zinc-500"
      >
        {k}
      </kbd>
    ))}
  </span>
)

const WorkspacesCard = () => {
  return (
    <Spotlight className="rounded-2xl border border-landing-line bg-landing-card/40 p-6 md:col-span-4">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs tracking-widest text-zinc-300 uppercase">
              workspaces
            </span>
            <span className="flex items-center gap-1 rounded-full border border-dashed border-twin/50 px-2 py-0.5 font-mono text-[10px] text-twin">
              <span className="size-1.5 animate-pulse rounded-full bg-twin" />
              arriving soon
            </span>
          </div>
          <h3
            className={cn(
              "mt-4 text-2xl font-semibold tracking-tight",
              display.className
            )}
          >
            Called Castor for a reason — the twin stars.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Invite a developer, share one live preview, and let the review
            happen in the same window where the code lives. A second pair of
            eyes, docked like the second star.
          </p>
          <div className="mt-5 flex items-center gap-2 font-mono text-[11px] text-zinc-500">
            <span>castor workspace attach @teammate</span>
            <span className="text-zinc-700">▸ 404 — soon</span>
          </div>
        </div>

        <div className="relative rounded-xl border border-landing-line bg-[oklch(0.14_0.012_264)] p-4 font-mono text-[12px] leading-6">
          <div className="mb-2 flex items-center justify-between text-[10px] text-zinc-600">
            <span>shared session · 2 carets</span>
            <span className="flex items-center gap-1 text-emerald-400/80">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              live
            </span>
          </div>
          <div>
            <span className="text-zinc-600">1</span>{" "}
            <span className="text-sky-300">{"<h1>"}</span>
            <span className="text-zinc-200"> Ship it, together.</span>
            <span className="text-sky-300">{"</h1>"}</span>
            <span className="ml-1 inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-caret bg-sky-300" />
          </div>
          <div className="mt-1">
            <span className="text-zinc-600">2</span>{" "}
            <span className="text-zinc-500">{"/* "}</span>
            <span className="text-zinc-600">lgtm from pollux</span>
            <span className="text-zinc-500">{" */"}</span>
            <span className="ml-1 inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-caret rounded-sm bg-twin" />
          </div>
          <div className="mt-1">
            <span className="text-zinc-600">3</span>{" "}
            <span className="text-zinc-300">
              <span className="text-violet-300">await</span> deploy(
            </span>
            <span className="text-emerald-300">{"\"prod\""}</span>
            <span className="text-zinc-300">)</span>
          </div>

          <div className="absolute right-3 bottom-2 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-md bg-sky-300/15 px-1.5 py-0.5 text-[10px] text-sky-300 ring-1 ring-sky-300/30">
              you
            </span>
            <span className="flex items-center gap-1 rounded-md bg-twin/15 px-1.5 py-0.5 text-[10px] text-twin ring-1 ring-twin/40">
              <CastorGlyph className="size-3" />
              pollux
            </span>
          </div>
        </div>
      </div>
    </Spotlight>
  )
}

export const Features = () => {
  return (
    <section id="product" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          eyebrow="_product"
          title={
            <>
              The IDE that
              <br />
              <span className="text-zinc-500">belongs in a browser.</span>
            </>
          }
          sub="Everything is dockable — chat, terminal, preview, teammates. Nothing is static."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <AgentChatCard />
          </Reveal>
          <Reveal className="md:col-span-2" delay={80}>
            <PreviewCard />
          </Reveal>
          <Reveal className="md:col-span-2" delay={40}>
            <CmdPaletteCard />
          </Reveal>
          <Reveal className="md:col-span-4" delay={120}>
            <WorkspacesCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}