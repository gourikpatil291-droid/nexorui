"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PortfolioSection from "@/components/PortfolioSection";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PortfolioPage() {
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
      className="flex flex-col min-h-screen bg-maroon-black w-full overflow-x-clip relative"
    >
      <Navbar />
      
      {/* Decorative Spacer / Top banner for stand-alone page */}
      <div className="pt-32 pb-8 text-center bg-gradient-to-b from-[#140708] to-maroon-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex justify-center items-center space-x-2 text-[10px] md:text-xs font-display uppercase tracking-widest text-warm-beige/40 mb-4 select-none">
            <Link href="/" className="hover:text-luxury-gold transition-colors duration-300">Homepage</Link>
            <span>&mdash;</span>
            <span className="text-luxury-gold">Portfolio</span>
          </nav>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-beige mb-4">
            Our Portfolio
          </h1>
          <p className="text-sm md:text-base font-sans text-warm-beige/60 max-w-2xl mx-auto">
            Explore our selected high-performance software builds, fintech engines, IoT networks, and responsive web platforms.
          </p>
        </div>
      </div>

      <main className="flex-grow">
        <PortfolioSection />
      </main>

      <Footer />
    </motion.div>
  );
}
