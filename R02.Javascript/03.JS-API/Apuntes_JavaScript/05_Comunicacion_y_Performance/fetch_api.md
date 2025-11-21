# Módulo 05: Comunicación, Performance y Patrones

## Tema 5.1: `Fetch` API: El Estándar para Peticiones HTTP

### Clase: La Interfaz Moderna para Comunicación con Servidores

La `Fetch` API proporciona una interfaz moderna y poderosa para realizar peticiones de red (HTTP) en navegadores web. Desde su introducción, ha reemplazado en gran medida a la antigua `XMLHttpRequest` (XHR) debido a su API más limpia, orientada a Promesas y más fácil de usar, lo que la convierte en la herramienta estándar para interactuar con APIs REST y otros servicios web. Entender `Fetch` es fundamental para cualquier aplicación JavaScript que necesite comunicarse con un servidor.

#### ¿Qué es la `Fetch` API?

`Fetch` es una interfaz global disponible en el objeto `window` (y en `global` en Node.js, aunque con algunas diferencias y en módulos específicos) que permite realizar solicitudes HTTP. Su diseño está basado en **Promesas**, lo que facilita el manejo de operaciones asíncronas para obtener recursos.

##### Características Clave:

*   **Basada en Promesas**: `fetch()` devuelve una Promesa, lo que permite encadenar `.then()` y `.catch()` para manejar la respuesta y los errores.
*   **API más Simple**: Más fácil de usar y más flexible que `XMLHttpRequest`.
*   **Soporte Moderno**: Ampliamente soportada en navegadores modernos.

#### Realizando una Petición Básica `GET`

La forma más sencilla de usar `fetch` es para una petición `GET`, donde solo se necesita la URL del recurso.

```javascript
fetch('https://api.example.com/data')
    .then(response => {
        // La Promesa se resuelve cuando el servidor responde con los encabezados.
        // `response.ok` es true para códigos de estado 200-299.
        // Para errores 4xx o 5xx, la Promesa *no* se rechaza, `response.ok` será false.
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // response.json() también devuelve una Promesa que se resuelve con el cuerpo de la respuesta parseado como JSON.
        return response.json();
    })
    .then(data => {
        console.log('Datos recibidos:', data);
    })
    .catch(error => {
        // Este catch capturará errores de red O errores lanzados explícitamente (throw new Error).
        console.error('Hubo un problema con la petición Fetch:', error);
    });
```

#### El Objeto `Response`

El primer `.then()` de `fetch()` recibe un objeto `Response`, que no es directamente los datos JSON. Este objeto contiene información sobre la respuesta HTTP:

*   `response.ok`: (Boolean) `true` si el estado de la respuesta está en el rango 200-299.
*   `response.status`: (Number) El código de estado HTTP (ej. 200, 404, 500).
*   `response.statusText`: (String) El mensaje de estado HTTP (ej. "OK", "Not Found").
*   `response.headers`: Un objeto `Headers` con los encabezados de la respuesta.
*   `response.url`: La URL final a la que se realizó la petición.

Para extraer el cuerpo de la respuesta, se usan métodos que también devuelven promesas:
*   `response.json()`: Para respuestas JSON.
*   `response.text()`: Para respuestas de texto plano.
*   `response.blob()`: Para datos binarios (imágenes, PDFs).
*   `response.formData()`: Para datos de formulario.
*   `response.arrayBuffer()`: Para un búfer de datos binarios genéricos.

#### Opciones de Configuración de `fetch()`

`fetch()` acepta un segundo argumento opcional, un objeto `init`, para configurar la petición.

```javascript
fetch(url, {
    method: 'POST', // GET, POST, PUT, DELETE, etc.
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN' // Su token de autenticación
    },
    body: JSON.stringify({ // Para POST/PUT, el cuerpo de la petición
        nombre: 'Nuevo Item',
        precio: 100
    }),
    mode: 'cors', // no-cors, cors, same-origin
    cache: 'no-cache', // default, no-store, reload, no-cache, force-cache, only-if-cached
    credentials: 'omit', // same-origin, include
    redirect: 'follow', // manual, follow, error
    referrerPolicy: 'no-referrer' // no-referrer, client
})
// ... manejo de la promesa ...
```

##### Métodos HTTP Comunes:

*   **`GET`**: Solicitar datos de un recurso especificado.
*   **`POST`**: Enviar datos a un servidor para crear un recurso.
*   **`PUT`**: Enviar datos a un servidor para actualizar un recurso existente.
*   **`DELETE`**: Eliminar un recurso especificado.

#### Manejo de Errores con `fetch`

Como se mencionó, `fetch` solo rechaza la promesa si hay un problema de red (ej. sin conexión, DNS fallido). Para errores HTTP (4xx, 5xx), la promesa se resuelve, pero `response.ok` será `false`. Es una buena práctica verificar `response.ok` explícitamente.

```javascript
async function obtenerDatos(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Lanza un error para que el bloque catch lo capture
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fallo en la petición:', error);
        // Puedes relanzar el error o devolver un valor por defecto
        throw error;
    }
}

// Ejemplo de uso:
obtenerDatos('https://api.example.com/invalid-endpoint')
    .catch(error => console.error('Error al obtener datos:', error.message));
```

