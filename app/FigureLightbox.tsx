"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export type LightboxFigure = {
  label: string;
  caption: string;
  src?: string;
  svgMarkup?: string;
};

type Size = { w: number; h: number };

function svgSize(markup: string): Size | null {
  const viewBox = markup.match(/viewBox="([^"]+)"/);
  if (!viewBox) return null;
  const [, , w, h] = viewBox[1].split(/[\s,]+/).map(Number);
  return w && h ? { w, h } : null;
}

/** Full-screen figure viewer: opens fit-to-screen, tap or +/- to zoom, swipe/drag to pan. */
export function FigureLightbox({ figure, onClose }: { figure: LightboxFigure | null; onClose: () => void }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [natural, setNatural] = useState<Size | null>(null);
  const [stage, setStage] = useState<Size | null>(null);
  const [level, setLevel] = useState(0);
  // Where to keep in view after a zoom, as a fraction of the content (set by taps).
  const focus = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLevel(0);
    setNatural(figure?.svgMarkup ? svgSize(figure.svgMarkup) : null);
    focus.current = { x: 0.5, y: 0.5 };
  }, [figure]);

  useEffect(() => {
    if (!figure) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    // Capture phase, so Escape closes only the figure and not the case study underneath.
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopImmediatePropagation();
      onClose();
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      previous?.focus();
    };
  }, [figure, onClose]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || !figure) return;
    const observer = new ResizeObserver(() => setStage({ w: el.clientWidth, h: el.clientHeight }));
    observer.observe(el);
    return () => observer.disconnect();
  }, [figure]);

  // Zoom levels: fit, then "readable", then a closer look. Diagrams are readable at their natural size
  // (Mermaid's 14px labels); images fill the screen, but never more than 4× fit for very wide ones.
  const levels = (() => {
    if (!natural || !stage) return [1];
    const pad = 32;
    const fit = Math.min((stage.w - pad) / natural.w, (stage.h - pad) / natural.h);
    const cover = Math.max(stage.w / natural.w, stage.h / natural.h);
    const readable = figure?.src ? Math.max(Math.min(cover, fit * 4), fit * 2.5) : Math.max(1, fit * 2);
    const close = figure?.src ? Math.max(readable * 1.6, 1) : readable * 2;
    return [fit, readable, close];
  })();
  const scale = levels[Math.min(level, levels.length - 1)];
  const width = natural ? natural.w * scale : 0;
  const height = natural ? natural.h * scale : 0;

  // After a zoom change, scroll so the focus point sits in the middle of the screen.
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el || !width) return;
    el.scrollLeft = focus.current.x * el.scrollWidth - el.clientWidth / 2;
    el.scrollTop = focus.current.y * el.scrollHeight - el.clientHeight / 2;
  }, [width, height]);

  const zoomTo = useCallback((next: number) => {
    const el = stageRef.current;
    if (el && el.scrollWidth) {
      focus.current = {
        x: (el.scrollLeft + el.clientWidth / 2) / el.scrollWidth,
        y: (el.scrollTop + el.clientHeight / 2) / el.scrollHeight,
      };
    }
    setLevel(Math.max(0, Math.min(levels.length - 1, next)));
  }, [levels.length]);

  // Touch pans natively; mouse users drag. A drag that moved shouldn't also count as a tap.
  const drag = useRef<{ x: number; y: number; left: number; top: number; moved: boolean } | null>(null);
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (event.pointerType !== "mouse" || !el) return;
    drag.current = { x: event.clientX, y: event.clientY, left: el.scrollLeft, top: el.scrollTop, moved: false };
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    const d = drag.current;
    if (!el || !d) return;
    const dx = event.clientX - d.x;
    const dy = event.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
    el.scrollLeft = d.left - dx;
    el.scrollTop = d.top - dy;
  };
  const onPointerUp = () => {
    // Cleared after the click event that follows pointerup.
    setTimeout(() => { drag.current = null; }, 0);
  };

  // A tap anywhere toggles fit/readable; zooming in centres on the tapped point (clamped to the figure).
  const onStageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current?.moved) return;
    if (level > 0) {
      zoomTo(0);
      return;
    }
    const content = event.currentTarget.firstElementChild;
    if (!content) return;
    const rect = content.getBoundingClientRect();
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    focus.current = { x: clamp((event.clientX - rect.left) / rect.width), y: clamp((event.clientY - rect.top) / rect.height) };
    setLevel(1);
  };

  if (!figure) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${figure.label}: ${figure.caption}`}>
      <div className="lightbox-bar">
        <p className="lightbox-caption">
          <span className="overlay-figure-n">{figure.label}</span> {figure.caption}
        </p>
        <button type="button" ref={closeRef} className="pill-button-dark" onClick={onClose}>Close &#10005;</button>
      </div>

      <div
        ref={stageRef}
        className={`lightbox-stage${level > 0 ? " is-zoomed" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onClick={onStageClick}
      >
        <div
          className="lightbox-content"
          style={natural ? { width, height } : undefined}
        >
          {figure.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={figure.src}
              alt={figure.caption}
              draggable={false}
              onLoad={(event) => setNatural({ w: event.currentTarget.naturalWidth, h: event.currentTarget.naturalHeight })}
            />
          ) : (
            <div className="lightbox-svg" dangerouslySetInnerHTML={{ __html: figure.svgMarkup ?? "" }} />
          )}
        </div>
      </div>

      <div className="lightbox-controls">
        <span className="lightbox-hint">{level > 0 ? "Drag to pan · tap to fit" : "Tap to zoom"}</span>
        <div className="lightbox-zoom">
          <button type="button" onClick={() => zoomTo(level - 1)} disabled={level === 0} aria-label="Zoom out">&minus;</button>
          <button type="button" onClick={() => zoomTo(level + 1)} disabled={level >= levels.length - 1} aria-label="Zoom in">+</button>
        </div>
      </div>
    </div>
  );
}
