export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export type FaqSectionKey = "home" | "aboutus" | "services";

type FaqDataMap = Record<FaqSectionKey, FaqItem[]>;

export const faqData: FaqDataMap = {
  home: [
    {
      id: 1,
      question: "How much does it cost to hire a branding agency?",
      answer:
        "The cost of branding services depends on the project scope, deliverables, and complexity. A complete brand identity package including logo design, brand guidelines, and visual identity systems can range from a few hundred to several thousand dollars. Next IT offers flexible pricing tailored for startups, SMEs, and enterprise businesses.",
    },
    {
      id: 2,
      question: "What digital marketing services does Next IT provide?",
      answer:
        "Next IT provides a full range of digital marketing services including Facebook Ads, Google Ads, SEO, social media management, content marketing, email marketing, and conversion optimization. Every campaign is tailored to your business goals and target audience.",
    },
    {
      id: 3,
      question: "How long does it take to build a website?",
      answer:
        "A standard business website usually takes between 2–4 weeks from design approval to launch. Larger e-commerce stores and custom web platforms may require 4–8 weeks depending on features, integrations, and revision requirements.",
    },
    {
      id: 4,
      question: "Do you work with international clients?",
      answer:
        "Yes. Next IT works with businesses worldwide and delivers global-standard branding, website development, and digital marketing solutions across multiple industries.",
    },
    {
      id: 5,
      question: "How does Next IT ensure project quality?",
      answer:
        "Every project follows a structured process including research, strategy, design, development, testing, and optimization. Our multidisciplinary team ensures quality, consistency, and performance at every stage.",
    },
    {
      id: 6,
      question: "What is the payment and project workflow?",
      answer:
        "Projects usually begin with an advance payment followed by milestone-based payments depending on the scope. We maintain transparent communication, clear timelines, and regular updates throughout the entire process.",
    },
  ],
  aboutus: [
    {
      id: 1,
      question: "What makes Next IT different from other agencies?",
      answer:
        "We combine strategy, creativity, and technology under one roof, so your brand, website, and campaigns work together as a single, consistent experience.",
    },
    {
      id: 2,
      question: "Where is your team based?",
      answer:
        "Our core team is based in Dhaka, with collaborators and partners in other regions so we can support clients across time zones.",
    },
    {
      id: 3,
      question: "How do you measure success?",
      answer:
        "We align on clear KPIs—such as conversions, leads, engagement, or brand awareness—and track them throughout the project with transparent reporting.",
    },
  ],
  services: [
    {
      id: 1,
      question: "Can you handle both design and development?",
      answer:
        "Yes. Our team covers UX/UI design, front‑end and back‑end development, ensuring your brand and product feel cohesive from concept to launch.",
    },
    {
      id: 2,
      question: "Do you offer ongoing support or retainers?",
      answer:
        "We can support you after launch with retainers for website maintenance, performance optimization, content updates, and ongoing marketing campaigns.",
    },
    {
      id: 3,
      question: "What does a typical project timeline look like?",
      answer:
        "Timelines depend on scope, but most branding or website projects range from 4–10 weeks. We’ll give you a clear schedule after discovery.",
    },
    {
      id: 4,
      question: "How much do your services cost?",
      answer:
        "Pricing varies by scope and complexity. After understanding your goals, we’ll share a detailed proposal with investment options that match your priorities.",
    },
  ],
};
