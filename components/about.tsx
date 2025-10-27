"use client"

import { useInView } from "@/hooks/use-in-view"

export function About() {
  const { ref, isInView } = useInView()

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <div
          className={`space-y-6 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              I'm a software engineer with a passion for building products that make a difference. With expertise in
              modern web technologies, I specialize in creating responsive, accessible, and performant applications.
            </p>
            <p>
              My journey in software development started with a curiosity about how things work under the hood. Today, I
              combine technical expertise with creative problem-solving to deliver solutions that exceed expectations.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or
              sharing knowledge with the developer community.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
