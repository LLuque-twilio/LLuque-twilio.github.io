"use client"

import { useInView } from "@/hooks/use-in-view"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "Tech Company",
    period: "2022 - Present",
    description:
      "Led development of core platform features, improving performance by 40%. Mentored junior developers and established best practices for the engineering team.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    title: "Software Engineer",
    company: "Startup Inc",
    period: "2020 - 2022",
    description:
      "Built and shipped multiple customer-facing features. Collaborated with design and product teams to deliver exceptional user experiences.",
    technologies: ["Vue.js", "Python", "MongoDB", "AWS"],
  },
  {
    title: "Junior Developer",
    company: "Digital Agency",
    period: "2018 - 2020",
    description:
      "Developed responsive websites and web applications for various clients. Gained experience in full-stack development and agile methodologies.",
    technologies: ["JavaScript", "React", "Express", "MySQL"],
  },
]

export function Experience() {
  const { ref, isInView } = useInView()

  return (
    <section id="experience" className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <div
          className={`space-y-12 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:shadow-lg hover:border-primary/50"
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <CardTitle className="text-xl">{exp.title}</CardTitle>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <CardDescription className="text-base">{exp.company}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
