"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, SparkleIcon } from "lucide-react"
import { CastorLogo } from "./brand"
import { IdeWindow } from "./ide-window"
import { Reveal } from "../lib/hooks"
import { display } from "../lib/fonts"
import { TICKER_ITEMS, SESSION } from "../lib/vocab"

const NAV_LINKS = [
  { href: "#workflow", label: "_workflow" },
  { href: "#product", label: "_product" },
  { href: "#teams", label: "_teams" },
  { href: "#faq", label: "_faq" },
] as const

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-border/50 bg-landing/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-6">
        <a href="#top" aria-label="Castor — home">
          <CastorLogo />
        </a>

        <nav className="ml-6 hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="font-mono text-xs text-zinc-300">
            <Link href="/sign-in">sign in</Link>
          </Button>
          <Button asChild size="sm" className="font-mono text-xs">
            <Link href="/sign-up">get started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export const PresenceRow = ({
  className,
}: {
  className?: string
}) => (
  <div className={cn("flex flex-wrap items-center gap-3", className)}>
    <div className="flex -space-x-2">
      {SESSION.crew.map((m) => (
        <span
          key={m.name}
          title={m.name}
          className={cn(
            "grid size-7 place-items-center rounded-full text-[10px] font-medium text-landing ring-2 ring-landing",
            m.color
          )}
        >
          {m.initial}
        </span>
      ))}
    </div>
    <span className="font-mono text-[11px] text-zinc-500">
      {SESSION.crew.length} in this session · typing in {SESSION.file}
    </span>
  </div>
)

export const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Reveal>
            <div className="flex w-fit items-center gap-2 rounded-full border border-landing-line bg-landing-card/60 px-3 py-1.5 font-mono text-[11px] text-zinc-400">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              shared sessions · live now
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1
              className={cn(
                "mt-6 text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl md:text-7xl",
                display.className
              )}
            >
              Two of you.
              <br />
              <span className="bg-gradient-to-r from-sky-300 via-[oklch(0.7_0.16_262)] to-violet-300 bg-clip-text text-transparent">
                One codebase.
              </span>
              <span className="text-twin">*</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400">
              Castor is a cloud IDE where your team codes in one live
              session — cursors, carets, previews and comments move for
              everyone at once. AI edits alongside when you ask. No install,
              no setup, just one tab.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="gap-2 text-base">
                <Link href="/sign-up">
                  get started free
                  <ArrowRightIcon className="size-4" />
                </Link>
              </Button>
              <a href="#workflow">
                <Button size="lg" variant="ghost" className="font-mono text-sm text-zinc-300">
                  ./watch-it-run
                </Button>
              </a>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <PresenceRow className="mt-8" />
          </Reveal>
        </div>

        <Reveal delay={160} className="lg:pl-4">
          <IdeWindow />
        </Reveal>
      </div>
    </section>
  )
}

export const Ticker = () => {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {TICKER_ITEMS.map((item) => (
        <span
          key={item}
          className="flex shrink-0 items-center gap-10 font-mono text-xs whitespace-nowrap text-zinc-500"
        >
          {item}
          <SparkleIcon className="size-3 text-twin/60" />
        </span>
      ))}
    </div>
  )

  return (
    <div className="relative overflow-hidden border-y border-landing-line bg-landing-card/30 py-3">
      <div className="animate-marquee flex w-max">
        {row}
        <div aria-hidden className="flex shrink-0 items-center gap-10 pl-10">
          {TICKER_ITEMS.map((item) => (
            <span
              key={item}
              className="flex shrink-0 items-center gap-10 font-mono text-xs whitespace-nowrap text-zinc-500"
            >
              {item}
              <SparkleIcon className="size-3 text-twin/60" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}