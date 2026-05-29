/**
 * Learn2Compile JSON-LD Schema System
 * Lightweight, SEO-safe structured data implementations
 */

import { SITE_NAME, SITE_URL, CONTACT_INFO, SERVICES } from "./config";

/**
 * Organization Schema
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Premium Indian digital studio crafting cinematic websites for startups, wedding planners, restaurants, and modern businesses.",
    email: CONTACT_INFO.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    sameAs: [
      "https://instagram.com/learn2compile",
      "https://x.com/learn2compile",
      "https://linkedin.com/company/learn2compile",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${CONTACT_INFO.whatsapp}`,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

/**
 * LocalBusiness Schema (simplified for service business)
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    image: `${SITE_URL}/og-default.png`,
    url: SITE_URL,
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "19.0760",
      longitude: "72.8777",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$",
    serviceType: SERVICES,
  };
}

/**
 * Service Schema for web development offerings
 */
export function getServiceSchemas() {
  const serviceList = [
    {
      name: "Custom Website Development",
      description:
        "Premium custom website development with cinematic UI, responsive design, and conversion-focused architecture.",
      url: `${SITE_URL}/services`,
    },
    {
      name: "E-commerce Solutions",
      description:
        "Full-featured e-commerce websites with beautiful product displays, secure payments, and inventory management.",
      url: `${SITE_URL}/services`,
    },
    {
      name: "Wedding Planner Websites",
      description:
        "Stunning, romantic websites for wedding planners with gallery showcases, RSVP features, and elegant animations.",
      url: `${SITE_URL}/services`,
    },
    {
      name: "Restaurant Websites",
      description:
        "Modern restaurant websites with menu displays, table reservations, and appetizing visual presentations.",
      url: `${SITE_URL}/services`,
    },
    {
      name: "Startup Landing Pages",
      description:
        "High-converting landing pages for startups with bold visuals, clear CTAs, and growth-focused engineering.",
      url: `${SITE_URL}/services`,
    },
  ];

  return serviceList.map(
    (service) =>
      ({
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        url: service.url,
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${service.name} Packages`,
        },
      } as const)
  );
}

/**
 * WebSite Schema with Search Action
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Premium Indian digital studio crafting cinematic websites for modern businesses.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * BreadcrumbList Schema for page hierarchy
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * FAQPage Schema for FAQ content
 */
export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(
      (faq) =>
        ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        } as const)
    ),
  };
}

/**
 * CollectionPage Schema for Portfolio
 */
export function getCollectionPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Learn2Compile Portfolio",
    description:
      "Explore our curated collection of premium websites and digital experiences.",
    url: `${SITE_URL}/portfolio`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/**
 * SoftwareApplication Schema (for any tool offerings)
 */
export function getSoftwareSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Learn2Compile Website Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    url: SITE_URL,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
    },
  };
}
