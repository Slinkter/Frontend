# Glosario de Términos: Scope y Hoisting

### Scope (Ámbito)
**Definición:** El `scope` determina la accesibilidad y visibilidad de las variables y funciones en diferentes partes del código. Define el contexto de ejecución donde los identificadores (nombres de variables/funciones) son válidos. Intentar acceder a una variable fuera de su scope resulta en un `ReferenceError`.

### Scope Global (Global Scope)
**Definición:** El scope más externo. Las variables y funciones declaradas en el scope global son accesibles desde cualquier otro scope en el programa. En un navegador, el objeto global es `window`. Contaminar el scope global (declarar demasiadas variables globales) se considera una mala práctica.

### Scope de Función (Function Scope)
**Definición:** Un scope creado por una función. Las variables declaradas con `var` dentro de una función solo son accesibles dentro de esa función. Cada función crea su propio scope.

### Scope de Bloque (Block Scope - ES6)
**Definición:** Un scope creado por un bloque de código, delimitado por llaves `{}`. Las sentencias `if`, `for`, `while`, etc., crean scopes de bloque. Las variables declaradas con `let` y `const` respetan este scope, lo que significa que solo existen dentro del bloque en el que fueron declaradas.

### Ámbito Léxico (Lexical Scope)
**Definición:** Un principio fundamental en JavaScript que establece que el scope de una función está determinado por su ubicación en el código fuente en el momento de su declaración, y no por dónde es llamada. Una función anidada tiene acceso al scope de su función padre, formando una "cadena de scopes" (scope chain).

### Cadena de Scopes (Scope Chain)
**Definición:** Cuando se busca el valor de una variable, JavaScript comienza en el scope actual. Si no la encuentra, se mueve al scope padre (el scope exterior que contiene al actual) y continúa este proceso hasta llegar al scope global. Si la variable no se encuentra en la cadena, se lanza un `ReferenceError`.

### Hoisting (Elevación)
**Definición:** Un mecanismo interno de JavaScript donde las declaraciones de variables y funciones son "movidas" conceptualmente a la parte superior de su scope contenedor (global o de función) antes de que el código sea ejecutado.
- **Declaraciones de Función:** Se elevan por completo (nombre y cuerpo), por lo que pueden ser llamadas antes de ser declaradas.
- **`var`:** Solo la declaración de la variable es elevada, no su inicialización. La variable existe con el valor `undefined` hasta que la línea de asignación es alcanzada.
- **`let` y `const`:** También son elevadas, pero no son inicializadas. Acceder a ellas antes de su declaración resulta en un `ReferenceError` debido a la **Zona Muerta Temporal (TDZ)**.

### Zona Muerta Temporal (Temporal Dead Zone - TDZ)
**Definición:** El período desde que se entra en un scope de bloque hasta que se alcanza la línea donde una variable es declarada con `let` o `const`. Durante este período, la variable está en un estado "sin inicializar" y cualquier intento de acceder a ella provocará un `ReferenceError`. Esto previene el uso de variables antes de su declaración.
