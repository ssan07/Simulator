import React from 'react';
import '../App.css';

// static list of filenames (replace these with your own image names)
const startIconFiles = [
  'copilot.png',
  'app2.png',
  'app3.png',
  'app4.png',
  'app5.png',
  'app6.png'
];

// resolve to actual imports if present
const startIcons = startIconFiles.map((f) => {
  try {
    return require(`../assets/start/icons/${f}`);
  } catch (_e) {
    return null;
  }
}).filter(Boolean);

export default function StartMenu() {
  return (
    <div className="start-menu">
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <div className="pinned-section">
        {startIcons.map((src, idx) => (
          <div key={idx} className="pinned-item">
            <img src={src} alt={`icon-${idx}`} />
          </div>
        ))}
      </div>
      <div className="recommended-section">
        <div className="recommended-header">Recommended</div>
        <div className="recommended-list">
          <div className="rec-item">Item 1</div>
          <div className="rec-item">Item 2</div>
        </div>
      </div>
    </div>
  );
}