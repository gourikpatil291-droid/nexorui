"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Sparkles, X } from "lucide-react";

interface Project {
  title: string;
  category: string;
  image: string;
  tags: string[];
  slug: string;
}

const projects: Project[] = [
  {
    title: "BobPay",
    category: "Technology",
    image: "/projects/bobpay.jpeg",
    tags: ["Fintech", "Payment Systems", "APIs"],
    slug: "bobpay",
  },
  {
    title: "AgriTrace",
    category: "Technology",
    image: "/projects/agritrace.jpeg",
    tags: ["Blockchain", "Supply Chain", "IoT"],
    slug: "agritrace",
  },
  {
    title: "IBM - Event Registration Site",
    category: "Technology",
    image: "/projects/ibm.png",
    tags: ["Web Design", "Cloud Infrastructure", "Systems"],
    slug: "ibm",
  },
  {
    title: "Digital Signage",
    category: "Technology",
    image: "/projects/digitalsignage.png",
    tags: ["SaaS", "Dashboard", "Real-time Display"],
    slug: "digitalsignage",
  },
  {
    title: "Air Pro by Molekule",
    category: "Technology",
    image: "/projects/homerental.jpeg",
    tags: ["Smart Home", "IoT", "UX/UI Design"],
    slug: "homerental",
  },
];

