import React from "react";
import ProjectDetailPage from "@/components/ProjectDetailPage";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const projectsData: Record<string, any> = {
  bobpay: {
    title: "BobPay",
    category: "Technology",
    client: "Anna University",
    date: "January 2026",
    author: "Nexoresha",
    mainImage: "/projects/bobpay.jpeg",
    heading: "Simplicity, elegance, innovation!",
    paragraphs: [
      "BobPay is a secure work marketplace designed to eliminate payment disputes between clients and freelancers through a milestone-based \"Fair Work Protocol.\" The platform locks funds upfront and automates releases only when specific verification rules are met, removing the need for traditional middlemen. By integrating AI-driven verification, transparent reputation tracking, and dedicated dashboards, BobPay ensures that every project is managed with clear expectations and guaranteed financial security for all parties involved.",
      "Built on a modern React and Supabase stack, the application prioritizes automation and trust in the gig economy. Key features include private storage for deliverables, integrated digital wallets, and a \"Fair Exit\" mechanism for resolving incomplete contracts equitably. By strictly enforcing a \"money locked, payments automatic\" philosophy, BobPay provides a reliable, code-governed environment where work is consistently verified and compensation is securely executed without manual intervention."
    ],
    galleryImages: [
      "/projects/bobpay-browser.jpeg",
      "/projects/bobpay-funds.jpeg",
      "/projects/bobpay-login.jpeg",
      "/projects/bobpay-userdash.jpeg"
    ],
    prevSlug: "homerental",
    nextSlug: "agritrace"
  },
  agritrace: {
    title: "AgriTrace",
    category: "Technology",
    client: "Agritech Industries",
    date: "November 2025",
    author: "Nexoresha",
    mainImage: "/projects/agritrace.jpeg",
    heading: "Supply Chain Traceability via Blockchain & IoT",
    paragraphs: [
      "AgriTrace is a blockchain-powered agricultural supply chain management platform built with React, TypeScript, and Supabase. It enables five user roles — Farmer, Distributor, Retailer, Driver, and Admin — to track produce from farm to table using immutable blockchain records on Ethereum (Sepolia/Monad testnets) and IPFS-based certificates via Pinata. Features include voice-based batch registration (VoiceGenie), QR code verification, IoT soil monitoring via ESP32, and an in-app marketplace.",
      "The frontend is a Vite + React SPA with role-based access control, protected routes, and rich dashboards. Supporting services include AI crop-health and soil analysis, real-time inventory tracking, truck-pooling for deliveries, and a debug suite for database migrations and transaction testing — all connected through a centralized Supabase backend."
    ],
    galleryImages: [
      "/projects/agritrace-certveri.jpeg",
      "/projects/agritrace-trackprods.jpeg",
      "/projects/agritrace-ss.png"
    ],
    prevSlug: "bobpay",
    nextSlug: "ibm"
  },
  ibm: {
    title: "IBM - Event Registration Site",
    category: "Technology",
    client: "IBM Corporation",
    date: "April 2024",
    author: "Nexoresha",
    mainImage: "/projects/ibm.png",
    heading: "Simplicity, elegance, innovation!",
    paragraphs: [
      "This is a small web-based application built to collect, manage, and view structured user information. It has a simple frontend for entering data and a backend that processes requests, stores records, and returns results for display.",
      "It also includes reporting/export functionality so data can be reused outside the app, such as in spreadsheet format. In short, it is a practical CRUD-style project focused on form handling, data organization, and basic reporting."
    ],
    galleryImages: [
      "/projects/ibm-form.png",
      "/projects/ibm-map.png",
      "/projects/ibm-edm.jpeg"
    ],
    prevSlug: "agritrace",
    nextSlug: "digitalsignage"
  },
  digitalsignage: {
    title: "Digital Signage",
    category: "Technology",
    client: "Commercial Displays Corp",
    date: "May 24 2023",
    author: "Nexoresha",
    mainImage: "/projects/digitalsignage.png",
    heading: "Digital Signage Solutions for Modern Businesses",
    paragraphs: [
      "Our digital signage system empowers you to manage and control screens anywhere in the world from a single platform. Whether you operate retail stores, corporate offices, restaurants, or public spaces, our solution makes it easy to update and deliver content in real time. With cloud-based management, you can control multiple displays remotely, schedule content, and broadcast important updates instantly from any location. Designed for reliability and scalability, our platform allows businesses to communicate effectively with audiences through dynamic visuals, videos, and announcements."
    ],
    galleryImages: [
      "/projects/digitalsignage-analytics.png",
      "/projects/digitalsignage-content.png",
      "/projects/digitalsignage-screens.png"
    ],
    prevSlug: "ibm",
    nextSlug: "homerental"
  },
  homerental: {
    title: "Air Pro by Molekule",
    category: "Technology",
    client: "Molekule Systems",
    date: "May 24 2023",
    author: "Nexoresha",
    mainImage: "/projects/homerental.jpeg",
    heading: "Simplicity, elegance, innovation!",
    paragraphs: [
      "Airbnb connects travelers with unique homes and experiences across the globe.",
      "Whether you're looking for a cozy apartment in the city, a countryside retreat, or a luxurious villa by the beach, Airbnb makes it easy to find the perfect place to stay. Our platform allows hosts to share their spaces with guests while offering travelers a more personal and authentic way to explore new destinations. With thousands of homes and experiences available in cities worldwide, guests can discover places that feel comfortable, welcoming, and truly local. From short weekend getaways to long-term stays, Airbnb provides flexible booking options and a wide range of accommodations to suit every type of traveler. By connecting people through travel, Airbnb helps create meaningful experiences and unforgettable journeys wherever you go. ✈️ 🏠"
    ],
    galleryImages: [
      "/projects/homerental-home.jpeg",
      "/projects/homerental-property.jpeg",
      "/projects/homerental-car.jpeg",
      "/projects/homerental-7.gif"
    ],
    prevSlug: "digitalsignage",
    nextSlug: "bobpay"
  }
};

export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData[slug.toLowerCase()];

  if (!project) {
    notFound();
  }

  return (
    <ProjectDetailPage
      title={project.title}
      category={project.category}
      client={project.client}
      date={project.date}
      author={project.author}
      mainImage={project.mainImage}
      heading={project.heading}
      paragraphs={project.paragraphs}
      galleryImages={project.galleryImages}
      prevSlug={project.prevSlug}
      nextSlug={project.nextSlug}
    />
  );
}
