# Ejercicios Propuestos: Operadores

## Ejercicio 1: Refactorización con Operadores Lógicos

**Objetivo:** Refactorizar una función utilizando la evaluación de cortocircuito para hacerla más concisa.

**Instrucciones:**
Toma la siguiente función y reescríbela en una sola línea utilizando el operador lógico `&&`.

```javascript
function mostrarBienvenida(usuario) {
  if (usuario && usuario.nombre) {
    console.log(`¡Bienvenido, ${usuario.nombre}!`);
  }
}

// Casos de prueba
const usuario1 = { nombre: 'Marta' };
const usuario2 = null;
const usuario3 = { nombre: null };

mostrarBienvenida(usuario1); // Debería imprimir "¡Bienvenido, Marta!"
mostrarBienvenida(usuario2); // No debería imprimir nada
mostrarBienvenida(usuario3); // No debería imprimir nada
```

<details>
<summary>Solución Razonada</summary>

```javascript
// Función original
function mostrarBienvenida(usuario) {
  if (usuario && usuario.nombre) {
    console.log(`¡Bienvenido, ${usuario.nombre}!`);
  }
}

// Función refactorizada
const mostrarBienvenidaRefactorizada = (usuario) =>
  usuario && usuario.nombre && console.log(`¡Bienvenido, ${usuario.nombre}!`);

// Casos de prueba
console.log("--- Probando solución refactorizada ---");
const usuario1 = { nombre: 'Marta' };
const usuario2 = null;
const usuario3 = { nombre: null };

mostrarBienvenidaRefactorizada(usuario1); // Imprime el saludo
mostrarBienvenidaRefactorizada(usuario2); // No imprime nada
mostrarBienvenidaRefactorizada(usuario3); // No imprime nada
```

**Explicación:**

La evaluación de cortocircuito del operador `&&` nos permite encadenar las condiciones.
1.  `usuario`: Si `usuario` es `null` o `undefined` (un valor "falsy"), la evaluación se detiene y la expresión termina, retornando el valor `falsy`. `console.log` nunca se alcanza.
2.  `usuario.nombre`: Si `usuario` existe (es "truthy"), la evaluación continúa. Si `usuario.nombre` es `null`, `undefined` o un string vacío (falsy), la evaluación se detiene aquí.
3.  `console.log(...)`: Solo si las dos condiciones anteriores son "truthy", la expresión final se evalúa, que en este caso es la ejecución de `console.log`. El valor de retorno de `console.log` es `undefined`, que se convierte en el valor de retorno de la función.

Esta técnica es muy común en React y otros frameworks para renderizado condicional.
</details>

---

## Ejercicio 2: Asignación de Roles con Operador Ternario

**Objetivo:** Utilizar el operador ternario para asignar un rol basado en múltiples condiciones.

**Instrucciones:**
Escribe una función `asignarRol` que reciba un objeto `usuario`. El objeto puede tener las propiedades `esAdmin` y `tienePermisos`. La función debe devolver un string con el rol del usuario según las siguientes reglas:
- Si `esAdmin` es `true`, el rol es `"Administrador"`.
- Si `esAdmin` es `false` pero `tienePermisos` es `true`, el rol es `"Editor"`.
- Si ambas son `false`, el rol es `"Lector"`.

Usa un operador ternario anidado para resolverlo.

```javascript
// Tu código aquí

// Casos de prueba
const admin = { esAdmin: true, tienePermisos: true };
const editor = { esAdmin: false, tienePermisos: true };
const lector = { esAdmin: false, tienePermisos: false };

console.log(asignarRol(admin));  // "Administrador"
console.log(asignarRol(editor)); // "Editor"
console.log(asignarRol(lector)); // "Lector"
```

<details>
<summary>Solución Razonada</summary>

```javascript
function asignarRol(usuario) {
  return usuario.esAdmin
    ? "Administrador"
    : usuario.tienePermisos
    ? "Editor"
    : "Lector";
}

// Casos de prueba
const admin = { esAdmin: true, tienePermisos: true };
const editor = { esAdmin: false, tienePermisos: true };
const lector = { esAdmin: false, tienePermisos: false };

console.log(asignarRol(admin));  // "Administrador"
console.log(asignarRol(editor)); // "Editor"
console.log(asignarRol(lector)); // "Lector"
```

**Explicación:**

El ternario anidado funciona de la siguiente manera:
1.  **`usuario.esAdmin ? "Administrador" : ...`**: La primera condición evalúa si `usuario.esAdmin` es `true`.
    -   Si es `true`, la expresión devuelve inmediatamente `"Administrador"`.
    -   Si es `false`, la evaluación pasa a la expresión después de los dos puntos (`:`).

2.  **`... : usuario.tienePermisos ? "Editor" : "Lector"`**: Esta es la segunda parte, que es otro operador ternario.
    -   Se evalúa `usuario.tienePermisos`. Si es `true`, devuelve `"Editor"`.
    -   Si es `false`, devuelve `"Lector"`.

Aunque es una solución concisa, los ternarios anidados pueden dificultar la lectura. Si la lógica fuera más compleja, una estructura `if-else if-else` sería más apropiada para mantener la claridad.
</details>
