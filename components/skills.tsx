'use client';

import { useInView } from '@/hooks/use-in-view';
import { TerminalWindow } from '@/components/terminal-window';
import { Badge } from '@/components/ui/badge';
import { FolderIcon } from '@heroicons/react/24/outline';
import { skillCategories } from '@/content/skills';

export function Skills() {
  const { ref, isInView } = useInView();

  return (
    <section id='skills' className='px-6 py-24' ref={ref}>
      <h2 className='sr-only'>Skills</h2>
      <div
        className={`container mx-auto max-w-4xl transition-all duration-700 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <TerminalWindow command='ls skills/' title='~/skills'>
          <div className='grid gap-6 md:grid-cols-2'>
            {skillCategories.map((category, index) => (
              <div
                key={category.title}
                className='rounded-lg border border-border bg-background/40 p-4 transition-colors hover:border-primary/40'
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className='mb-3 flex items-center gap-2 font-mono text-sm'>
                  <FolderIcon className='size-4 text-primary' />
                  <span className='text-primary'>{category.command}/</span>
                  <span className='text-muted-foreground'>
                    {category.title}
                  </span>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant='secondary'
                      className='px-2.5 py-1 font-mono text-xs'
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
