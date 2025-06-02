import React, { createContext, useContext } from 'react';

const APIContext = createContext();

/**
 * Example usage: wrap your app in <APIProvider>
 * Then, in any component: const { apiBaseUrl } = useAPI();
 */
export function APIProvider({ children }) {
    // You can adjust this to read from .env or window.location automatically.
    const apiBaseUrl =
        process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

    return (
        <APIContext.Provider value={{ apiBaseUrl }}>
        {children}
        </APIContext.Provider>
    );
}

export function useAPI() {
    return useContext(APIContext);
}
