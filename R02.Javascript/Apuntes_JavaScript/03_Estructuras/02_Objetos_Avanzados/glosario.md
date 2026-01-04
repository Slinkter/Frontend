# Glosario: Objetos Avanzados

## A

### Accessor (Descriptor de Acceso)

Un tipo de descriptor de propiedad que no tiene un valor (`value`) directo, sino que define un par de funciones `get` y `set` que se ejecutan al leer o escribir la propiedad.

## D

### Descriptor de Propiedad

Un registro (objeto) que describe cómo se comporta una propiedad de un objeto. Contiene claves como `configurable`, `enumerable`, `writable` y `value`.

## E

### Enumerable

Atributo de una propiedad que determina si esa propiedad aparece cuando se iteran las propiedades del objeto (ej. `for...in`).

## P

### Prototype Chain (Cadena de Prototipos)

Mecanismo de herencia en JS. Cuando se accede a una propiedad, si no existe en el objeto, el motor busca en su prototipo `__proto__`, y luego en el prototipo del prototipo, hasta llegar a `null`.

## S

### Shallow Copy (Copia Superficial)

Una copia de un objeto donde solo se duplican las referencias del primer nivel. Si el objeto original contiene otros objetos, la copia apuntará a los mismos objetos en memoria.
