# Glosario: Arrays

## A

### Acumulador (Accumulator)

En el método `reduce()`, es la variable que mantiene el valor acumulado retornado por la iteración anterior.

## C

### Callback

Función que se pasa como argumento a otra función. En el contexto de arrays, `map`, `filter`, `forEach` reciben una callback que se ejecuta por cada elemento.

## I

### Inmutabilidad

Propiedad de no poder ser modificado después de su creación. En Arrays, preferimos métodos que devuelven nuevas copias (`map`, `filter`) en lugar de modificar el original (`splice`, `sort`), para evitar efectos secundarios.

### Iterable

Objeto que permite ser recorrido secuencialmente (como Array, String, Set, Map). Implementa el protocolo iterador.

## M

### Mutación

Acción de modificar directamente el valor o estructura de un dato en memoria. `array.push(1)` muta el array.

## S

### Sparse Array (Array Disperso)

Un array donde los elementos no son contiguos (tienen "huecos"). Ej: `let a = [1]; a[100] = 2;`. Tiene longitud 101, pero solo 2 elementos definidos. Los métodos de iteración a menudo saltan los huecos.
