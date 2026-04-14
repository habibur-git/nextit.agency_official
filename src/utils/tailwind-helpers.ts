/**
 * Tailwind CSS Helper Utilities
 *
 * This file contains helper functions and constants to make
 * Tailwind CSS migration easier and more consistent.
 */

// Common Tailwind class combinations for your project
export const tailwindClasses = {
  // Layout
  container: "container",
  row: "flex flex-wrap -mx-4",
  col: "w-full px-4 flex-shrink-0",
  colLg: (size: number) => `lg:w-${((size / 12) * 100).toFixed(0)}/12`,

  // Typography using your custom design tokens
  title: "text-h1 font-bold text-title mb-4 font-title",
  subtitle: "text-h4 text-body mb-6 font-body",
  sectionTitle: "text-h2 font-bold text-title mb-4 font-title",
  heading1: "text-h1 font-bold text-title font-title",
  heading2: "text-h2 font-bold text-title font-title",
  heading3: "text-h3 font-bold text-title font-title",
  heading4: "text-h4 font-medium text-title font-title",
  heading5: "text-h5 font-medium text-title font-title",
  bodyText: "text-normal text-body font-body",
  smallText: "text-small text-light font-body",

  // Buttons using your custom design tokens
  btnPrimary:
    "bg-theme text-white px-6 py-3 rounded-lg hover:bg-theme/90 transition-colors font-medium font-body",
  btnSecondary:
    "bg-secondary text-title px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors font-medium font-body",
  btnOutline:
    "border border-theme text-theme px-6 py-3 rounded-lg hover:bg-theme hover:text-white transition-colors font-medium font-body",
  btnYellow:
    "bg-yellow text-title px-6 py-3 rounded-lg hover:bg-yellow/90 transition-colors font-medium font-body",

  // Cards using your custom design tokens
  card: "bg-white rounded-lg shadow-md p-6 border border-border",
  cardHover:
    "bg-white rounded-lg shadow-md p-6 border border-border hover:shadow-lg transition-shadow",
  cardSmoke: "bg-smoke rounded-lg shadow-md p-6 border border-border",
  cardSmoke2: "bg-smoke-2 rounded-lg shadow-md p-6 border border-border",
  cardSmoke3: "bg-smoke-3 rounded-lg shadow-md p-6 border border-border",

  // Spacing using your custom scale
  section: "py-16 px-4", // 64px vertical, 16px horizontal
  spaceY: (size: number) => `space-y-${size}`,
  spaceX: (size: number) => `space-x-${size}`,

  // Custom spacing utilities
  spacing: {
    // Padding
    p1: "p-1", // 4px
    p2: "p-2", // 8px
    p3: "p-3", // 12px
    p4: "p-4", // 16px
    p6: "p-6", // 24px
    p8: "p-8", // 32px
    p16: "p-16", // 64px

    // Margin
    m1: "m-1", // 4px
    m2: "m-2", // 8px
    m3: "m-3", // 12px
    m4: "m-4", // 16px
    m6: "m-6", // 24px
    m8: "m-8", // 32px
    m16: "m-16", // 64px

    // Gap
    gap1: "gap-1", // 4px
    gap2: "gap-2", // 8px
    gap3: "gap-3", // 12px
    gap4: "gap-4", // 16px
    gap6: "gap-6", // 24px
    gap8: "gap-8", // 32px
    gap16: "gap-16", // 64px
  },

  // Colors using your custom design tokens
  textPrimary: "text-title",
  textSecondary: "text-body",
  textMuted: "text-light",
  textTheme: "text-theme",
  textSuccess: "text-success",
  textError: "text-error",

  // Responsive
  responsive: {
    mobile: "sm:",
    tablet: "md:",
    desktop: "lg:",
    large: "xl:",
  },
};

// Helper function to combine classes
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

// Helper function to create responsive classes
export const responsive = (
  base: string,
  breakpoints: Record<string, string> = {}
) => {
  let classes = base;

  Object.entries(breakpoints).forEach(([breakpoint, value]) => {
    const prefix =
      tailwindClasses.responsive[
        breakpoint as keyof typeof tailwindClasses.responsive
      ];
    if (prefix) {
      classes += ` ${prefix}${value}`;
    }
  });

  return classes;
};

// Common component patterns
export const componentPatterns = {
  // Hero section
  hero: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100",

  // Feature grid
  featureGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",

  // Testimonial card
  testimonialCard: "bg-white rounded-xl shadow-lg p-8 border border-gray-100",

  // Navigation
  navLink: "text-gray-700 hover:text-blue-600 transition-colors font-medium",
  navLinkActive: "text-blue-600 font-semibold",
};

// Migration helper: Convert common CSS classes to Tailwind
export const cssToTailwind = {
  // Common Bootstrap to Tailwind mappings
  container: "container",
  row: "flex flex-wrap -mx-4",
  "col-12": "w-full px-4",
  "col-6": "w-1/2 px-4",
  "col-4": "w-1/3 px-4",
  "col-3": "w-1/4 px-4",

  // Common utility classes
  "text-center": "text-center",
  "text-left": "text-left",
  "text-right": "text-right",
  "d-flex": "flex",
  "justify-content-center": "justify-center",
  "align-items-center": "items-center",
  "mb-4": "mb-4",
  "mt-4": "mt-4",
  "p-4": "p-4",
  "m-4": "m-4",
};

// Helper to get Tailwind equivalent of a CSS class
export const getTailwindEquivalent = (cssClass: string): string => {
  return cssToTailwind[cssClass as keyof typeof cssToTailwind] || cssClass;
};
