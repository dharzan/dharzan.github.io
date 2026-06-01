"use client";

import { useState, type ReactNode } from "react";
import BootScreen from "./BootScreen";

export default function BootWrapper({ children }: { children: ReactNode }) {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted ? <BootScreen onComplete={() => setBooted(true)} /> : null}
      {children}
    </>
  );
}
