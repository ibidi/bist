'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Star, Moon, Sun, Github, GitCompare, X } from 'lucide-react';
import StockCard from '@/components/StockCard';
import WatchlistPanel from '@/components/WatchlistPanel';
import SearchPanel from '@/components/SearchPanel';
import ComparePanel from '@/components/ComparePanel';
import { useTheme } from '@/components/ThemeProvider';
import { useFavorites } from '@/lib/favorites-context';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'popular' | 'gainers' | 'losers' | 'watchlist' | 'favorites'>('popular');
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { compareList, clearCompare, favorites } = useFavorites();

  useEffect(() => {
    fetchStocks();
  }, [activeTab]);

  const fetchStocks = async () => {
    if (activeTab === 'favorites') {
      if (favorites.length === 0) {
        setStocks([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const promises = favorites.map(symbol => 
          fetch(`/api/stock/${symbol}`).then(res => res.json())
        );
        const data = await Promise.all(promises);
        setStocks(data.filter(s => s && !s.error));
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/stocks?type=${activeTab}`);
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700 transition-colors sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                📈 <span className="truncate">Borsa Dashboard</span>
              </h1>
              <p className="text-xs md:text-sm text-gray-600 dark:text-slate-400 mt-1 hidden sm:block">
                ⚠️ Gecikmeli veri - Sadece eğitim amaçlıdır
              </p>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 md:p-3 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex-shrink-0"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
              <div className="text-right hidden md:block">
                <p className="text-xs text-gray-500 dark:text-slate-500">Powered by</p>
                <a 
                  href="https://www.npmjs.com/package/borsa-api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  borsa-api
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Compare Bar */}
        {compareList.length > 0 && (
          <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GitCompare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Karşılaştırma: {compareList.join(' vs ')} {compareList.length === 1 && '(Bir hisse daha seçin)'}
                </span>
              </div>
              <div className="flex gap-2">
                {compareList.length === 2 && (
                  <button
                    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Karşılaştır
                  </button>
                )}
                <button
                  onClick={clearCompare}
                  className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <TabButton
            active={activeTab === 'popular'}
            onClick={() => setActiveTab('popular')}
            icon={<Activity className="w-4 h-4" />}
            label="Popüler"
          />
          <TabButton
            active={activeTab === 'gainers'}
            onClick={() => setActiveTab('gainers')}
            icon={<TrendingUp className="w-4 h-4" />}
            label="Yükselenler"
          />
          <TabButton
            active={activeTab === 'losers'}
            onClick={() => setActiveTab('losers')}
            icon={<TrendingDown className="w-4 h-4" />}
            label="Düşenler"
          />
          <TabButton
            active={activeTab === 'favorites'}
            onClick={() => setActiveTab('favorites')}
            icon={<Star className="w-4 h-4" />}
            label={`Favoriler${favorites.length > 0 ? ` (${favorites.length})` : ''}`}
          />
          <TabButton
            active={activeTab === 'watchlist'}
            onClick={() => setActiveTab('watchlist')}
            icon={<Star className="w-4 h-4 fill-current" />}
            label="İzleme"
          />
        </div>

        {/* Search */}
        <SearchPanel />

        {/* Content */}
        <div className="mt-6">
          {activeTab === 'watchlist' ? (
            <WatchlistPanel onRefresh={fetchStocks} />
          ) : activeTab === 'favorites' && favorites.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-16 h-16 mx-auto text-gray-300 dark:text-slate-600 mb-4" />
              <p className="text-gray-500 dark:text-slate-400 text-lg mb-2">Henüz favori hisse eklemediniz</p>
              <p className="text-gray-400 dark:text-slate-500 text-sm">Hisselerin üzerindeki yıldız ikonuna tıklayarak favorilere ekleyin</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800/50 rounded-lg p-6 animate-pulse border border-gray-200 dark:border-slate-700">
                    <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/3"></div>
                  </div>
                ))
              ) : stocks.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500 dark:text-slate-400">
                  Veri bulunamadı
                </div>
              ) : (
                stocks.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))
              )}
            </div>
          )}
        </div>

        {/* Compare Panel */}
        {compareList.length === 2 && (
          <div className="mt-8">
            <ComparePanel symbols={compareList} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 transition-colors">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">
            Powered by{' '}
            <a 
              href="https://www.npmjs.com/package/borsa-api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              borsa-api
            </a>
          </p>
          <p className="text-xs text-gray-500 dark:text-slate-500">
            ⚠️ Gecikmeli veri - Sadece eğitim amaçlıdır - Yatırım tavsiyesi değildir
          </p>
        </div>
      </footer>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm md:text-base ${
        active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
          : 'bg-white dark:bg-slate-800/50 text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700/50 hover:text-gray-900 dark:hover:text-slate-300 border border-gray-200 dark:border-slate-700'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{label.split(' ')[0]}</span>
    </button>
  );
}
