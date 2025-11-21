# Módulo 04: El Navegador como Entorno de Ejecución

## Tema 4.5: Persistencia de Estado con `localStorage`

### Clase: Almacenamiento de Datos en el Cliente para una Experiencia Continua

En las aplicaciones web modernas, a menudo necesitamos almacenar información en el lado del cliente (en el navegador del usuario) para recordar preferencias, mantener el estado de la sesión, guardar datos de usuario o simplemente para mejorar la experiencia de usuario al evitar recargar cierta información repetidamente. JavaScript, a través de las Web APIs, nos proporciona mecanismos para este propósito, siendo **`localStorage`** y `sessionStorage` los más comunes y accesibles.

#### Introducción a Web Storage API

La **Web Storage API** (parte del BOM) ofrece dos mecanismos principales para almacenar pares clave-valor en el navegador web: `localStorage` y `sessionStorage`. Ambos ofrecen una forma más segura y flexible de almacenar datos que las cookies, con una mayor capacidad de almacenamiento (típicamente 5MB o más, dependiendo del navegador) y una API más sencilla.

##### `localStorage`

*   **Persistencia**: Los datos almacenados en `localStorage` no tienen fecha de caducidad. Permanecen disponibles incluso después de cerrar la ventana o el navegador, e incluso después de reiniciar la computadora. Son persistentes entre sesiones.
*   **Ámbito**: Los datos están vinculados al origen (dominio, protocolo y puerto). Esto significa que `localStorage` establecido en `https://ejemplo.com` no es accesible desde `https://otrodominio.com` o `http://ejemplo.com`. Dentro del mismo origen, los datos son accesibles por todas las pestañas y ventanas.

##### `sessionStorage`

*   **Persistencia**: Los datos almacenados en `sessionStorage` solo duran mientras la "sesión de página" esté abierta. Los datos se borran cuando la pestaña o ventana del navegador se cierra. Una nueva pestaña o ventana del mismo origen crea una nueva sesión de `sessionStorage`.
*   **Ámbito**: Al igual que `localStorage`, los datos están vinculados al origen. Sin embargo, también están vinculados a la instancia específica de la pestaña o ventana.

#### Métodos Clave de `localStorage` y `sessionStorage`

Ambos objetos, `localStorage` y `sessionStorage`, exponen la misma interfaz:

1.  **`setItem(key, value)`**:
    *   Almacena un par clave-valor.
    *   Tanto `key` como `value` deben ser **cadenas de texto**. Si se pasa un valor que no es una cadena (ej. un objeto o un número), se convertirá automáticamente a su representación de cadena (`.toString()`).

    ```javascript
    localStorage.setItem('usuarioLogueado', 'true');
    localStorage.setItem('ultimaSesion', Date.now()); // Date.now() es un número, se convierte a string
    ```

2.  **`getItem(key)`**:
    *   Recupera el valor asociado a una clave.
    *   Devuelve el valor como una **cadena de texto**.
    *   Si la clave no existe, devuelve `null`.

    ```javascript
    const estaLogueado = localStorage.getItem('usuarioLogueado'); // "true" (string)
    console.log(estaLogueado === 'true'); // true
    ```

3.  **`removeItem(key)`**:
    *   Elimina el par clave-valor asociado a una clave.

    ```javascript
    localStorage.removeItem('ultimaSesion');
    ```

4.  **`clear()`**:
    *   Elimina **todos** los pares clave-valor almacenados para el origen actual.

    ```javascript
    localStorage.clear();
    ```

5.  **`length`**:
    *   Propiedad de solo lectura que devuelve el número de pares clave-valor almacenados.

    ```javascript
    console.log(localStorage.length);
    ```

#### Almacenando Objetos y Arrays (Uso de JSON)

Dado que `localStorage` solo almacena cadenas de texto, para guardar objetos o arrays complejos, es necesario serializarlos a una cadena JSON antes de almacenarlos y deserializarlos de nuevo a un objeto JavaScript al recuperarlos.

