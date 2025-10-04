"use client";

import { Toaster } from "@/components/ui/sonner";
import type { ToasterProps } from "sonner";
import { useComponentStore } from "@/stores/component-store";

// Global Toaster that adapts to the current Sonner settings in the Customizer
export function AppToaster() {
  const { selectedComponent, customProps } = useComponentStore();

  const isSonnerSelected = selectedComponent?.name === "sonner";
  const position = (isSonnerSelected ? (customProps.position as ToasterProps["position"]) : undefined) ?? "bottom-right";
  const richColors = (isSonnerSelected ? Boolean(customProps.richColors) : false) ?? false;

  return <Toaster position={position} richColors={richColors} />;
}

export default AppToaster;