export type TestimonialItem = {
  id: number;
  text: string;
  name: string;
  designation: string;
  countryFlag: string;
  image: string;
  company: string;
  highlights?: string[];
};

export const testimonialData: TestimonialItem[] = [
  {
    id: 1,
    text: "They transformed our brand design beyond expectations! We’re extremely happy with the results and truly enjoyed working with their creative and professional team.",
    name: "Md. Rowshan Khan",
    designation: "General Manager, EMACO Global LLC",
    company: "EMACO Global LLC",
    countryFlag: "🇺🇸",
    image: "/assets/img/clients/rs.jpeg",
    highlights: ["brand design", "creative and professional team"],
  },
  {
    id: 2,
    text: "Really happy with the service. The team delivered a modern, user-friendly website with great attention to detail. Their professionalism and creativity made the whole experience smooth and satisfying.",
    name: "Noor Ahmed",
    designation: "Director, Bright Balustrading",
    company: "Bright Balustrading",
    countryFlag: "🇲🇾",
    image: "/assets/img/clients/no.jpeg",
    highlights: [
      "modern, user-friendly website",
      "professionalism and creativity",
    ],
  },
  {
    id: 3,
    text: "I’m very satisfied with their social media management. They handle everything professionally—from content creation to page growth. Their support made my online presence stronger and more effective.",
    name: "Monirojjaman Howlader",
    designation: "Founder & CEO, Paradise Perfume",
    company: "Paradise Perfume",
    countryFlag: "🇰🇼",
    image: "/assets/img/clients/mo.jpeg",
    highlights: ["social media management", "online presence"],
  },
  {
    id: 4,
    text: "I am impressed by Next IT Agency. They deliver quality branding with a creative and professional approach. I worked with them and had a very satisfying experience.",
    name: "Robiul Islam",
    designation: "Founder & CEO, Kids Baby Palace",
    company: "Kids Baby Palace",
    countryFlag: "🇧🇩",
    image: "/assets/img/clients/rb.jpeg",
    highlights: ["quality branding", "creative and professional approach"],
  },
  {
    id: 5,
    text: "They consistently deliver high-quality social media post designs every month. The creativity, consistency, and attention to detail are impressive. We’re very happy with the results and love working with their talented team.",
    name: "Al Mahmud Jito",
    designation: "Founder & CEO, Madina Scale & Co.",
    company: "Madina Scale & Co.",
    countryFlag: "🇧🇩",
    image: "/assets/img/clients/ji.jpeg",
    highlights: [
      "high-quality social media post designs",
      "creativity, consistency, and attention to detail",
    ],
  },
];
