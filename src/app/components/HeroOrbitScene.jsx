"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";

const SparkField = () => {
  const ref = useRef();
  const positions = useMemo(() => {
    const points = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i += 1) {
      const i3 = i * 3;
      points[i3] = (Math.random() - 0.5) * 4;
      points[i3 + 1] = (Math.random() - 0.5) * 4;
      points[i3 + 2] = (Math.random() - 0.5) * 4;
    }
    return points;
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0015;
      ref.current.rotation.x += 0.0008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#22d3ee" sizeAttenuation depthWrite={false} />
    </points>
  );
};

const HeroOrbitScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[4, 4, 4]} intensity={0.8} />
        <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.8, 0.08, 32, 100]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#38bdf8"
              emissiveIntensity={0.4}
              wireframe
            />
          </mesh>
        </Float>
        <Float speed={3} rotationIntensity={0.4} floatIntensity={0.4}>
          <mesh position={[0, 0, 0]}>
            <icosahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial color="#a855f7" metalness={0.3} roughness={0.2} />
          </mesh>
        </Float>
        <SparkField />
      </Canvas>
    </div>
  );
};

export default HeroOrbitScene;
