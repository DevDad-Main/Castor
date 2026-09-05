import { Ticker, Hero, Navbar } from "./components/hero"
import { Features, Workflow } from "./components/features"
import { Collaboration } from "./components/collaboration"
import { FaqCtaFooter } from "./components/footer"
import { cn } from "cn"

const STARS = [
  { top: "8%", left: "12%", delay: "0s", size: "2px" },
  { top: "14%", left: "72%", delay: "0.8s", size: "2px" },
  { top: "5%", left: "44%", delay: "1.5s", size: "2px" },
  { top: "22%", left: "6%", delay: "2.1s", size: "2px" },
  { top: "19%", left: "88%", delay: "0.4s", size: "2px" },
  { top: "27%", left: "30%", delay: "1.1s", size: "2px" },
  { top: "11%", left: "55%", delay: "2.7s", size: "2px" },
  { top: "33%", left: "80%", delay: "0.2s", size: "2px" },
]

const Star = ({
  top,
  left,
  delay,
  size,
}: (typeof STARS)[number]) => (
  <span
    aria-hidden
    style={{ top, left, animationDelay: delay }}
    className={cn(
      "animate-twinkle absolute rounded-full bg-zinc-100 shadow-[0_0_6px_rgba(255,255,255,0.9)]",
      size === "2px" ? "size-[2px]" : "size-[2px]"
    )}
  />
)

export const LandingPage = () => {
  return (
    <div className="dark bg-landing text-foreground min-h-screen select-text antialiased">
      <div className="relative overflow-x-clip">
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(oklch(0.7 0.14 262 / 0.08) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(70% 60% at 50% 0%, black, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(70% 60% at 50% 0%, black, transparent 80%)",
            }}
          />

          {STARS.map((s, i) => (
            <Star key={i} {...s} />
          ))}

          <div
            aria-hidden
            className="animate-aurora pointer-events-none absolute -top-24 -left-32 size-[520px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.16_262/0.16),transparent_65%)] blur-3xl"
          />
          <div
            aria-hidden
            className="animate-aurora pointer-events-none absolute top-40 -right-40 size-[560px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.13_310/0.12),transparent_65%)] blur-3xl"
            style={{ animationDelay: "-8s" }}
          />
          <div
            aria-hidden
            className="landing-noise pointer-events-none absolute inset-0 opacity-[0.03]"
          />

          <Navbar />
          <Hero />
        </div>

        <Ticker />
        <Workflow />
        <Features />
        <Collaboration />
        <FaqCtaFooter />
      </div>
    </div>
  )
}