import React, { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { EditTodoPage } from "./pages/Edit/EditTodoPage";
import { HomePage } from "./pages/Home/HomePage";
import { NewTodoPage } from "./pages/New/NewTodoPage";
import "./App.css";

/**
 * Componente raíz de la aplicación.
 * Configura el enrutamiento (Routing) usando HashRouter para compatibilidad con servidores estáticos (como GitHub Pages).
 * Define las rutas principales: Home, New, Edit y Not Found.
 * 
 * @returns {JSX.Element} La estructura de rutas de la aplicación.
 */
function App() {
  useEffect(() => {
    document.title = "React Router";
  }, []);
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewTodoPage />} />
        <Route path="/edit/:id" element={<EditTodoPage />} />
        <Route path="/*" element={<p>Not found</p>} />
      </Routes>
    </HashRouter>
  );
}

export default App;