*   **`JSON.stringify(objeto)`**: Convierte un objeto/array de JavaScript a una cadena JSON.
*   **`JSON.parse(cadenaJSON)`**: Convierte una cadena JSON a un objeto/array de JavaScript.

Este es un patrón crucial y se observa directamente en su código (`14.Api-Rest-3/App/src/main.js`):

```javascript
// Desde su código: likedMovieList()
function likedMovieList() {
    const db_local = localStorage.getItem("liked_movies"); // Obtiene la cadena JSON
    const item = JSON.parse(db_local); // Convierte la cadena JSON a objeto JS
    return item ? item : {}; // Si no hay nada, devuelve un objeto vacío
}

// Desde su código: stateLikeMovie(movie)
function stateLikeMovie(movie) {
    const id = movie.id;
    const list = likedMovieList(); // Obtiene la lista actual como objeto JS
    // ... lógica para modificar el objeto 'list' ...
    localStorage.setItem("liked_movies", JSON.stringify(list)); // Guarda el objeto JS actualizado como cadena JSON
}
```

#### Consideraciones de Seguridad y Rendimiento

*   **Seguridad**: `localStorage` no es seguro para almacenar información sensible como credenciales de usuario. Es vulnerable a ataques **XSS (Cross-Site Scripting)**. Los datos no están cifrados. Para datos sensibles, se deben usar métodos de almacenamiento del lado del servidor o mecanismos más seguros como `IndexedDB` (para grandes volúmenes y más características) o cookies `HttpOnly` (para autenticación).
*   **Rendimiento**: El acceso a `localStorage` es síncrono y bloquea el hilo principal. No debe usarse para almacenar grandes cantidades de datos que se leen o escriben con frecuencia, ya que podría ralentizar la interfaz de usuario.
*   **Límites de Almacenamiento**: Aunque es más grande que las cookies, tiene un límite (ej. 5-10MB por origen). Si se excede, puede lanzar un error `QuotaExceededError`.

#### Casos de Uso Comunes

*   **Preferencias del Usuario**: Tema oscuro/claro, idioma, tamaño de fuente.
*   **Datos de Sesión No Sensibles**: IDs de sesión (si no son críticos), tokens de acceso (con precauciones), estados de formularios no enviados.
*   **Caché de Datos**: Almacenar respuestas de API que no cambian con frecuencia para reducir peticiones al servidor.
*   **Estado de la Aplicación**: Recordar el último producto visto, el carrito de compras (antes de checkout).

---

### Ejemplos Ampliados y Corregidos

