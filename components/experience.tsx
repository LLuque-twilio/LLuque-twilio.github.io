'use client';

import type { Ref } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { TerminalWindow } from '@/components/terminal-window';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { experiences, transitionConfig, type Experience as Exp } from '@/content/experience';

function TimelineItem({ exp, index }: { exp: Exp; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const config = transitionConfig[exp.transitionType];

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={cn(
        'relative pl-20 pb-12 last:pb-0 transition-all duration-700 md:pl-28',
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Year */}
      <div className='absolute left-0 top-1 font-mono text-lg font-bold text-primary md:text-xl'>
        {exp.year}
      </div>

      {/* Timeline node */}
      <div className='absolute left-[52px] top-2 md:left-[76px]'>
        <span className={cn('block size-4 rounded-full ring-4 ring-background', config.dotColor)} />
        <span
          className={cn(
            'absolute inset-0 -z-10 rounded-full blur-md',
            config.glowColor
          )}
          aria-hidden='true'
        />
      </div>

      <Card className='transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md'>
        <CardHeader>
          <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
            <CardTitle className='text-lg'>{exp.title}</CardTitle>
            <span className='font-mono text-xs text-muted-foreground'>
              {exp.period}
            </span>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            <CardDescription className='font-medium text-foreground'>
              {exp.company}
            </CardDescription>
            <Badge
              className={cn('gap-1 border-transparent text-background', config.dotColor)}
            >
              {config.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='leading-relaxed text-muted-foreground'>
            {exp.description}
          </p>
          <div className='flex flex-wrap gap-2'>
            {exp.technologies.map((tech) => (
              <Badge key={tech} variant='outline' className='font-mono text-xs'>
                <span className='text-secondary'>#</span>
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function Experience() {
  const { ref, isInView } = useInView();

  return (
    <section id='experience' className='px-6 py-24' ref={ref}>
      <div
        className={`container mx-auto max-w-4xl transition-all duration-700 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <TerminalWindow command='history' title='~/experience'>
          <div className='relative'>
            {/* Static timeline rail */}
            <div className='absolute left-[59px] top-2 bottom-2 w-px bg-border md:left-[83px]' />
            {experiences.map((exp, index) => (
              <TimelineItem key={`${exp.company}-${exp.year}`} exp={exp} index={index} />
            ))}
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
