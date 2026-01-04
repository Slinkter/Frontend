import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

/**
 * Punto de entrada principal de la aplicación React.
 * Monta el componente raíz <App /> en el elemento DOM con id 'root'.
 * Utiliza React.StrictMode para advertencias de desarrollo adicionales.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)