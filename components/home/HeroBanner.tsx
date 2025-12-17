import Image from "next/image";
import { Play, Plus } from "lucide-react";

interface HeroBannerProps {
  title: string;
  cover: string;
  tags?: string[];
}

export default function HeroBanner({ title, cover, tags }: HeroBannerProps) {
  return (
    <div className="relative w-full aspect-[9/13]">
      <Image
        src={cover}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 430px"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-nongton-black" />

      <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
        <h1 className="text-2xl font-bold drop-shadow-lg leading-tight">{title}</h1>
        {tags && tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[11px] bg-nongton-card/80 backdrop-blur-sm px-2.5 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2.5">
          <button className="flex-1 bg-nongton-red hover:bg-nongton-red/90 transition-colors text-white py-2.5 rounded-md flex items-center justify-center gap-2 font-semibold text-sm">
            <Play className="w-4 h-4 fill-white" />
            Play
          </button>
          <button className="bg-nongton-card/80 backdrop-blur-sm hover:bg-nongton-card transition-colors text-white px-5 py-2.5 rounded-md flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
