'use client';

import { useInView } from '@/hooks/use-in-view';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEffect, useRef, useState } from 'react';

type TransitionType = 'promotion' | 'fulltime' | 'company-switch' | 'start';

const experiences = [
  {
    title: 'Senior Software Engineer',
    company: 'Twilio',
    period: 'October 2024 - Present',
    year: '2024',
    transitionType: 'promotion' as TransitionType,
    description:
      'Led development of core platform features, improving performance by 40%. Mentored junior developers and established best practices for the engineering team.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Software Engineer L2',
    company: 'Twilio',
    period: 'September 2023 - October 2024',
    year: '2023',
    transitionType: 'promotion' as TransitionType,
    description:
      'Built and shipped multiple customer-facing features. Collaborated with design and product teams to deliver exceptional user experiences.',
    technologies: ['Vue.js', 'Python', 'MongoDB', 'AWS'],
  },
  {
    title: 'Software Engineer',
    company: 'Twilio',
    period: 'February 2022 - September 2023',
    year: '2022',
    transitionType: 'fulltime' as TransitionType,
    description:
      'Built and shipped multiple customer-facing features. Collaborated with design and product teams to deliver exceptional user experiences.',
    technologies: ['Vue.js', 'Python', 'MongoDB', 'AWS'],
  },
  {
    title: 'Software Engineering Intern',
    company: 'Twilio',
    period: 'May 2021 - August 2021',
    year: '2021',
    transitionType: 'start' as TransitionType,
    description:
      'Developed responsive websites and web applications for various clients. Gained experience in full-stack development and agile methodologies.',
    technologies: ['JavaScript', 'React', 'Express', 'MySQL'],
  },
];

const transitionConfig = {
  promotion: {
    label: '↗ Promoted',
    color: 'text-green-500',
    dotColor: 'bg-green-500',
    glowColor: 'bg-green-500/20',
  },
  fulltime: {
    label: '★ Full-time',
    color: 'text-blue-500',
    dotColor: 'bg-blue-500',
    glowColor: 'bg-blue-500/20',
  },
  'company-switch': {
    label: '→ New Company',
    color: 'text-purple-500',
    dotColor: 'bg-purple-500',
    glowColor: 'bg-purple-500/20',
  },
  start: {
    label: '◉ Started',
    color: 'text-primary',
    dotColor: 'bg-primary',
    glowColor: 'bg-primary/20',
  },
};

function TimelineItem({
  exp,
  index,
  totalItems,
  onVisibilityChange,
}: {
  exp: (typeof experiences)[0];
  index: number;
  totalItems: number;
  onVisibilityChange: (index: number, isVisible: boolean) => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const config = transitionConfig[exp.transitionType];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInView(visible);
        onVisibilityChange(index, visible);
      },
      {
        threshold: 0.3,
        rootMargin: '-50px',
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [index, onVisibilityChange]);

  return (
    <div ref={itemRef} className='relative pl-24 md:pl-32 pb-16 last:pb-0'>
      {/* Year marker */}
      <div
        className={`absolute left-0 top-6 text-2xl md:text-3xl font-bold transition-all duration-700 ${
          isInView
            ? 'opacity-100 text-primary'
            : 'opacity-30 text-muted-foreground'
        }`}
        style={{
          transitionDelay: `${index * 150}ms`,
        }}
      >
        {exp.year}
      </div>

      {/* Transition badge on timeline */}
      <div className='absolute left-[40px] md:left-[60px] -top-2 z-10'>
        <div
          className={`relative transition-all duration-700 ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{
            transitionDelay: `${index * 150}ms`,
          }}
        >
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-background shadow-lg ${config.dotColor}`}
          >
            <span className='text-white text-xs font-bold whitespace-nowrap'>
              {config.label}
            </span>
          </div>
          {/* Glow effect */}
          {isInView && (
            <div
              className={`absolute inset-0 rounded-full ${config.glowColor} blur-md -z-10`}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className={`transition-all duration-700 ease-in-out ${
          isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}
      >
        <Card className='transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/50 hover:-translate-y-1'>
          <CardHeader>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
              <CardTitle className='text-xl'>{exp.title}</CardTitle>
              <span className='text-sm text-muted-foreground font-medium'>
                {exp.period}
              </span>
            </div>
            <CardDescription className='text-base font-medium'>
              {exp.company}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-muted-foreground leading-relaxed'>
              {exp.description}
            </p>
            <div className='flex flex-wrap gap-2'>
              {exp.technologies.map((tech) => (
                <Badge key={tech} variant='outline' className='text-xs'>
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function Experience() {
  const { ref, isInView } = useInView();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  const handleVisibilityChange = (index: number, isVisible: boolean) => {
    setVisibleItems((prev) => {
      const next = new Set(prev);
      if (isVisible) {
        next.add(index);
      } else {
        next.delete(index);
      }
      return next;
    });
  };

  // Calculate fill percentage based on the furthest visible item
  // Adjusted to account for card heights and stop at the last card
  const fillPercentage =
    visibleItems.size > 0
      ? ((Math.max(...Array.from(visibleItems)) + 0.85) /
          (experiences.length + 0.15)) *
        100
      : 0;

  return (
    <section id='experience' className='py-24 px-6' ref={ref}>
      <div className='container mx-auto max-w-4xl'>
        <div
          className={`space-y-12 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className='text-3xl md:text-4xl font-bold'>Experience</h2>
          <div className='relative' ref={timelineRef}>
            {/* "Present" starting section - always visible */}
            <div className='relative pl-24 md:pl-32 pb-32'>
              {/* Static timeline for present section - empty with flowing dots */}
              <div className='absolute left-[75px] md:left-[103px] top-0 w-1 h-full bg-border' />

              {/* Present marker - centered on timeline */}
              <div className='absolute left-[69px] md:left-[97px] top-0'>
                <div className='relative w-4 h-4 rounded-full bg-primary'>
                  <div className='absolute inset-0 rounded-full bg-primary/20 scale-[2.5]' />
                  <div className='absolute inset-0 rounded-full bg-primary animate-ping opacity-75' />
                </div>
              </div>

              <div className='absolute left-[95px] md:left-[123px] top-0 text-sm font-bold text-primary'>
                Present
              </div>

              {/* Animated dots flowing down */}
              <div className='absolute left-[75px] md:left-[103px] top-8 w-1 h-full overflow-hidden'>
                <div className='absolute w-1 h-2 bg-background/80 rounded-full animate-[slideDown_2s_ease-in-out_infinite]' />
                <div className='absolute w-1 h-2 bg-background/60 rounded-full animate-[slideDown_2s_ease-in-out_infinite_0.7s]' />
                <div className='absolute w-1 h-2 bg-background/40 rounded-full animate-[slideDown_2s_ease-in-out_infinite_1.4s]' />
              </div>
            </div>

            {/* Filled timeline that grows with scroll - starts after present section */}
            <div
              className='absolute left-[75px] md:left-[103px] w-1 bg-linear-to-b from-primary via-primary/60 to-primary/30 transition-all duration-500 ease-out'
              style={{
                top: '128px',
                height: `${fillPercentage}%`,
              }}
            />

            {experiences.map((exp, index) => (
              <TimelineItem
                key={index}
                exp={exp}
                index={index}
                totalItems={experiences.length}
                onVisibilityChange={handleVisibilityChange}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