#### Peticiones `POST` con `fetch`

Para enviar datos al servidor, se configura `method` como `POST` y se incluye un `body` con los datos a enviar.

```javascript
async function crearRecurso(url, nuevoRecurso) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' // Opcional, para indicar el tipo de respuesta esperado
            },
            body: JSON.stringify(nuevoRecurso) // El cuerpo debe ser una cadena JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Recurso creado:', data);
        return data;
    } catch (error) {
        console.error('Error al crear recurso:', error);
        throw error;
    }
}

const miNuevoPost = {
    userId: 1,
    title: 'Mi Nuevo Título',
    body: 'Este es el cuerpo de mi nuevo post.'
};

// crearRecurso('https://jsonplaceholder.typicode.com/posts', miNuevoPost);
```

#### `fetch` en su Código

En `12.Api-Rest-1/clase01/index.js`, se observa un uso fundamental de `fetch` para obtener imágenes de gatos:

```javascript
// Desde su código:
const f_getData = async (API_URL) => {
  const res = await fetch(`${API_URL}`);
  const data = await res.json();
  return data;
};

async function getImgCat() {
  const API_URL = `https://api.thecatapi.com/v1/images/search?limit=3&api_key=${API_KEY}`;
  const data = await f_getData(API_URL); // Utiliza await con la promesa devuelta por fetch
  // ... manipulación del DOM ...
}
```
Este fragmento es un excelente ejemplo de cómo `fetch` se integra con `async/await` para simplificar la lógica asíncrona. La función `f_getData` encapsula la lógica de la petición y el parseo JSON, devolviendo directamente los datos.

---

### Ejemplos Ampliados y Corregidos


```javascript
// Funciones de simulación de API para ejemplos
async function simulateApiCall(url, options = {}) {
    const delay = Math.random() * 1000 + 500; // Simula latencia de red
    return new Promise(resolve => setTimeout(() => {
        if (url.includes('error')) {
            resolve(new Response(JSON.stringify({ message: 'Simulated API Error' }), { status: 404, statusText: 'Not Found' }));
        } else if (options.method === 'POST') {
            resolve(new Response(JSON.stringify({ id: Date.now(), ...JSON.parse(options.body) }), { status: 201 }));
        } else {
            resolve(new Response(JSON.stringify({ data: `Data from ${url}` }), { status: 200 }));
        }
    }, delay));
}

// Intercepta fetch global para usar la simulación en los ejemplos
const originalFetch = window.fetch;
window.fetch = (url, options) => simulateApiCall(url, options);

