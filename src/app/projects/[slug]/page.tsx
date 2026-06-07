import { notFound } from "next/navigation";
import ProjectDetail from "@/components/projects/ProjectDetail";
import { getProjectBySlug, projects } from "@/data/projects";
import { projectMetadata } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return projectMetadata("Project not found", "Project detail page not found.");
  }

  return projectMetadata(project.title, project.subtitle);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
