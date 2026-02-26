import React, { useState, useEffect } from 'react';
import './App.css';
import loginBg from './assets/login-bg.jpg';
import homeBg from './assets/home-bg.jpg';
import bgImage from './assets/login-bg.jpg';

// a fullscreen loading page mimicking the Windows boot animation
function LoadingPage() {
  return (
    <div className="loading-screen">
      <div className="windows-logo">
        {/* simple four‑pane Windows logo as inline SVG */}
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 3.5l22 .5v20l-22-3.5v-17zM24 3l24 .5v20l-24-3v-17zm0 22l24 .5V44l-24-.5v-19zm-24 1l22 .5v19L0 44v-18z" />
        </svg>
      </div>
      <div className="spinner">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

// login page with background photo and live date/time
// calls onProceed when the user clicks or presses Enter
function LoginPage({ onProceed }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // handle enter key globally
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter') {
        onProceed();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onProceed]);

  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div
      className="login-screen"
      onClick={onProceed}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="login-overlay">
        <div className="login-info">
          <div className="time">{timeString}</div>
          <div className="date">{dateString}</div>
        </div>
      </div>
    </div>
  );
}

// simple home screen shown after successful "login"
function HomePage() {
  return (
    <div
      className="home-screen"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      <h1>Welcome to the Home Screen</h1>
      <p>Press F5 to reload the demo.</p>
    </div>
  );
}

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











