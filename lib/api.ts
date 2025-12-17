import { Drama, DramaCard, Episode } from "@/types/drama";
import { getHeaders } from "@/lib/headers";

const API_BASE_URL = process.env.API_BASE_URL;
const FALLBACK_IMAGE = "https://picsum.photos/seed/placeholder/400/600";

// Check if we're on client side
const isClient = typeof window !== 'undefined';

// Helper to fetch from API or proxy
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchAPI(endpoint: string, revalidate: number = 1800): Promise<any> {
  try {
    let url: string;
    
    if (isClient) {
      // Client-side: use Next.js API route as proxy
      url = `/api/dramas?endpoint=${encodeURIComponent(endpoint)}`;
    } else {
      // Server-side: direct API call
      url = `${API_BASE_URL}/${endpoint}`;
    }

    // Get User-Agent headers
    const headers = await getHeaders();

    const response = await fetch(url, {
      headers,
      next: { revalidate }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

// Transform API drama to our component format
export function transformDrama(drama: Drama): DramaCard {
  const cover = drama.coverWap || drama.cover || FALLBACK_IMAGE;
  const tags = drama.tagNames || drama.tags || drama.tagV3s?.map(t => t.tagName) || [];
  
  return {
    id: drama.bookId,
    title: drama.bookName,
    cover: cover || FALLBACK_IMAGE, // Double check for empty string
    tags: tags.slice(0, 3), // Max 3 tags
    episodes: drama.chapterCount,
    description: drama.introduction,
    isNew: drama.corner?.name === "Terbaru",
    viewCount: drama.playCount,
  };
}

// API Functions
export async function getForYou(): Promise<DramaCard[]> {
  const data: Drama[] = await fetchAPI('foryou', 3600);
  return data.map(transformDrama);
}

export async function getLatest(): Promise<DramaCard[]> {
  const data: Drama[] = await fetchAPI('latest', 1800);
  return data.map(transformDrama);
}

export async function getTrending(): Promise<DramaCard[]> {
  const data: Drama[] = await fetchAPI('Trending', 1800);
  return data.map(transformDrama);
}

export async function searchDramas(query: string): Promise<DramaCard[]> {
  if (!query.trim()) return [];
  
  let url: string;
  if (isClient) {
    url = `/api/dramas?endpoint=search&query=${encodeURIComponent(query)}`;
  } else {
    url = `${API_BASE_URL}/search?query=${encodeURIComponent(query)}`;
  }
  
  try {
    const headers = await getHeaders();
    const response = await fetch(url, {
      headers,
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      throw new Error("Failed to search dramas");
    }
    
    const data: Drama[] = await response.json();
    return data.map(transformDrama);
  } catch (error) {
    console.error("Error searching dramas:", error);
    return [];
  }
}

export async function getPopularSearches(): Promise<string[]> {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${API_BASE_URL}/populersearch`, {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch popular searches");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching popular searches:", error);
    return [];
  }
}

export async function getAllEpisodes(bookId: string): Promise<Episode[]> {
  try {
    const headers = await getHeaders();
    const response = await fetch(
      `${API_BASE_URL}/allepisode?bookId=${bookId}`,
      {
        headers,
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch episodes");
    }
    
    const data: Episode[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return [];
  }
}
