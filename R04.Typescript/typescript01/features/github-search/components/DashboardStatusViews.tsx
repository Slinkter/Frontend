import React from "react";
import { AlertCircle, Users } from "lucide-react";
import { Card } from "@/components/ui";

/**
 * Properties for the {@link DashboardErrorState} component.
 */
export interface DashboardErrorStateProps {
  /** Error message to explain to the user. */
  error: string;
  /** Fallback default user handle. */
  defaultUser: string;
  /** Retry callback function. */
  onRetry: (username: string) => void;
}

/**
 * Visual error state view presenting helpful troubleshooting information
 * and quick-recovery retry options.
 */
export const DashboardErrorState = React.memo(function DashboardErrorState({
  error,
  defaultUser,
  onRetry,
}: DashboardErrorStateProps) {
  return (
    <Card className="p-10 sm:p-12 text-center max-w-lg mx-auto rounded-[var(--radius-2xl)] space-y-4 border border-red-500/20 bg-[var(--glass-bg)] backdrop-blur-xl shadow-lg">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-600 dark:text-red-400">
        <AlertCircle className="h-6 w-6" aria-hidden="true" />
      </div>
      <div className="space-y-1.5">
        <h2 className="text-base font-bold text-[var(--text-primary)]">
          No pudimos cargar el perfil
        </h2>
        <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
          {error} Comprueba que el usuario esté bien escrito o prueba con una de las sugerencias populares.
        </p>
      </div>
      <div className="pt-2 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => onRetry(defaultUser)}
          className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
        >
          Probar con @{defaultUser}
        </button>
      </div>
    </Card>
  );
});

/**
 * Placeholder view rendered when no user profile is active or query hasn't started yet.
 */
export const DashboardEmptyState = React.memo(function DashboardEmptyState() {
  return (
    <Card className="p-12 sm:p-16 text-center max-w-md mx-auto rounded-[var(--radius-2xl)] space-y-3">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
        <Users className="h-6 w-6" aria-hidden="true" />
      </div>
      <h2 className="text-base font-bold text-[var(--text-primary)]">
        Comienza a explorar
      </h2>
      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
        Busca un desarrollador u organización de GitHub para desplegar sus métricas y repositorios en el Bento Grid interactivo.
      </p>
    </Card>
  );
});
