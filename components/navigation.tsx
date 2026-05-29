'use client';

import { useEffect, useRef, useState } from 'react';
import { CommandLineIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { useCommandPalette } from '@/components/command-palette/use-command-palette';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { setOpen } = useCommandPalette();
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      ticking.current = false;
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.href.slice(1));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };

    let rafId = 0;
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <div className='container mx-auto px-6 py-3'>
        <div className='flex items-center justify-between gap-4'>
          {/* Brand: prompt path */}
          <a
            href='#'
            className='flex items-center font-mono text-base font-semibold'
            aria-label='Home'
          >
            <span className='text-secondary'>~/</span>
            <span className='text-foreground'>logan</span>
            <span
              aria-hidden='true'
              className='ml-1 inline-block h-[1.05em] w-[0.5em] translate-y-[0.1em] bg-primary'
              style={{ animation: 'blink 1s step-end infinite' }}
            />
          </a>

          {/* Links — horizontally scrollable on small screens */}
          <ul className='flex flex-1 items-center gap-5 overflow-x-auto px-2 font-mono text-sm md:flex-none md:justify-end md:gap-7 md:overflow-visible'>
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={cn(
                      'whitespace-nowrap transition-colors hover:text-primary',
                      isActive ? 'font-medium text-primary' : 'text-muted-foreground'
                    )}
                  >
                    <span className='select-none text-secondary'>./</span>
                    {item.name.toLowerCase()}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className='flex shrink-0 items-center gap-1'>
            <button
              type='button'
              onClick={() => setOpen(true)}
              aria-label='Open command palette'
              className='inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground'
            >
              <CommandLineIcon className='size-4' />
              <span className='hidden sm:inline'>⌘K</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
