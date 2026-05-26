import React from "react";

/**
 * @component ProfileSkeleton
 * @description Estructura esqueleto (Skeleton) animada del perfil de usuario de GitHub.
 * Utiliza variables de tema `--shimmer-bg`, `--meta-bg`, y `--stats-bg` con la clase `glass-panel`
 * para lograr una transición y apariencia premium idéntica tanto en Light Theme como en Dark Theme.
 * @returns {React.ReactElement} Bloque esqueleto animado para la tarjeta de perfil.
 */
export function ProfileSkeleton(): React.ReactElement {
  return (
    <div className="w-full rounded-2xl glass-panel p-5 sm:p-6 animate-pulse relative overflow-hidden">
      {/* Skeleton de banner de cabecera adaptable */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-[var(--shimmer-bg)] opacity-60 border-b border-[var(--meta-border)] z-0" />

      <div className="relative flex flex-col items-center space-y-5 pt-12">
        {/* Avatar skeleton */}
        <div className="relative h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0 z-10">
          <div className="absolute -inset-0.5 rounded-full bg-[var(--meta-border)]" />
          <div className="h-full w-full rounded-full bg-[var(--shimmer-bg)]" />
        </div>
        
        {/* Textos del header y biografía skeleton */}
        <div className="text-center space-y-3.5 w-full z-10">
          <div className="space-y-2">
            <div className="h-6 w-40 sm:w-48 rounded bg-[var(--shimmer-bg)] mx-auto" />
            <div className="h-3.5 w-24 sm:w-28 rounded bg-[var(--shimmer-bg)] mx-auto" />
          </div>
          
          <div className="bg-[var(--meta-bg)] border border-[var(--meta-border)] rounded-xl px-4 py-3 max-w-sm mx-auto space-y-2">
            <div className="h-3 w-full rounded bg-[var(--shimmer-bg)]" />
            <div className="h-3 w-5/6 rounded bg-[var(--shimmer-bg)] mx-auto" />
          </div>
        </div>
        
        {/* Líneas de metadatos skeleton */}
        <div className="w-full space-y-2 text-xs border-t border-[var(--meta-border)] pt-5 text-left z-10">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-2.5 bg-[var(--meta-bg)] px-3.5 py-2 rounded-xl border border-[var(--meta-border)]">
              <div className="h-4 w-4 rounded-full bg-[var(--shimmer-bg)] flex-shrink-0" />
              <div className={`h-3 rounded bg-[var(--shimmer-bg)] ${idx % 2 === 0 ? "w-2/3" : "w-1/2"}`} />
            </div>
          ))}
        </div>

        {/* Panel de estadísticas skeleton */}
        <div className="relative w-full mt-6 grid grid-cols-3 gap-1.5 rounded-xl border border-[var(--stats-border)] bg-[var(--stats-bg)] p-2 text-center z-10">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className={`space-y-2 py-1.5 sm:py-2 ${idx === 1 ? "border-x border-[var(--stats-border)]" : ""}`}>
              <div className="h-3 w-10 rounded bg-[var(--shimmer-bg)] mx-auto" />
              <div className="h-6 w-14 rounded bg-[var(--shimmer-bg)] mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * @component RepoListSkeleton
 * @description Estructura esqueleto (Skeleton) animada del listado de repositorios.
 * Utiliza variables de tema de opacidad de shimmer y bordes para adaptarse perfectamente al tema activo.
 * @returns {React.ReactElement} Bloque esqueleto animado para el listado de repositorios.
 */
export function RepoListSkeleton(): React.ReactElement {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Caja de filtro buscador skeleton */}
      <div className="h-10 w-full rounded-xl border border-[var(--meta-border)] bg-[var(--meta-bg)] backdrop-blur-xl" />
      
      {/* Tarjetas de repositorios skeleton en cuadrícula */}
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-[var(--meta-border)] bg-[var(--meta-bg)] p-3.5 sm:p-4.5 space-y-4 backdrop-blur-md relative overflow-hidden"
          >
            {/* Línea sutil superior */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[var(--shimmer-bg)] opacity-30" />
            
            <div className="flex justify-between items-start">
              <div className="h-5 w-36 rounded bg-[var(--shimmer-bg)]" />
              <div className="h-4.5 w-12 rounded-full bg-[var(--shimmer-bg)]" />
            </div>
            
            <div className="space-y-2">
              <div className="h-3.5 w-full rounded bg-[var(--shimmer-bg)]" />
              <div className="h-3.5 w-4/5 rounded bg-[var(--shimmer-bg)]" />
            </div>
            
            <div className="flex justify-between items-center pt-2.5 border-t border-[var(--meta-border)]">
              <div className="flex space-x-3">
                <div className="h-4 w-16 rounded bg-[var(--shimmer-bg)]" />
                <div className="h-4 w-12 rounded bg-[var(--shimmer-bg)]" />
                <div className="h-4 w-12 rounded bg-[var(--shimmer-bg)]" />
              </div>
              <div className="h-3.5 w-16 rounded bg-[var(--shimmer-bg)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


