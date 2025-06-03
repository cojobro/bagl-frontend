// src/hooks/useFetchPapers.js

import { useState, useEffect } from 'react';
import mockPapers from '../data/mockPapers';

/**
 * useFetchPapers (mock version)
 *   - Ignores filters & searchQuery when deciding whether to re‐fetch.
 *   - Returns all mockPapers once, then never flickers again.
 */
export default function useFetchPapers({
    page = 1,
    pageSize = 20,
    filters = {}, // not depended on but still accepted
    searchQuery = '',
}) {
    const [papers, setPapers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCancelled = false;

        async function loadMockData() {
        setLoading(true);
        setError(null);

        try {
            // simulate a short delay so the “Loading…” text is visible
            await new Promise((r) => setTimeout(r, 200));
            if (!isCancelled) {
            setPapers(mockPapers);
            setTotalCount(mockPapers.length);
            }
        } catch (err) {
            if (!isCancelled) {
            setError('Failed to load mock papers');
            }
        } finally {
            if (!isCancelled) {
            setLoading(false);
            }
        }
        }

        loadMockData();
        return () => {
        isCancelled = true;
        };
    // Only re‐run when page or pageSize changes.  We omit filters & searchQuery entirely.
    }, [page, pageSize]);

    return { papers, totalCount, loading, error };
}
