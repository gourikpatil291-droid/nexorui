"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import TestimonialsSection from "@/components/TestimonialsSection";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function TestimonialsPage() {
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
          <span className="text-xs font-display font-bold uppercase tracking-widest text-luxury-gold mb-3 block">
            Client Success Stories
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-beige mb-4">
            Testimonials
          </h1>
          <p className="text-sm md:text-base font-sans text-warm-beige/60 max-w-2xl mx-auto">
            Hear what leaders and technical founders say about our agility, design premium quality, and engineering excellence.
          </p>
        </div>
      </div>

      <main className="flex-grow">
        <TestimonialsSection />
      </main>

      <Footer />
    </motion.div>
  );
}
