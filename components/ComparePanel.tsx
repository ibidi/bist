'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { getLogoWithFallback } from '@/lib/logo-utils';
import Image from 'next/image';

interface ComparePanelProps {
  symbols: string[];
}

export default function ComparePanel({ symbols }: ComparePanelProps) {
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imgSrc1, setImgSrc1] = useState('');
  const [imgSrc2, setImgSrc2] = useState('');

  useEffect(() => {
    if (symbols.length === 2) {
      fetchStocks();
    }
  }, [symbols]);

  useEffect(() => {
    if (stocks.length === 2) {
      const logos1 = getLogoWithFallback(stocks[0].symbol);
      const logos2 = getLogoWithFallback(stocks[1].symbol);
      setImgSrc1(logos1.primary);
      setImgSrc2(logos2.primary);
    }
  }, [stocks]);

  const fetchStocks = async () => {
    setLoading(true);
    try {
      const promises = symbols.map(symbol =>
        fetch(`/api/stock/${symbol}`).then(res => res.json())
      );
      const data = await Promise.all(promises);
      setStocks(data);
    } catch (error) {
      console.error('Error fetching comparison:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800/50 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-2 gap-6">
            {[1, 2].map(i => (
              <div key={i} className="space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded"></div>
                <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (stocks.length !== 2) return null;

  const [stock1, stock2] = stocks;
  const logos1 = getLogoWithFallback(stock1.symbol);
  const logos2 = getLogoWithFallback(stock2.symbol);

  const priceDiff = stock1.price - stock2.price;
  const changeDiff = stock1.changePercent - stock2.changePercent;

  return (
    <div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stock 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-slate-700">
            <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-slate-700/50 flex items-center justify-center overflow-hidden">
              <Image
                src={imgSrc1}
                alt={stock1.symbol}
                width={64}
                height={64}
                className="object-contain"
                onError={() => setImgSrc1(logos1.fallback)}
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stock1.symbol}</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">{stock1.name}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Fiyat</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stock1.price.toFixed(2)} ₺</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Değişim</p>
              <div className={`flex items-center gap-2 ${stock1.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stock1.change >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                <span className="text-xl font-semibold">
                  {stock1.change >= 0 ? '+' : ''}{stock1.change.toFixed(2)} ({stock1.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">Yüksek</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{stock1.high.toFixed(2)} ₺</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">Düşük</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{stock1.low.toFixed(2)} ₺</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">Hacim</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{stock1.volume.toLocaleString('tr-TR')}</p>
            </div>
          </div>
        </div>

        {/* Stock 2 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-slate-700">
            <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-slate-700/50 flex items-center justify-center overflow-hidden">
              <Image
                src={imgSrc2}
                alt={stock2.symbol}
                width={64}
                height={64}
                className="object-contain"
                onError={() => setImgSrc2(logos2.fallback)}
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stock2.symbol}</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">{stock2.name}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Fiyat</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stock2.price.toFixed(2)} ₺</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Değişim</p>
              <div className={`flex items-center gap-2 ${stock2.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stock2.change >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                <span className="text-xl font-semibold">
                  {stock2.change >= 0 ? '+' : ''}{stock2.change.toFixed(2)} ({stock2.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">Yüksek</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{stock2.high.toFixed(2)} ₺</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">Düşük</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{stock2.low.toFixed(2)} ₺</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">Hacim</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{stock2.volume.toLocaleString('tr-TR')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Karşılaştırma Özeti</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">Fiyat Farkı</p>
            <p className={`text-2xl font-bold ${priceDiff >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {priceDiff >= 0 ? '+' : ''}{priceDiff.toFixed(2)} ₺
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
              {stock1.symbol} {priceDiff >= 0 ? 'daha pahalı' : 'daha ucuz'}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">Performans Farkı</p>
            <p className={`text-2xl font-bold ${changeDiff >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {changeDiff >= 0 ? '+' : ''}{changeDiff.toFixed(2)}%
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
              {stock1.symbol} {changeDiff >= 0 ? 'daha iyi performans' : 'daha kötü performans'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
