import React, { useMemo } from 'react';
import useFetchPapers from '../hooks/useFetchPapers';
import PaperCard from '../components/PaperCard/PaperCard';
import SearchBar from '../components/SearchBar/SearchBar';
import './HomePage.css';

export default function HomePage() {
    const homeFilters = useMemo(() => ({}), []);
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
                <section>
                    <p>
                    Biomedical image analysis techniques are transforming the way many clinical interventions are performed and enabling the creation of new computer‐assisted interventions and surgical procedures. The Biomedical Image Analysis for Image‐Guided Interventions Laboratory (BAGL) investigates novel medical image processing and analysis techniques with emphasis on creating image analysis–based solutions to clinical problems.
                    </p>

                    <h3>Core Techniques</h3>
                    <ul>
                        <li>Deep learning</li>
                        <li>Statistical shape models</li>
                        <li>Graph search methods</li>
                        <li>Level set techniques</li>
                        <li>Image registration techniques</li>
                        <li>Image‐based bio‐models</li>
                    </ul>
                </section>
                {/* <div className="hero-search">
                <SearchBar />
                </div> */}
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
