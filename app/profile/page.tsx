import MobileWrapper from "@/components/layout/MobileWrapper";
import BottomNav from "@/components/layout/BottomNav";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <MobileWrapper>
      <header className="fixed top-0 left-0 right-0 bg-nongton-black/80 backdrop-blur-md z-40 px-4 py-4 flex justify-between items-center border-b border-zinc-800/50">
        <h1 className="text-2xl font-black text-nongton-red tracking-tight">
          MY SPACE
        </h1>
      </header>

      <main className="pt-16 pb-20 px-4">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-24 h-24 rounded-full bg-nongton-card flex items-center justify-center">
            <User className="w-12 h-12 text-nongton-gray" />
          </div>
          <p className="text-nongton-gray text-lg">Profile Coming Soon...</p>
        </div>
      </main>

      <BottomNav />
    </MobileWrapper>
  );
}
