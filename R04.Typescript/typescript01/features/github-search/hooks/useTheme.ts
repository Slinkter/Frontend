"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Custom hook wrapping `next-themes` with SSR hydration safety via `useSyncExternalStore`
 * and optional View Transition API support.
 *
 * @returns Theme state, mount status, and toggle handler.
 *
 * @example
 * ```tsx
 * const { theme, toggleTheme, isDark, mounted } = useTheme();
 * ```
 */
export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const currentTheme = resolvedTheme || theme || "light";

  const toggleTheme = () => {
    const next = currentTheme === "dark" ? "light" : "dark";

    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        setTheme(next);
      });
    } else {
      setTheme(next);
    }
  };

  return {
    theme: currentTheme,
    mounted,
    toggleTheme,
    isDark: currentTheme === "dark",
    setTheme,
  };
}
