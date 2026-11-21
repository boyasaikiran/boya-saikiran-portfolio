import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WebMeshProps {
  mousePos: { x: number; y: number };
  offset?: [number, number, number];
}

// Custom 3D Geometric Web Structure
function SpiderWebLattice({ mousePos, offset = [-0.8, 0, 0] }: WebMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringCount = 7;
  const spokesCount = 14;
  const maxRadius = 5.2;

  // Generate geometric vertices for the concentric polygonal web rings and radial spokes
  const { lineSegments, nodePositions } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const nodes: THREE.Vector3[] = [];

    // Radial spokes extending outward
    for (let s = 0; s < spokesCount; s++) {
      const angle = (s / spokesCount) * Math.PI * 2;
      const start = new THREE.Vector3(0, 0, 0);
      // Introduce subtle organic z-depth curvature
      const endZ = Math.sin(s * 1.5) * 0.4 - 0.5;
      const end = new THREE.Vector3(
        Math.cos(angle) * maxRadius,
        Math.sin(angle) * maxRadius,
        endZ
      );
      points.push(start, end);
    }

    // Concentric polygonal web lines
    for (let r = 1; r <= ringCount; r++) {
      const radius = (r / ringCount) * maxRadius;
      const zOffset = -Math.pow(r / ringCount, 1.8) * 0.8;

      for (let s = 0; s < spokesCount; s++) {
        const a1 = (s / spokesCount) * Math.PI * 2;
        const a2 = (((s + 1) % spokesCount) / spokesCount) * Math.PI * 2;

        // Slight sag in middle of web filaments
        const midA = (a1 + a2) / 2;
        const sagRadius = radius * 0.94;

        const p1 = new THREE.Vector3(Math.cos(a1) * radius, Math.sin(a1) * radius, zOffset);
        const mid = new THREE.Vector3(Math.cos(midA) * sagRadius, Math.sin(midA) * sagRadius, zOffset - 0.05);
        const p2 = new THREE.Vector3(Math.cos(a2) * radius, Math.sin(a2) * radius, zOffset);

        points.push(p1, mid);
        points.push(mid, p2);

        // Store junction nodes
        if (r % 2 === 0) {
          nodes.push(p1);
        }
      }
    }

    return { lineSegments: points, nodePositions: nodes };
  }, [ringCount, spokesCount, maxRadius]);

  const linesGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(lineSegments);
    return geom;
  }, [lineSegments]);

  const nodesGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(nodePositions);
    return geom;
  }, [nodePositions]);

  // Frame animation: continuous gentle breathing and mouse parallax
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Subtle breathing rotation
    groupRef.current.rotation.z = Math.sin(time * 0.15) * 0.08;

    // Mouse parallax lerping
    const targetX = (mousePos.x * Math.PI) / 10;
    const targetY = (mousePos.y * Math.PI) / 10;
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetY, 4, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetX, 4, delta);
  });

  return (
    <group ref={groupRef} position={offset}>
      {/* Spider-Web Radial & Polygonal Strands */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial
          color="#FF3548"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Silver Supporting Secondary Filaments */}
      <lineSegments geometry={linesGeometry} scale={[1.002, 1.002, 1.002]}>
        <lineBasicMaterial
          color="#75E5ED"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Junction Nodes */}
      <points geometry={nodesGeometry}>
        <pointsMaterial
          size={0.06}
          color="#FF3548"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Glowing Center Core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#FF3548" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#FF3548" transparent opacity={0.25} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// Atmospheric Particles Cloud
function DustParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 180;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random distribution
      const s1 = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      const r1 = s1 - Math.floor(s1);
      const s2 = Math.sin(i * 26.3141 + 45.164) * 23421.631;
      const r2 = s2 - Math.floor(s2);
      const s3 = Math.sin(i * 39.7821 + 12.943) * 31245.892;
      const r3 = s3 - Math.floor(s3);
      pos[i * 3] = (r1 - 0.5) * 16;
      pos[i * 3 + 1] = (r2 - 0.5) * 12;
      pos[i * 3 + 2] = (r3 - 0.5) * 8 - 2;
    }
    return pos;
  }, [count]);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={pointsRef} geometry={geom}>
      <pointsMaterial
        size={0.035}
        color="#C6CBD5"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface ThreeWebSceneProps {
  className?: string;
  mousePos?: { x: number; y: number };
  offset?: [number, number, number];
}

export const ThreeWebScene: React.FC<ThreeWebSceneProps> = ({ 
  className = '', 
  mousePos = { x: 0, y: 0 },
  offset = [-0.8, 0, 0]
}) => {
  return (
    <div className={`relative w-full h-full pointer-events-none select-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 4]} intensity={2.5} color="#FF3548" distance={10} />
        <pointLight position={[-4, 3, 2]} intensity={1.5} color="#75E5ED" distance={10} />
        
        <SpiderWebLattice mousePos={mousePos} offset={offset} />
        <DustParticles />
      </Canvas>
    </div>
  );
};
