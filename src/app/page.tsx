import Pricing from "@/components/common/Pricing";
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
      </main>

      <Footer />
    </>
  );
}
