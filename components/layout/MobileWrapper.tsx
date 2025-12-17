"use client";

import { ReactNode } from "react";

interface MobileWrapperProps {
  children: ReactNode;
  maxWidth?: "mobile" | "tablet" | "full";
}

export default function MobileWrapper({ 
  children, 
  maxWidth = "mobile" 
}: MobileWrapperProps) {
  const widthClasses = {
    mobile: "max-w-screen-sm",   // 640px - mobile first
    tablet: "max-w-screen-md",   // 768px - tablet
    full: "max-w-full"           // full width for desktop
  };

  return (
    <div className="w-full min-h-screen bg-nongton-black overflow-x-hidden">
      <div className={`${widthClasses[maxWidth]} mx-auto relative`}>
        {children}
      </div>
    </div>
  );
}
