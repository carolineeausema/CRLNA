"use client";

import { useEffect, useRef } from "react";

type Stamp = {
  x: number;
  y: number;
  time: number;
  seed: number;
};

const GRID_SIZE = 72;
const MEMORY_DURATION = 4800;
const MEMORY_RADIUS = 0.16;
const LIGHT_CUTOFF = 0.72;
const BAYER_MATRIX = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export function HeroImage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stampsRef = useRef<Stamp[]>([]);
  const pointerActiveRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const sourceImage = new Image();

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let imageData: ImageData | null = null;
    let hasStarted = false;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const prepareImage = () => {
      const sourceCanvas = document.createElement("canvas");
      sourceCanvas.width = sourceImage.naturalWidth;
      sourceCanvas.height = sourceImage.naturalHeight;
      const sourceContext = sourceCanvas.getContext("2d");
      if (!sourceContext) return;
      sourceContext.drawImage(sourceImage, 0, 0);
      imageData = sourceContext.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
    };

    const sampleBrightness = (x: number, y: number) => {
      if (!imageData) return 1;
      const sampleX = Math.min(imageData.width - 1, Math.max(0, Math.floor(x * imageData.width)));
      const sampleY = Math.min(imageData.height - 1, Math.max(0, Math.floor(y * imageData.height)));
      const offset = (sampleY * imageData.width + sampleX) * 4;
      return (imageData.data[offset] * 0.299 + imageData.data[offset + 1] * 0.587 + imageData.data[offset + 2] * 0.114) / 255;
    };

    const draw = (now: number) => {
      if (!imageData) return;
      const cell = width / GRID_SIZE;
      const rows = Math.max(1, Math.round(GRID_SIZE * (height / width)));
      const styles = getComputedStyle(document.body);
      const background = styles.getPropertyValue("--bg").trim() || "#f1f2f3";
      const ink = styles.getPropertyValue("--ink").trim() || "#1b1d1f";
      context.clearRect(0, 0, width, height);
      stampsRef.current = stampsRef.current.filter((stamp) => now - stamp.time < MEMORY_DURATION);
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);
      context.fillStyle = ink;
      context.beginPath();

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < GRID_SIZE; column += 1) {
          const x = (column + 0.5) * cell;
          const y = (row + 0.5) * (height / rows);
          const brightness = sampleBrightness(x / width, y / height);
          if (brightness > LIGHT_CUTOFF) continue;

          const darkness = Math.max(0, Math.min(1, (1 - brightness) * 0.68 - 0.04));
          const threshold = (BAYER_MATRIX[row % 4][column % 4] + 0.5) / 16;
          if (darkness <= threshold) continue;

          let interaction = 0;
          for (const stamp of stampsRef.current) {
            const age = (now - stamp.time) / MEMORY_DURATION;
            const distance = Math.hypot(x - stamp.x, y - stamp.y);
            const angle = Math.atan2(y - stamp.y, x - stamp.x);
            const radius = width * MEMORY_RADIUS * (1 + 0.22 * Math.sin(angle * 5 + stamp.seed));
            interaction = Math.max(interaction, Math.max(0, 1 - distance / radius) * (1 - age));
          }

          const amplified = Math.max(0, Math.min(1, (interaction - 0.02) * 2.4));
          const morph = amplified * amplified * (3 - 2 * amplified);
          const dotSize = Math.min(cell * 0.94, cell * (0.7 + morph * 0.3));
          const cornerRadius = dotSize * 0.5 * (1 - morph);
          context.roundRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize, cornerRadius);
        }
      }

      context.fill();
      if (!reducedMotion || pointerActiveRef.current || stampsRef.current.length > 0) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const addStamp = (clientX: number, clientY: number) => {
      const bounds = canvas.getBoundingClientRect();
      const x = Math.max(0, Math.min(width, clientX - bounds.left));
      const y = Math.max(0, Math.min(height, clientY - bounds.top));
      const lastStamp = stampsRef.current.at(-1);
      if (!lastStamp || Math.hypot(x - lastStamp.x, y - lastStamp.y) > width * 0.025) {
        stampsRef.current.push({ x, y, time: performance.now(), seed: Math.random() * 1000 });
      }
      if (stampsRef.current.length > 80) stampsRef.current.shift();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerActiveRef.current = true;
      addStamp(event.clientX, event.clientY);
      if (event.pointerType === "touch") event.preventDefault();
    };
    const onPointerLeave = () => {
      pointerActiveRef.current = false;
    };
    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
    };
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new ResizeObserver(resize);

    resize();
    observer.observe(canvas);
    const start = () => {
      if (hasStarted || sourceImage.naturalWidth === 0) return;
      hasStarted = true;
      prepareImage();
      draw(performance.now());
    };
    sourceImage.onload = start;
    sourceImage.src = "/hero/1710793659014.jpg";
    void sourceImage.decode().then(start).catch(() => undefined);
    if (sourceImage.complete) start();
    canvas.addEventListener("pointermove", onPointerMove, { passive: false });
    canvas.addEventListener("pointerdown", onPointerMove, { passive: false });
    canvas.addEventListener("pointerleave", onPointerLeave);
    mediaQuery.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      mediaQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div className="photo-frame halftone-frame">
      <canvas ref={canvasRef} aria-label="Interactive halftone portrait" />
      <div className="photo-caption">1710793659014 / HALFTONE STUDY</div>
    </div>
  );
}
