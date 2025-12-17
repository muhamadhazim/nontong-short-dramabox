const isClient = typeof window !== 'undefined';

export async function getHeaders() {
  if (isClient) {
    return {
      'User-Agent': navigator.userAgent
    };
  } else {
    try {
      const { headers } = await import("next/headers");
      const headersList = await headers();
      const userAgent = headersList.get('user-agent') || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
      return {
        'User-Agent': userAgent
      };
    } catch (e) {
      // Fallback if headers() fails (e.g. during static generation)
      return {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      };
    }
  }
}
