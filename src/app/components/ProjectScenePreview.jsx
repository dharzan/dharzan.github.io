"use client";

import dynamic from "next/dynamic";

const sceneComponents = {
  trip: dynamic(() => import("./scenes/TripStreamScene"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gradient-to-r from-sky-500/20 to-emerald-500/20 animate-pulse" />,
  }),
  vault: dynamic(() => import("./scenes/VaultDropScene"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gradient-to-r from-indigo-500/20 to-rose-500/20 animate-pulse" />,
  }),
};

const ProjectScenePreview = ({ sceneKey }) => {
  if (!sceneKey) return null;
  const Scene = sceneComponents[sceneKey];
  if (!Scene) return null;
  return (
    <div className="absolute inset-0">
      <Scene />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent" />
    </div>
  );
};

export default ProjectScenePreview;
