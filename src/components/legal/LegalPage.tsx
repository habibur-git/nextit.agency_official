import Link from "next/link";
import Footer from "../layout/footer/Footer";
import Header from "../layout/header/Header";

export interface LegalSection {
  heading: string;
  content: string | string[];
}

export interface LegalPageProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
  relatedLinks: { label: string; href: string }[];
}

export default function LegalPage({
  title,
  subtitle,
  lastUpdated,
  sections,
  relatedLinks,
}: LegalPageProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white mt-12">
        {/* Hero */}
        <section className="border-b border-black/8 pb-16 pt-24">
          <div className="container mx-auto max-w-3xl px-6">
            <p className="mb-4 text-sm text-desc">
              Last updated: {lastUpdated}
            </p>
            <h1 className="font-title text-h1 font-medium text-title">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-desc">{subtitle}</p>
            {/* Related links */}
            <div className="mt-8 flex flex-wrap gap-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-black/15 px-4 py-1.5 text-sm text-desc transition hover:border-black/30 hover:text-title"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto max-w-3xl px-6">
            <div className="space-y-12">
              {sections.map((section, i) => (
                <div key={i} className="group">
                  <div className="mb-4 flex items-start gap-4">
                    <span className="mt-1 min-w-8 text-sm font-medium text-desc">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-title text-xl font-medium text-title">
                      {section.heading}
                    </h2>
                  </div>
                  <div className="pl-12">
                    {Array.isArray(section.content) ? (
                      <ul className="space-y-3">
                        {section.content.map((item, j) => (
                          <li key={j} className="flex gap-3 text-desc">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-title/30" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="leading-relaxed text-desc">
                        {section.content}
                      </p>
                    )}
                  </div>
                  {i < sections.length - 1 && (
                    <div className="mt-12 border-b border-black/8" />
                  )}
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="mt-20 rounded-3xl bg-title px-8 py-10 text-white">
              <p className="text-sm uppercase tracking-widest text-white/50">
                Questions?
              </p>
              <h3 className="mt-2 font-title text-2xl font-medium">
                Reach out anytime.
              </h3>
              <p className="mt-2 text-white/70">
                If you have questions about any of our policies, we&apos;re
                happy to clarify.
              </p>
              <a
                href="mailto:info@nextit.agency"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-title transition hover:bg-white/90"
              >
                info@nextit.agency
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
