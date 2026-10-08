"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "./lib/gsap";
import { MermaidDiagram } from "./MermaidDiagram";
import { FigureLightbox, type LightboxFigure } from "./FigureLightbox";
import type { Project } from "./data";

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

export function ProjectOverlay({
  project,
  nextTitle,
  onClose,
  onNext,
}: {
  project: Project | null;
  nextTitle: string;
  onClose: () => void;
  onNext: () => void;
}) {
  const open = !!project;
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<LightboxFigure | null>(null);
  const closeFigure = useCallback(() => setExpanded(null), []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExpanded(null);
  }, [project]);

  const expandFigure = (button: HTMLButtonElement, label: string, caption: string, src?: string) => {
    // Diagrams are rendered client-side by Mermaid, so the viewer reuses the SVG already on the page.
    const svgMarkup = src ? undefined : button.querySelector("svg")?.outerHTML;
    if (!src && !svgMarkup) return;
    setExpanded({ label, caption, src, svgMarkup });
  };

  useEffect(() => {
    if (panelRef.current) gsap.set(panelRef.current, { yPercent: 105 });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock background scroll while open; pad for the vanished scrollbar to avoid layout shift.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const prev = { overflow: root.style.overflow, paddingRight: document.body.style.paddingRight };
    root.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      root.style.overflow = prev.overflow;
      document.body.style.paddingRight = prev.paddingRight;
    };
  }, [open]);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!backdrop || !panel) return;
    const ctx = gsap.context(() => {
      gsap.to(backdrop, { opacity: open ? 1 : 0, duration: 0.6, ease: "power2.out" });
      if (open) {
        gsap.set(panel, { visibility: "visible" });
        gsap.to(panel, { yPercent: 0, duration: 0.9, ease: "EXPO" });
        panel.scrollTop = 0;
      } else {
        gsap.to(panel, {
          yPercent: 105,
          duration: 0.9,
          ease: "EXPO",
          onComplete: () => gsap.set(panel, { visibility: "hidden" }),
        });
      }
    });
    return () => ctx.revert();
  }, [open]);

  const sections = project
    ? [
        ["01", "The problem", project.problem],
        ["02", "The work", project.work],
        ["03", "What I'd do differently", project.different],
      ] as const
    : [];

  return (
    <>
      <div ref={backdropRef} className="overlay-backdrop" onClick={onClose} aria-hidden={!open} />
      <div ref={panelRef} className="overlay-panel" role="dialog" aria-modal="true" aria-label="Case study" aria-hidden={!open}>
        {project && (
          <>
            <div className="overlay-topbar">
              <span className="overlay-eyebrow">{project.eyebrow}</span>
              <div className="overlay-topbar-actions">
                <button type="button" className="pill-button-ghost" onClick={onNext}>Next &rarr;</button>
                <button type="button" className="pill-button-dark" onClick={onClose}>Close &#10005;</button>
              </div>
            </div>

            <div className="overlay-head">
              <div className="overlay-head-meta">
                <span className="overlay-head-year">{project.year}</span>
                <span className="overlay-head-org">{project.org}</span>
              </div>
              <div className="overlay-head-copy">
                <h1>{project.title}</h1>
                <p className="overlay-lead">{project.oneLiner}</p>
              </div>
            </div>

            <div className="overlay-body">
              {project.embedUrl ? (
                <div className="embed-chrome-wrap">
                  <div className="embed-chrome">
                    <span className="embed-dots">
                      <span className="embed-dot" aria-hidden="true" />
                      <span className="embed-dot embed-dot-mid" aria-hidden="true" />
                      <span className="embed-dot" aria-hidden="true" />
                    </span>
                    <span className="embed-url">{project.embedUrl}</span>
                  </div>
                  <iframe className="embed-frame" src={project.embedUrl} title={project.title} loading="lazy" />
                </div>
              ) : (
                <div className="overlay-figures">
                  {project.media?.map((item, i) => {
                    const label = `Fig. ${String(i + 1).padStart(2, "0")}`;
                    return (
                      <figure
                        key={item.caption + i}
                        className="overlay-figure"
                        style={{ maxWidth: item.photo ? "560px" : "100%" }}
                      >
                        <button
                          type="button"
                          className="figure-expand"
                          aria-label={`Expand ${label}: ${item.caption}`}
                          onClick={(event) => expandFigure(event.currentTarget, label, item.caption, item.img)}
                        >
                          {item.img && <img src={item.img} alt={item.caption} loading="lazy" />}
                          {item.code && <MermaidDiagram chart={item.code} />}
                          <span className="figure-expand-badge" aria-hidden="true">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                              <path d="M8.5 1.5h4v4M12.5 1.5 8 6M5.5 12.5h-4v-4M1.5 12.5 6 8" />
                            </svg>
                            Expand
                          </span>
                        </button>
                        <figcaption>
                          <span className="overlay-figure-n">{label}</span>
                          <span>{item.caption}</span>
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="overlay-stats">
              <div className="overlay-stat-card">
                <span className="overlay-card-label">{project.statLabel}</span>
                <span className="overlay-stat-value">{project.stat}</span>
              </div>
              <div className="overlay-info-card">
                <span className="overlay-card-label">Role</span>
                <span className="overlay-info-value">{project.role}</span>
              </div>
              <div className="overlay-info-card">
                <span className="overlay-card-label">Team</span>
                <span className="overlay-info-value overlay-info-value-small">{project.team}</span>
              </div>
              <div className="overlay-info-card">
                <span className="overlay-card-label">Stack</span>
                <span className="overlay-info-value overlay-info-value-small">{project.stack}</span>
              </div>
            </div>

            <div className="overlay-sections">
              {sections.map(([n, h, text]) => (
                <div className="overlay-section" key={n}>
                  <span className="overlay-section-n">{n}</span>
                  <div className="overlay-section-body">
                    <h3>{h}</h3>
                    <p>{withInlineLinks(text)}</p>
                  </div>
                </div>
              ))}

              {project.confidentialityNote && (
                <div className="overlay-section">
                  <span className="overlay-section-n">Note</span>
                  <span className="overlay-note">{project.confidentialityNote}</span>
                </div>
              )}
            </div>

            <button type="button" className="overlay-next" onClick={onNext}>
              <span className="overlay-next-label">Next project</span>
              <span className="overlay-next-title">{nextTitle} &rarr;</span>
            </button>
          </>
        )}
      </div>
      <FigureLightbox figure={expanded} onClose={closeFigure} />
    </>
  );
}
