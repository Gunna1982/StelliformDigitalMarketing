'use client';

import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function makePositions(count: number): Float32Array {
  const pos = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return pos;
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const PARTICLES_COUNT = 2000;

  /**
   * ✅ Fix: lazy initializer runs once per mount (not “during render” repeatedly),
   * doesn't use useEffect, and avoids ref.current access.
   */
  const [positions] = useState<Float32Array>(() => makePositions(PARTICLES_COUNT));

  /**
   * Optional: keep args stable (not required, but nice)
   */
  const positionArgs = useMemo<[Float32Array, number]>(() => [positions, 3], [positions]);

  useFrame(({ clock }) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const t = clock.getElapsedTime();
    pts.rotation.y = t * 0.05;
    pts.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={positionArgs} />
      </bufferGeometry>

      <pointsMaterial
        size={0.05}
        color="#FFA500"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticlesBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Particles />
      </Canvas>
    </div>
  );
}
