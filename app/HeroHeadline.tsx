const LINES = [
  ["Strategy", "+", "Design"],
  ["in", "critical spaces"],
];

// On phones the headline reflows to three lines ("Strategy +" / "Design in" / "critical spaces");
// these words are followed by a break that only displays at mobile widths.
const MOBILE_BREAK_AFTER = new Set(["+", "in"]);

export function HeroHeadline() {
  return (
    <h1 className="hero-v2-title">
      {LINES.map((line, lineIndex) => (
        <span className="hero-v2-line" key={lineIndex}>
          {line.map((word, wordIndex) => (
            <span className="hero-word-group" key={wordIndex}>
              <span className="hero-word">{word}</span>
              {MOBILE_BREAK_AFTER.has(word) && <span className="hero-break" aria-hidden="true" />}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
