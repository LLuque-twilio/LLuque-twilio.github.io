export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

// TODO(logan): replace with your real projects.
export const projects: Project[] = [
  {
    title: 'TODO: Project One',
    description:
      'TODO(logan): one or two sentences on what it does and why it is cool.',
    technologies: ['TypeScript', 'React'],
    github: '#',
    demo: '#',
  },
  {
    title: 'TODO: Project Two',
    description: 'TODO(logan): description.',
    technologies: ['Go', 'PostgreSQL'],
    github: '#',
  },
];
