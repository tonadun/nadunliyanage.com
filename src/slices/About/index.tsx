"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Mail, MapPin, Grid, Cloud } from "lucide-react";
import { useState } from "react";
import { TagCloud } from "react-tagcloud";

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 */
const About = ({ slice }: AboutProps) => {
  const [isWordCloud, setIsWordCloud] = useState(false);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 lg:py-24 bg-surface/50"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image and Contact */}
          <div className="text-center lg:text-left">
            <div className="relative mb-8">
              {/* Large Avatar */}
              <div className="relative w-64 h-64 mx-auto lg:mx-0 mb-6">
                <PrismicNextImage
                  field={slice.primary.avatar}
                  className="w-full h-full object-cover rounded-full border-4 border-surface shadow-xl"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/20 to-transparent" />
              </div>

              {/* Quick Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-muted">
                  <MapPin className="w-4 h-4" />
                  <span>Manchester (UK)</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-muted">
                  <Mail className="w-4 h-4" />
                  <span>hello@nadunliyanage.com</span>
                </div>
              </div>

              {/* Resume Download */}
              <div className="mt-6">
                <PrismicNextLink field={slice.primary.resume_link}>
                  <Button className="w-full sm:w-auto">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                </PrismicNextLink>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            {/* Heading */}
            <div className="mb-8">
              <PrismicRichText
                field={slice.primary.heading}
                components={{
                  heading1: ({ children }) => (
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-foreground mb-4">
                      {children}
                    </h2>
                  ),
                }}
              />
              <div className="text-lg text-muted leading-relaxed">
                <PrismicRichText field={slice.primary.description} />
              </div>
            </div>

            {/* Skills Section */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-surface-foreground">
                    Skills & Technologies
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant={!isWordCloud ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setIsWordCloud(false)}
                      className="h-8 px-3"
                    >
                      <Grid className="w-4 h-4 mr-1" />
                      Grid
                    </Button>
                    <Button
                      variant={isWordCloud ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setIsWordCloud(true)}
                      className="h-8 px-3"
                    >
                      <Cloud className="w-4 h-4 mr-1" />
                      Cloud
                    </Button>
                  </div>
                </div>

                <PrismicRichText
                  field={slice.primary.skills}
                  components={{
                    paragraph: ({ children }) => {
                      // Convert rich text content to plain text
                      const extractText = (node: any): string => {
                        if (typeof node === 'string') return node;
                        if (Array.isArray(node)) return node.map(extractText).join('');
                        if (node && typeof node === 'object' && node.props?.children) {
                          return extractText(node.props.children);
                        }
                        return '';
                      };

                      const textContent = extractText(children);
                      const skills = textContent.split(',').filter(skill => skill.trim()).map(skill => skill.trim());

                      if (isWordCloud) {
                        // Create data for word cloud
                        const cloudData = skills.map((skill) => ({
                          value: skill,
                          count: Math.random() * 50 + 20, // Random size between 20-70
                        }));

                        return (
                          <div className="min-h-[200px] bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg p-4">
                            <TagCloud
                              minSize={12}
                              maxSize={35}
                              tags={cloudData}
                              className="w-full h-full"
                              colorOptions={{
                                luminosity: 'light',
                                hue: 'blue'
                              }}
                              onClick={(tag: any) => console.log('Clicked:', tag.value)}
                            />
                          </div>
                        );
                      } else {
                        // Badge view
                        return (
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill: string, skillIndex: number) => (
                              <Badge
                                key={skillIndex}
                                variant="default"
                                className="text-sm px-3 py-1 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 transition-all duration-200"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        );
                      }
                    },
                  }}
                />
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl border border-accent/20">
              <h4 className="text-lg font-semibold text-surface-foreground mb-2">
                Let&apos;s work together!
              </h4>
              <p className="text-muted mb-4">
                I&apos;m always interested in new opportunities and exciting projects.
              </p>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;