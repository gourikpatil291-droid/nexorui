"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Quote, Sparkles } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
}

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      quote: "Outstanding service and great technical expertise. The team delivered our project on time with excellent quality and continuous support. Highly recommended for any software development needs.",
      name: "Deepak Shah",
      role: "Professional Partner",
      company: "Linkedin",
      image: "/img1.jpeg",
    },
    {
      quote: "I had the pleasure of working with this creative agency, and I must say, they truly impressed me. They consistently think outside the box, resulting in impressive and impactful work. I highly recommend this agency for their consistent delivery of exceptional creative solutions.",
      name: "Bharat Sharma",
      role: "Collaborator",
      company: "Contra",
      image: "/img2.jpeg",
    },
    {
      quote: "This creative agency stands out with their exceptional talent and expertise. Their ability to think outside the box and bring unique ideas to life is truly impressive. With meticulous attention to detail, they consistently deliver visually stunning and impactful work.",
      name: "Darshan Jain",
      role: "Client Partner",
      company: "Contra",
      image: "/img3.jpeg",
    },
    {
      quote: "I had the pleasure of working with this creative agency, and I must say, they truly impressed me. They consistently think outside the box, resulting in impressive and impactful work. I highly recommend this agency for their consistent delivery of exceptional creative solutions.",
      name: "Emanuel Rodriguez",
      role: "Independent Client",
      company: "Contra",
      image: "/img4.jpeg",
    },
    {
      quote: "This creative agency stands out with their exceptional talent and expertise. Their ability to think outside the box and bring unique ideas to life is truly impressive. With meticulous attention to detail, they consistently deliver visually stunning and impactful work.",
      name: "Samiksha More",
      role: "Product Owner",
      company: "Contra",
      image: "/img5.jpeg",
    },
    {
      quote: "I had the pleasure of working with this creative agency, and I must say, they truly impressed me. They consistently think outside the box, resulting in impressive and impactful work. I highly recommend this agency for their consistent delivery of exceptional creative solutions.",
      name: "Ramesh Das",
      role: "Creative Partner",
      company: "Contra",
      image: "/img1.jpeg",
    },
    {
      quote: "This creative agency stands out with their exceptional talent and expertise. Their ability to think outside the box and bring unique ideas to life is truly impressive. With meticulous attention to detail, they consistently deliver visually stunning and impactful work.",
      name: "Trisha Singh",
      role: "Design Lead",
      company: "Contra",
      image: "/img2.jpeg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000); // Rotate every 8 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="relative w-full py-24 md:py-32 bg-maroon-black/50 border-y border-warm-beige/5 overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-maroon/5 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-warm-beige/10 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
            <span className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/85">
              Client Feedback
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gradient-beige mb-6 leading-tight">
            Customer <span className="font-light italic text-warm-beige/70">Voices:</span> <br className="md:hidden" /> Hear What <span className="font-light italic text-warm-beige/70">They Say!</span>
          </h2>
        </div>

        {/* Carousel Window */}
        <div className="relative min-h-[320px] md:min-h-[260px] flex items-center justify-center">
          
          {/* Quote Icon Background */}
          <div className="absolute top-0 left-6 text-warm-beige/5 pointer-events-none select-none">
            <Quote className="w-24 h-24 stroke-[1.5]" />
          </div>

          <div className="w-full">
            {testimonials.map((test, index) => {
              if (index !== activeIndex) return null;
              return (
                <div
                  key={index}
                  className="w-full glass-panel border border-warm-beige/10 p-8 md:p-12 rounded-3xl relative overflow-hidden"
                >
                  {/* Decorative glowing gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-warm-beige/5 via-luxury-gold/5 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                    
                    {/* User profile picture with custom glowing shadow */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-warm-beige/25 shadow-[0_0_20px_rgba(230,213,195,0.2)] flex-shrink-0">
                      <Image
                        src={test.image}
                        alt={test.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Testimonial Quote text */}
                    <div className="flex-grow text-center md:text-left">
                      <p className="text-base md:text-xl font-sans font-medium text-warm-beige/90 leading-relaxed mb-6 italic">
                        &ldquo;{test.quote}&rdquo;
                      </p>
                      
                      <div>
                        <h4 className="text-sm md:text-base font-display font-bold text-warm-beige tracking-wide">
                          {test.name}
                        </h4>
                        <p className="text-[10px] md:text-xs font-display uppercase tracking-widest text-luxury-gold mt-1">
                          {test.role} &mdash; {test.company}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Carousel Navigation Dot Indicators */}
        <div className="flex items-center justify-center space-x-3 mt-8 md:mt-12 relative z-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 interactive-hover ${
                index === activeIndex ? "w-8 bg-luxury-gold" : "w-2 bg-warm-beige/20 hover:bg-warm-beige/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
