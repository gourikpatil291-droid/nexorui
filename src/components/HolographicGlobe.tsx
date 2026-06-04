"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HolographicGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $container = containerRef.current;
    if (!$container) return;

    $container.style.opacity = '0.96';
    $container.style.width = '600px';
    $container.style.height = '600px';
    $container.innerHTML = ''; // Clear fallback shapes

    const holoScene = new THREE.Scene();
    const holoCamera = new THREE.PerspectiveCamera(40, 1, 0.1, 10);
    holoCamera.position.set(0, 0, 4.4);

    const holoRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    holoRenderer.setSize(600, 600);
    holoRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    $container.appendChild(holoRenderer.domElement);

    const tiltGroup = new THREE.Group();
    const holoGroup = new THREE.Group();
    
    // Make the globe and its axis bigger
    holoGroup.scale.set(1.4, 1.4, 1.4);

    // 1. Constellation Nodes
    const dodecaGeom = new THREE.DodecahedronGeometry(1.2, 0);
    const posAttr = dodecaGeom.attributes.position;
    const uniqueVertices: {x: number, y: number, z: number}[] = [];

    for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i), y = posAttr.getY(i), z = posAttr.getZ(i);
        let duplicate = false;
        for (let j = 0; j < uniqueVertices.length; j++) {
            const v = uniqueVertices[j];
            if (Math.abs(v.x - x) < 0.001 && Math.abs(v.y - y) < 0.001 && Math.abs(v.z - z) < 0.001) {
                duplicate = true; break;
            }
        }
        if (!duplicate) uniqueVertices.push({ x, y, z });
    }

    const nodeMeshes: THREE.Mesh[] = [];
    uniqueVertices.forEach((v, idx) => {
        // Colors: Burgundy (0x6b1d1d), Champagne (0xeae2d5), White (0xffffff)
        const nodeColor = (idx % 3 === 1) ? 0x6b1d1d : (idx % 3 === 2 ? 0xeae2d5 : 0xffffff);
        const nodeMat = new THREE.MeshBasicMaterial({ color: nodeColor, transparent: true, opacity: 0.95 });
        const node = new THREE.Mesh(new THREE.SphereGeometry(0.042, 12, 12), nodeMat);
        node.position.set(v.x, v.y, v.z);
        holoGroup.add(node);
        nodeMeshes.push(node);
    });

    const wavePointsCount = 120;
    // 2. Sine-Wave Rippling Line
    const wavePositions = new Float32Array(wavePointsCount * 3);
    for (let k = 0; k < wavePointsCount; k++) {
        const angle = (k / wavePointsCount) * Math.PI * 2;
        wavePositions[k * 3] = Math.cos(angle) * 0.95;
        wavePositions[k * 3 + 1] = 0;
        wavePositions[k * 3 + 2] = Math.sin(angle) * 0.95;
    }
    const waveGeom = new THREE.BufferGeometry();
    waveGeom.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
    const waveLine = new THREE.LineLoop(waveGeom, new THREE.LineBasicMaterial({ color: 0x6b1d1d, transparent: true, opacity: 0.85 }));
    holoGroup.add(waveLine);

    // 3. Gyroscopic HUD Rings & Satellite with Trails
    const r1 = new THREE.Mesh(new THREE.RingGeometry(1.4, 1.41, 64), new THREE.MeshBasicMaterial({ color: 0x6b1d1d, transparent: true, opacity: 0.22, side: THREE.DoubleSide }));
    r1.rotation.x = Math.PI / 2.5;
    holoGroup.add(r1);

    const r2 = new THREE.Mesh(new THREE.RingGeometry(1.65, 1.66, 64), new THREE.MeshBasicMaterial({ color: 0xbcaaa4, transparent: true, opacity: 0.18, side: THREE.DoubleSide }));
    r2.rotation.y = Math.PI / 3;
    holoGroup.add(r2);

    const satellite = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.98 }));
    holoGroup.add(satellite);

    const trailMeshes: THREE.Mesh[] = [];
    const satelliteHistory: THREE.Vector3[] = [];
    for (let t = 0; t < 8; t++) {
        const trail = new THREE.Mesh(new THREE.SphereGeometry(0.045 * (1.0 - (t + 1) / 9), 8, 8), new THREE.MeshBasicMaterial({ color: t % 2 === 0 ? 0xffffff : 0xeae2d5, transparent: true, opacity: 0.8 * (1.0 - (t + 1) / 8) }));
        holoGroup.add(trail);
        trailMeshes.push(trail);
    }

    // 4. Double Helix Swirl Particles (200 particles)
    const particleCount = 200;
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const particleMetadata: any[] = [];
    for (let p = 0; p < particleCount; p++) {
        const theta = Math.random() * Math.PI * 2;
        const radius = 0.5 + Math.random() * 0.9;
        const yHeight = (Math.random() - 0.5) * 2.2;
        particleMetadata.push({ theta: theta, radius: radius, yHeight: yHeight, speed: 0.012 + Math.random() * 0.015, helicalPhase: Math.random() > 0.5 ? 0 : Math.PI });

        pPositions[p*3] = Math.cos(theta) * radius; pPositions[p*3+1] = yHeight; pPositions[p*3+2] = Math.sin(theta) * radius;

        const rand = Math.random();
        pColors[p*3] = rand < 0.5 ? 1.0 : (rand < 0.8 ? 0.92 : 0.42);
        pColors[p*3+1] = rand < 0.5 ? 1.0 : (rand < 0.8 ? 0.88 : 0.11);
        pColors[p*3+2] = rand < 0.5 ? 1.0 : (rand < 0.8 ? 0.83 : 0.11);
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeom.setAttribute('color', new THREE.BufferAttribute(pColors, 3));
    const vortexPoints = new THREE.Points(pGeom, new THREE.PointsMaterial({ size: 0.055, vertexColors: true, transparent: true, opacity: 0.95 }));
    holoGroup.add(vortexPoints);

    // 5. Central Breathing Core
    const coreMesh = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), new THREE.MeshBasicMaterial({ color: 0x8b222b, transparent: true, opacity: 0.45 }));
    holoGroup.add(coreMesh);

    tiltGroup.add(holoGroup);
    holoScene.add(tiltGroup);

    let mouseX = 0, mouseY = 0, lastMouseX = 0, lastMouseY = 0;
    let mouseSpeed = 0, waveHoloTime = 0;
    let satelliteAngle = 0;
    let holoAnimationId: number;

    const onHoloMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    document.addEventListener('mousemove', onHoloMouseMove);

    function renderHoloLoop() {
        if (!holoRenderer) return;

        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        mouseSpeed += (Math.sqrt(dx*dx + dy*dy) - mouseSpeed) * 0.12;
        if (mouseSpeed > 0.4) mouseSpeed = 0.4;
        lastMouseX = mouseX; lastMouseY = mouseY;

        const speedFactor = 1.0 + mouseSpeed * 4.5;
        waveHoloTime += 0.016 * speedFactor;
        satelliteAngle += 0.016 * speedFactor;

        // Spins
        holoGroup.rotation.y += 0.0035 * speedFactor;
        holoGroup.rotation.x += 0.0016 * speedFactor;

        // Inertial Tilt Response
        tiltGroup.rotation.x += (mouseY * 0.45 - tiltGroup.rotation.x) * 0.05;
        tiltGroup.rotation.y += (mouseX * 0.45 - tiltGroup.rotation.y) * 0.05;

        // Breathing Nodes
        nodeMeshes.forEach((node, idx) => {
            const scaleVal = 1.0 + 0.32 * Math.sin(waveHoloTime * 3.5 + idx * 0.45);
            node.scale.set(scaleVal, scaleVal, scaleVal);
            (node.material as THREE.Material).opacity = 0.85 + 0.15 * Math.cos(waveHoloTime * 2.5 + idx * 0.65);
        });

        // Rippling Analytics Ring
        const wavePosAttr = waveLine.geometry.attributes.position;
        for (let w = 0; w < wavePointsCount; w++) {
            const angle = (w / wavePointsCount) * Math.PI * 2;
            wavePosAttr.setY(w, Math.sin(angle * 5 + waveHoloTime * 4.2) * 0.14 + Math.cos(angle * 10 - waveHoloTime * 2.8) * 0.04);
        }
        wavePosAttr.needsUpdate = true;

        // Orbit Tracking Satellites
        const satX = Math.cos(satelliteAngle * 1.2) * 1.65;
        const satZ = Math.sin(satelliteAngle * 1.2) * 1.65;
        satellite.position.set(satX * Math.cos(Math.PI / 3), satZ, satX * Math.sin(Math.PI / 3));

        satelliteHistory.unshift(satellite.position.clone());
        if (satelliteHistory.length > 9) satelliteHistory.pop();

        for (let t = 0; t < trailMeshes.length; t++) {
            if (satelliteHistory[t + 1]) {
                trailMeshes[t].position.copy(satelliteHistory[t + 1]);
                trailMeshes[t].visible = true;
            } else {
                trailMeshes[t].visible = false;
            }
        }

        // Swirling Helix vortex points
        const pPosAttr = vortexPoints.geometry.attributes.position;
        for (let p = 0; p < particleMetadata.length; p++) {
            const meta = particleMetadata[p];
            meta.theta += meta.speed * speedFactor;
            meta.yHeight += 0.006 * speedFactor;
            if (meta.yHeight > 1.2) meta.yHeight = -1.2;

            const currentRadius = meta.radius * (1.0 + 0.16 * Math.sin(meta.theta * 2 + meta.helicalPhase));
            pPosAttr.setX(p, Math.cos(meta.theta) * currentRadius);
            pPosAttr.setY(p, meta.yHeight);
            pPosAttr.setZ(p, Math.sin(meta.theta) * currentRadius);
        }
        pPosAttr.needsUpdate = true;

        // Breathing Core
        coreMesh.scale.setScalar(1.0 + 0.065 * Math.sin(waveHoloTime * 2.8));

        holoRenderer.render(holoScene, holoCamera);
        holoAnimationId = requestAnimationFrame(renderHoloLoop);
    }

    renderHoloLoop();

    return () => {
      cancelAnimationFrame(holoAnimationId);
      document.removeEventListener('mousemove', onHoloMouseMove);
      if (holoRenderer) holoRenderer.dispose();
      $container.innerHTML = '';
    };
  }, []);

  return (
    <div className="relative flex justify-center items-center pointer-events-none z-0">
      <div ref={containerRef} className="mil-animation mil-position-4 pointer-events-none" />
    </div>
  );
}
