import Booker from "@/components/common/BookaCall";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ProjectDetails from "@/components/ui/Portfolio/ProjectDetails";
import {
  fetchWorkBySlug,
  fetchWorkSlugs,
} from "@/lib/work-api";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface WorkProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: WorkProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchWorkBySlug(slug);

  if (!project) return { title: "Project not found" };

  const title = project.seo?.metaTitle || `${project.title} | Work`;
  const description =
    project.seo?.metaDescription || project.industry || project.category;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: project.coverImage
        ? [{ url: project.coverImage, alt: project.title }]
        : undefined,
    },
  };
}

export default async function WorkProjectPage({ params }: WorkProjectPageProps) {
  const { slug } = await params;

  const [project, navItems] = await Promise.all([
    fetchWorkBySlug(slug),
    fetchWorkSlugs(),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header variant="white" />
      <main>
        <ProjectDetails
          project={project}
          allItems={navItems}
          basePath="/work"
        />
      </main>
      <Booker />
      <Footer />
    </>
  );
}
