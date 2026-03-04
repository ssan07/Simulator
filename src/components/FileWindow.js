
import React, { useEffect, useState, useMemo, useRef } from 'react';
import './FileWindow.css';
import openFolderIcon from '../assets/home/icons/open-folder.png';

const INDEX_KEY = 'simulator_fs_index';
const CONTENTS_KEY = 'simulator_file_contents';

function readJSON(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch (e) {
    return fallback;
  }
}

function writeJSON(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// files: array of { id, name }
export default function FileWindow({ title = 'Files', files = [], onClose, onFileOpen }) {
  const initialPath = `/${title.toLowerCase().replace(/\s+/g, '_')}`;

  const [index, setIndex] = useState(() => readJSON(INDEX_KEY, {}));
  const [contents, setContents] = useState(() => readJSON(CONTENTS_KEY, {}));
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [history, setHistory] = useState([initialPath]);
  const [hIndex, setHIndex] = useState(0);
  const [addressInput, setAddressInput] = useState(initialPath);
  const [query, setQuery] = useState('');
  const [openFile, setOpenFile] = useState(null); // {id,name}
  const [editorValue, setEditorValue] = useState('');
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const [viewMode, setViewMode] = useState('list');
  const fileListRef = useRef(null);

  // initialize index entry for this path if missing
  useEffect(() => {
    const idx = readJSON(INDEX_KEY, {});
    if (!idx[initialPath]) {
      idx[initialPath] = files;
      writeJSON(INDEX_KEY, idx);
    }
    setIndex(idx);
  }, [initialPath, files]);

  // persist index/contents when they change
  useEffect(() => writeJSON(INDEX_KEY, index), [index]);
  useEffect(() => writeJSON(CONTENTS_KEY, contents), [contents]);

  const fileList = useMemo(() => {
    const arr = index[currentPath] || [];
    if (!query) return arr;
    return arr.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));
  }, [index, currentPath, query]);

  const canBack = hIndex > 0;
  const canForward = hIndex < history.length - 1;

  function navigateTo(path) {
    const newHistory = history.slice(0, hIndex + 1).concat(path);
    setHistory(newHistory);
    setHIndex(newHistory.length - 1);
    setCurrentPath(path);
  }

  // keep address input in sync with currentPath
  useEffect(() => setAddressInput(currentPath), [currentPath]);

  function goBack() {
    if (!canBack) return;
    const ni = hIndex - 1;
    setHIndex(ni);
    setCurrentPath(history[ni]);
  }

  function goForward() {
    if (!canForward) return;
    const ni = hIndex + 1;
    setHIndex(ni);
    setCurrentPath(history[ni]);
  }

  function refresh() {
    const idx = readJSON(INDEX_KEY, {});
    setIndex(idx);
  }

  function openItem(f) {
    setOpenFile(f);
    const key = f.id;
    const text = contents[key] || `Contents of ${f.name}`;
    setEditorValue(text);
    if (typeof onFileOpen === 'function') onFileOpen(f);
  }

  function saveOpenFile() {
    if (!openFile) return;
    const next = { ...contents, [openFile.id]: editorValue };
    setContents(next);
    const arr = index[currentPath] || [];
    if (!arr.find((x) => x.id === openFile.id)) {
      const n = arr.concat({ id: openFile.id, name: openFile.name });
      setIndex({ ...index, [currentPath]: n });
    }
  }

  function createFile() {
    const id = `f_${Date.now()}`;
    const name = `New File ${Object.keys(contents).length + 1}.txt`;
    const newFile = { id, name };
    const arr = (index[currentPath] || []).concat(newFile);
    setIndex({ ...index, [currentPath]: arr });
    setContents({ ...contents, [id]: '' });
  }

  function ensureUniqueFolderName(base) {
    const arr = index[currentPath] || [];
    let name = base;
    let i = 1;
    const exists = (n) => arr.find((x) => x.name === n);
    while (exists(name)) {
      i += 1;
      name = `${base} (${i})`;
    }
    return name;
  }

  function createFolder() {
    const base = 'New Folder';
    const name = ensureUniqueFolderName(base);
    const id = `d_${Date.now()}`;
    const folderPath = (currentPath === '/' ? '' : currentPath) + '/' + name;
    const newFolder = { id, name, type: 'folder', path: folderPath };
    const arr = (index[currentPath] || []).concat(newFolder);
    // add folder entry to current path
    const nextIndex = { ...index, [currentPath]: arr };
    // create the folder path as an empty directory
    nextIndex[folderPath] = nextIndex[folderPath] || [];
    setIndex(nextIndex);
    setContextMenu({ visible: false, x: 0, y: 0 });
  }

  function handleContextMenu(e) {
    e.preventDefault();
    // ignore if right-clicked on a file item
    if (e.target.closest && e.target.closest('.file-item')) {
      return;
    }
    const rect = fileListRef.current && fileListRef.current.getBoundingClientRect();
    const x = rect ? e.clientX - rect.left : e.clientX;
    const y = rect ? e.clientY - rect.top : e.clientY;
    setContextMenu({ visible: true, x: x, y: y });
  }

  useEffect(() => {
    function onAnyClick() {
      if (contextMenu.visible) setContextMenu({ visible: false, x: 0, y: 0 });
    }
    window.addEventListener('click', onAnyClick);
    return () => window.removeEventListener('click', onAnyClick);
  }, [contextMenu.visible]);

  function goUp() {
    if (currentPath === '/') return;
    const parts = currentPath.split('/').filter(Boolean);
    parts.pop();
    const parent = '/' + parts.join('/') || '/';
    navigateTo(parent);
  }

  return (
    <div className="file-window">
      <div className="file-nav">

        {/* Row 1: filename (left) and close (right) */}
        <div className="top-row">
          <div className="ft-title">{(currentPath === '/' ? title : currentPath.split('/').filter(Boolean).slice(-1)[0])}</div>
          <button className="fw-btn ft-close" onClick={onClose}>✕</button>
        </div>

        {/* Row 2: navigation left, expandable address center, search right */}
        <div className="second-row">
          <div className="controls-left">
            <button className="fw-nav" onClick={goBack} disabled={!canBack}>◀</button>
            <button className="fw-nav" onClick={goForward} disabled={!canForward}>▶</button>
            <button className="fw-nav" onClick={refresh}>⟳</button>
            <button className="fw-nav" onClick={goUp}>↥</button>

          </div>

          <input
            className="fw-address expandable"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = e.target.value.trim() || '/';
                navigateTo(val.startsWith('/') ? val : `/${val}`);
              }
            }}
          />

          <div className="controls-right">
            <input
              className="fw-search"
              placeholder={`Search ${title}`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Row 3: action buttons on left */}
        <div className="third-row">
          <div className="ft-actions">
            <button className="ft-btn" onClick={createFile}>New</button>
            <button className="ft-btn">✂</button>
            <button className="ft-btn">📋</button>
            <button className="ft-btn">📎</button>
            <button className="ft-btn">Rename</button>
            <button className="ft-btn">Delete</button>
            <button className="ft-btn">Sort</button>
            <button className="ft-btn">View</button>
          </div>
        </div>

      </div>

      <div className="file-body">
        <div className="file-list" ref={fileListRef} onContextMenu={handleContextMenu}>
          {fileList.length === 0 && <div className="empty">No files</div>}
          {fileList.map((f) => (
            <div
              key={f.id}
              className="file-item"
              onDoubleClick={() => {
                if (f.type === 'folder') {
                  navigateTo(f.path || `${currentPath}/${f.name}`);
                } else {
                  openItem(f);
                }
              }}
              onClick={() => { /* selection logic could go here */ }}
            >
              {f.type === 'folder' ? (
                <>
                  <img src={openFolderIcon} alt="folder" style={{ width: 18, height: 18, marginRight: 6 }} /> {f.name}
                </>
              ) : (
                <>📄 {f.name}</>
              )}
            </div>
          ))}

          {contextMenu.visible && (
            <div
              className="context-menu"
              style={{
                position: 'absolute',
                left: contextMenu.x,
                top: contextMenu.y,
                background: '#fff',
                border: '1px solid #ccc',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                zIndex: 9999,
                minWidth: 140,
                padding: 4
              }}
              onClick={(ev) => ev.stopPropagation()}
            >
              <div className="cm-item" style={{ padding: '6px 8px', cursor: 'pointer' }} onClick={() => setViewMode(viewMode === 'list' ? 'icons' : 'list')}>View</div>
              <div className="cm-item" style={{ padding: '6px 8px', cursor: 'pointer' }} onClick={() => createFolder()}>New Folder</div>
            </div>
          )}

        </div>
        {openFile && (
          <div className="side-editor">
            <div className="se-header">
              <div className="se-title">{openFile.name}</div>
              <div className="se-actions">
                <button className="ft-btn" onClick={() => saveOpenFile()}>Save</button>
                <button className="ft-btn" onClick={() => setOpenFile(null)}>Close</button>
              </div>
            </div>
            <div className="se-body">
              <textarea
                className="se-textarea"
                value={editorValue}
                onChange={(e) => setEditorValue(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}






















































