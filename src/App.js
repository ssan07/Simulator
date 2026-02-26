import React, { useState, useEffect } from 'react';
import './App.css';

import LoadingPage from './components/LoadingPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

// main application toggles between loading, login, and home
function App() {
  const [stage, setStage] = useState('loading'); // 'loading' | 'login' | 'home'

  useEffect(() => {
    const timeout = setTimeout(() => setStage('login'), 4000);
    return () => clearTimeout(timeout);
  }, []);

  const handleLogin = () => {
    setStage('home');
  };

  if (stage === 'loading') return <LoadingPage />;
  if (stage === 'login') return <LoginPage onProceed={handleLogin} />;
  return <HomePage />;
}

export default App;





