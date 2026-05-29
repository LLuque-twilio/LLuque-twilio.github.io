"use client"

import { useEffect, useState, type ReactNode } from "react"

interface BootSequenceProps {
  lines: string[]
  children: ReactNode
}

const BOOT_KEY = "boot-shown"
const LINE_MS = 400
const FADE_MS = 250

export function BootSequence({ lines, children }: BootSequenceProps) {
  // How many boot lines are currently visible. -1 = not playing / finished.
  const [visibleLines, setVisibleLines] = useState(-1)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    let alreadyShown = false
    try {
      alreadyShown = window.sessionStorage.getItem(BOOT_KEY) === "1"
    } catch {
      // sessionStorage may be unavailable (private mode, etc.) — just skip the flourish.
      alreadyShown = true
    }

    if (prefersReducedMotion || alreadyShown) {
      try {
        window.sessionStorage.setItem(BOOT_KEY, "1")
      } catch {
        // ignore
      }
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []

    // Reveal lines one at a time.
    setVisibleLines(0)
    for (let i = 0; i < lines.length; i += 1) {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1)
        }, i * LINE_MS),
      )
    }

    // Begin fade after the last line has shown, then unmount the overlay.
    const fadeStart = lines.length * LINE_MS
    timers.push(
      setTimeout(() => {
        setFading(true)
      }, fadeStart),
    )
    timers.push(
      setTimeout(() => {
        setVisibleLines(-1)
        try {
          window.sessionStorage.setItem(BOOT_KEY, "1")
        } catch {
          // ignore
        }
      }, fadeStart + FADE_MS),
    )

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [lines])

  return (
    <>
      {/* Children always mount so SSR content is present for LCP. */}
      {children}

      {visibleLines >= 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-background transition-opacity duration-200"
          style={{ opacity: fading ? 0 : 1 }}
        >
          <pre className="font-mono text-sm leading-relaxed text-secondary">
            {lines.slice(0, visibleLines).map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </pre>
        </div>
      )}
    </>
  )
}
