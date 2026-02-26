import React from 'react';
import '../App.css';

// simple taskbar placeholder with some typical sections
export default function Taskbar() {
  return (
    <div className="taskbar">
      <div className="taskbar-section start">
        <div className="start-logo">
          <div className="start-piece" />
          <div className="start-piece" />
          <div className="start-piece" />
          <div className="start-piece" />
        </div>
      </div>
      <div className="taskbar-section search">Search</div>
      <div className="taskbar-section pins">[Pinned]</div>
      <div className="taskbar-section tray">[Tray]</div>
      <div className="taskbar-section clock">{new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
    </div>
  );
}
