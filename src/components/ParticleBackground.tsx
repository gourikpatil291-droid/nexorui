"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleBackground({ 
  colorRGB = "123, 24, 34",
  fogHex = 0x0A0203 
}: { 
  colorRGB?: string;
  fogHex?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Setup Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(fogHex, 0.015);

    // Setup Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 25;

    // Setup Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("WebGL not supported or context blocked:", e);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Floating Particles Field
    const particleCount = 450;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 50;     // X
      particlePositions[i + 1] = (Math.random() - 0.5) * 50; // Y
      particlePositions[i + 2] = (Math.random() - 0.5) * 50; // Z
      particleSpeeds[i / 3] = 0.02 + Math.random() * 0.03;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    // Custom Canvas Texture for Particles (Circular dots instead of squares)
    const createCircleTexture = () => {
      const size = 16;
      const canvasEl = document.createElement("canvas");
      canvasEl.width = size;
      canvasEl.height = size;
      const ctx = canvasEl.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
        gradient.addColorStop(0, `rgba(${colorRGB}, 1)`);
        gradient.addColorStop(0.3, `rgba(${colorRGB}, 0.8)`);
        gradient.addColorStop(1, `rgba(${colorRGB}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvasEl);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.45,
      map: createCircleTexture(),
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse positions for parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    const clock = new THREE.Timer();
    clock.connect(document);
    let animationFrameId: number;

    const animate = () => {
      clock.update();
      const elapsedTime = clock.getElapsed();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      scene.rotation.y = targetX * 0.15;
      scene.rotation.x = -targetY * 0.15;

      // Particle animation (slow drift upwards)
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i + 1] += particleSpeeds[i / 3] * 0.25;
        positions[i] += Math.sin(elapsedTime + i) * 0.005;

        if (positions[i + 1] > 25) {
          positions[i + 1] = -25;
          positions[i] = (Math.random() - 0.5) * 50;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      renderer.forceContextLoss();
      particleGeometry.dispose();
      particleMaterial.map?.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full opacity-80" />
    </div>
  );
}
