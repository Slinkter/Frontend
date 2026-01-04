# Clase 02: Módulos y Bundlers

La modularización es la clave para escalar aplicaciones JavaScript. Permite dividir el código en archivos independientes con responsabilidades claras.

## 1. Historia Breve (El caos antes del orden)

Antes de ES6, JS no tenía módulos nativos.

- **IIFE:** Se usaban funciones inmediatas para encapsular código y no contaminar el global.
- **CommonJS (CJS):** El estándar adoptado por Node.js (`require`, `module.exports`).
- **AMD / UMD:** Intentos de estandarización para el navegador.

## 2. ES Modules (ESM) - El Estándar Oficial

Introducido en ES6 (2015). Es la forma nativa de JS para manejar módulos.

### Características

- **Estático:** La estructura de importaciones/exportaciones se analiza antes de la ejecución (permite Tree Shaking).
- **Stict Mode:** Siempre se ejecutan en modo estricto (`use strict`) por defecto.
- **Asíncrono:** La carga de módulos puede ser asíncrona.

### Sintaxis

- `export const x = 1` (Named Export)
- `export default function() {}` (Default Export)
- `import { x } from './file.js'`
- `import func from './file.js'`

## 3. CommonJS (CJS) - El Legado de Node.js

Aún muy presente en herramientas de servidor y configuración.

- **Dinámico:** Puedes hacer `require()` dentro de un `if`.
- **Síncrono:** Diseñado para carga de archivos en servidor (disco).

### Sintaxis

- `module.exports = { x: 1 }`
- `const { x } = require('./file')`

## 4. Bundlers (Empaquetadores)

Los navegadores modernos soportan ESM, pero por razones de rendimiento (menos peticiones HTTP) y compatibilidad (transpilación de código nuevo a viejo), usamos Bundlers.

- **Webpack:** El más potente y complejo.
- **Vite:** Moderno, ultra-rápido, usa ESM nativo en desarrollo.
- **Parcel:** Configuración cero.
- **Rollup:** Especializado en librerías.
