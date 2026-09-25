"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./lib/gsap";
import { KeywordDecode } from "./KeywordDecode";

const GLYPHS = "█▓▒░#%&@$01<>/\\";

type Word = { text: string; keyword?: boolean };
type Line = Word[];

const LINES: Line[] = [
  [{ text: "Strategy" }, { text: "+" }, { text: "Design" }],
  [{ text: "in" }, { text: "critical spaces", keyword: true }],
];

type LetterEntry = { el: HTMLSpanElement; char: string; r: number };

export function HeroHeadline() {
  const wrapRef = useRef<HTMLHeadingElement>(null);
  const lettersRef = useRef<LetterEntry[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const nodes = Array.from(wrap.querySelectorAll<HTMLSpanElement>("[data-letter]"));
    lettersRef.current = nodes.map((el, i) => ({
      el,
      char: el.dataset.letter ?? "",
      r: Math.abs(Math.sin(i * 91.7) * 1000) % 1,
    }));

    const tick = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.75)));
      for (const letter of lettersRef.current) {
        if (p > 0.02 && letter.r < p * 1.3) {
          letter.el.textContent = p > 0.85 && letter.r < p - 0.6 ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        } else {
          letter.el.textContent = letter.char;
        }
      }
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <h1 className="hero-v2-title" ref={wrapRef} aria-label="Strategy + Design in critical spaces">
      {LINES.map((line, lineIndex) => (
        <span className="hero-v2-line" key={lineIndex} aria-hidden="true">
          {line.map((word, wordIndex) =>
            word.keyword ? (
              <span className="hero-word" key={wordIndex} data-kw="y">
                <KeywordDecode text={word.text} className="hero-keyword" />
              </span>
            ) : (
              <span className="hero-word" key={wordIndex}>
                {Array.from(word.text).map((char, i) => (
                  <span key={i} data-letter={char} className="hero-letter">
                    {char}
                  </span>
                ))}
              </span>
            )
          )}
        </span>
      ))}
    </h1>
  );
}
