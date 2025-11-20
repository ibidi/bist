'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Star, Search } from 'lucide-react';
import StockCard from '@/components/StockCard';
import WatchlistPanel from '@/components/WatchlistPanel';
import SearchPanel from '@/components/SearchPanel';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'popular' | 'gainers' | 'losers' | 'watchlist'>('popular');
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                📈 Borsa Dashboard
              </h1>
              <p className="text-slate-400 mt-1">Türk Borsası Canlı Takip</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Powered by</p>
              <p className="text-sm font-semibold text-slate-300">borsa-api</p>
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
                  <div key={i} className="bg-slate-800/50 rounded-lg p-6 animate-pulse">
                    <div className="h-6 bg-slate-700 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-slate-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-700 rounded w-1/3"></div>
                  </div>
                ))
              ) : stocks.length === 0 ? (
                <div className="col-span-full text-center py-12 text-slate-400">
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
      <footer className="mt-12 py-6 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>⚠️ Gecikmeli veri - Sadece eğitim amaçlıdır - Yatırım tavsiyesi değildir</p>
          <p className="mt-2">Made with ❤️ using borsa-api</p>
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
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
          : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
