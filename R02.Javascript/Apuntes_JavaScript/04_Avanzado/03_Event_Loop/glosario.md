# Glosario: Internals

## C

### Call Stack (Pila de Llamadas)

Estructura de datos que registra en qué parte del programa estamos. Si entramos en una función, la ponemos arriba de la pila. Si retornamos de una función, la sacamos de arriba de la pila.

## E

### Event Loop (Bucle de Eventos)

Mecanismo que coordina la ejecución de código, eventos y renderizado en JavaScript. Monitorea el Call Stack y las Colas de Tareas.

## M

### Macrotask (Obsoleto: Task)

Tareas en la Task Queue comúnmente llamadas macrotareas para diferenciarlas de las microtareas. Incluyen: `setTimeout`, `setInterval`, I/O, UI rendering.

### Microtask

Tareas de alta prioridad que se ejecutan inmediatamente después de que el stack actual se vacía y antes de que el control regrese al loop de eventos (o renderizado). Promises y `queueMicrotask` usan esta cola.

## S

### Single Threaded

Que posee un único hilo de ejecución. Solo puede realizar una operación a la vez.

## W

### Web API

Interfaces provistas por el navegador (como `DOM`, `AJAX`, `Timeout`) que permiten a JS interactuar con el entorno y realizar tareas en segundo plano.
