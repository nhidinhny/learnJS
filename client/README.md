# Watchlist — Frontend

React frontend for the movie and anime watchlist. Built with Vite.

This is the learning app for week 4 onward of the roadmap in the repository
root. It currently runs on local mock data; the Express + PostgreSQL backend
and the TMDB search integration are added in week 5.

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

The app is available at `http://localhost:5173`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Features

- Movie grid with placeholder posters generated from CSS gradients.
- Mark a movie as watched or unwatched.
- Filter by all, unwatched, or watched.
- Watched counter and an empty state when a filter matches nothing.
- Light and dark colour schemes.

## Structure

```text
src/
├── App.jsx       # State, filtering, and page layout
├── App.css       # Grid, cards, and filter button styles
├── MovieCard.jsx # A single movie card
├── movies.js     # Mock movie data
├── index.css     # Colour tokens and base typography
└── main.jsx      # React entry point
```

## Planned

- [ ] Form to add a movie, with input validation.
- [ ] Edit, delete, and rate movies.
- [ ] Load and persist the watchlist through the REST API.
- [ ] Search real movies through the TMDB API.
- [ ] Accounts, so each user has a private watchlist.
