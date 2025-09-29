import { createClient } from "../../prismicio";
import type { Content } from "@prismicio/client";

/**
 * Fetches the homepage document from Prismic
 */
export async function getHomepage(): Promise<any | null> {
  const client = createClient();

  try {
    // Try to get homepage type first
    const homepage = await client.getSingle("homepage");
    return homepage;
  } catch (homepageError) {
    console.log("Homepage not found, trying page type...");

    try {
      // Fallback to page type if homepage doesn't exist
      const page = await client.getSingle("page");
      return page;
    } catch (pageError) {
      console.error("Error fetching both homepage and page from Prismic:", { homepageError, pageError });
      return null;
    }
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