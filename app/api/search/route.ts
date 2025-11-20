import { NextRequest, NextResponse } from 'next/server';
import { searchStock } from '@/lib/borsa-api-wrapper';

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
    const results = await searchStock(query);
    return NextResponse.json(results);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to search stocks' },
      { status: 500 }
    );
  }
}
