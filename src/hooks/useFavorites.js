import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'cinepulse_favorite_shows_v1';

export function useFavorites(onNotify) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.warn('Failed to parse favorites from localStorage:', err);
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.warn('Failed to save favorites to localStorage:', err);
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (id) => {
      return favorites.some((fav) => fav.id === id);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (show) => {
      if (!show || !show.id) return;
      setFavorites((prev) => {
        const exists = prev.some((fav) => fav.id === show.id);
        if (exists) {
          if (onNotify) onNotify(`Removed "${show.name}" from Watchlist`, 'info');
          return prev.filter((fav) => fav.id !== show.id);
        } else {
          if (onNotify) onNotify(`Added "${show.name}" to Watchlist! ⭐`, 'success');
          return [show, ...prev];
        }
      });
    },
    [onNotify]
  );

  const removeFavorite = useCallback(
    (id, name = 'Show') => {
      setFavorites((prev) => prev.filter((fav) => fav.id !== id));
      if (onNotify) onNotify(`Removed "${name}" from Watchlist`, 'info');
    },
    [onNotify]
  );

  const clearAllFavorites = useCallback(() => {
    setFavorites([]);
    if (onNotify) onNotify('Cleared all items from Watchlist', 'info');
  }, [onNotify]);

  return {
    favorites,
    favoritesCount: favorites.length,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearAllFavorites,
  };
}
