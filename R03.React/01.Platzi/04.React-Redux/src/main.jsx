import React from 'react'
import ReactDOM from 'react-dom/client'
import AppEntry from './index'
import './index.css' // Importar Tailwind CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {AppEntry}
  </React.StrictMode>,
)
