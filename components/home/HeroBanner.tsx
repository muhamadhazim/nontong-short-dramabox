import Image from "next/image";
import { Play, Plus, Info } from "lucide-react";

interface HeroBannerProps {
  title: string;
  cover: string;
  tags?: string[];
  description?: string;
}

export default function HeroBanner({ title, cover, tags, description }: HeroBannerProps) {
  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] max-h-[70vh]">
      <Image
        src={cover}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      
      {/* Strong gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content overlay - Netflix style (left aligned) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 md:p-12 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] leading-tight mb-3 sm:mb-4">
          {title}
        </h1>
        
        {tags && tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-3 sm:mb-4">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs sm:text-sm bg-white/20 backdrop-blur-md px-3 py-1 rounded font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {description && (
          <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-5 line-clamp-3 max-w-md drop-shadow-lg">
            {description}
          </p>
        )}
        
        <div className="flex gap-3 items-center">
          <button className="bg-white hover:bg-white/90 active:scale-95 transition-all text-black px-6 sm:px-8 py-2 sm:py-3 rounded-md flex items-center justify-center gap-2 font-bold shadow-lg">
            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-black" />
            <span className="text-sm sm:text-base">Play</span>
          </button>
          <button className="bg-gray-500/70 backdrop-blur-md hover:bg-gray-500/90 active:scale-95 transition-all text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md flex items-center justify-center gap-2 font-bold shadow-lg">
            <Info className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-sm sm:text-base hidden sm:inline">More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
