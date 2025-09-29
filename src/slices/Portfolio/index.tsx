import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

/**
 * Props for `Portfolio`.
 */
export type PortfolioProps = SliceComponentProps<Content.PortfolioSlice & {
  id: string;
  slice_type: string;
  variation: string;
}>;

/**
 * Component for "Portfolio" Slices.
 */
const Portfolio = ({ slice }: PortfolioProps) => {
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
          {slice.items.map((item, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-t-xl">
                <PrismicNextImage
                  field={item.image}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  fallbackAlt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

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
                  <PrismicRichText field={item.description} />
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <PrismicRichText
                    field={item.technologies}
                    components={{
                      paragraph: ({ children }) => (
                        <>
                          {children?.toString().split(',').map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs">
                              {tech.trim()}
                            </Badge>
                          ))}
                        </>
                      ),
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