import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TerminalWindowProps {
  command: string
  title?: string
  className?: string
  children: ReactNode
}

export function TerminalWindow({ command, title, className, children }: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card shadow-sm",
        className,
      )}
    >
      {/* Titlebar */}
      <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="size-3 rounded-full bg-red-500 ring-1 ring-inset ring-black/10" />
          <span className="size-3 rounded-full bg-yellow-400 ring-1 ring-inset ring-black/10" />
          <span className="size-3 rounded-full bg-green-500 ring-1 ring-inset ring-black/10" />
        </div>
        {title ? (
          <span className="flex-1 truncate text-center text-xs text-muted-foreground">
            {title}
          </span>
        ) : (
          <span className="flex-1" />
        )}
        {/* spacer to keep the title visually centered against the dots */}
        <span className="w-[52px]" aria-hidden="true" />
      </div>

      {/* Body */}
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <div className="mb-3 flex items-baseline gap-2 font-mono text-sm">
          <span className="select-none text-secondary">$</span>
          <span className="text-foreground">{command}</span>
        </div>
        {children}
      </div>
    </div>
  )
}
