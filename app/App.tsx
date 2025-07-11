import React, { useState } from 'react';
import LoginScreen from '../src/screens/LoginScreen';
// import DashboardScreen from './src/screens/DashboardScreen'; // zrobisz później

export default function App() {
    const [token, setToken] = useState<string | null>(null);

    if (!token) {
        return <LoginScreen onLogin={setToken} />;
    }

    // return <DashboardScreen token={token} />;
    return null; // tymczasowo, do czasu zrobienia dashboardu
}