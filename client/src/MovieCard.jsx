function MovieCard({ movie, onToggleWatched }) {
  return (
    <article className="card">
      <div className={`poster poster-${movie.id % 6}`}>
        <h2 className="poster-title">{movie.title}</h2>
        {movie.watched && <span className="badge">Đã xem</span>}
      </div>

      <div className="card-body">
        <p className="meta">
          {movie.year} · {movie.genre}
        </p>
        <button
          className={movie.watched ? 'toggle watched' : 'toggle'}
          onClick={() => onToggleWatched(movie.id)}
        >
          {movie.watched ? 'Bỏ đánh dấu' : 'Đánh dấu đã xem'}
        </button>
      </div>
    </article>
  );
}

export default MovieCard;
