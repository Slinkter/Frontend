# Ejercicios Propuestos: Booleanos y Conversión de Tipos

## Ejercicio 1: Depuración de una Función de Permisos

**Objetivo:** Identificar y corregir un error común relacionado con la evaluación "truthy" de objetos.

**Instrucciones:**
La siguiente función `tieneAcceso` intenta verificar si un usuario tiene permisos. Sin embargo, contiene un error lógico. Identifica por qué la función no se comporta como se espera y corrígela.

```javascript
// El objeto de permisos puede estar vacío o contener los permisos específicos.
const permisosUsuario1 = { rol: 'admin' };
const permisosUsuario2 = {}; // El usuario no tiene un rol definido.
const permisosUsuario3 = null; // No se cargaron los permisos.

function tieneAcceso(permisos) {
  // Bug: Esta condición es incorrecta.
  if (permisos) {
    return true;
  } else {
    return false;
  }
}

// Casos de prueba (el comportamiento esperado es que solo el usuario 1 tenga acceso)
console.log('Usuario 1 tiene acceso:', tieneAcceso(permisosUsuario1)); // Esperado: true -> Actual: true
console.log('Usuario 2 tiene acceso:', tieneAcceso(permisosUsuario2)); // Esperado: false -> Actual: true (¡ERROR!)
console.log('Usuario 3 tiene acceso:', tieneAcceso(permisosUsuario3)); // Esperado: false -> Actual: false
```

<details>
<summary>Solución Razonada</summary>

```javascript
const permisosUsuario1 = { rol: 'admin' };
const permisosUsuario2 = {};
const permisosUsuario3 = null;

// Solución
function tieneAccesoCorregido(permisos) {
  // La condición correcta es verificar que 'permisos' no sea null/undefined Y
  // que la propiedad 'rol' exista y tenga un valor 'truthy'.
  return !!(permisos && permisos.rol);
}

// Otra forma más explícita
function tieneAccesoCorregido2(permisos) {
  if (permisos && permisos.rol === 'admin') {
    return true;
  }
  return false;
}

// Casos de prueba con la solución
console.log('--- Solución Corregida ---');
console.log('Usuario 1 tiene acceso:', tieneAccesoCorregido(permisosUsuario1)); // true
console.log('Usuario 2 tiene acceso:', tieneAccesoCorregido(permisosUsuario2)); // false
console.log('Usuario 3 tiene acceso:', tieneAccesoCorregido(permisosUsuario3)); // false
```

**Explicación del Error:**

El error original se debe a que un objeto vacío (`{}`) es un valor **truthy**. La condición `if (permisos)` evaluaba `if ({})`, lo cual es `true`, y la función devolvía `true` incorrectamente para `permisosUsuario2`.

La solución correcta debe ir un paso más allá y comprobar la existencia y el valor de la propiedad que realmente concede el acceso (en este caso, `permisos.rol`).
-   `permisos && permisos.rol`: Esta expresión utiliza el cortocircuito. Si `permisos` es `null` (falsy), la expresión se detiene y devuelve `null`. Si `permisos` es un objeto, continúa y evalúa `permisos.rol`. Si la propiedad `rol` no existe, el resultado es `undefined` (falsy). Si existe y tiene un valor (como `'admin'`), el resultado es ese valor (truthy).
-   `!!(...)`: La doble negación final convierte el resultado de la expresión (`null`, `undefined` o `'admin'`) a un booleano estricto (`true` o `false`), que es lo que la función debe devolver.
</details>

---

## Ejercicio 2: Limpieza de Datos de un Array

**Objetivo:** Utilizar el conocimiento de los valores "falsy" para limpiar un array.

**Instrucciones:**
Crea una función `limpiarArray` que reciba un array que contiene una mezcla de valores "truthy" y "falsy". La función debe devolver un nuevo array que contenga únicamente los valores "truthy".

**Pista:** El método `.filter()` de los arrays es perfecto para esto. A `.filter()` se le pasa una función que, para cada elemento, debe devolver `true` (para mantenerlo) o `false` (para descartarlo).

```javascript
// Tu código aquí

// Caso de prueba
const arraySucio = [0, 1, "hola", "", null, { nombre: "Juan" }, undefined, [], NaN, "mundo", false];
const arrayLimpio = limpiarArray(arraySucio);
console.log(arrayLimpio);
// Esperado: [1, "hola", { nombre: "Juan" }, [], "mundo"]
```

<details>
<summary>Solución Razonada</summary>

```javascript
function limpiarArray(arr) {
  // El método .filter() itera sobre cada elemento del array.
  // Le pasamos la función Boolean como callback.
  // Para cada elemento, Boolean(elemento) se evaluará a 'true' si es truthy
  // y a 'false' si es falsy.
  // .filter() construirá un nuevo array solo con los elementos para los cuales
  // el callback devolvió 'true'.
  return arr.filter(Boolean);
}

// Caso de prueba
const arraySucio = [0, 1, "hola", "", null, { nombre: "Juan" }, undefined, [], NaN, "mundo", false];
const arrayLimpio = limpiarArray(arraySucio);
console.log(arrayLimpio);
// [1, "hola", { nombre: "Juan" }, [], "mundo"]
```

**Explicación:**

Esta es una solución elegante y muy común en JavaScript que demuestra un dominio de los conceptos de "truthy/falsy" y de los métodos funcionales de los arrays.

El método `array.filter(callback)` espera que `callback` sea una función que devuelva un booleano. La función global `Boolean()` encaja perfectamente en este requisito.

Cuando `filter` procesa el `arraySucio`:
-   `filter(Boolean)` para el elemento `0`: `Boolean(0)` devuelve `false`. El `0` es descartado.
-   `filter(Boolean)` para el elemento `1`: `Boolean(1)` devuelve `true`. El `1` se incluye en el nuevo array.
-   `filter(Boolean)` para el elemento `""`: `Boolean("")` devuelve `false`. Es descartado.
-   `filter(Boolean)` para el elemento `{ nombre: "Juan" }`: `Boolean({...})` devuelve `true`. El objeto se incluye.
-   ...y así sucesivamente para todos los elementos.

El resultado es un nuevo array que contiene solo los elementos que pasaron la prueba de ser "truthy".
</details>
