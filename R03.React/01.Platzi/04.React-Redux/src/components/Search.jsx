import React from "react";
import classNames from "classnames";

const Search = (props) => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[300px] px-4">
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-8 text-center">¿Qué quieres ver hoy?</h2>
      <input 
        type="text" 
        className="w-full max-w-2xl h-14 px-6 rounded-full bg-white/10 border-2 border-white text-white placeholder-white/80 text-lg outline-none transition-all duration-300 focus:bg-white/20 focus:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        placeholder="Buscar..." 
      />
    </section>
  );
};

export default Search;
