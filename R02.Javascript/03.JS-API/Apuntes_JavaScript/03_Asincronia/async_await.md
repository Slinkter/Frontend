# Módulo 03: El Modelo Asíncrono de JavaScript

## Tema 3.3: `async/await`: La Sintaxis Moderna para un Código Legible

### Clase: Simplificando la Asincronía con Sintaxis Síncrona

Mientras que las **Promesas** (`Promise`) ofrecieron una mejora significativa sobre los **callbacks** para manejar la asincronía, la sintaxis de encadenamiento de `.then()` y `.catch()` podía aún resultar verbosa, especialmente con lógica compleja o anidada. La introducción de las palabras clave **`async` y `await`** en ECMAScript 2017 (ES8) revolucionó aún más el manejo de la asincronía en JavaScript, permitiendo escribir código asíncrono que se ve y se comporta de manera similar al código síncrono, mejorando drásticamente la legibilidad y el mantenimiento.

#### `async` Functions: Definiendo una Función Asíncrona

*   Una función declarada con la palabra clave `async` delante de `function`.
*   Las funciones `async` siempre devuelven una **Promesa**.
    *   Si la función `async` devuelve un valor, esa promesa se resolverá con el valor devuelto.
    *   Si la función `async` lanza una excepción, esa promesa se rechazará con la excepción.

```javascript
async function miFuncionAsincrona() {
    return "Hola Asincronía"; // Esto devuelve Promise.resolve("Hola Asincronía")
}

miFuncionAsincrona().then(console.log); // Salida: Hola Asincronía

async function funcionQueFalla() {
    throw new Error("Algo salió mal"); // Esto devuelve Promise.reject(new Error("Algo salió mal"))
}

funcionQueFalla().catch(error => console.error(error.message)); // Salida: Algo salió mal
```

#### `await` Operator: Esperando la Resolución de Promesas

*   La palabra clave `await` **solo puede ser utilizada dentro de una función `async`**.
*   `await` "pausa" la ejecución de la función `async` hasta que la `Promise` que le sigue se resuelva (`fulfilled`) o se rechace (`rejected`).
*   Cuando la promesa se resuelve, `await` devuelve el valor de resolución de la promesa.
*   Si la promesa se rechaza, `await` lanza la excepción de la promesa rechazada, la cual puede ser capturada por un bloque `try...catch`.

```javascript
function obtenerDatosRetraso(ms) {
    return new Promise(resolve => setTimeout(() => resolve(`Datos listos en ${ms}ms`), ms));
}

async function procesarDatos() {
    console.log("Iniciando procesamiento...");
    const datos1 = await obtenerDatosRetraso(1000); // Pausa aquí por 1s
    console.log(datos1); // Se ejecuta después de 1s
    const datos2 = await obtenerDatosRetraso(500);  // Pausa aquí por 0.5s
    console.log(datos2); // Se ejecuta después de 0.5s más
    console.log("Procesamiento completado.");
}

procesarDatos();
// Salida (con 1s de retraso entre las 2 primeras y 0.5s entre las 2 últimas):
// Iniciando procesamiento...
// Datos listos en 1000ms
// Datos listos en 500ms
// Procesamiento completado.
```

#### Manejo de Errores con `async/await`

Dado que `await` lanza una excepción si la promesa se rechaza, se puede usar el tradicional bloque `try...catch` para manejar los errores de manera elegante, similar a cómo se manejan los errores síncronos.

```javascript
async function obtenerUsuarioConError(id) {
    if (id < 1) {
        throw new Error("ID de usuario inválido.");
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 1) {
                resolve({ id: 1, nombre: "Ana" });
            } else {
                reject("Usuario no encontrado.");
            }
        }, 500);
    });
}

async function cargarUsuario(id) {
    try {
        const usuario = await obtenerUsuarioConError(id); // Si la promesa se rechaza, lanza un error
        console.log("Usuario cargado:", usuario);
    } catch (error) {
        console.error("Error al cargar usuario:", error.message);
    } finally {
        console.log("Intento de carga de usuario finalizado.");
    }
}

cargarUsuario(1);   // Éxito
cargarUsuario(2);   // Falla (Usuario no encontrado)
cargarUsuario(0);   // Falla (ID de usuario inválido)
```

#### Paralelismo con `async/await`

Aunque `await` hace que el código parezca síncrono, no significa que debamos ejecutar todas las operaciones asíncronas en serie si no hay dependencia. Para ejecutar operaciones en paralelo, podemos iniciar todas las promesas y luego `await` por sus resultados usando `Promise.all()`.

