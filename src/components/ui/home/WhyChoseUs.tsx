import { ModuleTitle } from "@/components/common/ModuleTitle";
import {
  Bolt,
  CircleDollarSign,
  Globe,
  Handshake,
  Target,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

const FEATURE_ITEMS = [
  {
    icon: TrendingUp,
    title: "Results You Can Measure",
    description:
      "Every campaign, design decision, and line of code is tied to measurable business goals, KPIs, and transparent reporting.",
  },

  {
    icon: Bolt,
    title: "Fast Turnaround, Zero Compromises",
    description:
      "Our agile workflow helps launch projects faster than industry standards without compromising quality or execution.",
  },

  {
    icon: CircleDollarSign,
    title: "Flexible Pricing for Every Stage",
    description:
      "Pricing packages tailored to maximize value for startups, SMEs, and scaling enterprises at every growth stage.",
  },

  {
    icon: Target,
    title: "Strategy-First, Always",
    description:
      "We research your market, competitors, and audience before execution to ensure smarter, more effective decisions.",
  },

  {
    icon: Handshake,
    title: "A Team That Stays With You",
    description:
      "Ongoing support, optimization, and consultation that continue improving your brand long after launch.",
  },

  {
    icon: Globe,
    title: "Global Experience, Local Understanding",
    description:
      "Trusted by businesses worldwide with international-quality work tailored to diverse markets and customer behavior.",
  },
];

export default function WhyChoseUs() {
  const smallCards = FEATURE_ITEMS.slice(1);

  return (
    <section className="relative space ">
      <div className="container">
        <div className="container">
          <ModuleTitle
            suppertitle="Why Choose Us"
            title="**Why 100+ Businesses Trust Next IT as Their Growth Partner**"
            ctaText="Get a Free Quote"
            variant="v2"
          />

          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <article className="relative overflow-hidden rounded-3xl border border-white/10 p-7 lg:col-span-2 lg:row-span-2">
              <Image
                src="/assets/img/team/group-work.avif"
                alt="Why Choose Us"
                fill
                className="object-cover transition-all duration-1000 ease-in-out"
                priority
              />
            </article>

            {smallCards.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-white/10 bg-bg p-5 transition-colors duration-300 hover:border-theme/40"
              >
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-theme">
                  <Icon className="h-5 w-5" />
                </span>
                <h5 className="text-theme">{title}</h5>
                <p className="mt-2 leading-relaxed text-white/70">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
