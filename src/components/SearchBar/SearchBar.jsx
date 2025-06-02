import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SearchBar.css';

export default function SearchBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('q') || '';

    const [inputValue, setInputValue] = useState(initialQuery);

    function handleSubmit(e) {
        e.preventDefault();
        if (inputValue.trim() === '') return;
        // Redirect to /catalog with ?q=...
        navigate(`/catalog?q=${encodeURIComponent(inputValue.trim())}`);
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="search-input"
                placeholder="Search papers..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="search-button" aria-label="Search">
                🔍
            </button>
        </form>
    );
}
