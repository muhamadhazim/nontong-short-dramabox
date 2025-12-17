import Image from "next/image";
import Link from "next/link";
import { DramaCardProps } from "./types";

export function DramaCardLarge({ id, title, cover, showBadge }: Omit<DramaCardProps, 'variant' | 'rank'>) {
  return (
    <Link
      href={`/watch/${id}`}
      className="block relative flex-shrink-0 w-[200px] group" 
    >
      <div className="relative w-[200px] h-[280px] rounded-lg overflow-hidden">
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="200px"
        />
        {showBadge && (
          <div className="absolute top-3 right-3 bg-nongton-red text-white text-[10px] px-2.5 py-1 rounded-sm font-bold tracking-wide">
            NEW
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
