/**
 * Learn2Compile Metadata Builder Utilities
 * Helper functions for generating consistent metadata across pages
 */

import type { Metadata } from "next";
import {
  SITE_NAME,
  SITE_URL,
  SITE_KEYWORDS,
  TWITTER_HANDLE,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  LOCALE,
} from "./config";

/**
 * Get absolute URL from relative path
 */
export function getAbsoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/**
 * Create OpenGraph configuration for a page
 */
export function createOpenGraph(params: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "book" | "profile";
  images?: { url: string; width: number; height: number; alt: string }[];
}) {
  const { title, description, path, type = "website", images } = params;
  const url = getAbsoluteUrl(path);

  return {
    url,
    type,
    title,
    description,
    locale: LOCALE,
    siteName: SITE_NAME,
    images: images
      ? images.map((img) => ({
          url: getAbsoluteUrl(img.url),
          width: img.width,
          height: img.height,
          alt: img.alt,
        }))
      : [
          {
            url: getAbsoluteUrl(DEFAULT_OG_IMAGE),
            width: OG_IMAGE_WIDTH,
            height: OG_IMAGE_HEIGHT,
            alt: `${title} - ${SITE_NAME}`,
          },
        ],
  };
}

/**
 * Create Twitter Card configuration for a page
 */
export function createTwitter(params: {
  title: string;
  description: string;
  path: string;
  images?: string[];
}): Metadata["twitter"] {
  const { title, description, images } = params;

  return {
    card: "summary_large_image",
    title,
    description,
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    images: images
      ? images.map((img) => getAbsoluteUrl(img))
      : [getAbsoluteUrl(DEFAULT_OG_IMAGE)],
  };
}

/**
 * Generate complete metadata object for a page
 */
export function generateMetadata(params: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article" | "book" | "profile";
  ogImages?: { url: string; width: number; height: number; alt: string }[];
  twitterImages?: string[];
  noIndex?: boolean;
}): Metadata {
  const { title, description, path, keywords, type, ogImages, twitterImages, noIndex } = params;

  return {
    title,
    description,
    keywords: keywords ? [...SITE_KEYWORDS, ...keywords] : SITE_KEYWORDS,
    alternates: {
      canonical: getAbsoluteUrl(path),
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    openGraph: createOpenGraph({
      title,
      description,
      path,
      type,
      images: ogImages,
    }),
    twitter: createTwitter({
      title,
      description,
      path,
      images: twitterImages,
    }),
  };
}

/**
 * Page-specific metadata configurations
 */
export const PAGE_METADATA = {
  home: {
    title: "Build Future-Ready Digital Experiences",
    description:
      "Premium Indian digital studio crafting cinematic websites with immersive 3D, motion systems, and conversion-focused engineering for modern businesses.",
    keywords: ["digital studio", "futuristic web design", "3D websites", "immersive UI"],
  },
  services: {
    title: "Web Development Services India",
    description:
      "Premium web development services for startups, wedding planners, restaurants, and businesses. Stunning UI, fast performance, and SEO-optimized solutions.",
    keywords: [
      "web development services India",
      "business websites",
      "wedding planner websites",
      "restaurant websites",
      "startup websites",
    ],
  },
  portfolio: {
    title: "Premium Website Portfolio",
    description:
      "Explore our curated collection of cinematic websites and digital experiences. From wedding planners to startups, discover what's possible with premium design.",
    keywords: ["website portfolio", "web design examples", "premium websites", "cinematic design"],
  },
  about: {
    title: "About Learn2Compile",
    description:
      "Discover Learn2Compile, a premium Indian digital studio crafting cinematic websites for modern businesses. Learn about our craft, philosophy, and commitment to excellence.",
    keywords: ["about Learn2Compile", "digital studio India", "web development team", "premium design studio"],
  },
  pricing: {
    title: "Transparent Pricing Packages",
    description:
      "Clear, honest pricing for premium web development. Choose from Starter, Growth, or Enterprise plans. Interactive calculator and custom quotes available.",
    keywords: ["web development pricing", "website cost India", "transparent pricing", "web design packages"],
  },
  contact: {
    title: "Start Your Project",
    description:
      "Begin your premium digital consultation. Tell us what you're building — we respond with a cinematic, engineering-ready plan within 24 hours.",
    keywords: ["contact Learn2Compile", "start web project", "web development consultation", "India digital studio"],
  },
  faq: {
    title: "Frequently Asked Questions",
    description:
      "Answers to everything about timelines, pricing, technology, SEO, support, hosting, and custom features for your premium digital project.",
    keywords: ["FAQ", "web development questions", "website FAQs", "pricing questions", "timelines"],
  },
  "custom-quote": {
    title: "Get Your Custom Quote",
    description:
      "Start your premium digital project with Learn2Compile. Guided onboarding, transparent scope, and cinematic execution. Get a detailed quote within 24 hours.",
    keywords: ["custom quote", "web development estimate", "project quote", "premium web development cost"],
  },
};
