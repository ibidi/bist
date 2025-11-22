'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, TrendingUp, TrendingDown, Star } from 'lucide-react';
import HistoricalChart from '@/components/HistoricalChart';
import StockDetails from '@/components/StockDetails';
import { useFavorites } from '@/lib/favorites-context';

interface PageProps {
  params: Promise<{ symbol: string }>;
}

export default function StockPage({ params }: PageProps) {
  const { symbol } = use(params);
  const router = useRouter();
  const [stock, setStock] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    fetchStock();
  }, [symbol]);

  const fetchStock = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/stock/${symbol}`);
      const data = await response.json();
      setStock(data);
    } catch (error) {
      console.error('Error fetching stock:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Hisse bulunamadı</h1>
            <button
              onClick={() => router.push('/')}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Ana sayfaya dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  const changeColor = stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const ChangeIcon = stock.change >= 0 ? TrendingUp : TrendingDown;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Ana Sayfaya Dön
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stock.symbol}
                  </h1>
                  <button
                    onClick={() => toggleFavorite(stock.symbol)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        isFavorite(stock.symbol)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-400 dark:text-gray-500'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{stock.name}</p>
                
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {stock.price.toFixed(2)} ₺
                  </span>
                  <div className={`flex items-center gap-2 ${changeColor}`}>
                    <ChangeIcon className="w-6 h-6" />
                    <span className="text-xl font-semibold">
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ₺
                    </span>
                    <span className="text-lg">
                      ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Açılış</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{stock.open.toFixed(2)} ₺</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Yüksek</div>
                    <div className="font-semibold text-green-600 dark:text-green-400">{stock.high.toFixed(2)} ₺</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Düşük</div>
                    <div className="font-semibold text-red-600 dark:text-red-400">{stock.low.toFixed(2)} ₺</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Hacim</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {stock.volume.toLocaleString('tr-TR')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Historical Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <HistoricalChart symbol={symbol} />
          </div>

          {/* Stock Details - Takes 1 column */}
          <div className="lg:col-span-1">
            <StockDetails symbol={symbol} />
          </div>
        </div>
      </div>
    </div>
  );
}
