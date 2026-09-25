const LINES = [
  ["Strategy", "+", "Design"],
  ["in", "critical spaces"],
];

export function HeroHeadline() {
  return (
    <h1 className="hero-v2-title">
      {LINES.map((line, lineIndex) => (
        <span className="hero-v2-line" key={lineIndex}>
          {line.map((word, wordIndex) => (
            <span className="hero-word" key={wordIndex}>
              {word}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
