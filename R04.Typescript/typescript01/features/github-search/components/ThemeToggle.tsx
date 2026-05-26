import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * @type Theme
 * @description Define los dos estados posibles de tema visual para la interfaz.
 */
type Theme = "dark" | "light";

/**
 * @component ThemeToggle
 * @description Componente desacoplado que renderiza un botón circular de cristal ultra-premium.
 * Gestiona el ciclo de vida del tema visual de la aplicación (claro/oscuro):
 * 1. Inicializa leyendo las preferencias guardadas en `localStorage` o en las preferencias de sistema del OS (`matchMedia`).
 * 2. Inyecta dinámicamente la clase `.light` o `.dark` en el nodo raíz de HTML (`document.documentElement`).
 * 3. Cachea la selección para futuras sesiones.
 * @returns {React.ReactElement | null} Botón interactivo de alternancia de tema o null durante el montaje inicial en servidor.
 */
export default function ThemeToggle(): React.ReactElement | null {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Inicialización del tema en el montaje inicial en cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      const initialTheme =
        savedTheme ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

      // Difiere la inicialización para evitar la ejecución síncrona dentro del efecto,
      // resolviendo el error de ESLint sobre renderizados en cascada (cascading renders).
      requestAnimationFrame(() => {
        setTheme(initialTheme);
      });
    }
  }, []);

  // Sincroniza el estado del tema con las clases de HTML y localStorage
  useEffect(() => {
    if (!theme) return;

    const root = window.document.documentElement;
    localStorage.setItem("theme", theme);

    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, [theme]);

  // Alterna entre modo claro y modo oscuro
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Previene desajustes de hidratación en Server Side Rendering (SSR)
  if (!theme) return null;

  return (
    <button
      onClick={toggleTheme}
      className="glass-panel h-11 w-11 flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer shadow-md select-none relative overflow-hidden group/toggle z-50 focus:outline-none"
      title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-label="Alternar tema de color"
    >
      <div className="relative h-5 w-5 flex items-center justify-center">
        {/* Icono de Sol: visible en modo oscuro para sugerir cambio a modo claro */}
        <Sun
          className={`h-5 w-5 text-amber-400 transition-all duration-500 absolute ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
        {/* Icono de Luna: visible en modo claro para sugerir cambio a modo oscuro */}
        <Moon
          className={`h-5 w-5 text-violet-600 transition-all duration-500 absolute ${
            theme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </button>
  );
}
