"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";
import { Users } from "lucide-react";

// Reusable animated counter component
function Counter({ value, duration = 2.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const counterInterval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const current = Math.round(end * (progress * (2 - progress)));
      
      setCount(current);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(counterInterval);
      }
    }, 1000 / 60);

    return () => clearInterval(counterInterval);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function AboutSection() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!canvasRef.current || !canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const canvas = canvasRef.current;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 10;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
    } catch (e) {
      console.warn("WebGL not supported or context blocked:", e);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ----- WHACK-A-RABBIT GAME SETUP -----
    
    // Adjust camera for a top-down angled view of the game board
    camera.position.set(0, 6, 9);
    camera.lookAt(0, 0, 0);

    const gameGroup = new THREE.Group();
    scene.add(gameGroup);

    // 1. Game Board (Grass)
    const boardGeom = new THREE.BoxGeometry(8, 0.5, 8);
    const boardMat = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.8 }); // vibrant green grass
    const board = new THREE.Mesh(boardGeom, boardMat);
    board.position.y = -0.25;
    gameGroup.add(board);

    // 2. Holes (3x3 Grid)
    const holePositions: THREE.Vector3[] = [];
    const holeRadius = 0.8;
    for (let x = -2.2; x <= 2.2; x += 2.2) {
      for (let z = -2.2; z <= 2.2; z += 2.2) {
        holePositions.push(new THREE.Vector3(x, 0, z));
        
        // Visual hole (dark circle on the grass)
        const holeGeom = new THREE.CylinderGeometry(holeRadius, holeRadius, 0.52, 32);
        const holeMat = new THREE.MeshBasicMaterial({ color: 0x111111 }); // pitch black
        const holeMesh = new THREE.Mesh(holeGeom, holeMat);
        holeMesh.position.set(x, -0.25, z);
        gameGroup.add(holeMesh);
      }
    }

    // 3. Build Low-Poly Rabbit Model
    const rabbitGroup = new THREE.Group();
    
    const rabbitMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    const pinkMat = new THREE.MeshStandardMaterial({ color: 0xff99aa, roughness: 0.4 });
    const blackMat = new THREE.MeshBasicMaterial({ color: 0x000000 });

    // Head
    const headGeom = new THREE.SphereGeometry(0.7, 32, 32);
    const head = new THREE.Mesh(headGeom, rabbitMat);
    head.position.y = 0.7;
    rabbitGroup.add(head);

    // Ears
    const earGeom = new THREE.CapsuleGeometry(0.15, 0.8, 8, 16);
    const leftEar = new THREE.Mesh(earGeom, rabbitMat);
    leftEar.position.set(-0.3, 1.6, -0.1);
    leftEar.rotation.z = 0.2;
    leftEar.rotation.x = -0.1;
    rabbitGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeom, rabbitMat);
    rightEar.position.set(0.3, 1.6, -0.1);
    rightEar.rotation.z = -0.2;
    rightEar.rotation.x = -0.1;
    rabbitGroup.add(rightEar);

    // Inner pink ears
    const innerEarGeom = new THREE.CapsuleGeometry(0.08, 0.6, 8, 16);
    const leftInnerEar = new THREE.Mesh(innerEarGeom, pinkMat);
    leftInnerEar.position.set(-0.3, 1.55, 0.05);
    leftInnerEar.rotation.copy(leftEar.rotation);
    rabbitGroup.add(leftInnerEar);

    const rightInnerEar = new THREE.Mesh(innerEarGeom, pinkMat);
    rightInnerEar.position.set(0.3, 1.55, 0.05);
    rightInnerEar.rotation.copy(rightEar.rotation);
    rabbitGroup.add(rightInnerEar);

    // Nose
    const noseGeom = new THREE.SphereGeometry(0.12, 16, 16);
    const nose = new THREE.Mesh(noseGeom, pinkMat);
    nose.position.set(0, 0.7, 0.68);
    rabbitGroup.add(nose);

    // Eyes
    const eyeGeom = new THREE.SphereGeometry(0.08, 16, 16);
    const leftEye = new THREE.Mesh(eyeGeom, blackMat);
    leftEye.position.set(-0.25, 0.9, 0.55);
    rabbitGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeom, blackMat);
    rightEye.position.set(0.25, 0.9, 0.55);
    rabbitGroup.add(rightEye);

    // Add rabbit to scene (starts hidden underground)
    rabbitGroup.position.copy(holePositions[4]);
    rabbitGroup.position.y = -2;
    gameGroup.add(rabbitGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // Game Logic State variables (kept in closure for animation loop)
    let currentHoleIndex = 4;
    let timeSinceLastPop = 0;
    let rabbitState = "hidden"; // hidden, popping_up, up, going_down
    let isHit = false;

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      if (rabbitState === "hidden" || isHit) return;

      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Check if we hit anything inside the rabbit group
      const intersects = raycaster.intersectObjects(rabbitGroup.children, true);
      
      if (intersects.length > 0) {
        // HIT!
        isHit = true;
        setScore((prev) => prev + 1);
        
        // Instantly flatten the rabbit as a "whack" effect
        rabbitGroup.scale.set(1.5, 0.1, 1.5);
        rabbitGroup.position.y = 0.1;
      }
    };

    container.addEventListener("mousedown", handleClick);

    // Animation loop
    const clock = new THREE.Timer();
    clock.connect(document);
    let animationFrameId: number;

    const animate = () => {
      clock.update();
      const delta = clock.getDelta();
      
      // Game State Machine
      timeSinceLastPop += delta;

      if (rabbitState === "hidden") {
        if (timeSinceLastPop > 1.0) { // stay hidden for 1 second
          // Pick a random new hole
          let nextHole;
          do {
            nextHole = Math.floor(Math.random() * 9);
          } while (nextHole === currentHoleIndex);
          
          currentHoleIndex = nextHole;
          rabbitGroup.position.copy(holePositions[currentHoleIndex]);
          rabbitGroup.position.y = -2; // underground
          rabbitGroup.scale.set(1, 1, 1); // reset scale
          
          isHit = false;
          rabbitState = "popping_up";
          timeSinceLastPop = 0;
        }
      } else if (rabbitState === "popping_up") {
        rabbitGroup.position.y += delta * 8; // slide up fast
        if (rabbitGroup.position.y >= 0) {
          rabbitGroup.position.y = 0;
          rabbitState = "up";
          timeSinceLastPop = 0;
        }
      } else if (rabbitState === "up") {
        if (!isHit && timeSinceLastPop > 1.2) { // stay up for 1.2 seconds if not hit
          rabbitState = "going_down";
        } else if (isHit && timeSinceLastPop > 0.5) { // if hit, stay flattened for 0.5 seconds before resetting
          rabbitState = "hidden";
          timeSinceLastPop = 0;
        }
      } else if (rabbitState === "going_down") {
        rabbitGroup.position.y -= delta * 6; // slide down
        if (rabbitGroup.position.y <= -2) {
          rabbitGroup.position.y = -2;
          rabbitState = "hidden";
          timeSinceLastPop = 0;
        }
      }

      // Gentle floating animation of the entire board for visual flair
      const elapsed = clock.getElapsed();
      gameGroup.position.y = Math.sin(elapsed * 1.5) * 0.1;
      gameGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvasContainerRef.current) return;
      width = canvasContainerRef.current.clientWidth;
      height = canvasContainerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("mousedown", handleClick);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }
      
      // Cleanup geometries and materials
      boardGeom.dispose();
      boardMat.dispose();
      headGeom.dispose();
      earGeom.dispose();
      innerEarGeom.dispose();
      noseGeom.dispose();
      eyeGeom.dispose();
      rabbitMat.dispose();
      pinkMat.dispose();
      blackMat.dispose();
    };
  }, []);

  return (
    <section id="about" className="theme-light relative w-full py-24 md:py-32 bg-maroon-black/50 border-t border-warm-beige/5 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Text & Stats Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <span className="text-xs font-display font-bold uppercase tracking-widest text-luxury-gold mb-4">
              Behind The Scenes
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gradient-beige mb-6 leading-tight">
              <span className="font-light italic text-warm-beige/70">Your Trusted Source For </span><br />Software Development
            </h2>
            <p className="text-sm md:text-base font-sans text-warm-beige/65 mb-6 leading-relaxed">
              We are a software development company dedicated to transforming ideas into scalable, secure, and high-impact digital solutions. Our team of experienced developers, designers, and problem-solvers delivers end-to-end software services — from requirement analysis and UI/UX design to development, deployment, and long-term maintenance. We focus on building reliable, user-friendly products that simplify business processes, improve efficiency, and create meaningful digital experiences.
            </p>
            <p className="text-sm md:text-base font-sans text-warm-beige/65 mb-8 leading-relaxed">
              With expertise across modern technology stacks, we develop high-performance web and mobile applications, cloud-based platforms, and enterprise systems tailored to your business needs. Whether you are a startup building your first product or an enterprise upgrading legacy systems, we work as your technology partner to drive digital transformation, ensure scalability, and support sustainable growth through future-ready solutions.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-warm-beige/10">
              <div className="flex flex-col">
                <div className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-gradient-beige mb-1">
                  <Counter value={200} />+
                </div>
                <div className="text-[10px] md:text-xs font-display font-bold uppercase tracking-widest text-warm-beige/40">
                  Projects
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-gradient-beige mb-1">
                  <Counter value={50} />+
                </div>
                <div className="text-[10px] md:text-xs font-display font-bold uppercase tracking-widest text-warm-beige/40">
                  Clients
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-gradient-beige mb-1">
                  <Counter value={5} />+
                </div>
                <div className="text-[10px] md:text-xs font-display font-bold uppercase tracking-widest text-warm-beige/40">
                  Years
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right 3D Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0 }}
            className="w-full h-[350px] md:h-[500px] flex items-center justify-center relative rounded-3xl overflow-hidden glass-card"
          >
            {/* Interactive Game Container */}
            <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full flex items-center justify-center cursor-crosshair">
              <canvas ref={canvasRef} className="block w-full h-full" />
            </div>

            {/* Whack-a-Rabbit Scoreboard Overlay */}
            <div className="absolute top-6 left-6 p-4 rounded-xl glass-panel border-warm-beige/20 flex flex-col items-center justify-center min-w-[120px] pointer-events-none select-none shadow-2xl bg-maroon-black/80">
              <div className="text-[10px] font-display font-bold uppercase tracking-widest text-luxury-gold mb-1">
                Whack-A-Rabbit
              </div>
              <div className="text-3xl font-display font-extrabold text-warm-beige">
                Score: {score}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
