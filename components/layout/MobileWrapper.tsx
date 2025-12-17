"use client";

import { ReactNode } from "react";

export default function MobileWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-nongton-black">
      {/* Max width container for desktop */}
      <div className="max-w-screen-sm mx-auto bg-nongton-black">
        {children}
      </div>
    </div>
  );
}
