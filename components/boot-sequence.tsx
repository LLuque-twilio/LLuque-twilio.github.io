import type { ReactNode } from 'react';

interface BootSequenceProps {
  lines: string[];
  children: ReactNode;
}

const LINE_STEP_S = 0.32;

/**
 * Renders a one-time "boot" overlay on top of its children.
 *
 * The overlay is fully declarative and animated entirely in CSS (see the
 * `.boot-*` rules in globals.css). Because it is part of the server-rendered
 * markup, it is painted on the very first frame — it never appears *after* the
 * content has already rendered, which is what caused the earlier flash. CSS
 * fades it out automatically and `prefers-reduced-motion` hides it instantly.
 */
export function BootSequence({ lines, children }: BootSequenceProps) {
  return (
    <>
      {/* Children always render so SSR content is present for LCP. */}
      {children}

      <div
        aria-hidden="true"
        className="boot-overlay pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-background"
      >
        <pre className="font-mono text-sm leading-relaxed text-secondary">
          {lines.map((line, index) => (
            <span
              key={index}
              className="boot-line block"
              style={{ animationDelay: `${index * LINE_STEP_S}s` }}
            >
              {line}
            </span>
          ))}
        </pre>
      </div>
    </>
  );
}
