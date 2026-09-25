function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const a = (a1: number, a2: number) => 1 - 3 * a2 + 3 * a1;
  const b = (a1: number, a2: number) => 3 * a2 - 6 * a1;
  const c = (a1: number) => 3 * a1;

  const calc = (t: number, a1: number, a2: number) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
  const slope = (t: number, a1: number, a2: number) => 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);

  const solveT = (x: number) => {
    let t = x;
    for (let i = 0; i < 6; i += 1) {
      const s = slope(t, x1, x2);
      if (s === 0) return t;
      t -= (calc(t, x1, x2) - x) / s;
    }
    return t;
  };

  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return calc(solveT(x), y1, y2);
  };
}

export const EASE_CSS = {
  expo: "cubic-bezier(.76,0,.24,1)",
  soft: "cubic-bezier(.2,.7,.2,1)",
  spring: "cubic-bezier(.3,1.7,.5,1)",
  nav: "cubic-bezier(.6,0,.2,1.2)",
} as const;

export const EASE_FN = {
  EXPO: cubicBezier(0.76, 0, 0.24, 1),
  SOFT: cubicBezier(0.2, 0.7, 0.2, 1),
  SPRING: cubicBezier(0.3, 1.7, 0.5, 1),
  NAV: cubicBezier(0.6, 0, 0.2, 1.2),
};
