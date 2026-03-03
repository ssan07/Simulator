import React from 'react';
import './Taskbar.css';

const taskbarIconFiles = ['copilot-task.png', 'app-task.png'];

const tbIcons = taskbarIconFiles.map((f) => {
  try {
    return require(`../assets/taskbar/icons/${f}`);
  } catch (_e) {
    return null;
  }
}).filter(Boolean);

export default function Taskbar({ onStartClick, openFiles = [] }) {
  return (
    <div className="taskbar">
      <div className="taskbar-section start" onClick={onStartClick}>
        <div className="start-logo">
          <div className="start-piece" />
          <div className="start-piece" />
          <div className="start-piece" />
          <div className="start-piece" />
        </div>
      </div>

      {openFiles.map((f) => (
        <div key={f.id} className="taskbar-section icon file-open" title={f.name}>
          {f.name === 'Desktop' ? (
            <svg width="20" height="20" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="10" width="48" height="32" rx="4" fill="#0078D7"/>
              <rect x="12" y="14" width="40" height="24" rx="2" fill="#5DB9FF"/>
              <rect x="26" y="44" width="12" height="6" rx="2" fill="#444"/>
              <rect x="18" y="50" width="28" height="4" rx="2" fill="#666"/>
            </svg>
          ) : f.name === 'Recycle Bin' ? (
            <svg width="20" height="20" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <rect x="18" y="20" width="28" height="34" rx="4" fill="#A0D8FF" stroke="#0078D7" strokeWidth="2"/>
              <rect x="16" y="14" width="32" height="6" rx="2" fill="#0078D7"/>
              <rect x="26" y="10" width="12" height="4" rx="2" fill="#005A9E"/>
            </svg>
          ) : (
            <div className="file-icon">📄</div>
          )}
          <div className="file-name">{f.name}</div>
        </div>
      ))}

      {tbIcons.map((src, idx) => (
        <div key={idx} className="taskbar-section icon">
          <img src={src} alt={`icon-${idx}`} />
        </div>
      ))}

      <div className="taskbar-section multiwindow">
        <div className="multiwin-1" />
        <div className="multiwin-2" />
      </div>
      <div className="taskbar-section clock">{new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
    </div>
  );
}










































