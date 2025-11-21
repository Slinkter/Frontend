# Módulo 03: El Modelo Asíncrono de JavaScript

## Tema 3.4: Estrategias de Manejo de Errores Asíncronos

### Clase: Asegurando la Robustez en Flujos Asíncronos

El manejo de errores es una disciplina crítica en cualquier lenguaje de programación, pero adquiere una complejidad adicional en el contexto de la **asincronía en JavaScript**. Debido a la naturaleza no bloqueante del Event Loop, los errores que ocurren en operaciones asíncronas no siempre pueden ser capturados por los mecanismos tradicionales de `try...catch` síncronos. Es esencial comprender las diferentes estrategias y herramientas que JavaScript ofrece para detectar, propagar y gestionar errores de manera efectiva en callbacks, promesas y funciones `async/await`, asegurando la robustez y la estabilidad de las aplicaciones.

#### Errores en Callbacks

El manejo de errores con callbacks es propenso a errores y a menudo inconsistente. La convención más común es el patrón "Error-First Callback", donde el primer argumento del callback está reservado para un objeto de error (si lo hay), y el segundo para los datos.

```javascript
// Patrón Error-First Callback
function operacionAsincrona(param, callback) {
    setTimeout(() => {
        if (param === "error") {
            callback(new Error("Parámetro no válido"), null);
        } else {
            callback(null, `Resultado de ${param}`);
        }
    }, 1000);
}

operacionAsincrona("valido", (error, resultado) => {
    if (error) {
        console.error("Error capturado:", error.message);
        return;
    }
    console.log("Resultado:", resultado);
});

operacionAsincrona("error", (error, resultado) => {
    if (error) {
        console.error("Error capturado:", error.message);
        return;
    }
    console.log("Resultado:", resultado); // Nunca se ejecuta en este caso
});
```

**Problemas del Error-First Callback**:
*   **Olvidar manejar el error**: Si no se incluye el `if (error)` en cada callback anidado, el error puede pasar desapercibido, llevando a un comportamiento inesperado o a un "fail silently".
*   **Callback Hell con manejo de errores**: El anidamiento se vuelve aún más complejo al añadir lógica de manejo de errores en cada nivel.

#### Errores en Promesas

Las promesas ofrecen un mecanismo unificado y estructurado para el manejo de errores a través de los métodos `.catch()` y el segundo argumento de `.then()`.

1.  **Rechazo Explícito (`reject`)**:
    Una promesa se rechaza explícitamente llamando a la función `reject` dentro de su `executor`.

    ```javascript
    const promesaConError = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("¡Algo salió mal en la promesa!"));
        }, 500);
    });

    promesaConError
        .then(data => console.log(data))
        .catch(error => console.error("Error capturado con .catch():", error.message));
    ```

2.  **Lanzamiento de Errores Síncronos**:
    Si un error síncrono (ej. `throw new Error(...)`) ocurre dentro del `executor` de una promesa, la promesa se rechaza automáticamente.

    ```javascript
    const promesaConErrorSincrono = new Promise((resolve, reject) => {
        throw new Error("Error síncrono dentro del executor.");
    });

    promesaConErrorSincrono
        .catch(error => console.error("Error síncrono capturado:", error.message));
    ```

3.  **Lanzamiento de Errores en `.then()`**:
    Si una función `onFulfilled` o `onRejected` dentro de un `.then()` lanza un error, la promesa resultante de ese `.then()` se rechaza, y el error puede ser capturado por un `.catch()` posterior en la cadena.

    ```javascript
    Promise.resolve(1)
        .then(num => {
            console.log("Número:", num);
            throw new Error("Error en el primer .then()");
        })
        .then(data => console.log("Esto no se ejecuta:", data))
        .catch(error => console.log("Error capturado en cadena:", error.message)); // Error en el primer .then()
    ```

