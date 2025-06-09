import React, { useState, useEffect } from 'react';
import './FilterSidebar.css';

export default function FilterSidebar({
    availableTags = [],
    availableYears = [],
    availableAuthors = [],
    selectedFilters = { tags: [], year: null, authors: [] },
    onChange,
}) {
    const [tags, setTags] = useState(selectedFilters.tags);
    const [year, setYear] = useState(selectedFilters.year);
    const [authors, setAuthors] = useState(selectedFilters.authors);

    useEffect(() => {
        onChange({ tags, year, authors });
    }, [tags, year, authors]);

    function toggleTag(tag) { // filters based on tag
        setTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    }

    function toggleAuthor(author) { // filters based on author
        setAuthors((prev) =>
        prev.includes(author)
            ? prev.filter((a) => a !== author)
            : [...prev, author]
        );
    }

    function clearAll() { // resets the tags
        setTags([]);
        setYear(null);
        setAuthors([]);
    }

    return (
        <aside className="filter-sidebar">
        <div className="filter-header">
            <h3>Filters</h3>
            <button className="clear-button" onClick={clearAll}>
            Clear All
            </button>
        </div>

        <div className="filter-section">
            <h4>Tags</h4>
            <div className="checkbox-group">
            {availableTags.map((tag) => (
                <label key={tag} className="checkbox-label">
                <input
                    type="checkbox"
                    checked={tags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                />
                {tag}
                </label>
            ))}
            </div>
        </div>

        <div className="filter-section">
            <h4>Year</h4>
            <select
            className="year-select"
            value={year ?? ''}
            onChange={(e) =>
                setYear(e.target.value === '' ? null : Number(e.target.value))
            }
            >
            <option value="">All</option>
            {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                {yr}
                </option>
            ))}
            </select>
        </div>

        <div className="filter-section">
            <h4>Authors</h4>
            <div className="checkbox-group">
            {availableAuthors.map((author) => (
                <label key={author} className="checkbox-label">
                <input
                    type="checkbox"
                    checked={authors.includes(author)}
                    onChange={() => toggleAuthor(author)}
                />
                {author}
                </label>
            ))}
            </div>
        </div>
        </aside>
    );
}
