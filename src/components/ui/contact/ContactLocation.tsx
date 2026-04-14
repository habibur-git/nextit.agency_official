"use client";

import { ModuleTitle } from "@/components/common/ModuleTitle";
import { motion } from "framer-motion";
import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const location_data = [
  {
    id: 1,
    img: "/assets/img/bd.webp",
    country: "Bangladesh",
    time: "GMT+6",
    location_title: "Dhaka Office",
    address:
      "H/1, Road-6, Duaripara Bazar, <br /> Rupnagar, Mirpur, Dhaka-1216",
    phone: "(+880) 1690274952",
    email: "info@nextit.agency",
  },
  {
    id: 2,
    img: "/assets/img/ml.jpg",
    country: "Malaysia",
    time: "GMT+8",
    location_title: "Malaysia Office",
    address: "Seri Kembangan, Selangor, <br /> Malaysia 43300",
    phone: "(+880) 1690274952",
    email: "info@nextit.agency",
  },
  {
    id: 3,
    img: "/assets/img/ku.webp",
    country: "Kuwait",
    time: "GMT+3",
    location_title: "Update my location",
    address:
      "Al-Mubarakah: Fahad Al-Basman Heritage Complex, <br /> Ground Floor, Shop No. 16",
    phone: "(+880) 1690274952",
    email: "info@nextit.agency",
  },
];

function mapsSearchUrl(htmlAddress: string): string {
  const plain = htmlAddress.replace(/<br\s*\/?>/gi, " ").replace(/\s+/g, " ").trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(plain)}`;
}

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

export default function ContactLocation() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-black via-[#0a0a0a] to-black py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[480px] w-[80%] rounded-full bg-[radial-gradient(closest-side,rgba(255,207,1,0.06),transparent)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.04),transparent)] blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-[1840px] px-6">
        <ModuleTitle
          suppertitle="Worldwide"
          title="Office locations"
          subtitle="Visit us in person or reach the right team by phone and email."
          variant="v3"
          colorVariant="light"
          className="max-w-2xl mb-12! md:mb-16!"
        />

        <div className="flex flex-col gap-5 md:gap-6">
          {location_data.map((item, index) => (
            <motion.article
              key={item.id}
              {...cardMotion}
              transition={{
                ...cardMotion.transition,
                delay: index * 0.06,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/8 bg-white/2 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-sm transition-colors hover:border-white/12 hover:bg-white/4 md:p-8"
            >
              <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-linear-to-b from-theme via-theme/70 to-transparent opacity-90" />

              <div className="flex flex-col gap-8 pl-3 sm:pl-4 lg:flex-row lg:items-stretch lg:gap-10 xl:gap-14">
                {/* Image */}
                <div className="relative aspect-5/3 w-full shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 transition duration-500 group-hover:ring-white/20 sm:aspect-video lg:aspect-auto lg:h-[min(200px,22vw)] lg:w-[min(100%,320px)] lg:max-w-[320px]">
                  <Image
                    src={item.img}
                    alt={item.country}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 320px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-60" />
                </div>

                {/* Country + timezone */}
                <div className="flex min-w-0 flex-col justify-center gap-4 lg:w-[220px] xl:w-[240px]">
                  <h3 className="font-title text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-[2rem]">
                    {item.country}
                  </h3>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-medium text-white/90">
                    <Clock className="h-3.5 w-3.5 text-theme" strokeWidth={2} />
                    <span className="tracking-wide">{item.time}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-6 border-t border-white/6 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 xl:pl-12">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-theme">
                      <MapPin className="h-4 w-4 shrink-0" strokeWidth={2} />
                      <span className="font-title text-lg font-semibold text-white md:text-xl">
                        {item.location_title}
                      </span>
                    </div>
                    <Link
                      href={mapsSearchUrl(item.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/addr inline-flex max-w-xl flex-col gap-2 text-sm leading-relaxed text-white/70 transition hover:text-white"
                    >
                      <span
                        dangerouslySetInnerHTML={{ __html: item.address }}
                      />
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-theme/90 transition group-hover/addr:text-theme">
                        Open in Google Maps
                        <ExternalLink className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                    <Link
                      href={`tel:${item.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2.5 rounded-xl border border-white/7 bg-white/3 px-4 py-3 text-sm text-white/90 transition hover:border-white/15 hover:bg-white/6"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-theme/15 text-theme">
                        <Phone className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <span className="font-medium">{item.phone}</span>
                    </Link>
                    <Link
                      href={`mailto:${item.email}`}
                      className="inline-flex items-center gap-2.5 rounded-xl border border-white/7 bg-white/3 px-4 py-3 text-sm text-white/90 transition hover:border-white/15 hover:bg-white/6"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-theme/15 text-theme">
                        <Mail className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <span className="font-medium">{item.email}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