4.  **Propagación de Errores**:
    Los errores en una cadena de promesas se propagan hacia abajo hasta el `.catch()` más cercano. Una vez que un error es manejado por un `.catch()`, la promesa resultante de ese `.catch()` se resuelve (a menos que se lance otro error dentro del `.catch()`).

    ```javascript
    Promise.reject("Error inicial")
        .catch(error => {
            console.log("Manejado por el primer catch:", error); // Manejado
            return "Valor de recuperación"; // El catch devuelve una promesa resuelta
        })
        .then(data => console.log("Datos después de la recuperación:", data)) // Se ejecuta
        .catch(error => console.error("Este catch no se ejecuta"));
    ```

5.  **Errores No Capturados (`unhandled rejection`)**:
    Si una promesa se rechaza y no hay ningún `.catch()` en la cadena para manejarlo, se considera un "unhandled promise rejection". En el navegador, esto a menudo dispara un evento `unhandledrejection` en el objeto `window`, y en Node.js puede terminar el proceso o registrar una advertencia.

    ```javascript
    Promise.reject("Error no capturado"); // Peligroso
    // window.addEventListener('unhandledrejection', event => console.error('Unhandled:', event.reason));
    ```

#### Errores en `async/await`

La sintaxis `async/await` integra el manejo de errores de promesas con la familiaridad de `try...catch` síncrono, lo que la hace muy intuitiva.

1.  **`try...catch` con `await`**:
    Cualquier error (un rechazo de promesa, o una excepción síncrona) que ocurra dentro del bloque `try` de una función `async` que usa `await` puede ser capturado por un bloque `catch` asociado.

    ```javascript
    async function operacionAsincronaConError() {
        return new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error("Fallo en la operación interna")), 1000);
        });
    }

    async function ejecutarFlujo() {
        try {
            console.log("Iniciando flujo...");
            const resultado = await operacionAsincronaConError(); // Aquí se lanzará el error
            console.log("Resultado:", resultado); // Esto no se ejecutará
        } catch (error) {
            console.error("Error en ejecutarFlujo:", error.message); // Captura el error
        } finally {
            console.log("Flujo finalizado.");
        }
    }

    ejecutarFlujo();
    ```

2.  **Manejo de Errores en Paralelo con `Promise.all()`**:
    Si se usa `Promise.all()` con `async/await`, el bloque `catch` de la función `async` capturará el error de la *primera* promesa que se rechace (ya que `Promise.all()` se rechaza tan pronto como una falla). Si se necesita el resultado de todas las promesas incluso si algunas fallan, `Promise.allSettled()` con `await` es la opción correcta.

    ```javascript
    async function procesarMultiplesPeticiones(urls) {
        const promesas = urls.map(url => fetch(url).then(res => res.json()));
        try {
            const resultados = await Promise.all(promesas);
            console.log("Todos los resultados:", resultados);
        } catch (error) {
            console.error("Una de las peticiones falló:", error.message);
        }
    }

    // Para manejar errores individuales en paralelo:
    async function procesarTodasLasPeticiones(urls) {
        const promesas = urls.map(url => fetch(url).then(res => res.json()).catch(err => ({ status: 'rejected', reason: err.message })));
        const resultados = await Promise.all(promesas); // Promise.all ahora espera a que todas "resuelvan" (aunque sea un objeto de error)
        console.log("Resultados individuales:", resultados);
    }
    ```

#### Captura de Errores Globales (Entorno Navegador)

Para capturar errores globales que de otra manera podrían pasar desapercibidos:

*   **`window.onerror`**: Para errores síncronos no capturados.
*   **`window.addEventListener('unhandledrejection', ...)`**: Para rechazos de promesas no capturados.

```javascript
window.onerror = function(message, source, lineno, colno, error) {
    console.error("Error global (síncrono):", message, error);
    return true; // Para suprimir el informe de error predeterminado del navegador
};

window.addEventListener('unhandledrejection', (event) => {
    console.error('Rechazo de promesa no capturado:', event.promise, event.reason);
});
```

