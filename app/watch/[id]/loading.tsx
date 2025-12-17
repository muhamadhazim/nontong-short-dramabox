import MobileWrapper from '@/components/layout/MobileWrapper';

export default function Loading() {
  return (
    <MobileWrapper>
      <div className="flex flex-col items-center justify-center min-h-screen bg-nongton-black text-center">
        {/* Spinner */}
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-nongton-red rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* Text */}
        <p className="text-white font-semibold animate-pulse">Loading Episode...</p>
        <p className="text-xs text-nongton-gray mt-2">Preparing your drama</p>
      </div>
    </MobileWrapper>
  );
}
