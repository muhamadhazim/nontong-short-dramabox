import { useState, useRef, useCallback, useEffect } from 'react';
import type { Episode, VideoQuality } from '@/types/drama';
import { useDeviceDetection } from './useDeviceDetection';
import { usePlayerControls } from './usePlayerControls';
import { usePlayerPersistence } from './usePlayerPersistence';
import { useVideoState } from './useVideoState';
import { SEEK_TIME_SECONDS, DOUBLE_TAP_DELAY } from '@/lib/constants';

interface UseVideoPlayerProps {
  dramaId: string;
  currentEpisode: Episode | null;
  selectedQuality: VideoQuality | null;
  onNextEpisode: () => void;
}

export function useVideoPlayer({ dramaId, currentEpisode, selectedQuality, onNextEpisode }: UseVideoPlayerProps) {
  // 1. Device Detection
  const { isMobile } = useDeviceDetection();
  
  // Refs needed across hooks
  const lastTimeRef = useRef<number>(0);
  const isChangingQualityRef = useRef<boolean>(false);
  const [showStats, setShowStats] = useState(false);
  const [doubleTapSide, setDoubleTapSide] = useState<'left' | 'right' | null>(null);

  // Shared state for playback - removed internal state, use videoState directly
  // const [internalIsPlaying, setInternalIsPlaying] = useState(true);
  
  // We need to pass initial playing state to controls, assuming true for autoplay
  const controls = usePlayerControls({ isPlaying: true }); // Simplified for now
  
  // Ref to hold the save function to avoid circular dependency
  const persistenceSave = useRef<() => void>(undefined);
  
  const videoState = useVideoState({
    onNextEpisode,
    saveCurrentProgress: () => persistenceSave.current?.(),
    showControlsTemporarily: controls.showControlsTemporarily,
    setShowControls: controls.setShowControls,
    controlsTimeoutRef: controls.controlsTimeoutRef
  });

  // Removed problematic useEffect sync
  // useEffect(() => {
  //   setInternalIsPlaying(videoState.isPlaying);
  // }, [videoState.isPlaying]);

  const { saveCurrentProgress } = usePlayerPersistence({
    dramaId,
    currentEpisode,
    videoRef: videoState.videoRef,
    isChangingQualityRef,
    lastTimeRef,
    isPlaying: videoState.isPlaying, // Use videoState directly
    selectedQuality
  });
  
  // Update the ref so videoState can call it
  useEffect(() => {
    persistenceSave.current = saveCurrentProgress;
  }, [saveCurrentProgress]);

  // Prepare for Quality Change
  const prepareQualityChange = useCallback(() => {
    if (videoState.videoRef.current) {
      lastTimeRef.current = videoState.videoRef.current.currentTime;
      isChangingQualityRef.current = true;
    }
    controls.setShowControls(false);
    videoState.setIsPlaying(true);
  }, [controls, videoState]);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoState.videoRef.current;
    if (!video || !videoState.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoState.handleSeek(pos * videoState.duration);
  }, [videoState]);

  const showSkipAnimation = useCallback((side: 'left' | 'right') => {
    setDoubleTapSide(side);
    setTimeout(() => setDoubleTapSide(null), DOUBLE_TAP_DELAY);
  }, []);

  const handleDoubleTap = useCallback((side: 'left' | 'right') => {
    const video = videoState.videoRef.current;
    if (!video) return;

    let newTime;
    if (side === 'left') {
      newTime = Math.max(0, video.currentTime - SEEK_TIME_SECONDS);
    } else {
      newTime = Math.min(video.duration, video.currentTime + SEEK_TIME_SECONDS);
    }
    
    videoState.handleSeek(newTime);
    showSkipAnimation(side);
    
    // Auto-resume playback on double tap
    if (video.paused) {
      video.play().catch(() => {});
    }
  }, [showSkipAnimation, videoState]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const video = videoState.videoRef.current;
      if (!video) return;

      switch(e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          videoState.togglePlay();
          controls.showControlsTemporarily();
          break;
        case 'arrowleft':
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - SEEK_TIME_SECONDS);
          showSkipAnimation('left');
          controls.showControlsTemporarily();
          break;
        case 'arrowright':
          e.preventDefault();
          video.currentTime = Math.min(video.duration, video.currentTime + SEEK_TIME_SECONDS);
          showSkipAnimation('right');
          controls.showControlsTemporarily();
          break;
        case 'f':
          e.preventDefault();
          videoState.toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          videoState.toggleMute();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    videoState, 
    controls,
    showSkipAnimation
  ]);

  return {
    ...videoState,
    ...controls,
    isMobile,
    showStats,
    setShowStats,
    doubleTapSide,
    prepareQualityChange,
    handleProgressClick,
    handleDoubleTap,
    handleSeek: videoState.handleSeek
  };
}
