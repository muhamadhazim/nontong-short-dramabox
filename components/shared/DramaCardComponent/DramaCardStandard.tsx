import Image from "next/image";
import Link from "next/link";
import { DramaCardProps } from "./types";

export function DramaCardStandard({ id, title, cover }: Omit<DramaCardProps, 'variant' | 'rank' | 'showBadge'>) {
  return (
    <Link
      href={`/watch/${id}`}
      className="block relative flex-shrink-0 w-28 group"
    >
      <div className="relative w-28 h-40 rounded-md overflow-hidden">
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="112px"
        />
      </div>
      <p className="text-xs mt-1.5 line-clamp-2 text-nongton-white/80 group-hover:text-nongton-white transition-colors">
        {title}
      </p>
    </Link>
  );
}
