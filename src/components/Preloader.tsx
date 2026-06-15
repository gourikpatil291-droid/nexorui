"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // Only show preloader on the home page.
    if (pathname !== "/") {
      setVisible(false);
      if (typeof window !== "undefined") {
        (window as any).preloaderFinished = true;
        window.dispatchEvent(new Event("preloader-done"));
      }
      return;
    }

    // Check if the preloader has already been played in this session
    // if (typeof window !== "undefined" && sessionStorage.getItem("preloader_played")) {
    //   setVisible(false);
    //   (window as any).preloaderFinished = true;
    //   window.dispatchEvent(new Event("preloader-done"));
    //   return;
    // }

    setVisible(true);
    setPhase(1);
    document.body.style.overflow = "hidden";

    const seq = async () => {
      // Phase 1 (Excellence Meets Creativity)
      await new Promise((r) => setTimeout(r, 3500));
      setPhase(2);
      // Phase 2 (Nexoresha Technologies)
      await new Promise((r) => setTimeout(r, 3500));
      // End
      setVisible(false);
      document.body.style.overflow = "unset";
      if (typeof window !== "undefined") {
        sessionStorage.setItem("preloader_played", "true");
        (window as any).preloaderFinished = true;
        window.dispatchEvent(new Event("preloader-done"));
      }
    };
    seq();

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#C8AE8B" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative z-10 flex h-screen w-full items-center justify-center text-warm-beige">
            <AnimatePresence mode="wait">
              {phase === 1 && (
                <motion.div
                  key="phase1"
                  className="absolute flex flex-col md:flex-row items-center justify-center"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  {["Excellence", "Meets", "Creativity"].map((word, i) => (
                    <motion.p
                      key={word}
                      className={`text-3xl md:text-5xl lg:text-6xl mx-2 font-display ${i % 2 === 0 ? "font-thin" : "font-medium"}`}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.5, duration: 0.8, ease: "easeOut" }}
                    >
                      {word}
                    </motion.p>
                  ))}
                </motion.div>
              )}

              {phase === 2 && (
                <motion.div
                  key="phase2"
                  className="absolute flex items-center justify-center px-8 py-2 overflow-hidden"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Reveal Box */}
                  <motion.div
                    className="absolute top-0 h-full bg-warm-beige z-20"
                    initial={{ width: "0%", left: 0 }}
                    animate={{ width: ["0%", "100%", "0%"], left: ["0%", "0%", "100%"] }}
                    transition={{ duration: 1.2, times: [0, 0.5, 1], ease: "easeInOut" }}
                  />
                  <motion.p
                    className="text-3xl md:text-5xl lg:text-6xl font-display font-thin z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.2 }}
                  >
                    Nexoresha Technologies
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
