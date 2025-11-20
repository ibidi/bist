'use client';

import { useState, useEffect } from 'react';
import StockCard from './StockCard';
import { Plus, Trash2 } from 'lucide-react';

export default function WatchlistPanel({ onRefresh }: { onRefresh: () => void }) {
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSymbol, setNewSymbol] = useState('');

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    setLoading(true);
    try {
      // Get watchlist from localStorage
      const saved = localStorage.getItem('watchlist');
      const symbols = saved ? JSON.parse(saved) : [];
      
      if (symbols.length === 0) {
        setWatchlist([]);
        setLoading(false);
        return;
      }

      // Fetch stock data for each symbol
      const promises = symbols.map((symbol: string) =>
        fetch(`/api/stock/${symbol}`).then(res => res.json())
      );
      const data = await Promise.all(promises);
      setWatchlist(data.filter((s: any) => s && !s.error));
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      setWatchlist([]);
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = async () => {
    if (!newSymbol.trim()) return;

    try {
      const saved = localStorage.getItem('watchlist');
      const symbols = saved ? JSON.parse(saved) : [];
      
      if (!symbols.includes(newSymbol.toUpperCase())) {
        symbols.push(newSymbol.toUpperCase());
        localStorage.setItem('watchlist', JSON.stringify(symbols));
        setNewSymbol('');
        fetchWatchlist();
        onRefresh();
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  const removeFromWatchlist = async (symbol: string) => {
    try {
      const saved = localStorage.getItem('watchlist');
      const symbols = saved ? JSON.parse(saved) : [];
      const filtered = symbols.filter((s: string) => s !== symbol);
      localStorage.setItem('watchlist', JSON.stringify(filtered));
      fetchWatchlist();
      onRefresh();
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-800/50 rounded-lg p-6 animate-pulse border border-gray-200 dark:border-slate-700">
            <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Add to Watchlist */}
      <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-slate-700 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addToWatchlist()}
            placeholder="Hisse sembolü (örn: THYAO)"
            className="flex-1 bg-gray-50 dark:bg-slate-900/50 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            onClick={addToWatchlist}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Ekle
          </button>
        </div>
      </div>

      {/* Watchlist Items */}
      {watchlist.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-slate-400">
          <p className="text-lg mb-2">İzleme listesi boş</p>
          <p className="text-sm">Yukarıdan hisse ekleyerek başlayın</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchlist.map((stock) => (
            <div key={stock.symbol} className="relative group">
              <StockCard stock={stock} />
              <button
                onClick={() => removeFromWatchlist(stock.symbol)}
                className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
