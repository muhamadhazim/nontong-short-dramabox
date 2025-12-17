'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import MobileWrapper from '@/components/layout/MobileWrapper';
import Container from '@/components/ui/Container';
import { ArrowLeft, List, AlertCircle, Info } from 'lucide-react';
import Link from 'next/link';
import type { Episode, DramaDetail, VideoQuality } from '@/types/drama';

import { useWatchData } from '@/hooks/useWatchData';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import MobileControls from '@/components/watch/controls/MobileControls';
import EpisodeList from '@/components/watch/EpisodeList';

interface WatchClientProps {
  dramaId: string;
  initialEpisodes: Episode[];
  initialDramaDetail: DramaDetail;
}

export default function WatchClient({ dramaId, initialEpisodes, initialDramaDetail }: WatchClientProps) {
  const router = useRouter();
  
  const {
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
  } = useWatchData({ dramaId, initialEpisodes, initialDramaDetail });

  const [showEpisodes, setShowEpisodes] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);

  const handleEpisodeSelect = useCallback((episode: Episode) => {
    setCurrentEpisode(episode);
    updateVideoQualities(episode);
    setShowEpisodes(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setCurrentEpisode, updateVideoQualities]);

  const playNextEpisode = useCallback(() => {
    if (!currentEpisode) return;
    const currentIndex = episodes.findIndex(ep => ep.chapterId === currentEpisode.chapterId);
    if (currentIndex < episodes.length - 1) {
      handleEpisodeSelect(episodes[currentIndex + 1]);
    }
  }, [currentEpisode, episodes, handleEpisodeSelect]);

  const player = useVideoPlayer({
    dramaId,
    currentEpisode,
    selectedQuality,
    onNextEpisode: playNextEpisode
  });

  const handleQualityChange = (quality: VideoQuality) => {
    player.prepareQualityChange();
    setSelectedQuality(quality);
    setShowQualityMenu(false);
    // Save user preference
    localStorage.setItem('preferred_quality', quality.quality.toString());
  };

  const nextEpisode = episodes[episodes.findIndex(ep => ep.chapterId === currentEpisode?.chapterId) + 1];
  const videoUrl = selectedQuality?.videoPath || null;

  if (isLoading) {
    return (
      <MobileWrapper>
        <div className="flex flex-col items-center justify-center min-h-screen bg-nongton-black text-center">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-nongton-red rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-white font-semibold animate-pulse">Loading Episode...</p>
          <p className="text-xs text-nongton-gray mt-2">Preparing your drama</p>
        </div>
      </MobileWrapper>
    );
  }

  if (error || (!isLoading && episodes.length === 0)) {
    return (
      <MobileWrapper>
        <Container>
          <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <p className="text-xl text-red-500 mb-4">{error || 'No episodes available'}</p>
            <Link 
              href="/"
              className="bg-nongton-red text-white px-6 py-3 rounded-lg hover:bg-nongton-red/90 transition-colors"
            >
              Go Back Home
            </Link>
          </div>
        </Container>
      </MobileWrapper>
    );
  }

  return (
    <div className="min-h-screen bg-nongton-black">
      {/* Header Desktop */}
      <header className="fixed top-0 left-0 right-0 bg-nongton-black/95 backdrop-blur-sm border-b border-white/10 z-50 lg:block hidden">
        <Container size="full">
          <div className="flex items-center gap-3 py-3 px-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="font-bold text-sm sm:text-base line-clamp-1">
                {dramaDetail?.bookName || 'Drama'}
              </h1>
              <p className="text-xs text-nongton-gray">
                {currentEpisode?.chapterName}
              </p>
            </div>
            
            <button
              onClick={() => setShowEpisodes(!showEpisodes)}
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <List className="w-4 h-4" />
              <span className="text-sm">Episodes</span>
            </button>
          </div>
        </Container>
      </header>

      <div className="lg:pt-14 lg:flex lg:h-screen">
        <div className="flex-1 lg:overflow-y-auto">
          <section 
            ref={player.containerRef} 
            className="relative bg-black w-full h-screen lg:h-[calc(100vh-56px)] lg:aspect-video group"
          >
            {videoUrl ? (
              <>
                <video
                  ref={player.videoRef}
                  key={selectedQuality?.videoPath}
                  autoPlay
                  className="w-full h-full object-contain"
                  poster={currentEpisode?.chapterImg}
                  playsInline
                  controls={false}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <MobileControls
                  showControls={player.showControls}
                  isPlaying={player.isPlaying}
                  title={dramaDetail?.bookName || 'Drama'}
                  subtitle={currentEpisode?.chapterName}
                  currentTime={player.currentTime}
                  duration={player.duration}
                  isMuted={player.isMuted}
                  availableQualities={availableQualities}
                  selectedQuality={selectedQuality}
                  showQualityMenu={showQualityMenu}
                  onShowControls={player.showControlsTemporarily}
                  onMouseEnter={player.handleMouseEnter}
                  onMouseLeave={player.handleMouseLeave}
                  onEpisodesClick={() => setShowEpisodes(true)}
                  onBack={() => router.back()}
                  onPlayPause={player.togglePlay}
                  onMuteToggle={player.toggleMute}
                  onFullscreenToggle={player.toggleFullscreen}
                  onSeek={player.handleSeek}
                  onQualityMenuToggle={() => setShowQualityMenu(!showQualityMenu)}
                  onQualityChange={handleQualityChange}
                  onDoubleTap={player.handleDoubleTap}
                />

                {/* Double Tap Animation */}
                {player.doubleTapSide && (
                  <div className={`absolute top-1/2 -translate-y-1/2 ${player.doubleTapSide === 'left' ? 'left-8' : 'right-8'} pointer-events-none z-30`}>
                    <div className="animate-ping">
                      <div className="bg-white/30 rounded-full p-6">
                        <div className="text-4xl">{player.doubleTapSide === 'left' ? '⏪' : '⏩'}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Next Episode Countdown */}
                {player.showNextButton && nextEpisode && (
                  <div className="absolute top-20 right-4 pointer-events-none animate-fade-in z-30">
                    <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                      <p className="text-white/90 text-sm font-medium">
                        Next: {nextEpisode.chapterName}
                      </p>
                      <p className="text-nongton-red text-xs font-bold text-right">
                        Playing in {Math.ceil(player.duration - player.currentTime)}s
                      </p>
                    </div>
                  </div>
                )}

                {/* Video Stats Overlay */}
                {player.showStats && (
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md rounded-lg p-4 text-xs font-mono border border-white/20 animate-fade-in z-30">
                    <div className="space-y-1">
                      <div className="flex justify-between gap-8">
                        <span className="text-nongton-gray">Quality:</span>
                        <span className="text-white font-semibold">{selectedQuality?.quality}p</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span className="text-nongton-gray">Time:</span>
                        <span className="text-white">
                          {Math.floor(player.currentTime || 0)}s / {Math.floor(player.duration || 0)}s
                        </span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span className="text-nongton-gray">Progress:</span>
                        <span className="text-white">
                          {(player.duration ?? 0) > 0 ? Math.floor(((player.currentTime || 0) / (player.duration || 1)) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 mx-auto mb-3 text-nongton-red" />
                  <p className="text-white font-semibold">Video not available</p>
                  <p className="text-sm text-nongton-gray mt-1">Please try another episode</p>
                </div>
              </div>
            )}

            {/* Desktop Controls (Info Button Only - rest handled by Unified Controls) */}
            <div className="hidden lg:block">
                <button
                onClick={() => player.setShowStats(!player.showStats)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full transition-colors border border-white/20 opacity-0 group-hover:opacity-100 z-30"
                title="Toggle stats (Press I)"
                >
                <Info className="w-4 h-4" />
                </button>
            </div>

          </section>
        </div>

        <EpisodeList 
          episodes={episodes}
          currentEpisode={currentEpisode}
          showEpisodes={showEpisodes}
          onClose={() => setShowEpisodes(false)}
          onSelect={handleEpisodeSelect}
        />
      </div>
    </div>
  );
}
