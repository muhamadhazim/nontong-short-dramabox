import Image from "next/image";
import Link from "next/link";
import { Star, Clock } from "lucide-react";

interface ModernDramaCardProps {
  id: string;
  title: string;
  cover: string;
  rating?: number;
  episodes?: number;
  duration?: string;
  isNew?: boolean;
  size?: "small" | "medium" | "large";
}

export default function ModernDramaCard({
  id,
  title,
  cover,
  rating,
  episodes,
  duration,
  isNew = false,
  size = "medium",
}: ModernDramaCardProps) {
  const sizeClasses = {
    small: "w-[140px] h-[210px]",
    medium: "w-[180px] h-[270px] sm:w-[200px] sm:h-[300px]",
    large: "w-full h-[320px]",
  };

  return (
    <Link
      href={`/watch/${id}`}
      className="block relative flex-shrink-0 group"
    >
      <div className={`relative ${sizeClasses[size]} rounded-xl overflow-hidden shadow-lg`}>
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          sizes={size === "large" ? "100vw" : size === "medium" ? "180px" : "130px"}
        />
        
        {/* Strong gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
        
        {/* NEW Badge */}
        {isNew && (
          <div className="absolute top-2 right-2 bg-nongton-red text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-lg z-10">
            NEW
          </div>
        )}

        {/* Content - Always inside the card */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <h3 className="text-white font-bold text-sm sm:text-base line-clamp-2 mb-2 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {title}
          </h3>
          
          {/* Metadata */}
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-white/90">
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                <span className="text-yellow-400 font-bold drop-shadow-sm">{rating}</span>
              </div>
            )}
            {episodes && (
              <span className="font-medium drop-shadow-sm">{episodes} EP</span>
            )}
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 drop-shadow-sm" />
                <span className="font-medium drop-shadow-sm">{duration}</span>
              </div>
            )}
          </div>
        </div>

        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-nongton-red/0 group-hover:bg-nongton-red/10 transition-colors duration-300" />
      </div>
    </Link>
  );
}
