# Glosario: Módulos

## C

### CommonJS (CJS)

Sistema de módulos utilizado por defecto en Node.js. Utiliza `require` para importar y `module.exports` para exportar. Es síncrono.

## E

### ES Modules (ESM)

El estándar oficial de módulos de JavaScript ECMAScript. Utiliza `import` y `export`. Permite análisis estático y tree-shaking.

## II

### IIFE

Immediately Invoked Function Expression. Función que se ejecuta al definirse. Históricamente usada para crear módulos simulados con scopes privados.

## T

### Tree Shaking

Término usado en el contexto de bundlers (como Rollup, Webpack). Es el proceso de eliminación de código muerto (dead code elimination). Gracias a la estructura estática de ESM, el bundler puede detectar qué exportaciones NO se usan y eliminarlas del bundle final, reduciendo el peso de la aplicación.
