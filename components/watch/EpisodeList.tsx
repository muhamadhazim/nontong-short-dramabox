import type { Episode } from '@/types/drama';
import { Play, X, List } from 'lucide-react';

interface EpisodeListProps {
  episodes: Episode[];
  currentEpisode: Episode | null;
  showEpisodes: boolean;
  onClose: () => void;
  onSelect: (episode: Episode) => void;
}

export default function EpisodeList({ episodes, currentEpisode, showEpisodes, onClose, onSelect }: EpisodeListProps) {
  return (
    <>
      {/* Mobile: Episode List Modal */}
      {showEpisodes && (
        <div className="lg:hidden fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen">
            <div className="flex items-center justify-between sticky top-0 bg-black/95 backdrop-blur-sm py-4 px-4 border-b border-white/10 z-10">
              <h2 className="text-lg font-bold">Episodes ({episodes.length})</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2 p-4">
              {episodes.map((episode) => {
                const isActive = currentEpisode?.chapterId === episode.chapterId;
                
                return (
                  <button
                    key={episode.chapterId}
                    onClick={() => onSelect(episode)}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 active:scale-95 group ${
                      isActive
                        ? 'border-nongton-red shadow-[0_0_15px_rgba(229,9,20,0.4)]'
                        : 'border-white/10 hover:border-nongton-red/50 bg-zinc-900'
                    }`}
                  >
                    {episode.chapterImg && (
                      <img
                        src={episode.chapterImg}
                        alt={episode.chapterName}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                          isActive ? 'scale-110' : 'group-hover:scale-110'
                        }`}
                      />
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity ${isActive ? 'opacity-80' : 'opacity-60 group-hover:opacity-40'}`} />
                    
                    {/* Playing Indicator / Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                      {isActive && (
                        <div className="mb-1 animate-bounce">
                          <div className="bg-nongton-red rounded-full p-1.5 shadow-lg shadow-nongton-red/50">
                            <Play className="w-3 h-3 fill-white" />
                          </div>
                        </div>
                      )}
                      <p className={`text-xs font-bold text-center line-clamp-1 ${isActive ? 'text-nongton-red' : 'text-white/90'}`}>
                        {episode.chapterName}
                      </p>
                    </div>
                    
                    {/* Active Glow Border Effect */}
                    {isActive && (
                      <div className="absolute inset-0 border-2 border-nongton-red rounded-lg animate-pulse opacity-50" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Desktop: Episode Sidebar with Slide Animation */}
      <aside 
        className={`hidden lg:block bg-zinc-900 border-l border-white/10 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${
          showEpisodes ? 'w-80 xl:w-96 opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-10 border-l-0'
        }`}
      >
        <div className="w-80 xl:w-96 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto custom-scrollbar">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-900/95 backdrop-blur z-10 sticky top-0">
            <h2 className="font-bold flex items-center gap-2">
              <List className="w-5 h-5 text-nongton-red" />
              Episodes ({episodes.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        
          <div className="p-3 space-y-2">
            {episodes.map((episode) => {
              const isActive = currentEpisode?.chapterId === episode.chapterId;
              
              return (
                <button
                  key={episode.chapterId}
                  onClick={() => onSelect(episode)}
                  className={`w-full flex gap-3 p-2 rounded-lg transition-all duration-200 active:scale-95 group ${
                    isActive
                      ? 'bg-nongton-red/10 border-l-4 border-nongton-red'
                      : 'hover:bg-zinc-800 border-l-4 border-transparent'
                  }`}
                >
                  <div className="relative w-24 aspect-video rounded-md overflow-hidden flex-shrink-0 shadow-md">
                    {episode.chapterImg ? (
                      <img
                        src={episode.chapterImg}
                        alt={episode.chapterName}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-zinc-700 flex items-center justify-center">
                        <Play className="w-6 h-6 text-zinc-500" />
                      </div>
                    )}
                    
                    {/* Desktop Active Overlay */}
                    {isActive && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                        <div className="bg-nongton-red/90 p-1.5 rounded-full animate-pulse shadow-lg">
                          <Play className="w-4 h-4 fill-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 text-left flex flex-col justify-center">
                    <p className={`text-sm font-semibold line-clamp-2 transition-colors ${
                      isActive ? 'text-nongton-red' : 'text-zinc-300 group-hover:text-white'
                    }`}>
                      {episode.chapterName}
                    </p>
                    {isActive && <span className="text-[10px] text-nongton-red/80 font-medium mt-1">Playing Now</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
