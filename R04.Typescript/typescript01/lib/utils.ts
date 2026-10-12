import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina condicionalmente múltiples clases CSS y resuelve conflictos de Tailwind CSS.
 *
 * @remarks
 * Utiliza {@link clsx} para evaluar valores condicionales o arreglos de clases y
 * {@link twMerge} para garantizar que las clases posteriores de Tailwind anulen
 * limpiamente a las anteriores sin colisiones de especificidad.
 *
 * @param inputs - Lista de nombres de clases, expresiones booleanas o arreglos
 * @returns Cadena de clases CSS normalizada y sin colisiones
 *
 * @example
 * ```typescript
 * cn("px-2 py-1", isPrimary && "bg-blue-500", "px-4"); // Retorna "py-1 bg-blue-500 px-4"
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
