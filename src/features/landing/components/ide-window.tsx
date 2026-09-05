"use client"

import { cn } from "cn"
import { CheckIcon, LoaderCircleIcon } from "lucide-react"
import { castor } from "../lib/vocab"
import {
  frac,
  inWindow,
  useProgressive,
} from "../lib/hooks"
import { CastorGlyph } from "./brand"

type Tok = { t: string; c: string }

const CODE: Tok[][] = [
  [
    { t: "import ", c: "text-violet-300" },
    { t: "{ useAgent }", c: "text-sky-300" },
    { t: " from ", c: "text-violet-300" },
    { t: '"@castor/ai"', c: "text-emerald-300" },
    { t: ";", c: "text-zinc-500" },
  ],
  [],
  [
    { t: "function ", c: "text-violet-300" },
    { t: "Board", c: "text-sky-300" },
    { t: "() {", c: "text-zinc-500" },
  ],
  [
    { t: "  const ", c: "text-violet-300" },
    { t: "sync", c: "text-sky-300" },
    { t: " = ", c: "text-zinc-400" },
    { t: 'useSync("main")', c: "text-amber-300" },
    { t: ";", c: "text-zinc-500" },
  ],
  [],
  [
    { t: "  return ", c: "text-violet-300" },
    { t: "(", c: "text-zinc-500" },
  ],
  [
    { t: "    <main ", c: "text-sky-300" },
    { t: 'className=', c: "text-zinc-400" },
    { t: '"hero"', c: "text-emerald-300" },
    { t: ">", c: "text-zinc-500" },
  ],
  [
    { t: "      <h1>", c: "text-sky-300" },
    { t: "Two of you.", c: "text-zinc-100" },
    { t: "</h1>", c: "text-sky-300" },
  ],
  [
    { t: "      ", c: "text-zinc-500" },
    { t: "{/* ai: confirm before ship */}", c: "text-emerald-300/50 italic" },
  ],
  [
    { t: "    </main>", c: "text-sky-300" },
  ],
  [
    { t: "  )", c: "text-zinc-500" },
  ],
  [
    { t: "}", c: "text-zinc-500" },
  ],
]

const AGENT_EDIT: Tok[] = [
  { t: "      ", c: "text-zinc-500" },
  { t: "<ConfirmationDialog ", c: "text-sky-300" },
  { t: 'tone="soft"', c: "text-amber-300" },
  { t: " ", c: "text-zinc-500" },
  { t: "/>", c: "text-zinc-500" },
]

const LINE_AT = CODE.map((_, i) => 0.045 + i * 0.042)

