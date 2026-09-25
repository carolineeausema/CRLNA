"use client";

import { useEffect, useRef, useState } from "react";
import { markLoaderDone } from "./lib/loader";

export function Preloader() {
  const [pct, setPct] = useState(0);
  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const t0 = performance.now();

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setPct(100);
      window.setTimeout(() => {
        markLoaderDone();
        setClosing(true);
        window.setTimeout(() => setHidden(true), 1000);
      }, 250);
    };

    const interval = window.setInterval(() => {
      const elapsed = performance.now() - t0;
      const next = Math.min(100, Math.round(Math.pow(elapsed / 1600, 0.7) * 100));
      setPct(next);
      if (next >= 100) {
        window.clearInterval(interval);
        finish();
      }
    }, 30);

    const safety = window.setTimeout(finish, 2400);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(safety);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`preloader${closing ? " preloader-closing" : ""}`} aria-hidden={closing}>
      <div className="preloader-row">
        <span>CRLNA</span>
        <span>Strategy + Design in critical spaces</span>
      </div>
      <div className="preloader-row preloader-row-bottom">
        <span className="preloader-caption">Loading systems, diagrams &amp; a few side quests</span>
        <span className="preloader-counter">{String(pct).padStart(3, "0")}</span>
      </div>
    </div>
  );
}
