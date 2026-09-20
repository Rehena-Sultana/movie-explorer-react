import React, { useState } from 'react';

export default function HeroBanner({ onExploreClick, onQuickSearch }) {
  const [heroSearch, setHeroSearch] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      onQuickSearch(heroSearch.trim());
    } else {
      onExploreClick();
    }
  };

  return (
    <section className="hero-banner" aria-label="Hero Showcase">
      <div className="hero-backdrop-glow"></div>
      
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-pulse"></span>
          <span>⚡ Unlimited Cinematic Exploration</span>
        </div>

        <h1 className="hero-title">
          DISCOVER <span className="text-gradient">MOVIES & SHOWS</span>
        </h1>

        <p className="hero-subtitle">
          Explore and discover your favorite movies, top-rated TV series, and cult classics from around the world with real-time ratings, comprehensive cast info, and detailed summaries.
        </p>

        {/* Quick Search on Hero */}
        <form className="hero-search-form" onSubmit={handleSearchSubmit}>
          <div className="hero-search-input-wrapper">
            <span className="hero-search-icon">🔍</span>
            <input
              type="text"
              id="hero-search-input"
              className="hero-search-input"
              placeholder="Search by title (e.g., Breaking Bad, Spider-Man, Stranger Things)..."
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              aria-label="Quick search movies"
            />
          </div>
          <button type="submit" id="hero-explore-cta" className="btn btn-primary hero-submit-btn">
            <span>Explore Now</span>
            <span className="btn-arrow">→</span>
          </button>
        </form>

        {/* Hero Features / Key Stat Badges */}
        <div className="hero-stats">
          <div className="hero-stat-card">
            <span className="stat-number">50K+</span>
            <span className="stat-label">TV & Film Titles</span>
          </div>
          <div className="stat-divider"></div>
          <div className="hero-stat-card">
            <span className="stat-number">⭐ 8.9+</span>
            <span className="stat-label">Verified Ratings</span>
          </div>
          <div className="stat-divider"></div>
          <div className="hero-stat-card">
            <span className="stat-number">🎭 Cast & Crew</span>
            <span className="stat-label">In-depth Profiles</span>
          </div>
          <div className="stat-divider"></div>
          <div className="hero-stat-card">
            <span className="stat-number">⚡ 100% Free</span>
            <span className="stat-label">TVMaze Powered</span>
          </div>
        </div>
      </div>
    </section>
  );
}
