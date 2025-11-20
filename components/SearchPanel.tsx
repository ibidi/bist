'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import StockCard from './StockCard';

export default function SearchPanel() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-200 dark:border-slate-700">
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Hisse ara (örn: garanti, koç, tüpraş)"
            className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-300 dark:border-slate-600 rounded-lg pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-slate-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          {loading ? 'Aranıyor...' : 'Ara'}
        </button>
      </div>

      {searched && (
        <div className="mt-4">
          {results.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-slate-400 py-4">Sonuç bulunamadı</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((stock) => (
                <StockCard key={stock.symbol} stock={stock} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
