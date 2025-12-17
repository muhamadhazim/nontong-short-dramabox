"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";

interface AppHeaderProps {
  title?: string;
  showSearch?: boolean;
}

export default function AppHeader({ 
  title = "NONGTON", 
  showSearch = true 
}: AppHeaderProps) {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-b from-nongton-black via-nongton-black/95 to-transparent backdrop-blur-sm z-40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-2xl sm:text-3xl font-black text-nongton-red tracking-tight">
              {title}
            </h1>
          </Link>
          
          {showSearch && (
            <Button
              variant="icon"
              size="md"
              icon={Search}
              onClick={() => router.push('/search')}
              aria-label="Search"
            />
          )}
        </div>
      </div>
    </header>
  );
}