```javascript
// Ejemplo 1: Guardar y Cargar Preferencias del Usuario
console.log("--- Preferencias de Usuario con localStorage ---");

function guardarPreferencia(clave, valor) {
    localStorage.setItem(clave, valor);
    console.log(`Preferencia '${clave}' guardada con valor: '${valor}'`);
}

function cargarPreferencia(clave, defaultValue) {
    const valor = localStorage.getItem(clave);
    return valor !== null ? valor : defaultValue;
}

// Establecer una preferencia (ej. tema oscuro)
guardarPreferencia('tema', 'dark');
guardarPreferencia('recordarSesion', true); // Se almacenará como "true" (string)

// Cargar preferencias
const temaGuardado = cargarPreferencia('tema', 'light');
const recordarSesionGuardado = cargarPreferencia('recordarSesion', false); // Se obtiene "true" (string)
const idiomaGuardado = cargarPreferencia('idioma', 'es'); // No existe, usa default

console.log(`Tema actual: ${temaGuardado}`);           // dark
console.log(`Recordar sesión: ${recordarSesionGuardado === 'true'}`); // true (comparar con string)
console.log(`Idioma: ${idiomaGuardado}`);               // es

// Limpiar una preferencia específica
localStorage.removeItem('recordarSesion');
console.log("Preferencia 'recordarSesion' eliminada.");

// Ejemplo 2: Almacenamiento de un Objeto Complejo
console.log("\n--- Almacenamiento de Objeto Complejo ---");

const carritoCompras = {
    productos: [
        { id: 1, nombre: "Laptop", cantidad: 1, precio: 1200 },
        { id: 2, nombre: "Mouse", cantidad: 2, precio: 25 }
    ],
    total: 1250,
    fechaCreacion: new Date()
};

console.log("Carrito original:", carritoCompras);

// Guardar el carrito serializado
localStorage.setItem('carrito', JSON.stringify(carritoCompras));
console.log("Carrito guardado en localStorage como JSON.");

// Recuperar y parsear el carrito
const carritoRecuperadoJSON = localStorage.getItem('carrito');
const carritoRecuperado = JSON.parse(carritoRecuperadoJSON);

console.log("Carrito recuperado:", carritoRecuperado);
console.log("Tipo de fecha original:", typeof carritoCompras.fechaCreacion); // object
console.log("Tipo de fecha recuperada:", typeof carritoRecuperado.fechaCreacion); // string (JSON.parse no recrea objetos Date automáticamente)

// Modificar el carrito recuperado y guardar de nuevo
if (carritoRecuperado) {
    carritoRecuperado.productos.push({ id: 3, nombre: "Teclado", cantidad: 1, precio: 75 });
    carritoRecuperado.total += 75;
    localStorage.setItem('carrito', JSON.stringify(carritoRecuperado));
    console.log("Carrito modificado y guardado de nuevo.");
}

// Limpiar todo el localStorage (¡con precaución!)
// localStorage.clear();
// console.log("Todos los datos de localStorage eliminados.");
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Contador de Visitas Persistente**
    Cree una función `inicializarContadorVisitas()` que muestre en una `página` cuántas veces el usuario ha visitado esa página. El contador debe persistir incluso si el usuario cierra el navegador y lo vuelve a abrir.

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Contador de Visitas</title>
    </head>
    <body>
        <h1>Bienvenido</h1>
        <p id="contadorMensaje">Has visitado esta página 0 veces.</p>

        <script>
            function inicializarContadorVisitas() {
                // Su código aquí
            }
            inicializarContadorVisitas();
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Contador de Visitas Persistente

    function inicializarContadorVisitas() {
        const contadorMensaje = document.getElementById('contadorMensaje');
        let contador = parseInt(localStorage.getItem('visitasPagina')) || 0; // Obtener y convertir a número, o 0 si no existe

        contador++; // Incrementar el contador
        localStorage.setItem('visitasPagina', contador); // Guardar el nuevo valor

        contadorMensaje.textContent = `Has visitado esta página ${contador} veces.`;
    }
    inicializarContadorVisitas();
    ```

