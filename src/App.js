import React, { useState, useEffect } from 'react';
import './App.css';

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
function LoginPage() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="login-screen">
      <div className="login-overlay">
        <div className="login-info">
          <div className="time">{timeString}</div>
          <div className="date">{dateString}</div>
        </div>
      </div>
    </div>
  );
}

// main application toggles between loading and login
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // keep the fake loading screen up long enough to notice it
    const timeout = setTimeout(() => setLoading(false), 4000); // 4s loading
    return () => clearTimeout(timeout);
  }, []);

  return loading ? <LoadingPage /> : <LoginPage />;
}

export default App;

