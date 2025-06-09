import React from 'react';
import useRagRecommend from '../../hooks/useRagRecommend';
import PaperCard from '../PaperCard/PaperCard';
import './RecommendationList.css';

/**
 * RecommendationList
 *   - Uses RAG to fetch top related papers based on the current paper's title
 *   - Displays the top 3 recommendations with ranking badges
 *   - Accepts `paperTitle` instead of `paperId` to query directly
 */
export default function RecommendationList({ paperTitle }) {
    const { recommendations, loading, error } = useRagRecommend(paperTitle);

    if (!paperTitle) {
        return <p>No paper title provided for recommendations.</p>;
    }
    if (loading) {
        return <p>Loading related papers…</p>;
    }
    if (error) {
        return <p className="error">Error loading related papers: {error}</p>;
    }
    // Exclude the current paper by title
    const filtered = recommendations.filter((p) => p.title !== paperTitle);
    if (filtered.length === 0) {
        return <p>No related papers found.</p>;
    }

    return (
        <div className="recommendation-list">
            <h3>Related Papers</h3>
            <div className="recommendation-grid">
                {filtered.slice(0, 3).map((p, idx) => (
                    <div key={p.id} className="recommendation-item">
                        {/* <span className="recommendation-rank">{idx + 1}</span> */}
                        <PaperCard paper={p} />
                    </div>
                ))}
            </div>
        </div>
    );
}
