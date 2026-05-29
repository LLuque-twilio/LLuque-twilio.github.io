import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { CommandPaletteProvider } from '@/components/command-palette/use-command-palette';
import { CommandPalette } from '@/components/command-palette/command-palette';

export default function Home() {
  return (
    <CommandPaletteProvider>
      <main className='min-h-screen'>
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <CommandPalette />
    </CommandPaletteProvider>
  );
}
