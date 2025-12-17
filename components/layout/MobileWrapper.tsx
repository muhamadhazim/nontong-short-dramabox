"use client";

import { ReactNode } from "react";

export default function MobileWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-nongton-black">
      {children}
    </div>
  );
}
