import React, { useState, useEffect } from 'react';
import '../App.css';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';

// collect all images from the assets/home directory
const homeImages = [];
function importAll(r) {
  r.keys().forEach((key) => homeImages.push(r(key)));
}
importAll(require.context('../assets/home', false, /\.(png|jpe?g|svg)$/));

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });
  const [startOpen, setStartOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null); // "Desktop" or "Recycle Bin"
  const [openPage, setOpenPage] = useState(null); // name of the page that was opened
  const menuRef = React.useRef(null);

  const handleContext = (e) => {
    e.preventDefault();
    setMenu({ visible: true, x: e.pageX, y: e.pageY });
  };
  const handleStart = () => {
    setStartOpen((o) => !o);
    setMenu({ ...menu, visible: false });
  };

  // global click listener to clear context menu and deselect icons
  const handleClick = () => {
    if (menu.visible) setMenu({ ...menu, visible: false });
    if (selectedIcon) setSelectedIcon(null);
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });

  const changeBackground = () => {
    setMenu({ ...menu, visible: false });
    setIndex((i) => (i + 1) % homeImages.length);
  };

  const bg = homeImages[index] || '';

  return (
    <div
      className="home-screen"
      style={{ backgroundImage: `url(${bg})` }}
      onContextMenu={handleContext}
    >
      <div className="desktop-icons">
        <div
          className={`desktop-icon${selectedIcon === 'Desktop' ? ' selected' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedIcon('Desktop');
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            setOpenPage('Desktop');
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="10" width="48" height="32" rx="4" fill="#0078D7"/>
            <rect x="12" y="14" width="40" height="24" rx="2" fill="#5DB9FF"/>
            <rect x="26" y="44" width="12" height="6" rx="2" fill="#444"/>
            <rect x="18" y="50" width="28" height="4" rx="2" fill="#666"/>
          </svg>
          <div className="desktop-label">Desktop</div>
        </div>
        <div
          className={`desktop-icon${selectedIcon === 'Recycle Bin' ? ' selected' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedIcon('Recycle Bin');
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            setOpenPage('Recycle Bin');
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <rect x="18" y="20" width="28" height="34" rx="4" fill="#A0D8FF" stroke="#0078D7" strokeWidth="2"/>
            <rect x="16" y="14" width="32" height="6" rx="2" fill="#0078D7"/>
            <rect x="26" y="10" width="12" height="4" rx="2" fill="#005A9E"/>
            <path d="M32 26 l4 6 h-3 l2 4 l-6 -2 l2 -4 h-3z" fill="#0078D7"/>
          </svg>
          <div className="desktop-label">Recycle Bin</div>
        </div>
      </div>
      <Taskbar onStartClick={handleStart} />
      {startOpen && <StartMenu />}
      {openPage && (
        <div className="window-page" onClick={() => setOpenPage(null)}>
          {/* window title bar */}
          <div
            className="window-nav"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="window-title">{openPage}</span>
            <button
              className="window-close"
              onClick={() => setOpenPage(null)}
            >
              ×
            </button>
          </div>
          {/* window menu bar */}
          <div className="window-menu" onClick={(e) => e.stopPropagation()}>
            <span className="menu-item">File</span>
            <span className="menu-item">Edit</span>
            <span className="menu-item">View</span>
            <span className="menu-item">Help</span>
          </div>
          {/* blank content area; clicking here won't close window */}
          <div className="window-content" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
      {menu.visible && (
        <ul
          className="context-menu"
          style={{ top: menu.y, left: menu.x }}
          ref={menuRef}
        >
          <li>Open</li>
          <li>Rename</li>
          <li>Delete</li>
          <li>Refresh</li>
          <li>View</li>
          <li>Sort by</li>
          <li style={{ borderTop: '1px solid #ccc' }}></li>
          <li>New</li>
          <li onClick={changeBackground}>Change background</li>
        </ul>
      )}
    </div>
  );
}
