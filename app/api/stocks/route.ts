import { NextRequest, NextResponse } from 'next/server';
import { getPopularStocks, getTopGainers, getTopLosers } from '@/lib/borsa-api-wrapper';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'popular';

  try {
    let stocks;

    switch (type) {
      case 'popular':
        stocks = await getPopularStocks();
        break;
      case 'gainers':
        stocks = await getTopGainers(10);
        break;
      case 'losers':
        stocks = await getTopLosers(10);
        break;
      default:
        stocks = await getPopularStocks();
    }

    return NextResponse.json(stocks);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch stocks' },
      { status: 500 }
    );
  }
}
