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
    a: "In the cloud, streamed to your browser. The editor, terminal and preview all talk to the same live workspace, so you never install a thing — and your repo keeps its git remote.",
  },
  {
    q: "Which models power the agent?",
    a: "Anthropic Claude today — Opus for the heavy reasoning, Sonnet for daily work, Haiku for the fast stuff. More model docks open over time; the picker is already designed for it.",
  },
  {
    q: "Can I import my existing repo?",
    a: "Yes. Connect a GitHub repository and it lands in your workspace with an agent that has already read it — history, structure and all.",
  },
  {
    q: "Can two people code at once?",
    a: "Not yet — that's the whole point of the name. Workspaces for teammates are coming, so a friend can drop into your preview, leave a caret and take a seat.",
  },
  {
    q: "Is the preview really live?",
    a: "Yes. Every file you touch re-renders in the in-browser preview, and the agent's edits show up there too — one screen, zero guesses about what shipped.",
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
            One workspace, an agent that already read your code, and a preview
            that shows the truth. Your second mind is a keystroke away.
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
      links: ["workflow", "preview", "command bar", "workspaces (soon)"],
    },
    {
      title: "company",
      links: ["the twin story", "waitlist", "release notes", "status"],
    },
    {
      title: "stack",
      links: ["convex", "clerk", "anthropic claude", "next.js"],
    },
  ]

  return (
    <footer className="border-t border-landing-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <CastorLogo />
          <p className="mt-4 max-w-[240px] text-sm leading-relaxed text-zinc-500">
The AI cloud IDE named for Gemini&apos;s brightest star. Designed for
two — you and the agent, you and a teammate.
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