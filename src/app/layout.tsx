import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CinematicMotionProvider } from "@/components/scroll/CinematicMotionProvider";

import { PageTransitionProvider } from "@/components/scroll/PageTransitionProvider";
import { OrganizationSchemaMarkup, WebSiteSchemaMarkup, LocalBusinessSchemaMarkup } from "@/components/seo/SchemaMarkup";








const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://learn2compile.com"),
  title: {
    default: "L2C Web Studio | Build For Growth",
    template: "%s | L2C Web Studio",
  },
  description:
    "Premium websites designed to build trust, attract customers, and drive business growth.",
  keywords: [
    "web development India",
    "premium UI design",
    "cinematic websites",
    "startup websites",
    "wedding planner websites",
    "restaurant websites",
    "business website development",
    "responsive web design",
    "digital studio India",
  ],
  authors: [{ name: "L2C Web Studio" }],
  creator: "L2C Web Studio",
  publisher: "L2C Web Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://learn2compile.com",
    siteName: "L2C Web Studio",
    title: "L2C Web Studio | Build For Growth",
    description:
      "Premium websites designed to build trust, attract customers, and drive business growth.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "L2C Web Studio - Premium Digital Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "L2C Web Studio | Build For Growth",
    description:
      "Premium websites designed to build trust, attract customers, and drive business growth.",
    site: "@learn2compile",
    creator: "@learn2compile",
    images: ["/og-default.png"],
  },
  appleWebApp: {
    title: "L2C Web Studio",
    statusBarStyle: "black-translucent",
    startupImage: ["/og-default.png"],
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

// Google Analytics placeholder - replace G-XXXXXXXXXX with actual ID
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <OrganizationSchemaMarkup />
        <WebSiteSchemaMarkup />
        <LocalBusinessSchemaMarkup />
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { page_path: window.location.pathname });
`,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <CinematicMotionProvider />
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
