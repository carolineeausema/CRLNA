"use client";

import { useEffect, useRef, useState } from "react";

export function Sketch({ compact = false }: { compact?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const [seed, setSeed] = useState(4821);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const bounds = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = bounds.width * ratio;
    canvas.height = bounds.height * ratio;
    context.scale(ratio, ratio);
    const width = bounds.width;
    const height = bounds.height;
    const random = (value: number) => {
      const next = Math.sin(value * 12.9898 + seed) * 43758.5453;
      return next - Math.floor(next);
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = performance.now();
    const draw = (now: number) => {
      const progress = reduced ? 1 : Math.min((now - started) / 4000, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      context.fillStyle = "#eae9e9";
      context.fillRect(0, 0, width, height);
      context.strokeStyle = "#201e1d";
      context.globalAlpha = 0.16;
      context.lineWidth = 1;
      for (let line = -height; line < width + height; line += 22) {
        context.beginPath(); context.moveTo(line, 0); context.lineTo(line + height, height); context.stroke();
      }
      context.globalAlpha = 0.68;
      for (let index = 0; index < 15; index += 1) {
        const x = width * (0.12 + random(index + 1) * 0.76);
        const y = height * (0.15 + random(index + 21) * 0.7);
        const radius = (18 + random(index + 44) * 42) * (0.55 + ease * 0.45);
        context.strokeStyle = index % 3 === 0 ? "#ec3013" : "#201e1d";
        context.lineWidth = index % 3 === 0 ? 2 : 1;
        context.beginPath(); context.arc(x + Math.sin(ease * 3 + index) * 22 * (1 - ease), y, radius, 0, Math.PI * 1.45); context.stroke();
      }
      context.globalAlpha = 1;
      if (!reduced && progress < 1) frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [seed]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key.toLowerCase() === "r") setSeed(Math.floor(Math.random() * 9000) + 1000); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return <div className={`sketch-wrap ${compact ? "sketch-wrap-compact" : ""}`}><canvas ref={canvasRef} aria-label="Generative line study" /><div className="sketch-mark">GENERATIVE STUDY<br /><span>motion settles / seed {seed}</span></div></div>;
}
