import React, { useState, useEffect } from 'react';
import '../App.css';

// collect all images from the assets/home directory
const homeImages = [];
function importAll(r) {
  r.keys().forEach((key) => homeImages.push(r(key)));
}
importAll(require.context('../assets/home', false, /\.(png|jpe?g|svg)$/));

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });
  const menuRef = React.useRef(null);

  const handleContext = (e) => {
    e.preventDefault();
    setMenu({ visible: true, x: e.pageX, y: e.pageY });
  };

  const handleClick = () => {
    if (menu.visible) setMenu({ ...menu, visible: false });
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
      <h1>Welcome to the Home Screen</h1>
      <p>Press F5 to reload the demo.</p>
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

