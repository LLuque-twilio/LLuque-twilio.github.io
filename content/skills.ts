export interface SkillCategory {
  title: string;
  command: string; // shown in the file-listing motif
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  { title: 'Languages', command: 'languages', skills: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL'] },
  { title: 'Frontend', command: 'frontend', skills: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'HTML/CSS'] },
  { title: 'Backend', command: 'backend', skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis'] },
  { title: 'Tools & Platforms', command: 'tools', skills: ['Git', 'Docker', 'AWS', 'Vercel', 'CI/CD'] },
];
