import Breadcrumb from "@/components/common/Breadcrumb";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Contact from "@/components/ui/contact/ContactForm";
import ContactLeftCol from "@/components/ui/contact/ContactLeftCol";
import ContactLocation from "@/components/ui/contact/ContactLocation";
import Testimonials from "@/components/ui/Testimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact NextIT — Start Your Project",

  description:
    "Got a project? Tell us about your idea and our senior team will respond within 24 hours. No juniors, no hidden fees, no fluff. Email us at info@nextit.agency.",

  keywords: [
    "contact NextIT",
    "hire UI/UX design agency",
    "start a project with NextIT",
    "get a quote UI/UX design",
    "web development agency contact",
    "SaaS design agency inquiry",
  ],

  alternates: {
    canonical: "https://NextIT.com/contact",
  },

  openGraph: {
    title: "Contact NextIT — Start Your Project",
    description:
      "Tell us about your project and our senior team will respond within 24 hours. No juniors, no hidden fees. UI/UX design and full-stack development for SaaS founders.",
    url: "https://NextIT.com/contact",
    siteName: "NextIT",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact NextIT — UI/UX Design & Development Agency",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact NextIT — Start Your Project",
    description:
      "Tell us about your project and our senior team will respond within 24 hours. No juniors, no hidden fees.",
    images: ["/og-image.png"],
    creator: "@NextIT",
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

export default function ContactPage() {
  return (
    <>
      <Header />
      <Breadcrumb title="Contact Us" />
      <main>
        <section className="space">
          <div className="container">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
              <ContactLeftCol />
              <Contact formColumnClassName="lg:col-span-8" />
            </div>
          </div>
        </section>
        <Testimonials />
        <ContactLocation />
      </main>
      <Footer />
    </>
  );
}
