'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Geometric Shapes Component
function GeometricShapes() {
  const torus1Ref = useRef<THREE.Mesh>(null);
  const torus2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (torus1Ref.current) {
      torus1Ref.current.rotation.x = time * 0.1;
      torus1Ref.current.rotation.y = time * 0.2;
    }
    if (torus2Ref.current) {
      torus2Ref.current.rotation.x = time * 0.2;
      torus2Ref.current.rotation.y = time * 0.1;
    }
  });

  return (
    <>
      {/* Torus */}
      <Float speed={1.8} rotationIntensity={0.7} floatIntensity={0.4} position={[-3, 1, 3]}>
        <mesh ref={torus1Ref}>
          <torusGeometry args={[1, 0.4, 16, 100]} />
          <meshStandardMaterial
            color="#ffffffff"
            wireframe
            transparent
            opacity={1}
            emissive="#ffffffff"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      {/* <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.4} position={[2, -2, 2]}>
        <mesh ref={torus2Ref}>
          <torusGeometry args={[1, 0.4, 16, 100]} />
          <meshStandardMaterial
            color="#ffffffff"
            wireframe
            transparent
            opacity={0.9}
            emissive="#ffffffff"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float> */}

      {/* Distorted Sphere (Main focal point) */}
      {/* Distorted Sphere (Main focal point) */}
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.3} position={[5, 0.25, 0]}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#000000ff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>
    </>
  );
}

// Enhanced Particle Field
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesCount = 5000;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const cols = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      // Spread particles in a sphere
      const radius = 10 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      
      // Random colors between purple and yellow
      const colorChoice = Math.random();
      if (colorChoice > 0.7) {
        // Yellow
        cols[i * 3] = 0.98;
        cols[i * 3 + 1] = 0.8;
        cols[i * 3 + 2] = 0.08;
      } else {
        // Purple
        cols[i * 3] = 0.55;
        cols[i * 3 + 1] = 0.36;
        cols[i * 3 + 2] = 0.96;
      }
    }
    
    return { positions: pos, colors: cols };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main Scene
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#8B5CF6" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#FACC15" />
      <spotLight
        position={[0, 15, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1.5}
        color="#4000ffff"
        castShadow
      />
      
      {/* 3D Objects */}
      <GeometricShapes />
      <ParticleField />
      
      {/* Background Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Environment */}
      <fog attach="fog" args={['#000000', 10, 30]} />
    </>
  );
}

function GlobalBackground3D() {
  return (
    <div 
      className="fixed inset-0 -z-10 pointer-events-none" 
      style={{ background: 'black' }}
    >
      <Canvas shadows>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Export as client-only component
export default dynamic(() => Promise.resolve(GlobalBackground3D), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 -z-10 bg-black" />
  ),
});
