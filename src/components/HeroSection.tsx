"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, Variants, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Cpu, Sparkles } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track current frame for resize redraw
  const currentFrameRef = useRef(1);
  const frameCount = 240;
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(frameCount + 1).fill(null));

  // Scroll Progress Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fade IN hero overlay UI as we reach the end of the 240-frame sequence
  const overlayOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const pointerEvents = useTransform(scrollYProgress, [0.8, 1], ["none", "auto"]);

  // Motion values for floating elements mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smoother movement of elements
  const springConfig = { damping: 50, stiffness: 250, mass: 0.8 };
  const cardX1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), springConfig);
  const cardY1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), springConfig);

  const cardX2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [25, -25]), springConfig);
  const cardY2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-40, 40]), springConfig);

  const cardX3 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const cardY3 = useSpring(useTransform(mouseY, [-0.5, 0.5], [35, -35]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinate: -0.5 to 0.5
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(normX);
      mouseY.set(normY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Preload images
  useEffect(() => {
    // Load first 20 frames immediately for quick initial interaction
    for (let i = 1; i <= Math.min(20, frameCount); i++) {
      const img = new window.Image();
      const frameStr = i.toString().padStart(3, '0');
      img.src = `/hero-frames/ezgif-frame-${frameStr}.jpg`;
      imagesRef.current[i] = img;
    }

    // Lazy load the rest in small batches to prevent locking the main thread
    let currentBatch = 21;
    const batchSize = 10;

    const loadNextBatch = () => {
      if (currentBatch > frameCount) return;

      for (let i = currentBatch; i < currentBatch + batchSize && i <= frameCount; i++) {
        const img = new window.Image();
        const frameStr = i.toString().padStart(3, '0');
        img.src = `/hero-frames/ezgif-frame-${frameStr}.jpg`;
        imagesRef.current[i] = img;
      }

      currentBatch += batchSize;
      // Yield to main thread heavily so preloader & scroll stay 60fps
      setTimeout(loadNextBatch, 100); 
    };

    // Start lazy loading slightly after initial render to let preloader finish
    const timeoutId = setTimeout(loadNextBatch, 800);

    return () => clearTimeout(timeoutId);
  }, []);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = imagesRef.current[index];
    if (img && img.complete && img.naturalWidth > 0) {
      // Handle high DPI display
      const dpr = window.devicePixelRatio || 1;
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      
      // Calculate object-cover ratios
      const hRatio = cw / iw;
      const vRatio = ch / ih;
      const ratio = Math.max(hRatio, vRatio);
      
      const cx = (cw - iw * ratio) / 2;
      const cy = (ch - ih * ratio) / 2;
      
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, 0, 0, iw, ih, cx, cy, iw * ratio, ih * ratio);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // High DPI canvas support
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);
        
        drawFrame(currentFrameRef.current);
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();

    // Draw initial frame once loaded
    const img = imagesRef.current[1];
    if (img) {
      if (img.complete) {
        drawFrame(1);
      } else {
        img.onload = () => {
          handleResize(); // draw with correct dimensions
        }
      }
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let frameIndex = Math.floor(latest * (frameCount - 1)) + 1;
    if (frameIndex < 1) frameIndex = 1;
    if (frameIndex > frameCount) frameIndex = frameCount;
    
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      requestAnimationFrame(() => drawFrame(frameIndex));
    }
  });

  // Framer Motion reveal variants for text
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: 40, opacity: 0, filter: "blur(6px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <section ref={containerRef} className="theme-brown relative w-full h-[300vh] bg-maroon-black">
      {/* Sticky wrapper for Canvas and Overlay UI */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-maroon-black">
        
        {/* Canvas Base layer */}
        <div className="absolute inset-0 z-0">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover opacity-100"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Gradient overlays to blend edges seamlessly into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-maroon-black to-transparent z-[1] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-maroon-black to-transparent z-[1] pointer-events-none" />

        {/* Hero Overlay Content */}
        <motion.div 
          style={{ opacity: overlayOpacity, pointerEvents: pointerEvents as any }}
          className="relative z-10 w-full h-full flex items-center justify-center pt-24 pb-16"
        >
          {/* Main Hero Content Wrapper */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
            {/* Ambient top glowing line tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-panel border-warm-beige/10 mb-8 backdrop-blur-md bg-maroon-black/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-luxury-gold animate-pulse" />
              <span className="text-[10px] md:text-xs font-display font-bold uppercase tracking-widest text-warm-beige/85">
                Next Generation Agency
              </span>
            </motion.div>

            {/* Animated large heading */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.2] mb-8 max-w-4xl"
            >
              <motion.span variants={wordVariants} className="inline-block mr-3 md:mr-4 select-none text-gradient-beige drop-shadow-2xl">
                Designing
              </motion.span>
              <motion.span variants={wordVariants} className="inline-block mr-3 md:mr-4 select-none font-light italic text-warm-beige/70">
                a Better
              </motion.span>
              <br className="hidden md:inline" />
              <motion.span variants={wordVariants} className="inline-block mr-3 md:mr-4 select-none text-gradient-beige drop-shadow-2xl">
                World
              </motion.span>
              <motion.span variants={wordVariants} className="inline-block mr-3 md:mr-4 select-none font-light italic text-warm-beige/70">
                Today
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl font-sans text-warm-beige/80 max-w-2xl mb-12 leading-relaxed drop-shadow-md"
            >
              Welcome to our world of endless imagination and boundless creativity. Together, let's embark on a remarkable journey where dreams become tangible realities.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
            >
              <a
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full font-display font-bold uppercase tracking-widest text-xs bg-warm-beige text-maroon-black hover:bg-transparent hover:text-warm-beige border border-warm-beige hover:border-warm-beige/35 transition-all duration-300 group interactive-hover shadow-lg shadow-warm-beige/10"
              >
                <span>What we do</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-display font-bold uppercase tracking-widest text-xs glass-panel border-warm-beige/10 hover:border-warm-beige/35 text-warm-beige hover:bg-warm-beige/5 transition-all duration-300 interactive-hover backdrop-blur-lg bg-maroon-black/30 shadow-lg shadow-maroon-black/50"
              >
                View works
              </a>
            </motion.div>
          </div>

          {/* Floating UI Glassmorphism Cards with Parallax */}
          {/* Card 1: Left Center */}
          <motion.div
            style={{ x: cardX1, y: cardY1 }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="absolute top-[25%] left-[5%] md:left-[8%] xl:left-[12%] hidden lg:flex items-center space-x-4 p-4 rounded-2xl glass-card backdrop-blur-xl bg-maroon-black/40 border border-warm-beige/10 w-64 select-none pointer-events-none"
          >
            <div className="p-2.5 rounded-xl bg-maroon/50 border border-warm-beige/10">
              <Cpu className="w-5 h-5 text-luxury-gold" />
            </div>
            <div>
              <div className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/60">AI Deployments</div>
              <div className="text-sm font-sans font-medium text-warm-beige">Active & Scaling</div>
            </div>
          </motion.div>

          {/* Card 2: Right Top */}
          <motion.div
            style={{ x: cardX2, y: cardY2 }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.4 }}
            className="absolute top-[20%] right-[5%] md:right-[8%] xl:right-[12%] hidden lg:flex flex-col p-4 rounded-2xl glass-card backdrop-blur-xl bg-maroon-black/40 border border-warm-beige/10 w-56 select-none pointer-events-none"
          >
            <div className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/60 mb-1.5">System Latency</div>
            <div className="flex items-end space-x-2">
              <div className="text-3xl font-display font-extrabold text-gradient-beige leading-none drop-shadow-md">12ms</div>
              <div className="text-[10px] font-sans text-green-400 font-bold mb-1">99.9% uptime</div>
            </div>
          </motion.div>

          {/* Card 3: Left Bottom */}
          <motion.div
            style={{ x: cardX3, y: cardY3 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.6 }}
            className="absolute bottom-[18%] left-[8%] md:left-[10%] xl:left-[15%] hidden lg:flex items-center space-x-3 p-3.5 rounded-2xl glass-card backdrop-blur-xl bg-maroon-black/40 border border-warm-beige/10 select-none pointer-events-none"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
            <span className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/85 drop-shadow-md">
              Awwwards-inspired Agent 2.0
            </span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
