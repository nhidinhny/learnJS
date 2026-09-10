import './App.css'
import MovieCard from './MovieCard'
import initialMovies from './movies'
import { useState } from 'react'

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [filter, setFilter] = useState('all');

  function toggleWatched(id) {
    setMovies(movies.map((movie) => (
      movie.id === id
        ? { ...movie, watched: !movie.watched }
        : movie
    )));
  }

  const watchedCount = movies.filter((movie) => movie.watched).length;

  let visibleMovies = movies;

  if (filter === 'watched') {
    visibleMovies = movies.filter((movie) => movie.watched === true);
  }

  if (filter === 'unwatched') {
    visibleMovies = movies.filter((movie) => movie.watched === false);
  }

  return (
    <main>
      <header>
        <h1>Watchlist</h1>
        <p className="summary">
          Đã xem {watchedCount} / {movies.length} phim
        </p>

        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Tất cả
          </button>
          <button
            className={filter === 'unwatched' ? 'active' : ''}
            onClick={() => setFilter('unwatched')}
          >
            Chưa xem
          </button>
          <button
            className={filter === 'watched' ? 'active' : ''}
            onClick={() => setFilter('watched')}
          >
            Đã xem
          </button>
        </div>
      </header>

      <div className="grid">
        {visibleMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleWatched={toggleWatched}
          />
        ))}
      </div>

      {visibleMovies.length === 0 && (
        <p className="empty">Không có phim nào trong mục này.</p>
      )}
    </main>
  );
}

export default App;
