"use client"

import { ArrowDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="space-y-6 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-balance">
            Hi, I'm <span className="text-primary">Your Name</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance">Software Engineer</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I build elegant, performant, and scalable web applications. Passionate about creating exceptional user
            experiences through clean code and thoughtful design.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button asChild size="lg">
              <a href="#contact">Get in Touch</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/resume.pdf" download="Your_Name_Resume.pdf">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href="#experience">View Experience</a>
            </Button>
          </div>
        </div>
      </div>
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </a>
    </section>
  )
}
