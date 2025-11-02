import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TodoProvider } from './components/TodoContext/index.jsx'

// Get the root element from the HTML
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render the application
root.render(
  // StrictMode is a tool for highlighting potential problems in an application.
  <StrictMode>
    {/* TodoProvider provides the global state to all components within App */}
    <TodoProvider>
      <App />
    </TodoProvider>
  </StrictMode>,
);
