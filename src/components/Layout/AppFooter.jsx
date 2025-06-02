import React from 'react';
import './AppFooter.css';

export default function AppFooter() {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p>© {new Date().getFullYear()} BAGL Lab, Vanderbilt University</p>
                <p>
                Built with&nbsp;
                <a
                    href="https://reactjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    React
                </a>
                ,&nbsp;
                <a
                    href="https://expressjs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Express
                </a>
                , and&nbsp;
                <a
                    href="https://www.postgresql.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    PostgreSQL
                </a>
                .
                </p>
            </div>
        </footer>
    );
}
