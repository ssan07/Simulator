import React, { useState } from 'react';
import '../App.css';

export default function WindowsLogin({ onAuthenticate }) {
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const EXPECTED_USER = 'user';
  const EXPECTED_PWD = 'pwd';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === EXPECTED_USER && password === EXPECTED_PWD) {
      setError('');
      onAuthenticate();
    } else {
      setError('Invalid username or password');
      setPassword('');
    }
  };

  return (
    <div className="win-login-screen">
      <div className="win-login-box" role="dialog" aria-label="Sign in">
        <div className="win-avatar">Login</div>
        <div className="win-username">{username}</div>
        <form className="win-login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="win-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          /><br />
          <input
            type="password"
            className={`win-input ${error ? 'win-input-error' : ''}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="win-signin">Sign in</button>
        </form>
        {error && <div className="win-error">{error}</div>}
        <div className="win-hint">Press Enter or click Sign in</div>
      </div>
    </div>
  );
}
