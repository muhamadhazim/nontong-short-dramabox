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
    small: "w-[110px] h-[165px]",
    medium: "w-[140px] h-[210px]",
    large: "w-full h-[280px]",
  };

  return (
    <Link
      href={`/watch/${id}`}
      className="block relative flex-shrink-0 group"
    >
      <div className={`relative ${sizeClasses[size]} rounded-lg overflow-hidden`}>
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes={size === "large" ? "100vw" : "140px"}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        {/* NEW Badge */}
        {isNew && (
          <div className="absolute top-2 right-2 bg-nongton-red text-white text-[9px] font-bold px-2 py-0.5 rounded-sm">
            NEW
          </div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <h3 className="text-white font-semibold text-xs line-clamp-2 mb-1 leading-tight">
            {title}
          </h3>
          
          {/* Metadata */}
          <div className="flex items-center gap-2 text-[10px] text-white/70">
            {rating && (
              <div className="flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-yellow-400 font-medium">{rating}</span>
              </div>
            )}
            {episodes && (
              <span>{episodes} EP</span>
            )}
            {duration && (
              <div className="flex items-center gap-0.5">
                <Clock className="w-3 h-3" />
                <span>{duration}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
