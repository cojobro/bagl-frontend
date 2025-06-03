// src/hooks/useFetchPapers.js

import { useState, useEffect } from 'react';
import mockPapers from '../data/mockPapers';

/**
* useFetchPapers (mock version)
*  - Ignores page/filters/searchQuery for now and simply returns the full mock list
*/
export default function useFetchPapers({
    page = 1,
    pageSize = 20,
    filters = {},
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
            // Simulate a tiny delay so the “Loading…” text is visible
            await new Promise((r) => setTimeout(r, 200));
            if (!isCancelled) {
            // For now: ignore filters/searchQuery/page; return all mockPapers
            setPapers(mockPapers);
            setTotalCount(mockPapers.length);
            }
        } catch (err) {
            if (!isCancelled) setError('Failed to load mock papers');
        } finally {
            if (!isCancelled) setLoading(false);
        }
        }

        loadMockData();
        return () => {
        isCancelled = true;
        };
    }, [page, pageSize, filters, searchQuery]);

    return { papers, totalCount, loading, error };
}
