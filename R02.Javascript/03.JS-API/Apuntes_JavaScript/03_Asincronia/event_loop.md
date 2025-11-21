# Módulo 03: El Modelo Asíncrono de JavaScript

## Tema 3.1: El Corazón de JS: El Event Loop

### Clase: Comprendiendo el Modelo de Concurrencia y Eventos

JavaScript es, por naturaleza, un lenguaje de programación de **un solo hilo (single-threaded)**. Esto significa que solo puede ejecutar una pieza de código a la vez. Sin embargo, el JavaScript que usamos en el navegador (o en Node.js) no es solo el motor V8, sino un entorno de ejecución completo que proporciona APIs para realizar operaciones que tardan tiempo (como `fetch` para peticiones de red o `setTimeout` para temporizadores) sin bloquear el hilo principal. Esta aparente paradoja de un solo hilo con comportamiento no bloqueante se resuelve gracias al **Event Loop**, un mecanismo de concurrencia fundamental que permite a JavaScript manejar operaciones asíncronas de manera eficiente.

#### ¿Qué Significa "Single-Threaded" y "No Bloqueante"?

*   **Single-Threaded (Un Solo Hilo)**: Solo puede ejecutar una tarea a la vez. Si una operación síncrona tarda mucho, bloquea la ejecución de todo lo demás (la UI se congela, no se responden eventos).
*   **Non-Blocking (No Bloqueante)**: A pesar de ser de un solo hilo, puede iniciar operaciones que tardan tiempo (I/O, temporizadores) y continuar ejecutando otro código mientras espera que esas operaciones se completen. Esto es posible porque las operaciones lentas no se ejecutan en el hilo principal de JavaScript.

#### Componentes Clave del Entorno de Ejecución de JavaScript

Para entender el Event Loop, debemos conocer sus componentes:

1.  **Call Stack (Pila de Llamadas)**:
    *   Es una estructura de datos LIFO (Last In, First Out) que registra dónde está el programa en su ejecución.
    *   Cuando una función es llamada, se añade a la pila. Cuando una función termina, se saca de la pila.
    *   Si la pila se llena (muchas llamadas de función anidadas), ocurre un "Stack Overflow".
    *   Solo una función puede estar en ejecución en el Call Stack a la vez.

2.  **Heap (Montón)**:
    *   Es una vasta región de memoria no estructurada donde se almacenan los objetos y variables declaradas dinámicamente. El Call Stack solo contiene referencias a la memoria del Heap.

3.  **Web APIs (en el navegador) / C++ APIs (en Node.js)**:
    *   Son funcionalidades proporcionadas por el entorno de ejecución (no por el motor JavaScript en sí) que permiten realizar tareas asíncronas.
    *   **Ejemplos de Web APIs**: `setTimeout`, `setInterval`, `fetch`, `XMLHttpRequest`, `DOM events` (`click`, `load`), `Geolocation`, `requestAnimationFrame`.
    *   Estas APIs operan *fuera* del Call Stack principal de JavaScript. Cuando JavaScript inicia una de estas operaciones, la entrega a la Web API y el Call Stack queda libre para seguir ejecutando código.

4.  **Callback Queue (Cola de Callbacks / Cola de Tareas)**:
    *   Una estructura de datos FIFO (First In, First Out) que almacena las funciones `callback` que están listas para ser ejecutadas.
    *   Cuando una Web API termina su operación asíncrona (ej. un `setTimeout` expira, una `fetch` obtiene una respuesta), coloca su función `callback` asociada en el Callback Queue.

5.  **Event Loop**:
    *   Es el guardián de la concurrencia en JavaScript. Su única misión es **monitorear el Call Stack y el Callback Queue**.
    *   Si el Call Stack está vacío, el Event Loop toma la primera función `callback` del Callback Queue y la empuja al Call Stack para su ejecución. Este proceso se repite continuamente.

#### El Ciclo de Ejecución (Event Loop in Action)

Consideremos el siguiente código:

```javascript
console.log("1. Inicio");

setTimeout(() => {
    console.log("3. Callback de setTimeout");
}, 0); // Un delay de 0ms, pero aún así es asíncrono

fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
        console.log("4. Callback de Fetch (Microtask)");
    });

console.log("2. Fin");
```

