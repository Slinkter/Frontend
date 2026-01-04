# Ejercicios: Módulos

## Ejercicio 1: Refactorizar a ESM

Tienes este código estilo CommonJS. Conviértelo a ES Modules.

**operaciones.js (CJS)**

```javascript
const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
module.exports = { sumar, restar };
```

**app.js (CJS)**

```javascript
const { sumar } = require("./operaciones");
console.log(sumar(1, 2));
```

<details>
<summary>Ver Solución</summary>

**operaciones.js (ESM)**

```javascript
export const sumar = (a, b) => a + b;
export const restar = (a, b) => a - b;
```

**app.js (ESM)**

```javascript
import { sumar } from "./operaciones.js";
console.log(sumar(1, 2));
```

</details>

## Ejercicio 2: Dynamic Import

¿Cómo cargarías un módulo SOLO cuando el usuario hace click en un botón? (Code Splitting).

```javascript
const btn = document.querySelector("button");

btn.addEventListener("click", () => {
  // Tu código para importar './heavyModule.js' y usar su función .init()
});
```

<details>
<summary>Ver Solución</summary>

Se usa `import()` como función, que retorna una Promesa.

```javascript
btn.addEventListener("click", async () => {
  try {
    const modulo = await import("./heavyModule.js");
    modulo.init();
  } catch (err) {
    console.error("Error cargando módulo", err);
  }
});
```

</details>
