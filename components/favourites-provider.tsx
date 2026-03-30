"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type React from "react";

const STORAGE_KEY = "active-collection:favourites";

type FavouritesContextType = {
  favouriteIds: string[];
  toggleFavourite: (id: string) => void;
  clearFavourites: () => void;
};

const FavouritesContext = createContext<FavouritesContextType>({
  favouriteIds: [],
  toggleFavourite: () => {},
  clearFavourites: () => {},
});

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const [favouriteIds, setFavouriteIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favouriteIds));
    } catch (error) {
      console.warn("Failed to write favourites to storage", error);
    }
  }, [favouriteIds]);

  const toggleFavourite = (brandId: string) => {
    setFavouriteIds((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId],
    );
  };

  const clearFavourites = () => setFavouriteIds([]);

  return (
    <FavouritesContext.Provider value={{ favouriteIds, toggleFavourite, clearFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}
