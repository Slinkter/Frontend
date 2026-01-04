# Glosario: Control de Flujo

## B

### Break

Sentencia que termina el bucle actual, `switch`, o etiqueta; transfiriendo el control del programa a la siguiente sentencia después de la terminada.

## C

### Catch

Bloque de código dentro de una estructura `try...catch` que maneja los errores lanzados en el bloque `try`.

### Complejidad Ciclomática

Una métrica de software que indica la complejidad de un programa midiendo el número de caminos independientes a través del código fuente. A mayor anidamiento de `if` y bucles, mayor complejidad.

### Continue

Sentencia que termina la ejecución de las sentencias de la iteración actual del bucle actual o la etiqueta y continua la ejecución del bucle con la próxima iteración.

## E

### Early Return (Retorno Temprano)

Patrón de diseño donde se verifica una condición (usualmente una validación de error o caso base) y se retorna de la función inmediatamente, evitando el anidamiento de `if/else` y haciendo el código más limpio "Happy Path".

### Enum

Un tipo de dato (común en otros lenguajes, simulado en JS con objetos) que consiste en un conjunto de constantes con nombre. Útil para reemplazar "Magic Strings" en switches.

## F

### Fallthrough

Comportamiento en un `switch` cuando se omite el `break` y la ejecución continúa hacia el siguiente `case`, independientemente de si la condición coincide o no.

### Finally

Bloque que se ejecuta después del `try` y `catch`, independientemente del resultado.

## I

### Iterable

Un objeto que define su comportamiento de iteración (como los valores en un `for...of`). Debe tener una propiedad con la clave `Symbol.iterator`. Arrays y Strings son iterables por defecto.
