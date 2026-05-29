export type TransitionType = 'promotion' | 'fulltime' | 'company-switch' | 'start';

export interface Experience {
  title: string;
  company: string;
  period: string;
  year: string;
  transitionType: TransitionType;
  description: string;
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Twilio',
    period: 'October 2024 - Present',
    year: '2024',
    transitionType: 'promotion',
    description:
      'Led development of core platform features, improving performance by 40%. Mentored junior developers and established best practices for the engineering team.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Software Engineer L2',
    company: 'Twilio',
    period: 'September 2023 - October 2024',
    year: '2023',
    transitionType: 'promotion',
    description:
      'Built and shipped multiple customer-facing features. Collaborated with design and product teams to deliver exceptional user experiences.',
    technologies: ['Vue.js', 'Python', 'MongoDB', 'AWS'],
  },
  {
    title: 'Software Engineer',
    company: 'Twilio',
    period: 'February 2022 - September 2023',
    year: '2022',
    transitionType: 'fulltime',
    description:
      'Built and shipped multiple customer-facing features. Collaborated with design and product teams to deliver exceptional user experiences.',
    technologies: ['Vue.js', 'Python', 'MongoDB', 'AWS'],
  },
  {
    title: 'Software Engineering Intern',
    company: 'Twilio',
    period: 'May 2021 - August 2021',
    year: '2021',
    transitionType: 'start',
    description:
      'Developed responsive websites and web applications for various clients. Gained experience in full-stack development and agile methodologies.',
    technologies: ['JavaScript', 'React', 'Express', 'MySQL'],
  },
];

export const transitionConfig: Record<
  TransitionType,
  { label: string; dotColor: string; glowColor: string }
> = {
  promotion: { label: '↗ Promoted', dotColor: 'bg-secondary', glowColor: 'bg-secondary/20' },
  fulltime: { label: '★ Full-time', dotColor: 'bg-primary', glowColor: 'bg-primary/20' },
  'company-switch': { label: '→ New Company', dotColor: 'bg-accent', glowColor: 'bg-accent/20' },
  start: { label: '◉ Started', dotColor: 'bg-primary', glowColor: 'bg-primary/20' },
};
