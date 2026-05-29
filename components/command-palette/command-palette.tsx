'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import {
  type CommandContext,
  findCommand,
} from './commands';
import { useCommandPalette } from './use-command-palette';

const PROMPT = '~/logan $';
const HINT = 'type "help" to get started';

interface LogLine {
  id: number;
  text: string;
  /** echoed command input (rendered with prompt) vs system output */
  kind: 'echo' | 'output';
}

let lineId = 0;
const makeLine = (text: string, kind: LogLine['kind']): LogLine => ({
  id: lineId++,
  text,
  kind,
});

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const { theme, setTheme } = useTheme();

  const [value, setValue] = useState('');
  const [log, setLog] = useState<LogLine[]>(() => [makeLine(HINT, 'output')]);

  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // Autofocus the input whenever the palette opens.
  useEffect(() => {
    if (open) {
      // defer until the dialog content is mounted/animated in
      const t = window.setTimeout(() => inputRef.current?.focus(), 0);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // Auto-scroll the output log to the bottom as lines are added.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const raw = value;
    const trimmed = raw.trim();

    // Always echo the typed prompt line.
    setLog((prev) => [...prev, makeLine(raw, 'echo')]);
    setValue('');

    // Empty / whitespace-only input: echo only, do nothing else.
    if (!trimmed) return;

    const ctx: CommandContext = {
      navigate: (sectionId) => {
        const prefersReduced =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
      },
      print: (lines) =>
        setLog((prev) => [
          ...prev,
          ...lines.map((l) => makeLine(l, 'output')),
        ]),
      clear: () => setLog([]),
      toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      close: () => setOpen(false),
    };

    const command = findCommand(trimmed);
    if (command) {
      const args = trimmed.split(/\s+/).slice(1);
      command.run(ctx, args);
    } else {
      ctx.print([`command not found: ${trimmed}. type "help".`]);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          'overflow-hidden border-border bg-card p-0 font-mono shadow-2xl',
          'sm:max-w-2xl',
        )}
      >
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <DialogDescription className="sr-only">
          Type a command and press Enter. Try &quot;help&quot; to list available
          commands.
        </DialogDescription>

        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-2.5">
          <span className="size-3 rounded-full bg-[#ff5f56]" aria-hidden />
          <span className="size-3 rounded-full bg-[#ffbd2e]" aria-hidden />
          <span className="size-3 rounded-full bg-[#27c93f]" aria-hidden />
          <span className="ml-2 select-none text-xs text-muted-foreground">
            logan@portfolio — zsh
          </span>
        </div>

        {/* output log */}
        <div
          ref={logRef}
          className="max-h-[45vh] min-h-[8rem] overflow-y-auto px-4 pt-3 text-sm leading-relaxed"
        >
          {log.map((line) =>
            line.kind === 'echo' ? (
              <div key={line.id} className="whitespace-pre-wrap break-words">
                <span className="text-secondary">{PROMPT}</span>{' '}
                <span className="text-foreground">{line.text}</span>
              </div>
            ) : (
              <div
                key={line.id}
                className="whitespace-pre-wrap break-words text-muted-foreground"
              >
                {line.text}
              </div>
            ),
          )}
        </div>

        {/* prompt / caret line */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-4 pb-4 pt-1"
        >
          <span aria-hidden className="select-none text-sm text-secondary">
            {PROMPT}
          </span>
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            aria-label="Command input"
            className={cn(
              'h-auto flex-1 rounded-none border-0 bg-transparent px-0 py-0 font-mono text-sm text-foreground shadow-none caret-secondary',
              'focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              'placeholder:text-muted-foreground/60',
            )}
            placeholder="help"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
