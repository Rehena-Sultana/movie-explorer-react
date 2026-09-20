import React from 'react';

export default function SearchBar({ searchQuery, setSearchQuery, onClear, totalResults, isSearching }) {
  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">
          {isSearching ? <span className="search-spinner"></span> : '🔍'}
        </span>
        <input
          id="main-movie-search"
          type="text"
          className="search-input"
          placeholder="Search for a movie or TV show by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
          aria-label="Search movies and shows"
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={onClear}
            title="Clear search"
            aria-label="Clear search query"
          >
            ✕
          </button>
        )}
      </div>

      {searchQuery && (
        <div className="search-status-bar">
          <span className="search-status-text">
            Showing results for <strong className="query-highlight">"{searchQuery}"</strong>
            {totalResults !== undefined && ` (${totalResults} titles found)`}
          </span>
          <button className="search-reset-link" onClick={onClear}>
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
