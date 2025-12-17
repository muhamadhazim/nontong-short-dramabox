import { useState, useEffect, useCallback } from 'react';
import type { Episode, DramaDetail, VideoQuality } from '@/types/drama';

interface UseWatchDataProps {
  dramaId: string;
  initialEpisodes: Episode[];
  initialDramaDetail: DramaDetail;
}

export function useWatchData({ dramaId, initialEpisodes, initialDramaDetail }: UseWatchDataProps) {
  const [episodes, setEpisodes] = useState<Episode[]>(initialEpisodes);
  const [dramaDetail, setDramaDetail] = useState<DramaDetail | null>(initialDramaDetail);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(
    initialEpisodes.length > 0 ? initialEpisodes[0] : null
  );
  
  const getInitialQualities = (episode: Episode | null) => {
    if (!episode?.cdnList?.length) return [];
    const videoList = episode.cdnList[0].videoPathList || [];
    return [...videoList].sort((a, b) => b.quality - a.quality);
  };

  // Helper to pick quality based on preference -> 720p -> highest
  const pickBestQuality = useCallback((qualities: VideoQuality[]) => {
    if (qualities.length === 0) return null;
    
    // 1. Try saved preference
    const saved = typeof window !== 'undefined' ? localStorage.getItem('preferred_quality') : null;
    if (saved) {
      const match = qualities.find(q => q.quality === parseInt(saved));
      if (match) return match;
    }

    // 2. Try Default 720p
    const q720 = qualities.find(q => q.quality === 720);
    if (q720) return q720;

    // 3. Fallback to highest available
    return qualities[0];
  }, []);

  const initialQualities = getInitialQualities(currentEpisode);
  const [availableQualities, setAvailableQualities] = useState<VideoQuality[]>(initialQualities);
  const [selectedQuality, setSelectedQuality] = useState<VideoQuality | null>(() => {
    // Initialize state with best quality logic
    return pickBestQuality(initialQualities);
  });
  
  const [isLoading, setIsLoading] = useState(initialEpisodes.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialEpisodes.length > 0) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/dramas?endpoint=allepisode&bookId=${dramaId}`);
        if (!res.ok) throw new Error('Failed to fetch');
        
        const data = await res.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setEpisodes(data);
          const firstEp = data[0];
          setCurrentEpisode(firstEp);
          
          if (firstEp.cdnList?.length) {
             const videoList = firstEp.cdnList[0].videoPathList || [];
             const sorted = [...videoList].sort((a, b) => b.quality - a.quality);
             setAvailableQualities(sorted);
             setSelectedQuality(pickBestQuality(sorted));
          }
        } else {
          setError('No episodes found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load drama');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dramaId, initialEpisodes.length, pickBestQuality]);

  const updateVideoQualities = useCallback((episode: Episode) => {
    if (!episode.cdnList || episode.cdnList.length === 0) {
      setAvailableQualities([]);
      setSelectedQuality(null);
      return;
    }
    const videoList = episode.cdnList[0].videoPathList || [];
    const sortedQualities = [...videoList].sort((a, b) => b.quality - a.quality);
    setAvailableQualities(sortedQualities);
    setSelectedQuality(pickBestQuality(sortedQualities));
  }, [pickBestQuality]);

  return {
    episodes,
    dramaDetail,
    currentEpisode,
    setCurrentEpisode,
    availableQualities,
    selectedQuality,
    setSelectedQuality,
    isLoading,
    error,
    updateVideoQualities
  };
}
