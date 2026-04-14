export type HomeServiceSlide = {
  backgroundClass: string;
  indexLabel: string;
  projectLabel: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  bullets: string[];
};

export const homeServiceSlides: HomeServiceSlide[] = [
  {
    backgroundClass: "bg-[#3f2fe1]",
    indexLabel: "01",
    projectLabel: "10+ Projects",
    title: "UI/UX Design",
    description:
      "We translate strategy into clear flows, polished interfaces, and systems your team can own. From discovery to high-fidelity handoff, every screen is built for usability and conversion.",
    imageSrc: "/assets/img/service/uiux.webp",
    imageAlt: "UI/UX design project showcase",
    bullets: [
      "UX Research & Audits",
      "User Flow Mapping",
      "High-Fidelity UI Design",
      "Interactive Prototyping",
      "Design Systems",
      "Usability Testing",
    ],
  },
  {
    backgroundClass: "bg-[#171717]",
    indexLabel: "02",
    projectLabel: "12+ Projects",
    title: "Website Design",
    description:
      "Marketing sites and product landing pages that load fast, rank well, and turn visitors into leads. We pair crisp visual design with solid information architecture and performance-minded execution.",
    imageSrc: "/assets/img/service/website.webp",
    imageAlt: "Website design project",
    bullets: [
      "Conversion-Focused Landing Pages",
      "Responsive Web Design",
      "SEO-Optimized Layouts",
      "Motion & Micro-interactions",
      "CMS Integration (Sanity/Payload)",
      "Performance Optimization",
    ],
  },
  {
    backgroundClass: "bg-[#f55c1a]",
    indexLabel: "03",
    projectLabel: "8+ Projects",
    title: "Mobile App Design",
    description:
      "Native-feeling iOS and Android experiences with consistent patterns and accessible touch targets. We design for long-term retention and seamless user onboarding.",
    imageSrc: "/assets/img/service/mobile-app.webp",
    imageAlt: "Mobile app design project",
    bullets: [
      "iOS & Android Native UI",
      "Mobile-First Design Systems",
      "Onboarding & Growth Loops",
      "App Store Asset Preparation",
      "Cross-Platform Consistency",
      "Developer-Ready Handoff",
    ],
  },
  {
    backgroundClass: "bg-[#6536d7]",
    indexLabel: "04",
    projectLabel: "15+ Projects",
    title: "Custom Web App Design",
    description:
      "Dashboards, SaaS consoles, and internal tools that stay coherent at scale. We design intuitive, data-heavy views that simplify complex workflows for your power users.",
    imageSrc: "/assets/img/service/web-app.webp",
    imageAlt: "Custom web application design",
    bullets: [
      "SaaS Dashboard UX",
      "Data Visualization",
      "Complex User Workflows",
      "B2B Platform Architecture",
      "Role-Based UI Views",
      "Scalable Component Libraries",
    ],
  },
  {
    backgroundClass: "bg-[#00455E]", // Changed to a distinct "Dev" blue
    indexLabel: "05",
    projectLabel: "20+ Projects",
    title: "Full-Stack Development",
    description:
      "We turn designs into production-ready software. Using Next.js, Node.js, and MongoDB, we build secure, scalable backends paired with pixel-perfect, high-performance frontends.",
    imageSrc: "/assets/img/service/full-stack-development.webp",
    imageAlt: "Full-stack development architecture",
    bullets: [
      "Next.js & React Engineering",
      "Node.js API Development",
      "Database Design (SQL/NoSQL)",
      "Third-Party Integrations",
      "Auth & Security Protocols",
      "Deployment & Infrastructure",
    ],
  },
];
