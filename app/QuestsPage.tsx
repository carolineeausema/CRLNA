"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { quests } from "./data";

export function QuestsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => window.dispatchEvent(new Event("resize")), 230);
    return () => clearTimeout(timeout);
  }, [openIndex]);

  return (
    <main className="detail-page quests-page">
      <div className="detail-breadcrumb"><Link href="/">&lt;- Home</Link></div>
      <section className="quests-section">
        <div className="section-heading">
          <h2>Side Quests</h2>
          <p>You found my work in progress. This will be added to the main page soon!</p>
        </div>

        <div className="quest-rows">
          {quests.map((quest, index) => {
            const isOpen = openIndex === index;
            return (
              <div className="quest-row-wrap" key={quest.title}>
                <button
                  className="quest-row"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`quest-row-panel-${index}`}
                >
                  <span className="quest-date">{quest.date}</span>
                  <span className="quest-title-stack">
                    <span className={`quest-kicker${isOpen ? " is-open" : ""}`}>
                      {quest.status}
                    </span>
                    <span className={`quest-kicker quest-kicker-mobile${isOpen ? " is-open" : ""}`}>
                      {`${quest.status} · ${quest.date}`}
                    </span>
                    <span className="quest-row-title">{quest.title}</span>
                  </span>
                  <span className="quest-domain">{quest.domain}</span>
                  <span className={`quest-toggle-icon${isOpen ? " is-open" : ""}`} aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div className={`quest-panel-wrap${isOpen ? " is-open" : ""}`}>
                  <div className="quest-panel-inner">
                    <div className="quest-panel" id={`quest-row-panel-${index}`}>
                      <div className="quest-panel-copy">
                        <p className="quest-panel-body">{quest.body}</p>
                        <dl className="quest-facts">
                          {quest.facts.map((fact) => (
                            <div className="quest-fact" key={fact.label}>
                              <dt>{fact.label}</dt>
                              <dd>{fact.value}</dd>
                            </div>
                          ))}
                        </dl>
                        {quest.link && (
                          <a className="quest-link" href={quest.link} target="_blank" rel="noreferrer">
                            Visit site -&gt;
                          </a>
                        )}
                        {(["press", "process"] as const).map((type) => {
                          const items = quest.links?.filter((item) => item.type === type) ?? [];
                          if (items.length === 0) return null;
                          return (
                            <div className="quest-link-group" key={type}>
                              <span className="quest-link-heading">
                                {type === "press" ? "Press" : "Process"}
                              </span>
                              <ul className="quest-link-list">
                                {items.map((item) => (
                                  <li key={item.href}>
                                    <a className="quest-link" href={item.href} target="_blank" rel="noreferrer">
                                      {item.label} -&gt;
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                      <figure className="quest-panel-photo">
                        <div className="quest-photo-frame">
                          <img src={encodeURI(quest.photo)} alt={quest.title} />
                          {quest.label && <span className="photo-caption">{quest.label}</span>}
                        </div>
                        {quest.caption && <figcaption>{quest.caption}</figcaption>}
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
