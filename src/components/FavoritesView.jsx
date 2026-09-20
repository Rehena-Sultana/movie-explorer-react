import React from 'react';
import MovieCard from './MovieCard';

export default function FavoritesView({
  favorites,
  onSelectMovie,
  isFavorite,
  onToggleFavorite,
  onClearAll,
  onExploreMovies
}) {
  if (favorites.length === 0) {
    return (
      <div className="section-container favorites-page">
        <div className="state-container empty-state">
          <div className="state-icon">⭐</div>
          <h2 className="state-title">Your Watchlist is Empty</h2>
          <p className="state-message">
            You haven't added any movies or shows to your watchlist yet. Browse the catalog and click the heart icon on any title to save it for later!
          </p>
          <button className="btn btn-primary" onClick={onExploreMovies}>
            Browse Shows Catalog →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container favorites-page">
      <div className="section-header">
        <div>
          <div className="section-tag">⭐ SAVED TITLES</div>
          <h2 className="section-title">My Personal Watchlist ({favorites.length})</h2>
          <p className="section-desc">Your curated list of favorite shows and movies saved in this browser.</p>
        </div>
        <div className="favorites-actions">
          <button className="btn btn-outline btn-sm" onClick={onClearAll}>
            Clear Watchlist
          </button>
          <button className="btn btn-primary btn-sm" onClick={onExploreMovies}>
            + Add More Shows
          </button>
        </div>
      </div>

      <div className="movie-grid">
        {favorites.map((show) => (
          <MovieCard
            key={show.id}
            show={show}
            onSelectMovie={onSelectMovie}
            isFavorite={isFavorite(show.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
