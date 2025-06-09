import { useState, useEffect } from 'react';
import mockPapers from '../data/mockPapers';

/**
 * useRagRecommend
 *   - Accepts: { query: string }
 *   - Returns: { recommendations: Array<Paper & { similarity: number }>, loading: boolean, error: string|null }
 *
 * Fetches real recommendations from the backend `/api/recommend` endpoint,
 * enriches mockPapers with similarity scores, and sorts descending by similarity.
 */
export default function useRagRecommend(query) {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Clear state if query is empty
        if (!query.trim()) {
            setRecommendations([]);
            setError(null);
            setLoading(false);
            return;
        }

        let isCancelled = false;
        async function fetchRecommendations() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_BASE_URL}/api/recommend`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ query }),
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                // Expect array of { id, title, pdf_path, similarity }
                const recs = await response.json();

                console.log('RAG recommendations similarity:');
                recs.forEach((r) => {
                    console.log(`- ${r.title}: similarity ${r.similarity.toFixed(4)}`);
                });

                // Enrich mockPapers with similarity and sort by similarity
                const enriched = recs
                    .map((r) => {
                        const match = mockPapers.find((p) => p.title === r.title);
                        return match ? { ...match, similarity: r.similarity } : null;
                    })
                    .filter((p) => p !== null)
                    .sort((a, b) => b.similarity - a.similarity);

                if (!isCancelled) {
                    setRecommendations(enriched);
                }
            } catch (err) {
                console.error('Error fetching RAG recommendations:', err);
                if (!isCancelled) {
                    setError('Failed to fetch recommendations.');
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        }

        fetchRecommendations();
        return () => {
            isCancelled = true;
        };
    }, [query]);

    return { recommendations, loading, error };
}
