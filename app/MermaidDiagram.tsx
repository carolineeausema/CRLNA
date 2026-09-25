"use client";

import { useEffect, useState } from "react";

let mermaidModule: Promise<typeof import("mermaid")> | null = null;
function loadMermaid() {
  if (!mermaidModule) mermaidModule = import("mermaid");
  return mermaidModule;
}

let renderCount = 0;
let mermaidInitialized = false;

const MERMAID_THEME_VARS = {
  fontFamily: "Hanken Grotesk, system-ui, sans-serif",
  fontSize: "14px",
  primaryColor: "#F3EEE5",
  primaryBorderColor: "#372621",
  primaryTextColor: "#372621",
  lineColor: "#6A766D",
  secondaryColor: "#F3EEE5",
  tertiaryColor: "#FBF8F2",
  clusterBkg: "#EEF0EC",
  clusterBorder: "#6A766D",
  edgeLabelBackground: "#FBF8F2",
};

export function MermaidDiagram({ chart }: { chart: string }) {
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadMermaid().then(async ({ default: mermaid }) => {
      if (!mermaidInitialized) {
        mermaidInitialized = true;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: "base",
          flowchart: { curve: "basis", htmlLabels: true, padding: 14 },
          themeVariables: MERMAID_THEME_VARS,
        });
      }
      renderCount += 1;
      const id = `mermaid-diagram-${renderCount}`;
      try {
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled) setSvgMarkup(svg);
      } catch (error) {
        console.warn("mermaid", error);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [chart]);

  return (
    <div className="diagram-box">
      <div className="diagram-canvas" dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined} />
    </div>
  );
}