2.  **Ejercicio: Gestión de una Lista de Tareas (TODOs)**
    Implemente una sencilla aplicación de lista de tareas que permita al usuario añadir nuevas tareas. Las tareas deben persistir en `localStorage`. Al cargar la página, las tareas guardadas deben mostrarse.

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Lista de Tareas Persistente</title>
    </head>
    <body>
        <h1>Lista de Tareas</h1>
        <input type="text" id="nuevaTareaInput" placeholder="Añadir nueva tarea">
        <button id="añadirTareaBtn">Añadir</button>
        <ul id="listaTareas">
            <!-- Las tareas se cargarán aquí -->
        </ul>

        <script>
            const nuevaTareaInput = document.getElementById('nuevaTareaInput');
            const añadirTareaBtn = document.getElementById('añadirTareaBtn');
            const listaTareasUL = document.getElementById('listaTareas');

            let tareas = []; // Array para almacenar las tareas

            function cargarTareas() {
                // Su código aquí: cargar tareas desde localStorage y renderizarlas
            }

            function guardarTareas() {
                // Su código aquí: guardar tareas en localStorage
            }

            function renderizarTareas() {
                // Su código aquí: Limpiar lista y renderizar todas las tareas
            }

            añadirTareaBtn.addEventListener('click', () => {
                // Su código aquí: añadir nueva tarea y actualizar
            });

            // Cargar tareas al inicio
            cargarTareas();
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Gestión de una Lista de Tareas (TODOs)

    const nuevaTareaInput = document.getElementById('nuevaTareaInput');
    const añadirTareaBtn = document.getElementById('añadirTareaBtn');
    const listaTareasUL = document.getElementById('listaTareas');

    let tareas = []; // Array para almacenar las tareas

    function cargarTareas() {
        const tareasJSON = localStorage.getItem('listaDeTareas');
        if (tareasJSON) {
            tareas = JSON.parse(tareasJSON);
        }
        renderizarTareas();
    }

    function guardarTareas() {
        localStorage.setItem('listaDeTareas', JSON.stringify(tareas));
    }

    function renderizarTareas() {
        listaTareasUL.innerHTML = ''; // Limpiar la lista actual
        tareas.forEach((tarea, index) => {
            const li = document.createElement('li');
            li.textContent = tarea;
            // Opcional: añadir un botón para eliminar tareas
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'x';
            deleteBtn.style.marginLeft = '10px';
            deleteBtn.addEventListener('click', () => {
                tareas.splice(index, 1); // Eliminar del array
                guardarTareas();
                renderizarTareas();
            });
            li.appendChild(deleteBtn);
            listaTareasUL.appendChild(li);
        });
    }

    añadirTareaBtn.addEventListener('click', () => {
        const nuevaTareaTexto = nuevaTareaInput.value.trim();
        if (nuevaTareaTexto) {
            tareas.push(nuevaTareaTexto);
            nuevaTareaInput.value = ''; // Limpiar input
            guardarTareas();
            renderizarTareas();
        }
    });

    // Cargar tareas al inicio
    cargarTareas();
    ```

---

### Glosario Técnico

*   **`localStorage`**: Mecanismo de almacenamiento de datos clave-valor en el navegador que persiste entre sesiones del navegador y sin fecha de caducidad.
*   **`sessionStorage`**: Mecanismo de almacenamiento de datos clave-valor en el navegador que dura solo mientras la pestaña o ventana del navegador esté abierta.
*   **Web Storage API**: Interfaz que proporciona `localStorage` y `sessionStorage`.
*   **`setItem(key, value)`**: Almacena un par clave-valor (ambos como cadenas de texto).
*   **`getItem(key)`**: Recupera el valor de una clave (como cadena de texto). Devuelve `null` si no existe.
*   **`removeItem(key)`**: Elimina un par clave-valor.
*   **`clear()`**: Elimina todos los pares clave-valor del almacenamiento.
*   **`JSON.stringify()`**: Convierte un objeto JavaScript a una cadena JSON para almacenarlo.
*   **`JSON.parse()`**: Convierte una cadena JSON de vuelta a un objeto JavaScript al recuperarlo.
*   **Serialización**: Proceso de convertir una estructura de datos o un objeto en un formato que puede ser almacenado o transmitido (ej., a JSON).
*   **Deserialización**: Proceso inverso de convertir un formato serializado de vuelta a una estructura de datos u objeto.
*   **Origen (Origin)**: Combinación de protocolo, dominio y puerto de una URL. Los datos de Web Storage están vinculados al origen.
*   **XSS (Cross-Site Scripting)**: Vulnerabilidad de seguridad donde un atacante inyecta scripts en una página web. `localStorage` es vulnerable.
*   **`IndexedDB`**: API de bajo nivel para almacenar cantidades significativas de datos estructurados en el cliente. Más potente que `localStorage` para bases de datos cliente.
*   **Cookies `HttpOnly`**: Atributo de cookies que impide que sean accedidas mediante scripts del lado del cliente, ofreciendo más seguridad contra XSS para tokens de sesión.
*   **`QuotaExceededError`**: Error que se produce cuando se intenta almacenar más datos de los permitidos por el límite de almacenamiento del navegador.

```