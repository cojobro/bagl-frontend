// src/pages/CatalogPage.jsx

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetchPapers from '../hooks/useFetchPapers';
import PaperCard from '../components/PaperCard/PaperCard';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import './CatalogPage.css';

export default function CatalogPage() {
    // 1) Read `?q=...` from the URL
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get('q')?.trim() || '';

    // 2) Local state for filters (tags, year, authors)
    const [filters, setFilters] = useState({ tags: [], year: null, authors: [] });
    const [page] = useState(1);

    // 3) Fetch all papers (mockData for now). We pass an empty filters object here to avoid flicker.
    const { papers, loading, error } = useFetchPapers({
        page,
        pageSize: 12,
        filters: {},
        searchQuery: initialQuery, // hook ignores this, but we’ll use initialQuery below
    });

    // 4) Derive the available filter options from the full list of `papers`
    const availableTags = useMemo(() => {
        const tagSet = new Set();
        papers.forEach((paper) => {
        (paper.tags || []).forEach((t) => tagSet.add(t));
        });
        return Array.from(tagSet).sort();
    }, [papers]);

    const availableAuthors = useMemo(() => {
        const authorSet = new Set();
        papers.forEach((paper) => {
        (paper.authors || []).forEach((a) => authorSet.add(a));
        });
        return Array.from(authorSet).sort();
    }, [papers]);

    const availableYears = useMemo(() => {
        const yearSet = new Set();
        papers.forEach((paper) => {
        if (paper.year != null) yearSet.add(Number(paper.year));
        });
        return Array.from(yearSet)
        .sort((a, b) => b - a);
    }, [papers]);

    // 5) Client‐side filtering: apply searchQuery AND selected tags/authors/year
    const filteredPapers = useMemo(() => {
        const q = initialQuery.toLowerCase();

        return papers.filter((paper) => {
        // --- (A) Text search (title, authors, tags) if q is non‐empty ---
        if (q) {
            const inTitle = paper.title.toLowerCase().includes(q);

            // Check if any author name contains the query
            const inAuthors =
            Array.isArray(paper.authors) &&
            paper.authors.some((a) => a.toLowerCase().includes(q));

            // Check if any tag contains the query
            const inTags =
            Array.isArray(paper.tags) &&
            paper.tags.some((t) => t.toLowerCase().includes(q));

            if (!inTitle && !inAuthors && !inTags) {
            return false; // no match, exclude
            }
        }

        // --- (B) Tag filter: if filters.tags is non‐empty, require at least one match ---
        if (filters.tags.length > 0) {
            const paperTags = Array.isArray(paper.tags) ? paper.tags : [];
            const hasMatchingTag = filters.tags.some((tag) =>
            paperTags.includes(tag)
            );
            if (!hasMatchingTag) return false;
        }

        // --- (C) Author filter: if filters.authors is non‐empty, require at least one match ---
        if (filters.authors.length > 0) {
            const paperAuthors = Array.isArray(paper.authors)
            ? paper.authors
            : [];
            const hasMatchingAuthor = filters.authors.some((author) =>
            paperAuthors.includes(author)
            );
            if (!hasMatchingAuthor) return false;
        }

        // --- (D) Year filter: if filters.year is set, require exact match ---
        if (filters.year != null) {
            if (Number(paper.year) !== Number(filters.year)) return false;
        }

        // Passed all active filters
        return true;
        });
    }, [papers, initialQuery, filters]);

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
                }}
            />
            </div>

            <div className="papers-wrapper">
            {loading && <p>Loading papers…</p>}
            {error && <p className="error-text">Error: {error}</p>}
            {!loading && !error && filteredPapers.length === 0 && (
                <p>No papers match the selected search/filters.</p>
            )}
            <div className="papers-grid">
                {filteredPapers.map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
                ))}
            </div>
            {/* TODO: Pagination controls here, based on filteredPapers.length */}
            </div>
        </div>
        </div>
    );
}
