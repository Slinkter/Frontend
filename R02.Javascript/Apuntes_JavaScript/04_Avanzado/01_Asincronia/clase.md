# Clase 01: Asincronía y Promesas

## 1. Naturaleza Asíncrona de JavaScript

JavaScript es **Single Threaded** (un solo hilo) y síncrono por defecto. Esto significa que ejecuta una línea a la vez. Sin embargo, para realizar tareas pesadas (como leer archivos o peticiones de red) sin bloquear la interfaz, utiliza un modelo asíncrono no bloqueante basado en el **Event Loop**.

## 2. Callbacks: La base

Una función callback es una función que se pasa como argumento a otra función para ser ejecutada después de que una operación asíncrona termine.

### El problema: Callback Hell (Pyramid of Doom)

Cuando se anidan múltiples operaciones asíncronas dependientes, el código se vuelve ilegible y difícil de mantener y depurar.

## 3. Promesas (ES6)

Una Promesa es un objeto que representa la terminación (o falla) eventual de una operación asíncrona y su valor resultante.

### 3.1 Estados

Una promesa siempre está en uno de estos 3 estados:

1.  **Pending (Pendiente):** Estado inicial, ni cumplida ni rechazada.
2.  **Fulfilled (Cumplida):** La operación se completó con éxito.
3.  **Rejected (Rechazada):** La operación falló.

### 3.2 Consumo de Promesas

- `.then(onSuccess, onFailure)`: Se ejecuta cuando se cumple. Retorna una nueva promesa (encadenamiento).
- `.catch(onFailure)`: Atrapa errores en cualquier punto de la cadena anterior.
- `.finally(onFinally)`: Se ejecuta al finalizar, sea éxito o error.

### 3.3 Métodos Estáticos

- `Promise.resolve(valor)`: Retorna una promesa resuelta.
- `Promise.reject(razon)`: Retorna una promesa rechazada.
- `Promise.all([p1, p2])`: Espera a que **todas** se cumplan. Si una falla, todo falla.
- `Promise.allSettled([p1, p2])`: Espera a que todas terminen (sin importar si fallan o no).
- `Promise.race([p1, p2])`: Retorna la primera que termine (éxito o falla).
