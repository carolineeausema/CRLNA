import type { Metadata } from "next";
import { ProjectDetail } from "../../ProjectDetail";
import { projects } from "../../data";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const project = projects.find((item) => item.slug === slug); return { title: project ? `${project.title} / CRLNA` : "Work / CRLNA" }; }
export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <ProjectDetail slug={slug} />; }
