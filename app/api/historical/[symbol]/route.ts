import { NextRequest, NextResponse } from 'next/server';
import BorsaAPI from 'borsa-api';

const api = new BorsaAPI();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await params;
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || '1mo';
    
    const data = await api.getHistoricalData(symbol, {
      period: period as any,
      interval: '1d'
    });
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Veri alınamadı' },
      { status: 500 }
    );
  }
}
