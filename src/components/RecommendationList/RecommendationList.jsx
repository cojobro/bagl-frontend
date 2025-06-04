import React, { useMemo } from 'react';
import mockPapers from '../../data/mockPapers';
import PaperCard from '../PaperCard/PaperCard';
import './RecommendationList.css';

/**
 * Shows “related” papers by simply filtering out the current paper.
 * In the future use a way of scoring similarity based off similar keywords/tokens
 */
export default function RecommendationList({ paperId }) {
    const related = useMemo(() => {
        return mockPapers.filter((p) => p.id !== paperId);
    }, [paperId]);

    return (
        <div className="recommendation-list">
            <h3>Related Papers</h3>
            {related.length === 0 ? (
                <p>No related papers available.</p>
            ) : (
                <div className="recommendation-grid">
                    {related.map((p) => (
                        <PaperCard key={p.id} paper={p} />
                    ))}
                </div>
            )}
        </div>
    );
}
