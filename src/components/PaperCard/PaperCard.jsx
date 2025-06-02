import React from 'react';
import { Link } from 'react-router-dom';
import './PaperCard.css';

/**
 * Receives:
 *   - paper: { id, title, authors: string[], year, tags: string[] }
 */
export default function PaperCard({ paper }) {
    const { id, title, authors = [], year, tags = [] } = paper;

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
                {tags.slice(0, 3).map((tag) => (
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
                href={`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'}/papers/${id}/pdf`}
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
