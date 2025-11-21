# Módulo 03: El Modelo Asíncrono de JavaScript

## Tema 3.2: De Callbacks a Promesas: Evolución de la Asincronía

### Clase: Gestión Elegante de Operaciones Asíncronas

Las operaciones asíncronas son una parte inherente del desarrollo moderno en JavaScript, especialmente en entornos de navegador (peticiones de red, eventos de usuario, temporizadores) y Node.js (I/O de archivos, bases de datos). Tradicionalmente, estas operaciones se manejaban con **callbacks**, lo que a menudo llevaba a problemas de legibilidad y mantenimiento, conocidos como el "Callback Hell" o "Pirámide de la Perdición". La introducción de las **Promesas (Promises)** en ES6 revolucionó la forma de gestionar la asincronía, ofreciendo un enfoque más estructurado, legible y potente.

#### Callbacks: El Inicio de la Asincronía

Un **callback** es una función que se pasa como argumento a otra función, con la expectativa de que el callback sea ejecutado en un momento posterior, después de que la función principal haya completado alguna tarea. Son la base de muchas APIs asíncronas en JavaScript.

```javascript
// Ejemplo de Callback
function obtenerDatosUsuario(id, callback) {
    setTimeout(() => {
        if (id === 1) {
            callback(null, { id: 1, nombre: "Juan" }); // null para error, objeto para datos
        } else {
            callback("Usuario no encontrado", null); // Mensaje de error, null para datos
        }
    }, 1000);
}

obtenerDatosUsuario(1, (error, usuario) => {
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Usuario:", usuario);
    }
});
```

##### El Problema del "Callback Hell"

Cuando se tienen múltiples operaciones asíncronas dependientes que se ejecutan en secuencia, el anidamiento de callbacks puede volverse extremadamente profundo, creando código difícil de leer, entender y depurar.

```javascript
// Ejemplo de Callback Hell
obtenerDatosUsuario(1, (error, usuario) => {
    if (error) return console.error(error);
    obtenerPublicaciones(usuario.id, (error, publicaciones) => {
        if (error) return console.error(error);
        obtenerComentarios(publicaciones[0].id, (error, comentarios) => {
            if (error) return console.error(error);
            console.log("Comentarios de la primera publicación:", comentarios);
        });
    });
});
```

#### Promesas: Una Solución Estructurada al "Callback Hell"

Una **Promesa** es un objeto que representa la eventual finalización (o falla) de una operación asíncrona y su valor resultante. Una promesa puede estar en uno de tres estados:

1.  **`pending` (pendiente)**: Estado inicial, ni cumplida ni rechazada.
2.  **`fulfilled` (resuelta/cumplida)**: La operación asíncrona se completó con éxito.
3.  **`rejected` (rechazada)**: La operación asíncrona falló.

Una vez que una promesa es `fulfilled` o `rejected`, se considera `settled` (resuelta/establecida) y su estado no cambiará más.

##### Creación de Promesas

Se crea una nueva promesa utilizando el constructor `new Promise()`, que toma una función `executor` con dos argumentos: `resolve` y `reject`.

```javascript
const miPromesa = new Promise((resolve, reject) => {
    const operacionExitosa = true; // Simula el resultado de una operación asíncrona

    setTimeout(() => {
        if (operacionExitosa) {
            resolve("Datos obtenidos con éxito."); // La promesa se cumple
        } else {
            reject("Error al obtener los datos."); // La promesa es rechazada
        }
    }, 1500);
});
```

##### Consumo de Promesas: `.then()`, `.catch()`, `.finally()`

Para trabajar con el resultado de una promesa, se utilizan los métodos encadenables:

1.  **`.then(onFulfilled, onRejected)`**:
    *   `onFulfilled`: Función que se ejecuta si la promesa se cumple. Recibe el valor de `resolve`.
    *   `onRejected`: (Opcional) Función que se ejecuta si la promesa es rechazada. Recibe el valor de `reject`.

    ```javascript
    miPromesa.then(
        (valor) => {
            console.log("Éxito:", valor); // "Éxito: Datos obtenidos con éxito."
        },
        (error) => {
            console.error("Fallo:", error);
        }
    );
    ```