export default function PortfolioSection() {
  const scrollSpaceRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Overlay state: 'closed' | 'in' | 'reveal' | 'closing'
  const [overlayState, setOverlayState] = useState<'closed' | 'in' | 'reveal' | 'closing'>('closed');
  const [activeOverlayIdx, setActiveOverlayIdx] = useState(0);

  useEffect(() => {
    let targetProgress = 0;
    let currentProgress = 0;
    let rafId: number;
    let isRunning = false;
    const TOTAL = projects.length;
    const LERP = 0.08;

    function positionCards(progress: number) {
      if (!cardsRef.current[0]) return;
      const viewW = cardsRef.current[0].parentElement?.offsetWidth || window.innerWidth;
      const CARD_W = cardsRef.current[0].offsetWidth;
      // Define gap dynamically based on screen width
      const SLOT_W = CARD_W + (window.innerWidth >= 768 ? 48 : 32);
      const centerX = (viewW - CARD_W) / 2;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const relPos = i - progress;
        const x = centerX + relPos * SLOT_W;
        const dist = Math.abs(relPos);

        // Exact Scale animation logic from user
        const scale = dist < 1 ? 1.0 - dist * 0.10 : 0.90 - (dist - 1) * 0.06;
        const clampedScale = Math.max(0.76, scale);

        // Exact Opacity animation logic from user
        const opacity = Math.max(0, 1 - dist * 0.45);

        card.style.transform = `translateX(${x}px) scale(${clampedScale})`;
        card.style.opacity = opacity.toString();

        // Exact Subtle parallax on image from user
        const img = card.querySelector(".card-img") as HTMLElement;
        if (img) {
          const parallax = relPos * 10;
          img.style.transform = `translateX(${parallax}px)`;
        }
      });

      const newActive = Math.round(progress);
      const clamped = Math.max(0, Math.min(TOTAL - 1, newActive));
      if (clamped !== activeIndexRef.current) {
        activeIndexRef.current = clamped;
        setActiveIndex(clamped);
      }
    }

    function renderLoop() {
      const diff = targetProgress - currentProgress;
      currentProgress += diff * LERP;

      if (Math.abs(diff) < 0.0008) {
        currentProgress = targetProgress;
        positionCards(currentProgress);
        isRunning = false;
        return;
      }

      positionCards(currentProgress);
      rafId = requestAnimationFrame(renderLoop);
    }

    function startLoop() {
      if (isRunning) return;
      isRunning = true;
      rafId = requestAnimationFrame(renderLoop);
    }

    function onScroll() {
      if (!scrollSpaceRef.current) return;
      const rect = scrollSpaceRef.current.getBoundingClientRect();
      const total = scrollSpaceRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;

      if (scrolled >= 0 && scrolled <= total) {
        const raw = (scrolled / total) * (TOTAL - 1);
        targetProgress = Math.max(0, Math.min(TOTAL - 1, raw));
        startLoop();
      } else if (scrolled < 0) {
        targetProgress = 0;
        startLoop();
      } else if (scrolled > total) {
        targetProgress = TOTAL - 1;
        startLoop();
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initialize cards immediately using the current scroll position
    setTimeout(() => onScroll(), 50);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const router = useRouter();

  const openOverlay = (idx: number) => {
    if (overlayState !== 'closed') return;
    setActiveOverlayIdx(idx);
    
    // Set 'in' state -> triggers curtainIn
    setOverlayState('in');
    document.body.style.overflow = 'hidden';

    // Wait for curtain to cover the screen, then navigate directly to the page
    setTimeout(() => {
      document.body.style.overflow = '';
      router.push(`/portfolio/${projects[idx].slug}`);
      
      // Reset local state silently in case they hit "Back" in browser
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
    <>
      <section
        id="portfolio"
        ref={scrollSpaceRef}
        className="relative w-full bg-maroon-black"
        style={{ height: `${projects.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden bg-maroon-black">
          {/* Background radial highlight */}
          <div className="absolute bottom-[20%] left-0 w-[450px] h-[450px] rounded-full bg-maroon/10 blur-[120px] pointer-events-none z-0" />

          {/* Decorative section header */}
          <div className="w-full z-20 pt-10 pb-4 px-6 md:px-12 pointer-events-none shrink-0 relative">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between">
              <div className="flex flex-col max-w-xl pointer-events-auto">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-warm-beige/10 mb-4 w-fit bg-maroon-black/30 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
                  <span className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/85">
                    Our Work
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-gradient-beige drop-shadow-2xl">
                  Selected Showcase Projects
                </h2>
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full overflow-hidden z-10 pointer-events-none">
            {projects.map((project, i) => (
              <div
                key={i}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="absolute top-1/2 left-0 w-[85vw] md:w-[65vw] lg:w-[56vw] max-w-[860px] aspect-[4/3] md:aspect-[16/9] cursor-pointer z-10 origin-center -translate-y-1/2 pointer-events-auto"
                onClick={() => openOverlay(i)}
                style={{ opacity: 0 }}
              >
                <div className="block w-full h-full relative rounded-2xl overflow-hidden shadow-2xl bg-[#1A1208] group">
                  <div className="w-full h-full absolute inset-0 card-img transition-transform duration-700 ease-out">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover md:object-contain object-center pointer-events-none filter group-hover:brightness-75 transition-all duration-700"
                      sizes="(max-width: 768px) 90vw, 60vw"
                      priority={i < 2}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-black via-maroon-black/60 to-transparent z-[1] opacity-0 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Always visible description overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10 flex flex-col items-start opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold bg-maroon-black/80 px-3 py-1.5 rounded backdrop-blur-md border border-luxury-gold/20">
                        {project.category}
                      </div>
                    </div>
                    <h5 className="text-3xl md:text-5xl font-display font-bold text-warm-beige mb-8 drop-shadow-xl max-w-2xl">
                      {project.title}
                    </h5>
                    <div>
                      <button 
                        className="inline-flex items-center space-x-2 bg-maroon text-warm-beige px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-maroon-mid transition-all shadow-xl hover:shadow-maroon/20 hover:-translate-y-1"
                      >
                        <span>View Project</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Simple fixed info bar */}
          <div className="w-full shrink-0 z-20 flex flex-col bg-maroon-black/95 backdrop-blur-md border-t border-warm-beige/10 py-5 px-6 md:px-12 relative">
            <div className="flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-display font-medium text-warm-beige min-h-[32px]">
                {projects[activeIndex]?.title}
              </h3>
              <div className="font-serif text-3xl text-warm-beige/50 select-none">
                <span className="text-luxury-gold">{activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1}</span>
                <span className="mx-2 text-xl text-warm-beige/20">/</span>
                <span className="text-xl text-warm-beige/50">{projects.length < 10 ? `0${projects.length}` : projects.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSITION OVERLAY: Just the curtains */}
      <div className={`proj-overlay ${overlayClassMap[overlayState]} z-[9999]`} aria-hidden={overlayState === 'closed'}>
        <div className="proj-curtain proj-curtain--1"></div>
        <div className="proj-curtain proj-curtain--2"></div>
      </div>
    </>
  );
}
