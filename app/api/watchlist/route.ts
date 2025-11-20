import { NextRequest, NextResponse } from 'next/server';
const BorsaAPI = require('borsa-api');

const api = new BorsaAPI();

export async function GET() {
  try {
    const stocks = await api.getWatchlistData();
    return NextResponse.json(stocks);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch watchlist' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { symbol, name } = await request.json();
    const result = api.watchlist.addToWatchlist(symbol, name || '');
    
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to add to watchlist' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');
    
    if (!symbol) {
      return NextResponse.json(
        { error: 'Symbol is required' },
        { status: 400 }
      );
    }

    const result = api.watchlist.removeFromWatchlist(symbol);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to remove from watchlist' },
      { status: 500 }
    );
  }
}
