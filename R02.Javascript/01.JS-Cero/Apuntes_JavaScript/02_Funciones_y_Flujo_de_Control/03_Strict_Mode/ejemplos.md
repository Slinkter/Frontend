# Ejemplos Prácticos: Strict Mode

El modo estricto cambia el comportamiento de JavaScript, convirtiendo errores silenciosos en errores lanzados. Aquí se muestran las diferencias clave.

## 1. Prevenir Variables Globales Accidentales

Este es uno de los beneficios más importantes del modo estricto.

```javascript
// Ejemplo 1: Sin modo estricto
// 'use strict'; // Descomenta esta línea para ver el cambio

function crearVariable() {
  // Olvidamos declarar la variable con 'let', 'const' o 'var'.
  mensaje = "Esto es una variable global accidental.";
}

crearVariable();
// En modo no estricto, 'mensaje' se crea en el objeto global (window).
console.log(window.mensaje); // "Esto es una variable global accidental."

// Si activamos "use strict", la línea 'mensaje = ...' lanzará un
// ReferenceError: mensaje is not defined, previniendo el error.
```

## 2. El Comportamiento de `this` en Funciones

El modo estricto hace que `this` sea más seguro.

```javascript
// Ejemplo 2: 'this' en el scope global
function mostrarThis() {
  // 'use strict'; // Descomenta esta línea para ver el cambio
  console.log(this);
}

// En modo no estricto, 'this' es el objeto 'window'.
mostrarThis(); // window

// En modo estricto, 'this' es 'undefined', lo que previene que
// modifiquemos accidentalmente el objeto global.
// Por ejemplo, `this.miVar = 10;` no creará `window.miVar = 10;`.
```

## 3. Errores al Escribir en Propiedades no Modificables

El modo estricto protege contra la modificación de propiedades de solo lectura.

```javascript
// Ejemplo 3: Intentar modificar una propiedad de solo lectura
'use strict';

// 1. Propiedad 'length' de un string (solo lectura)
const saludo = "Hola";
// saludo.length = 10; // TypeError: Cannot assign to read only property 'length'

// 2. Propiedad definida como no escribible
const obj = {};
Object.defineProperty(obj, 'propiedad', { value: 42, writable: false });

// obj.propiedad = 100; // TypeError: Cannot assign to read only property 'propiedad'
```
En modo no estricto, estas asignaciones fallarían silenciosamente (simplemente no harían nada), lo que puede ser muy confuso.

## 4. Prohibición de Sintaxis Peligrosa

El modo estricto limpia el lenguaje de algunas de sus partes más problemáticas.

```javascript
'use strict';

// Ejemplo 4: Parámetros de función duplicados
// function miFuncion(param1, param1) {
//   // SyntaxError: Duplicate parameter name not allowed in this context
// }

// Ejemplo 5: Uso de 'delete' en variables
let miVariable = 5;
// delete miVariable; // SyntaxError: Delete of an unqualified identifier in strict mode.
// 'delete' solo se puede usar en propiedades de objetos, ej: delete obj.propiedad

// Ejemplo 6: Notación octal (desaconsejada)
// const numeroOctal = 010; // SyntaxError: Octal literals are not allowed in strict mode.
// La forma correcta es usar el prefijo '0o': const numeroOctalCorrecto = 0o10;
```

Estos ejemplos demuestran cómo `"use strict";` actúa como una red de seguridad, forzando al desarrollador a escribir un código más limpio, explícito y menos propenso a errores difíciles de depurar.
