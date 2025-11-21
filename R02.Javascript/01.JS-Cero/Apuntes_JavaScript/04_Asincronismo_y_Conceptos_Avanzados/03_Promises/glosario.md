# Glosario de Términos: Promesas (Promises)

### Promesa (Promise)
**Definición:** Un objeto que representa la eventual finalización (o fallo) de una operación asíncrona y su valor resultante. Una promesa es un "marcador de posición" para un valor que aún no se conoce. Permite asociar manejadores (callbacks) a un evento futuro.

### Estados de una Promesa
**Definición:** Una promesa siempre se encuentra en uno de tres estados:
1.  **`pending` (pendiente):** El estado inicial. La operación asíncrona aún no se ha completado.
2.  **`fulfilled` (cumplida / resuelta):** La operación asíncrona se completó con éxito. La promesa tiene un **valor** resultante.
3.  **`rejected` (rechazada):** La operación asíncrona falló. La promesa tiene una **razón** del fallo (generalmente un objeto `Error`).

Una vez que una promesa pasa de `pending` a `fulfilled` o `rejected`, su estado se vuelve inmutable. Se dice que la promesa está **`settled` (establecida)**.

### `new Promise(executor)`
**Definición:** El constructor para crear un nuevo objeto de promesa. Acepta una función `executor` como argumento.
- **Executor (`(resolve, reject) => { ... }`)**: Esta función se ejecuta inmediatamente. Contiene la lógica asíncrona. Se le pasan dos funciones como argumentos:
  - **`resolve(value)`**: Una función que se debe llamar cuando la operación asíncrona tiene éxito. El `value` se convierte en el valor de resolución de la promesa.
  - **`reject(reason)`**: Una función que se debe llamar cuando la operación falla. La `reason` (generalmente un `Error`) se convierte en el motivo de rechazo de la promesa.

### `.then(onFulfilled, onRejected)`
**Definición:** El método principal para consumir una promesa. Registra callbacks para manejar el resultado de una promesa. Siempre devuelve una **nueva promesa**, lo que permite el encadenamiento.
- **`onFulfilled(value)`**: Un callback que se ejecuta cuando la promesa se cumple. Recibe el valor de resolución.
- **`onRejected(reason)`**: Un callback opcional que se ejecuta cuando la promesa es rechazada. Recibe el motivo del rechazo.

### `.catch(onRejected)`
**Definición:** Azúcar sintáctico (syntactic sugar) para `.then(null, onRejected)`. Se utiliza específicamente para registrar un callback que maneje el rechazo de una promesa. También devuelve una nueva promesa.

### `.finally(onFinally)`
**Definición:** Registra un callback que se ejecutará cuando la promesa se establezca (`settled`), ya sea que haya sido cumplida o rechazada. Es útil para código de limpieza, como ocultar un spinner de carga. No recibe ningún argumento y el valor que retorna es ignorado.

### Encadenamiento de Promesas (Promise Chaining)
**Definición:** La práctica de encadenar múltiples llamadas `.then()` una tras otra. Es posible porque cada llamada a `.then()` o `.catch()` devuelve una nueva promesa. Esto permite escribir código asíncrono secuencial de una manera plana y legible, resolviendo el problema del "Callback Hell".

### `Promise.resolve(value)`
**Definición:** Un método estático que devuelve un objeto `Promise` que ya está resuelto con el valor dado. Es un atajo útil para crear promesas ya cumplidas.

### `Promise.reject(reason)`
**Definición:** Un método estático que devuelve un objeto `Promise` que ya está rechazado con la razón dada.

### `Promise.all(iterable)`
**Definición:** Un método estático que toma un iterable de promesas (generalmente un array) y devuelve una única `Promise`. Esta nueva promesa se resuelve cuando **todas** las promesas del iterable se han cumplido. El valor de resolución es un array con los valores de todas las promesas, en el mismo orden. Si **alguna** de las promesas del iterable es rechazada, `Promise.all` se rechaza inmediatamente con la razón de la primera promesa que falló.

### `Promise.race(iterable)`
**Definición:** Toma un iterable de promesas y devuelve una única `Promise`. Esta nueva promesa se resuelve o se rechaza tan pronto como **la primera** de las promesas del iterable se resuelve o se rechaza, con el valor o la razón de esa primera promesa.

### `Promise.allSettled(iterable)` (ES2020)
**Definición:** Toma un iterable de promesas y devuelve una única `Promise` que se resuelve cuando todas las promesas del iterable se han establecido (`settled`), sin importar si fueron cumplidas o rechazadas. El valor de resolución es un array de objetos, donde cada objeto describe el resultado de cada promesa (`{ status: 'fulfilled', value: ... }` o `{ status: 'rejected', reason: ... }`). Es útil cuando necesitas saber el resultado de todas las promesas, incluso si algunas fallan.