const EditorLine = ({
  toks,
  visible,
  agent,
  showCaret,
  caretClass,
}: {
  toks: Tok[]
  visible: boolean
  agent?: boolean
  showCaret?: boolean
  caretClass?: string
}) => {
  return (
    <div className="relative transition-opacity duration-300">
      <span
        className={cn("transition-all duration-300", visible ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0")}
      >
        {toks.map((tok, i) => (
          <span key={i} className={tok.c}>
            {tok.t}
          </span>
        ))}
      </span>
      {showCaret && visible && (
        <span
          className={cn(
            "animate-caret -mb-[0.18em] ml-px inline-block h-[1.05em] w-[2px] align-baseline",
            caretClass
          )}
        />
      )}
      {agent && (
        <span
          className={cn(
            "animate-caret -mb-[0.18em] ml-1 inline-block h-[1.05em] w-[2px] translate-y-[3px]",
            "bg-twin"
          )}
        />
      )}
    </div>
  )
}

const Prompt = () => (
  <span className="font-bold text-cyan-300">$ </span>
)

const t = (s: string, n: number) => s.slice(0, n)

const proximity = (a: number, b: number) => Math.abs(a - b)

export const IdeWindow = () => {
  const p = useProgressive(10000)

  const cmd1 = "npm run dev"
  const cmd2 = 'castor ask "soften the border"'
  const typing1 = t(cmd1, Math.floor(cmd1.length * frac(p, 0.58, 0.66)))
  const typing2 = t(cmd2, Math.floor(cmd2.length * frac(p, 0.76, 0.88)))
  const agentActive = inWindow(p, 0.7, 0.86)

  const lastVisible = (() => {
    let idx = -1
    CODE.forEach((_, i) => {
      if (p >= LINE_AT[i]) idx = i
    })
    return idx
  })()

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-5 -z-10 rounded-[28px] bg-[radial-gradient(60%_60%_at_50%_30%,oklch(0.55_0.16_262/0.18),transparent_70%)] blur-2xl"
      />

      <div className="animate-float overflow-hidden rounded-2xl border border-landing-line bg-[oklch(0.155_0.014_264)]/95 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]">
        <div className="border-border/60 flex h-11 items-center gap-3 border-b px-4">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-zinc-600/70" />
            <span className="size-3 rounded-full bg-zinc-600/70" />
            <span className="size-3 rounded-full bg-zinc-600/70" />
          </div>
          <div className="font-mono text-[11px] tracking-wide text-zinc-400">
            castor — space-station/orbit.tsx
          </div>
          <div className="ml-auto hidden items-center gap-1.5 rounded-md border border-landing-line bg-landing-card/70 px-2 py-1 font-mono text-[10px] text-zinc-300 sm:flex">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            opus
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col border-landing-line lg:border-r">
            <div className="flex items-center gap-1 border-b border-landing-line px-3 pt-2">
              <span className="rounded-t-md border-x border-t border-landing-line bg-landing-card/50 px-3 py-1.5 font-mono text-[11px] text-zinc-200">
                orbit.tsx
              </span>
              <span className="px-3 py-1.5 font-mono text-[11px] text-zinc-500">
                preview.tsx
              </span>
              <span className="px-2 font-mono text-[13px] text-zinc-500">
                +
              </span>
              <span className="ml-auto hidden items-center gap-1.5 pr-1 font-mono text-[10px] text-emerald-400/80 sm:flex">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                live
              </span>
            </div>

            <div className="bg-[linear-gradient(180deg,oklch(0.17_0.014_264),oklch(0.145_0.012_264))] px-2 py-3 pr-4 font-mono text-[13px] leading-6">
              {CODE.map((line, i) => {
                const visible = p >= LINE_AT[i]
                const isAgentLine = i === 8
                const editing = agentActive && isAgentLine
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex gap-3 py-[1px]",
                      editing && "rounded bg-twin/10",
                    )}
                  >
                    <div className="w-8 shrink-0 text-right text-[11px] leading-6 text-zinc-600 select-none">
                      {i + 1}
                    </div>
                    <div className="relative flex-1 whitespace-nowrap">
                      <EditorLine
                        toks={editing ? AGENT_EDIT : line}
                        visible={visible}
                        showCaret={
                          visible && i === lastVisible && !agentActive
                        }
                        caretClass={
                          proximity(p, LINE_AT[i]) < 0.03
                            ? "bg-sky-300"
                            : "bg-zinc-300"
                        }
                      />
                      {editing && (
                        <span
                          className="absolute left-[-6px] top-1/2 -translate-y-1/2 font-mono text-[11px] font-bold text-emerald-400"
                          aria-hidden
                        >
                          +
                        </span>
                      )}
                    </div>
                    {editing && (
                      <div className="animate-float -translate-y-1">
                        <div className="flex items-center gap-1 rounded-md bg-twin/15 px-1.5 py-0.5 ring-1 ring-twin/40">
                          <CastorGlyph className="size-3.5" />
                          <span className="font-mono text-[10px] font-medium text-twin">
                            opus
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-between border-t border-landing-line px-3 py-1.5 font-mono text-[10px] text-zinc-500">
              <span>✓ formatting · ✓ lint</span>
              <span>Ln 12 · Col 1</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex min-h-[150px] flex-1 flex-col">
              <div className="flex h-9 items-center gap-2 border-b border-landing-line px-3">
                <span
                  className={cn(
                    "rounded-md bg-landing-card/80 px-2.5 py-1 font-mono text-[10px] text-zinc-400 transition-colors",
                    inWindow(p, 0.02, 1) && "text-zinc-200",
                  )}
                >
                  preview
                </span>
                <div className="ml-auto flex items-center gap-1 rounded-md border border-landing-line px-2 py-1 font-mono text-[10px] text-zinc-500">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  localhost:5173/preview
                </div>
              </div>

              <div className="relative flex flex-1 items-center justify-center bg-[radial-gradient(80%_90%_at_50%_0%,oklch(0.42_0.12_262/0.22),oklch(0.15_0.012_264)_60%)] p-4">
                <div
                  style={{
                    opacity: inWindow(p, 0.14, 1) ? 1 : 0,
                    transition: "opacity 500ms ease, transform 500ms ease",
                    transform: inWindow(p, 0.14, 1)
                      ? "none"
                      : "translateY(10px)",
                  }}
                  className="w-full max-w-[230px] rounded-xl border border-landing-line bg-landing-card p-4 shadow-2xl"
                >
                  <div className="flex items-center gap-2">
                    <CastorGlyph className="size-5" />
                    <span className="font-mono text-[10px] text-zinc-500">
                      space-station
                    </span>
                  </div>
                  <p className="mt-3 text-[15px] font-semibold tracking-tight">
                    One codebase.
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    borders: softened ✓
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="rounded-md bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground">
                      Deploy
                    </span>
                    <span className="rounded-md border border-landing-line px-2.5 py-1 text-[10px] text-zinc-400">
                      Share
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    opacity: inWindow(p, 0.6, 1) ? 1 : 0,
                    transform: inWindow(p, 0.6, 1)
                      ? "none"
                      : "translateY(6px)",
                    transition: "opacity 400ms ease, transform 400ms ease",
                  }}
                  className="animate-float absolute right-3 bottom-3 flex items-center gap-1.5 rounded-lg border border-landing-line bg-landing-card px-2.5 py-1.5 shadow-xl"
                >
                  <CastorGlyph className="size-3.5" />
                  <span className="font-mono text-[10px] text-zinc-300">
                    opus · live
                  </span>
                  <CheckIcon className="size-3 text-emerald-400" />
                </div>
              </div>
            </div>

            <div className="border-t border-landing-line bg-[oklch(0.11_0.01_264)] font-mono text-[12px] leading-5">
              <div className="flex h-8 items-center gap-2 border-b border-landing-line/60 px-3">
                <span className="rounded-md bg-landing-card/80 px-2.5 py-1 text-[10px] text-zinc-300">
                  terminal
                </span>
                <span className="size-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="min-h-[72px] px-3 py-2 text-zinc-300">
                <div>
                  <Prompt />
                  <span className={inWindow(p, 0.58, 0.67) ? "text-zinc-100" : "text-zinc-500"}>
                    {typing1}
                  </span>
                  {inWindow(p, 0.58, 0.67) && (
                    <span className="animate-caret ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-zinc-200" />
                  )}
                </div>
                <div style={{ opacity: inWindow(p, 0.66, 1) ? 1 : 0, transition: "opacity 400ms ease" }}>
                  <span className="text-emerald-400">✓</span> dev server → :5173
                </div>
                <div style={{ opacity: inWindow(p, 0.7, 1) ? 1 : 0, transition: "opacity 400ms ease" }}>
                  <span className="text-emerald-400">✓</span> preview synced
                </div>
                <div
                  style={{
                    opacity: inWindow(p, 0.88, 1) ? 1 : 0,
                    transition: "opacity 400ms ease",
                  }}
                >
                  <span className="text-cyan-300">$ </span>
                  <span className="text-zinc-500">{typing2}</span>
                </div>
                <div
                  style={{
                    opacity: inWindow(p, 0.92, 1) ? 1 : 0,
                    transition: "opacity 400ms ease",
                  }}
                >
                  <span className="text-amber-300">⟳</span>{" "}
                  <span className="text-zinc-400">
                    agent (opus) patched preview.jsx
                  </span>
                </div>
                <div
                  style={{
                    opacity: inWindow(p, 0.95, 1) ? 1 : 0,
                    transition: "opacity 400ms ease",
                  }}
                >
                  <span className="text-emerald-400">✓</span> applied live
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-3 font-mono text-[10px] tracking-wide text-zinc-500">
        <LoaderCircleIcon className="size-3 animate-spin text-cyan-300" />
        {castor.tagline}
      </div>
    </div>
  )
}