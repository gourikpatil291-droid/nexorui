"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Get exact container dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Setup Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0A0203, 0.015);

    // Setup Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 25;

    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // 1. Create 3D Coder Robot Group (matching reference image)
    const robotGroup = new THREE.Group();
    robotGroup.position.set(0, -2, 0);
    scene.add(robotGroup);

    // Materials matching reference image color scheme
    const creamMaterial = new THREE.MeshStandardMaterial({
      color: 0xD5C5AE, // Butterscotch cream/beige main body armor
      metalness: 0.15,
      roughness: 0.45,
    });

    const maroonMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B222B, // Worn maroon accent plates
      metalness: 0.5,
      roughness: 0.35,
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x242426, // Dark steel grey skeleton/joints
      metalness: 0.8,
      roughness: 0.35,
    });

    const silverMaterial = new THREE.MeshStandardMaterial({
      color: 0xCCCCCC, // Silver laptop body
      metalness: 0.8,
      roughness: 0.2,
    });

    const screenGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xBE9DF7, // Glowing light neon purple screen
    });

    const eyeMaterial = new THREE.MeshBasicMaterial({
      color: 0xC5A880, // Bright glowing golden yellow eyes
    });

    // Torso / Body structure
    const torsoGroup = new THREE.Group();
    robotGroup.add(torsoGroup);

    // Main chest (Cream/Beige cylinder)
    const bodyGeometry = new THREE.CylinderGeometry(2.2, 1.8, 4.0, 16);
    const bodyMesh = new THREE.Mesh(bodyGeometry, creamMaterial);
    torsoGroup.add(bodyMesh);

    // Maroon collar/neck guard
    const collarGeometry = new THREE.CylinderGeometry(1.6, 2.3, 1.0, 16);
    const collarMesh = new THREE.Mesh(collarGeometry, maroonMaterial);
    collarMesh.position.y = 2.0;
    torsoGroup.add(collarMesh);

    // Dark grey ab joint
    const abGeometry = new THREE.SphereGeometry(1.3, 16, 16);
    const abMesh = new THREE.Mesh(abGeometry, metalMaterial);
    abMesh.position.y = -2.2;
    torsoGroup.add(abMesh);

    // Neck joint (metal)
    const neckGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.2, 16);
    const neckMesh = new THREE.Mesh(neckGeometry, metalMaterial);
    neckMesh.position.y = 2.6;
    torsoGroup.add(neckMesh);

    // Head Group (tracks the cursor)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 3.8, 0);
    robotGroup.add(headGroup);

    // Spherical helmet (Cream/Beige sphere)
    const headGeometry = new THREE.SphereGeometry(1.7, 32, 32);
    const headMesh = new THREE.Mesh(headGeometry, creamMaterial);
    headGroup.add(headMesh);

    // Maroon visor band
    const visorFrameGeometry = new THREE.CylinderGeometry(1.72, 1.72, 0.9, 32, 1, false, -Math.PI/2, Math.PI);
    visorFrameGeometry.rotateX(Math.PI/2);
    const visorFrameMesh = new THREE.Mesh(visorFrameGeometry, maroonMaterial);
    visorFrameMesh.position.set(0, 0, 0.05);
    headGroup.add(visorFrameMesh);

    // Visor screen (Dark grey/black visor window)
    const visorGeometry = new THREE.BoxGeometry(2.2, 0.6, 0.3);
    const visorMesh = new THREE.Mesh(visorGeometry, metalMaterial);
    visorMesh.position.set(0, 0, 1.55);
    headGroup.add(visorMesh);

    // Glowing Eyes (Two gold rectangular visor lights)
    const eyeGeometry = new THREE.BoxGeometry(0.5, 0.25, 0.1);
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.5, 0, 1.7);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.5, 0, 1.7);
    headGroup.add(leftEye);
    headGroup.add(rightEye);

    // Ears (Maroon circular plates on sides)
    const earGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.3, 16);
    earGeometry.rotateZ(Math.PI/2);
    const leftEar = new THREE.Mesh(earGeometry, maroonMaterial);
    leftEar.position.set(-1.65, 0, 0);
    const rightEar = new THREE.Mesh(earGeometry, maroonMaterial);
    rightEar.position.set(1.65, 0, 0);
    headGroup.add(leftEar);
    headGroup.add(rightEar);

    // Antenna on left ear
    const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8);
    const antennaMesh = new THREE.Mesh(antennaGeometry, metalMaterial);
    antennaMesh.position.set(-1.7, 1.0, 0);
    antennaMesh.rotateZ(-0.2); // angled outwards
    headGroup.add(antennaMesh);
    const antennaTipGeometry = new THREE.SphereGeometry(0.12);
    const antennaTip = new THREE.Mesh(antennaTipGeometry, eyeMaterial);
    antennaTip.position.set(-1.7 - 1.5*Math.sin(0.2), 1.0 + 1.5*Math.cos(0.2), 0);
    headGroup.add(antennaTip);

    // Arms & Hands Setup (hanging naturally at sides)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-2.6, 1.2, 0);
    leftArmGroup.rotation.z = 0.08;
    robotGroup.add(leftArmGroup);

    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(2.6, 1.2, 0);
    rightArmGroup.rotation.z = -0.08;
    robotGroup.add(rightArmGroup);

    // Large rounded shoulder plates (Maroon)
    const shoulderGeometry = new THREE.SphereGeometry(0.9, 16, 16);
    const leftShoulder = new THREE.Mesh(shoulderGeometry, maroonMaterial);
    leftArmGroup.add(leftShoulder);
    const rightShoulder = new THREE.Mesh(shoulderGeometry, maroonMaterial);
    rightArmGroup.add(rightShoulder);

    // Upper arms (Cream cylinder - hanging down)
    const upperArmGeometry = new THREE.CylinderGeometry(0.35, 0.35, 1.8, 8);
    const leftUpperArm = new THREE.Mesh(upperArmGeometry, creamMaterial);
    leftUpperArm.position.set(0, -0.9, 0);
    leftArmGroup.add(leftUpperArm);
    
    const rightUpperArm = new THREE.Mesh(upperArmGeometry, creamMaterial);
    rightUpperArm.position.set(0, -0.9, 0);
    rightArmGroup.add(rightUpperArm);

    // Elbow joints (metal)
    const elbowGeometry = new THREE.SphereGeometry(0.4, 8, 8);
    const leftElbow = new THREE.Mesh(elbowGeometry, metalMaterial);
    leftElbow.position.set(0, -1.8, 0);
    leftArmGroup.add(leftElbow);

    const rightElbow = new THREE.Mesh(elbowGeometry, metalMaterial);
    rightElbow.position.set(0, -1.8, 0);
    rightArmGroup.add(rightElbow);

    // Forearms (Maroon cylinder - hanging down)
    const forearmGeometry = new THREE.CylinderGeometry(0.4, 0.35, 1.8, 8);
    const leftForearm = new THREE.Mesh(forearmGeometry, maroonMaterial);
    leftForearm.position.set(0, -2.7, 0);
    leftArmGroup.add(leftForearm);

    const rightForearm = new THREE.Mesh(forearmGeometry, maroonMaterial);
    rightForearm.position.set(0, -2.7, 0);
    rightArmGroup.add(rightForearm);

    // Palms (metal - hanging down)
    const handGeometry = new THREE.BoxGeometry(0.7, 0.4, 0.7);
    const leftHand = new THREE.Mesh(handGeometry, metalMaterial);
    leftHand.position.set(0, -3.7, 0);
    leftArmGroup.add(leftHand);

    const rightHand = new THREE.Mesh(handGeometry, metalMaterial);
    rightHand.position.set(0, -3.7, 0);
    rightArmGroup.add(rightHand);

    // Fingers resting down
    const fingerGeometry = new THREE.BoxGeometry(0.12, 0.4, 0.12);
    for (let i = 0; i < 3; i++) {
      const lf = new THREE.Mesh(fingerGeometry, metalMaterial);
      lf.position.set(-0.2 + i * 0.2, -0.4, 0);
      leftHand.add(lf);

      const rf = new THREE.Mesh(fingerGeometry, metalMaterial);
      rf.position.set(-0.2 + i * 0.2, -0.4, 0);
      rightHand.add(rf);
    }

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0xE6D5C3, 400, 100); // Warm Beige glowing light
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x7B1822, 600, 100); // Deep Maroon glowing light
    light2.position.set(-15, -10, -10);
    scene.add(light2);

    const directionalLight = new THREE.DirectionalLight(0xC5A880, 2.5); // Gold directional highlights
    directionalLight.position.set(0, 5, 15);
    scene.add(directionalLight);

    // Mouse positions for parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize values between -1 and 1
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow interpolation (lerp)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Apply subtle parallax rotation based on mouse coordinates
      scene.rotation.y = targetX * 0.15;
      scene.rotation.x = -targetY * 0.15;

      // Rotate the entire robot slightly over time for a floating feel
      robotGroup.rotation.y = Math.sin(elapsedTime * 0.5) * 0.08;
      robotGroup.position.y = -2 + Math.cos(elapsedTime * 1.2) * 0.15;

      // Animate Head tracking the cursor (smooth interpolation)
      headGroup.rotation.y = targetX * 0.65;
      headGroup.rotation.x = -targetY * 0.35;

      // Gentle floating/breathing animation for arms
      leftArmGroup.rotation.z = 0.08 + Math.sin(elapsedTime * 1.5) * 0.015;
      rightArmGroup.rotation.z = -0.08 - Math.sin(elapsedTime * 1.5) * 0.015;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
      bodyGeometry.dispose();
      collarGeometry.dispose();
      abGeometry.dispose();
      neckGeometry.dispose();
      headGeometry.dispose();
      visorFrameGeometry.dispose();
      visorGeometry.dispose();
      eyeGeometry.dispose();
      earGeometry.dispose();
      antennaGeometry.dispose();
      antennaTipGeometry.dispose();
      shoulderGeometry.dispose();
      upperArmGeometry.dispose();
      elbowGeometry.dispose();
      forearmGeometry.dispose();
      handGeometry.dispose();
      fingerGeometry.dispose();
      // Laptop geometries removed
      
      creamMaterial.dispose();
      maroonMaterial.dispose();
      metalMaterial.dispose();
      silverMaterial.dispose();
      screenGlowMaterial.dispose();
      eyeMaterial.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-[2] overflow-hidden">
      {/* Background Soft Glows (Ambient lights) */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-maroon/15 blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-warm-beige/5 blur-[130px] animate-pulse-slow pointer-events-none" />
      
      <canvas ref={canvasRef} className="block w-full h-full opacity-80" />
    </div>
  );
}
