0 to Shipped — Resume Parser (React)

A mock landing page for a resume parser: upload a PDF, get a score,
see which skills are present and which are missing. Built with React + Vite,
no backend — the parse is simulated with mock data.

Run it:
  npm install
  npm run dev      → local dev server with hot reload
  npm run build    → production build into dist/
  npm run preview  → serve the production build

Structure:
  index.html                  Vite entry (loads Google Fonts, mounts #root)
  src/main.jsx                React bootstrap
  src/App.jsx                 page layout + upload/parse state
  src/data/mockResults.js     mock score + skills
  src/components/             one component per section of the page
  src/index.css               all styles (same stylesheet as the original page)
