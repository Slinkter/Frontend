# Clase: Las Funciones como Objetos de Primera Clase

## 1. Introducción: El Corazón Reutilizable de JavaScript

Las funciones son el componente fundamental para la estructuración y reutilización de código en JavaScript. Sin embargo, su rol va mucho más allá de ser simples bloques de código con nombre. En JavaScript, las funciones son **objetos de primera clase** (First-Class Citizens), una característica de diseño que otorga al lenguaje una enorme flexibilidad y poder expresivo, habilitando patrones de programación funcional.

Que una función sea un objeto de primera clase significa que puede ser:
1.  Asignada a una variable o a una propiedad de un objeto.
2.  Pasada como argumento a otra función.
3.  Devuelta como el resultado de una función.

## 2. Formas de Definir una Función: Declaración vs. Expresión

Existen principalmente dos formas de definir una función, y la diferencia entre ellas, aunque sutil, es crítica debido al mecanismo de *hoisting*.

### 2.1. Declaración de Función (Function Declaration)
Esta es la forma clásica de definir una función.
```javascript
console.log(sumar(5, 3)); // 8

function sumar(a, b) {
  return a + b;
}
```
La característica principal de las declaraciones de función es que son **elevadas (hoisted)** por completo. El motor de JavaScript las procesa antes de ejecutar cualquier código, lo que significa que se puede llamar a la función antes de que aparezca en el código fuente.

### 2.2. Expresión de Función (Function Expression)
Aquí, la función (que puede ser anónima) se asigna a una variable.
```javascript
// console.log(restar(5, 3)); // TypeError: restar is not a function

const restar = function(a, b) {
  return a - b;
};

console.log(restar(5, 3)); // 2
```
En este caso, solo la declaración de la variable (`const restar`) es elevada, pero no su asignación. La variable `restar` existe desde el inicio de su scope, pero su valor es `undefined` hasta que la línea de asignación es ejecutada. Intentar llamarla antes resulta en un `TypeError`.

**Recomendación de Ingeniería:** Usar expresiones de función y asignarlas a constantes (`const`) es a menudo preferido en el código moderno. Esto impone un orden lógico (definir antes de usar) y previene la reasignación accidental de la función.

## 3. Funciones de Flecha (Arrow Functions - ES6)

ES6 introdujo una sintaxis más concisa que se ha convertido en el estándar de facto para las expresiones de función, especialmente para funciones cortas o callbacks.

```javascript
// Expresión de función tradicional
const duplicar = function(n) {
  return n * 2;
};

// Función de flecha equivalente
const duplicarConFlecha = n => n * 2; // Retorno implícito
```
Además de la brevedad, su característica más importante es que **no tienen su propio contexto `this`**. Heredan el `this` del scope que las contiene (comportamiento léxico). Esto resuelve muchos de los problemas y la confusión que históricamente rodeaban al manejo de `this` dentro de callbacks.

## 4. Funciones de Orden Superior (Higher-Order Functions)

El verdadero poder de las funciones como objetos de primera clase se manifiesta en las **funciones de orden superior**. Estas son funciones que operan sobre otras funciones, ya sea tomándolas como argumentos o devolviéndolas.

```javascript
// 'filter' es una función de orden superior que toma un callback.
const numeros = [1, 2, 3, 4, 5, 6];
const esPar = numero => numero % 2 === 0;
const pares = numeros.filter(esPar); // [2, 4, 6]

// 'crearMultiplicador' es una función de orden superior que devuelve una función.
function crearMultiplicador(factor) {
  // Devuelve una nueva función que "recuerda" el valor de 'factor'.
  return function(numero) {
    return numero * factor;
  };
}

const duplicar = crearMultiplicador(2);
const triplicar = crearMultiplicador(3);

console.log(duplicar(10)); // 20
console.log(triplicar(10)); // 30
```
Este patrón (una función que devuelve otra) es la base de conceptos avanzados como los **closures** y la **currificación (currying)**.

## 5. Parámetros y Argumentos: Flexibilidad y Valores por Defecto

JavaScript es muy flexible en cómo maneja los parámetros y argumentos.
- Si se pasan más argumentos que parámetros, los extras son ignorados.
- Si se pasan menos, los parámetros faltantes reciben el valor `undefined`.

ES6 introdujo los **parámetros por defecto**, que permiten definir un valor predeterminado si un argumento no se proporciona o es `undefined`.

```javascript
function saludar(nombre, saludo = 'Hola') {
  console.log(`${saludo}, ${nombre}`);
}

saludar('Ana'); // "Hola, Ana"
saludar('Luis', 'Buenas tardes'); // "Buenas tardes, Luis"
```

## 6. Conclusión

Ver las funciones no solo como procedimientos, sino como datos, es un cambio de paradigma que desbloquea patrones de codificación más limpios, modulares y expresivos. La habilidad para manipular funciones como objetos es una de las características más potentes de JavaScript y un pilar fundamental de la programación funcional y reactiva que domina el desarrollo web moderno.
