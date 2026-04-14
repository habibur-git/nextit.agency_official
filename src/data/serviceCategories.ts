interface ServiceItem {
  title: string;
  slug: string;
}

interface ServiceCategory {
  slug?: string;
  title: string;
  items: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    title: "Design",
    items: [
      {
        title: "UI/UX Design",
        slug: "ui-ux-design",
      },
      {
        title: "Website Design",
        slug: "website-design",
      },
      {
        title: "Mobile App Design",
        slug: "mobile-app-design",
      },
      {
        title: "SaaS Design",
        slug: "saas-design",
      },
      {
        title: "E-commerce Design",
        slug: "e-commerce-design",
      },
    ],
  },
  {
    title: "Development",
    items: [
      {
        title: "Web Development",
        slug: "web-development",
      },
      {
        title: "Mobile App Development",
        slug: "mobile-app-development",
      },
      {
        title: "Web Application Development",
        slug: "web-application-development",
      },
      {
        title: "SaaS Development",
        slug: "saas-development",
      },
      {
        title: "E-commerce Development",
        slug: "ecommerce-development",
      },
    ],
  },
];