2.  **`.catch(onRejected)`**:
    Un atajo para `.then(null, onRejected)`. Es el lugar preferido para manejar los errores de una cadena de promesas.

    ```javascript
    miPromesa
        .then(valor => console.log("Éxito:", valor))
        .catch(error => console.error("Fallo:", error));
    ```

3.  **`.finally(onFinally)`** (ES2018):
    Función que se ejecuta cuando la promesa es `settled` (ya sea `fulfilled` o `rejected`). Es útil para realizar limpieza, independientemente del resultado.

    ```javascript
    miPromesa
        .then(valor => console.log(valor))
        .catch(error => console.error(error))
        .finally(() => console.log("Operación asíncrona finalizada."));
    ```

##### Encadenamiento de Promesas (Promise Chaining)

Una de las mayores ventajas de las promesas es la capacidad de encadenar operaciones asíncronas de forma secuencial y legible, evitando el "Callback Hell". Cada `.then()` devuelve una nueva promesa, permitiendo encadenar más `.then()` o `.catch()`.

```javascript
function obtenerUsuario(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 1) resolve({ id: 1, nombre: "Juan" });
            else reject("Usuario no encontrado");
        }, 500);
    });
}

function obtenerPublicaciones(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([{ id: 101, titulo: "Post 1" }, { id: 102, titulo: "Post 2" }]);
        }, 500);
    });
}

obtenerUsuario(1)
    .then(usuario => {
        console.log("Usuario:", usuario);
        return obtenerPublicaciones(usuario.id); // Devuelve una promesa
    })
    .then(publicaciones => {
        console.log("Publicaciones:", publicaciones);
        return publicaciones[0]; // Retorna un valor, que se envuelve en una Promise.resolve()
    })
    .then(primeraPublicacion => {
        console.log("Primera publicación:", primeraPublicacion.titulo);
    })
    .catch(error => {
        console.error("Error en la cadena:", error);
    });
```

#### Métodos Estáticos de `Promise`

*   **`Promise.all(iterable)`**:
    Toma un iterable de promesas y devuelve una única promesa que se cumple cuando todas las promesas en el iterable se han cumplido, devolviendo un array de sus valores. Se rechaza tan pronto como una de las promesas se rechaza.

    ```javascript
    const p1 = Promise.resolve(3);
    const p2 = 42;
    const p3 = new Promise(resolve => setTimeout(() => resolve('foo'), 100));

    Promise.all([p1, p2, p3]).then(valores => {
        console.log(valores); // [3, 42, "foo"]
    });
    ```

*   **`Promise.race(iterable)`**:
    Toma un iterable de promesas y devuelve una única promesa que se resuelve o rechaza tan pronto como una de las promesas en el iterable se resuelve o rechaza.

    ```javascript
    const p4 = new Promise(resolve => setTimeout(() => resolve('rápida'), 100));
    const p5 = new Promise(resolve => setTimeout(() => resolve('lenta'), 500));

    Promise.race([p4, p5]).then(valor => {
        console.log(valor); // "rápida"
    });
    ```

*   **`Promise.allSettled(iterable)`** (ES2020):
    Devuelve una promesa que se cumple después de que todas las promesas dadas se han resuelto (cumplido o rechazado), con un array de objetos que describen el resultado de cada promesa.

*   **`Promise.any(iterable)`** (ES2021):
    Devuelve una promesa que se cumple tan pronto como una de las promesas del iterable se cumple, con el valor de esa promesa. Se rechaza si todas las promesas en el iterable se rechazan.

---

### Ejemplos Ampliados y Corregidos

