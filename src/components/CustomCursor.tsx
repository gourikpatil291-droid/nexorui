"use client";

import { useEffect, useState, useRef } from "react";
import * as THREE from "three";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", () => setIsVisible(false));
    document.addEventListener("mouseenter", () => setIsVisible(true));
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;
    
    // Setup Toy Car variables
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let car3D: THREE.Group | null = null;
    let animationId: number;
    let targetRotationAngle = 0;
    
    let smokeCanvas: HTMLCanvasElement | null = null;
    let smokeCtx: CanvasRenderingContext2D | null = null;
    let smokeParticles: any[] = [];
    
    let lastCarX: number | null = null;
    let lastCarY: number | null = null;
    
    let currentAngle = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    
    let currentDrift = 0;
    let targetDrift = 0;

    const $cursor = cursorRef.current;

    // 1. Create WebGL canvas container inside cursor element
    const canvasContainer = document.createElement('div');
    canvasContainer.className = 'mil-toy-car-canvas-container';
    canvasContainer.style.width = '80px';
    canvasContainer.style.height = '80px';
    canvasContainer.style.position = 'absolute';
    canvasContainer.style.top = '50%';
    canvasContainer.style.left = '50%';
    canvasContainer.style.transform = 'translate(-50%, -50%)';
    canvasContainer.style.pointerEvents = 'none';
    $cursor.appendChild(canvasContainer);

    // 2. Setup Three.js WebGL Scene & Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(38, 1, 0.1, 10);
    camera.position.set(2.8, 2.4, 3.6);
    camera.lookAt(0, 0.35, 0);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(80, 80);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight.position.set(6, 10, 6);
    scene.add(dirLight);

    // 3. Build Low-Poly 3D Toy Car Group
    car3D = new THREE.Group();

    const bodyMat = new THREE.MeshLambertMaterial({ color: 0x8b222b }); // Maroon Chassis
    const roofMat = new THREE.MeshLambertMaterial({ color: 0x1A0D2A }); // Dark Roof
    const glassMat = new THREE.MeshLambertMaterial({ color: 0x80deea, emissive: 0x00bcd4, emissiveIntensity: 0.15 }); // Windows
    const tireMat = new THREE.MeshLambertMaterial({ color: 0x181818 }); // Tires
    const hubcapMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.25, metalness: 0.7 }); // Chrome parts

    // Chassis
    const bodyMesh = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.65, 1.25), bodyMat);
    bodyMesh.position.y = 0.35;
    car3D.add(bodyMesh);

    // Cabin
    const cabinMesh = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.55, 1.05), roofMat);
    cabinMesh.position.set(-0.15, 0.95, 0);
    car3D.add(cabinMesh);

    // Windows
    const windshieldMesh = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.95), glassMat);
    windshieldMesh.position.set(0.42, 0.95, 0);
    windshieldMesh.rotation.z = -0.32;
    car3D.add(windshieldMesh);

    const sideWinMesh = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.32, 1.07), glassMat);
    sideWinMesh.position.set(-0.2, 0.95, 0);
    car3D.add(sideWinMesh);

    const rearWinMesh = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.9), glassMat);
    rearWinMesh.position.set(-0.74, 0.95, 0);
    rearWinMesh.rotation.z = 0.2;
    car3D.add(rearWinMesh);

    // Front and Rear Bumpers
    const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 1.4), hubcapMat);
    frontBumper.position.set(1.1, 0.22, 0);
    car3D.add(frontBumper);

    const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 1.4), hubcapMat);
    rearBumper.position.set(-1.1, 0.22, 0);
    car3D.add(rearBumper);

    // Headlights and Taillights
    const headL = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0xfffde7 }));
    headL.position.set(1.05, 0.45, 0.4);
    car3D.add(headL);

    const headR = headL.clone();
    headR.position.z = -0.4;
    car3D.add(headR);

    const tailL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.22), new THREE.MeshBasicMaterial({ color: 0xff1744 }));
    tailL.position.set(-1.05, 0.48, 0.42);
    car3D.add(tailL);

    const tailR = tailL.clone();
    tailR.position.z = -0.42;
    car3D.add(tailR);

    // Wheels
    const wheelGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 16);
    wheelGeom.rotateX(Math.PI / 2);
    const wheelsPos = [
        { x: 0.65, z: 0.65 },  { x: 0.65, z: -0.65 },
        { x: -0.65, z: 0.65 }, { x: -0.65, z: -0.65 }
    ];
    wheelsPos.forEach((pos) => {
        const wGroup = new THREE.Group();
        wGroup.position.set(pos.x, 0.22, pos.z);
        wGroup.add(new THREE.Mesh(wheelGeom, tireMat));
        
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.24, 8), hubcapMat);
        cap.geometry.rotateX(Math.PI / 2);
        wGroup.add(cap);
        car3D!.add(wGroup);
    });

    scene.add(car3D);

    // Create Smoke Overlay Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'mil-smoke-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9998'; // Below the main cursor dot
    document.body.appendChild(canvas);
    smokeCanvas = canvas;
    smokeCtx = canvas.getContext('2d');
    
    const resizeSmokeCanvas = () => {
        if (smokeCanvas) {
            smokeCanvas.width = window.innerWidth;
            smokeCanvas.height = window.innerHeight;
        }
    };
    resizeSmokeCanvas();
    window.addEventListener('resize', resizeSmokeCanvas);

    function render3DLoop() {
        if (!renderer || !scene || !camera || !car3D || !cursorRef.current) return;

        const rect = cursorRef.current.getBoundingClientRect();
        const carX = rect.left + rect.width / 2;
        const carY = rect.top + rect.height / 2;

        if (lastCarX === null || lastCarY === null) {
            lastCarX = carX;
            lastCarY = carY;
        } else {
            const dx = carX - lastCarX;
            const dy = carY - lastCarY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 0.15) {
                targetRotationAngle = -Math.atan2(dy, dx);

                targetTiltX = Math.min(Math.max(-dy * 0.045, -0.35), 0.35);
                targetTiltY = Math.min(Math.max(dx * 0.045, -0.35), 0.35);

                let turnRate = targetRotationAngle - currentAngle;
                while (turnRate < -Math.PI) turnRate += Math.PI * 2;
                while (turnRate > Math.PI) turnRate -= Math.PI * 2;

                targetDrift = Math.min(Math.max(turnRate * 1.6, -0.55), 0.55);
                targetTiltY += turnRate * 0.65;

                if (smokeCtx) {
                    const phi = -currentAngle;
                    const ox = -Math.cos(phi) * 22, oy = -Math.sin(phi) * 22;
                    const sx = Math.sin(phi) * 6, sy = -Math.cos(phi) * 6;

                    if (dist > 0.5) {
                        smokeParticles.push({
                            x: carX + ox + sx, y: carY + oy + sy,
                            vx: -dx * 0.12 + (Math.random() - 0.5) * 0.6,
                            vy: -dy * 0.12 - 0.25,
                            radius: 2, maxRadius: 12, alpha: 0.6, decay: 0.02,
                            color: { r: 155, g: 130, b: 110 }
                        });
                    }

                    if (Math.abs(turnRate) > 0.08 && dist > 1.2) {
                        const rx = -Math.cos(phi) * 16, ry = -Math.sin(phi) * 16;
                        const wx = Math.sin(phi) * 14, wy = -Math.cos(phi) * 14;
                        const wlX = carX + rx - wx, wlY = carY + ry - wy;
                        const wrX = carX + rx + wx, wrY = carY + ry + wy;

                        smokeParticles.push({
                            x: wlX, y: wlY, vx: -dx * 0.15 - turnRate * 3.5, vy: -dy * 0.15,
                            radius: 3, maxRadius: 18, alpha: 0.75, decay: 0.015, color: { r: 240, g: 240, b: 240 }
                        });
                        smokeParticles.push({
                            x: wrX, y: wrY, vx: -dx * 0.15 - turnRate * 3.5, vy: -dy * 0.15,
                            radius: 3, maxRadius: 18, alpha: 0.75, decay: 0.015, color: { r: 240, g: 240, b: 240 }
                        });
                    }
                }
            }
            lastCarX = carX;
            lastCarY = carY;
        }

        let angleDiff = targetRotationAngle - currentAngle;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        currentAngle += angleDiff * 0.15;

        currentDrift += (targetDrift - currentDrift) * 0.12;
        targetDrift *= 0.88;

        currentTiltX += (targetTiltX - currentTiltX) * 0.12;
        currentTiltY += (targetTiltY - currentTiltY) * 0.12;
        targetTiltX *= 0.88;
        targetTiltY *= 0.88;

        car3D.position.y = 0.1 + Math.sin(Date.now() * 0.0035) * 0.04;
        car3D.rotation.y = currentAngle + currentDrift;
        car3D.rotation.z = currentTiltX + Math.cos(Date.now() * 0.002) * 0.025;
        car3D.rotation.x = currentTiltY;

        renderer.render(scene, camera);

        if (smokeCtx && smokeCanvas) {
            smokeCtx.clearRect(0, 0, smokeCanvas.width, smokeCanvas.height);
            for (let i = smokeParticles.length - 1; i >= 0; i--) {
                const p = smokeParticles[i];
                p.x += p.vx; p.y += p.vy;
                p.radius += (p.maxRadius - p.radius) * 0.06;
                p.alpha -= p.decay;

                if (p.alpha <= 0) {
                    smokeParticles.splice(i, 1);
                    continue;
                }

                const grad = smokeCtx.createRadialGradient(p.x, p.y, p.radius * 0.1, p.x, p.y, p.radius);
                grad.addColorStop(0, 'rgba(' + p.color.r + ',' + p.color.g + ',' + p.color.b + ',' + p.alpha + ')');
                grad.addColorStop(1, 'rgba(' + (p.color.r - 20) + ',' + (p.color.g - 20) + ',' + (p.color.b - 20) + ', 0)');

                smokeCtx.beginPath();
                smokeCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                smokeCtx.fillStyle = grad;
                smokeCtx.fill();
            }
        }

        animationId = requestAnimationFrame(render3DLoop);
    }
    
    render3DLoop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeSmokeCanvas);
      if (smokeCanvas && smokeCanvas.parentNode) {
        smokeCanvas.parentNode.removeChild(smokeCanvas);
      }
      if (renderer) {
        renderer.dispose();
      }
      if (canvasContainer && canvasContainer.parentNode) {
        canvasContainer.parentNode.removeChild(canvasContainer);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`mil-ball fixed pointer-events-none z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} hidden md:block`}
      style={{
        left: position.x,
        top: position.y,
        width: 1,
        height: 1,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
