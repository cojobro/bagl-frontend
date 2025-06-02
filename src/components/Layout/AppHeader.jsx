import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import './AppHeader.css';

export default function AppHeader() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // If user is on catalog, keep the search query in sync via SearchBar
    return (
        <header className="app-header">
        <div className="header-content">
            <div className="logo-container">
            <Link to="/" className="logo">
                BAGL Lab
            </Link>
            </div>

            <nav className="nav-links">
            <Link
                to="/"
                className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            >
                Home
            </Link>
            <Link
                to="/catalog"
                className={`nav-link ${pathname === '/catalog' ? 'active' : ''}`}
            >
                Catalog
            </Link>
            {/* Future links: About, Admin, etc. */}
            </nav>

            <div className="search-container">
            <SearchBar />
            </div>
        </div>
        </header>
    );
}