---

### Ejemplos Ampliados y Corregidos

```javascript
// Funciones de simulación de API con errores controlados
function simularApiConExito(mensaje, delay = 500) {
    return new Promise(resolve => setTimeout(() => resolve(`Éxito: ${mensaje}`), delay));
}

function simularApiConFallo(mensaje, delay = 500) {
    return new Promise((_, reject) => setTimeout(() => reject(new Error(`Fallo: ${mensaje}`)), delay));
}

// Ejemplo 1: Errores en promesas y propagación
console.log("--- Errores en Promesas y Propagación ---");

simularApiConExito("Primer paso")
    .then(res => {
        console.log(res);
        return simularApiConFallo("Segundo paso (intencional)"); // Rechaza la promesa
    })
    .then(res => {
        console.log("Esto no se verá:", res); // No se ejecuta
        return simularApiConExito("Tercer paso");
    })
    .catch(err => {
        console.error("Capturado por .catch():", err.message); // Captura el fallo del segundo paso
        // Podemos recuperar la cadena aquí si devolvemos un valor o una promesa resuelta
        return "Recuperado de error";
    })
    .then(res => {
        console.log("Continuando después de recuperación:", res); // "Continuando después de recuperación: Recuperado de error"
    })
    .finally(() => {
        console.log("Cadena de promesas finalizada.");
    });


// Ejemplo 2: Manejo de errores con async/await
console.log("\n--- Manejo de Errores con async/await ---");

async function ejecutarFlujoAsincrono() {
    try {
        console.log("Inicio de flujo asíncrono.");
        const res1 = await simularApiConExito("Obteniendo configuración");
        console.log(res1);

        // Aquí simulamos un error síncrono para ver cómo try/catch lo maneja
        // const datoInvalido = JSON.parse("cadena_json_invalida");

        const res2 = await simularApiConFallo("Error al cargar datos de usuario"); // Esto generará un rechazo
        console.log("Esto no se ejecutará:", res2); // No se ejecuta
    } catch (error) {
        console.error("Error en el flujo principal:", error.message);
    } finally {
        console.log("Fin de flujo asíncrono.");
    }
}
ejecutarFlujoAsincrono();

// Ejemplo 3: Manejo de errores en paralelo con Promise.allSettled y async/await
console.log("\n--- Manejo de Errores en Paralelo (allSettled) ---");

async function obtenerTodosLosRecursosConManejoIndividual() {
    const promesas = [
        simularApiConExito("Recurso A"),
        simularApiConFallo("Recurso B fallido"),
        simularApiConExito("Recurso C")
    ];

    const resultados = await Promise.allSettled(promesas);

    console.log("Resultados de todas las promesas:");
    resultados.forEach((res, index) => {
        if (res.status === 'fulfilled') {
            console.log(`Promesa ${index + 1} (Éxito): ${res.value}`);
        } else {
            console.error(`Promesa ${index + 1} (Fallo): ${res.reason.message}`);
        }
    });
}
obtenerTodosLosRecursosConManejoIndividual();
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Implementación de Reintentos para Operaciones Asíncronas**
    Cree una función `reintentar(funcionAsincrona, intentos = 3)` que reciba una función asíncrona (que devuelve una promesa) y el número de intentos. La función `reintentar` debe ejecutar `funcionAsincrona` y, si esta falla, reintentarla hasta el número máximo de `intentos`. Si después de todos los intentos sigue fallando, debe rechazar con el último error.

    ```javascript
    let contadorFallo = 0;
    async function operacionInestable() {
        return new Promise((resolve, reject) => {
            contadorFallo++;
            if (contadorFallo < 3) { // Fallará las primeras 2 veces
                console.log(`Intento ${contadorFallo}: Fallando...`);
                reject(new Error(`Fallo en el intento ${contadorFallo}`));
            } else {
                console.log(`Intento ${contadorFallo}: Éxito!`);
                resolve("Operación exitosa!");
            }
        });
    }

    async function reintentar(funcionAsincrona, intentos = 3) {
        // Su código aquí
    }

    (async () => {
        try {
            const resultado = await reintentar(operacionInestable, 5);
            console.log("Resultado final:", resultado);
        } catch (error) {
            console.error("Fallo después de todos los reintentos:", error.message);
        }
    })();

    // Caso donde siempre falla
    let contadorFalloTotal = 0;
    async function operacionSiempreFalla() {
        return new Promise((resolve, reject) => {
            contadorFalloTotal++;
            reject(new Error(`Fallo en el intento ${contadorFalloTotal} (siempre)`));
        });
    }
    (async () => {
        try {
            const resultado = await reintentar(operacionSiempreFalla, 2);
            console.log("Resultado final (siempre falla):", resultado);
        } catch (error) {
            console.error("Fallo después de reintentos (siempre falla):", error.message);
        }
    })();
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Implementación de Reintentos para Operaciones Asíncronas

    let contadorFallo = 0;
    async function operacionInestable() {
        return new Promise((resolve, reject) => {
            contadorFallo++;
            if (contadorFallo < 3) { // Fallará las primeras 2 veces
                console.log(`Intento ${contadorFallo}: Fallando...`);
                reject(new Error(`Fallo en el intento ${contadorFallo}`));
            } else {
                console.log(`Intento ${contadorFallo}: Éxito!`);
                resolve("Operación exitosa!");
            }
        });
    }

    async function reintentar(funcionAsincrona, intentos = 3) {
        for (let i = 1; i <= intentos; i++) {
            try {
                return await funcionAsincrona();
            } catch (error) {
                if (i === intentos) {
                    throw error; // Lanza el último error si todos los intentos fallan
                }
                console.warn(`Reintento ${i} fallido. Intentando de nuevo...`);
                // Opcional: añadir un pequeño retardo antes de reintentar
                await new Promise(resolve => setTimeout(resolve, 50 * i));
            }
        }
    }

    (async () => {
        try {
            const resultado = await reintentar(operacionInestable, 5);
            console.log("Resultado final:", resultado);
        } catch (error) {
            console.error("Fallo después de todos los reintentos:", error.message);
        }
    })();

    // Caso donde siempre falla
    let contadorFalloTotal = 0;
    async function operacionSiempreFalla() {
        return new Promise((resolve, reject) => {
            contadorFalloTotal++;
            reject(new Error(`Fallo en el intento ${contadorFalloTotal} (siempre)`));
        });
    }
    (async () => {
        try {
            const resultado = await reintentar(operacionSiempreFalla, 2);
            console.log("Resultado final (siempre falla):", resultado);
        } catch (error) {
            console.error("Fallo después de reintentos (siempre falla):", error.message);
        }
    })();
    ```

2.  **Ejercicio: Petición `fetch` con Manejo de Errores Detallado**
    Cree una función `peticionSegura(url)` que use `fetch` y `async/await`. La función debe:
    1.  Intentar realizar una petición GET a la `url`.
    2.  Si la respuesta HTTP no es `ok` (`response.ok` es `false`), debe lanzar un error con el mensaje `HTTP error! status: ${response.status}`.
    3.  Si la petición falla por problemas de red o cualquier otra excepción, debe lanzar un error con el mensaje `Network error: ${error.message}`.
    4.  Si la petición es exitosa y la respuesta es `ok`, debe devolver los datos parseados como JSON.

    ```javascript
    async function peticionSegura(url) {
        // Su código aquí
    }

    (async () => {
        console.log("\n--- Petición Segura ---");
        // Caso de éxito (API de gatos de ejemplo)
        try {
            const data = await peticionSegura("https://api.thecatapi.com/v1/images/search?limit=1");
            console.log("Datos exitosos:", data);
        } catch (error) {
            console.error("Error en la petición exitosa:", error.message);
        }

        // Caso de error HTTP (URL inválida que devolverá 404/500)
        try {
            const data = await peticionSegura("https://api.thecatapi.com/v1/nonexistent-endpoint");
            console.log("Datos de error HTTP:", data);
        } catch (error) {
            console.error("Error en la petición HTTP (esperado):", error.message); // HTTP error! status: 404
        }

        // Caso de error de red (URL inexistente o formato incorrecto)
        try {
            const data = await peticionSegura("https://invalid.url/data");
            console.log("Datos de error de red:", data);
        } catch (error) {
            console.error("Error en la petición de red (esperado):", error.message); // Network error: ...
        }
    })();
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Petición `fetch` con Manejo de Errores Detallado

    async function peticionSegura(url) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                // Si la respuesta HTTP no es 2xx, la consideramos un error.
                // fetch no lanza error para 4xx/5xx, solo para problemas de red.
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            // Captura errores de red o errores lanzados por response.ok
            // y cualquier error al parsear JSON
            if (error.message.startsWith("HTTP error!")) {
                throw error; // Relanzar el error HTTP tal cual
            } else {
                throw new Error(`Network error: ${error.message}`); // Mensaje genérico para otros fallos
            }
        }
    }

    (async () => {
        console.log("\n--- Petición Segura ---");
        // Caso de éxito (API de gatos de ejemplo)
        try {
            const data = await peticionSegura("https://api.thecatapi.com/v1/images/search?limit=1");
            console.log("Datos exitosos:", data);
        } catch (error) {
            console.error("Error en la petición exitosa:", error.message);
        }

        // Caso de error HTTP (URL inválida que devolverá 404/500)
        try {
            const data = await peticionSegura("https://api.thecatapi.com/v1/nonexistent-endpoint");
            console.log("Datos de error HTTP:", data);
        } catch (error) {
            console.error("Error en la petición HTTP (esperado):", error.message);
        }

        // Caso de error de red (URL inexistente o formato incorrecto)
        try {
            const data = await peticionSegura("https://invalid.url/data");
            console.log("Datos de error de red:", data);
        } catch (error) {
            console.error("Error en la petición de red (esperado):", error.message);
        }
    })();
    ```

---


### Glosario Técnico

*   **Error-First Callback**: Convención de callbacks donde el primer argumento es para errores y el segundo para datos.
*   **Rechazo de Promesa**: Cuando una operación asíncrona falla y la promesa asociada se marca como `rejected`.
*   **`reject()`**: Función utilizada dentro del `executor` de una promesa para rechazarla explícitamente.
*   **`throw new Error()`**: Mecanismo para lanzar excepciones en JavaScript. Si ocurre en el `executor` de una promesa o en un `.then()`, la promesa se rechaza.
*   **`try...catch`**: Bloque de código para manejar excepciones. `try` ejecuta código que podría fallar; `catch` captura el error.
*   **`finally`**: Bloque de `try...catch` que se ejecuta siempre, independientemente de si hubo un error o no.
*   **Propagación de Errores**: El viaje de un error a través de una cadena de promesas hasta que es capturado por un `.catch()`.
*   **`unhandledrejection`**: Evento global (en `window` en navegadores) que se dispara cuando una promesa se rechaza y no hay ningún manejador de errores (`.catch()`) asociado.
*   **`response.ok`**: Propiedad de la respuesta `fetch` que indica si la respuesta HTTP fue exitosa (código de estado 200-299).
*   **Reintentos**: Estrategia de manejo de errores que consiste en intentar una operación varias veces si falla, con la esperanza de que tenga éxito en un intento posterior.
*   **HTTP Status Codes**: Códigos numéricos en las respuestas HTTP que indican el resultado de una petición (ej. 200 OK, 404 Not Found, 500 Internal Server Error).
*   **Network Error**: Error que ocurre a nivel de red (ej. sin conexión a internet, URL incorrecta), que impide que la petición HTTP se envíe o reciba correctamente.

```