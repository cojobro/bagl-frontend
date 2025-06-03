// src/pages/PaperDetailPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

export default function PaperDetailPage() {
    const { id } = useParams();
    return (
        <div style={{ padding: '1rem' }}>
            <h2>Paper Detail (ID: {id})</h2>
            <p>This is a placeholder page for paper #{id}. You can build out the full detail view here later.</p>
        </div>
    );
}
