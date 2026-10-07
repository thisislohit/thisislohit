"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import type { RiveInputs } from "./RiveCanvas";

let manifestPromise: Promise<string[]> | null = null;
function manifest() {
  manifestPromise ??= fetch("/rive/manifest.json")
    .then((r) => r.json())
    .then((j: { files?: string[] }) => j.files ?? []);
  return manifestPromise;
}

const RiveCanvas = dynamic(() => import("./RiveCanvas"), { ssr: false });

// A Rive-ready slot. If a real `.riv` file exists at `src` (drop it in
// /public/rive — see public/rive/README.md for the state-machine contract),
// it is loaded lazily with the Rive runtime. Otherwise the hand-built
// SVG/Framer Motion `fallback` renders, so the site never shows an empty hole
// and never pays for the Rive WASM until an asset actually exists.
export function RiveSlot({
  src,
  stateMachine,
  inputs,
  fallback,
  className,
}: {
  src: string;
  stateMachine: string;
  inputs?: RiveInputs;
  fallback: ReactNode;
  className?: string;
}) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let alive = true;
    // One manifest request instead of probing each .riv (no 404 noise).
    manifest()
      .then((files) => {
        if (alive && files.includes(src.split("/").pop() ?? "")) setAvailable(true);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [src]);

  if (!available) return <>{fallback}</>;
  return <RiveCanvas src={src} stateMachine={stateMachine} inputs={inputs} className={className} />;
}
