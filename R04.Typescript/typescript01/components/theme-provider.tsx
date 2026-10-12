"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Proveedor de contexto para el sistema de temas (Dark / Light / System).
 *
 * @remarks
 * Envuelve el componente {@link NextThemesProvider} de `next-themes` asegurando
 * compatibilidad nativa con Next.js App Router (RSC) y prevención de parpadeos
 * de hidratación visual (FOUC).
 *
 * @param props - Propiedades de configuración del ThemeProvider de next-themes
 * @returns Árbol de componentes envuelto en el contexto de tema
 *
 * @example
 * ```tsx
 * <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
 *   {children}
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>): React.ReactElement {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
