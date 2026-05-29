'use client';

import { useInView } from '@/hooks/use-in-view';
import { TerminalWindow } from '@/components/terminal-window';
import { Badge } from '@/components/ui/badge';
import { profile } from '@/content/profile';

export function About() {
  const { ref, isInView } = useInView();

  return (
    <section id='about' className='px-6 py-24' ref={ref}>
      <h2 className='sr-only'>About</h2>
      <div
        className={`container mx-auto max-w-4xl transition-all duration-700 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <TerminalWindow command='cat about.md' title='about.md'>
          <div className='grid gap-8 md:grid-cols-[auto_1fr] md:items-start'>
            {/* Avatar */}
            <div className='mx-auto md:mx-0'>
              <img
                src={profile.avatar}
                alt={`Portrait of ${profile.name}`}
                className='size-32 rounded-lg border border-border object-cover shadow-sm md:size-40'
              />
            </div>

            {/* Prose + fun facts */}
            <div className='space-y-5'>
              <div className='space-y-4 leading-relaxed text-muted-foreground'>
                {profile.about.map((paragraph, index) => (
                  <p key={index} className='text-pretty'>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className='border-t border-border pt-5'>
                <p className='mb-3 font-mono text-xs text-muted-foreground'>
                  <span className='select-none text-secondary'>$ </span>
                  cat ~/.facts
                </p>
                <div className='flex flex-wrap gap-2'>
                  {profile.funFacts.map((fact) => (
                    <Badge
                      key={fact.label}
                      variant='outline'
                      className='gap-1.5 px-2.5 py-1 font-mono'
                    >
                      <span className='text-secondary'>{fact.label}:</span>
                      <span className='text-foreground'>{fact.value}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
