import Link from "next/link";
import { notFound } from "next/navigation";
import { MermaidDiagram } from "./MermaidDiagram";
import { ComplianceExplorer } from "./ComplianceExplorer";
import { projects } from "./data";

function withInlineLinks(text: string) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;
    return (
      <a key={i} className="inline-source-link" href={match[2]} target="_blank" rel="noreferrer">
        {match[1]}
      </a>
    );
  });
}

export function ProjectDetail({ slug }: { slug: string }) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return <main className="detail-page">
    <div className="detail-breadcrumb"><Link href="/#work">&lt;- Work</Link></div>
    <section className="detail-heading"><div className="detail-intro"><p className="eyebrow">{project.eyebrow}</p><h1>{project.title}</h1><p className="lead">{project.oneLiner}</p><div className="tag-list">{project.stack.split(" / ").map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>{project.link && <a className="button button-secondary detail-live-link" href={project.link} target="_blank" rel="noreferrer">View live site -&gt;</a>}</div><aside className="stat-rail"><div><p className="meta-label">{project.statLabel}</p><strong>{project.stat}</strong></div><hr /><div><p className="meta-label">Role</p><p>{project.role}</p></div><div><p className="meta-label">Team</p><p>{project.team}</p></div></aside></section>
    {project.confidentialityNote ? (
      <div className="case-study-note">
        <p className="confidentiality-note">{project.confidentialityNote}</p>
        {project.complianceExplorer ? (
          <ComplianceExplorer data={project.complianceExplorer} />
        ) : (
          project.diagrams?.map((diagram) => <MermaidDiagram key={diagram.title ?? diagram.chart} chart={diagram.chart} caption={diagram.title} />)
        )}
      </div>
    ) : project.embedUrl ? (
      <div className="detail-hero detail-hero-embed">
        <div className="embed-chrome">
          <span className="embed-dot" aria-hidden="true" />
          <span className="embed-dot" aria-hidden="true" />
          <span className="embed-dot" aria-hidden="true" />
          <span className="embed-url">{project.embedUrl.replace(/^https?:\/\//, "")}</span>
        </div>
        <iframe className="embed-frame" src={project.embedUrl} title={`${project.title} — live site`} loading="lazy" />
      </div>
    ) : project.heroImage ? (
      <div className="detail-hero detail-hero-photo"><img src={encodeURI(project.heroImage)} alt={project.title} /></div>
    ) : (
      <div className="media-placeholder detail-hero">HERO MEDIA / GRAYSCALE / 16:9</div>
    )}
    <section className="prose-grid"><div><p className="eyebrow">The problem</p><p>{withInlineLinks(project.problem)}</p></div><div><p className="eyebrow">What I did</p><p>{project.work}</p></div></section>
    {project.detailShots && (
      <div className={`detail-shots-wrap${project.confidentialityNote ? " is-mockup" : ""}`}>
        <div className="detail-shots">
          {project.detailShots.map((shot) => {
            const label = project.confidentialityNote ? `${shot.label} Mockup` : shot.label;
            return (
              <figure className={`detail-shot-figure${project.detailShots!.length === 1 ? " detail-shot-figure-full" : ""}`} key={shot.src}>
                <img className="detail-shot" src={encodeURI(shot.src)} alt={label} />
                <figcaption>{label}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    )}
    {project.differentImage ? (
      <section className="different-grid">
        <div className="different"><p className="eyebrow">What I would do differently</p><p>{project.different}</p></div>
        <div className="different-photo"><img src={encodeURI(project.differentImage)} alt="" /></div>
      </section>
    ) : (
      <section className="different"><p className="eyebrow">What I would do differently</p><p>{project.different}</p></section>
    )}
    <nav className="project-nav"><Link href={`/work/${previous.slug}`}>&lt;- {previous.title}</Link><Link href={`/work/${next.slug}`}>{next.title} -&gt;</Link></nav>
  </main>;
}