// Ejemplo 1: Petición GET simple y manejo de respuesta/error
console.log("--- Petición GET con Fetch y manejo de errores ---");
async function getResource(url) {
    try {
        console.log(`Petición GET a: ${url}`);
        const response = await fetch(url);

        if (!response.ok) {
            const errorBody = await response.json(); // Intentar leer el cuerpo del error si es JSON
            throw new Error(`HTTP Error! Status: ${response.status}. Message: ${errorBody.message || response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos obtenidos:', data);
        return data;
    } catch (error) {
        console.error('Error durante la petición GET:', error.message);
        // Opcional: relanzar el error o devolver un valor por defecto
        throw error;
    }
}

getResource('https://api.example.com/users/1');
getResource('https://api.example.com/error/resource'); // Simular un error

// Ejemplo 2: Petición POST para crear un recurso
console.log("\n--- Petición POST con Fetch ---");
async function postResource(url, payload) {
    try {
        console.log(`Petición POST a: ${url} con payload:`, payload);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`HTTP Error! Status: ${response.status}. Message: ${errorBody.message || response.statusText}`);
        }

        const newResource = await response.json();
        console.log('Recurso creado exitosamente:', newResource);
        return newResource;
    } catch (error) {
        console.error('Error durante la petición POST:', error.message);
        throw error;
    }
}

postResource('https://api.example.com/posts', { title: 'Nuevo Post', content: 'Contenido interesante' });

// Restaurar fetch original después de los ejemplos
window.fetch = originalFetch;
```

---


### Ejercicios de Consolidación

1.  **Ejercicio: Petición `GET` a una API Pública y Renderizado Simple**
    Realice una petición `GET` a la API pública de JSONPlaceholder para obtener una lista de publicaciones (`https://jsonplaceholder.typicode.com/posts`). Use `async/await` con `fetch`. Luego, renderice los títulos de las primeras 5 publicaciones en una lista `<ul>` en el DOM.

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Posts API</title>
    </head>
    <body>
        <h1>Publicaciones Recientes</h1>
        <ul id="postsList">
            <!-- Los posts se cargarán aquí -->
        </ul>

        <script>
            async function obtenerYRenderizarPosts() {
                // Su código aquí
            }

            obtenerYRenderizarPosts();
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Petición GET a una API Pública y Renderizado Simple

    async function obtenerYRenderizarPosts() {
        const postsList = document.getElementById('postsList');
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const posts = await response.json();

            // Renderizar los primeros 5 posts
            posts.slice(0, 5).forEach(post => {
                const li = document.createElement('li');
                li.textContent = post.title;
                postsList.appendChild(li);
            });
        } catch (error) {
            console.error('Error al obtener o renderizar posts:', error.message);
            const liError = document.createElement('li');
            liError.textContent = `Error: ${error.message}`;
            postsList.appendChild(liError);
        }
    }

    obtenerYRenderizarPosts();
    ```

2.  **Ejercicio: Envío de Formulario `POST` con `fetch` y `FormData`**
    Cree un formulario HTML con dos campos de texto (nombre y mensaje) y un botón de envío. Al enviar el formulario, intercepte el evento `submit` con JavaScript. En lugar de enviar el formulario tradicionalmente, use `fetch` para enviar los datos del formulario como una petición `POST` a una API de prueba (`https://jsonplaceholder.typicode.com/posts`). Muestre la respuesta del servidor en la consola.

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Enviar Formulario con Fetch</title>
    </head>
    <body>
        <h1>Contacta con Nosotros</h1>
        <form id="contactForm">
            <label for="name">Nombre:</label><br>
            <input type="text" id="name" name="name" required><br><br>

            <label for="message">Mensaje:</label><br>
            <textarea id="message" name="message" rows="4" required></textarea><br><br>

            <button type="submit">Enviar Mensaje</button>
        </form>

        <script>
            const contactForm = document.getElementById('contactForm');

            contactForm.addEventListener('submit', async (event) => {
                // Su código aquí
            });
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Envío de Formulario `POST` con `fetch` y `FormData`

    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evitar el envío por defecto del formulario

        const formData = new FormData(contactForm); // Recolecta todos los datos del formulario
        const data = Object.fromEntries(formData.entries()); // Convierte FormData a objeto JS simple

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Indicamos que el cuerpo es JSON
                },
                body: JSON.stringify(data) // El cuerpo debe ser una cadena JSON
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const resultado = await response.json();
            console.log("Formulario enviado. Respuesta del servidor:", resultado);
            alert("Mensaje enviado con éxito!");
            contactForm.reset(); // Limpiar el formulario
        } catch (error) {
            console.error("Error al enviar el formulario:", error.message);
            alert(`Error al enviar el mensaje: ${error.message}`);
        }
    });
    ```

---


### Glosario Técnico

*   **`Fetch` API**: Interfaz moderna basada en Promesas para realizar peticiones de red (HTTP) en JavaScript.
*   **Petición HTTP**: Solicitud de un cliente a un servidor web para obtener o enviar recursos.
*   **`fetch(url, options)`**: Función global para iniciar una petición. `url` es la dirección, `options` es un objeto de configuración.
*   **`Response` Objeto**: Objeto devuelto por `fetch` que contiene información sobre la respuesta HTTP del servidor.
*   **`response.ok`**: Propiedad booleana del objeto `Response` que indica si la petición fue exitosa (código de estado 200-299).
*   **`response.status`**: Código de estado HTTP de la respuesta (ej. 200, 404, 500).
*   **`response.json()`**: Método del objeto `Response` que devuelve una Promesa que se resuelve con el cuerpo de la respuesta parseado como JSON.
*   **`response.text()`**: Método del objeto `Response` que devuelve una Promesa que se resuelve con el cuerpo de la respuesta como texto plano.
*   **Método HTTP**: El tipo de operación que se desea realizar sobre un recurso (ej. GET, POST, PUT, DELETE).
*   **`Headers`**: Un objeto que representa los encabezados de la petición o respuesta HTTP.
*   **`Content-Type`**: Encabezado HTTP que indica el tipo de medio del recurso (ej. `application/json`, `text/html`).
*   **`Authorization`**: Encabezado HTTP utilizado para enviar credenciales de autenticación.
*   **`body`**: El cuerpo de la petición HTTP, utilizado para enviar datos al servidor (ej. con métodos POST, PUT).
*   **`JSON.stringify()`**: Convierte un objeto JavaScript a una cadena JSON, necesaria para el `body` de muchas peticiones `POST/PUT`.
*   **`FormData`**: Interfaz que facilita la construcción de un conjunto de pares clave-valor que representan campos de formulario y sus valores, incluyendo archivos. Útil para enviar datos de formularios.
*   **API REST**: (Representational State Transfer) Un estilo arquitectónico para sistemas distribuidos, a menudo implementado sobre HTTP. Define un conjunto de restricciones sobre cómo los recursos web se crean, leen, actualizan y eliminan.
*   **`XMLHttpRequest` (XHR)**: La API más antigua para realizar peticiones HTTP en JavaScript, predecesora de `Fetch`.
*   **Error de Red**: Problema que impide la comunicación con el servidor (ej. desconexión, dominio no encontrado), lo que hace que `fetch` rechace su promesa.
*   **Error HTTP**: Una respuesta del servidor con un código de estado en el rango 4xx o 5xx, indicando que la petición se recibió pero no se pudo completar con éxito a nivel de aplicación (ej. 404 Not Found, 500 Internal Server Error). `fetch` *no* rechaza su promesa para estos errores.
