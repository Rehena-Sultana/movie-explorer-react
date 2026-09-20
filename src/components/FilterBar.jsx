import React from 'react';
import { ALL_GENRES } from '../services/api';

export default function FilterBar({
  selectedGenre,
  setSelectedGenre,
  selectedStatus,
  setSelectedStatus,
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
  onResetFilters,
  activeFilterCount
}) {
  return (
    <div className="filter-bar-container">
      <div className="filter-controls-grid">
        <div className="filter-group">
          <label htmlFor="filter-genre" className="filter-label">Genre</label>
          <div className="select-wrapper">
            <select
              id="filter-genre"
              className="filter-select"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {ALL_GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <span className="select-arrow">▼</span>
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="filter-status" className="filter-label">Status</label>
          <div className="select-wrapper">
            <select
              id="filter-status"
              className="filter-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Running">Currently Running</option>
              <option value="Ended">Ended</option>
            </select>
            <span className="select-arrow">▼</span>
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="filter-rating" className="filter-label">Min Rating</label>
          <div className="select-wrapper">
            <select
              id="filter-rating"
              className="filter-select"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            >
              <option value="All">Any Rating</option>
              <option value="8.5">⭐ 8.5+ Masterpiece</option>
              <option value="8.0">⭐ 8.0+ Great</option>
              <option value="7.0">⭐ 7.0+ Good</option>
              <option value="6.0">⭐ 6.0+ Average</option>
            </select>
            <span className="select-arrow">▼</span>
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="filter-sort" className="filter-label">Sort By</label>
          <div className="select-wrapper">
            <select
              id="filter-sort"
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating-desc">⭐ Rating: High to Low</option>
              <option value="premiered-desc">📅 Release: Newest First</option>
              <option value="premiered-asc">📅 Release: Oldest First</option>
              <option value="name-asc">🔤 Title: A → Z</option>
              <option value="name-desc">🔤 Title: Z → A</option>
            </select>
            <span className="select-arrow">▼</span>
          </div>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div className="active-filters-row">
          <span className="active-filter-badge">
            {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} applied
          </span>
          <button className="reset-filters-btn" onClick={onResetFilters}>
            Reset Filters ↺
          </button>
        </div>
      )}
    </div>
  );
}
