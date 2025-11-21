# Glosario de Términos: Callbacks y Asincronía

### Sincronía (Synchronous)
**Definición:** Modelo de ejecución donde las tareas se realizan una después de la otra, en secuencia. Cada tarea debe completarse antes de que la siguiente pueda comenzar. El hilo de ejecución principal de JavaScript es, por naturaleza, síncrono y de un solo hilo (single-threaded).

### Asincronía (Asynchronous)
**Definición:** Modelo de ejecución que permite que las tareas de larga duración (como peticiones de red, operaciones de archivo o temporizadores) se inicien y se completen en un segundo plano, sin bloquear el hilo principal. Cuando la tarea finaliza, se notifica al programa para que pueda procesar el resultado.

### Callback (Función de Devolución de Llamada)
**Definición:** Una función que se pasa como argumento a otra función. La función receptora se encarga de ejecutar ("llamar de vuelta") el callback en un momento apropiado, generalmente al completar una tarea síncrona o asíncrona. Los callbacks son el mecanismo fundamental para manejar la asincronía en el JavaScript "clásico".

### Función de Orden Superior (Higher-Order Function)
**Definición:** Una función que acepta otra función como argumento (un callback) o que devuelve una función. Las funciones que utilizan callbacks son, por definición, funciones de orden superior.
- **Ejemplos:** `setTimeout`, `addEventListener`, `Array.prototype.map`.

### Event Loop (Bucle de Eventos)
**Definición:** El corazón del modelo de concurrencia de JavaScript. Es un proceso que constantemente revisa si hay tareas pendientes en la "Cola de Callbacks" y las mueve a la "Pila de Llamadas" (Call Stack) para su ejecución, pero solo cuando la Pila de Llamadas está vacía. Este mecanismo es lo que permite que el código asíncrono no bloquee el hilo principal.

### Pila de Llamadas (Call Stack)
**Definición:** Una estructura de datos que registra la posición del programa en la ejecución. Cuando se llama a una función, se añade (push) a la cima de la pila. Cuando la función retorna, se saca (pop) de la pila. Un error de "stack overflow" ocurre cuando la pila crece demasiado.

### Cola de Callbacks (Callback Queue / Task Queue)
**Definición:** Una estructura de datos que almacena los callbacks de tareas asíncronas que están listos para ser ejecutados (por ejemplo, el callback de un `setTimeout` que ha cumplido su tiempo o el de una petición de red que ha recibido respuesta). El Event Loop toma tareas de esta cola.

### Callback Hell (Infierno de los Callbacks)
**Definición:** También conocido como "Pyramid of Doom" (Pirámide de la Muerte). Se refiere a la situación que surge al anidar múltiples callbacks uno dentro de otro para manejar operaciones asíncronas secuenciales. El resultado es un código con una sangría profunda, difícil de leer, mantener y depurar. Es el principal problema que las Promesas y `async/await` vienen a solucionar.

### Callback de Error-Primero (Error-First Callback)
**Definición:** Una convención de estilo muy extendida, especialmente en el ecosistema de Node.js, para manejar errores en callbacks asíncronos. El callback siempre se diseña para recibir el error como su **primer argumento**. Si no hay error, este primer argumento es `null`.
- **Sintaxis:** `function miCallback(error, resultado) { ... }`
- **Ventaja:** Impone un patrón consistente y explícito para el manejo de errores.
