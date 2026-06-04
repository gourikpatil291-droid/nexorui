"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProcessSection from "@/components/ProcessSection";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function ProcessPage() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ((window as any).preloaderFinished) {
        setIsReady(true);
      }
      const handlePreloader = () => setIsReady(true);
      window.addEventListener("preloader-done", handlePreloader);
      return () => {
        window.removeEventListener("preloader-done", handlePreloader);
      };
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isReady ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="flex flex-col min-h-screen bg-maroon-black w-full overflow-x-hidden relative"
    >
      <Navbar />
      
      {/* Decorative Spacer / Top banner for stand-alone page */}
      <div className="pt-32 pb-8 text-center bg-gradient-to-b from-[#140708] to-maroon-black">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="flex justify-center items-center space-x-2 text-[10px] md:text-xs font-display uppercase tracking-widest text-warm-beige/40 mb-4 select-none">
            <Link href="/" className="hover:text-luxury-gold transition-colors duration-300">Homepage</Link>
            <span>—</span>
            <span className="text-luxury-gold">Process</span>
          </nav>
          <span className="text-xs font-display font-bold uppercase tracking-widest text-luxury-gold mb-3 block">
            Cinematic & Structured Workflows
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-beige mb-4">
            Our Process
          </h1>
          <p className="text-sm md:text-base font-sans text-warm-beige/60 max-w-2xl mx-auto">
            How we transform raw concepts into scalable, premium, and interactive digital experiences through a dedicated step-by-step timeline.
          </p>
        </div>
      </div>

      <main className="flex-grow">
        <ProcessSection />
      </main>

      <Footer />
    </motion.div>
  );
}
