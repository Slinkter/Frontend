# Ejemplos Prácticos: Arrays

## 1. Creación y Acceso

La forma más común de trabajar con arrays es a través de su sintaxis literal `[]`.

```javascript
// Ejemplo 1: Creación y acceso a elementos
const frutas = ['Manzana', 'Banana', 'Cereza'];

// Acceso por índice (basado en cero)
console.log(frutas[0]); // 'Manzana'
console.log(frutas[1]); // 'Banana'

// Propiedad .length
console.log(frutas.length); // 3

// Acceso al último elemento
console.log(frutas[frutas.length - 1]); // 'Cereza'

// Modificar un elemento (los arrays son mutables)
frutas[1] = 'Mango';
console.log(frutas); // ['Manzana', 'Mango', 'Cereza']
```

## 2. Métodos Mutables (Modifican el Array Original)

Estos métodos cambian el array directamente. Úsalos con cuidado, especialmente si el array es parte de un estado compartido.

```javascript
// Ejemplo 2: push, pop, shift, unshift
const numeros = [10, 20, 30];

// push: añade al final
numeros.push(40);
console.log('Después de push(40):', numeros); // [10, 20, 30, 40]

// pop: elimina del final
const ultimo = numeros.pop();
console.log('Elemento popeado:', ultimo); // 40
console.log('Después de pop():', numeros); // [10, 20, 30]

// unshift: añade al principio (costoso en arrays grandes)
numeros.unshift(5);
console.log('Después de unshift(5):', numeros); // [5, 10, 20, 30]

// shift: elimina del principio (costoso en arrays grandes)
const primero = numeros.shift();
console.log('Elemento shifteado:', primero); // 5
console.log('Después de shift():', numeros); // [10, 20, 30]

// Ejemplo 3: splice para modificar en cualquier lugar
const letras = ['a', 'b', 'c', 'd', 'e'];
// Eliminar 2 elementos a partir del índice 1 ('b', 'c')
const eliminadas = letras.splice(1, 2);
console.log('Letras eliminadas:', eliminadas); // ['b', 'c']
console.log('Después de splice (eliminar):', letras); // ['a', 'd', 'e']

// Reemplazar 1 elemento en el índice 1 e insertar nuevos
letras.splice(1, 1, 'X', 'Y');
console.log('Después de splice (reemplazar/insertar):', letras); // ['a', 'X', 'Y', 'e']
```

## 3. Métodos Inmutables y el Operador de Propagación (`...`)

Este es el enfoque moderno y recomendado para manipular arrays que forman parte del estado de una aplicación.

```javascript
// Ejemplo 4: Añadir elementos de forma inmutable
const base = [1, 2, 3];

// Añadir al final
const conFinal = [...base, 4];
console.log('Añadir al final:', conFinal); // [1, 2, 3, 4]
console.log('Original no cambia:', base); // [1, 2, 3]

// Añadir al principio
const conInicio = [0, ...base];
console.log('Añadir al principio:', conInicio); // [0, 1, 2, 3]

// Ejemplo 5: Eliminar un elemento de forma inmutable (usando slice)
const aEliminar = [10, 20, 30, 40, 50];
const indiceAEliminar = 2; // Queremos eliminar el '30'

const primeraParte = aEliminar.slice(0, indiceAEliminar); // [10, 20]
const segundaParte = aEliminar.slice(indiceAEliminar + 1); // [40, 50]
const sinElemento = [...primeraParte, ...segundaParte];
console.log('Eliminar inmutablemente:', sinElemento); // [10, 20, 40, 50]

// Ejemplo 6: Actualizar un elemento de forma inmutable (usando map)
const aActualizar = [
  { id: 1, texto: 'Tarea 1' },
  { id: 2, texto: 'Tarea 2' },
  { id: 3, texto: 'Tarea 3' }
];
const idAActualizar = 2;
const nuevoTexto = 'TAREA DOS COMPLETADA';

const actualizado = aActualizar.map(tarea => {
  if (tarea.id === idAActualizar) {
    // Si es la tarea que buscamos, devolvemos un nuevo objeto con el texto cambiado
    return { ...tarea, texto: nuevoTexto };
  }
  // Si no, devolvemos la tarea sin cambios
  return tarea;
});

console.log('Array actualizado:', actualizado);
console.log('Array original no cambia:', aActualizar);
```
Este último ejemplo con `map` es un patrón fundamental en frameworks como React para actualizar un elemento en un array de estado.
