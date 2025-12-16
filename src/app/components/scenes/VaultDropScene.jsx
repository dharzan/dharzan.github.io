"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useRef } from "react";

const RotatingCube = ({ position, color, delay }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime() + delay;
      ref.current.rotation.x = time * 0.6;
      ref.current.rotation.y = time * 0.6;
      ref.current.position.y = position[1] + Math.sin(time) * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
    </mesh>
  );
};

const VaultDropScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: "100%", height: "100%" }}>
      <color attach="background" args={["#05010e"]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 3, 1]} intensity={0.9} />
      <Float speed={2} rotationIntensity={1}>
        <RotatingCube position={[0, 0, 0]} color="#a855f7" delay={0} />
      </Float>
      <RotatingCube position={[-1.4, -0.4, -0.4]} color="#f97316" delay={1} />
      <RotatingCube position={[1.4, 0.4, 0.4]} color="#38bdf8" delay={2} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.8} />
    </Canvas>
  );
};

export default VaultDropScene;
