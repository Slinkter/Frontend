import React, { FormEvent, ChangeEvent } from "react";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { UsernameSearchSchema } from "../api/githubSchema";

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
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <div className="relative group">
        {/* Glowing backdrop border mesh */}
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 opacity-25 blur-md transition duration-500 group-hover:opacity-45 group-focus-within:opacity-60 group-focus-within:duration-200" />
        
        {/* Dynamic red glow on validation error */}
        {validationError && (
          <div className="absolute -inset-0.5 rounded-xl bg-red-500/20 blur-md animate-pulse" />
        )}

        <div className="relative flex items-center">
          {/* Magnifying Glass Search Icon */}
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400/40 dark:text-white/30 group-focus-within:text-violet-600 dark:group-focus-within:text-cyan-400 group-focus-within:scale-110 transition-all duration-300" />
          
          {/* Input field */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Buscar usuario... (ej. vercel)"
            disabled={loading}
            className={`w-full rounded-xl glass-input py-3.5 sm:py-4 pl-11 sm:pl-12 pr-28 sm:pr-32 text-xs sm:text-sm placeholder-slate-400/50 dark:placeholder-white/20 backdrop-blur-xl outline-none transition-all duration-300
              ${
                validationError
                  ? "!border-red-500/40 focus:!border-red-500 focus:ring-4 focus:ring-red-500/10"
                  : "focus:ring-4 focus:ring-violet-500/10 dark:focus:ring-cyan-500/10"
              }
            `}
          />
          
          {/* Action button inside input */}
          <button
            type="submit"
            disabled={loading || !!validationError}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold text-white transition-all duration-300 hover:from-violet-500 hover:via-indigo-500 hover:to-cyan-400 hover:scale-[1.03] active:scale-95 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-1.5 shadow-lg hover:shadow-cyan-500/20 active:translate-y-[-48%] select-none cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Buscando</span>
              </>
            ) : (
              <>
                <span>Buscar</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Validation / Guidance Feedback with Animation */}
      <div className="overflow-hidden transition-all duration-300">
        {validationError ? (
          <div className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg py-1.5 px-3 animate-in slide-in-from-top-1 duration-200">
            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 text-red-500 dark:text-red-400" />
            <span className="font-medium">{validationError}</span>
          </div>
        ) : (
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 px-3 py-0.5 leading-relaxed font-semibold transition-all duration-300">
            Mínimo 1 carácter, sin espacios. Admite guiones simples.
          </p>
        )}
      </div>
    </form>
  );
}
