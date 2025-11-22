'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

interface HistoricalChartProps {
  symbol: string;
}

interface ChartData {
  date: string;
  price: number;
  volume: number;
}

export default function HistoricalChart({ symbol }: HistoricalChartProps) {
  const [data, setData] = useState<ChartData[]>([]);
  const [period, setPeriod] = useState<'5d' | '1mo' | '3mo' | '6mo' | '1y'>('1mo');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    change: number;
    changePercent: number;
    high52w: number;
    low52w: number;
  } | null>(null);

  useEffect(() => {
    fetchHistoricalData();
  }, [symbol, period]);

  const fetchHistoricalData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/historical/${symbol}?period=${period}`);
      if (!response.ok) throw new Error('Veri alınamadı');
      
      const result = await response.json();
      
      // Format data for chart
      const chartData = result.quotes.map((q: any) => ({
        date: new Date(q.date).toLocaleDateString('tr-TR', { 
          day: '2-digit', 
          month: 'short' 
        }),
        price: q.close,
        volume: q.volume
      }));
      
      setData(chartData);
      
      // Calculate stats
      if (chartData.length > 0) {
        const firstPrice = chartData[0].price;
        const lastPrice = chartData[chartData.length - 1].price;
        const change = lastPrice - firstPrice;
        const changePercent = (change / firstPrice) * 100;
        
        setStats({
          change,
          changePercent,
          high52w: result.meta.fiftyTwoWeekHigh,
          low52w: result.meta.fiftyTwoWeekLow
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const periods = [
    { value: '5d', label: '5G' },
    { value: '1mo', label: '1A' },
    { value: '3mo', label: '3A' },
    { value: '6mo', label: '6A' },
    { value: '1y', label: '1Y' }
  ];

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-red-500 dark:text-red-400">Hata: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Fiyat Geçmişi
          </h3>
          {stats && (
            <div className="flex items-center gap-4 mt-2">
              <div className={`flex items-center gap-1 ${stats.changePercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stats.changePercent >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-semibold">
                  {stats.changePercent >= 0 ? '+' : ''}{stats.changePercent.toFixed(2)}%
                </span>
                <span className="text-sm">
                  ({stats.change >= 0 ? '+' : ''}{stats.change.toFixed(2)} ₺)
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                52H: <span className="text-green-600 dark:text-green-400 font-semibold">{stats.high52w.toFixed(2)} ₺</span>
                {' / '}
                <span className="text-red-600 dark:text-red-400 font-semibold">{stats.low52w.toFixed(2)} ₺</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Period Selector */}
        <div className="flex gap-2">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value as any)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                period === p.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis 
            dataKey="date" 
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
            domain={['auto', 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value: number) => [`${value.toFixed(2)} ₺`, 'Fiyat']}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            name="Kapanış Fiyatı"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