Así es como el Event Loop lo procesaría:

1.  `console.log("1. Inicio")` se añade y se ejecuta en el Call Stack. Se imprime "1. Inicio". Se saca del Call Stack.
2.  `setTimeout` se añade al Call Stack. Es una Web API, así que se le pasa a la Web API Timer. El Call Stack se libera.
3.  `fetch` se añade al Call Stack. Es una Web API, así que se le pasa a la Web API Network. El Call Stack se libera.
4.  `console.log("2. Fin")` se añade y se ejecuta en el Call Stack. Se imprime "2. Fin". Se saca del Call Stack.
5.  En este punto, el Call Stack está vacío. El Event Loop empieza a mirar las colas.

6.  **La Web API Timer** (para `setTimeout`) ha terminado su espera (0ms). Coloca su `callback` (`() => { console.log("3. Callback de setTimeout"); }`) en la **Callback Queue (Task Queue)**.

7.  **La Web API Network** (para `fetch`) podría terminar en algún momento. Cuando lo haga, su `callback` (`response => response.json()`) se colocará en la **Microtask Queue**. (Más sobre esto a continuación).

8.  El Event Loop ve que el Call Stack está vacío.
    *   **Prioridad: Microtask Queue primero.** El Event Loop revisa la Microtask Queue. Si hay tareas, las mueve al Call Stack y las ejecuta hasta que la Microtask Queue esté vacía.
    *   Supongamos que el callback de `fetch` llega primero a la Microtask Queue. El Event Loop lo saca y lo pone en el Call Stack.
    *   Se ejecuta el `console.log("4. Callback de Fetch (Microtask)")`. Se imprime "4. Callback de Fetch (Microtask)". Se saca.
    *   Si hubiera más microtasks, se ejecutarían ahora.

9.  Una vez que la Microtask Queue está vacía, el Event Loop revisa la **Callback Queue (Task Queue)**.
    *   Toma el `callback` de `setTimeout` de la Callback Queue y lo pone en el Call Stack.
    *   Se ejecuta el `console.log("3. Callback de setTimeout")`. Se imprime "3. Callback de setTimeout". Se saca.

**Orden de Salida:**
1.  Inicio
2.  Fin
3.  Callback de Fetch (Microtask) (o la respuesta real de la API si fuera el caso)
4.  Callback de setTimeout

#### Microtasks vs. Macrotasks (Tasks)

JavaScript tiene dos tipos de colas para callbacks asíncronos, gestionadas por el Event Loop:

*   **Macrotasks (o Tasks)**: Incluyen `setTimeout`, `setInterval`, I/O, eventos UI (`click`, `load`). Se colocan en la **Callback Queue**. El Event Loop procesa **una** macrotask por cada ciclo, vaciando primero la Microtask Queue antes de pasar a la siguiente macrotask.
*   **Microtasks**: Incluyen `Promises` (`.then()`, `.catch()`, `.finally()`), `async/await` (que usan Promises internamente), `MutationObserver`. Se colocan en la **Microtask Queue**. La Microtask Queue tiene **mayor prioridad** que la Macrotask Queue. El Event Loop vacía **completamente** la Microtask Queue antes de tomar la siguiente Macrotask.

Esta distinción explica por qué el `console.log` de la `fetch` (que usa Promises) se ejecuta antes que el `setTimeout` con 0ms de delay.

```javascript
console.log('Script start'); // 1. Sync

setTimeout(function() {
    console.log('setTimeout'); // 4. Macrotask
}, 0);

Promise.resolve()
    .then(function() {
        console.log('promise 1'); // 2. Microtask
    })
    .then(function() {
        console.log('promise 2'); // 3. Microtask (encadenada, también es microtask)
    });

console.log('Script end'); // 1. Sync
```
**Orden de Salida:**
1.  Script start
2.  Script end
3.  promise 1
4.  promise 2
5.  setTimeout

Comprender el Event Loop es crucial para razonar sobre el comportamiento del código asíncrono y evitar condiciones de carrera o bloqueos inesperados.

---

### Ejemplos Ampliados y Corregidos

