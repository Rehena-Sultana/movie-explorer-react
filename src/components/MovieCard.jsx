import React from 'react';
import { extractYear, formatRating, FALLBACK_POSTER } from '../services/api';

export default function MovieCard({ show, onSelectMovie, isFavorite, onToggleFavorite }) {
  if (!show) return null;

  const posterUrl = show.image?.medium || show.image?.original || FALLBACK_POSTER;
  const rating = formatRating(show.rating);
  const releaseYear = extractYear(show.premiered);
  const genres = show.genres && show.genres.length > 0 ? show.genres.slice(0, 2) : ['General'];

  return (
    <article className="movie-card">
      <div className="card-poster-wrapper" onClick={() => onSelectMovie(show)}>
        <img
          src={posterUrl}
          alt={show.name || 'Movie Poster'}
          className="card-poster-img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = FALLBACK_POSTER;
          }}
        />
        <div className="card-poster-overlay"></div>

        <button
          type="button"
          className={`card-favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(show);
          }}
          title={isFavorite ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

        <div className="card-rating-badge">
          <span className="rating-star">⭐</span>
          <span className="rating-value">{rating}</span>
        </div>

        <div className="card-quick-view">
          <span>Quick View 🔍</span>
        </div>
      </div>

      <div className="card-content">
        <div className="card-genres">
          {genres.map((genre) => (
            <span key={genre} className="genre-pill">
              {genre}
            </span>
          ))}
          {show.status && (
            <span className={`status-pill ${show.status.toLowerCase()}`}>
              {show.status}
            </span>
          )}
        </div>

        <h3 className="card-title" onClick={() => onSelectMovie(show)} title={show.name}>
          {show.name}
        </h3>

        <div className="card-meta">
          <span className="meta-rating">
            <span className="meta-star">⭐</span> {rating}
          </span>
          <span className="meta-separator">•</span>
          <span className="meta-year">
            <span className="meta-icon">📅</span> {releaseYear}
          </span>
        </div>

        <button
          type="button"
          className="btn btn-card-details"
          onClick={() => onSelectMovie(show)}
        >
          <span>See Details</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </article>
  );
}
