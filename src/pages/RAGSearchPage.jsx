import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useRagRecommend from '../hooks/useRagRecommend';
import PaperCard from '../components/PaperCard/PaperCard';
import './RAGSearchPage.css';

export default function RAGSearchPage() {
    const [inputValue, setInputValue] = useState('');
    const [submittedQuery, setSubmittedQuery] = useState('');
    const { recommendations, loading, error } = useRagRecommend(submittedQuery);

    function handleSubmit(e) {
        e.preventDefault();
        if (inputValue.trim() === '') return;
        setSubmittedQuery(inputValue.trim());
    }

    return (
        <div className="rag-search-container">
        <h2 className="rag-search-title">RAG Paper Recommendation</h2>
        <p className="rag-search-subtitle">
            Enter a specialized query below (e.g. “deep learning MRI segmentation”) to get AI-driven paper recommendations.
        </p>

        <form className="rag-search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="rag-search-input"
                placeholder="Type your RAG query here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="rag-search-button">
                Search
            </button>
        </form>

        {submittedQuery && (
            <div className="rag-results-section">
            <h3 className="rag-results-title">
                Recommendations for “{submittedQuery}”
            </h3>

            {loading && <p className="rag-loading">Loading recommendations…</p>}
            {error && <p className="rag-error">Error: {error}</p>}
            {!loading && !error && recommendations.length === 0 && (
                <p className="rag-no-results">
                No recommendations found for “{submittedQuery}”.
                </p>
            )}
            {!loading && !error && recommendations.length > 0 && (
                <div className="rag-results-grid">
                {recommendations.map((paper) => (
                    <PaperCard key={paper.id} paper={paper} />
                ))}
                </div>
            )}
            </div>
        )}

        <div className="rag-back-link">
            <Link to="/catalog">← Back to Catalog</Link>
        </div>
        </div>
    );
}
