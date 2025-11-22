import { NextRequest, NextResponse } from 'next/server';
import BorsaAPI from 'borsa-api';

const api = new BorsaAPI();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await params;
    const data = await api.getStockDetails(symbol);
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Veri alınamadı' },
      { status: 500 }
    );
  }
}
