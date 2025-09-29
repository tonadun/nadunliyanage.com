'use client'

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const scrollToPortfolio = () => {
    const portfolioSection = document.querySelector('[data-slice-type="portfolio"]');
    portfolioSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-surface/20" />

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Status Badge */}
        <div className="mb-6">
          <Badge variant="secondary" className="px-4 py-2 text-sm bg-accent/10 text-accent border-accent/20">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Available for work
          </Badge>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-surface-foreground mb-6">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
            Nadun Liyanage
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted mb-8 max-w-3xl mx-auto leading-relaxed">
          Full-stack developer crafting exceptional digital experiences with modern technologies.
          Passionate about clean code, user experience, and innovative solutions.
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL'].map((tech) => (
            <Badge key={tech} variant="outline" className="px-3 py-1">
              {tech}
            </Badge>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" onClick={scrollToPortfolio} className="group">
            View My Work
            <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:scale-110" />
          </Button>
          <Button variant="outline" size="lg">
            <Mail className="w-4 h-4 mr-2" />
            Get In Touch
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-12">
          <Link href="https://github.com/nadunsliyanage" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform bg-blue-800 hover:bg-blue-500" title="@ Insights Family">
              <Github className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="https://github.com/tonadun" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform bg-amber-500 hover:bg-amber-300" title="@ Shyn Soft">
              <Github className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="https://linkedin.com/in/nadunliyanage" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
              <Linkedin className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="mailto:hello@nadunliyanage.com">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToPortfolio}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          aria-label="Scroll to portfolio"
        >
          <ArrowDown className="w-6 h-6 text-muted" />
        </button>
      </div>
    </section>
  );
}