import { Ticker, Hero, Navbar } from "./components/hero"
import { Features, Workflow } from "./components/features"
import { Collaboration } from "./components/collaboration"
import { FaqCtaFooter } from "./components/footer"

const STARFIELD: {
  top: string
  left: string
  size: string
  delay: string
  glow?: boolean
}[] = [
  { top: "6%", left: "8%", size: "2px", delay: "0s", glow: true },
  { top: "9%", left: "78%", size: "2px", delay: "0.8s" },
  { top: "12%", left: "34%", size: "1px", delay: "1.5s" },
  { top: "15%", left: "55%", size: "2px", delay: "2.1s" },
  { top: "18%", left: "20%", size: "1px", delay: "0.4s" },
  { top: "21%", left: "91%", size: "2px", delay: "1.1s", glow: true },
  { top: "24%", left: "64%", size: "1px", delay: "2.7s" },
  { top: "27%", left: "41%", size: "2px", delay: "0.2s" },
  { top: "32%", left: "12%", size: "1px", delay: "1.9s" },
  { top: "35%", left: "86%", size: "1px", delay: "0.6s" },
  { top: "39%", left: "30%", size: "2px", delay: "2.4s" },
  { top: "43%", left: "70%", size: "1px", delay: "1.3s" },
  { top: "46%", left: "52%", size: "2px", delay: "0.9s", glow: true },
  { top: "50%", left: "6%", size: "1px", delay: "2.9s" },
  { top: "53%", left: "94%", size: "2px", delay: "0.5s" },
  { top: "57%", left: "38%", size: "1px", delay: "1.7s" },
  { top: "60%", left: "16%", size: "2px", delay: "3.1s" },
  { top: "63%", left: "80%", size: "1px", delay: "0.3s" },
  { top: "67%", left: "61%", size: "1px", delay: "2.2s" },
  { top: "70%", left: "25%", size: "2px", delay: "1.5s" },
  { top: "73%", left: "46%", size: "1px", delay: "0.7s" },
  { top: "77%", left: "89%", size: "2px", delay: "2.6s", glow: true },
  { top: "80%", left: "9%", size: "1px", delay: "1.0s" },
  { top: "83%", left: "34%", size: "2px", delay: "0.1s" },
  { top: "86%", left: "72%", size: "1px", delay: "1.9s" },
  { top: "89%", left: "53%", size: "2px", delay: "2.8s" },
  { top: "92%", left: "91%", size: "1px", delay: "0.4s" },
  { top: "95%", left: "17%", size: "2px", delay: "1.2s", glow: true },
  { top: "97%", left: "66%", size: "1px", delay: "2.0s" },
]

const Star = ({
  top,
  left,
  delay,
  size,
  glow,
}: (typeof STARFIELD)[number]) => (
  <span
    aria-hidden
    style={{
      top,
      left,
      animationDelay: delay,
      width: size,
      height: size,
      boxShadow: glow ? "0 0 8px 2px rgba(255,255,255,0.35)" : undefined,
    }}
    className="animate-twinkle absolute rounded-full bg-zinc-300/80"
  />
)

export const LandingPage = () => {
  return (
    <div className="dark bg-landing text-foreground min-h-screen select-text antialiased">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 hidden sm:block"
      >
        {STARFIELD.map((s, i) => (
          <Star key={i} {...s} />
        ))}
      </div>

      <div className="relative z-10 overflow-x-clip">
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(oklch(0.7 0.14 262 / 0.08) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage:
                "radial-gradient(90% 70% at 50% 0%, black, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(90% 70% at 50% 0%, black, transparent 80%)",
            }}
          />

          <div
            aria-hidden
            className="animate-aurora pointer-events-none absolute -top-24 -left-32 size-[520px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.16_262/0.16),transparent_65%)] blur-3xl"
          />
          <div
            aria-hidden
            className="animate-aurora pointer-events-none absolute top-40 -right-40 size-[560px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.13_310/0.12),transparent_65%)] blur-3xl"
            style={{ animationDelay: "-8s" }}
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