import React, { useState, useMemo } from 'react';
import useSummarize from '../../hooks/useSummarize';
import './SummaryPanel.css';

export default function SummaryPanel({ paperId }) {
  const [visible, setVisible] = useState(false);
  const { summary, loading, error, fetchSummary } = useSummarize(paperId);

  // Parse summary into intro and sections, handling markdown bold titles and lists
  const parsed = useMemo(() => {
    if (!summary) return null;

    const parts = summary.split(/(?=\*\*.*?\*\*)/g);
    let intro = '';
    const sections = [];

    parts.forEach((part, idx) => {
      part = part.trim();
      const boldMatch = part.match(/^\*\*(.+?)\*\*:?\s*([\s\S]*)$/);
      if (boldMatch) {
        const title = boldMatch[1].trim();
        const rawText = boldMatch[2].trim();
        sections.push({ title, rawText });
      } else if (idx === 0) {
        intro = part;
      }
    });

    return { intro, sections };
  }, [summary]);

  // Render text or list based on markers
  function renderSectionContent(text) {
    // Detect lines starting with dash or numbered list
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const isList = lines.every((l) => /^([*-]|\d+\.)\s+/.test(l));
    if (isList) {
      return (
        <ul className="summary-list">
          {lines.map((line, idx) => {
            const itemMatch = line.match(/^([*-]|\d+\.)\s+(.*)$/);
            const content = itemMatch ? itemMatch[2] : line;
            return <li key={idx}>{content}</li>;
          })}
        </ul>
      );
    }
    // Else normal paragraph, preserve line breaks
    return text.split(/\r?\n/).map((para, i) => (
      <p key={i} className="summary-section-text">
        {para}
      </p>
    ));
  }

  function handleToggle() {
    if (!visible) fetchSummary();
    setVisible((v) => !v);
  }

  return (
    <div className="summary-panel-container">
      <button className="summary-toggle" onClick={handleToggle}>
        {visible ? 'Hide Summary' : 'Show Summary'}
      </button>

      {visible && (
        <div className="summary-panel-content">
          {loading && <p className="summary-loading">Loading summary…</p>}
          {error && <p className="summary-error">{error}</p>}
          {!loading && !error && parsed && (
            <>
              {parsed.intro && (
                <p className="summary-intro">
                  {parsed.intro}
                </p>
              )}
              {parsed.sections.map((sec, i) => (
                <div key={i} className="summary-section">
                  <h4 className="summary-section-title">{sec.title}</h4>
                  {renderSectionContent(sec.rawText)}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
