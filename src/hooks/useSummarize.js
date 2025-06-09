// src/hooks/useSummarize.js
import { useState, useEffect } from 'react';

/**
 * useSummarize
 * @param {number|null} paperId - ID of the paper to summarize
 * @returns {{ summary: string, loading: boolean, error: string|null, fetchSummary: ()=>void }}
 */
export default function useSummarize(paperId) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchSummary() {
    if (!paperId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/summarize`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paperId }),
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      console.error('Error fetching summary:', err);
      setError('Failed to load summary');
    } finally {
      setLoading(false);
    }
  }

  // Optionally auto-fetch when paperId changes
  useEffect(() => {
    setSummary('');
    if (paperId) fetchSummary();
  }, [paperId]);

  return { summary, loading, error, fetchSummary };
}