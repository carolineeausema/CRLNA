import { redirect } from "next/navigation";
import { projects } from "../../data";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exists = projects.some((project) => project.slug === slug);
  redirect(exists ? `/?project=${slug}` : "/");
}
