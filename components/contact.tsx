'use client';

import { useInView } from '@/hooks/use-in-view';
import { Button } from '@/components/ui/button';
import { EnvelopeIcon, LinkIcon } from '@heroicons/react/24/outline';
import { SimpleIconComponent } from '@/components/ui/simple-icon';
import { siGithub } from 'simple-icons';

const socials = [
  {
    name: 'GitHub',
    icon: siGithub,
    href: 'https://github.com/Lluque-twilio',
    type: 'simple' as const,
  },
  {
    name: 'LinkedIn',
    icon: LinkIcon,
    href: 'https://linkedin.com/in/logan-luque',
    type: 'heroicon' as const,
  },
  {
    name: 'Email',
    icon: EnvelopeIcon,
    href: 'mailto:loganluque.inquiries@gmail.com',
    type: 'heroicon' as const,
  },
];

export function Contact() {
  const { ref, isInView } = useInView();

  return (
    <section
      id='contact'
      className='py-24 px-6 min-h-screen flex items-center'
      ref={ref}
    >
      <div className='container mx-auto max-w-4xl w-full'>
        <div
          className={`space-y-12 text-center transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className='space-y-4'>
            <h2 className='text-3xl md:text-4xl font-bold'>Let's Connect</h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
              I'm always interested in hearing about new opportunities,
              collaborations, or just having a chat about technology. Feel free
              to reach out!
            </p>
          </div>
          <div className='flex flex-wrap items-center justify-center gap-4'>
            {socials.map((social) => {
              return (
                <Button
                  key={social.name}
                  variant='outline'
                  size='lg'
                  asChild
                  className='transition-all hover:scale-105 bg-transparent'
                >
                  <a
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {social.type === 'simple' ? (
                      <SimpleIconComponent
                        icon={social.icon}
                        className='w-5 h-5 mr-2'
                      />
                    ) : (
                      <social.icon className='w-5 h-5 mr-2' />
                    )}
                    {social.name}
                  </a>
                </Button>
              );
            })}
          </div>
          <div className='pt-12 border-t border-border'>
            <p className='text-sm text-muted-foreground'>
              © {new Date().getFullYear()} Logan Luque. Built with Next.js and
              Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
