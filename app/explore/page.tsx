import MobileWrapper from "@/components/layout/MobileWrapper";
import BottomNav from "@/components/layout/BottomNav";
import { Search } from "lucide-react";

export default function ExplorePage() {
  return (
    <MobileWrapper>
      <header className="fixed top-0 left-0 right-0 bg-nongton-black/80 backdrop-blur-md z-40 px-4 py-4 flex justify-between items-center border-b border-zinc-800/50">
        <h1 className="text-2xl font-black text-nongton-red tracking-tight">
          EXPLORE
        </h1>
        <button className="hover:text-nongton-red transition-colors">
          <Search className="w-6 h-6" />
        </button>
      </header>

      <main className="pt-16 pb-20 px-4">
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-nongton-gray text-lg">Coming Soon...</p>
        </div>
      </main>

      <BottomNav />
    </MobileWrapper>
  );
}
