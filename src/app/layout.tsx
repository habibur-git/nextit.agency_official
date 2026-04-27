import PageLoader from "@/components/common/PageLoader";
import ScrollTopBehavior from "@/components/common/ScrollTopBehavior";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Onest, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Bricolage_Grotesque({
  variable: "--title-font",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const poppins = Onest({
  variable: "--body-font",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  variable: "--ex-font",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://NextIT.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "UI/UX Design & Web Development Agency for SaaS Startups | NextIT",
    template: "%s | NextIT",
  },

  description:
    "NextIT is a UI/UX design and full-stack development agency for SaaS founders and startups in the USA and Europe. We ship senior-level design and production-ready Next.js code in 2–4 weeks. No fluff.",

  keywords: [
    "UI/UX design agency",
    "web development agency for startups",
    "SaaS design agency",
    "Next.js development agency",
    "MVP design and development",
    "startup UI/UX design",
    "full-stack development agency",
    "mobile app design agency",
    "SaaS dashboard design",
    "NextIT",
  ],

  authors: [{ name: "NextIT", url: siteUrl }],
  creator: "NextIT",
  publisher: "NextIT",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "NextIT",
    title: "UI/UX Design & Web Development Agency for SaaS Startups | NextIT",
    description:
      "Senior-level UI/UX design and production-ready Next.js development for SaaS founders and startups in the USA and Europe. Shipped in 2–4 weeks.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NextIT — UI/UX Design & Web Development Agency for SaaS Startups",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "UI/UX Design & Web Development Agency for SaaS Startups | NextIT",
    description:
      "Senior-level UI/UX design and production-ready Next.js development for SaaS founders and startups. Shipped in 2–4 weeks. No fluff.",
    images: ["/og-image.png"],
    creator: "@NextIT",
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  manifest: "/site.webmanifest",

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

  verification: {
    google: "PBn5xEXe33I_WUV7vfAZza6U7IcALJfkCjX2vuFX3dk",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NextIT",
  url: siteUrl,
  logo: `${siteUrl}/assets/img/logo.svg`,
  description:
    "NextIT is a UI/UX design and full-stack development agency for SaaS founders and startups in the USA and Europe.",
  email: "info@nextit.agency",
  foundingDate: "2024",
  areaServed: ["US", "GB", "EU"],
  sameAs: [
    "https://www.linkedin.com/company/NextIT",
    "https://www.behance.net/NextIT",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@nextit.agency",
    contactType: "customer service",
    availableLanguage: "English",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={[
          inter.variable,
          poppins.variable,
          playfair.variable,
          "antialiased",
        ].join(" ")}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3BTXPRQXSK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3BTXPRQXSK', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <PageLoader />
        <ScrollTopBehavior />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
