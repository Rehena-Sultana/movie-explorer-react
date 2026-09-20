import React, { useState } from 'react';

export default function Navbar({ activePage, setActivePage, favoritesCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        <button 
          className="brand-logo" 
          onClick={() => handleNav('home')} 
          aria-label="Movie Explorer Home"
        >
          <span className="brand-icon">🎬</span>
          <span className="brand-text">
            Movie<span className="brand-highlight">Explorer</span>
          </span>
        </button>

        <nav className="nav-links">
          <button
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            Home
          </button>
          <button
            className={`nav-link ${activePage === 'movies' ? 'active' : ''}`}
            onClick={() => handleNav('movies')}
          >
            Explore Shows
          </button>
          <button
            className={`nav-link watchlist-btn ${activePage === 'favorites' ? 'active' : ''}`}
            onClick={() => handleNav('favorites')}
          >
            <span>Watchlist</span>
            {favoritesCount > 0 && (
              <span className="nav-badge">
                {favoritesCount}
              </span>
            )}
          </button>
        </nav>

        <div className="nav-actions">
          <button
            id="nav-explore-btn"
            className="btn btn-primary nav-cta-btn"
            onClick={() => handleNav('movies')}
          >
            <span>Browse Catalog</span>
            <span className="btn-arrow">→</span>
          </button>

          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <button
            className={`mobile-nav-link ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            🏠 Home
          </button>
          <button
            className={`mobile-nav-link ${activePage === 'movies' ? 'active' : ''}`}
            onClick={() => handleNav('movies')}
          >
            🎬 Explore Shows
          </button>
          <button
            className={`mobile-nav-link ${activePage === 'favorites' ? 'active' : ''}`}
            onClick={() => handleNav('favorites')}
          >
            ⭐ Watchlist ({favoritesCount})
          </button>
          <div className="mobile-drawer-cta">
            <button
              className="btn btn-primary btn-full"
              onClick={() => handleNav('movies')}
            >
              Explore All Movies Now →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
