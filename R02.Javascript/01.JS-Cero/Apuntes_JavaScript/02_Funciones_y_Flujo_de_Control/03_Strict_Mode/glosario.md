# Glosario de Términos: Strict Mode (Modo Estricto)

### Strict Mode (Modo Estricto)
**Definición:** Una característica introducida en ECMAScript 5 (ES5) que permite ejecutar el código JavaScript en un contexto de ejecución más "estricto". Este modo cambia tanto la sintaxis como el comportamiento en tiempo de ejecución, convirtiendo ciertos "errores silenciosos" de JavaScript en errores explícitos que lanzan excepciones.

### `"use strict";`
**Definición:** Una directiva literal. Es un string que, cuando se coloca al principio de un script o de una función, activa el modo estricto para ese scope. No tiene ningún efecto si se coloca en otro lugar que no sea el inicio.

### Error Silencioso (Silent Error)
**Definición:** Un error en el código que no detiene la ejecución ni produce una advertencia en la consola, pero que impide que el programa se comporte como se esperaba. El modo estricto fue diseñado para eliminar muchos de estos errores, haciéndolos explícitos.
- **Ejemplo (sin modo estricto):** Asignar un valor a una variable no declarada crea una variable global accidentalmente. En modo estricto, esto lanza un `ReferenceError`.

### Scope del Modo Estricto
**Definición:** El modo estricto puede ser aplicado a dos scopes diferentes:
1.  **Scope Global:** Si `"use strict";` se declara al principio de un archivo de script, todo el código en ese archivo se ejecutará en modo estricto.
2.  **Scope de Función:** Si `"use strict";` se declara al principio del cuerpo de una función, solo el código dentro de esa función (y en cualquier función anidada) se ejecutará en modo estricto.

### Cambios Principales en Modo Estricto
**Definición:** Algunas de las restricciones y cambios más importantes que introduce el modo estricto son:
-   **Variables no declaradas:** Asignar un valor a una variable no declarada lanza un `ReferenceError`.
-   **`this` en funciones:** El valor de `this` en una función llamada en el scope global es `undefined`, en lugar de ser el objeto global (`window`). Esto previene la modificación accidental del objeto global.
-   **Propiedades de solo lectura:** Intentar escribir en una propiedad de solo lectura (como `length` de un string o una propiedad definida con `writable: false`) lanza un `TypeError`.
-   **Parámetros de función duplicados:** Declarar una función con nombres de parámetros duplicados (e.g., `function(a, a)`) lanza un `SyntaxError`.
-   **Uso de `delete`:** Intentar usar `delete` en una variable, una función o un argumento de función (lo cual no es posible) lanza un `SyntaxError`.
-   **Modo octal:** La sintaxis de números octales con un cero inicial (e.g., `010`) está prohibida y lanza un `SyntaxError`.

### Módulos de ES6 (ESM)
**Definición:** El sistema de módulos estándar de JavaScript (`import`/`export`). Es importante saber que **todo el código dentro de los módulos de ES6 se ejecuta en modo estricto automáticamente**. No es necesario escribir `"use strict";`. Esta es una de las razones por las que el código moderno rara vez requiere la directiva manual.
