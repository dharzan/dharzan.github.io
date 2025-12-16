"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const Globe = () => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial color="#22d3ee" wireframe emissive="#22d3ee" emissiveIntensity={0.3} />
    </mesh>
  );
};

const FlightPaths = () => {
  const paths = useMemo(() => {
    const arcs = [];
    for (let i = 0; i < 6; i += 1) {
      const start = new THREE.Vector3().setFromSphericalCoords(1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
      const end = new THREE.Vector3().setFromSphericalCoords(1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
      const mid = start.clone().add(end).multiplyScalar(0.5).setLength(1.6);
      const curve = new THREE.CatmullRomCurve3([start, mid, end]);
      arcs.push(curve.getPoints(50));
    }
    return arcs;
  }, []);

  return paths.map((points, index) => (
    <Line
      key={index}
      points={points}
      color="#f472b6"
      lineWidth={1}
      dashed
      dashSize={0.2}
      gapSize={0.1}
    />
  ));
};

const TripStreamScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} style={{ width: "100%", height: "100%" }}>
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <Globe />
      <FlightPaths />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
};

export default TripStreamScene;
