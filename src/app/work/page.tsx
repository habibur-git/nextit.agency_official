import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import FilterPortfolio from "@/components/ui/Portfolio/FilterPortfolio";
import Hero from "@/components/ui/Portfolio/Hero";
import { fetchWorkList } from "@/lib/work-api";
import type { Metadata } from "next";
import Script from "next/script";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Work — UI/UX Design & Development Portfolio",

  description:
    "Browse DevioNex's portfolio of UI/UX design, SaaS dashboards, landing pages, mobile apps, and full-stack web applications built for startups and founders across the USA and Europe.",

  keywords: [
    "UI/UX design portfolio",
    "SaaS design case studies",
    "web development portfolio",
    "startup product design examples",
    "Next.js development portfolio",
    "mobile app design portfolio",
    "landing page design portfolio",
    "DevioNex portfolio",
  ],

  alternates: {
    canonical: "https://devionex.com/work",
  },

  openGraph: {
    title: "Our Work — UI/UX Design & Development Portfolio | DevioNex",
    description:
      "Browse our portfolio of UI/UX design, SaaS dashboards, landing pages, mobile apps, and full-stack web applications built for startups across the USA and Europe.",
    url: "https://devionex.com/work",
    siteName: "DevioNex",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevioNex Portfolio — UI/UX Design & Development Projects",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Our Work — UI/UX Design & Development Portfolio | DevioNex",
    description:
      "UI/UX design, SaaS dashboards, landing pages, and full-stack web apps built for startups across the USA and Europe.",
    images: ["/og-image.png"],
    creator: "@devionex",
  },

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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "DevioNex Portfolio",
  url: "https://devionex.com/work",
  description:
    "A collection of UI/UX design, SaaS dashboards, landing pages, mobile apps, and full-stack web applications built by DevioNex for startups and founders.",
  publisher: {
    "@type": "Organization",
    name: "DevioNex",
    url: "https://devionex.com",
    logo: "https://devionex.com/assets/img/logo.svg",
  },
};

export default async function WorkPage() {
  let workItems: Awaited<ReturnType<typeof fetchWorkList>> = [];
  try {
    workItems = await fetchWorkList();
  } catch (error) {
    console.error("[Portfolio] Failed to fetch work list:", error);
  }

  return (
    <>
      <Script
        id="work-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        <Header />
        <Hero />
        <FilterPortfolio
          basePath="/work"
          filterVariant="reference"
          layoutVariant="grid-1"
          items={workItems}
        />
        <Footer />
      </main>
    </>
  );
}
