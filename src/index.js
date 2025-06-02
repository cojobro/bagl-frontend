import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App';
import { APIProvider } from './context/APIContext';
import './styles/variables.css'; // optional

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <APIProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </APIProvider>
    </React.StrictMode>
);
