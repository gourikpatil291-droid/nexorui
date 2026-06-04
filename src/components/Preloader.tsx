"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    
    // Only show preloader on the home page.
    if (pathname !== "/") {
      setVisible(false);
      if (typeof window !== "undefined") {
        (window as any).preloaderFinished = true;
        window.dispatchEvent(new Event("preloader-done"));
      }
      return;
    }

    // By not using sessionStorage, the preloader will naturally play on 
    // full page refresh or initial load, but won't replay on client-side routing.
    setVisible(true);
    
    // Disable scroll while loading
    document.body.style.overflow = "hidden";

    // Initial load backup timeout (12 seconds)
    timeoutRef.current = setTimeout(() => {
      handleComplete();
    }, 12000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      document.body.style.overflow = "unset";
    };
  }, [pathname]);

  const handlePlay = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    const duration = videoRef.current?.duration || 7;
    timeoutRef.current = setTimeout(() => {
      handleComplete();
    }, (duration * 1000) + 2000);
  };

  const handleComplete = () => {
    setVisible(false);
    document.body.style.overflow = "unset";
    
    if (typeof window !== "undefined") {
      (window as any).preloaderFinished = true;
      window.dispatchEvent(new Event("preloader-done"));
    }
  };

  if (!mounted || !visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      <video
        ref={videoRef}
        src="/preuse.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onPlay={handlePlay}
        onEnded={handleComplete}
        className="w-full h-full object-cover"
      />

      {/* Skip Intro Button */}
      <button
        onClick={handleComplete}
        className="absolute bottom-10 right-10 z-20 px-6 py-2.5 rounded-full border border-warm-beige/10 hover:border-warm-beige/40 text-warm-beige/60 hover:text-warm-beige bg-maroon-black/30 backdrop-blur-md transition-all duration-300 text-[10px] font-display font-bold uppercase tracking-widest interactive-hover"
      >
        Skip Intro
      </button>
    </div>
  );
}
