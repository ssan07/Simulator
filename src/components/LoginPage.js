import React, { useState, useEffect } from 'react';
import bgImage from '../assets/login-bg.jpg';
import '../App.css';

// login page with background photo and live date/time
// calls onProceed when the user clicks or presses Enter
export default function LoginPage({ onProceed }) {
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
