import { useState, useRef, useCallback, useEffect } from 'react';
import { PLAYER_CONTROLS_TIMEOUT } from '@/lib/constants';

interface UsePlayerControlsProps {
  isPlaying: boolean;
}

export function usePlayerControls({ isPlaying }: UsePlayerControlsProps) {
  const [showControls, setShowControls] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, PLAYER_CONTROLS_TIMEOUT);
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

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  return {
    showControls,
    setShowControls,
    controlsTimeoutRef,
    showControlsTemporarily,
    handleMouseEnter,
    handleMouseLeave
  };
}
