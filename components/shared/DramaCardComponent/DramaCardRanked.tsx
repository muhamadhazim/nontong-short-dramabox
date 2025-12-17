import Image from "next/image";
import Link from "next/link";
import { DramaCardProps } from "./types";

export function DramaCardRanked({ id, title, cover, rank }: Omit<DramaCardProps, 'variant' | 'showBadge'>) {
  return (
    <Link
      href={`/watch/${id}`}
      className="block relative flex-shrink-0 group"
    >
      <div className="flex items-end gap-1">
        {/* Large Ranking Number */}
        <div className="flex-shrink-0 w-10">
          <span
            className="text-[72px] font-black leading-none block"
            style={{
              WebkitTextStroke: "2px rgba(255,255,255,0.3)",
              WebkitTextFillColor: "transparent",
            }}
          >
            {rank}
          </span>
        </div>
        {/* Drama Card */}
        <div className="relative w-28 h-40 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="112px"
          />
        </div>
      </div>
    </Link>
  );
}
