# Ejemplos Prácticos: Scope y Hoisting

## 1. Ámbito Léxico (Lexical Scope)

El scope está determinado por la ubicación de las funciones en el código, no por dónde se llaman.

```javascript
// Ejemplo 1: Cadena de Scopes
const globalVar = "Soy Global";

function funcionPadre() {
  const padreVar = "Soy Padre";

  function funcionHija() {
    const hijaVar = "Soy Hija";
    // La función hija puede "ver hacia afuera" y acceder a los scopes de sus padres.
    console.log(hijaVar);      // "Soy Hija"
    console.log(padreVar);    // "Soy Padre"
    console.log(globalVar);   // "Soy Global"
  }

  funcionHija();
}

funcionPadre();

// Los scopes externos no pueden "ver hacia adentro".
// console.log(padreVar); // ReferenceError: padreVar is not defined
```

## 2. Scope de Bloque (`let`/`const`) vs. Scope de Función (`var`)

Esta es una de las mejoras más importantes de ES6.

```javascript
// Ejemplo 2: 'var' se filtra fuera del bloque
function testVar() {
  console.log("Antes del bloque:", i); // undefined (debido al hoisting de var)
  for (var i = 0; i < 3; i++) {
    console.log("Dentro del bucle:", i);
  }
  // 'i' sigue existiendo y es accesible aquí, lo cual puede ser problemático.
  console.log("Después del bucle:", i); // 3
}
testVar();

// Ejemplo 3: 'let' respeta el scope de bloque
function testLet() {
  // console.log("Antes del bloque:", i); // ReferenceError (TDZ)
  for (let i = 0; i < 3; i++) {
    console.log("Dentro del bucle:", i);
  }
  // 'i' no existe aquí. Intentar acceder a ella daría un ReferenceError.
  // console.log("Después del bucle:", i); // ReferenceError: i is not defined
}
testLet();
```

## 3. Hoisting

El comportamiento del hoisting varía significativamente entre los tipos de declaración.

### Hoisting en Declaraciones de Función
Se eleva la función completa.
```javascript
// Ejemplo 4: La declaración de la función es "movida" hacia arriba.
diHola(); // Funciona sin problemas.

function diHola() {
  console.log("¡Hola!");
}
```

### Hoisting en Expresiones de Función
No se eleva el cuerpo de la función.
```javascript
// Ejemplo 5: Solo se eleva la declaración de la variable.
// diAdios(); // TypeError: diAdios is not a function

var diAdios = function() {
  console.log("¡Adiós!");
};

diAdios();
```
Esto ocurre porque en la primera línea, `diAdios` existe debido al hoisting de `var`, pero su valor es `undefined`. `undefined` no es una función.

## 4. La Zona Muerta Temporal (Temporal Dead Zone - TDZ)

La TDZ previene el uso de variables `let` y `const` antes de que sean declaradas en el código.

```javascript
// Ejemplo 6: Demostración de la TDZ
function testTDZ() {
  // Comienzo del scope del bloque de la función
  
  // console.log(nombre); // ReferenceError: Cannot access 'nombre' before initialization
  // La TDZ para 'nombre' está activa aquí.

  // console.log(profesion); // ReferenceError: Cannot access 'profesion' before initialization
  // La TDZ para 'profesion' está activa aquí.
  
  const profesion = "Ingeniero"; // Fin de la TDZ para 'profesion'
  let nombre = "Juan";      // Fin de la TDZ para 'nombre'

  console.log(`Hola, soy ${nombre}, un ${profesion}.`); // Funciona
}

testTDZ();
```
La TDZ fuerza una buena práctica: siempre declara tus variables en la parte superior de su scope antes de usarlas.
