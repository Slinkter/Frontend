import React from "react";

function TodoHeader({ children, loading }) {
  // se usa cloneElement para clonar a un solo componente {children}
  // al component clonado {children} se le agregar una propiedad loading
  // para mas hijos es necesario usarl el metodo React.Children.ToArray(children)
  // q devuelve un [] de componentes
  // se aplicar map para usar el cloneElement

  return (
    <header>
      {React.Children.toArray(children).map((child) =>
        React.cloneElement(child, { loading })
      )}
    </header>
  );
}

export { TodoHeader };
