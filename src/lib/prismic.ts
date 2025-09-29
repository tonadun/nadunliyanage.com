import { createClient } from "../../prismicio";
import type { Content } from "@prismicio/client";

/**
 * Fetches the homepage document from Prismic
 */
export async function getHomepage(): Promise<Content.HomepageDocument | null> {
  const client = createClient();

  try {
    const homepage = await client.getSingle("homepage");
    return homepage;
  } catch (error) {
    console.error("Error fetching homepage from Prismic:", error);
    return null;
  }
}

/**
 * Utility to safely get image URL from Prismic image field
 */
export function getPrismicImageUrl(image: { url?: string } | null | undefined): string | null {
  return image?.url || null;
}

/**
 * Utility to safely get image alt text from Prismic image field
 */
export function getPrismicImageAlt(image: { alt?: string } | null | undefined): string {
  return image?.alt || "";
}