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
      question: "Why should I choose Next IT for my business?",
      answer:
        "Next IT is a professional branding, digital marketing, and web development agency focused on delivering high-quality solutions. With experience working with 200+ clients, our team combines creativity, strategy, and technology to help businesses grow and build strong brands.",
    },
    {
      id: 2,
      question: "Do you work with international clients?",
      answer:
        "Yes. Next IT provides global-standard branding, marketing, and website development services and works with clients from different countries and industries.",
    },
    {
      id: 3,
      question: "How do you ensure the quality of your work?",
      answer:
        "Our team follows a structured work process that includes research, strategy, design, development, review, and optimization. Every project is carefully handled by experienced designers, developers, and marketing specialists.",
    },
    {
      id: 4,
      question: "How can I start working with Next IT?",
      answer:
        "You can easily start by contacting our team through our website, email, or hotline. We will discuss your project requirements and provide a customized solution that fits your business goals.",
    },
    {
      id: 5,
      question: "What is the delivery time and working system?",
      answer:
        "Delivery time depends on the project type and scope. Small design projects may take a few days, while larger projects like branding or website development may take more time. We maintain a clear workflow and keep clients updated throughout the project.",
    },
    {
      id: 6,
      question: "What is the payment process?",
      answer:
        "Next IT follows a transparent payment system. Usually, a partial advance payment is required to start the project, and the remaining payment is completed after the project delivery or according to the agreed project milestones.",
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
