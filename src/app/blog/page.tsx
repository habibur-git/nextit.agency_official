// src/app/blog/page.tsx
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import type { Metadata } from "next";
import Link from "next/link";

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | NextIT – UI/UX, Web Development & Design Insights",
  description:
    "Read our latest articles on UI/UX design, web development, and product strategy. Tips, case studies, and insights from the NextIT team.",
  openGraph: {
    title: "Blog | NextIT – UI/UX, Web Development & Design Insights",
    description:
      "Read our latest articles on UI/UX design, web development, and product strategy.",
    type: "website",
  },
};

type BlogSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  coverImage?: { url?: string } | number | null;
};

function getCoverImageUrl(blog: BlogSummary): string | null {
  const cover = blog.coverImage;
  if (!cover || typeof cover === "number") return null;
  const url = cover.url;
  if (!url || typeof url !== "string") return null;
  if (url.startsWith("http")) return url;
  return CMS_URL ? `${CMS_URL}${url}` : url;
}

async function fetchBlogs(): Promise<BlogSummary[]> {
  const base = process.env.NEXT_PUBLIC_CMS_URL;

  if (!base) {
    console.error("NEXT_PUBLIC_CMS_URL is not set");
    return [];
  }

  try {
    const res = await fetch(`${base}/api/blogs?sort=-publishedAt&depth=1`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        "Failed to fetch blogs from CMS",
        res.status,
        res.statusText,
      );
      return [];
    }

    const data = await res.json();
    const docs = Array.isArray((data as { docs?: BlogSummary[] }).docs)
      ? (data as { docs: BlogSummary[] }).docs
      : [];

    return docs;
  } catch (error) {
    console.error("Error fetching blogs from CMS", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await fetchBlogs();

  return (
    <>
      <Header variant="white" />
      <main>
        <section className="relative w-full overflow-hidden py-16 pt-46 bg-linear-to-l from-[#000000] to-[#5659e1] h-[50vh]">
          <div className="container text-center">
            <h1 className="text-white text-3xl font-semibold">Blog</h1>
          </div>
        </section>
        <section className="space">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3">
              {blogs.map((blog) => {
                const coverSrc = getCoverImageUrl(blog);
                return (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.slug}`}
                    className="block"
                  >
                    {coverSrc ? (
                      <div className="aspect-video w-full bg-border relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={coverSrc}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video w-full bg-border" />
                    )}
                    <div className="mt-6">
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                        <p className="text-sm text-desc">
                          {blog.publishedAt?.slice(0, 10)}
                        </p>
                        {blog.category && (
                          <p className="text-xs text-desc">{blog.category}</p>
                        )}
                      </div>
                      <h2 className="text-h4 mb-3">{blog.title}</h2>
                      <p className="text-desc text-sm line-clamp-2">
                        {blog.excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
