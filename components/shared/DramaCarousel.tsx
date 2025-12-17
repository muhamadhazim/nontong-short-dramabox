'use client';

import { useState, useEffect, useCallback, TouchEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, Play } from 'lucide-react';
import { encodeData } from '@/lib/utils';

interface Drama {
  id: string;
  title: string;
  cover: string;
  tags?: string[];
  rating?: number;
  description?: string;
}

interface DramaCarouselProps {
  dramas: Drama[];
  autoPlay?: boolean;
  interval?: number;
}

export default function DramaCarousel({ 
  dramas, 
  autoPlay = true, 
  interval = 5000 
}: DramaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % dramas.length);
  }, [dramas.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + dramas.length) % dramas.length);
  }, [dramas.length]);

  useEffect(() => {
    if (!autoPlay || dramas.length <= 1 || !isClient) return;

    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, dramas.length, isClient, nextSlide]);

  // Touch handlers for swipe
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const currentDrama = dramas[currentIndex];

  // Hydration fix: Always render the structure, but defer client-specific updates
  // We remove the conditional return null/shimmer that causes tree mismatch
  // Instead, we use consistent initial render

  return (
    <div 
      className="relative w-full aspect-[16/9] sm:aspect-[2/1] max-h-[70vh] min-h-[200px] overflow-hidden group touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image slides */}
      {dramas.map((drama, index) => (
        <div
          key={drama.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentIndex 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          <Image
            src={drama.cover}
            alt={drama.title}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="(max-width: 640px) 100vw, 100vw"
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

      {/* Navigation arrows - Hidden on mobile, visible on hover desktop */}
      {dramas.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 backdrop-blur-sm p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 backdrop-blur-sm p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Content - Redesigned Layout */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 md:p-12 z-20">
        <div className="max-w-4xl">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] leading-tight mb-2 sm:mb-3 animate-fade-in line-clamp-2">
            {currentDrama.title}
          </h1>
          
          {/* Tags */}
          {currentDrama.tags && currentDrama.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-3 sm:mb-4 animate-fade-in-delay">
              {currentDrama.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] sm:text-xs bg-white/20 backdrop-blur-md px-2 sm:px-3 py-1 rounded-full font-medium hover:bg-white/30 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Info Row - Rating & Description in one line on desktop */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-4 sm:mb-6">
            {/* Rating */}
            {currentDrama.rating && (
              <div className="flex items-center gap-2 animate-fade-in-delay-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-base sm:text-lg font-bold text-yellow-400">{currentDrama.rating}</span>
              </div>
            )}

            {/* Description - only show on larger screens, more compact */}
            {currentDrama.description && (
              <p className="hidden md:block text-sm lg:text-base text-white/90 line-clamp-2 max-w-2xl drop-shadow-lg animate-fade-in-delay-2 flex-1">
                {currentDrama.description}
              </p>
            )}
          </div>
          
          {/* Play Button */}
          <div className="flex gap-2 sm:gap-3 items-center animate-fade-in-delay-3">
            <Link 
              href={`/watch/${currentDrama.id}?q=${encodeData(currentDrama.title)}`}
              className="bg-nongton-red hover:bg-nongton-red/90 active:scale-95 transition-all text-white px-6 sm:px-10 py-2.5 sm:py-3.5 rounded-lg flex items-center justify-center gap-2 sm:gap-3 font-bold shadow-xl hover:shadow-nongton-red/50 text-sm sm:text-base"
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
              <span>Play Now</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Indicator dots */}
      {dramas.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
          {dramas.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-nongton-red w-6 sm:w-8' 
                  : 'bg-white/50 hover:bg-white/80 w-1.5 sm:w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
