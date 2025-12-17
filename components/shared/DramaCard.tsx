import Image from "next/image";
import Link from "next/link";

interface DramaCardProps {
  id: string;
  title: string;
  cover: string;
  showBadge?: boolean;
  rank?: number;
  variant?: "default" | "large";
}

export default function DramaCard({
  id,
  title,
  cover,
  showBadge = false,
  rank,
  variant = "default",
}: DramaCardProps) {
  // Large variant for Latest Releases
  if (variant === "large") {
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

  // Top 10 variant with ranking
  if (rank) {
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

  // Default variant (For You section)
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
