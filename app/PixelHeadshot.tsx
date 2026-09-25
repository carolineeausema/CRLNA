"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./lib/gsap";

const hash = (x: number, y: number) => Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;

export function PixelHeadshot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    let lastBlock = -1;
    const progress = { p: 0 };
    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d");

    const drawPix = (p: number) => {
      if (!img.complete || !img.naturalWidth) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        lastBlock = -1;
      }
      const quantized = Math.round(p * 60) / 60;
      if (quantized === lastBlock) return;
      lastBlock = quantized;

      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, width, height);

      const ratio = img.naturalWidth / img.naturalHeight;
      let drawWidth = width;
      let drawHeight = width / ratio;
      if (drawHeight > height) {
        drawHeight = height;
        drawWidth = height * ratio;
      }
      const dx = (width - drawWidth) / 2;
      const dy = height - drawHeight;

      if (quantized < 0.02) {
        ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
        return;
      }

      const block = Math.max(2, Math.round(2 + Math.pow(quantized, 1.4) * 56));
      const smallWidth = Math.ceil(width / block);
      const smallHeight = Math.ceil(height / block);
      if (!offCtx) return;
      off.width = smallWidth;
      off.height = smallHeight;
      offCtx.clearRect(0, 0, smallWidth, smallHeight);
      offCtx.drawImage(img, dx / block, dy / block, drawWidth / block, drawHeight / block);
      ctx.drawImage(off, 0, 0, smallWidth, smallHeight, 0, 0, smallWidth * block, smallHeight * block);

      const threshold = (quantized - 0.3) * 1.5;
      if (threshold > 0) {
        for (let y = 0; y < smallHeight; y += 1) {
          for (let x = 0; x < smallWidth; x += 1) {
            const noise = hash(x, y);
            if (noise < threshold - (1 - y / smallHeight) * 0.25) {
              ctx.clearRect(x * block, y * block, block, block);
            }
          }
        }
      }
    };

    const tick = () => drawPix(progress.p);
    gsap.ticker.add(tick);

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => window.innerHeight * 0.75,
      scrub: true,
      onUpdate: (self) => {
        progress.p = self.progress;
        drawPix(progress.p);
      },
    });

    const resizeObserver = new ResizeObserver(() => {
      lastBlock = -1;
      drawPix(progress.p);
    });
    resizeObserver.observe(canvas);

    img.onload = () => {
      lastBlock = -1;
      drawPix(progress.p);
    };
    img.src = "/assets/headshot-placeholder.png";

    return () => {
      gsap.ticker.remove(tick);
      trigger.kill();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="hero-headshot-stage">
      <div className="hero-headshot-model">
        <canvas ref={canvasRef} role="img" aria-label="Pixel-art portrait of Caroline" />
      </div>
    </div>
  );
}
