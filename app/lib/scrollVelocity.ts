import { gsap } from "./gsap";

export const scrollVelocity = { v: 0 };

let started = false;

export function startScrollVelocity() {
  if (started || typeof window === "undefined") return;
  started = true;
  let lastY = window.scrollY;
  gsap.ticker.add(() => {
    const y = window.scrollY;
    scrollVelocity.v = scrollVelocity.v * 0.9 + (y - lastY) * 0.1;
    lastY = y;
  });
}
