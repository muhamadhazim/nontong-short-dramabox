import { useState, useRef, useEffect, useCallback } from 'react';
import type { Episode, VideoQuality } from '@/types/drama';

interface UseVideoPlayerProps {
  dramaId: string;
  currentEpisode: Episode | null;
  selectedQuality: VideoQuality | null;
  onNextEpisode: () => void;
}

export function useVideoPlayer({ dramaId, currentEpisode, selectedQuality, onNextEpisode }: UseVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [doubleTapSide, setDoubleTapSide] = useState<'left' | 'right' | null>(null);
  
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTimeRef = useRef<number>(0);
  const isChangingQualityRef = useRef<boolean>(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Save progress helper
  const saveCurrentProgress = useCallback(() => {
    const video = videoRef.current;
    if (!currentEpisode || !video) return;
    
    const time = video.currentTime;
    const dur = video.duration;
    
    if (time > 5 && dur > 0 && time < dur - 10) {
      localStorage.setItem(`progress_${dramaId}_${currentEpisode.chapterId}`, time.toString());
    }
  }, [currentEpisode, dramaId]);

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
        if (progress > 5 && progress < video.duration - 10) {
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
  }, [currentEpisode, dramaId, selectedQuality]); // Removed isPlaying to fix pause bug

  // Auto save
  useEffect(() => {
    const interval = setInterval(saveCurrentProgress, 5000);
    return () => {
      clearInterval(interval);
      saveCurrentProgress();
    };
  }, [saveCurrentProgress]);

  // Player controls
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  const handleMouseEnter = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 500);
    }
  }, [isPlaying]);

  // Events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
      setShowNextButton(video.currentTime > video.duration - 5 && video.currentTime < video.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      saveCurrentProgress();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', onNextEpisode);
    video.addEventListener('loadedmetadata', () => setDuration(video.duration));

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', onNextEpisode);
      video.removeEventListener('loadedmetadata', () => setDuration(video.duration));
    };
  }, [selectedQuality, onNextEpisode, saveCurrentProgress]);

  // Prepare for Quality Change
  const prepareQualityChange = useCallback(() => {
    if (videoRef.current) {
      lastTimeRef.current = videoRef.current.currentTime;
      isChangingQualityRef.current = true;
    }
    setShowControls(false);
    setIsPlaying(true);
  }, []);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * duration;
  }, [duration]);

  const showSkipAnimation = useCallback((side: 'left' | 'right') => {
    setDoubleTapSide(side);
    setTimeout(() => setDoubleTapSide(null), 500);
  }, []);

  const handleDoubleTap = useCallback((side: 'left' | 'right') => {
    const video = videoRef.current;
    if (!video) return;

    if (side === 'left') {
      video.currentTime = Math.max(0, video.currentTime - 5);
    } else {
      video.currentTime = Math.min(video.duration, video.currentTime + 5);
    }
    showSkipAnimation(side);
    
    // Auto-resume playback on double tap
    if (video.paused) {
      video.play().catch(() => {});
    }
  }, [showSkipAnimation]);

  const handleSeek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const video = videoRef.current;
      if (!video) return;

      switch(e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          showControlsTemporarily();
          break;
        case 'arrowleft':
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 5);
          showSkipAnimation('left');
          showControlsTemporarily();
          break;
        case 'arrowright':
          e.preventDefault();
          video.currentTime = Math.min(video.duration, video.currentTime + 5);
          showSkipAnimation('right');
          showControlsTemporarily();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [togglePlay, toggleFullscreen, toggleMute, showControlsTemporarily, showSkipAnimation]);

  return {
    videoRef,
    containerRef,
    isPlaying,
    currentTime,
    duration,
    isMuted,
    showControls,
    showNextButton,
    isMobile,
    showStats,
    setShowStats,
    doubleTapSide,
    togglePlay,
    toggleMute,
    toggleFullscreen,
    showControlsTemporarily,
    handleMouseEnter,
    handleMouseLeave,
    prepareQualityChange,
    handleProgressClick,
    handleDoubleTap,
    handleSeek
  };
}
