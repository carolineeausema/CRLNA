"use client";

import { useState } from "react";
import type { ComplianceExplorerData, ComplianceStatus } from "./data";

const STATUS_LABEL: Record<ComplianceStatus, string> = {
  current: "Current",
  flagged: "Flagged",
  review: "Needs review",
};

export function ComplianceExplorer({ data }: { data: ComplianceExplorerData }) {
  const [active, setActive] = useState<Set<string>>(
    () => new Set(data.defaultActiveIds ?? (data.domains[0] ? [data.domains[0].id] : []))
  );
  const [focusedId, setFocusedId] = useState<string | null>(
    data.defaultActiveIds?.[0] ?? data.domains[0]?.id ?? null
  );
  const [selectedControlId, setSelectedControlId] = useState<string | null>(null);

  function handleRowClick(id: string) {
    const isActive = active.has(id);
    const isFocused = focusedId === id;
    setSelectedControlId(null);

    if (isActive && isFocused) {
      const next = new Set(active);
      next.delete(id);
      setActive(next);
      const remaining = data.domains.find((domain) => domain.id !== id && next.has(domain.id));
      setFocusedId(remaining ? remaining.id : null);
      return;
    }

    const next = new Set(active);
    next.add(id);
    setActive(next);
    setFocusedId(id);
  }

  const focusedDomain = data.domains.find((domain) => domain.id === focusedId) ?? null;

  return (
    <div className="explorer-block">
      {data.intro && <p className="explorer-intro">{data.intro}</p>}
      <div className="explorer-frame">
        <div className="explorer-sim-banner">
          <span className="explorer-sim-tag">Simulation screens</span>
          <span className="explorer-sim-copy">Interactive mockup. Click around!</span>
        </div>
        <div className="explorer">
          <div className="explorer-sidebar">
            <p className="explorer-col-label">Regulatory domain examples</p>
            <ul className="explorer-domain-list">
              {data.domains.map((domain) => {
                const isActive = active.has(domain.id);
                const isFocused = focusedId === domain.id;
                return (
                  <li key={domain.id}>
                    <button
                      type="button"
                      className={`explorer-domain-row${isActive ? " active" : ""}${isFocused ? " focused" : ""}`}
                      onClick={() => handleRowClick(domain.id)}
                      aria-pressed={isActive}
                    >
                      <span className="explorer-domain-check" aria-hidden="true" />
                      <span className="explorer-domain-name">{domain.shortName}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="explorer-center">
            {focusedDomain ? (
              <>
                <p className="explorer-col-label">Example checks: {focusedDomain.name}</p>
                <p className="explorer-domain-summary">{focusedDomain.summary}</p>
                <ul className="explorer-control-list">
                  {focusedDomain.controls.map((control) => (
                    <li key={control.id}>
                      <button
                        type="button"
                        className={`explorer-control-card status-${control.status}${selectedControlId === control.id ? " selected" : ""}`}
                        onClick={() => setSelectedControlId((id) => (id === control.id ? null : control.id))}
                        aria-pressed={selectedControlId === control.id}
                      >
                        <span className="explorer-control-code">{control.code}</span>
                        <span className="explorer-control-title">{control.title}</span>
                        <span className="explorer-status-chip">{STATUS_LABEL[control.status]}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="explorer-empty">Toggle a domain on the left to see example checks.</p>
            )}
          </div>

          <div className="explorer-right">
            <p className="explorer-col-label">Example documentation outcomes</p>
            {focusedDomain ? (
              <ul className="explorer-outcome-list">
                {focusedDomain.outcomes.map((outcome) => {
                  const dimmed = selectedControlId !== null && !outcome.controlIds.includes(selectedControlId);
                  return (
                    <li
                      key={outcome.id}
                      className={`explorer-outcome-card status-${outcome.status}${dimmed ? " dimmed" : ""}`}
                    >
                      <div className="explorer-outcome-head">
                        <span className="explorer-outcome-doc">{outcome.doc}</span>
                        <span className="explorer-status-chip">{STATUS_LABEL[outcome.status]}</span>
                      </div>
                      <p className="explorer-outcome-detail">{outcome.detail}</p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="explorer-empty">—</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
