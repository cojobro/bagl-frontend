import React from 'react';
import { Link } from 'react-router-dom';
import './PaperCard.css';

/**
 * Receives:
 *   - paper: { id, title, authors: string[], year, tags: string[] }  <- added paper for mock data
 */
export default function PaperCard({ paper }) {
    const { id, title, authors = [], year, tags = [], pdf } = paper;

    // If `paper.pdf` is provided, use that; otherwise fallback to API URL
    const downloadUrl = pdf || `${process.env.REACT_APP_API_BASE_URL}/papers/${id}/pdf`;

    return (
        <div className="paper-card">
            <div className="paper-card-header">
                <Link to={`/papers/${id}`} className="paper-title">
                {title}
                </Link>
            </div>
            <p className="paper-authors">{authors.join(', ')}</p>
            <p className="paper-year">{year}</p>
            <div className="paper-tags">
                {tags.slice(0, 5).map((tag) => (
                <span key={tag} className="paper-tag">
                    {tag}
                </span>
                ))}
            </div>
            <div className="card-actions">
                <Link to={`/papers/${id}`} className="action-button">
                Details
                </Link>
                <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-button secondary"
                >
                    Download
                </a>
            </div>
        </div>
    );
}
