# Glosario Técnico: Fundamentos

## C

### Coerción (Type Coercion)

Es la conversión automática o implícita de valores de un tipo de dato a otro (ej. de string a número).

## H

### Hoisting (Elevación)

Comportamiento de JavaScript donde las declaraciones de variables y funciones son movidas ("elevadas") a la parte superior de su scope antes de la ejecución del código.

## I

### Inmutable

Un valor que, una vez creado, no puede ser cambiado. Los tipos primitivos en JS son inmutables. Aunque una variable se pueda reasignar, el _valor_ primitivo en memoria no se modifica, se reemplaza.

## L

### Literal

Representación fija de un valor en el código fuente (ej. `3.14`, `"Hola"`, `true`, `{}`).

## P

### Primitivo (Primitive)

Datos que no son objetos y no tienen métodos. En JS son: string, number, bigint, boolean, undefined, symbol, y null.

## R

### Runtime Environment (Entorno de Ejecución)

El entorno donde se ejecuta el código JavaScript (ej. Navegador, Node.js, Deno). Provee las Web APIs y el Event Loop.

### Reference Type (Tipo por referencia)

Objetos en JS. Cuando se asignan a una variable, se guarda una referencia (dirección de memoria) y no el valor en sí.

## S

### Scope (Alcance)

El contexto de ejecución actual. El contexto en el que los valores y expresiones son "visibles" o pueden ser referenciados.

## T

### Temporal Dead Zone (TDZ)

El período entre el inicio del scope y la declaración real de una variable con `let` o `const`. Durante este tiempo, la variable existe pero no ha sido inicializada, y acceder a ella lanza un error.

## V

### Variable

Un contenedor nombrado para un valor.
