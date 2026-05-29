"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypewriterProps {
  text: string
  speedMs?: number
  startDelayMs?: number
  className?: string
  showCursor?: boolean
}

export function Typewriter({
  text,
  speedMs = 45,
  startDelayMs = 0,
  className,
  showCursor = true,
}: TypewriterProps) {
  // Start empty on the server to avoid hydration mismatch; typing begins client-side.
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      setDisplayed(text)
      return
    }

    let index = 0
    let interval: ReturnType<typeof setInterval> | undefined

    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length && interval) {
          clearInterval(interval)
        }
      }, speedMs)
    }, startDelayMs)

    return () => {
      clearTimeout(startTimeout)
      if (interval) clearInterval(interval)
    }
  }, [text, speedMs, startDelayMs])

  return (
    <span className={cn("font-mono", className)}>
      {displayed}
      {showCursor && (
        <span
          aria-hidden="true"
          className={cn(
            "ml-0.5 inline-block w-[0.55em] translate-y-[0.1em] bg-primary",
            // Keep the block roughly a character tall.
            "h-[1.05em] align-middle",
          )}
          style={{ animation: "blink 1s step-end infinite" }}
        />
      )}
    </span>
  )
}
