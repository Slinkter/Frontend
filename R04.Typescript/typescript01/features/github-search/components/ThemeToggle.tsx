"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/features/github-search/hooks";

/**
 * Floating theme toggle button switching between light (Aurora Pearl)
 * and dark (Obsidian Aurora) themes with accessible ARIA semantics.
 */
export default function ThemeToggle(): React.ReactElement {
  const { theme, mounted, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={!mounted}
      className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--glass-shadow)] backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-300 hover:scale-105 hover:border-indigo-500/40 hover:shadow-[var(--glass-shadow-hover)] active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
      title={
        mounted
          ? theme === "dark"
            ? "Cambiar a modo claro (Aurora Pearl)"
            : "Cambiar a modo oscuro (Obsidian Aurora)"
          : "Alternar tema"
      }
      aria-label={
        mounted
          ? theme === "dark"
            ? "Cambiar a modo claro (modo oscuro actualmente activo)"
            : "Cambiar a modo oscuro (modo claro actualmente activo)"
          : "Alternar tema de color"
      }
      aria-pressed={mounted ? theme === "dark" : false}
    >
      {/* Halo de luz sutil en hover */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-amber-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-5 w-5 items-center justify-center">
        {mounted && (
          <>
            <Sun
              aria-hidden="true"
              className={`absolute h-4 w-4 text-amber-500 transition-[transform,opacity] duration-250 ease-out ${
                theme === "dark"
                  ? "rotate-0 scale-100 opacity-100 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                  : "-rotate-90 scale-0 opacity-0"
              }`}
            />
            <Moon
              aria-hidden="true"
              className={`absolute h-4 w-4 text-indigo-600 dark:text-indigo-400 transition-[transform,opacity] duration-250 ease-out ${
                theme === "light"
                  ? "rotate-0 scale-100 opacity-100 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                  : "rotate-90 scale-0 opacity-0"
              }`}
            />
          </>
        )}
      </div>
    </button>
  );
}
