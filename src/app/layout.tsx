import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/scroll/LenisProvider";
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
    default: "Learn2Compile | Premium Digital Studio India",
    template: "%s | Learn2Compile",
  },
  description:
    "Premium Indian digital studio crafting cinematic websites for startups, wedding planners, restaurants, and modern businesses.",
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
  authors: [{ name: "Learn2Compile" }],
  creator: "Learn2Compile",
  publisher: "Learn2Compile",
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
    siteName: "Learn2Compile",
    title: "Learn2Compile | Premium Digital Studio India",
    description:
      "Premium Indian digital studio crafting cinematic websites for startups, wedding planners, restaurants, and modern businesses.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Learn2Compile - Premium Digital Studio India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn2Compile | Premium Digital Studio India",
    description:
      "Premium Indian digital studio crafting cinematic websites for startups, wedding planners, restaurants, and modern businesses.",
    site: "@learn2compile",
    creator: "@learn2compile",
    images: ["/og-default.png"],
  },
  appleWebApp: {
    title: "Learn2Compile",
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
      </head>
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <CinematicMotionProvider />
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </LenisProvider>
      </body>

    </html>
  );
}
