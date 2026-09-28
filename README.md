# First, there was darkness

A scrolling data-visualization site about fire, built with React, TypeScript, Vite, Tailwind CSS, and MapLibre GL.

## Viewing the site locally

### 1. Install Node.js

You need **Node.js 20.19+ or 22.12+** (Vite 8 requires one of these). Check which version you have:

```bash
node -v
```

If it's missing or too old, download the LTS version from [nodejs.org](https://nodejs.org/). npm comes with it.

### 2. Install dependencies

In the project folder, run this once (and again whenever `package.json` changes):

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

Vite prints a local URL, usually **http://localhost:5173**. Open it in your browser. The page reloads on its own when you edit files in `src/`. Press `Ctrl+C` in the terminal to stop the server.

If port 5173 is already taken, Vite picks the next free port (5174, 5175, …). Use whichever URL it prints.

> **Note:** The map loads its basemap tiles from CARTO (`basemaps.cartocdn.com`), so you need an internet connection to see the map. The rest of the page works offline.

## Previewing the production build

To check the optimized version that would get deployed:

```bash
npm run build
```

```bash
npm run preview
```

`build` type-checks the code and writes static files to `dist/`. `preview` serves `dist/` at **http://localhost:4173**.

Opening `dist/index.html` straight from your file system (as a `file://` URL) **won't work**. Browsers block the ES module scripts and the MapLibre web worker on `file://` pages, so always serve the files over HTTP.

## Other scripts

| Command        | What it does                           |
| -------------- | -------------------------------------- |
| `npm run lint` | Lints the code with Oxlint             |

## Project structure

```
index.html          HTML entry point
src/
  main.tsx          Mounts the React app
  App.tsx           Page layout (nav, hero, map, sections)
  components/       Hero, NavBar, MapSection, WorldMap, Fire, Starfield, …
  hooks/            useScrollProgress, useReducedMotion
  lib/              Small math and scroll helpers
  index.css         Tailwind setup and global styles
public/             Static files copied as-is (e.g. favicon)
```
