import React from 'react';
import './FileWindow.css';

// files: array of { id, name }
export default function FileWindow({ title = 'Files', files = [], onClose }) {
  return (
    <div className="file-window">
      <div className="file-nav">
        <div className="file-path">{title}</div>
        <div className="file-controls">
          <button className="fw-btn" onClick={onClose}>_</button>
          <button className="fw-btn" onClick={onClose}>▢</button>
          <button className="fw-btn close" onClick={onClose}>✕</button>
        </div>
      </div>

      <div className="file-toolbar">
        <div className="fw-icon">📁</div>
        <div className="fw-icon">🔍</div>
        <div className="fw-icon">✂️</div>
        <div style={{marginLeft:'auto'}} className="fw-meta">{files.length} items</div>
      </div>

      <div className="file-content">
        {files.length === 0 ? (
          <div className="fw-empty">No files</div>
        ) : (
          <div className="fw-grid">
            {files.map((f) => (
              <div key={f.id} className="fw-item">
                <div className="fw-item-icon">📄</div>
                <div className="fw-item-name">{f.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
