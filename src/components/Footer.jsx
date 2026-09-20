import React from 'react';

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <div className="footer-col brand-col">
          <div className="footer-brand" onClick={() => onNavigate('home')}>
            <span className="brand-icon">🎬</span>
            <span className="brand-text">
              Movie<span className="brand-highlight">Explorer</span>
            </span>
          </div>
          <p className="footer-tagline">
            Your gateway to television and cinema. Explore top-rated series, read reviews, and track your favorite shows.
          </p>

        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links">
            <li>
              <button className="footer-link-btn" onClick={() => onNavigate('home')}>
                Home
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => onNavigate('movies')}>
                Explore Movies
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => onNavigate('favorites')}>
                Watchlist
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Categories</h4>
          <ul className="footer-links">
            <li><span className="footer-static-link">Drama & Thriller</span></li>
            <li><span className="footer-static-link">Sci-Fi & Fantasy</span></li>
            <li><span className="footer-static-link">Action & Adventure</span></li>
            <li><span className="footer-static-link">Anime & Animation</span></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Connect</h4>
          <div className="footer-socials">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-pill">
              <span>💻 GitHub</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-pill">
              <span>🐦 Twitter</span>
            </a>
          </div>
          <button className="back-to-top-btn" onClick={scrollToTop}>
            <span>↑ Back to Top</span>
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright-text">
          © 2026 MovieExplorer. Built with React & CSS.
        </p>
      </div>
    </footer>
  );
}
