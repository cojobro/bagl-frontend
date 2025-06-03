import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import mockPapers from '../data/mockPapers';
import SummaryPanel from '../components/SummaryPanel/SummaryPanel';
import RecommendationList from '../components/RecommendationList/RecommendationList';
import './PaperDetailPage.css';

export default function PaperDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const paperId = Number(id);

    // Find the paper in our mock data
    const paper = useMemo(() => {
        return mockPapers.find((p) => p.id === paperId);
    }, [paperId]);

    if (!paper) {
        return (
        <div className="paper-detail-container">
            <h2>Paper Not Found</h2>
            <p>No paper with ID {paperId} was found.</p>
            <button className="back-button" onClick={() => navigate(-1)}>
            Go Back
            </button>
        </div>
        );
    }

    const { title, authors, year, tags, pdf } = paper;

    return (
        <div className="paper-detail-container">
        <div className="paper-header">
            <h1 className="paper-title-detail">{title}</h1>
            <p className="paper-metadata">
            <span className="detail-authors">{authors.join(', ')}</span> |{' '}
            <span className="detail-year">{year}</span>
            </p>
            <div className="detail-tags">
            {tags.map((tag) => (
                <span key={tag} className="detail-tag">
                {tag}
                </span>
            ))}
            </div>
            <div className="detail-buttons">
            <a href={pdf} target="_blank" rel="noopener noreferrer" className="detail-button">
                Download PDF
            </a>
            <button
                className="detail-button secondary"
                onClick={() => window.open(pdf, '_blank')}
            >
                Open in Browser
            </button>
            </div>
        </div>

        <div className="pdf-viewer-container">
            {/* Inline PDF viewer using an iframe */}
            <iframe
            src={pdf}
            title={`PDF Viewer - ${title}`}
            className="pdf-iframe"
            />
        </div>

        <div className="interaction-panels">
            <SummaryPanel paperId={paperId} />
            <RecommendationList paperId={paperId} />
        </div>

        <div className="back-link">
            <Link to="/catalog">← Back to Catalog</Link>
        </div>
        </div>
    );
}
