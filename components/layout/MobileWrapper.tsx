"use client";

import { ReactNode } from "react";

export default function MobileWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="md:flex md:justify-center md:items-start md:min-h-screen md:bg-zinc-900 md:py-8">
      <div className="w-full md:max-w-[430px] md:border md:border-zinc-800 md:shadow-2xl md:rounded-lg md:overflow-hidden min-h-screen md:min-h-[calc(100vh-4rem)] bg-nongton-black relative">
        {children}
      </div>
    </div>
  );
}
