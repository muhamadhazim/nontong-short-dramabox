import { useRef, useState } from 'react';
import { ArrowLeft, Play, Volume2, VolumeX, Maximize, List, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { VideoQuality } from '@/types/drama';

interface MobileControlsProps {
  showControls: boolean;
  isPlaying: boolean;
  title?: string;
  subtitle?: string;
  currentTime: number;
  duration: number;
  isMuted: boolean;
  availableQualities: VideoQuality[];
  selectedQuality: VideoQuality | null;
  showQualityMenu: boolean;
  onShowControls: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onEpisodesClick: () => void;
  onBack: () => void;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onFullscreenToggle: () => void;
  onSeek: (time: number) => void;
  onQualityMenuToggle: () => void;
  onQualityChange: (q: VideoQuality) => void;
  onDoubleTap: (side: 'left' | 'right') => void;
}

export default function MobileControls({
  showControls,
  isPlaying,
  title,
  subtitle,
  currentTime,
  duration,
  isMuted,
  availableQualities,
  selectedQuality,
  showQualityMenu,
  onShowControls,
  onMouseEnter,
  onMouseLeave,
  onEpisodesClick,
  onBack,
  onPlayPause,
  onMuteToggle,
  onFullscreenToggle,
  onSeek,
  onQualityMenuToggle,
  onQualityChange,
  onDoubleTap
}: MobileControlsProps) {
  const router = useRouter();
  const lastTapRef = useRef<number>(0);
  const singleTapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const formatTime = (seconds: number): string => {
    if (!seconds || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeekInteraction = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.min(Math.max(0, x / rect.width), 1);
    const time = percentage * duration;
    onSeek(time);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleSeekInteraction(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleSeekInteraction(e);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleSmartTouch = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.detail === 2) return; // Ignore native dblclick

    const now = Date.now();
    const timeDiff = now - lastTapRef.current;
    
    if (timeDiff < 300) {
      // DOUBLE TAP DETECTED
      // 1. Cancel pending single tap action
      if (singleTapTimeoutRef.current) {
        clearTimeout(singleTapTimeoutRef.current);
        singleTapTimeoutRef.current = null;
      }

      // 2. Logic Seek
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      
      if (x < width / 2) {
        onDoubleTap('left');
      } else {
        onDoubleTap('right');
      }
      
      lastTapRef.current = 0;
    } else {
      // SINGLE TAP (Wait 300ms)
      lastTapRef.current = now;
      
      if (singleTapTimeoutRef.current) clearTimeout(singleTapTimeoutRef.current);

      singleTapTimeoutRef.current = setTimeout(() => {
        onShowControls();
        onPlayPause();
        singleTapTimeoutRef.current = null;
      }, 300);
    }
  };

  return (
    <div 
      className="absolute inset-0 z-20"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Touch / Click Layer - Always Catch Inputs */}
      <div 
        className="absolute inset-0 z-10"
        onClick={handleSmartTouch}
      />

      {/* Episode Toggle - Independent (Mobile Only) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEpisodesClick();
        }}
        className={`lg:hidden absolute top-4 right-4 z-50 bg-nongton-red text-white backdrop-blur-md rounded-full flex items-center gap-2 px-4 py-2 shadow-lg active:scale-95 transition-all duration-300 border border-white/10 ${showControls || !isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
      >
        <List className="w-4 h-4" />
        <span className="text-xs font-bold">Episodes</span>
      </button>

      {/* Controls Overlay */}
      <div 
        className={`absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Top Bar (Mobile Only) */}
        <div className="lg:hidden absolute top-0 left-0 right-0 p-4 flex items-center gap-3 pointer-events-auto pr-32 z-30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBack();
            }}
            className="p-2 bg-black/50 backdrop-blur-sm rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <p className="font-bold text-sm line-clamp-1 text-white drop-shadow-md">{title}</p>
            {subtitle && <p className="text-xs text-white/80 line-clamp-1 drop-shadow-md">{subtitle}</p>}
          </div>
        </div>
        
        {/* Center Play/Pause */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          {!isPlaying && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlayPause();
              }}
              className="p-6 bg-white/20 backdrop-blur-md rounded-full hover:scale-110 transition-transform pointer-events-auto"
            >
              <Play className="w-12 h-12 fill-white" />
            </button>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto z-30">
          {/* Progress Bar */}
          <div 
            className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer group/progress py-2 touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <div 
              className="h-1 bg-nongton-red rounded-full relative group-hover/progress:h-2 transition-all"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform" />
            </div>
          </div>

          {/* Time & Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayPause();
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <Play className="w-6 h-6 fill-white" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMuteToggle();
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <span className="text-sm font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <div className="flex items-center gap-2 relative">
              {availableQualities.length > 0 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQualityMenuToggle();
                    }}
                    className="text-xs font-bold px-2 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors"
                  >
                    {selectedQuality?.quality}p
                  </button>
                  
                  {showQualityMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-black/95 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden min-w-[80px] z-50">
                      {availableQualities.map((quality) => (
                        <button
                          key={quality.quality}
                          onClick={(e) => {
                            e.stopPropagation();
                            onQualityChange(quality);
                          }}
                          className={`w-full px-3 py-2 text-left text-xs hover:bg-white/10 transition-colors ${
                            selectedQuality?.quality === quality.quality
                              ? 'bg-nongton-red/20 text-nongton-red font-bold'
                              : 'text-white'
                          }`}
                        >
                          {quality.quality}p
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFullscreenToggle();
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
