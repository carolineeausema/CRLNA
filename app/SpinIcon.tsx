"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./lib/gsap";
import { scrollVelocity, startScrollVelocity } from "./lib/scrollVelocity";

const ICONS = {
  singer: "/icons/singer.png",
  flower: "/icons/flower.png",
  circle: "/icons/circle.png",
  tulip: "/icons/tulip.png",
};

export function SpinIcon({
  k = 1,
  icon = "circle",
  size = 18,
  className = "",
}: {
  k?: number;
  icon?: keyof typeof ICONS;
  size?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    startScrollVelocity();
    const el = ref.current;
    if (!el) return;

    let ang = 0;
    let dir = 1;
    const tick = () => {
      const v = scrollVelocity.v;
      if (Math.abs(v) > 0.3) dir = v > 0 ? 1 : -1;
      ang += dir * (0.35 + Math.min(18, Math.abs(v) * 0.9));
      el.style.transform = `rotate(${(ang * k) % 360}deg)`;
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [k]);

  const mask = `url(${ICONS[icon]}) center / contain no-repeat`;

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`spin-icon ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: "currentColor",
        WebkitMask: mask,
        mask,
      }}
    />
  );
}
