"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useMotionValue, useSpring } from "framer-motion";

// Custom shader to remove the beige background from the JPEG and render it as a 3D texture
const BackgroundRemovalShader = {
  uniforms: {
    tDiffuse: { value: null },
    uColorKey: { value: new THREE.Color("#e9cdb4") }, // Target beige background color to remove
    uTolerance: { value: 0.15 },
    uClipYMin: { value: 0.0 }, // For slicing the image
    uClipYMax: { value: 1.0 }, // For slicing the image
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      // Give the plane a very slight curvature to make it feel more 3D
      vec3 pos = position;
      pos.z += sin(uv.x * 3.14159) * 0.15;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec3 uColorKey;
    uniform float uTolerance;
    uniform float uClipYMin;
    uniform float uClipYMax;
    
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      if (vUv.y < uClipYMin || vUv.y > uClipYMax) {
        discard; // Cut the image in half (head vs body)
      }

      vec4 texColor = texture2D(tDiffuse, vUv);
      
      // Calculate color distance to background key
      float dist = distance(texColor.rgb, uColorKey);
      
      // Smoothly transition alpha based on tolerance
      float alpha = smoothstep(uTolerance - 0.05, uTolerance + 0.05, dist);
      
      // Add fake 3D shading based on normals to make the 2D image feel volumetric
      float fakeLighting = dot(vNormal, vec3(0.5, 0.5, 1.0)) * 0.5 + 0.5;
      vec3 finalColor = texColor.rgb * fakeLighting;

      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

function ExactRobotImage3D({ mouseX, mouseY, isClicked }: { mouseX: any; mouseY: any; isClicked: boolean }) {
  const headGroup = useRef<THREE.Group>(null);
  const bodyGroup = useRef<THREE.Group>(null);
  
  // Load the exact user image
  const robotTexture = useTexture("/robot.jpg");
  robotTexture.colorSpace = THREE.SRGBColorSpace;

  // Spring physics for mouse tracking
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  // Create unique shader materials for Head (top half) and Body (bottom half)
  const headMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: robotTexture },
        uColorKey: { value: new THREE.Color("#e0c7a8") }, // Adjusted beige match
        uTolerance: { value: 0.18 },
        uClipYMin: { value: 0.45 }, // Only show top 55% (Head)
        uClipYMax: { value: 1.0 },
      },
      vertexShader: BackgroundRemovalShader.vertexShader,
      fragmentShader: BackgroundRemovalShader.fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, [robotTexture]);

  const bodyMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: robotTexture },
        uColorKey: { value: new THREE.Color("#dfc8a8") }, // Adjusted beige match
        uTolerance: { value: 0.18 },
        uClipYMin: { value: 0.0 },
        uClipYMax: { value: 0.45 }, // Only show bottom 45% (Body)
      },
      vertexShader: BackgroundRemovalShader.vertexShader,
      fragmentShader: BackgroundRemovalShader.fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, [robotTexture]);

  useFrame((state) => {
    if (!headGroup.current || !bodyGroup.current) return;
    
    // Calculate intense 3D tracking rotation
    const targetRotX = smoothY.get() * Math.PI * 0.4;
    const targetRotY = smoothX.get() * Math.PI * 0.5;
    
    // HEAD actively tracks the cursor in 3D space
    headGroup.current.rotation.x = targetRotX;
    headGroup.current.rotation.y = targetRotY;
    
    // BODY subtly follows
    bodyGroup.current.rotation.x = targetRotX * 0.1;
    bodyGroup.current.rotation.y = targetRotY * 0.2;

    // Actions on click (Jump/Nod)
    if (isClicked) {
      headGroup.current.position.y = Math.sin(state.clock.elapsedTime * 20) * 0.2;
      bodyGroup.current.position.y = Math.sin(state.clock.elapsedTime * 20) * 0.1;
    } else {
      headGroup.current.position.y = THREE.MathUtils.lerp(headGroup.current.position.y, 0, 0.1);
      bodyGroup.current.position.y = THREE.MathUtils.lerp(bodyGroup.current.position.y, 0, 0.1);
    }
  });

  return (
    <group position={[0, -0.5, 0]} scale={1.8}>
      {/* 3D Body Plane */}
      <group ref={bodyGroup}>
        <mesh material={bodyMaterial}>
          <planeGeometry args={[2, 2.5, 32, 32]} />
        </mesh>
      </group>

      {/* 3D Head Plane (Pivot at neck) */}
      <group ref={headGroup} position={[0, 0, 0.1]}>
        <mesh material={headMaterial}>
          <planeGeometry args={[2, 2.5, 32, 32]} />
        </mesh>
      </group>
    </group>
  );
}

export default function TrackingRobot() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 2.8);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1000);
  };

  return (
    <div 
      className={`fixed bottom-10 left-10 z-40 w-80 h-96 transition-opacity duration-1000 hidden lg:block cursor-pointer ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={handleClick}
      title="Click me!"
    >
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={1} />
        <Environment preset="city" />
        <Float speed={2.5} rotationIntensity={0.1} floatIntensity={0.6}>
          <ExactRobotImage3D mouseX={mouseX} mouseY={mouseY} isClicked={isClicked} />
        </Float>
      </Canvas>
    </div>
  );
}
