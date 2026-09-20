import React, { useEffect, useState } from 'react';
import { extractYear, formatRating, stripHtml, FALLBACK_POSTER, fetchShowDetails } from '../services/api';

export default function MovieModal({ movie, onClose, isFavorite, onToggleFavorite }) {
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);

  // Fetch full details with cast when modal opens
  useEffect(() => {
    if (!movie?.id) return;
    let isMounted = true;
    setLoadingDetails(true);

    fetchShowDetails(movie.id)
      .then((data) => {
        if (isMounted) {
          setDetails(data);
          setLoadingDetails(false);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch embedded details:', err);
        if (isMounted) {
          setDetails(movie);
          setLoadingDetails(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [movie]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    document.body.classList.add('modal-open');

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!movie) return null;

  const currentShow = details || movie;
  const backdropUrl = currentShow.image?.original || currentShow.image?.medium || FALLBACK_POSTER;
  const rating = formatRating(currentShow.rating);
  const releaseYear = extractYear(currentShow.premiered);
  const cleanSummary = stripHtml(currentShow.summary);
  const castList = currentShow._embedded?.cast || [];

  return (
    <div
      className="modal-backdrop-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-movie-title"
    >
      <div className="modal-container">
        {/* Top Header Close Button */}
        <button
          className="modal-close-icon-btn"
          onClick={onClose}
          aria-label="Close modal"
          title="Close (Esc)"
        >
          ✕
        </button>

        {/* Hero Backdrop Banner */}
        <div className="modal-hero-banner">
          <img
            src={backdropUrl}
            alt={`${currentShow.name} Backdrop`}
            className="modal-backdrop-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = FALLBACK_POSTER;
            }}
          />
          <div className="modal-backdrop-gradient"></div>

          {/* Floating Action Button inside hero */}
          <button
            type="button"
            className={`modal-favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={() => onToggleFavorite(currentShow)}
            title={isFavorite ? 'Remove from Watchlist' : 'Add to Watchlist'}
            aria-label="Toggle Watchlist"
          >
            <span>{isFavorite ? '❤️ In Watchlist' : '🤍 Add to Watchlist'}</span>
          </button>
        </div>

        {/* Modal Main Body Content */}
        <div className="modal-body-content">
          {/* Main Info Header */}
          <div className="modal-info-header">
            <div className="modal-poster-col">
              <img
                src={currentShow.image?.medium || currentShow.image?.original || FALLBACK_POSTER}
                alt={currentShow.name}
                className="modal-poster-thumb"
              />
            </div>

            <div className="modal-main-meta">
              <h2 id="modal-movie-title" className="modal-title">
                {currentShow.name}
              </h2>

              {/* Badges Row */}
              <div className="modal-badges-row">
                {/* Rating Badge */}
                <div className="modal-rating-badge">
                  <span className="star">⭐</span>
                  <span className="score">{rating}</span>
                  <span className="out-of">/ 10</span>
                </div>

                {/* Release Date */}
                <div className="modal-meta-pill">
                  <span>📅 Premiered:</span>
                  <strong>{currentShow.premiered || releaseYear}</strong>
                </div>

                {/* Status */}
                {currentShow.status && (
                  <div className={`modal-status-badge ${currentShow.status.toLowerCase()}`}>
                    ● {currentShow.status}
                  </div>
                )}

                {/* Runtime */}
                {currentShow.runtime && (
                  <div className="modal-meta-pill">
                    <span>⏱️</span>
                    <strong>{currentShow.runtime} min</strong>
                  </div>
                )}
              </div>

              {/* Genres Pills */}
              {currentShow.genres && currentShow.genres.length > 0 && (
                <div className="modal-genres-list">
                  {currentShow.genres.map((genre) => (
                    <span key={genre} className="modal-genre-tag">
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Extra Metadata Grid */}
              <div className="modal-extra-meta-grid">
                {currentShow.language && (
                  <div className="meta-item">
                    <span className="meta-item-label">Language</span>
                    <span className="meta-item-value">{currentShow.language}</span>
                  </div>
                )}
                {(currentShow.network?.name || currentShow.webChannel?.name) && (
                  <div className="meta-item">
                    <span className="meta-item-label">Network / Channel</span>
                    <span className="meta-item-value">
                      {currentShow.network?.name || currentShow.webChannel?.name}
                    </span>
                  </div>
                )}
                {currentShow.schedule?.days?.length > 0 && (
                  <div className="meta-item">
                    <span className="meta-item-label">Schedule</span>
                    <span className="meta-item-value">
                      {currentShow.schedule.days.join(', ')}
                      {currentShow.schedule.time ? ` at ${currentShow.schedule.time}` : ''}
                    </span>
                  </div>
                )}
                {currentShow.type && (
                  <div className="meta-item">
                    <span className="meta-item-label">Type</span>
                    <span className="meta-item-value">{currentShow.type}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Overview / Summary Section */}
          <div className="modal-section">
            <h3 className="modal-section-title">
              <span className="title-bar"></span> Overview
            </h3>
            <div className="modal-overview-text">
              {cleanSummary.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Cast & Characters Section */}
          {castList.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">
                <span className="title-bar"></span> Starring Cast
              </h3>
              <div className="modal-cast-grid">
                {castList.slice(0, 6).map((item, index) => (
                  <div key={index} className="cast-card">
                    <img
                      src={
                        item.person?.image?.medium ||
                        item.character?.image?.medium ||
                        FALLBACK_POSTER
                      }
                      alt={item.person?.name}
                      className="cast-avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FALLBACK_POSTER;
                      }}
                    />
                    <div className="cast-details">
                      <span className="cast-actor-name">{item.person?.name}</span>
                      <span className="cast-char-name">as {item.character?.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* External Links Bar */}
          <div className="modal-links-row">
            {currentShow.officialSite && (
              <a
                href={currentShow.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                🌐 Official Website ↗
              </a>
            )}
            {currentShow.externals?.imdb && (
              <a
                href={`https://www.imdb.com/title/${currentShow.externals.imdb}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm imdb-btn"
              >
                ⭐ View on IMDb ↗
              </a>
            )}
            {currentShow.url && (
              <a
                href={currentShow.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                📺 TVMaze Page ↗
              </a>
            )}
          </div>
        </div>

        {/* Modal Bottom Footer Action */}
        <div className="modal-footer-bar">
          <button className="btn btn-outline modal-bottom-close-btn" onClick={onClose}>
            ✕ Close
          </button>
        </div>
      </div>
    </div>
  );
}
