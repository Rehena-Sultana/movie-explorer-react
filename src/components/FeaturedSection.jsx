import React from 'react';
import MovieCard from './MovieCard';

const POPULAR_GENRES = [
  { name: 'Drama', icon: '🎭', color: '#ff0080', count: '12K+ Shows' },
  { name: 'Action', icon: '💥', color: '#f43f5e', count: '8K+ Shows' },
  { name: 'Science-Fiction', icon: '🚀', color: '#00f2fe', count: '5K+ Shows' },
  { name: 'Comedy', icon: '😄', color: '#ffb703', count: '9K+ Shows' },
  { name: 'Thriller', icon: '⚡', color: '#7928ca', count: '6K+ Shows' },
  { name: 'Animation', icon: '🎨', color: '#10b981', count: '4K+ Shows' },
  { name: 'Crime', icon: '🕵️', color: '#e11d48', count: '7K+ Shows' },
  { name: 'Mystery', icon: '🔮', color: '#8b5cf6', count: '4.5K+ Shows' },
];

export default function FeaturedSection({
  spotlightShows,
  loadingSpotlight,
  onSelectMovie,
  isFavorite,
  onToggleFavorite,
  onSelectGenre,
  onExploreAll
}) {
  return (
    <div className="home-sections-wrapper">
      <section className="section-container">
        <div className="section-header">
          <div>
            <div className="section-tag">🔥 HOT RIGHT NOW</div>
            <h2 className="section-title">Trending Masterpieces</h2>
          </div>
          <button className="btn btn-outline" onClick={onExploreAll}>
            <span>View All Shows</span>
            <span className="btn-arrow">→</span>
          </button>
        </div>

        {loadingSpotlight ? (
          <div className="movie-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="movie-card-skeleton skeleton" style={{ height: '420px' }}></div>
            ))}
          </div>
        ) : (
          <div className="movie-grid">
            {spotlightShows.slice(0, 4).map((show) => (
              <MovieCard
                key={show.id}
                show={show}
                onSelectMovie={onSelectMovie}
                isFavorite={isFavorite(show.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </section>

      <section className="section-container">
        <div className="section-header">
          <div>
            <div className="section-tag">🏷️ DISCOVERY</div>
            <h2 className="section-title">Explore by Genre</h2>
          </div>
          <p className="section-desc">Jump straight into your favorite cinematic category</p>
        </div>

        <div className="genre-grid">
          {POPULAR_GENRES.map((genre) => (
            <button
              key={genre.name}
              className="genre-card"
              onClick={() => onSelectGenre(genre.name)}
              style={{ '--genre-color': genre.color }}
            >
              <span className="genre-card-icon">{genre.icon}</span>
              <div className="genre-card-content">
                <span className="genre-card-title">{genre.name}</span>
                <span className="genre-card-count">{genre.count}</span>
              </div>
              <span className="genre-card-arrow">→</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section-container why-us-section">
        <div className="why-us-grid">
          <div className="why-us-card">
            <div className="why-us-icon-wrapper cyan">⚡</div>
            <h3>Instant Dynamic Search</h3>
            <p>Find any movie or TV series in milliseconds with live auto-search and accurate title matching.</p>
          </div>
          <div className="why-us-card">
            <div className="why-us-icon-wrapper purple">⭐</div>
            <h3>Accurate Community Ratings</h3>
            <p>Browse critically verified ratings and premier dates to easily discover your next weekend binge.</p>
          </div>
          <div className="why-us-card">
            <div className="why-us-icon-wrapper magenta">🎭</div>
            <h3>Full Cast & Crew Profiles</h3>
            <p>Dive deep into actor portfolios, character portraits, and full production schedules inside our interactive modal.</p>
          </div>
          <div className="why-us-card">
            <div className="why-us-icon-wrapper amber">💖</div>
            <h3>Personalized Watchlist</h3>
            <p>Save shows to your private browser watchlist with one click and access them anytime offline.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
