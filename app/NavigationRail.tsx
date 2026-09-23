"use client";

import { useEffect, useState } from "react";
import { projects } from "./data";

const pad = (value: number) => String(value).padStart(2, "0");

const sections = [
  { id: "work", label: "Work", count: pad(projects.length) },
  { id: "about", label: "About", count: "" },
  { id: "contact", label: "Contact", count: "" },
];

export function NavigationRail({ disabled = false }: { disabled?: boolean }) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("work");
  const [positions, setPositions] = useState<number[]>([25, 50, 75, 100]);

  useEffect(() => {
    if (disabled) return;
    let frame = 0;

    const measure = () => {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
      const starts = sections.map(({ id }) => {
        const element = document.getElementById(id);
        const documentTop = element ? element.getBoundingClientRect().top + window.scrollY : 0;
        const landingTop = Math.max(0, documentTop - headerHeight);
        return element && pageHeight > 0 ? Math.max(0, Math.min(100, (landingTop / pageHeight) * 100)) : 0;
      });
      setPositions(starts);
    };

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;
        setProgress(Math.max(0, Math.min(100, currentProgress)));
        const reached = sections.reduce((current, section) => {
          const element = document.getElementById(section.id);
          const documentTop = element ? element.getBoundingClientRect().top + window.scrollY : 0;
          return element && window.scrollY + window.innerHeight * 0.35 >= documentTop ? section.id : current;
        }, sections[0].id);
        setActive(reached);
      });
    };

    measure();
    update();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", update);
    };
  }, [disabled]);

  return (
    <div className={`nav-rail ${disabled ? "disabled" : ""}`}>
      <div className="nav-track" aria-hidden="true">
        <span className="nav-track-fill" style={{ width: `${progress}%` }} />
        <span className="nav-marker" style={{ left: `${progress}%` }} />
        {positions.map((position, index) => <span className="nav-tick" style={{ left: `${position}%` }} key={index} />)}
      </div>
      <div className="nav-labels">
        {sections.map((section, index) => (
          <a
            className={active === section.id ? "active" : ""}
            href={`#${section.id}`}
            aria-current={active === section.id ? "location" : undefined}
            style={{ left: `${positions[index]}%` }}
            key={section.id}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{section.label}</strong>
            {section.count && <em>{section.count}</em>}
          </a>
        ))}
      </div>
      {disabled && <span className="nav-empty">Nothing read yet</span>}
    </div>
  );
}
