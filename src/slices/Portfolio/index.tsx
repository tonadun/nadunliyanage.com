"use client";

import { Content, ImageField } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { ReactNode, useState } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Props for `Portfolio`.
 */
export type PortfolioProps = SliceComponentProps<Content.PortfolioSlice & {
  id: string;
  slice_type: string;
  variation: string;
}>;

type PortfolioItem = Content.PortfolioSlice["items"][number] & {
  image2?: ImageField | null;
  image3?: ImageField | null;
  image4?: ImageField | null;
};

/**
 * Component for "Portfolio" Slices.
 */
const Portfolio = ({ slice }: PortfolioProps) => {
  // Carousel component for multiple images
  const ImageCarousel = ({ images }: { images: ImageField[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) return null;

    return (
      <div className="relative overflow-hidden rounded-t-xl group">
        {/* Main Image */}
        <div className="relative h-48">
          <PrismicNextImage
            field={images[currentIndex]}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            fallbackAlt=""
          />
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Navigation buttons - only show if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Dots indicator - only show if multiple images */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 lg:py-24"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
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
          <div className="text-lg text-muted max-w-2xl mx-auto">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slice.items.map((item: PortfolioItem, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* Project Images Carousel */}
              <ImageCarousel
                images={[
                  item.image,
                  ...(item.image2 ? [item.image2] : []),
                  ...(item.image3 ? [item.image3] : []),
                  ...(item.image4 ? [item.image4] : []),
                ].filter((img): img is ImageField => img != null)}
              />

              <CardHeader>
                <CardTitle className="text-xl">
                  <PrismicRichText
                    field={item.title}
                    components={{
                      heading1: ({ children }) => <>{children}</>,
                      heading2: ({ children }) => <>{children}</>,
                      heading3: ({ children }) => <>{children}</>,
                    }}
                  />
                </CardTitle>
                <CardDescription className="text-muted">
                  <PrismicRichText
                    field={item.description}
                    components={{
                      paragraph: ({ children }) => <span>{children}</span>,
                    }}
                  />
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <PrismicRichText
                    field={item.technologies}
                    components={{
                      paragraph: ({ children }) => {
                        // Convert rich text content to plain text
                        const extractText = (node: ReactNode): string => {
                          if (typeof node === 'string') return node;
                          if (typeof node === 'number') return node.toString();
                          if (Array.isArray(node)) return node.map(extractText).join('');
                          if (node && typeof node === 'object' && 'props' in node) {
                            const element = node as { props?: { children?: ReactNode } };
                            return element.props?.children ? extractText(element.props.children) : '';
                          }
                          return '';
                        };

                        const textContent = extractText(children);
                        const technologies = textContent.split(',').filter(tech => tech.trim()).map(tech => tech.trim());

                        return (
                          <>
                            {technologies.map((tech: string, techIndex: number) => (
                              <Badge key={techIndex} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </>
                        );
                      },
                    }}
                  />
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <PrismicNextLink field={item.link} className="w-full">
                  <Button variant="outline" className="w-full group/btn">
                    <ExternalLink className="w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110" />
                    View Project
                  </Button>
                </PrismicNextLink>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;