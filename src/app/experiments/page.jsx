"use client";

import dynamic from "next/dynamic";

const TripStreamScene = dynamic(() => import("../components/scenes/TripStreamScene"), { ssr: false });
const VaultDropScene = dynamic(() => import("../components/scenes/VaultDropScene"), { ssr: false });

const ScenePanel = ({ title, description, children }) => (
  <div className="rounded-2xl border border-white/10 bg-[#050505]/60 p-6 space-y-4 shadow-2xl">
    <div>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-sm text-[#cbd5f5]">{description}</p>
    </div>
    <div className="h-80 rounded-xl overflow-hidden bg-black">{children}</div>
  </div>
);

const ExperimentsPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#030712] to-[#070312] text-white py-16">
      <div className="container mx-auto px-6 lg:px-12 space-y-12">
        <header className="max-w-3xl">
          <p className="uppercase text-xs tracking-[0.3em] text-cyan-300">Playground</p>
          <h1 className="text-4xl lg:text-6xl font-bold mt-4 mb-6">Immersive Experiments Lab</h1>
          <p className="text-lg text-[#cbd5f5]">
            A growing collection of WebGL scenes that power the hero and project previews. Each experiment highlights
            motion, lighting, and storytelling cues tailored to the showcased product.
          </p>
        </header>
        <div className="grid gap-8 md:grid-cols-2">
          <ScenePanel
            title="Trip Streamer Globe"
            description="Routes arc across a glowing globe, inspired by livestream travel narratives."
          >
            <TripStreamScene />
          </ScenePanel>
          <ScenePanel
            title="VaultDrop Cubes"
            description="Encrypted payloads floating in sync to visualize file drops entering cold storage."
          >
            <VaultDropScene />
          </ScenePanel>
        </div>
      </div>
    </main>
  );
};

export default ExperimentsPage;
