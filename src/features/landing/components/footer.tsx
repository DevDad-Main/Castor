"use client"

import { useState } from "react"
import { SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, SparkleIcon } from "lucide-react"
import { cn } from "cn"
import { Reveal } from "../lib/hooks"
import { display } from "../lib/fonts"
import { CastorGlyph, CastorLogo } from "./brand"

const FAQS = [
  {
    q: "Where does my code actually run?",
    a: "In the cloud, streamed to your browser. The editor, terminal and preview all talk to the same live workspace — shared with your whole team — and your repo keeps its git remote.",
  },
  {
    q: "How do I get my team into the same editor?",
    a: "Workspaces. They're Clerk-managed and invite-only: send a link and a teammate lands in the live session — carets, cursor and comment threads included. No install for them either.",
  },
  {
    q: "What's a multilayer session?",
    a: "One file, every teammate in their own live viewport. Scroll free, snap to a caret, or follow someone's screen — edits merge on the fly, so there's one truth and no merge anxiety.",
  },
  {
    q: "Where does AI fit in?",
    a: "AI is a teammate you ask. It writes code, makes amendments and runs tests in your branch — like a pair-programmer who never sleeps — while you keep the wheel.",
  },
  {
    q: "Is the preview really live?",
    a: "Yes, for everyone. Files re-render in the shared in-browser preview the moment anyone touches them — one screen, zero guesses about what shipped.",
  },
]

const Faq = () => {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <Reveal>
        <div className="text-center">
          <div className="font-mono text-xs tracking-[0.25em] text-ring uppercase">
            _faq
          </div>
          <h2
            className={cn(
              "mt-3 text-3xl font-semibold tracking-tight sm:text-4xl",
              display.className
            )}
          >
            Asking is free.
          </h2>
        </div>
      </Reveal>

      <div className="mt-12 flex flex-col gap-3">
        {FAQS.map((faq, i) => {
          const isOpen = open === i
          return (
            <Reveal key={i} delay={i * 50}>
              <div
                className={cn(
                  "overflow-hidden rounded-2xl border transition-colors duration-300",
                  isOpen
                    ? "border-ring/40 bg-landing-card/70"
                    : "border-landing-line bg-landing-card/30 hover:border-ring/20"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-xs text-zinc-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-sm font-medium text-zinc-200">
                    {faq.q}
                  </span>
                  <span
                    className={cn(
                      "text-twin transition-transform duration-300",
                      isOpen && "rotate-45"
                    )}
                  >
                    <span className="flex size-6 items-center justify-center rounded-full border border-twin/40 font-mono text-sm">
                      +
                    </span>
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pl-13 text-sm leading-relaxed text-zinc-400">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

const Cta = () => {
  return (
    <section className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_0%,oklch(0.55_0.15_262/0.16),transparent_70%)]"
      />
      <div
        aria-hidden
        className="landing-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
      />

      <Reveal>
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
          <CastorGlyph className="size-12 animate-twinkle" />
          <h2
            className={cn(
              "mt-6 text-4xl font-semibold tracking-tight sm:text-6xl",
              display.className
            )}
          >
            Keep the tab.
            <br />
            <span className="bg-gradient-to-r from-sky-300 via-[oklch(0.7_0.16_262)] to-violet-300 bg-clip-text text-transparent">
              Take the star.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
            One workspace, every caret. Invite the crew, share the preview and
            let the session do the sync — AI is on call, between the lines.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <SignUpButton>
              <Button size="lg" className="gap-2 text-base">
                get started free
                <ArrowRightIcon className="size-4" />
              </Button>
            </SignUpButton>
            <span className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
              <SparkleIcon className="size-3 text-twin" />
              no install · no credit card · one tab
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

const Footer = () => {
  const columns = [
    {
      title: "product",
      links: ["sessions", "live preview", "multilayer", "workspaces"],
    },
    {
      title: "company",
      links: ["the twin story", "waitlist", "release notes", "status"],
    },
    {
      title: "stack",
      links: ["next.js", "convex", "clerk workspaces", "liveblocks"],
    },
  ]

  return (
    <footer className="border-t border-landing-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <CastorLogo />
          <p className="mt-4 max-w-[240px] text-sm leading-relaxed text-zinc-500">
            The multiplayer cloud IDE named for Gemini&apos;s brightest star.
            Clerk workspaces, Liveblocks sync, AI on call.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <div className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
              {col.title}
            </div>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#top"
                    className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-landing-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 font-mono text-[11px] text-zinc-600 sm:flex-row">
          <span>© 2026 Castor Labs — the twin stars project</span>
          <span className="flex items-center gap-1.5">
            castor.theta<SparkleIcon className="size-3 text-twin/70" />
          </span>
        </div>
      </div>
    </footer>
  )
}

export const FaqCtaFooter = () => (
  <>
    <Faq />
    <Cta />
    <Footer />
  </>
)