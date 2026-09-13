"use client";

import { useEffect, useState } from "react";

let mermaidModule: Promise<typeof import("mermaid")> | null = null;
function loadMermaid() {
  if (!mermaidModule) mermaidModule = import("mermaid");
  return mermaidModule;
}

let renderCount = 0;

export function MermaidDiagram({ chart, caption }: { chart: string; caption?: string }) {
  const [themeTick, setThemeTick] = useState(0);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => setThemeTick((tick) => tick + 1));
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const isDark = document.body.dataset.theme === "dark";

    loadMermaid().then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "neutral",
        securityLevel: "strict",
        fontFamily: "inherit",
      });
      renderCount += 1;
      const id = `mermaid-diagram-${renderCount}`;
      try {
        const { svg } = await mermaid.render(id, chart);
        const viewBoxMatch = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
        const sizedSvg = viewBoxMatch
          ? svg.replace(/width="100%"/, `width="${viewBoxMatch[1]}" height="${viewBoxMatch[2]}"`)
          : svg;
        if (!cancelled) {
          setSvgMarkup(sizedSvg);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [chart, themeTick]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [expanded]);

  return (
    <figure className="diagram-block">
      {error ? (
        <div className="diagram-canvas">Diagram failed to render.</div>
      ) : (
        <button
          type="button"
          className="diagram-canvas diagram-canvas-trigger"
          onClick={() => setExpanded(true)}
          aria-label="Expand diagram"
          dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined}
        />
      )}
      {caption && (
        <figcaption className="diagram-caption">
          {caption}
          {svgMarkup && !error && " — click to expand"}
        </figcaption>
      )}
      {expanded && svgMarkup && (
        <div className="diagram-modal-backdrop" onClick={() => setExpanded(false)}>
          <div className="diagram-modal" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="diagram-modal-close"
              onClick={() => setExpanded(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="diagram-modal-canvas" dangerouslySetInnerHTML={{ __html: svgMarkup }} />
          </div>
        </div>
      )}
    </figure>
  );
}
