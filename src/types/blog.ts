// Flexible content block types
export type ContentBlockType =
  | "paragraph"
  | "heading"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "image"
  | "ul"
  | "ol"
  | "blockquote"
  | "code"
  | "divider";

export interface ContentBlock {
  type: ContentBlockType;
  content?: string; // For paragraph, headings, blockquote, code
  text?: string; // Alternative to content for headings
  items?: string[]; // For ul/ol lists
  image?: string; // For image blocks
  alt?: string; // For image alt text
  className?: string; // Optional CSS class
}

// Legacy BlogSection for backward compatibility
export interface BlogSection {
  list?: string[];
  bullets?: string[];
  heading?: string;
  type?: string;
  content?: string;
  image?: string;
  // New flexible content blocks
  blocks?: ContentBlock[];
}

export interface Blog {
  id: number;
  title: string;
  // slug: string;
  image: string;
  date: string;
  category: string;
  author: string;
  meta: {
    title: string;
    description: string;
  };
  sections: BlogSection[];
}
