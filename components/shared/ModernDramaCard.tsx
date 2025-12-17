'use client';

import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Play } from "lucide-react";
import { useState } from "react";
import { encodeData } from "@/lib/utils";

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

const FALLBACK_IMAGE = "https://picsum.photos/seed/placeholder/400/600";

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
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Validate cover prop
  const validCover = cover && cover.trim() !== "" ? cover : FALLBACK_IMAGE;
  const imageSrc = imageError ? FALLBACK_IMAGE : validCover;
  
  const sizeClasses = {
    small: "w-[120px] sm:w-[140px] h-[180px] sm:h-[210px]",
    medium: "w-[160px] sm:w-[180px] h-[240px] sm:h-[270px] md:w-[200px] md:h-[300px]",
    large: "w-full h-[280px] sm:h-[320px]",
  };

  return (
    <Link
      href={`/watch/${id}?q=${encodeData(title)}`}
      className="block relative flex-shrink-0 group touch-manipulation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative ${sizeClasses[size]} rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-nongton-red/20 transition-all duration-300 sm:hover:-translate-y-2 active:scale-95`}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes={size === "large" ? "100vw" : size === "medium" ? "(max-width: 640px) 160px, 180px" : "(max-width: 640px) 120px, 140px"}
          onError={() => setImageError(true)}
        />
        
        {/* Strong gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* NEW Badge */}
        {isNew && (
          <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 bg-nongton-red text-white text-[9px] sm:text-[10px] font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-lg z-10 animate-pulse">
            NEW
          </div>
        )}

        {/* Play button overlay - appears on hover (desktop only) */}
        <div className={`hidden sm:flex absolute inset-0 items-center justify-center z-20 transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="bg-nongton-red/90 backdrop-blur-sm rounded-full p-3 sm:p-4 transform transition-transform duration-300 hover:scale-110 active:scale-95">
            <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white text-white" />
          </div>
        </div>

        {/* Content - Always inside the card */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 md:p-4 z-10">
          <h3 className="text-white font-bold text-xs sm:text-sm md:text-base line-clamp-2 mb-1.5 sm:mb-2 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-nongton-red transition-colors duration-300">
            {title}
          </h3>
          
          {/* Metadata */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] md:text-xs text-white/90">
            {rating && (
              <div className="flex items-center gap-0.5 sm:gap-1 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                <span className="text-yellow-400 font-bold drop-shadow-sm">{rating}</span>
              </div>
            )}
            {episodes && (
              <span className="font-medium drop-shadow-sm group-hover:text-white transition-colors">{episodes} EP</span>
            )}
            {duration && (
              <div className="flex items-center gap-0.5 sm:gap-1">
                <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 drop-shadow-sm" />
                <span className="font-medium drop-shadow-sm group-hover:text-white transition-colors">{duration}</span>
              </div>
            )}
          </div>
        </div>

        {/* Hover overlay effect with animated border */}
        <div className="absolute inset-0 bg-nongton-red/0 group-hover:bg-nongton-red/10 transition-colors duration-300" />
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-nongton-red/50 rounded-lg sm:rounded-xl transition-colors duration-300" />
      </div>
    </Link>
  );
}
