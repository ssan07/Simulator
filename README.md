# Simulator

This repository contains a small React app that simulates a Windows‑like
startup and login experience, culminating in a home screen with a right‑click
context menu.

## Features

- **Loading screen**: black background with a white Windows logo and four
  animated dots. Shown for ~4 seconds on launch.
- **Login screen**: displays the current date/time over a background image.
  Click anywhere or press **Enter** to continue. The login image is imported
  from `src/assets/login-bg.jpg`.
- **Home screen**: initial wallpaper is the first image found in
  `src/assets/home`. Right‑clicking opens a custom context menu with several
  placeholder items; the important entries are:
  * **New** (displayed but not functional)
  * **Change background** (immediately rotates the wallpaper to the next image
    in `src/assets/home`, cycling back to the first after the last).

  A taskbar runs along the bottom; clicking the Start logo toggles a
  **Start Menu** box, which will display any icons you place under
  `src/assets/start/icons`.  You can also drop icons into
  `src/assets/taskbar/icons` and they will automatically appear in the taskbar
  next to the Start button.  A CSS‑drawn multi‑window icon lives in the bar
  as well.

## Development

Install dependencies and run the development server:

```bash
npm install
npm start
```

## Deployment

The app is set up for GitHub Pages. Ensure your `package.json` contains a
`homepage` field such as:

```json
"homepage": "https://<username>.github.io/<repo>/"
```

The scripts section includes:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build",
```

Use `npm run deploy` to build and publish to the `gh-pages` branch. Then go to
GitHub → Settings → Pages and set the source to **gh-pages branch**. The site
should appear at the URL defined in `homepage`.

## Customization

* Replace or add images under `src/assets/home` for the home background picker.
* Replace `src/assets/login-bg.jpg` for the login screen background.
* Adjust the loading duration in `src/App.js` if desired.

## Scripts overview

- `npm start` – start dev server
- `npm run build` – create production build
- `npm run deploy` – deploy build to GitHub Pages

---

*Original CRA README content has been removed for brevity.*
