"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";

const Particles = () => {
  const ref = useRef();
  const positions = useMemo(() => {
    const points = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i += 1) {
      const i3 = i * 3;
      points[i3] = (Math.random() - 0.5) * 8;
      points[i3 + 1] = (Math.random() - 0.5) * 8;
      points[i3 + 2] = (Math.random() - 0.5) * 8;
    }
    return points;
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0008;
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
      <pointsMaterial color="#22d3ee" size={0.03} sizeAttenuation depthWrite={false} />
    </points>
  );
};

const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 opacity-70">
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.35} />
        <directionalLight intensity={0.6} position={[5, 5, 3]} />
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh>
            <icosahedronGeometry args={[2, 1]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#0f172a"
              metalness={0.15}
              roughness={0.4}
              wireframe
            />
          </mesh>
        </Float>
        <Particles />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
