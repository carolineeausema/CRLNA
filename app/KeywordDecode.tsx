"use client";

import { useEffect, useRef, useState } from "react";
import { whenLoaderDone } from "./lib/loader";

const GLYPHS = "█▓▒░#%&@$01<>/";

function randomGlyph() {
  return GLYPHS[(Math.random() * GLYPHS.length) | 0];
}

export function KeywordDecode({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);
  const [underline, setUnderline] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;

    const decode = () => {
      const t0 = performance.now();
      setUnderline(true);
      const step = () => {
        const p = (performance.now() - t0) / 750;
        let k = 0;
        let next = "";
        for (let i = 0; i < text.length; i += 1) {
          const char = text[i];
          if (char === " ") { next += " "; continue; }
          next += k / text.length < p ? char : randomGlyph();
          k += 1;
        }
        if (p < 1) {
          setDisplay(next);
          raf = requestAnimationFrame(step);
        } else {
          setDisplay(text);
        }
      };
      raf = requestAnimationFrame(step);
    };

    const trigger = () => {
      if (started) return;
      started = true;
      whenLoaderDone(decode);
    };

    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) trigger();
    };

    const observer = new IntersectionObserver(check);
    observer.observe(el);
    check();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <span ref={ref} className={`kw-decode${underline ? " kw-decode-on" : ""}${className ? ` ${className}` : ""}`}>
      {display}
    </span>
  );
}
