'use client';

import {
  ArrowDownIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Typewriter } from '@/components/typewriter';
import { BootSequence } from '@/components/boot-sequence';
import { TerminalWindow } from '@/components/terminal-window';
import { profile } from '@/content/profile';

export function Hero() {
  return (
    <section className='relative flex min-h-screen items-center justify-center px-6'>
      <BootSequence lines={['> booting portfolio...', '> session ready ✓']}>
        <div className='container mx-auto max-w-3xl'>
          <TerminalWindow command='whoami' title='logan@portfolio: ~'>
            <div className='space-y-6'>
              <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
                <Typewriter text={profile.name} className='text-primary' />
              </h1>

              <p className='font-mono text-base text-muted-foreground sm:text-lg'>
                <span className='text-secondary'>role</span>
                <span className='text-muted-foreground'>=</span>
                <span className='text-accent'>&quot;{profile.role}&quot;</span>
              </p>

              <p className='max-w-2xl text-pretty leading-relaxed text-foreground/90'>
                <span className='select-none text-muted-foreground'># </span>
                {profile.tagline}
              </p>

              <div className='flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center'>
                <Button asChild size='lg'>
                  <a href='#contact'>
                    <EnvelopeIcon className='size-4' />
                    Get in touch
                  </a>
                </Button>
                <Button asChild variant='outline' size='lg'>
                  <a href={profile.resumePath} download>
                    <ArrowDownTrayIcon className='size-4' />
                    Download resume
                  </a>
                </Button>
                <Button asChild variant='ghost' size='lg'>
                  <a href='#projects'>
                    <ArrowTopRightOnSquareIcon className='size-4' />
                    View work
                  </a>
                </Button>
              </div>
            </div>
          </TerminalWindow>
        </div>
      </BootSequence>

      <a
        href='#about'
        className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground transition-colors hover:text-primary'
        aria-label='Scroll to about section'
      >
        <ArrowDownIcon className='size-6' />
      </a>
    </section>
  );
}
