import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { components } from "@/slices";
import { getHomepage } from "@/lib/prismic";

export default async function Index() {
  const page = await getHomepage();

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Prismic Content */}
      {page && (
        <SliceZone slices={page.data.slices} components={components} />
      )}

      {/* Footer */}
      <Footer />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomepage();

  return {
    title: page?.data.meta_title || "Nadun Liyanage - Full Stack Developer",
    description: page?.data.meta_description || "Full-stack developer crafting exceptional digital experiences with modern technologies.",
    openGraph: {
      title: page?.data.meta_title || "Nadun Liyanage - Full Stack Developer",
      description: page?.data.meta_description || "Full-stack developer crafting exceptional digital experiences with modern technologies.",
      images: page?.data.meta_image?.url ? [page.data.meta_image.url] : [],
    },
  };
}