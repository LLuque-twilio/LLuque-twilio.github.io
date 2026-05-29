export interface Social {
  name: string;
  href: string;
  // 'github' uses simple-icons; others use a heroicon key
  icon: 'github' | 'linkedin' | 'email';
}

export interface FunFact {
  label: string; // e.g. "coffee/day"
  value: string; // e.g. "3 cups"
}

export const profile = {
  name: 'Logan Luque',
  role: 'Senior Software Engineer',
  // TODO(logan): replace with your real one-line tagline, in your voice.
  tagline: 'I build fullstack things at Twilio — TODO: write your real tagline.',
  // TODO(logan): replace with your real about prose (2-3 short paragraphs).
  about: [
    'TODO(logan): paragraph one — who you are and what you do.',
    'TODO(logan): paragraph two — your path / what you care about.',
    'TODO(logan): paragraph three — something human.',
  ],
  // TODO(logan): drop a real photo/avatar at public/avatar.jpg (or .png) and update path.
  avatar: '/avatar.jpg',
  resumePath: '/resume.pdf', // TODO(logan): add public/resume.pdf
  funFacts: [
    // TODO(logan): make these real and fun.
    { label: 'currently', value: 'shipping at Twilio' },
    { label: 'fueled by', value: 'coffee' },
    { label: 'off the clock', value: 'TODO: a hobby' },
  ] as FunFact[],
  socials: [
    { name: 'GitHub', href: 'https://github.com/LLuque-twilio', icon: 'github' },
    // TODO(logan): real LinkedIn URL
    { name: 'LinkedIn', href: 'https://linkedin.com/in/TODO', icon: 'linkedin' },
    // TODO(logan): real contact email
    { name: 'Email', href: 'mailto:TODO@example.com', icon: 'email' },
  ] as Social[],
};
