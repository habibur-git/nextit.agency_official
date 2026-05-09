import type { Metadata } from "next";

import Pricing from "@/components/common/Pricing";
import Booker from "@/components/common/BookaCall";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Faq from "@/components/ui/Faq";
import FilterPortfolio from "@/components/ui/Portfolio/FilterPortfolio";
import Testimonials from "@/components/ui/Testimonials";
import Hero from "@/components/ui/hero/Hero";
import AboutUs from "@/components/ui/home/AboutUs";
import ProcessSection from "@/components/ui/home/Process";
import Services from "@/components/ui/home/Services";
import WhyChoseUs from "@/components/ui/home/WhyChoseUs";
import { fetchWorkList } from "@/lib/work-api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "Branding, Digital Marketing & Web Development Agency | Next IT",

  description:
    "Next IT is a full-service branding and digital marketing agency helping businesses worldwide grow through brand identity design, web development, social media management, e-commerce solutions, and performance marketing.",

  alternates: {
    canonical: "https://nextit.agency/",
  },

  openGraph: {
    title: "Next IT - Global Branding, Marketing & Web Agency",
    description:
      "Next IT is a full-service branding and digital marketing agency helping businesses worldwide grow through brand identity design, web development, social media management, e-commerce solutions, and performance marketing.",
    url: "https://nextit.agency/",
    siteName: "Next IT",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Next IT - Global Branding, Marketing & Web Agency",
    description:
      "Next IT is a full-service branding and digital marketing agency helping businesses worldwide grow through brand identity design, web development, social media management, e-commerce solutions, and performance marketing.",
  },
};

export default async function Home() {
  let workItems: Awaited<ReturnType<typeof fetchWorkList>> = [];

  try {
    workItems = await fetchWorkList();
  } catch (error) {
    console.error("[Portfolio] Failed to fetch work list:", error);
  }

  return (
    <>
      <Header variant="auto" />

      <main id="main-content" className="min-w-0 overflow-x-clip">
        <Hero />
        <AboutUs />
        <Services />

        <FilterPortfolio
          basePath="/work"
          filterVariant="reference"
          filter={false}
          items={workItems}
          layoutVariant="grid-1"
          grid1Slice={6}
          showModuleTitle
        />

        <Pricing />
        <WhyChoseUs />
        <ProcessSection data="home" />
        <Testimonials />

        <Faq faqKey="home" />
        <Booker />
      </main>

      <Footer />
    </>
  );
}