```javascript
async function cargarMultiplesRecursos() {
    console.log("Cargando recursos en paralelo...");

    const p1 = obtenerDatosRetraso(2000); // Inicia la promesa, no espera
    const p2 = obtenerDatosRetraso(1000); // Inicia la promesa, no espera
    const p3 = obtenerDatosRetraso(1500); // Inicia la promesa, no espera

    const resultados = await Promise.all([p1, p2, p3]); // Espera a que todas se resuelvan
    // La ejecución total tomará el tiempo de la promesa más larga (2000ms)

    console.log("Resultados obtenidos en paralelo:", resultados);
    console.log("Todos los recursos cargados.");
}

cargarMultiplesRecursos();
// Salida (después de ~2 segundos):
// Cargando recursos en paralelo...
// Resultados obtenidos en paralelo: [ 'Datos listos en 2000ms', 'Datos listos en 1000ms', 'Datos listos en 1500ms' ]
// Todos los recursos cargados.
```

#### Top-level `await` (ES2022)

Históricamente, `await` solo podía usarse dentro de funciones `async`. Sin embargo, con ES2022, se introdujo el "Top-level `await`", permitiendo usar `await` directamente en el nivel superior de un módulo JavaScript (fuera de cualquier función `async`). Esto es especialmente útil en módulos ESM para inicializaciones o importaciones dinámicas que son asíncronas.

```javascript
// Ejemplo de top-level await (en un archivo de módulo .mjs o type="module" en package.json)
// const response = await fetch('https://api.example.com/config');
// const config = await response.json();
// console.log(config);

// export const API_URL = config.apiUrl;
```

#### Consideraciones y Buenas Prácticas

*   **Evitar Bloqueos Innecesarios**: Use `Promise.all()` cuando las operaciones asíncronas no dependen entre sí.
*   **Manejo de Errores**: Siempre envuelva sus llamadas `await` en `try...catch` si la promesa subyacente puede fallar.
*   **Funciones `async` siempre devuelven Promesas**: Recuerde que incluso una función `async` que devuelve un valor síncrono lo hará envuelto en una promesa.
*   **Legibilidad**: `async/await` mejora drásticamente la legibilidad del código asíncrono, haciéndolo más parecido a un flujo de ejecución síncrono.

---

### Ejemplos Ampliados y Corregidos

```javascript
// Partes de su código original que usan async/await (refactorizados para claridad)
/*
async function getImgCat() {
    const API_URL = `https://api.thecatapi.com/v1/images/search?limit=3&api_key=${API_KEY}`;
    const data = await f_getData(API_URL); // f_getData devuelve una promesa
    // ... manipulación del DOM con los datos ...
}
*/

// Otro ejemplo del uso de axios con async/await
/*
const api = axios.create(options); // axios.create devuelve una instancia

async function loadRandomMichis() {
    try {
        const resAxios = await api.get("/images/search?limit=3"); // await espera la promesa de axios
        const { data, status } = resAxios;
        // ...
    } catch (error) {
        // ... manejo de error ...
    }
}
*/
```
```javascript
// Simulación de una API con promesas
function simularAPI(endpoint, delay, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`Error al acceder a ${endpoint}`));
            } else {
                resolve({ data: `Datos de ${endpoint}` });
            }
        }, delay);
    });
}

// Ejemplo 1: Encadenamiento Secuencial con async/await
console.log("--- Encadenamiento Secuencial con async/await ---");
async function obtenerRecursosEnOrden() {
    try {
        console.log("Paso 1: Obteniendo usuario...");
        const usuario = await simularAPI("/usuario/1", 1000);
        console.log("Usuario obtenido:", usuario.data);

        console.log("Paso 2: Obteniendo publicaciones del usuario...");
        const publicaciones = await simularAPI(`/publicaciones/${usuario.id}`, 700);
        console.log("Publicaciones obtenidas:", publicaciones.data);

        console.log("Paso 3: Obteniendo comentarios de la primera publicación...");
        const comentarios = await simularAPI(`/comentarios/${publicaciones.data.split(' ')[2]}`, 500); // Suponiendo ID de publicacion
        console.log("Comentarios obtenidos:", comentarios.data);

        console.log("Todas las operaciones completadas secuencialmente.");
    } catch (error) {
        console.error("Error en el flujo secuencial:", error.message);
    }
}
obtenerRecursosEnOrden();

// Ejemplo 2: Operaciones Paralelas con async/await y Promise.all
console.log("\n--- Operaciones Paralelas con async/await y Promise.all ---");
async function obtenerRecursosEnParalelo() {
    try {
        console.log("Iniciando obtención de recursos en paralelo...");
        const [usuariosData, productosData, categoriasData] = await Promise.all([
            simularAPI("/usuarios", 1500),
            simularAPI("/productos", 800, false),
            simularAPI("/categorias", 1200)
        ]);

        console.log("Datos de Usuarios:", usuariosData.data);
        console.log("Datos de Productos:", productosData.data);
        console.log("Datos de Categorías:", categoriasData.data);

        console.log("Todas las operaciones completadas en paralelo.");
    } catch (error) {
        console.error("Error en el flujo paralelo:", error.message);
    }
}
obtenerRecursosEnParalelo();

