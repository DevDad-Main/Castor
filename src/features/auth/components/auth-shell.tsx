"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "cn"
import { CastorGlyph, CastorLogo } from "@/features/landing/components/brand"
import { display } from "@/features/landing/lib/fonts"
import { SESSION } from "@/features/landing/lib/vocab"

const STARS = [
  { top: "8%", left: "10%", size: "2px", delay: "0s" },
  { top: "14%", left: "70%", size: "1px", delay: "0.8s" },
  { top: "6%", left: "46%", size: "2px", delay: "1.5s" },
  { top: "22%", left: "88%", size: "1px", delay: "2.1s" },
  { top: "34%", left: "12%", size: "2px", delay: "0.4s" },
  { top: "28%", left: "55%", size: "1px", delay: "1.1s" },
  { top: "47%", left: "80%", size: "2px", delay: "2.7s" },
  { top: "55%", left: "32%", size: "1px", delay: "0.2s" },
  { top: "64%", left: "92%", size: "2px", delay: "1.9s" },
  { top: "71%", left: "18%", size: "1px", delay: "0.6s" },
  { top: "82%", left: "62%", size: "2px", delay: "2.4s" },
  { top: "91%", left: "8%", size: "2px", delay: "1.3s" },
]

const SHOOTING_STARS = [
  { top: "16%", left: "70%", width: 150, duration: "11s", delay: "2.4s" },
  { top: "34%", left: "86%", width: 120, duration: "15s", delay: "8.2s" },
  { top: "62%", left: "80%", width: 170, duration: "18s", delay: "12s" },
]

const copy = {
  "sign-in": {
    eyebrow: "_sign_in",
    title: "Welcome back.",
    sub: "Pick up the twin where you left off.",
  },
  "sign-up": {
    eyebrow: "_sign_up",
    title: "Join the crew.",
    sub: "One tab for the whole team — cursors, previews and AI on call.",
  },
} as const

export const AuthPlaceholder = () => (
  <div className="flex flex-col items-center gap-4 rounded-xl border border-landing-line bg-landing-card/40 py-12">
    <CastorGlyph className="size-8 animate-twinkle" />
    <span className="font-mono text-[11px] text-zinc-500">
      opening the session…
    </span>
  </div>
)

export const AuthShell = ({
  variant,
  children,
}: {
  variant: keyof typeof copy
  children: ReactNode
}) => {
  const t = copy[variant]

  return (
    <div className="dark bg-landing text-foreground relative flex min-h-screen select-text antialiased">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.7 0.14 262 / 0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(80% 60% at 50% 0%, black, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(80% 60% at 50% 0%, black, transparent 80%)",
        }}
      />
      {STARS.map((s, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            width: s.size,
            height: s.size,
          }}
          className="animate-twinkle absolute rounded-full bg-zinc-300/80"
        />
      ))}
      {SHOOTING_STARS.map((s, i) => (
        <span
          key={`shoot-${i}`}
          aria-hidden
          style={{
            top: s.top,
            left: s.left,
            width: s.width,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
          className="animate-shooting-star absolute h-px rounded-full bg-gradient-to-r from-transparent via-white/50 to-white blur-[0.5px]"
        />
      ))}
      <div
        aria-hidden
        className="animate-aurora pointer-events-none absolute -top-32 -left-40 size-[560px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.16_262/0.16),transparent_65%)] blur-3xl"
      />
      <div
        aria-hidden
        className="animate-aurora pointer-events-none absolute -right-40 bottom-0 size-[560px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.13_310/0.12),transparent_65%)] blur-3xl"
        style={{ animationDelay: "-8s" }}
      />
      <div
        aria-hidden
        className="landing-noise pointer-events-none absolute inset-0 opacity-[0.03]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 lg:grid-cols-2">
        <div className="hidden flex-col justify-between px-10 py-12 lg:flex">
          <Link href="/" aria-label="Castor — home">
            <CastorLogo />
          </Link>

          <div>
            <div className="flex w-fit items-center gap-2 rounded-full border border-landing-line bg-landing-card/60 px-3 py-1.5 font-mono text-[11px] text-zinc-400">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              two stars · one session
            </div>
            <h1
              className={cn(
                "mt-6 max-w-md text-5xl leading-[1.04] font-semibold tracking-tight",
                display.className
              )}
            >
              Two of you.
              <br />
              <span className="bg-gradient-to-r from-sky-300 via-[oklch(0.7_0.16_262)] to-violet-300 bg-clip-text text-transparent">
                One codebase.
              </span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-400">
              The multiplayer cloud IDE — your whole team codes in one live
              session, and AI edits alongside when you ask.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {SESSION.crew.map((m) => (
                <span
                  key={m.name}
                  title={m.name}
                  className={cn(
                    "grid size-8 place-items-center rounded-full text-[10px] font-medium text-landing ring-2 ring-landing",
                    m.color
                  )}
                >
                  {m.initial}
                </span>
              ))}
            </div>
            <span className="font-mono text-[10px] tracking-wide text-zinc-500">
              the twin-stars crew · casting to your workspace
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            <Link href="/" className="mb-10 inline-flex lg:hidden" aria-label="Castor — home">
              <CastorGlyph className="size-9" />
            </Link>

            <div className="font-mono text-xs tracking-[0.25em] text-ring uppercase">
              {t.eyebrow}
            </div>
            <h2
              className={cn(
                "mt-3 text-3xl font-semibold tracking-tight",
                display.className
              )}
            >
              {t.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {t.sub}
            </p>

            <div className="mt-6">{children}</div>

            <p className="mt-6 text-center font-mono text-[10px] text-zinc-600">
              no install · no credit card · one tab
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}