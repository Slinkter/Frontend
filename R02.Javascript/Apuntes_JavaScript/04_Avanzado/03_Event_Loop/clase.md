# Clase 03: Event Loop y Runtime

Para entender cómo JavaScript (que es single-threaded) puede ser asíncrono, debemos comprender la arquitectura del navegador (o de Node.js).

## 1. Componentes del Runtime

1.  **Memory Heap:** Donde se asigna la memoria (variables, objetos).
2.  **Call Stack (Pila de Llamadas):** Mecanismo LIFO (Last In, First Out) donde JS apila las funciones que está ejecutando. Al ser un solo hilo, solo puede haber una cosa en el tope del stack.

## 2. Web APIs (El exterior)

Cosas como `setTimeout`, `fetch`, `DOM Events` NO son parte del motor JS (V8), sino que son APIs provistas por el navegador. Cuando llamamos a `setTimeout`, JS le pasa la tarea al navegador y el Call Stack queda libre para seguir ejecutando código.

## 3. Colas (Queues)

Cuando las Web APIs terminan su tarea (ej. pasaron los 1000ms del timer), no empujan la callback directamente al Stack (podría interrumpir código). La colocan en una cola.

### 3.1 Callback Queue (Task Queue)

Aquí van los callbacks de `setTimeout`, `setInterval`, eventos de UI.

### 3.2 Microtask Queue

Aquí van las promesas (`.then`, `catch`, `finally` y `queueMicrotask`).

- **Prioridad Alta:** El Event Loop **SIEMPRE** vacía la Microtask Queue completa antes de procesar siquiera una tarea de la Callback Queue.

## 4. El Event Loop (Bucle de Eventos)

Es un guardián infinito que hace una tarea muy simple:

1.  Mira el **Call Stack**. ¿Está vacío?
2.  Si NO está vacío, espera.
3.  Si está vacío, mira la **Microtask Queue**.
4.  Si hay microtasks, las mueve al Stack una por una hasta vaciar la cola.
5.  Si no hay microtasks, mueve la primera tarea de la **Callback Queue** al Stack.
