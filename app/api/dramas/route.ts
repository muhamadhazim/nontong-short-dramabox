import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get('endpoint');
  const query = searchParams.get('query');
  const bookId = searchParams.get('bookId');

  if (!API_BASE_URL) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
  }

  try {
    let url = `${API_BASE_URL}/${endpoint}`;
    
    // Add query parameters
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (bookId) params.append('bookId', bookId);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    console.log(`[Proxy] Fetching: ${url}`);
    const startTime = Date.now();

    const origin = new URL(API_BASE_URL).origin;

    const response = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Referer': `${origin}/`,
        'Connection': 'keep-alive'
      }
    });

    const duration = Date.now() - startTime;
    console.log(`[Proxy] Done in ${duration}ms`);

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