```javascript
// Simulación de funciones asíncronas con promesas
function fetchData(url) {
    return new Promise((resolve, reject) => {
        console.log(`Intentando obtener datos de: ${url}`);
        setTimeout(() => {
            if (url.includes("error")) {
                reject(`Error al cargar ${url}`);
            } else {
                resolve(`Datos de ${url} cargados exitosamente.`);
            }
        }, Math.random() * 1000 + 500); // Latencia aleatoria
    });
}

// Ejemplo 1: Encadenamiento de Promesas (Refactorizando "Callback Hell")
console.log("--- Encadenamiento de Promesas ---");
fetchData("api/usuario/1")
    .then(mensajeUsuario => {
        console.log(mensajeUsuario);
        return fetchData("api/publicaciones/usuario/1"); // Devuelve una nueva promesa
    })
    .then(mensajePublicaciones => {
        console.log(mensajePublicaciones);
        return fetchData("api/comentarios/publicacion/1"); // Devuelve otra promesa
    })
    .then(mensajeComentarios => {
        console.log(mensajeComentarios);
        console.log("Todas las operaciones completadas.");
    })
    .catch(error => {
        console.error("Un error ocurrió en la cadena:", error);
    })
    .finally(() => {
        console.log("Proceso de datos finalizado (con o sin éxito).");
    });

// Ejemplo 2: Uso de Promise.all()
console.log("\n--- Promise.all() ---");
const promesasConcurrentes = [
    fetchData("api/productos"),
    fetchData("api/categorias"),
    fetchData("api/ofertas")
];

Promise.all(promesasConcurrentes)
    .then(resultados => {
        console.log("Todas las peticiones concurrentes exitosas:", resultados);
    })
    .catch(error => {
        console.error("Al menos una petición concurrente falló:", error);
    });

// Ejemplo 3: Uso de Promise.race()
console.log("\n--- Promise.race() ---");
const promesasCarrera = [
    fetchData("api/dato_rapido"),
    fetchData("api/dato_lento_error"), // Una que falla, pero es lenta
    fetchData("api/dato_medio")
];

Promise.race(promesasCarrera)
    .then(ganador => {
        console.log("La primera promesa en resolver o rechazar:", ganador);
    })
    .catch(perdedor => {
        console.error("La primera promesa en resolver o rechazar:", perdedor);
    });

// Ejemplo 4: Uso de Promise.allSettled() (ES2020)
console.log("\n--- Promise.allSettled() ---");
const promesasTodasResultas = [
    fetchData("api/exito_1"),
    fetchData("api/error_123?error=true"), // Esta promesa será rechazada
    fetchData("api/exito_2")
];

Promise.allSettled(promesasTodasResultas)
    .then(resultados => {
        console.log("Resultados de todas las promesas (resueltas o rechazadas):");
        resultados.forEach(resultado => {
            if (resultado.status === 'fulfilled') {
                console.log(`  Éxito: ${resultado.value}`);
            } else {
                console.log(`  Fallo: ${resultado.reason}`);
            }
        });
    });
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Simulación de Descarga con Progreso**
    Cree una función `descargarArchivo(nombreArchivo, duracion)` que devuelva una promesa. Esta promesa debe simular la descarga de un archivo.
    *   La promesa se resolverá con `"${nombreArchivo} descargado"` después de `duracion` milisegundos.
    *   Si `duracion` es menor que 500ms, la promesa debe ser rechazada con "Error: Duración de descarga muy corta".
    *   Implemente un encadenamiento de promesas para descargar secuencialmente "imagen.jpg" (1200ms) y luego "documento.pdf" (800ms). Maneje cualquier error que pueda surgir.

    ```javascript
    function descargarArchivo(nombreArchivo, duracion) {
        // Su código aquí
    }

    // Encadenamiento aquí
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Simulación de Descarga con Progreso

    function descargarArchivo(nombreArchivo, duracion) {
        return new Promise((resolve, reject) => {
            if (duracion < 500) {
                reject(`Error: Duración de descarga muy corta para ${nombreArchivo}.`);
                return;
            }
            console.log(`Iniciando descarga de ${nombreArchivo}...`);
            setTimeout(() => {
                resolve(`${nombreArchivo} descargado.`);
            }, duracion);
        });
    }

    descargarArchivo("imagen.jpg", 1200)
        .then(mensaje => {
            console.log(mensaje);
            return descargarArchivo("documento.pdf", 800);
        })
        .then(mensaje => {
            console.log(mensaje);
            console.log("Todos los archivos descargados exitosamente.");
        })
        .catch(error => {
            console.error("Error durante la descarga:", error);
        });

    descargarArchivo("video.mp4", 300) // Este debería fallar
        .then(mensaje => console.log(mensaje))
        .catch(error => console.error("Intento de descarga corta fallido:", error));
    ```

2.  **Ejercicio: Fetch Concurrente con Manejo de Errores Individual**
    Dadas las funciones `fetchData` del ejemplo (simulando peticiones), utilice `Promise.allSettled` para realizar 3 peticiones concurrentes. Una de ellas debe fallar (`api/error_404`). Imprima un resumen claro de los resultados (éxito o fallo) para cada petición.

    ```javascript
    // Re-utilice la función fetchData del ejemplo de la clase
    function fetchData(url) {
        return new Promise((resolve, reject) => {
            console.log(`Intentando obtener datos de: ${url}`);
            setTimeout(() => {
                if (url.includes("error_404")) {
                    reject(`Recurso no encontrado en ${url}`);
                } else {
                    resolve(`Datos de ${url} cargados.`);
                }
            }, Math.random() * 1000 + 500);
        });
    }

    // Implemente Promise.allSettled aquí
    const urls = [
        "api/recurso_a",
        "api/error_404",
        "api/recurso_b"
    ];
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Fetch Concurrente con Manejo de Errores Individual

    // Re-utilice la función fetchData del ejemplo de la clase
    function fetchData(url) {
        return new Promise((resolve, reject) => {
            console.log(`Intentando obtener datos de: ${url}`);
            setTimeout(() => {
                if (url.includes("error_404")) {
                    reject(`Recurso no encontrado en ${url}`);
                } else {
                    resolve(`Datos de ${url} cargados.`);
                }
            }, Math.random() * 1000 + 500);
        });
    }

    const urls = [
        "api/recurso_a",
        "api/error_404",
        "api/recurso_b"
    ];

    const promesas = urls.map(url => fetchData(url));

    Promise.allSettled(promesas)
        .then(resultados => {
            console.log("Resumen de peticiones concurrentes:");
            resultados.forEach((resultado, index) => {
                const urlOriginal = urls[index];
                if (resultado.status === 'fulfilled') {
                    console.log(`  [ÉXITO] ${urlOriginal}: ${resultado.value}`);
                } else {
                    console.error(`  [FALLO] ${urlOriginal}: ${resultado.reason}`);
                }
            });
        });
    ```

---

### Glosario Técnico

*   **Asincronía**: Ejecución de operaciones que no bloquean el hilo principal de ejecución, permitiendo que otras tareas continúen.
*   **Callback**: Una función pasada como argumento a otra, para ser ejecutada cuando la operación asíncrona principal finalice.
*   **Callback Hell (Pirámide de la Perdición)**: Anidamiento excesivo de callbacks, dificultando la lectura y mantenimiento del código.
*   **Promesa (Promise)**: Objeto que representa la finalización (o falla) eventual de una operación asíncrona y su valor resultante.
*   **Estados de una Promesa**:
    *   `pending`: Estado inicial.
    *   `fulfilled`: La operación asíncrona se completó con éxito.
    *   `rejected`: La operación asíncrona falló.
    *   `settled`: La promesa ha sido cumplida o rechazada (no cambiará más de estado).
*   **`.then()`**: Maneja el caso de éxito (`fulfilled`) y opcionalmente el de fallo (`rejected`) de una promesa.
*   **`.catch()`**: Maneja únicamente el caso de fallo (`rejected`) de una promesa.
*   **`.finally()`**: Se ejecuta cuando la promesa es `settled` (independientemente del éxito o fracaso).
*   **Encadenamiento de Promesas (Promise Chaining)**: Secuencia de operaciones `.then()` donde cada una devuelve una nueva promesa.
*   **`Promise.all()`**: Devuelve una promesa que se cumple si *todas* las promesas dadas se cumplen. Se rechaza a la primera que falle.
*   **`Promise.race()`**: Devuelve una promesa que se resuelve o rechaza tan pronto como *una* de las promesas dadas se resuelve o rechaza.
*   **`Promise.allSettled()` (ES2020)**: Devuelve una promesa que se cumple cuando *todas* las promesas dadas han finalizado (cumplidas o rechazadas), con un array de sus resultados.
*   **`Promise.any()` (ES2021)**: Devuelve una promesa que se cumple tan pronto como *una* de las promesas dadas se cumple. Se rechaza si todas las promesas se rechazan.

```javascript
