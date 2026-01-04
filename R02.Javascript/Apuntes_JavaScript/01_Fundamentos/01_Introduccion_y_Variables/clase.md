# Clase 01: Introducción a JavaScript y Variables

## 1. Introducción al Lenguaje

JavaScript es un lenguaje de programación de alto nivel, interpretado (con compilación Just-In-Time o JIT), y multiparadigma. Es el lenguaje principal de la web y se ejecuta en un entorno de ejecución (Runtime Environment), que usualmente es el navegador (Browser) o un servidor (Node.js).

### Características Principales:

- **Tipado Dinámico:** No es necesario declarar el tipo de dato de una variable; este se infiere en tiempo de ejecución.
- **Débilmente Tipado:** Permite conversiones implícitas de tipos (coerción), lo que puede llevar a resultados inesperados si no se maneja con cuidado.
- **Single Threaded:** Ejecuta una sola tarea a la vez en su hilo principal (Call Stack), aunque maneja la concurrencia a través del Event Loop.

## 2. Variables y Almacenamiento de Datos

Una variable es un identificador simbólico asociado a un espacio en memoria donde se almacena un valor. En JavaScript, la gestión de memoria es automática (Garbage Collection).

### Declaración de Variables

Desde ECMAScript 6 (ES6 / ES2015), existen tres palabras reservadas para declarar variables, cada una con comportamientos específicos de **Scope** (alcance) y **Mutabilidad**.

#### 2.1 `var` (Pre-ES6)

- **Scope:** Tiene alcance de función (Function Scope) o global si se declara fuera de una función. No respeta el alcance de bloque (`if`, `for`).
- **Hoisting:** Las declaraciones con `var` son elevadas al inicio de su contexto y se inicializan con `undefined`.
- **Re-declaración:** Permite redeclarar la misma variable varias veces.
- **Uso Actual:** **Desaconsejado** en desarrollo moderno debido a la posibilidad de "contaminar" el scope y causar bugs difíciles de rastrear.

#### 2.2 `let` (ES6)

- **Scope:** Tiene alcance de bloque (Block Scope). Solo existe dentro de las llaves `{}` donde fue declarada.
- **Hoisting:** Es elevada, pero **NO** inicializada. Acceder a ella antes de la declaración arroja un `ReferenceError`. Esto se conoce como **Temporal Dead Zone (TDZ)**.
- **Re-declaración:** No permite redeclarar la misma variable en el mismo scope.
- **Mutabilidad:** Permite reasignar el valor.

#### 2.3 `const` (ES6)

- **Scope:** Alcance de bloque (Block Scope), igual que `let`.
- **Hoisting:** Sufre de TDZ, igual que `let`.
- **Inmutabilidad de Asignación:** **No** se puede reasignar el identificador a un nuevo valor.
- **Importante:** Si `const` almacena un objeto o array, la _referencia_ no cambia, pero el _contenido_ del objeto (propiedades) **SÍ** puede modificarse.

## 3. Tipos de Datos

JavaScript maneja dos categorías de tipos de datos:

### 3.1 Primitivos (Primitives)

Son inmutables y se pasan por valor.

1.  **String:** Cadena de caracteres.
2.  **Number:** Enteros y flotantes (IEEE 754).
3.  **Boolean:** `true` o `false`.
4.  **Null:** Valor intencional de "ausencia de objeto".
5.  **Undefined:** Valor asignado automáticamente a variables no inicializadas.
6.  **Symbol:** (ES6) Identificador único.
7.  **BigInt:** (ES2020) Enteros de precisión arbitraria.

### 3.2 Objetos (Objects / Reference Types)

Son mutables y se pasan por referencia.

- Object (`{}`)
- Array (`[]`)
- Function
- Date, RegExp, etc.

---

**Nota Académica:** Diferenciar entre `null` y `undefined` es crucial. `undefined` es "no tengo valor asignado aún", mientras que `null` es "tengo el valor nulo asignado explícitamente".
