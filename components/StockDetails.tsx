'use client';

import { useState, useEffect } from 'react';
import { Building2, TrendingUp, DollarSign, Percent, Activity, Info } from 'lucide-react';

interface StockDetailsProps {
  symbol: string;
}

interface StockDetailsData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap?: number;
  peRatio?: number;
  eps?: number;
  dividendYield?: number;
  beta?: number;
  sector?: string;
  industry?: string;
  description?: string;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  averageVolume?: number;
}

export default function StockDetails({ symbol }: StockDetailsProps) {
  const [data, setData] = useState<StockDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDetails();
  }, [symbol]);

  const fetchDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/stock-details/${symbol}`);
      if (!response.ok) throw new Error('Veri alınamadı');
      
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-red-500 dark:text-red-400">Hata: {error || 'Veri bulunamadı'}</div>
      </div>
    );
  }

  const formatMarketCap = (value?: number) => {
    if (!value) return 'N/A';
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T ₺`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B ₺`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M ₺`;
    return `${value.toLocaleString('tr-TR')} ₺`;
  };

  const formatVolume = (value?: number) => {
    if (!value) return 'N/A';
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toLocaleString('tr-TR');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
          <Building2 className="w-5 h-5" />
          Detaylı Bilgiler
        </h3>
        {data.sector && (
          <div className="flex gap-2 text-sm">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
              {data.sector}
            </span>
            {data.industry && (
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                {data.industry}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {/* Market Cap */}
        {data.marketCap && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-1">
              <DollarSign className="w-4 h-4" />
              Piyasa Değeri
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {formatMarketCap(data.marketCap)}
            </div>
          </div>
        )}

        {/* P/E Ratio */}
        {data.peRatio && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-1">
              <TrendingUp className="w-4 h-4" />
              F/K Oranı
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {data.peRatio.toFixed(2)}
            </div>
          </div>
        )}

        {/* EPS */}
        {data.eps && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-1">
              <DollarSign className="w-4 h-4" />
              HBK
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {data.eps.toFixed(2)} ₺
            </div>
          </div>
        )}

        {/* Dividend Yield */}
        {data.dividendYield && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-1">
              <Percent className="w-4 h-4" />
              Temettü Verimi
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {(data.dividendYield * 100).toFixed(2)}%
            </div>
          </div>
        )}

        {/* Beta */}
        {data.beta && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-1">
              <Activity className="w-4 h-4" />
              Beta
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {data.beta.toFixed(2)}
            </div>
          </div>
        )}

        {/* Average Volume */}
        {data.averageVolume && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-1">
              <Activity className="w-4 h-4" />
              Ort. Hacim
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {formatVolume(data.averageVolume)}
            </div>
          </div>
        )}
      </div>

      {/* 52 Week Range */}
      {data.fiftyTwoWeekHigh && data.fiftyTwoWeekLow && (
        <div className="mb-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">52 Haftalık Aralık</div>
          <div className="flex items-center gap-4">
            <span className="text-red-600 dark:text-red-400 font-semibold">
              {data.fiftyTwoWeekLow.toFixed(2)} ₺
            </span>
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                style={{
                  width: `${((data.price - data.fiftyTwoWeekLow) / (data.fiftyTwoWeekHigh - data.fiftyTwoWeekLow)) * 100}%`
                }}
              />
            </div>
            <span className="text-green-600 dark:text-green-400 font-semibold">
              {data.fiftyTwoWeekHigh.toFixed(2)} ₺
            </span>
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Güncel: <span className="font-semibold text-gray-900 dark:text-white">{data.price.toFixed(2)} ₺</span>
            </span>
          </div>
        </div>
      )}

      {/* Description */}
      {data.description && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-2">
            <Info className="w-4 h-4" />
            Şirket Hakkında
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {data.description.length > 300 
              ? `${data.description.substring(0, 300)}...` 
              : data.description
            }
          </p>
        </div>
      )}
    </div>
  );
}
