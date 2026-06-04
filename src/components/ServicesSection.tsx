"use client";

import React from "react";
import Link from "next/link";
import { Cpu, Smartphone, Globe, Wrench, GraduationCap, Megaphone, Search, BarChart3, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";
import TiltCard from "./TiltCard";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  glowColor: string;
  route: string;
}

import HolographicGlobe from "./HolographicGlobe";

export default function ServicesSection() {
  const services: ServiceItem[] = [
    {
      title: "Website Design and Development",
      description: "We build fast, secure, and scalable web applications tailored to your business needs, ensuring smooth performance and great user experience.",
      icon: Globe,
      glowColor: "rgba(197, 168, 128, 0.1)",
      route: "/services/web-design",
    },
    {
      title: "High Performance Mobile Apps",
      description: "Custom Android and iOS apps designed for performance, usability, and growth, helping you engage users anytime, anywhere.",
      icon: Smartphone,
      glowColor: "rgba(230, 213, 195, 0.1)",
      route: "/services/mobile-apps",
    },
    {
      title: "DevOps Automation and Deployment",
      description: "We reduce downtime and speed up delivery with automated infrastructure and deployment workflows. Helping your business scale with confidence and reliability.",
      icon: Cpu,
      glowColor: "rgba(74, 52, 40, 0.15)",
      route: "/services/devops",
    },
    {
      title: "Reliable Maintenance and Support",
      description: "Ongoing monitoring, updates, and optimization to keep your systems secure, stable, and running at peak performance.",
      icon: Wrench,
      glowColor: "rgba(197, 168, 128, 0.1)",
      route: "/services/maintenance",
    },
    {
      title: "Industry Oriented Technical Training",
      description: "We provide practical, real-world training based on current industry tools, technologies, and workflows. Our programs prepare students and professionals to be job-ready from day one.",
      icon: GraduationCap,
      glowColor: "rgba(230, 213, 195, 0.1)",
      route: "/services/training",
    },
    {
      title: "Digital Marketing Services",
      description: "We create data-driven marketing plans to increase brand visibility and reach the right audience. Focused on delivering measurable growth and long-term results.",
      icon: Megaphone,
      glowColor: "rgba(74, 52, 40, 0.15)",
      route: "/services/digital-marketing",
    },
    {
      title: "Search Engine Optimization",
      description: "We optimize your website to rank higher on search engines and attract organic traffic. Improving visibility, credibility, and conversion rates over time.",
      icon: Search,
      glowColor: "rgba(197, 168, 128, 0.1)",
      route: "/services/seo",
    },
    {
      title: "Analytics & Performance Tracking",
      description: "We track, analyze, and optimize campaigns using real-time data insights. Ensuring continuous improvement and better marketing decisions.",
      icon: BarChart3,
      glowColor: "rgba(230, 213, 195, 0.1)",
      route: "/services/analytics",
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="services" className="relative w-full py-24 md:py-32 bg-maroon-black overflow-hidden">
      {/* Decorative soft glowing backdrop sphere */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-maroon/5 blur-[120px] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-warm-beige/10 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
            <span className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/85">
              Our Capabilities
            </span>
          </div>
          
          <div className="flex flex-col items-center justify-center max-w-4xl mb-4 relative w-full">
            {/* Holographic Globe positioned to the right of the text */}
            <div className="absolute -right-32 md:-right-48 lg:-right-64 top-1/2 -translate-y-1/2 opacity-75 pointer-events-none z-0 scale-50 md:scale-75">
              <HolographicGlobe />
            </div>

            <div className="flex items-center justify-center gap-3 mb-2 flex-wrap relative z-10">
              <div className="w-12 h-6 md:w-16 md:h-8 rounded-full overflow-hidden border border-warm-beige/25 relative flex-shrink-0 shadow-[0_0_15px_rgba(230,213,195,0.15)]">
                <img src="/img/photo/2.png" alt="Team" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-gradient-beige tracking-tight leading-tight drop-shadow-lg">
                Technology <span className="font-light italic text-warm-beige/70">powering</span>
              </h2>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight relative z-10 drop-shadow-lg">
              <span className="font-light italic text-warm-beige/70">your </span>
              <span className="text-gradient-beige">Business Success</span>
            </h2>
          </div>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <Link href={service.route} className="block h-full group">
                  <TiltCard className="group relative h-full flex flex-col justify-between interactive-hover">
                    <div>
                      {/* Icon container with beige glow */}
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-deep-gray/50 border border-warm-beige/10 mb-8 relative transition-all duration-500 group-hover:border-warm-beige/35 group-hover:scale-110"
                        style={{ boxShadow: `inset 0 0 10px ${service.glowColor}` }}
                      >
                        <Icon className="w-5 h-5 text-luxury-gold group-hover:rotate-12 transition-transform duration-500" />
                        {/* Floating secondary particle circle */}
                        <div className="absolute inset-0 rounded-xl border border-warm-beige/10 group-hover:scale-125 group-hover:opacity-0 transition-all duration-500" />
                      </div>

                      <h3 className="text-lg md:text-xl font-display font-semibold text-warm-beige mb-4 tracking-wide group-hover:text-luxury-gold transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="text-xs md:text-sm font-sans text-warm-beige/55 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Visual bottom indicator */}
                    <div className="mt-8 pt-4 border-t border-warm-beige/5 flex items-center justify-between text-[10px] font-display font-bold uppercase tracking-widest text-luxury-gold/55 group-hover:text-luxury-gold transition-colors duration-300">
                      <span>Explore service</span>
                      <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
