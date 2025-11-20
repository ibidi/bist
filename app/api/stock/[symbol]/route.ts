import { NextRequest, NextResponse } from 'next/server';
import { getStock } from '@/lib/borsa-api-wrapper';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await params;
    const stock = await getStock(symbol);
    return NextResponse.json(stock);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch stock' },
      { status: 500 }
    );
  }
}
