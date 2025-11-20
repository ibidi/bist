import { NextRequest, NextResponse } from 'next/server';
import { getBorsaAPI } from '@/lib/borsa-api-wrapper';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {
    const api = getBorsaAPI();
    const { symbol } = await params;
    const stock = await api.getStock(symbol);
    return NextResponse.json(stock);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch stock' },
      { status: 500 }
    );
  }
}
