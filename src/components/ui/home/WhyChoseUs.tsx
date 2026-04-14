import { ModuleTitle } from "@/components/common/ModuleTitle";
import {
  Bolt,
  CircleDollarSign,
  Handshake,
  Target,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

const FEATURE_ITEMS = [
  {
    icon: Target,
    title: "Result-Driven Strategy",
    description:
      "Every campaign and build decision is aligned with clear business goals and measurable outcomes.",
  },
  {
    icon: Target,
    title: "Result-Driven Strategy",
    description:
      "Every campaign and build decision is aligned with clear business goals and measurable outcomes.",
  },
  {
    icon: Bolt,
    title: "Fast Delivery",
    description:
      "Lean workflow and agile execution help us launch projects quickly without compromising quality.",
  },
  {
    icon: CircleDollarSign,
    title: "Affordable Pricing",
    description:
      "Flexible plans designed to maximize value for startups and growing businesses at every stage.",
  },
  {
    icon: TrendingUp,
    title: "Smart Marketing Approach",
    description:
      "Data-led marketing strategies that improve visibility, conversions, and long-term growth.",
  },
  {
    icon: Handshake,
    title: "Dedicated Support",
    description:
      "A responsive team that stays with you post-launch for updates, guidance, and continuous improvement.",
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
            title="**Why Choose Us**"
            ctaText="Get a Free Quote"
            variant="v2"
          />

          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <article className="relative overflow-hidden rounded-3xl border border-white/10 p-7 lg:col-span-2 lg:row-span-2">
              <Image
                src="/assets/img/team/group-work.webp"
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
