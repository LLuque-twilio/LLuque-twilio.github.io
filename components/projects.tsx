'use client';

import { useInView } from '@/hooks/use-in-view';
import { TerminalWindow } from '@/components/terminal-window';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { SimpleIconComponent } from '@/components/ui/simple-icon';
import { siGithub } from 'simple-icons';
import { projects } from '@/content/projects';

export function Projects() {
  const { ref, isInView } = useInView();

  return (
    <section id='projects' className='px-6 py-24' ref={ref}>
      <div
        className={`container mx-auto max-w-4xl transition-all duration-700 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <TerminalWindow command='git log --projects' title='~/projects'>
          <div className='grid gap-6 md:grid-cols-2'>
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className='flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md'
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 font-mono text-lg'>
                    <span className='select-none text-accent'>commit</span>
                    <span>{project.title}</span>
                  </CardTitle>
                  <CardDescription className='leading-relaxed'>
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex flex-1 flex-col justify-between gap-4'>
                  <div className='flex flex-wrap gap-2'>
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant='outline'
                        className='font-mono text-xs'
                      >
                        <span className='text-secondary'>#</span>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {(project.github || project.demo) && (
                    <div className='flex flex-wrap gap-2'>
                      {project.github && (
                        <Button variant='outline' size='sm' asChild>
                          <a
                            href={project.github}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <SimpleIconComponent
                              icon={siGithub}
                              className='size-4'
                            />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.demo && (
                        <Button size='sm' asChild>
                          <a
                            href={project.demo}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <ArrowTopRightOnSquareIcon className='size-4' />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