// Ejemplo 3: Manejo de errores específicos y múltiples con async/await
console.log("\n--- Manejo de Errores con async/await ---");
async function intentarOperacionesConErrores() {
    try {
        console.log("Intentando operación exitosa...");
        const exito = await simularAPI("/exito", 300);
        console.log(exito.data);

        console.log("Intentando operación que falla...");
        const fallo = await simularAPI("/fallo", 200, true); // Esta línea lanzará un error
        console.log(fallo.data); // Esta línea no se ejecutará

    } catch (error) {
        console.error("Error capturado:", error.message);
    } finally {
        console.log("Bloque finally ejecutado.");
    }
}
intentarOperacionesConErrores();
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Descarga de Recursos con Tiempo Límite**
    Modifique la función `descargarArchivo` del ejercicio anterior (que devolvía una promesa) para que ahora sea una función `async`. Además, cree una función `conLimiteDeTiempo(promesa, tiempoLimite)` que devuelva una nueva promesa que se rechace si la `promesa` original no se resuelve antes de `tiempoLimite` milisegundos.

    Utilice `Promise.race` para implementar `conLimiteDeTiempo`.
    Luego, intente descargar un archivo con un tiempo límite.

    ```javascript
    async function descargarArchivo(nombreArchivo, duracion) {
        return new Promise((resolve, reject) => {
            if (duracion < 500) {
                reject(`Error: Duración de descarga muy corta para ${nombreArchivo}.`);
                return;
            }
            console.log(`Iniciando descarga de ${nombreArchivo} (simulada por ${duracion}ms)...`);
            setTimeout(() => {
                resolve(`${nombreArchivo} descargado.`);
            }, duracion);
        });
    }

    function conLimiteDeTiempo(promesa, tiempoLimite) {
        // Su código aquí
    }

    // Usando async/await para la descarga con límite de tiempo
    async function iniciarDescargaConLimite() {
        try {
            console.log("--- Descarga con Límite de Tiempo ---");
            const descargaLenta = descargarArchivo("archivo_lento.zip", 3000); // 3 segundos
            const resultado = await conLimiteDeTiempo(descargaLenta, 2000);    // Límite de 2 segundos
            console.log(resultado);
        } catch (error) {
            console.error("Fallo en la descarga con límite:", error.message);
        }

        try {
            const descargaRapida = descargarArchivo("archivo_rapido.txt", 1000); // 1 segundo
            const resultadoRapido = await conLimiteDeTiempo(descargaRapida, 2000); // Límite de 2 segundos
            console.log(resultadoRapido);
        } catch (error) {
            console.error("Fallo en la descarga rápida (no debería fallar):", error.message);
        }
    }

    iniciarDescargaConLimite();
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Descarga de Recursos con Tiempo Límite

    async function descargarArchivo(nombreArchivo, duracion) {
        return new Promise((resolve, reject) => {
            if (duracion < 500) {
                reject(new Error(`Duración de descarga muy corta para ${nombreArchivo}.`));
                return;
            }
            console.log(`Iniciando descarga de ${nombreArchivo} (simulada por ${duracion}ms)...`);
            setTimeout(() => {
                resolve(`${nombreArchivo} descargado.`);
            }, duracion);
        });
    }

    function conLimiteDeTiempo(promesa, tiempoLimite) {
        // Crea una promesa que se rechaza si expira el tiempo
        const promesaDeTimeout = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error(`Timeout: La operación excedió el límite de ${tiempoLimite}ms.`));
            }, tiempoLimite);
        });

        // Promise.race devolverá el resultado de la primera promesa que se resuelva o rechace
        return Promise.race([promesa, promesaDeTimeout]);
    }

    // Usando async/await para la descarga con límite de tiempo
    async function iniciarDescargaConLimite() {
        try {
            console.log("--- Descarga con Límite de Tiempo ---");
            const descargaLenta = descargarArchivo("archivo_lento.zip", 3000); // 3 segundos
            const resultado = await conLimiteDeTiempo(descargaLenta, 2000);    // Límite de 2 segundos
            console.log(resultado); // No debería llegar aquí, la promesa de timeout se rechazará
        } catch (error) {
            console.error("Fallo en la descarga con límite:", error.message); // -> Timeout: La operación excedió...
        }

        try {
            const descargaRapida = descargarArchivo("archivo_rapido.txt", 1000); // 1 segundo
            const resultadoRapido = await conLimiteDeTiempo(descargaRapida, 2000); // Límite de 2 segundos
            console.log(resultadoRapido); // -> archivo_rapido.txt descargado.
        } catch (error) {
            console.error("Fallo en la descarga rápida (no debería fallar):", error.message);
        }
    }

    iniciarDescargaConLimite();
    ```

