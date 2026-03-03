import React, { useState, useEffect } from 'react';
import './App.css';

import LoadingPage from './components/LoadingPage';
import LoginPage from './components/LoginPage';
import WindowsLogin from './components/WindowsLogin';
import HomePage from './components/HomePage';

function App() {
  const [stage, setStage] = useState('loading'); 
  useEffect(() => {
    const timeout = setTimeout(() => setStage('login'), 4000);
    return () => clearTimeout(timeout);
  }, []);

  const handleLogin = () => {
    setStage('winlogin');
  };

  const handleAuthenticate = () => {
    setStage('home');
  };

  if (stage === 'loading') return <LoadingPage />;
  if (stage === 'login') return <LoginPage onProceed={handleLogin} />;
  if (stage === 'winlogin') return <WindowsLogin onAuthenticate={handleAuthenticate} />;
  return <HomePage />;
}

export default App;





