"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

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
      image: "/nexoresha_logo.png",
    },
    {
      quote: "I had the pleasure of working with this creative agency, and I must say, they truly impressed me. They consistently think outside the box, resulting in impressive and impactful work. I highly recommend this agency for their consistent delivery of exceptional creative solutions.",
      name: "Bharat Sharma",
      role: "Collaborator",
      company: "Contra",
      image: "/nexoresha_logo.png",
    },
    {
      quote: "This creative agency stands out with their exceptional talent and expertise. Their ability to think outside the box and bring unique ideas to life is truly impressive. With meticulous attention to detail, they consistently deliver visually stunning and impactful work.",
      name: "Darshan Jain",
      role: "Client Partner",
      company: "Contra",
      image: "/nexoresha_logo.png",
    },
    {
      quote: "I had the pleasure of working with this creative agency, and I must say, they truly impressed me. They consistently think outside the box, resulting in impressive and impactful work. I highly recommend this agency for their consistent delivery of exceptional creative solutions.",
      name: "Emanuel Rodriguez",
      role: "Independent Client",
      company: "Contra",
      image: "/nexoresha_logo.png",
    },
    {
      quote: "This creative agency stands out with their exceptional talent and expertise. Their ability to think outside the box and bring unique ideas to life is truly impressive. With meticulous attention to detail, they consistently deliver visually stunning and impactful work.",
      name: "Samiksha More",
      role: "Product Owner",
      company: "Contra",
      image: "/nexoresha_logo.png",
    },
    {
      quote: "I had the pleasure of working with this creative agency, and I must say, they truly impressed me. They consistently think outside the box, resulting in impressive and impactful work. I highly recommend this agency for their consistent delivery of exceptional creative solutions.",
      name: "Ramesh Das",
      role: "Creative Partner",
      company: "Contra",
      image: "/nexoresha_logo.png",
    },
    {
      quote: "This creative agency stands out with their exceptional talent and expertise. Their ability to think outside the box and bring unique ideas to life is truly impressive. With meticulous attention to detail, they consistently deliver visually stunning and impactful work.",
      name: "Trisha Singh",
      role: "Design Lead",
      company: "Contra",
      image: "/nexoresha_logo.png",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(2); // Start at Darshan Jain (index 2)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="theme-brown relative w-full py-16 md:py-20 bg-maroon-black border-y border-warm-beige/5 overflow-hidden">
      
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-warm-beige/10 mb-4">
            <Sparkles className="w-3 h-3 text-luxury-gold" />
            <span className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/85">
              Client Feedback
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-warm-beige leading-tight">
            Customer <span className="font-light italic text-warm-beige/70">Voices:</span> <br className="md:hidden" /> Hear What <span className="font-light italic text-warm-beige/70">They Say!</span>
          </h2>
        </div>

        {/* Avatars Carousel Row */}
        <div className="flex justify-center items-center gap-2 md:gap-6 mb-16 h-32">
          {testimonials.map((test, index) => {
            // Calculate distance from active item for wrapping effect
            let distance = index - activeIndex;
            if (distance > 3) distance -= testimonials.length;
            if (distance < -3) distance += testimonials.length;
            
            const absDist = Math.abs(distance);
            
            let classes = "";
            if (absDist === 0) {
              classes = "w-16 h-16 md:w-20 md:h-20 ring-[3px] ring-orange-500 ring-offset-4 ring-offset-[#F4EFE6] scale-110 opacity-100 z-10";
            } else if (absDist === 1) {
              classes = "w-12 h-12 md:w-16 md:h-16 opacity-80 blur-[1px] grayscale-[20%]";
            } else if (absDist === 2) {
              classes = "w-10 h-10 md:w-12 md:h-12 opacity-60 blur-[2px] grayscale-[40%]";
            } else {
              classes = "w-8 h-8 md:w-10 md:h-10 opacity-40 blur-[3px] grayscale-[60%]";
            }

            return (
              <div 
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative rounded-full aspect-square min-h-[32px] transition-all duration-700 ease-in-out cursor-pointer flex-shrink-0 bg-warm-beige ${classes}`}
              >
                <Image
                  src={test.image}
                  alt={test.name}
                  fill
                  className="object-contain p-3 md:p-5 rounded-full"
                  sizes="(max-width: 768px) 4rem, 5rem"
                />
              </div>
            );
          })}
        </div>

        {/* Quote Icon */}
        <div className="flex justify-center mb-6">
          <svg className="w-12 h-12 text-orange-500 fill-current" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
        </div>

        {/* Text Content */}
        <div className="text-center max-w-3xl mx-auto relative px-4 md:px-16">
          
          <h3 className="text-lg md:text-xl font-display font-bold text-warm-beige mb-2">
            {testimonials[activeIndex].name}
          </h3>
          <p className="text-[10px] md:text-xs font-display font-semibold uppercase tracking-widest text-warm-beige/50 mb-10">
            {testimonials[activeIndex].company}
          </p>

          <div className="relative min-h-[160px] flex items-center justify-center">
            {/* Left Arrow (Absolute to left edge of container) */}
            <button 
              onClick={prevSlide}
              className="absolute left-[-10px] md:left-[-40px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-warm-beige/10 hover:bg-warm-beige/20 flex items-center justify-center text-warm-beige transition-colors z-20 interactive-hover"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <p className="text-base md:text-xl font-sans font-light text-warm-beige/80 leading-relaxed text-center px-4 md:px-8 transition-opacity duration-500">
              {testimonials[activeIndex].quote}
            </p>

            {/* Right Arrow (Absolute to right edge of container) */}
            <button 
              onClick={nextSlide}
              className="absolute right-[-10px] md:right-[-40px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-warm-beige/10 hover:bg-warm-beige/20 flex items-center justify-center text-warm-beige transition-colors z-20 interactive-hover"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
