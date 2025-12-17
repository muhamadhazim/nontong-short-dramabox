import Image from "next/image";
import Link from "next/link";

interface DramaCardProps {
  id: string;
  title: string;
  cover: string;
  showBadge?: boolean;
  rank?: number;
}

export default function DramaCard({
  id,
  title,
  cover,
  showBadge = false,
  rank,
}: DramaCardProps) {
  return (
    <Link
      href={`/watch/${id}`}
      className="block relative flex-shrink-0 w-32 group"
    >
      {rank && (
        <div className="absolute -left-4 -top-2 z-0">
          <span
            className="text-[120px] font-black leading-none"
            style={{
              WebkitTextStroke: "3px #ffffff",
              WebkitTextFillColor: "transparent",
              opacity: 0.5,
            }}
          >
            {rank}
          </span>
        </div>
      )}
      <div className={`relative w-32 h-48 rounded-md overflow-hidden ${rank ? "ml-8 z-10" : ""}`}>
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="128px"
        />
        {showBadge && (
          <div className="absolute top-2 right-2 bg-nongton-red text-white text-xs px-2 py-1 rounded font-bold">
            NEW
          </div>
        )}
      </div>
      <p className="text-sm mt-2 line-clamp-2 text-nongton-white/90 group-hover:text-nongton-white transition-colors">
        {title}
      </p>
    </Link>
  );
}
