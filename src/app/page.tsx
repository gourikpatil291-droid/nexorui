import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TechStackMarquee from "@/components/TechStackMarquee";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-maroon-black w-full relative">
      {/* Header / Navbar */}
      <Navbar />

      {/* Hero Section (incorporates 3D coding robot tracking mouse) */}
      <HeroSection />

      {/* About Section (incorporates 3D rotating dual Box/Cube) */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Team Leaders Section */}
      <TeamSection />

      {/* Testimonials Carousel */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

