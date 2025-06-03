import React, { useMemo } from 'react';
import useFetchPapers from '../hooks/useFetchPapers';
import PaperCard from '../components/PaperCard/PaperCard';
import SearchBar from '../components/SearchBar/SearchBar';
import './HomePage.css';

export default function HomePage() {
    const homeFilters = useMemo(() => ({}), []);
    // For “featured papers,” we’ll just fetch the first page and take the first 3 for now.
    const { papers, loading, error } = useFetchPapers({
        page: 1,
        pageSize: 3,
        filters: homeFilters,
        searchQuery: '',
    });

    return (
        <div className="home-container">
            <section className="hero-section">
                <h1 className="hero-title">BAGL Lab Research Portal</h1>
                <p className="hero-subtitle">
                Browse, summarize, and discover cutting‐edge biomedical image analysis papers from Vanderbilt’s BAGL.
                </p>
                <div className="hero-search">
                <SearchBar />
                </div>
            </section>

            <section className="featured-section">
                <h2 className="section-title">Featured Papers</h2>
                {loading && <p>Loading papers…</p>}
                {error && <p className="error-text">Error: {error}</p>}
                {!loading && !error && (
                <div className="featured-grid">
                    {papers.map((paper) => (
                    <PaperCard key={paper.id} paper={paper} />
                    ))}
                </div>
                )}
            </section>
        </div>
    );
}
