'use client';

import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import { getLogoWithFallback } from '@/lib/logo-utils';
import Image from 'next/image';
import { useState } from 'react';

interface StockCardProps {
  stock: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
  };
}

export default function StockCard({ stock }: StockCardProps) {
  const isPositive = stock.change >= 0;
  const logos = getLogoWithFallback(stock.symbol);
  const [imgSrc, setImgSrc] = useState(logos.primary);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-slate-900/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center overflow-hidden">
            <Image
              src={imgSrc}
              alt={stock.symbol}
              width={48}
              height={48}
              className="object-contain"
              onError={() => setImgSrc(logos.fallback)}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{stock.symbol}</h3>
            <p className="text-sm text-slate-400 truncate max-w-[200px]">{stock.name}</p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-yellow-400 transition-colors">
          <Star className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">
            {stock.price.toFixed(2)}
          </span>
          <span className="text-slate-400">₺</span>
        </div>

        <div className={`flex items-center gap-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="font-semibold">
            {isPositive ? '+' : ''}{stock.change.toFixed(2)}
          </span>
          <span className="font-semibold">
            ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
          </span>
        </div>

        <div className="pt-2 border-t border-slate-700">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Hacim</span>
            <span className="text-slate-300 font-medium">
              {stock.volume.toLocaleString('tr-TR')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
