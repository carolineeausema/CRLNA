"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./lib/gsap";
import { KeywordDecode } from "./KeywordDecode";

const TEXT = "Design thinking, engineering judgment, and the journey as the destination.";

export function AboutStatement() {
  const wrapRef = useRef<HTMLParagraphElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wordsRef.current = Array.from(wrap.querySelectorAll<HTMLSpanElement>("[data-word]"));

    let maxP = 0;

    const tick = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const n = wordsRef.current.length;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (rect.height + vh * 0.35)));
      maxP = Math.max(maxP, p);
      wordsRef.current.forEach((el, i) => {
        el.style.opacity = (i + 0.5) / n <= maxP ? "1" : "0.2";
      });
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  const words = TEXT.split(" ");

  return (
    <p className="about-v2-kicker" ref={wrapRef}>
      {words.map((word, i) => {
        const clean = word.replace(/[.,]/g, "");
        const isKeyword = clean === "journey" || clean === "destination";
        return (
          <span key={i} data-word className="about-word">
            {isKeyword ? <KeywordDecode text={word} className="kw-sage" /> : word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
