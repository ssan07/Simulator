import React from 'react';
import '../App.css';

// a fullscreen loading page mimicking the Windows boot animation
export default function LoadingPage() {
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

