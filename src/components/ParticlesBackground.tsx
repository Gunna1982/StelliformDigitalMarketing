'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

type TwinkleData = {
  phase: Float32Array;
  speed: Float32Array;
  amp: Float32Array;
};

function makePositions(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  return pos;
}

function makeTwinkleData(count: number): TwinkleData {
  const phase = new Float32Array(count);
  const speed = new Float32Array(count);
  const amp = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    phase[i] = Math.random() * Math.PI * 2;
    speed[i] = 0.6 + Math.random() * 1.8;
    amp[i] = 0.35 + Math.random() * 0.65;
  }

  return { phase, speed, amp };
}

const vertexShader = `
  attribute float aPhase;
  attribute float aSpeed;
  attribute float aAmp;

  uniform float uTime;
  uniform float uSize;
  uniform float uNear;
  uniform float uFar;

  varying float vTwinkle;
  varying float vFade;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float dist = length(mvPosition.xyz);

    vFade = smoothstep(uFar, uNear, dist);

    float wave = sin(uTime * aSpeed + aPhase);
    float micro = sin(uTime * (aSpeed * 3.5) + aPhase * 1.37);
    float tw = 0.6 + 0.4 * wave + 0.15 * micro;
    vTwinkle = clamp(tw * (0.6 + 0.4 * aAmp), 0.0, 1.5);

    float atten = 1.0 / max(0.7, dist);
    gl_PointSize = clamp(uSize * 240.0 * atten, 1.5, 7.0);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  precision highp float;

  uniform vec3 uColor;

  varying float vTwinkle;
  varying float vFade;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);

    float core = smoothstep(0.18, 0.0, d);
    float glow = smoothstep(0.5, 0.0, d);
    float ring = smoothstep(0.35, 0.25, d) * 0.15;

    float alpha = (core * 0.9 + glow * 0.55 + ring) * vFade;
    float brightness = (0.65 + 0.85 * vTwinkle) * vFade;

    vec3 color = uColor;
    color.b = min(1.0, color.b + 0.12);

    vec3 outColor = color * brightness;

    if (alpha <= 0.001) discard;

    gl_FragColor = vec4(outColor, alpha);
  }
`;

/**
 * Subtle camera parallax:
 * - tracks mouse in normalized -1..1 space
 * - eases camera position to target
 * - keeps camera looking at center
 */
function CameraParallax() {
  const { camera } = useThree();

  // target mouse position (-1..1)
  const targetRef = useRef({ x: 0, y: 0 });

  // reusable vectors (avoid allocations)
  const desired = useMemo(() => new THREE.Vector3(), []);
  const lookAt = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      // invert Y so moving mouse up moves camera up (feels natural)
      targetRef.current.x = nx;
      targetRef.current.y = -ny;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame(() => {
    // Very subtle parallax amounts
    const PARALLAX_X = 0.35; // left/right
    const PARALLAX_Y = 0.20; // up/down

    // Keep the same base Z and gently shift X/Y
    desired.set(
      targetRef.current.x * PARALLAX_X,
      targetRef.current.y * PARALLAX_Y,
      5
    );

    // Smooth easing (lerp)
    camera.position.lerp(desired, 0.05);
    camera.lookAt(lookAt);
  });

  return null;
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const COUNT = 2000;

  const [positions] = useState<Float32Array>(() => makePositions(COUNT));
  const [twinkle] = useState<TwinkleData>(() => makeTwinkleData(COUNT));

  const positionArgs = useMemo<[Float32Array, number]>(() => [positions, 3], [positions]);
  const phaseArgs = useMemo<[Float32Array, number]>(() => [twinkle.phase, 1], [twinkle.phase]);
  const speedArgs = useMemo<[Float32Array, number]>(() => [twinkle.speed, 1], [twinkle.speed]);
  const ampArgs = useMemo<[Float32Array, number]>(() => [twinkle.amp, 1], [twinkle.amp]);

  useFrame(({ clock }) => {
    const pts = pointsRef.current;
    const mat = matRef.current;
    if (!pts || !mat) return;

    const t = clock.getElapsedTime();

    // 70% of original motion
    pts.rotation.y = t * 0.035;
    pts.rotation.x = Math.sin(t * 0.07) * 0.1;

    mat.uniforms.uTime.value = t;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={positionArgs} />
        <bufferAttribute attach="attributes-aPhase" args={phaseArgs} />
        <bufferAttribute attach="attributes-aSpeed" args={speedArgs} />
        <bufferAttribute attach="attributes-aAmp" args={ampArgs} />
      </bufferGeometry>

      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uSize: { value: 1.0 },
          uNear: { value: 4.0 },
          uFar: { value: 18.0 },
          uColor: { value: new THREE.Color('#ffffff') },
        }}
      />
    </points>
  );
}

export default function ParticlesBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-30">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <CameraParallax />
        <Particles />
      </Canvas>
    </div>
  );
}
