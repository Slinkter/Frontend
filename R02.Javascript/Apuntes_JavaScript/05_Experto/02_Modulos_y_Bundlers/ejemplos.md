# Ejemplos: Sistema de Módulos

## 1. Patrón Módulo Antiguo (IIFE)

Cómo se, simulaba privacidad antes de los módulos.

```javascript
/* utils.js 'falso' */
var MiModulo = (function () {
  var _secreto = "12345"; // Privado

  function metodoPublico() {
    console.log("El secreto es: " + _secreto);
  }

  return {
    metodo: metodoPublico,
  };
})();

MiModulo.metodo(); // Funciona
// console.log(MiModulo._secreto); // undefined
```

## 2. ESM: Named vs Default Exports

### archivo: `math.js`

```javascript
export const PI = 3.1416; // Named

export function sumar(a, b) {
  // Named
  return a + b;
}

export default function calculadora() {
  // Default
  return "Soy una calculadora";
}
```

### archivo: `main.js`

```javascript
// Importar default (cualquier nombre) y named (llaves)
import Calc, { PI, sumar as add } from "./math.js";

console.log(Calc()); // "Soy una calculadora"
console.log(add(2, PI));
```

## 3. CommonJS (Node.js)

### archivo: `db.js`

```javascript
const dbUrl = "mongo://...";

function connect() {
  console.log("Conectado a " + dbUrl);
}

module.exports = {
  connect,
  url: dbUrl,
};
```

### archivo: `server.js`

```javascript
const db = require("./db");
db.connect();
```
