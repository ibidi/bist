import { NextRequest, NextResponse } from 'next/server';
import { getBorsaAPI } from '@/lib/borsa-api-wrapper';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    );
  }

  try {
    const api = getBorsaAPI();
    const results = await api.searchStock(query);
    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to search stocks' },
      { status: 500 }
    );
  }
}
