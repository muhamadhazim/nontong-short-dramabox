import Image from "next/image";
import { Play, Plus } from "lucide-react";

interface HeroBannerProps {
  title: string;
  cover: string;
  tags?: string[];
}

export default function HeroBanner({ title, cover, tags }: HeroBannerProps) {
  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] max-h-[60vh]">
      <Image
        src={cover}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 640px) 100vw, 640px"
      />
      
      {/* Strong gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-nongton-black via-black/50 to-transparent" />

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <h1 className="text-2xl sm:text-3xl font-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-tight mb-2 sm:mb-3">
          {title}
        </h1>
        
        {tags && tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-3 sm:mb-4">
            {tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex gap-2.5 sm:gap-3">
          <button className="flex-1 bg-nongton-red hover:bg-nongton-red/90 active:scale-95 transition-all text-white py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 font-bold shadow-lg">
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
            <span className="text-sm sm:text-base">Play</span>
          </button>
          <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 active:scale-95 transition-all text-white p-2.5 sm:p-3 rounded-lg flex items-center justify-center shadow-lg">
            <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
