import { useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';

const FAVORITES_STORAGE_KEY = '@zenwalls_favorites';

// Create context and hook for managing favorites
export const [FavoritesContext, useFavorites] = createContextHook(() => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load the favorites from AsyncStorage
  useEffect(() => {
    loadFavorites();
  }, []);

  // Function to load favorites from AsyncStorage
  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        setFavoriteIds(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to save favorites to AsyncStorage
  const saveFavorites = async (ids: string[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  };

  // Function to toggle favorite (add or remove from favorites)
  const toggleFavorite = (wallpaperId: string) => {
    setFavoriteIds((prev) => {
      const newFavorites = prev.includes(wallpaperId)
        ? prev.filter((id) => id !== wallpaperId)
        : [...prev, wallpaperId];

      saveFavorites(newFavorites);  // Persist updated favorites list
      return newFavorites;
    });
  };

  // Function to check if a wallpaper is in favorites
  const isFavorite = (wallpaperId: string): boolean => {
    return favoriteIds.includes(wallpaperId);
  };

  // Return context values
  return {
    favoriteIds,
    isLoading,
    toggleFavorite,
    isFavorite,
  };
});
