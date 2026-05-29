'use client';

import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { TerminalWindow } from '@/components/terminal-window';
import { Button } from '@/components/ui/button';
import { EnvelopeIcon, LinkIcon } from '@heroicons/react/24/outline';
import { SimpleIconComponent } from '@/components/ui/simple-icon';
import { siGithub } from 'simple-icons';
import { profile, type Social } from '@/content/profile';

function SocialIcon({ icon }: { icon: Social['icon'] }) {
  if (icon === 'github') {
    return <SimpleIconComponent icon={siGithub} className='size-5' />;
  }
  if (icon === 'linkedin') {
    return <LinkIcon className='size-5' />;
  }
  return <EnvelopeIcon className='size-5' />;
}

export function Contact() {
  const { ref, isInView } = useInView();
  // Render the year on the client so a static build doesn't freeze it and
  // there's no SSR/CSR hydration mismatch across a year boundary.
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <section
      id='contact'
      className='flex min-h-screen items-center px-6 py-24'
      ref={ref}
    >
      <h2 className='sr-only'>Contact</h2>
      <div
        className={`container mx-auto w-full max-w-4xl transition-all duration-700 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <TerminalWindow command='./connect.sh' title='~/connect'>
          <div className='space-y-8'>
            <p className='max-w-2xl text-pretty leading-relaxed text-muted-foreground'>
              <span className='select-none text-muted-foreground'># </span>
              Always open to new opportunities, collaborations, or a chat about
              technology. Run a command below to reach out.
            </p>

            <div className='flex flex-wrap items-center gap-3'>
              {profile.socials.map((social) => (
                <Button
                  key={social.name}
                  variant='outline'
                  size='lg'
                  asChild
                  className='transition-transform hover:scale-105'
                >
                  <a
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <SocialIcon icon={social.icon} />
                    {social.name}
                  </a>
                </Button>
              ))}
            </div>

            <div className='border-t border-border pt-6'>
              <p className='font-mono text-xs text-muted-foreground'>
                <span className='select-none text-secondary'>$ </span>
                echo &quot;© {year ?? ''} {profile.name} · built with
                Next.js + Tailwind CSS&quot;
              </p>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
