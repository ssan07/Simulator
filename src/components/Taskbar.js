import React from 'react';
import '../App.css';

// static list of taskbar files; replace or add names as needed
const taskbarIconFiles = ['copilot-task.png', 'app-task.png'];

const tbIcons = taskbarIconFiles.map((f) => {
  try {
    return require(`../assets/taskbar/icons/${f}`);
  } catch (_e) {
    return null;
  }
}).filter(Boolean);

// simple taskbar placeholder with some typical sections
// download start or multiwindow icons somewhere
export default function Taskbar({ onStartClick }) {
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










