import { NextRequest, NextResponse } from 'next/server';
const BorsaAPI = require('borsa-api');

const api = new BorsaAPI();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'popular';

  try {
    let stocks;

    switch (type) {
      case 'popular':
        stocks = await api.getPopularStocks();
        break;
      case 'gainers':
        stocks = await api.getTopGainers(10);
        break;
      case 'losers':
        stocks = await api.getTopLosers(10);
        break;
      default:
        stocks = await api.getPopularStocks();
    }

    return NextResponse.json(stocks);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch stocks' },
      { status: 500 }
    );
  }
}
