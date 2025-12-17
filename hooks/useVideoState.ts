import { useState, useRef, useCallback, useEffect } from 'react';
import { SEEK_TIME_SECONDS, PROGRESS_END_THRESHOLD } from '@/lib/constants';

interface UseVideoStateProps {
  onNextEpisode: () => void;
  saveCurrentProgress: () => void;
  showControlsTemporarily: () => void;
  setShowControls: (show: boolean) => void;
  controlsTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
}

export function useVideoState({ 
  onNextEpisode, 
  saveCurrentProgress, 
  showControlsTemporarily,
  setShowControls,
  controlsTimeoutRef
}: UseVideoStateProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  
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

  const handleSeek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  }, []);

  // Events setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
      setShowNextButton(
        video.currentTime > video.duration - PROGRESS_END_THRESHOLD && 
        video.currentTime < video.duration
      );
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
  }, [onNextEpisode, saveCurrentProgress, setShowControls, controlsTimeoutRef]);

  return {
    videoRef,
    containerRef,
    isPlaying,
    setIsPlaying,
    currentTime,
    duration,
    isMuted,
    showNextButton,
    togglePlay,
    toggleMute,
    toggleFullscreen,
    handleSeek
  };
}
