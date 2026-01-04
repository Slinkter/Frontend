# Glosario: Asincronía

## C

### Callback Hell

Situación donde las callbacks están anidadas dentro de otras callbacks varios niveles, haciendo el código difícil de entender y mantener.

### Concurrencia

La capacidad de manejar múltiples tareas "al mismo tiempo" (o intercalando su ejecución) sin que una bloquee a la otra. JS usa el Event Loop para lograr concurrencia en un solo hilo.

## E

### Executor

La función callback pasad al constructor `new Promise(executor)`. Se ejecuta inmediatamente y síncronamente. Recibe `resolve` y `reject` como argumentos.

## P

### Promesa (Promise)

Objeto que representa la completitud o fallo eventual de una operación asíncrona. Puede estar en tres estados: pendiente, cumplida o rechazada.

## S

### Síncrono

Ejecución secuencial donde cada instrucción espera a que la anterior termine antes de comenzar. Bloqueante.

## T

### Thenable

Cualquier objeto o función que tenga un método `.then()`. Las promesas de JS tratan a los "thenables" como si fueran Promesas reales (Duck Typing) para permitir interoperabilidad con librerías antiguas (como Bluebird o jQuery).
