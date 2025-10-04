"use client";

import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import React from "react";

/**
 * ThemeToggle provides a manual override for theme selection.
 * - Options: system, light, dark
 * - Persists via next-themes (localStorage) and animates smoothly per globals.css
 */
export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  // Avoid hydration mismatch by rendering a neutral UI until mounted.
  const [mounted, setMounted] = React.useState(false);
  const [value, setValue] = React.useState<string | undefined>(undefined);
  React.useEffect(() => {
    setMounted(true);
    setValue(resolvedTheme);
  }, [resolvedTheme]);

  return (
    <div className="flex items-center justify-between gap-2">
      <Label htmlFor="theme-select" className="text-sm">Theme</Label>
      <Select
        value={mounted ? value : undefined}
        onValueChange={(val) => {
          setValue(val);
          setTheme(val);
        }}
      >
        <SelectTrigger id="theme-select" className="w-36">
          {/* Use a stable placeholder before mount to prevent SSR/CSR text mismatch */}
          <SelectValue placeholder={mounted ? (theme ?? "system") : "Theme"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="system">System</SelectItem>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}