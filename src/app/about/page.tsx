import Introduction from "@/components/common/Introduction";
import Team from "@/components/common/Team";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Faq from "@/components/ui/Faq";
import Testimonials from "@/components/ui/Testimonials";
import Hero from "@/components/ui/about/Hero";

export default function AboutPage() {
  return (
    <>
      <Header />
      <Hero />
      <Introduction />
      <Team />
      <Testimonials />
      <Faq faqKey="home" />
      <Footer />
    </>
  );
}
