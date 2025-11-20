'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (symbol: string) => void;
  isFavorite: (symbol: string) => boolean;
  compareList: string[];
  addToCompare: (symbol: string) => void;
  removeFromCompare: (symbol: string) => void;
  clearCompare: () => void;
  isInCompare: (symbol: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, mounted]);

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const isFavorite = (symbol: string) => favorites.includes(symbol);

  const addToCompare = (symbol: string) => {
    if (compareList.length < 2 && !compareList.includes(symbol)) {
      setCompareList(prev => [...prev, symbol]);
    }
  };

  const removeFromCompare = (symbol: string) => {
    setCompareList(prev => prev.filter(s => s !== symbol));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (symbol: string) => compareList.includes(symbol);

  return (
    <FavoritesContext.Provider value={{
      favorites,
      toggleFavorite,
      isFavorite,
      compareList,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
