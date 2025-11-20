import { NextRequest, NextResponse } from 'next/server';
const BorsaAPI = require('borsa-api');

const api = new BorsaAPI();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {
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
