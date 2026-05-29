/**
 * Learn2Compile Schema Markup Component
 * Renders JSON-LD structured data in the document head
 */

"use client";

interface SchemaMarkupProps {
  schemas: object | object[];
}

/**
 * SchemaMarkup Component
 * Injects JSON-LD schema data into the page
 *
 * Usage:
 * <SchemaMarkup schemas={[getOrganizationSchema(), getWebSiteSchema()]} />
 */
export function SchemaMarkup({ schemas }: SchemaMarkupProps) {
  const schemaArray = Array.isArray(schemas) ? schemas : [schemas];
  const jsonLd = schemaArray.length === 1 ? schemaArray[0] : { "@graph": schemaArray };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Organization Schema Only
 */
export function OrganizationSchemaMarkup() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Learn2Compile",
          url: "https://learn2compile.com",
          logo: "https://learn2compile.com/logo.png",
          description:
            "Premium Indian digital studio crafting cinematic websites for startups, wedding planners, restaurants, and modern businesses.",
          email: "hello@learn2compile.com",
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
        }),
      }}
    />
  );
}

/**
 * WebSite Schema with Search Action
 */
export function WebSiteSchemaMarkup() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Learn2Compile",
          url: "https://learn2compile.com",
          description:
            "Premium Indian digital studio crafting cinematic websites for modern businesses.",
          publisher: {
            "@type": "Organization",
            name: "Learn2Compile",
            url: "https://learn2compile.com",
          },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://learn2compile.com/?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }),
      }}
    />
  );
}

/**
 * LocalBusiness Schema
 */
export function LocalBusinessSchemaMarkup() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Learn2Compile",
          image: "https://learn2compile.com/og-default.png",
          url: "https://learn2compile.com",
          telephone: "+91-9876543210",
          email: "hello@learn2compile.com",
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
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
          priceRange: "$$",
          serviceType: [
            "Custom Website Development",
            "E-commerce Solutions",
            "Wedding Planner Websites",
            "Restaurant Websites",
            "Startup Landing Pages",
          ],
        }),
      }}
    />
  );
}

/**
 * FAQ Schema for FAQ pages
 */
export function FAQSchemaMarkup({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }),
      }}
    />
  );
}

/**
 * Breadcrumb Schema
 */
export function BreadcrumbSchemaMarkup({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        }),
      }}
    />
  );
}