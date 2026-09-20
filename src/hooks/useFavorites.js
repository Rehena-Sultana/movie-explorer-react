import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'movie_explorer_favorites';

export function useFavorites(onNotify) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.error('Could not save favorites:', err);
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (id) => favorites.some((fav) => fav.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (show) => {
      if (!show?.id) return;
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
    if (onNotify) onNotify('Cleared Watchlist', 'info');
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
