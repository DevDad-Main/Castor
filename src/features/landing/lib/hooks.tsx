"use client"

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react"
import { cn } from "cn"

/** Reveals children with a fade/slide once they enter the viewport. */
export const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 will-change-transform",
        visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0",
        className
      )}
    >
      {children}
    </div>
  )
}

/** Adds a radial spotlight that follows the cursor across the card. */
export const Spotlight = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    el.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn("group relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(460px circle at var(--mx,50%) var(--my,50%), oklch(0.72 0.16 262 / 0.1), transparent 65%)",
        }}
      />
      {children}
    </div>
  )
}

/** Drives a looping 0..1 progress value for timed, replayable sequences. */
export const useProgressive = (loopMs = 9000) => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStep((prev) => (prev + 1) % 1000)
    }, loopMs / 1000)
    return () => clearInterval(id)
  }, [loopMs])

  return step / 1000
}

/** Returns a clean boolean for whether `p` is inside a progress window. */
export const inWindow = (p: number, start: number, end: number) =>
  p >= start && p < end

/** 0..1 fraction of `p` inside a window (for typing feel). */
export const frac = (p: number, start: number, end: number) => {
  if (p < start) return 0
  if (p >= end) return 1
  return (p - start) / (end - start)
}