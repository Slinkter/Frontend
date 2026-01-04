# Glosario: Async / Await

## A

### Async Function

Una función declarada con la palabra clave `async`. Siempre retorna una Promesa. Permite el uso de `await` dentro de ella.

### Await

Operador que se usa para esperar a que una Promesa se resuelva o rechace. Solo puede ser usado dentro de funciones `async` o en la raíz de módulos (Top-Level Await).

## T

### Top-Level Await

Característica moderna (ES2022) que permite usar `await` fuera de una función `async`, directamente en el nivel superior de un módulo (archivo `.mjs` o `type="module"`). Bloquea la carga del módulo hasta que la promesa se resuelve.
