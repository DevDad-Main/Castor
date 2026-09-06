import Link from "next/link"
import { cn } from "cn"
import { ArrowRightIcon, SparkleIcon } from "lucide-react"
import { CastorGlyph } from "@/features/landing/components/brand"
import { display } from "@/features/landing/lib/fonts"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/features/landing/lib/hooks"
import { SESSION } from "@/features/landing/lib/vocab"

const constellation = [
  { x: 90, y: 110, group: 1 },
  { x: 165, y: 58, group: 1 },
  { x: 216, y: 132, group: 1 },
  { x: 304, y: 104, group: 2 },
  { x: 356, y: 55, group: 2 },
  { x: 262, y: 178, group: 2 },
  { x: 128, y: 206, group: 1 },
  { x: 340, y: 212, group: 2 },
  { x: 396, y: 168, group: 2 },
]

export default function NotFound() {
  return (
    <div className="dark bg-landing relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="landing-noise pointer-events-none absolute inset-0 opacity-[0.04]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_100%,oklch(0.5_0.14_262/0.18),transparent_70%)]"
      />
      <div id="top" className="relative flex min-h-screen flex-col">
        <Reveal>
          <nav className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-6">
            <Link href="/" aria-label="Castor — home">
              <CastorGlyph className="size-7" />
            </Link>
          </nav>
        </Reveal>

        <main className="flex flex-1 items-center px-6 pb-24 pt-10">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <Reveal>
                  <div className="flex w-fit items-center gap-2 rounded-full border border-landing-line bg-landing-card/60 px-3 py-1.5 font-mono text-[11px] text-zinc-400">
                    <SparkleIcon className="size-3 text-twin" />
                    error 404
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <h1
                    className={cn(
                      "mt-6 text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl md:text-7xl",
                      display.className
                    )}
                  >
                    Lost in orbit.
                    <br />
                    <span className="bg-gradient-to-r from-sky-300 via-[oklch(0.7_0.16_262)] to-violet-300 bg-clip-text text-transparent">
                      That page strayed
                    </span>
                    <span className="text-twin">*</span>
                  </h1>
                </Reveal>
                <Reveal delay={140}>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400">
                    The route you&apos;re after isn&apos;t on the ship&apos;s
                    charts. Head back to the session — or jump back into orbit
                    and start a new one.
                  </p>
                </Reveal>
                <Reveal delay={200}>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Button asChild size="lg" className="gap-2 pl-3">
                      <Link href="/">
                        <span className="grid size-7 place-items-center rounded-md bg-primary-foreground/15">
                          <CastorGlyph className="size-4" />
                        </span>
                        back to orbit
                        <ArrowRightIcon className="size-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="ghost" className="font-mono text-sm text-zinc-300">
                      <Link href="/sign-in">sign in</Link>
                    </Button>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={180}>
                <div className="relative mx-auto aspect-square w-full max-w-md rounded-2xl border border-landing-line bg-landing-card/40">
                  <svg
                    viewBox="0 0 464 272"
                    className="absolute inset-0 size-full p-8"
                    aria-hidden
                  >
                    {constellation.map((s) => (
                      <g key={`${s.x}-${s.y}`} className="group">
                        <circle
                          cx={s.x}
                          cy={s.y}
                          r="2.4"
                          fill="oklch(0.7 0.16 262)"
                        />
                        <circle
                          cx={s.x}
                          cy={s.y}
                          r="7"
                          fill="oklch(0.7 0.16 262)"
                          opacity="0.08"
                        />
                      </g>
                    ))}
                    <line
                      x1="90"
                      y1="110"
                      x2="165"
                      y2="58"
                      stroke="oklch(0.7 0.16 262 / 0.5)"
                      strokeWidth="1"
                    />
                    <line
                      x1="165"
                      y1="58"
                      x2="216"
                      y2="132"
                      stroke="oklch(0.7 0.16 262 / 0.5)"
                      strokeWidth="1"
                    />
                    <line
                      x1="216"
                      y1="132"
                      x2="128"
                      y2="206"
                      stroke="oklch(0.7 0.16 262 / 0.5)"
                      strokeWidth="1"
                    />
                    <line
                      x1="304"
                      y1="104"
                      x2="356"
                      y2="55"
                      stroke="oklch(0.7 0.16 262 / 0.35)"
                      strokeWidth="1"
                    />
                    <line
                      x1="356"
                      y1="55"
                      x2="396"
                      y2="168"
                      stroke="oklch(0.7 0.16 262 / 0.35)"
                      strokeWidth="1"
                    />
                    <line
                      x1="304"
                      y1="104"
                      x2="262"
                      y2="178"
                      stroke="oklch(0.7 0.16 262 / 0.35)"
                      strokeWidth="1"
                    />
                    <line
                      x1="262"
                      y1="178"
                      x2="340"
                      y2="212"
                      stroke="oklch(0.7 0.16 262 / 0.35)"
                      strokeWidth="1"
                    />
                    <text
                      x="90"
                      y="94"
                      fill="oklch(0.6 0.16 262)"
                      className="font-mono text-[9px]"
                    >
                      you
                    </text>
                    <text
                      x="202"
                      y="152"
                      fill="oklch(0.6 0.16 262)"
                      className="font-mono text-[9px]"
                    >
                      pollux
                    </text>
                    <text
                      x="312"
                      y="128"
                      fill="oklch(0.6 0.16 262)"
                      className="font-mono text-[9px]"
                    >
                      henge
                    </text>
                  </svg>
                  <div className="absolute bottom-5 left-5 flex items-center gap-2 font-mono text-[10px] text-zinc-500">
                    <span className="size-1.5 rounded-full bg-twin" />
                    line of sight — {SESSION.crew.length} in session
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}