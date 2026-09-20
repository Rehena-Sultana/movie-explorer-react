import React from 'react';

export default function SearchBar({ searchQuery, setSearchQuery, onClear, totalResults, isSearching }) {
  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <span className="search-icon">
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
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={onClear}
            title="Clear"
          >
            ✕
          </button>
        )}
      </div>

      {searchQuery && (
        <div className="search-status-bar">
          <span className="search-status-text">
            Showing results for <strong className="query-highlight">"{searchQuery}"</strong>
            {totalResults !== undefined && ` (${totalResults} found)`}
          </span>
          <button className="search-reset-link" onClick={onClear}>
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
