import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FeaturedSection from './components/FeaturedSection';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import MovieGrid from './components/MovieGrid';
import MovieModal from './components/MovieModal';
import FavoritesView from './components/FavoritesView';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { useFavorites } from './hooks/useFavorites';
import { fetchAllShows, searchShows, fetchSpotlightShows } from './services/api';
import './App.css';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [minRating, setMinRating] = useState('All');
  const [sortBy, setSortBy] = useState('rating-desc');

  const [allShows, setAllShows] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [spotlightShows, setSpotlightShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingSpotlight, setLoadingSpotlight] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
  }, []);

  const {
    favorites,
    favoritesCount,
    isFavorite,
    toggleFavorite,
    clearAllFavorites,
  } = useFavorites(showToast);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchAllShows(0)
      .then((data) => {
        if (isMounted) {
          setAllShows(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to fetch movies.');
          setLoading(false);
        }
      });

    fetchSpotlightShows()
      .then((data) => {
        if (isMounted) {
          setSpotlightShows(data);
          setLoadingSpotlight(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoadingSpotlight(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSearchResults([]);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    searchShows(debouncedQuery)
      .then((results) => {
        if (isMounted) {
          setSearchResults(results);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Error executing search.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery]);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore || debouncedQuery) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;

    try {
      const moreShows = await fetchAllShows(nextPage);
      if (moreShows.length === 0) {
        setHasMore(false);
      } else {
        setAllShows((prev) => [...prev, ...moreShows]);
        setCurrentPage(nextPage);
      }
    } catch {
      showToast('Could not load more shows.', 'error');
    } finally {
      setLoadingMore(false);
    }
  };

  const filteredShows = useMemo(() => {
    const sourceList = debouncedQuery ? searchResults : allShows;
    if (!sourceList) return [];

    let result = sourceList.filter((show) => {
      if (!show) return false;

      if (selectedGenre !== 'All Genres') {
        if (!show.genres || !show.genres.includes(selectedGenre)) {
          return false;
        }
      }

      if (selectedStatus !== 'All') {
        if (!show.status || show.status.toLowerCase() !== selectedStatus.toLowerCase()) {
          return false;
        }
      }

      if (minRating !== 'All') {
        const threshold = parseFloat(minRating);
        const rating = show.rating?.average;
        if (rating === null || rating === undefined || rating < threshold) {
          return false;
        }
      }

      return true;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating-desc': {
          const ratingA = a.rating?.average ?? -1;
          const ratingB = b.rating?.average ?? -1;
          return ratingB - ratingA;
        }
        case 'premiered-desc': {
          const dateA = a.premiered ? new Date(a.premiered).getTime() : 0;
          const dateB = b.premiered ? new Date(b.premiered).getTime() : 0;
          return dateB - dateA;
        }
        case 'premiered-asc': {
          const dateA = a.premiered ? new Date(a.premiered).getTime() : Infinity;
          const dateB = b.premiered ? new Date(b.premiered).getTime() : Infinity;
          return dateA - dateB;
        }
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        default:
          return 0;
      }
    });

    return result;
  }, [debouncedQuery, searchResults, allShows, selectedGenre, selectedStatus, minRating, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedGenre !== 'All Genres') count++;
    if (selectedStatus !== 'All') count++;
    if (minRating !== 'All') count++;
    if (sortBy !== 'rating-desc') count++;
    return count;
  }, [selectedGenre, selectedStatus, minRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedGenre('All Genres');
    setSelectedStatus('All');
    setMinRating('All');
    setSortBy('rating-desc');
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setDebouncedQuery('');
    handleResetFilters();
  };

  const handleHeroQuickSearch = (query) => {
    setSearchQuery(query);
    setActivePage('movies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGenreFromHome = (genre) => {
    setSelectedGenre(genre);
    setActivePage('movies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreAll = () => {
    setActivePage('movies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-wrapper">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
      />

      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        favoritesCount={favoritesCount}
        onSelectGenre={handleSelectGenreFromHome}
      />

      <main className="main-content">
        {activePage === 'home' && (
          <div className="home-view">
            <HeroBanner
              onExploreClick={handleExploreAll}
              onQuickSearch={handleHeroQuickSearch}
            />

            <FeaturedSection
              spotlightShows={spotlightShows}
              loadingSpotlight={loadingSpotlight}
              onSelectMovie={(movie) => setSelectedMovie(movie)}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              onSelectGenre={handleSelectGenreFromHome}
              onExploreAll={handleExploreAll}
            />
          </div>
        )}

        {activePage === 'movies' && (
          <div className="movies-view section-container">
            <div className="section-header">
              <div>
                <div className="section-tag">🎬 FULL CATALOG</div>
                <h2 className="section-title">Explore Movies & TV Series</h2>
                <p className="section-desc">
                  Browse {filteredShows.length} available title{filteredShows.length === 1 ? '' : 's'} with live search and multi-filtering.
                </p>
              </div>
            </div>

            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onClear={() => setSearchQuery('')}
              totalResults={filteredShows.length}
              isSearching={loading && Boolean(debouncedQuery)}
            />

            <FilterBar
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              minRating={minRating}
              setMinRating={setMinRating}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onResetFilters={handleResetFilters}
              activeFilterCount={activeFilterCount}
            />

            <MovieGrid
              movies={filteredShows}
              loading={loading}
              error={error}
              onSelectMovie={(movie) => setSelectedMovie(movie)}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              onRetry={() => {
                setLoading(true);
                setError(null);
                fetchAllShows(0)
                  .then((d) => {
                    setAllShows(d);
                    setLoading(false);
                  })
                  .catch((e) => {
                    setError(e.message);
                    setLoading(false);
                  });
              }}
              onClearFilters={handleClearAll}
              searchQuery={debouncedQuery}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              loadingMore={loadingMore}
            />
          </div>
        )}

        {activePage === 'favorites' && (
          <FavoritesView
            favorites={favorites}
            onSelectMovie={(movie) => setSelectedMovie(movie)}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            onClearAll={clearAllFavorites}
            onExploreMovies={handleExploreAll}
          />
        )}
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isFavorite={isFavorite(selectedMovie.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}

      <Footer onNavigate={setActivePage} />
    </div>
  );
}
