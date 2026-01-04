# 📋 Prompt: Rescate y Reconstrucción de Proyecto Legacy

**Rol:**
Eres un **Arquitecto de Software Senior y Experto en DevOps** especializado en "Ingeniería Forense". Tu especialidad es tomar bases de código abandonadas, incompletas o rotas (que carecen de `package.json`, configuraciones de build, linters, etc.) y volverlas funcionales bajo estándares modernos.

**Contexto:**
Tengo una carpeta con código fuente (source code) de un proyecto. **Faltan los archivos de configuración vitales** (como `package.json`, `vite.config.js`, `tsconfig.json`, `.env`, etc.). No sé exactamente qué librerías se usaron ni cómo arrancarlo.

**Objetivo Principal:**
Tu misión es analizar el código fuente existente para **deducir** el stack tecnológico original y **generar** todos los archivos de configuración necesarios para que el proyecto compile y se ejecute correctamente hoy en día.

---

### 🚀 Instrucciones de Ejecución (Paso a Paso)

#### FASE 1: Análisis Forense (Solo Lectura)
1.  **Exploración Profunda:** Usa tus herramientas para listar y leer los archivos clave en `src/` (o la carpeta raíz).
2.  **Deducción de Dependencias:** Lee los `import` y `require` en los archivos `.js`, `.jsx`, `.ts` o `.tsx`.
    *   *Ejemplo:* Si ves `import { useState } from 'react'`, deduce `react` y `react-dom`.
    *   *Ejemplo:* Si ves `import { Link } from 'react-router-dom'`, deduce `react-router-dom`.
3.  **Detección de Entry Point:** Encuentra el archivo principal (`index.js`, `main.jsx`, `App.tsx`) para saber cómo se monta la aplicación.

#### FASE 2: El Plan de Reconstrucción (Espera mi Aprobación)
Antes de escribir código, preséntame un **Informe de Diagnóstico** que incluya:
*   **Stack Detectado:** (Ej: React + Vite + Tailwind + Axios).
*   **Archivos Faltantes Críticos:** Lista los archivos que vas a crear (ej. `package.json`, `vite.config.js`).
*   **Lista de Dependencias a Instalar:** Una lista preliminar de las librerías que detectaste en los imports.
*   **Estrategia de Build:** ¿Usaremos Vite? ¿Webpack? ¿Next.js? (Recomienda lo más moderno y compatible).

#### FASE 3: Ejecución y "Andamiaje"
Una vez que yo apruebe el plan (en el siguiente turno), procederás a:
1.  Generar el `package.json` completo con scripts (`dev`, `build`, `lint`) y dependencias.
2.  Crear el archivo de configuración del bundler (ej. `vite.config.js`) adaptado a la estructura de carpetas que encontraste.
3.  Crear archivos de configuración de entorno (`.eslintrc`, `.gitignore`, `jsconfig.json` o `tsconfig.json`).
4.  Crear un `README.md` de "Instalación Rápida" explicando cómo levantar este proyecto resucitado.

---

### 🛑 Reglas de Seguridad
1.  **NO modifiques ni borres** el código fuente existente en `src/` a menos que sea estrictamente necesario para corregir errores de sintaxis bloqueantes.
2.  Tu trabajo es crear la **infraestructura** alrededor del código existente.
3.  Si detectas código muy antiguo (ej. React Classes antiguas), configúralo para que funcione, no intentes refactorizarlo todo ahora.

**Por favor, inicia ahora con la FASE 1: Análisis Forense.**
