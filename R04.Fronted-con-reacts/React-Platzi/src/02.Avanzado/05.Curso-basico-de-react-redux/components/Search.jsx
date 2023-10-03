import React from "react";
import "../assets/styles/components/Search.scss";
import classNames from "classnames";

const Search = (props) => {
  const { isHome } = props;
  const inputStyle = classNames("input", {
    isHome,
  });

  return (
    <section className="main">
      <h2 className="main__title">¿Qué quieres ver hoy?</h2>
      <input type="text" className={inputStyle} placeholder="Buscar..." />
    </section>
  );
};

export default Search;
