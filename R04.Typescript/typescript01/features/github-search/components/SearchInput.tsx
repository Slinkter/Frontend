import React, { FormEvent, ChangeEvent } from "react";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { UsernameSearchSchema } from "@/features/github-search/api/githubSchema";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  validationError: string | null;
  setValidationError: (value: string | null) => void;
  loading: boolean;
  onSearch: (username: string) => void;
}

export default function SearchInput({
  searchTerm,
  setSearchTerm,
  validationError,
  setValidationError,
  loading,
  onSearch,
}: SearchInputProps) {
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Dynamic Zod Validation on typing
    if (value.trim() === "") {
      setValidationError(null);
      return;
    }

    const validation = UsernameSearchSchema.safeParse(value.trim());
    if (validation.success) {
      setValidationError(null);
    } else {
      // Just extract first error message
      setValidationError(validation.error.issues[0].message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2" role="search">
      <label htmlFor="github-username-input" className="sr-only">
        Nombre de usuario de GitHub
      </label>
      <div className="relative flex items-center">
        {/* Magnifying Glass Search Icon */}
        <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-zinc-500 transition-colors duration-200" />
        
        {/* Input field */}
        <input
          id="github-username-input"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Buscar usuario... (ej. vercel)"
          disabled={loading}
          className={`w-full rounded-xl glass-input py-3 sm:py-3.5 pl-11 pr-24 sm:pr-28 text-xs sm:text-sm placeholder-slate-400 dark:placeholder-zinc-500 outline-none transition-all duration-200
            ${
              validationError
                ? "border-red-300 dark:border-red-900/50 focus:border-red-500 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                : "border-slate-200 dark:border-zinc-800 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20"
            }
          `}
        />
        
        {/* Action button inside input */}
        <button
          type="submit"
          disabled={loading || !!validationError}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-slate-900 dark:bg-zinc-100 hover:bg-slate-800 dark:hover:bg-zinc-200 active:scale-95 transition-all duration-100 px-4 py-1.5 sm:py-2 text-xs font-semibold text-white dark:text-zinc-950 disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm select-none cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 aria-hidden="true" className="h-3 w-3 animate-spin" />
              <span>Buscando</span>
            </>
          ) : (
            <>
              <span>Buscar</span>
            </>
          )}
        </button>
      </div>
      
      {/* Validation / Guidance Feedback */}
      <div className="overflow-hidden">
        {validationError ? (
          <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 py-1 px-3">
            <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 flex-shrink-0 text-red-500 dark:text-red-400" />
            <span className="font-medium">{validationError}</span>
          </div>
        ) : (
          <p className="text-[10px] sm:text-xs text-slate-400 dark:text-zinc-500 px-3 py-0.5 leading-relaxed font-normal">
            Mínimo 1 carácter, sin espacios. Admite guiones simples.
          </p>
        )}
      </div>
    </form>
  );
}
