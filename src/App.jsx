import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppHeader from './components/Layout/AppHeader';
import AppFooter from './components/Layout/AppFooter';

import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import PaperDetailPage from './pages/PaperDetailPage';
import RAGSearchPage from './pages/RAGSearchPage';

function App() {
    return (
        <div className="app-container">
            <AppHeader />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/rag-search" element={<RAGSearchPage />} />
                    <Route path="/papers/:id" element={<PaperDetailPage />} />
                    {/* Future: /papers/:id, /search */}
                </Routes>
            </main>
            <AppFooter />
        </div>
    );
}

export default App;
