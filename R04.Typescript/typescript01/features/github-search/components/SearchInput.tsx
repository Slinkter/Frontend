import React, { useState, FormEvent, ChangeEvent } from "react";
import { Search, Loader2, AlertCircle, X, ArrowRight } from "lucide-react";
import { UsernameSearchSchema } from "@/features/github-search/api";
import { sanitizeUsernameInput } from "@/features/github-search/lib/formatters";
import { Button, Input } from "@/components/ui";

export interface SearchInputProps {
  loading: boolean;
  onSearch: (username: string) => void;
  defaultValue?: string;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  validationError?: string | null;
  setValidationError?: (value: string | null) => void;
}

function SearchInputComponent({
  defaultValue = "",
  loading,
  onSearch,
  searchTerm: controlledTerm,
  setSearchTerm: controlledSetSearchTerm,
  validationError: controlledValidationError,
  setValidationError: controlledSetValidationError,
}: SearchInputProps) {
  const [internalTerm, setInternalTerm] = useState(defaultValue);
  const [internalError, setInternalError] = useState<string | null>(null);

  React.useEffect(() => {
    if (defaultValue) {
      setInternalTerm(defaultValue);
      setInternalError(null);
    }
  }, [defaultValue]);

  const isControlled = controlledSetSearchTerm !== undefined;
  const searchTerm = isControlled ? (controlledTerm ?? "") : internalTerm;
  const validationError = isControlled ? (controlledValidationError ?? null) : internalError;

  const updateTerm = (value: string) => {
    if (isControlled && controlledSetSearchTerm) {
      controlledSetSearchTerm(value);
    } else {
      setInternalTerm(value);
    }
  };

  const updateError = (error: string | null) => {
    if (isControlled && controlledSetValidationError) {
      controlledSetValidationError(error);
    } else {
      setInternalError(error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = sanitizeUsernameInput(searchTerm);
    if (!cleaned || loading || validationError) return;
    onSearch(cleaned);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateTerm(value);

    const cleaned = sanitizeUsernameInput(value);
    if (!cleaned) {
      updateError(null);
      return;
    }

    const validation = UsernameSearchSchema.safeParse(cleaned);
    if (validation.success) {
      updateError(null);
    } else {
      updateError(validation.error.issues[0].message);
    }
  };

  const handleClear = () => {
    updateTerm("");
    updateError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2" role="search">
      <label htmlFor="github-username-input" className="sr-only">
        Nombre de usuario de GitHub
      </label>

      {/* Contenedor con efecto de resplandor sutil en focus */}
      <div className="group relative flex items-center">
        <div className="absolute -inset-0.5 rounded-[calc(var(--radius-2xl)+2px)] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 blur-md transition duration-500 group-focus-within:opacity-100 pointer-events-none" />

        <Input
          id="github-username-input"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Escape" && searchTerm) {
              handleClear();
            }
          }}
          placeholder="Buscar usuario... (ej. vercel, shadcn, torvalds)"
          disabled={loading}
          aria-invalid={Boolean(validationError)}
          aria-describedby={validationError ? "search-error-message" : "search-hint-message"}
          aria-required="true"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          leftIcon={
            <Search className="h-4 w-4 text-[var(--text-muted)] transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400" aria-hidden="true" />
          }
          className={`h-12 text-sm pr-28 sm:pr-32 rounded-[var(--radius-2xl)] backdrop-blur-xl transition-all duration-300 ${
            validationError
              ? "border-red-500 focus-visible:ring-red-500"
              : "hover:border-indigo-500/30"
          }`}
        />

        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {searchTerm && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
              title="Borrar texto"
              aria-label="Limpiar campo de búsqueda"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}

          <Button
            type="submit"
            disabled={loading || !!validationError || !sanitizeUsernameInput(searchTerm)}
            size="sm"
            aria-busy={loading}
            className="rounded-[var(--radius-xl)] px-3.5 h-9 font-medium shadow-sm transition-transform active:scale-95"
          >
            {loading ? (
              <>
                <Loader2 aria-hidden="true" className="h-3.5 w-3.5 animate-spin" />
                <span className="hidden sm:inline text-xs">Buscando</span>
                <span className="sr-only">Buscando usuario en GitHub</span>
              </>
            ) : (
              <>
                <span className="text-xs">Buscar</span>
                <ArrowRight className="h-3.5 w-3.5 hidden sm:inline" aria-hidden="true" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Retroalimentación accesible de validación */}
      <div className="min-h-[1.25rem] px-1">
        {validationError ? (
          <div
            id="search-error-message"
            role="alert"
            aria-live="polite"
            className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 font-medium transition-all duration-200"
          >
            <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{validationError}</span>
          </div>
        ) : (
          <div
            id="search-hint-message"
            className="flex items-center justify-between text-[11px] text-[var(--text-muted)]"
          >
            <span className="hidden sm:inline">
              Navega perfiles públicos de GitHub con métricas e indexación en memoria.
            </span>
            <span className="ml-auto inline-flex items-center gap-1">
              Presiona{" "}
              <kbd className="px-1.5 py-0.5 rounded-[var(--radius-xs)] border border-[var(--glass-border)] bg-[var(--glass-bg)] font-mono text-[10px] text-[var(--text-secondary)] shadow-xs">
                Enter ↵
              </kbd>
            </span>
          </div>
        )}
      </div>
    </form>
  );
}

const SearchInput = React.memo(SearchInputComponent);
export default SearchInput;
