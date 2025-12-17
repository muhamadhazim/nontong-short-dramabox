import Image from "next/image";
import { Play, Plus } from "lucide-react";

interface HeroBannerProps {
  title: string;
  cover: string;
  tags?: string[];
}

export default function HeroBanner({ title, cover, tags }: HeroBannerProps) {
  return (
    <div className="relative w-full aspect-[3/4] md:aspect-[2/3]">
      <Image
        src={cover}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 430px"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-nongton-black" />

      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
        <h1 className="text-3xl font-bold drop-shadow-lg">{title}</h1>
        {tags && tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-nongton-card/80 backdrop-blur-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-3">
          <button className="flex-1 bg-nongton-red hover:bg-nongton-red/90 transition-colors text-white py-3 rounded-md flex items-center justify-center gap-2 font-semibold">
            <Play className="w-5 h-5 fill-white" />
            Play
          </button>
          <button className="bg-nongton-card hover:bg-nongton-card/80 transition-colors text-white px-6 py-3 rounded-md flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
