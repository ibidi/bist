import { NextRequest, NextResponse } from 'next/server';

// Watchlist is client-side only in serverless environment
// Return empty responses for server-side calls

export async function GET() {
  return NextResponse.json([]);
}

export async function POST(request: NextRequest) {
  try {
    const { symbol } = await request.json();
    return NextResponse.json({ 
      success: true, 
      message: 'Watchlist is managed client-side',
      symbol 
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const symbol = searchParams.get('symbol');
  
  if (!symbol) {
    return NextResponse.json(
      { error: 'Symbol is required' },
      { status: 400 }
    );
  }

  return NextResponse.json({ 
    success: true, 
    message: 'Watchlist is managed client-side',
    symbol 
  });
}
