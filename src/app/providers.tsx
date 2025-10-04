"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

/**
 * Client-side providers wrapper.
 * - Enables next-themes with system preference detection and persistent storage.
 * - Uses `attribute="class"` so Tailwind/Shadcn `.dark` class toggles CSS variables.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}