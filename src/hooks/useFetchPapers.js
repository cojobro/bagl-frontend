import { useState, useEffect } from 'react';
import { useAPI } from '../context/APIContext';
import qs from 'qs';

/**
 * Custom hook to fetch a paginated list of papers.
 *
 * @param {Object} options 
 *   - page: number (default 1)
 *   - pageSize: number (default 20)
 *   - filters: { tags?: string[], year?: number, authors?: string[] }
 *   - searchQuery: string (optional, for full-text search in catalog)
 */
export default function useFetchPapers({
    page = 1,
    pageSize = 20,
    filters = {},
    searchQuery = '',
}) {
    const { apiBaseUrl } = useAPI();
    const [papers, setPapers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCancelled = false;

        async function fetchData() {
        setLoading(true);
        setError(null);

        // Build query params
        const params = {
            page,
            pageSize,
            ...(searchQuery ? { q: searchQuery } : {}),
        };

        // Only include non‐empty filter arrays
        if (filters.tags?.length) params.tags = filters.tags.join(',');
        if (filters.year) params.year = filters.year;
        if (filters.authors?.length) params.authors = filters.authors.join(',');

        const queryString = qs.stringify(params);
        const url = `${apiBaseUrl}/papers?${queryString}`;

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json(); // expecting { data: [...], totalCount }
            if (!isCancelled) {
            setPapers(json.data);
            setTotalCount(json.totalCount || 0);
            }
        } catch (err) {
            if (!isCancelled) setError(err.message || 'Unknown error');
        } finally {
            if (!isCancelled) setLoading(false);
        }
        }

        fetchData();
        return () => {
        isCancelled = true;
        };
    }, [apiBaseUrl, page, pageSize, filters, searchQuery]);

    return { papers, totalCount, loading, error };
}
