'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Star, Moon, Sun, Github, Linkedin, Twitter } from 'lucide-react';
import StockCard from '@/components/StockCard';
import WatchlistPanel from '@/components/WatchlistPanel';
import SearchPanel from '@/components/SearchPanel';
import { useTheme } from '@/components/ThemeProvider';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'popular' | 'gainers' | 'losers' | 'watchlist'>('popular');
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetchStocks();
  }, [activeTab]);

  const fetchStocks = async () => {
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
      <header className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700 transition-colors">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                📈 Borsa Dashboard
              </h1>
              <p className="text-gray-600 dark:text-slate-400 mt-1">Türk Borsası Canlı Takip</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-slate-500">Powered by</p>
                <p className="text-sm font-semibold text-gray-700 dark:text-slate-300">borsa-api</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
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
            active={activeTab === 'watchlist'}
            onClick={() => setActiveTab('watchlist')}
            icon={<Star className="w-4 h-4" />}
            label="İzleme Listesi"
          />
        </div>

        {/* Search */}
        <SearchPanel />

        {/* Content */}
        <div className="mt-6">
          {activeTab === 'watchlist' ? (
            <WatchlistPanel onRefresh={fetchStocks} />
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
      </div>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {/* About */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Borsa Dashboard</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                Modern ve şık bir Türk Borsası takip uygulaması. borsa-api npm paketi kullanılarak geliştirilmiştir.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Projeler</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="https://www.npmjs.com/package/borsa-api" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    📦 borsa-api (NPM)
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/ibidi/borsa-api" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    💻 GitHub Repository
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/ibidi/borsa-dashboard" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    🎨 Dashboard Source
                  </a>
                </li>
              </ul>
            </div>

            {/* Developer */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Geliştirici</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">İhsan Baki Doğan</p>
              <div className="flex gap-3">
                <a 
                  href="https://github.com/ibidi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-gray-700 dark:text-slate-300" />
                </a>
                <a 
                  href="https://linkedin.com/in/ibidi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-gray-700 dark:text-slate-300" />
                </a>
                <a 
                  href="https://x.com/ihsanbakidogan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="w-5 h-5 text-gray-700 dark:text-slate-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="pt-6 border-t border-gray-200 dark:border-slate-800 text-center">
            <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">
              ⚠️ Gecikmeli veri - Sadece eğitim amaçlıdır - Yatırım tavsiyesi değildir
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-500">
              Made with ❤️ using Next.js 15, React 19, and borsa-api
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
          : 'bg-white dark:bg-slate-800/50 text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700/50 hover:text-gray-900 dark:hover:text-slate-300 border border-gray-200 dark:border-slate-700'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
