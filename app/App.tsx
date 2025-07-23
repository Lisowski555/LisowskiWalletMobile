import React, {useState} from 'react';
import LoginScreen from '../src/screens/LoginScreen';
import DashboardScreen from '../src/screens/DashboardScreen';

export default function App() {
    const [token, setToken] = useState<string | null>(null);

    if (!token) {
        return <LoginScreen onLogin={setToken}/>;
    }

    return <DashboardScreen token={token}/>;
}