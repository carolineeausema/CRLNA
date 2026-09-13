"use client";

import { startTransition, useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("crlna-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = saved === "dark" || (!saved && prefersDark) ? "dark" : "light";
    applyTheme(nextTheme);
    startTransition(() => setDark(nextTheme === "dark"));
  }, []);

  const toggleTheme = () => {
    const nextTheme = dark ? "light" : "dark";
    applyTheme(nextTheme);
    window.localStorage.setItem("crlna-theme", nextTheme);
    setDark(!dark);
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle color theme">
      {dark ? "Light" : "Dark"}
    </button>
  );
}

function applyTheme(theme: "light" | "dark") {
  document.body.dataset.theme = theme;
  document.body.style.backgroundColor = theme === "dark" ? "#1a1817" : "#f1f2f3";
  document.body.style.color = theme === "dark" ? "#f2ece7" : "#1b1d1f";
}
