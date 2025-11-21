# Glosario de Términos: Módulos de ES (ESM)

### Módulo (Module)
**Definición:** Un archivo de JavaScript que explícitamente exporta o importa funcionalidades para ser utilizadas en otros archivos. Cada módulo tiene su propio **scope de nivel superior**, lo que significa que las variables, funciones o clases declaradas en un módulo no son accesibles globalmente por defecto. Esto previene la contaminación del scope global.

### ES Modules (ESM)
**Definición:** El sistema de módulos estándar y nativo de JavaScript, introducido en ES6 (ECMAScript 2015). Utiliza las palabras clave `import` y `export` y es el sistema de módulos oficial para los navegadores y Node.js moderno.

### `export`
**Definición:** Una palabra clave utilizada para declarar que una variable, función o clase dentro de un módulo debe ser accesible desde otros módulos.
- **Exportación Nombrada (Named Export):** Exporta una o más funcionalidades con un nombre específico. Puede haber múltiples exportaciones nombradas en un solo módulo.
  - **Sintaxis 1:** `export const miVar = 10;`
  - **Sintaxis 2:** `const miVar = 10; export { miVar };`
- **Exportación por Defecto (Default Export):** Exporta una única funcionalidad como la exportación "principal" del módulo. Solo puede haber **una** exportación por defecto por módulo.
  - **Sintaxis:** `export default miFuncion;`

### `import`
**Definición:** Una palabra clave utilizada para importar funcionalidades que han sido exportadas por otro módulo.
- **Importación Nombrada (Named Import):** Importa funcionalidades específicas por su nombre, utilizando llaves `{}`.
  - **Sintaxis:** `import { miVar } from './miModulo.js';`
  - **Con alias:** `import { miVar as miVariable } from './miModulo.js';`
- **Importación por Defecto (Default Import):** Importa la funcionalidad exportada por defecto. No utiliza llaves y se le puede dar cualquier nombre.
  - **Sintaxis:** `import miFuncionPrincipal from './miModulo.js';`
- **Importación de Espacio de Nombres (Namespace Import):** Importa todas las exportaciones nombradas de un módulo como un único objeto.
  - **Sintaxis:** `import * as miModulo from './miModulo.js';`
- **Importación "Bare" (Bare Import):** Una importación donde el especificador del módulo no es una ruta relativa o absoluta (e.g., `import React from 'react'`). Esto es manejado por el entorno de ejecución (como Node.js o un bundler como Webpack) para resolver el módulo desde la carpeta `node_modules`.

### `<script type="module">`
**Definición:** Un atributo en la etiqueta `<script>` del HTML que le indica al navegador que el script debe ser tratado como un módulo de ES. Esto habilita el uso de `import` y `export`.
- **Comportamiento Clave:**
  1.  Los scripts de tipo módulo se ejecutan en **modo estricto** por defecto.
  2.  Tienen su propio scope de nivel superior.
  3.  Se cargan con el atributo `defer` por defecto, lo que significa que se descargan en paralelo al parseo del HTML y se ejecutan en orden solo después de que el documento ha sido completamente parseado.

### Importación Dinámica `import()`
**Definición:** Una sintaxis similar a una función (`import('path/to/module.js')`) que permite cargar un módulo de forma asíncrona y bajo demanda. A diferencia de la declaración estática `import`, `import()` puede ser llamado en cualquier parte del código (e.g., dentro de una función o un `if`). Devuelve una **Promesa** que se resuelve con el objeto del módulo.
- **Caso de uso:** Carga diferida (lazy loading) de componentes o funcionalidades para mejorar el rendimiento inicial de la página (Code Splitting).

### CommonJS (CJS)
**Definición:** El sistema de módulos utilizado históricamente por Node.js. Utiliza `require()` para importar y `module.exports` o `exports` para exportar. Aunque ESM es el estándar moderno, CommonJS todavía es muy prevalente en el ecosistema de Node.js.

### Bundler (Empaquetador)
**Definición:** Una herramienta de desarrollo (como Webpack, Rollup, Vite o Parcel) que toma los módulos de JavaScript con sus dependencias (`import`/`export`) y los procesa y combina en uno o más archivos optimizados para ser ejecutados en el navegador. Los bundlers realizan tareas como la minificación, la transpilación y el "tree shaking".

### Tree Shaking
**Definición:** Un proceso de optimización realizado por los bundlers que consiste en analizar las declaraciones `import` y `export` para detectar y eliminar el código de los módulos que no está siendo utilizado ("código muerto"), reduciendo así el tamaño final del bundle.
