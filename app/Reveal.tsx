"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "./lib/gsap";

export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "SOFT",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const DynamicTag = Tag as unknown as ElementType;

  return (
    <DynamicTag ref={ref} className={className} {...rest}>
      {children}
    </DynamicTag>
  );
}
