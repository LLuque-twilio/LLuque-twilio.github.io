export interface CommandContext {
  navigate: (sectionId: string) => void; // smooth-scroll to a section id
  print: (lines: string[]) => void;      // append output lines to the log
  clear: () => void;                      // clear the output log
  toggleTheme: () => void;
  close: () => void;                      // close the palette
}

export interface Command {
  name: string;
  description: string;
  hidden?: boolean; // excluded from `help` listing
  run: (ctx: CommandContext, args: string[]) => void;
}

export const commands: Command[] = [
  { name: 'help', description: 'list available commands', run: (ctx) => {
      ctx.print(commands.filter((c) => !c.hidden).map((c) => `  ${c.name.padEnd(12)} ${c.description}`));
    } },
  { name: 'whoami', description: 'about Logan', run: (ctx) => { ctx.navigate('about'); ctx.print(['→ logan luque — senior software engineer @ twilio']); } },
  { name: 'about', description: 'jump to about', run: (ctx) => { ctx.navigate('about'); ctx.close(); } },
  { name: 'skills', description: 'jump to skills', run: (ctx) => { ctx.navigate('skills'); ctx.close(); } },
  { name: 'projects', description: 'jump to projects', run: (ctx) => { ctx.navigate('projects'); ctx.close(); } },
  { name: 'experience', description: 'jump to experience', run: (ctx) => { ctx.navigate('experience'); ctx.close(); } },
  { name: 'contact', description: 'jump to contact', run: (ctx) => { ctx.navigate('contact'); ctx.close(); } },
  { name: 'theme', description: 'toggle light/dark', run: (ctx) => { ctx.toggleTheme(); ctx.print(['→ theme toggled']); } },
  { name: 'clear', description: 'clear the screen', run: (ctx) => ctx.clear() },
  // hidden fun commands
  { name: 'sudo', description: '', hidden: true, run: (ctx) => ctx.print(['nice try 😏 — you do not have root here']) },
  { name: 'coffee', description: '', hidden: true, run: (ctx) => ctx.print(['☕ brewing... done. productivity +10']) },
  { name: 'ls', description: '', hidden: true, run: (ctx) => ctx.print(['about/  skills/  projects/  experience/  contact/']) },
];

export function findCommand(input: string): Command | undefined {
  const name = input.trim().split(/\s+/)[0]?.toLowerCase();
  return commands.find((c) => c.name === name);
}
