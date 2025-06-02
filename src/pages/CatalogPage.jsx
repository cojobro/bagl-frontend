import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';   // ← useLocation instead of useSearchParams
import useFetchPapers from '../hooks/useFetchPapers';
import PaperCard from '../components/PaperCard/PaperCard';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import './CatalogPage.css';

export default function CatalogPage() {
    // parse query params manually from location.search
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const initialQuery = params.get('q') || '';

    // Local filter state
    const [filters, setFilters] = useState({
        tags: [],
        year: null,
        authors: [],
    });
    const [page, setPage] = useState(1);

    // Call the hook with default import
    const { papers, totalCount, loading, error } = useFetchPapers({
        page,
        pageSize: 12,
        filters,
        searchQuery: initialQuery,
    });

    // Placeholder filter options (you can replace these with real API calls later)
    const [availableTags] = useState(['segmentation', 'MRI', 'deep-learning']);
    const [availableYears] = useState([2021, 2022, 2023]);
    const [availableAuthors] = useState(['Smith J.', 'Doe A.', 'Lee K.']);

    return (
        <div className="catalog-container">
        <h2 className="catalog-title">Paper Catalog</h2>

        <div className="catalog-inner">
            <div className="sidebar-wrapper">
            <FilterSidebar
                availableTags={availableTags}
                availableYears={availableYears}
                availableAuthors={availableAuthors}
                selectedFilters={filters}
                onChange={(newFilters) => {
                setFilters(newFilters);
                setPage(1);
                }}
            />
            </div>

            <div className="papers-wrapper">
            {loading && <p>Loading papers…</p>}
            {error && <p className="error-text">Error: {error}</p>}
            {!loading && !error && papers.length === 0 && (
                <p>No papers found for the selected criteria.</p>
            )}
            <div className="papers-grid">
                {papers.map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
                ))}
            </div>
            {/* TODO: Pagination controls */}
            </div>
        </div>
        </div>
    );
}
