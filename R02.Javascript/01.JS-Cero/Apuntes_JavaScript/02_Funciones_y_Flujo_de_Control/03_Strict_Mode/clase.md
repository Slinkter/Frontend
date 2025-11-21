# Clase: Strict Mode - Hacia un JavaScript más Seguro y Fiable

## 1. Introducción: La Necesidad de un Contrato más Estricto

JavaScript fue diseñado originalmente con una gran flexibilidad, perdonando ciertos errores de sintaxis o comportamiento para evitar que los scripts se "rompieran". Esta indulgencia, si bien útil en los primeros días de la web, a menudo ocultaba problemas subyacentes en el código, dando lugar a los llamados **errores silenciosos**: el código no falla, pero tampoco funciona como se espera, haciendo la depuración extremadamente difícil.

Para abordar esto, ECMAScript 5 (ES5) introdujo el **Modo Estricto (Strict Mode)**. No es una nueva versión de JavaScript, sino una forma de "optar" por una variante del lenguaje con un conjunto de reglas más riguroso. El modo estricto transforma los errores silenciosos en errores explícitos que lanzan excepciones, mejorando la calidad, seguridad y rendimiento del código.

## 2. Activación del Modo Estricto

El modo estricto se activa mediante la directiva de pragma `"use strict";`. Esta debe ser la primera declaración en el scope donde se desea aplicar.

### 2.1. Scope Global
Aplicar el modo estricto a todo un script.
```javascript
"use strict";
// Todo el código en este archivo se ejecuta en modo estricto.
var miVariable = "Hola";
```
**Consideración de Ingeniería:** Activar el modo estricto globalmente puede ser problemático al concatenar scripts, donde un archivo en modo estricto se une con otro que no lo es.

### 2.2. Scope de Función
Aplicar el modo estricto solo a una función específica y a su contenido.
```javascript
function miFuncionEstricta() {
  "use strict";
  // El código aquí dentro está en modo estricto.
  // ...
}
```
Este enfoque es más granular y seguro para la modularidad, ya que no afecta a otros scripts.

**El Estándar Moderno: Módulos de ES6**
En el desarrollo moderno, la necesidad de usar `"use strict";` manualmente ha disminuido drásticamente. **Todo el código dentro de los módulos de ES6 (`import`/`export`) se ejecuta en modo estricto por defecto.** Dado que el desarrollo actual se basa casi por completo en módulos, el modo estricto es ahora el comportamiento estándar implícito.

## 3. Cambios Fundamentales del Modo Estricto

El modo estricto no es una simple sugerencia; cambia activamente el comportamiento del motor de JavaScript.

### 3.1. Eliminación de Variables Globales Accidentales
Este es quizás su beneficio más importante. En modo normal, asignar un valor a una variable no declarada crea una nueva propiedad en el objeto global (`window`), un comportamiento peligroso y propenso a errores.

```javascript
// Modo Normal
function crearGlobal() {
  miGlobal = 10; // Accidentalmente crea window.miGlobal = 10
}
crearGlobal();
console.log(window.miGlobal); // 10

// Modo Estricto
function noCrearGlobal() {
  "use strict";
  // miGlobal = 10; // Lanza un ReferenceError: miGlobal is not defined
}
```

### 3.2. Comportamiento predecible de `this`
En modo normal, si se llama a una función sin un contexto de objeto explícito, `this` dentro de esa función apunta al objeto global. Esto es una fuente común de errores.

```javascript
function mostrarThis() {
  console.log(this);
}
mostrarThis(); // En modo normal, imprime el objeto 'window'.

function mostrarThisEstricto() {
  "use strict";
  console.log(this);
}
mostrarThisEstricto(); // En modo estricto, imprime 'undefined'.
```
Este cambio previene la modificación accidental de propiedades globales (e.g., `this.nombre = '... '` no modificará `window.nombre`).

### 3.3. Prohibición de Prácticas Inseguras o Desaconsejadas

El modo estricto convierte varias prácticas dudosas en errores explícitos:

-   **Parámetros duplicados:** `function(a, a) {}` lanza un `SyntaxError`.
-   **Escritura en propiedades de solo lectura:** Intentar modificar una propiedad no escribible lanza un `TypeError`.
-   **Uso de `delete`:** `delete miVariable;` lanza un `SyntaxError`. `delete` solo está permitido para propiedades de objetos.
-   **Uso de `with`:** La sentencia `with`, una fuente notoria de confusión de scope, está completamente prohibida.

## 4. Beneficios para el Rendimiento y el Futuro

-   **Optimización:** Al prohibir ciertos comportamientos "mágicos" y ambiguos, el modo estricto facilita que los motores de JavaScript optimicen el código de manera más efectiva.
-   **Compatibilidad Futura:** El modo estricto prohíbe sintaxis que podría entrar en conflicto con nuevas características de futuras versiones de ECMAScript, haciendo el código más robusto a largo plazo.

## 5. Conclusión

El modo estricto es una herramienta fundamental en el arsenal de un desarrollador de JavaScript profesional. Impone una disciplina que conduce a un código más limpio, seguro y mantenible. Aunque su uso manual es menos frecuente gracias a los módulos de ES6, comprender los principios que impone es crucial, ya que estos principios son la base del JavaScript moderno y de las buenas prácticas de ingeniería de software.
