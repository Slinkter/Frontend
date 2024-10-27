# Clase 01: Introducción

# Clase 02: ¿Qué es Asincronismo?

Los lenguajes de programación son sincrónicos porque tienen que ejecutar tarea por tarea. En sí, JavaScript es sincrónico y utiliza un subproceso como hilo.

-   **JavaScript es single-threaded**: JavaScript procesa en un solo hilo.
-   **JavaScript es bloqueante**: Una tarea puede ser bloqueada hasta que termine. Por ejemplo, un `alert` bloquea la aplicación hasta que se atienda.
-   **JavaScript es no bloqueante**: Una tarea se resuelve rápido, independientemente del resultado.
-   **JavaScript es sincrónico**: Las tareas se ejecutan de manera secuencial. Las tareas deben esperar hasta que termine la tarea anterior.
-   **JavaScript es asincrónico**: Las tareas pueden ser resueltas más tarde para que otras tareas se puedan resolver. Es decir, el resultado es diferido a otras tareas.
-   **JavaScript es concurrente**: Eventos basados en event loop.
-   **JavaScript es Event Loop**: Es un patrón de diseño que espera y distribuye los eventos.

## Formas de procesar o manejar asincronía

-   **Callback**: Es una función que es parte de un argumento de otra función, que será invocada.
-   **Promesas (ES6)**: Es una función no bloqueante y asincrónica. Puede cumplir una promesa ahora, en el futuro o nunca.
-   **Async / Await (ES2017)**: Es una función asincrónica sin bloqueo, solo es sintaxis más amigable.

Con estas formas, JavaScript puede simular multi-hilo por estas herramientas. JavaScript es un lenguaje de programación no bloqueante y asincrónico donde existe el bucle de un solo hilo para interfaces I/O.

# Clase 03: Event Loop

Es un patrón de diseño que distribuye eventos o mensajes de un programa. Es un bucle que funciona solo si el stack está vacío para que el task queue pueda mover las tareas ya realizadas.

-   **Memory Heap**: Es un recurso, espacio en memoria donde los elementos están asignados.
-   **Call Stack**: Apila y organiza las instrucciones de un programa.
-   **Task Queue**: Maneja las concurrencias, solo se agregan las tareas que ya están listas para pasar al stack.
-   **MicroTask Queue**: Tiene prioridad superior para resolver como promesas.
-   **Web APIs**: JavaScript y Node.js, manipulación de archivos del OS y peticiones HTTP.

[Imagen](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

# Clase 05: Configuración VSCode y Code Run

# Clase 06: Callback

`setTimeout` es un callback, la llamada de una función dentro de otra función.

# Clase 07: Uso de una API Fake de Platzi

[https://fakeapi.platzi.com/](https://fakeapi.platzi.com/) nos ayuda a pedir las peticiones HTML, XML, JSON. Uso de `XMLHttpRequest`.

# Clase 08: Fetch Data

Añillar múltiples llamados en un callback.

# Clase 09: ¿Qué son las promesas?

Es algo que puede pasar o no, es usado para computación asincrónica.

# Clase 10: Fetch

Se instala un paquete fetch.

# Clase 11: Uso de Fetch y POST

# Clase 12: Guardar los datos con Fetch POST

# Clase 15/26: Funciones Asíncronas

Es un flujo `async` / `await`.

# Clase 16/26: Try and Catch

Uso de fake API de Platzi. Nos permite crear un bloque a intentar (`try`), y otro por si falla o se produce una excepción (`catch`).

# Clase 17/26: Try and Catch

Ejercicios de Platzi.

# Clase 18/26: ¿Cómo enfrentar los errores?

Plantear el código en papel y luego en código.

# Clase 19/26: Generators

Es una opción de `sync`. Es una función que puede llamar o para solicitudes, itera varios elementos que se integran al flujo.

# Clase 21/26: Consumiendo API

Uso de RapidAPI [https://rapidapi.com/ytdlfree/api/youtube-v31](https://rapidapi.com/ytdlfree/api/youtube-v31).

# Clase 22/26: Uso de gh-pages

```bash
npm install gh-pages --save-dev
```
