import React, { useState } from 'react';
import './SummaryPanel.css';

export default function SummaryPanel({ paperId }) {
    const [isOpen, setIsOpen] = useState(false);

    // In a real app, you’d call an API (e.g. via a useSummarize hook). Here, we mock.
    const mockSummary =
        "This is a placeholder summary. Once connected to the backend's summarization service, this panel will display the LLM-generated summary of the paper’s key objectives, methods, and findings.";

    return (
        <div className="summary-panel">
        <button
            className="toggle-summary"
            onClick={() => setIsOpen((prev) => !prev)}
        >
            {isOpen ? 'Hide Summary' : 'Show Summary'}
        </button>
        {isOpen && (
            <div className="summary-content">
            <p>{mockSummary}</p>
            </div>
        )}
        </div>
    );
}
