import { useState, useEffect } from 'react';
import mockPapers from '../data/mockPapers';

/**
 * useRagRecommend
 *   - Accepts: { query: string }
 *   - Returns: { recommendations: Array<Paper>, loading: boolean, error: string|null }
 * 
 * Currently: we simulate a RAG call by returning all mockPapers
 * after a short timeout. Replace with real fetch to /api/recommend when backend is ready.
 */
export default function useRagRecommend(query) {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // If query is empty, clear recommendations immediately
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
                // Simulate network delay
                await new Promise((r) => setTimeout(r, 500));

                if (!isCancelled) {
                    // In a real app, call your backend:
                    // const res = await fetch(apiBaseUrl + '/recommend', { method: 'POST', body: JSON.stringify({ query }) });
                    // const data = await res.json();
                    // setRecommendations(data.papers);

                    // For now: just return all mockPapers
                    setRecommendations(mockPapers);
                }
            } catch (err) {
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
