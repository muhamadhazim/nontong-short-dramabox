import { useCallback, useEffect } from 'react';
import { Episode, VideoQuality } from '@/types/drama';
import { PROGRESS_SAVE_INTERVAL, PROGRESS_MIN_THRESHOLD, PROGRESS_END_THRESHOLD } from '@/lib/constants';

interface UsePlayerPersistenceProps {
  dramaId: string;
  currentEpisode: Episode | null;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isChangingQualityRef: React.MutableRefObject<boolean>;
  lastTimeRef: React.MutableRefObject<number>;
  isPlaying: boolean;
  selectedQuality: VideoQuality | null;
}

export function usePlayerPersistence({ 
  dramaId, 
  currentEpisode, 
  videoRef,
  isChangingQualityRef,
  lastTimeRef,
  isPlaying,
  selectedQuality
}: UsePlayerPersistenceProps) {
  
  // Save progress helper
  const saveCurrentProgress = useCallback(() => {
    const video = videoRef.current;
    if (!currentEpisode || !video) return;
    
    const time = video.currentTime;
    const dur = video.duration;
    
    if (time > PROGRESS_MIN_THRESHOLD && dur > 0 && time < dur - PROGRESS_END_THRESHOLD) {
      localStorage.setItem(`progress_${dramaId}_${currentEpisode.chapterId}`, time.toString());
    }
  }, [currentEpisode, dramaId, videoRef]);

  // Load progress
  useEffect(() => {
    if (!currentEpisode || !videoRef.current) return;
    
    const video = videoRef.current;
    const handleVideoReady = () => {
      if (isChangingQualityRef.current) {
        if (lastTimeRef.current > 0) {
           video.currentTime = lastTimeRef.current;
           if (isPlaying) video.play().catch(() => {});
        }
        isChangingQualityRef.current = false;
        return;
      }

      const savedProgress = localStorage.getItem(`progress_${dramaId}_${currentEpisode.chapterId}`);
      if (savedProgress) {
        const progress = parseFloat(savedProgress);
        if (progress > PROGRESS_MIN_THRESHOLD && progress < video.duration - PROGRESS_END_THRESHOLD) {
          video.currentTime = progress;
        }
      }
    };

    if (video.readyState >= 2) {
      handleVideoReady();
    } else {
      video.addEventListener('loadeddata', handleVideoReady, { once: true });
    }
    return () => video.removeEventListener('loadeddata', handleVideoReady);
  }, [currentEpisode, dramaId, selectedQuality, isPlaying, isChangingQualityRef, lastTimeRef, videoRef]);

  // Auto save
  useEffect(() => {
    const interval = setInterval(saveCurrentProgress, PROGRESS_SAVE_INTERVAL);
    return () => {
      clearInterval(interval);
      saveCurrentProgress();
    };
  }, [saveCurrentProgress]);

  return { saveCurrentProgress };
}
