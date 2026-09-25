const TEXT = "Design thinking, engineering judgment, and the journey as the destination.";

export function AboutStatement() {
  const words = TEXT.split(" ");

  return (
    <p className="about-v2-kicker">
      {words.map((word, i) => {
        const clean = word.replace(/[.,]/g, "");
        const isKeyword = clean === "journey" || clean === "destination";
        return (
          <span key={i} className="about-word">
            {isKeyword ? <span className="kw-sage">{word}</span> : word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
