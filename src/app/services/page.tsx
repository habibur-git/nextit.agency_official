import Pricing from "@/components/common/Pricing";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Faq from "@/components/ui/Faq";
import Testimonials from "@/components/ui/Testimonials";
import Services from "@/components/ui/home/Services";
import Hero from "@/components/ui/services/Hero";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "UI/UX Design & Full-Stack Development Services for SaaS Startups",

  description:
    "DevioNex offers UI/UX design, website design, mobile app design, custom web app design, and full-stack Next.js development for SaaS founders and startups in the USA and Europe. Production-ready in 2–4 weeks.",

  keywords: [
    "UI/UX design services",
    "full-stack development services",
    "SaaS design services",
    "Next.js development services",
    "MVP design and development services",
    "website design for startups",
    "mobile app design services",
    "SaaS dashboard design services",
    "web app design agency",
    "startup product design services",
  ],

  alternates: {
    canonical: "https://devionex.com/services",
  },

  openGraph: {
    title: "UI/UX Design & Full-Stack Development Services | DevioNex",
    description:
      "UI/UX design, website design, mobile app design, and full-stack Next.js development for SaaS founders and startups. Production-ready in 2–4 weeks.",
    url: "https://devionex.com/services",
    siteName: "DevioNex",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevioNex Services — UI/UX Design & Full-Stack Development",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "UI/UX Design & Full-Stack Development Services | DevioNex",
    description:
      "UI/UX design, website design, mobile app design, and full-stack Next.js development for SaaS founders. Production-ready in 2–4 weeks.",
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
  "@type": "Service",
  name: "UI/UX Design & Full-Stack Development",
  url: "https://devionex.com/services",
  provider: {
    "@type": "Organization",
    name: "DevioNex",
    url: "https://devionex.com",
    logo: "https://devionex.com/assets/img/logo.svg",
    email: "info@nextit.agency",
  },
  description:
    "DevioNex provides UI/UX design, website design, mobile app design, custom web app design, and full-stack Next.js development for SaaS founders and startups in the USA and Europe.",
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "Canada" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Design & Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UI/UX Design",
          description:
            "User research, user flow mapping, high-fidelity UI design, interactive prototyping, and design systems.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Design & Development",
          description:
            "Conversion-focused landing pages, responsive web design, SEO-optimized layouts, and CMS integration.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile App Design",
          description:
            "iOS and Android native UI, mobile-first design systems, onboarding flows, and developer-ready handoff.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Web App Design",
          description:
            "SaaS dashboard UX, data visualization, complex user workflows, and scalable component libraries.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full-Stack Development",
          description:
            "Next.js and React engineering, Node.js API development, database design, and deployment infrastructure.",
        },
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <Script
        id="services-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <Hero />
      <Services variant="v2" />
      <Pricing />
      <Testimonials />
      <Faq faqKey="services" />
      <Footer />
    </>
  );
}
