"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowLeft, Sparkles } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HolographicGlobe from "./HolographicGlobe";

interface AccordionItem {
  title: string;
  content: string;
}

interface ServiceDetailPageProps {
  title: React.ReactNode;
  breadcrumb: string;
  approachTitle: React.ReactNode;
  approachDescription: string;
  accordionItems: AccordionItem[];
}

export default function ServiceDetailPage({
  title,
  breadcrumb,
  approachTitle,
  approachDescription,
  accordionItems,
}: ServiceDetailPageProps) {
  // Start with all accordions closed
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-maroon-black w-full overflow-x-hidden relative">
      <Navbar />

      {/* Decorative background glows */}
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-maroon/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[25%] right-[5%] w-[300px] h-[300px] rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />

      {/* Sub-page Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-warm-beige/5 overflow-hidden">
        {/* Giant Holographic Globe perfectly centered in the right empty space */}
        <div className="absolute top-[50%] -translate-y-1/2 -right-32 md:-right-10 lg:right-0 opacity-100 pointer-events-none z-0 hidden md:block scale-100 lg:scale-110">
          <HolographicGlobe />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-3 mb-8">
            <Link 
              href="/services" 
              className="text-xs font-display font-bold uppercase tracking-widest text-warm-beige/45 hover:text-warm-beige transition-colors duration-300 flex items-center space-x-2 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Services</span>
            </Link>
            <span className="text-xs text-luxury-gold/30">/</span>
            <span className="text-xs font-display font-bold uppercase tracking-widest text-luxury-gold">
              {breadcrumb}
            </span>
          </div>

          {/* Heading (Removed text-gradient-beige to fix invisible child spans with opacity) */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-warm-beige leading-[1.1] max-w-4xl"
          >
            {title}
          </motion.h1>
        </div>
      </section>      {/* Content Grid */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative">
            
            {/* Left Column: Our Approach */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-warm-beige/10 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
                <span className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/85">
                  Our Approach
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gradient-beige mb-6">
                {approachTitle}
              </h2>
              <p className="text-sm md:text-base font-sans text-warm-beige/60 leading-relaxed">
                {approachDescription}
              </p>
            </motion.div>

            {/* Right Column: Accordion */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-4 w-full"
            >
              {accordionItems.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div 
                    key={idx}
                    className="glass-card rounded-2xl border border-warm-beige/5 hover:border-warm-beige/15 overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full px-6 py-6 md:px-8 md:py-6 flex items-center justify-between text-left group"
                    >
                      <span className="text-base md:text-lg font-display font-semibold text-warm-beige group-hover:text-luxury-gold transition-colors duration-300">
                        {item.title}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-luxury-gold transition-transform duration-500 ${
                          isOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-6 pb-8 md:px-8 md:pb-8 border-t border-warm-beige/5 pt-4">
                            <p className="text-xs md:text-sm font-sans text-warm-beige/50 leading-relaxed whitespace-pre-line">
                              {item.content}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 border-t border-warm-beige/5 bg-maroon-black/35">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-gradient-beige mb-8">
            Ready to Accelerate Your Strategy?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-display font-bold uppercase tracking-widest text-xs bg-warm-beige text-maroon-black hover:bg-transparent hover:text-warm-beige border border-warm-beige transition-all duration-300 interactive-hover"
            >
              See Projects
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-display font-bold uppercase tracking-widest text-xs glass-panel border border-warm-beige/10 hover:border-warm-beige/35 text-warm-beige hover:bg-warm-beige/5 transition-all duration-300 interactive-hover"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