2.  **Ejercicio: Consumo de Múltiples APIs con Error Global**
    Utilizando la función `simularAPI` del ejemplo de la clase, cree una función `async` llamada `obtenerTodosLosDatos(endpoints)` que reciba un array de `endpoints`. La función debe:
    1.  Realizar todas las peticiones a los `endpoints` en paralelo.
    2.  Si **todas** las peticiones son exitosas, devolver un array con los datos de todas ellas.
    3.  Si **alguna** de las peticiones falla, capturar el error y devolver un objeto `{ error: "Alguna API falló", detalles: error.message }`.

    ```javascript
    // Re-utilice la función simularAPI del ejemplo de la clase
    function simularAPI(endpoint, delay, shouldFail = false) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldFail) {
                    reject(new Error(`Error al acceder a ${endpoint}`));
                } else {
                    resolve({ data: `Datos de ${endpoint}` });
                }
            }, delay);
        });
    }

    async function obtenerTodosLosDatos(endpoints) {
        // Su código aquí
    }

    // Caso de éxito
    obtenerTodosLosDatos(["/api/1", "/api/2", "/api/3"])
        .then(res => console.log("Caso Éxito:", res))
        .catch(err => console.error("Caso Éxito (Error):"), err.message));

    // Caso de fallo
    obtenerTodosLosDatos(["/api/4", "/api/fallo", "/api/5"])
        .then(res => console.log("Caso Fallo:", res))
        .catch(err => console.error("Caso Fallo (Error):"), err.message));
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Consumo de Múltiples APIs con Error Global

    // Re-utilice la función simularAPI del ejemplo de la clase
    function simularAPI(endpoint, delay, shouldFail = false) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldFail) {
                    reject(new Error(`Error al acceder a ${endpoint}`));
                } else {
                    resolve({ data: `Datos de ${endpoint}` });
                }
            }, delay);
        });
    }

    async function obtenerTodosLosDatos(endpoints) {
        try {
            const promesas = endpoints.map(endpoint => {
                // Simular fallo en un endpoint específico para el ejercicio
                const shouldFail = endpoint.includes("/api/fallo");
                return simularAPI(endpoint, Math.random() * 500 + 500, shouldFail);
            });

            const resultados = await Promise.all(promesas);
            return resultados.map(res => res.data); // Extraer solo los datos
        } catch (error) {
            // Promise.all se rechaza si alguna promesa falla,
            // capturando el error de la primera que lo haga.
            return { error: "Alguna API falló", detalles: error.message };
        }
    }

    // Caso de éxito
    obtenerTodosLosDatos(["/api/1", "/api/2", "/api/3"])
        .then(res => console.log("Caso Éxito:", res))
        .catch(err => console.error("Caso Éxito (Error):"), err)); // Note: ahora el catch es para errores globales no manejados por la función

    // Caso de fallo
    obtenerTodosLosDatos(["/api/4", "/api/fallo", "/api/5"])
        .then(res => console.log("Caso Fallo:", res)) // -> Caso Fallo: { error: 'Alguna API falló', detalles: 'Error al acceder a /api/fallo' }
        .catch(err => console.error("Caso Fallo (Error):"), err));
    ```

---

### Glosario Técnico

*   **`async` Function**: Una función que siempre devuelve una Promesa y que permite el uso de la palabra clave `await` en su interior.
*   **`await` Operator**: Pausa la ejecución de una función `async` hasta que una Promesa se resuelva o se rechace, y luego reanuda la ejecución con el valor de la Promesa.
*   **Promesa (Promise)**: Objeto que representa un valor que podría estar disponible ahora, en el futuro o nunca.
*   **Manejo de Errores con `try...catch`**: Estructura utilizada para manejar excepciones lanzadas por `await` cuando una Promesa se rechaza.
*   **Paralelismo**: Ejecución simultánea de múltiples operaciones asíncronas para mejorar el rendimiento.
*   **`Promise.all()`**: Método que toma un iterable de Promesas y devuelve una nueva Promesa que se resuelve con un array de los resultados de todas las Promesas dadas, o se rechaza si alguna de las Promesas falla.
*   **Top-level `await` (ES2022)**: La capacidad de usar `await` directamente en el cuerpo principal de un módulo JavaScript sin estar dentro de una función `async`.
*   **Bloqueo**: Una operación que impide la ejecución de otras operaciones hasta que finaliza. Se evita en `async/await` al "pausar" la función `async` sin bloquear el hilo principal.
*   **Sintaxis Síncrona**: Código que se ejecuta en un orden secuencial predecible, línea por línea, de arriba abajo. `async/await` simula esta apariencia para el código asíncrono.

```