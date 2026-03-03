import React, { useState } from 'react';
import bgImage from '../assets/login-bg.jpg';
import '../App.css';

export default function WindowsLogin({ onAuthenticate }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const EXPECTED_USER = 'user';
  const EXPECTED_PWD = 'pwd';

  const handleSubmit = (e) => {
    e && e.preventDefault();
    if (EXPECTED_PWD === password) {
      setError('');
      onAuthenticate();
    } else {
      setError('Incorrect PIN');
      setPassword('');
    }
  };

  return (
    <div className="win-login-screen">
      <div
        className="win-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden
      />
      <div className="win-overlay" />

      <div className="win-login-ui" role="dialog" aria-label="Sign in">
        <div className="win-avatar">USER</div>
        <div className="win-username">{EXPECTED_USER}</div>
        <form onSubmit={handleSubmit} className="win-pin-form">
          <input
            type="password"
            inputMode="numeric"
            className="win-pin-input"
            placeholder="password:pwd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        {error && <div className="win-error">{error}</div>}
      </div>
    </div>
  );
}
