"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, User, Calendar, Briefcase, ExternalLink } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface ProjectDetailPageProps {
  title: string;
  category: string;
  client: string;
  date: string;
  author: string;
  mainImage: string;
  heading: string;
  paragraphs: string[];
  galleryImages: string[];
  prevSlug: string;
  nextSlug: string;
}

import { useRouter } from "next/navigation";

export default function ProjectDetailPage({
  title,
  category,
  client,
  date,
  author,
  mainImage,
  heading,
  paragraphs,
  galleryImages,
  prevSlug,
  nextSlug,
}: ProjectDetailPageProps) {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const [overlayState, setOverlayState] = useState<'closed' | 'in' | 'reveal' | 'closing'>('closed');

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

  const handleNavigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (overlayState !== 'closed') return;
    
    setOverlayState('in');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      document.body.style.overflow = '';
      router.push(path);
      
      setTimeout(() => setOverlayState('closed'), 1000);
    }, 650);
  };

  const overlayClassMap = {
    'closed': '',
    'in': 'is-open curtain-in',
    'reveal': 'is-open content-visible curtain-reveal',
    'closing': 'is-open curtain-close'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isReady ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="flex flex-col min-h-screen bg-maroon-black w-full overflow-x-hidden relative"
    >
      <Navbar />

      {/* Decorative background glows */}
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-maroon/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[25%] right-[5%] w-[300px] h-[300px] rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-36 pb-12 md:pt-44 md:pb-16 border-b border-warm-beige/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-3 mb-8 text-[10px] md:text-xs font-display font-bold uppercase tracking-widest text-warm-beige/45 select-none">
            <Link 
              href="/" 
              className="hover:text-luxury-gold transition-colors duration-300"
            >
              Home
            </Link>
            <span className="text-luxury-gold/30">/</span>
            <Link 
              href="/portfolio" 
              className="hover:text-luxury-gold transition-colors duration-300"
            >
              Portfolio
            </Link>
            <span className="text-luxury-gold/30">/</span>
            <span className="text-luxury-gold">
              {title}
            </span>
          </div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-gradient-beige leading-[1.1] max-w-4xl"
          >
            {title}
          </motion.h1>
        </div>
      </section>

      {/* Main Content & Details */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Main Showcase Image */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-[350px] md:h-[600px] relative rounded-3xl overflow-hidden glass-panel border border-warm-beige/10 mb-16 shadow-2xl"
          >
            <Image
              src={mainImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-black via-transparent to-transparent opacity-85" />
          </motion.div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 mb-16 border-y border-warm-beige/5 glass-panel rounded-2xl p-6 md:p-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-maroon/20 border border-warm-beige/10">
                <Briefcase className="w-5 h-5 text-luxury-gold" />
              </div>
              <div>
                <div className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/40">Client</div>
                <div className="text-sm font-sans font-semibold text-warm-beige">{client || "Nexoresha Client"}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-maroon/20 border border-warm-beige/10">
                <Calendar className="w-5 h-5 text-luxury-gold" />
              </div>
              <div>
                <div className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/40">Date</div>
                <div className="text-sm font-sans font-semibold text-warm-beige">{date || "Recent"}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-maroon/20 border border-warm-beige/10">
                <User className="w-5 h-5 text-luxury-gold" />
              </div>
              <div>
                <div className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/40">Author</div>
                <div className="text-sm font-sans font-semibold text-warm-beige">{author || "Nexoresha Team"}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-maroon/20 border border-warm-beige/10">
                <Sparkles className="w-5 h-5 text-luxury-gold" />
              </div>
              <div>
                <div className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/40">Category</div>
                <div className="text-sm font-sans font-semibold text-warm-beige">{category || "Technology"}</div>
              </div>
            </div>
          </div>

          {/* Description Text */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
            <div className="lg:col-span-5">
              <span className="text-xs font-display font-bold uppercase tracking-widest text-luxury-gold mb-3 block">
                Project Overview
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-gradient-beige leading-tight">
                {heading || "Simplicity, elegance, innovation!"}
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="text-sm md:text-base font-sans text-warm-beige/65 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Gallery Sub-images */}
          {galleryImages.length > 0 && (
            <div className="mb-24">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-warm-beige/10 mb-8">
                <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
                <span className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/85">
                  Screenshots & Interface
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {galleryImages.map((img, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="relative h-[250px] md:h-[380px] rounded-2xl overflow-hidden border border-warm-beige/5 hover:border-warm-beige/15 shadow-lg group"
                  >
                    <Image
                      src={img}
                      alt={`Gallery view ${idx + 1}`}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-103"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-maroon-black/10 group-hover:bg-transparent transition-all duration-350" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Project Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-warm-beige/5">
            <button 
              onClick={(e) => handleNavigate(e, `/portfolio/${prevSlug}`)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-display font-bold uppercase tracking-widest text-[10px] border border-warm-beige/10 hover:border-warm-beige/35 text-warm-beige/60 hover:text-warm-beige bg-maroon-black/20 hover:bg-warm-beige/5 transition-all duration-300 interactive-hover"
            >
              <span>Prev Project</span>
            </button>

            <button 
              onClick={(e) => handleNavigate(e, `/portfolio`)}
              className="text-xs font-display font-bold uppercase tracking-widest text-luxury-gold hover:text-warm-beige transition-colors duration-300"
            >
              All Projects
            </button>

            <button 
              onClick={(e) => handleNavigate(e, `/portfolio/${nextSlug}`)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-display font-bold uppercase tracking-widest text-[10px] border border-warm-beige/10 hover:border-warm-beige/35 text-warm-beige/60 hover:text-warm-beige bg-maroon-black/20 hover:bg-warm-beige/5 transition-all duration-300 interactive-hover"
            >
              <span>Next Project</span>
            </button>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 border-t border-warm-beige/5 bg-maroon-black/35">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-gradient-beige mb-8">
            Ready to Build Your Success Story?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={(e) => handleNavigate(e, `/portfolio`)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-display font-bold uppercase tracking-widest text-xs bg-warm-beige text-maroon-black hover:bg-transparent hover:text-warm-beige border border-warm-beige transition-all duration-300 interactive-hover"
            >
              See Projects
            </button>
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
      
      {/* TRANSITION OVERLAY: Just the curtains */}
      <div className={`proj-overlay ${overlayClassMap[overlayState]} z-[9999]`} aria-hidden={overlayState === 'closed'}>
        <div className="proj-curtain proj-curtain--1"></div>
        <div className="proj-curtain proj-curtain--2"></div>
      </div>
    </motion.div>
  );
}
