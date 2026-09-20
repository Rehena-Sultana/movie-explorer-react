import React from 'react';
import { extractYear, formatRating, FALLBACK_POSTER } from '../services/api';

export default function MovieCard({ show, onSelectMovie, isFavorite, onToggleFavorite }) {
  if (!show) return null;

  const posterUrl = show.image?.medium || show.image?.original || FALLBACK_POSTER;
  const rating = formatRating(show.rating);
  const releaseYear = extractYear(show.premiered);
  const genres = show.genres && show.genres.length > 0 ? show.genres.slice(0, 2) : ['General'];

  return (
    <article className="movie-card" data-testid={`movie-card-${show.id}`}>
      {/* Poster Image Container */}
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

        {/* Favorite / Watchlist Button */}
        <button
          type="button"
          className={`card-favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(show);
          }}
          title={isFavorite ? 'Remove from Watchlist' : 'Add to Watchlist'}
          aria-label={isFavorite ? `Remove ${show.name} from Watchlist` : `Add ${show.name} to Watchlist`}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

        {/* Rating Floating Badge */}
        <div className="card-rating-badge">
          <span className="rating-star">⭐</span>
          <span className="rating-value">{rating}</span>
        </div>

        {/* Quick Click Hint Overlay on Hover */}
        <div className="card-quick-view">
          <span>Quick View 🔍</span>
        </div>
      </div>

      {/* Card Content Information */}
      <div className="card-content">
        {/* Genre Tags */}
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

        {/* Title */}
        <h3 className="card-title" onClick={() => onSelectMovie(show)} title={show.name}>
          {show.name}
        </h3>

        {/* Metadata: Rating & Year */}
        <div className="card-meta">
          <span className="meta-rating">
            <span className="meta-star">⭐</span> {rating}
          </span>
          <span className="meta-separator">•</span>
          <span className="meta-year">
            <span className="meta-icon">📅</span> {releaseYear}
          </span>
        </div>

        {/* CTA "See Details" Button */}
        <button
          type="button"
          className="btn btn-card-details"
          onClick={() => onSelectMovie(show)}
          aria-label={`See details for ${show.name}`}
        >
          <span>See Details</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </article>
  );
}
