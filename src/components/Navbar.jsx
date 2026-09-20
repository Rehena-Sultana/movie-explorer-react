import React, { useState } from 'react';

export default function Navbar({ activePage, setActivePage, favoritesCount, onSelectGenre }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand / Logo */}
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

        {/* Desktop Navigation */}
        <nav className="nav-links" aria-label="Main Navigation">
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
              <span className="nav-badge" aria-label={`${favoritesCount} favorites`}>
                {favoritesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Prominent CTA to Movie Listing Page */}
        <div className="nav-actions">
          <button
            id="nav-explore-btn"
            className="btn btn-primary nav-cta-btn"
            onClick={() => handleNav('movies')}
          >
            <span>Browse Catalog</span>
            <span className="btn-arrow">→</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
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