```javascript
// Ejemplo 1: Ilustración del Call Stack y Web APIs
console.log("--- Call Stack y Web APIs ---");

function primeraFuncion() {
    console.log("Inicio de primeraFuncion");
    segundaFuncion();
    console.log("Fin de primeraFuncion");
}

function segundaFuncion() {
    console.log("Inicio de segundaFuncion");
    setTimeout(() => {
        console.log("Callback de setTimeout (después de 10ms)");
    }, 10); // Web API
    console.log("Fin de segundaFuncion");
}

console.log("Paso 1: Global");
primeraFuncion();
console.log("Paso 2: Global, justo antes de terminar");

// Salida esperada:
// Paso 1: Global
// Inicio de primeraFuncion
// Inicio de segundaFuncion
// Fin de segundaFuncion
// Fin de primeraFuncion
// Paso 2: Global, justo antes de terminar
// Callback de setTimeout (después de 10ms)
//
// Explicación:
// 1. "Paso 1: Global" se ejecuta.
// 2. primeraFuncion() se añade al Call Stack.
// 3. "Inicio de primeraFuncion" se ejecuta.
// 4. segundaFuncion() se añade al Call Stack.
// 5. "Inicio de segundaFuncion" se ejecuta.
// 6. setTimeout se entrega a la Web API. segundaFuncion continúa.
// 7. "Fin de segundaFuncion" se ejecuta.
// 8. segundaFuncion() se saca del Call Stack.
// 9. "Fin de primeraFuncion" se ejecuta.
// 10. primeraFuncion() se saca del Call Stack.
// 11. "Paso 2: Global, justo antes de terminar" se ejecuta.
// 12. El Call Stack está vacío. El Event Loop verifica la Callback Queue.
// 13. Después de 10ms (o más), el callback de setTimeout entra a la Callback Queue.
// 14. El Event Loop lo empuja al Call Stack.
// 15. "Callback de setTimeout (después de 10ms)" se ejecuta.


// Ejemplo 2: Prioridad de Microtasks sobre Macrotasks
console.log("\n--- Microtasks vs. Macrotasks ---");

console.log('A');

setTimeout(() => {
    console.log('B'); // Macrotask
}, 0);

Promise.resolve()
    .then(() => console.log('C')) // Microtask
    .then(() => console.log('D')); // Microtask

console.log('E');

// Salida esperada:
// A
// E
// C
// D
// B
//
// Explicación:
// 1. 'A' (síncrono)
// 2. setTimeout B se entrega a la Web API (Timer).
// 3. Promise C se entrega a la Microtask Queue.
// 4. Promise D (encadenada) también será una Microtask.
// 5. 'E' (síncrono)
// 6. El Call Stack está vacío. El Event Loop procesa la Microtask Queue COMPLETAMENTE.
// 7. 'C' se ejecuta.
// 8. 'D' se ejecuta.
// 9. La Microtask Queue está vacía. El Event Loop procesa la Macrotask Queue.
// 10. 'B' se ejecuta.
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Orden de Ejecución Asíncrona**
    Prediga la salida de los siguientes `console.log()` y explique su razonamiento basándose en el Event Loop, Call Stack, Web APIs, Microtasks y Macrotasks.

    ```javascript
    console.log('Inicio del script');

    setTimeout(() => {
        console.log('setTimeout 1');
        Promise.resolve().then(() => console.log('promise 3 dentro de setTimeout'));
    }, 0);

    Promise.resolve().then(() => {
        console.log('promise 1');
        setTimeout(() => console.log('setTimeout 2 dentro de promise'), 0);
    }).then(() => {
        console.log('promise 2');
    });

    console.log('Fin del script');
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Orden de Ejecución Asíncrona

    // 1. console.log('Inicio del script')  => Sync
    // 2. setTimeout 1 => Web API Timer (Macrotask)
    // 3. Promise 1 => Microtask
    // 4. console.log('Fin del script')    => Sync

    // Orden de ejecución:
    // Fase Síncrona:
    // "Inicio del script"
    // "Fin del script"

    // Call Stack vacío. Event Loop procesa Microtasks:
    // promise 1 se ejecuta.
    //   -> Dentro de promise 1, setTimeout 2 se entrega a Web API Timer (Macrotask).
    // promise 2 (encadenada) se ejecuta.

    // Microtask Queue vacía. Event Loop procesa Macrotasks:
    // setTimeout 1 se ejecuta.
    //   -> Dentro de setTimeout 1, promise 3 se entrega a Microtask Queue.

    // Macrotask Queue vacía. Call Stack vacío. Event Loop procesa Microtasks (de nuevo):
    // promise 3 se ejecuta.

    // Output esperado:
    // Inicio del script
    // Fin del script
    // promise 1
    // promise 2
    // setTimeout 1
    // promise 3 dentro de setTimeout
    // setTimeout 2 dentro de promise
    ```

2.  **Ejercicio: Simulando una Operación Asíncrona**
    Implemente una función `simularCargaDatos(callback)` que simule una operación de carga de datos asíncrona (ej. una petición de red). La función debe:
    1.  Imprimir "Iniciando carga de datos..."
    2.  Usar `setTimeout` para simular un retardo de 2 segundos.
    3.  Después del retardo, ejecutar el `callback` proporcionado y pasarle un array de datos simulados `['dato1', 'dato2', 'dato3']`.
    4.  Finalmente, imprimir "Función simularCargaDatos terminada".

    Luego, llame a esta función con un callback que imprima "Datos recibidos:" seguido de los datos.

    ```javascript
    function simularCargaDatos(callback) {
        // Su código aquí
    }

    simularCargaDatos((datos) => {
        console.log("Datos recibidos:", datos);
    });

    console.log("Continuando con otras operaciones...");
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Simulando una Operación Asíncrona

    function simularCargaDatos(callback) {
        console.log("Iniciando carga de datos...");

        setTimeout(() => {
            const datosSimulados = ['dato1', 'dato2', 'dato3'];
            callback(datosSimulados); // Ejecuta el callback con los datos
            console.log("Callback de carga de datos ejecutado.");
        }, 2000); // Simula 2 segundos de latencia

        console.log("Función simularCargaDatos terminada (síncronamente).");
    }

    simularCargaDatos((datos) => {
        console.log("Datos recibidos:", datos);
    });

    console.log("Continuando con otras operaciones...");

    // Salida esperada:
    // Iniciando carga de datos...
    // Función simularCargaDatos terminada (síncronamente).
    // Continuando con otras operaciones...
    // (después de ~2 segundos)
    // Datos recibidos: ['dato1', 'dato2', 'dato3']
    // Callback de carga de datos ejecutado.
    ```

---

### Glosario Técnico

*   **Single-Threaded**: JavaScript ejecuta solo una operación a la vez.
*   **Non-Blocking**: Capacidad de iniciar operaciones largas sin detener la ejecución del hilo principal.
*   **Call Stack (Pila de Llamadas)**: Donde se registran las funciones en ejecución (LIFO).
*   **Heap**: Área de memoria para objetos.
*   **Web APIs (o C++ APIs en Node.js)**: Funcionalidades del entorno que manejan tareas asíncronas fuera del Call Stack.
*   **Callback Queue (Cola de Tareas / Macrotasks)**: Donde se encolan los callbacks de Web APIs (ej. `setTimeout`, eventos DOM) listos para el Call Stack.
*   **Microtask Queue**: Donde se encolan los callbacks de Promises (`.then()`, `async/await`). Tiene mayor prioridad que la Callback Queue.
*   **Event Loop**: Mecanismo que mueve los callbacks de las colas al Call Stack cuando este está vacío.
*   **Macrotask (Task)**: Tareas asíncronas de baja prioridad (ej. `setTimeout`, `setInterval`, eventos I/O).
*   **Microtask**: Tareas asíncronas de alta prioridad (ej. `Promise.then()`, `async/await`).
*   **Concurrencia**: Capacidad de un sistema para manejar múltiples tareas en progreso al mismo tiempo, aunque no necesariamente ejecutándose simultáneamente.
*   **Bloqueante**: Una operación que impide la ejecución de otras operaciones hasta que termina.
*   **Stack Overflow**: Error que ocurre cuando el Call Stack excede su tamaño límite, generalmente por recursión infinita.
