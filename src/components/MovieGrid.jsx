import React from 'react';
import MovieCard from './MovieCard';

export default function MovieGrid({
  movies,
  loading,
  error,
  onSelectMovie,
  isFavorite,
  onToggleFavorite,
  onRetry,
  onClearFilters,
  searchQuery,
  hasMore,
  onLoadMore,
  loadingMore
}) {
  if (loading && (!movies || movies.length === 0)) {
    return (
      <div className="movie-grid-section">
        <div className="movie-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="movie-card-skeleton skeleton"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-container error-state">
        <div className="state-icon">⚠️</div>
        <h3 className="state-title">Failed to Load Shows</h3>
        <p className="state-message">{error}</p>
        <button className="btn btn-primary" onClick={onRetry}>
          Try Again ↺
        </button>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="state-container empty-state">
        <div className="state-icon">🎬</div>
        <h3 className="state-title">No Shows Found</h3>
        <p className="state-message">
          {searchQuery
            ? `No shows matched "${searchQuery}". Try searching for something else or reset filters.`
            : 'No titles match the selected filters.'}
        </p>
        <button className="btn btn-primary" onClick={onClearFilters}>
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="movie-grid-section">
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            show={movie}
            onSelectMovie={onSelectMovie}
            isFavorite={isFavorite(movie.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {hasMore && !searchQuery && (
        <div className="load-more-wrapper">
          <button
            className="btn btn-outline btn-load-more"
            onClick={onLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? (
              <>
                <span className="search-spinner small"></span>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>Load More Shows</span>
                <span className="btn-arrow">↓</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
