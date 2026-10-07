"use client";

import { useEffect } from "react";
import { useRive, StateMachineInputType } from "@rive-app/react-canvas";

export type RiveInputs = Record<string, number | boolean>;

// Thin wrapper around the Rive runtime. `inputs` are pushed into the named
// state machine whenever they change: numbers/booleans set the input's
// value, and a `true` on a trigger input fires it once.
export default function RiveCanvas({
  src,
  stateMachine,
  inputs,
  className,
}: {
  src: string;
  stateMachine: string;
  inputs?: RiveInputs;
  className?: string;
}) {
  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: stateMachine,
    autoplay: true,
  });

  useEffect(() => {
    if (!rive || !inputs) return;
    const list = rive.stateMachineInputs(stateMachine) ?? [];
    for (const input of list) {
      if (!(input.name in inputs)) continue;
      const value = inputs[input.name];
      if (input.type === StateMachineInputType.Trigger) {
        if (value) input.fire();
      } else {
        input.value = value as number | boolean;
      }
    }
  }, [rive, stateMachine, inputs]);

  return <RiveComponent className={className} />;
}
