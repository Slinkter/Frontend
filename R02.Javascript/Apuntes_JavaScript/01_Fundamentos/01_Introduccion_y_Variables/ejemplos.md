# Ejemplos: Variables y Tipos de Datos

## 1. Diferencias de Scope (var vs let/const)

```javascript
// Ejemplo de Block Scope con let
if (true) {
  let bloque = "Solo existo aquí";
  var globalScope = "Existo afuera también";
}

console.log(globalScope); // "Existo afuera también"
try {
  console.log(bloque); // ReferenceError: bloque is not defined
} catch (e) {
  console.error(e.message);
}
```

## 2. Hoisting y Temporal Dead Zone (TDZ)

```javascript
// Hoisting con var
console.log(x); // undefined (No falla, pero no tiene valor)
var x = 5;

// Temporal Dead Zone con let
try {
  console.log(y); // ReferenceError: Cannot access 'y' before initialization
} catch (e) {
  console.error(e.message);
}
let y = 10;
```

## 3. Mutabilidad en const (Objetos)

Aunque `const` impide la reasignación, no hace al objeto inmutable.

```javascript
const usuario = {
  nombre: "Juan",
  edad: 25,
};

// Esto es VÁLIDO: mutamos la propiedad, no la referencia.
usuario.edad = 26;
console.log(usuario); // { nombre: "Juan", edad: 26 }

// Esto es INVÁLIDO: intentamos cambiar la referencia.
try {
  usuario = { nombre: "Pedro", edad: 30 };
} catch (e) {
  console.error("Error al reasignar const:", e.message); // Assignment to constant variable.
}
```

## 4. Tipos de Datos y `typeof`

```javascript
console.log(typeof "Hola"); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (Bug histórico de JS, pero es un primitivo)
console.log(typeof { a: 1 }); // "object"
console.log(typeof [1, 2, 3]); // "object" (Arrays son objetos en JS)
console.log(typeof function () {}); // "function" (Objetos invocables)
```
