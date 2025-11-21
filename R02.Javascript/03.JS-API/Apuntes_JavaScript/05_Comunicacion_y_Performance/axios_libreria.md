# Módulo 05: Comunicación, Performance y Patrones

## Tema 5.2: Abstracciones con Librerías Externas: El caso de `Axios`

### Clase: Simplificando las Peticiones HTTP con Librerías Especializadas

Mientras que la `Fetch` API es la interfaz estándar y nativa de JavaScript para realizar peticiones HTTP, su uso directo puede requerir cierto código repetitivo para tareas comunes como el manejo de errores HTTP, la serialización/deserialización de JSON, la adición de encabezados por defecto o la gestión de cancelaciones. Aquí es donde entran en juego las **librerías de abstracción HTTP**, como **Axios**. Axios proporciona una API más robusta, concisa y rica en funcionalidades sobre `XMLHttpRequest` (en navegadores) o el módulo `http` de Node.js, y también puede integrar la `Fetch` API. Su popularidad radica en cómo simplifica y estandariza el manejo de las peticiones de red.

#### Introducción a Axios

**Axios** es una librería cliente HTTP basada en promesas para el navegador y Node.js. Es isomorfa, lo que significa que puedes usar el mismo código tanto en el frontend como en el backend.

##### Características Principales de Axios:

*   **API Basada en Promesas**: Al igual que `Fetch`, Axios utiliza promesas, lo que facilita el encadenamiento y el manejo asíncrono.
*   **Manejo Automático de Errores HTTP**: Por defecto, Axios rechaza automáticamente las promesas para respuestas con códigos de estado 4xx y 5xx. Esto es una diferencia clave con `Fetch`, donde se debe verificar `response.ok` manualmente.
*   **Transformación Automática de Datos JSON**: Serializa objetos JavaScript a JSON en las peticiones (`POST`, `PUT`) y deserializa automáticamente las respuestas JSON.
*   **Interceptores de Petición y Respuesta**: Permite interceptar peticiones o respuestas antes de que sean manejadas por `.then()` o `.catch()`. Útil para añadir tokens de autenticación, registrar errores, etc.
*   **Cancelación de Peticiones**: Permite cancelar peticiones HTTP.
*   **Protección XSRF/CSRF**: Soporte integrado para la protección contra Cross-Site Request Forgery.

#### Instalación de Axios

En entornos de navegador, se puede incluir a través de un CDN o instalarlo con un gestor de paquetes como npm o yarn.

```html
<!-- Via CDN -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

```bash
# Via npm
npm install axios

# Via yarn
yarn add axios
```

#### Realizando Peticiones Básicas con Axios

##### Peticiones `GET`

```javascript
axios.get('https://api.example.com/users')
    .then(response => {
        // response.data contiene los datos parseados (si es JSON)
        console.log(response.data);
    })
    .catch(error => {
        // Captura automáticamente errores de red y respuestas 4xx/5xx
        console.error('Error al obtener usuarios:', error);
    });
```

##### Peticiones `POST`

```javascript
axios.post('https://api.example.com/users', {
        firstName: 'Fred',
        lastName: 'Flintstone'
    })
    .then(response => {
        console.log('Usuario creado:', response.data);
    })
    .catch(error => {
        console.error('Error al crear usuario:', error);
    });
```

#### La Estructura del Objeto de Respuesta de Axios

Cuando una promesa de Axios se resuelve, el objeto `response` que devuelve contiene:

*   `response.data`: La respuesta proporcionada por el servidor.
*   `response.status`: El código de estado HTTP de la respuesta.
*   `response.statusText`: El mensaje de estado HTTP.
*   `response.headers`: Los encabezados HTTP de la respuesta.
*   `response.config`: La configuración que se usó para la petición.
*   `response.request`: El objeto `XMLHttpRequest` (en navegador) o `ClientRequest` (en Node.js).

#### Configuración Global e Instancias de Axios

Para configuraciones que se aplican a múltiples peticiones (como una `baseURL` o encabezados de autenticación), Axios permite:

1.  **Configuración global**: `axios.defaults.baseURL = 'https://api.example.com';`
2.  **Crear instancias personalizadas**: Ideal para interactuar con diferentes APIs o para agrupar configuraciones específicas.

```javascript
// Creación de una instancia de Axios (como en su código)
const auth = "Bearer YOUR_TOKEN"; // Token de autenticación
const options = {
    baseURL: "https://api.themoviedb.org/3/", // Base URL para todas las peticiones de esta instancia
    headers: {
        accept: "application/json",
        Authorization: auth, // Encabezado de autenticación por defecto
    },
    timeout: 10000, // Timeout para las peticiones
};
const api = axios.create(options); // 'api' es ahora una instancia de Axios

// Usando la instancia 'api'
api.get('trending/movie/day')
    .then(response => console.log(response.data));
```

#### Interceptores de Axios

Los interceptores permiten ejecutar código antes de que una petición sea enviada o antes de que una respuesta sea manejada por `.then()` o `.catch()`.

##### Interceptores de Petición:

```javascript
api.interceptors.request.use(config => {
    // Aquí puedes modificar la configuración de la petición
    // Ej: añadir un token de autenticación si aún no está presente
    if (!config.headers.Authorization) {
        config.headers.Authorization = 'Bearer nuevo_token_dinamico';
    }
    console.log('Petición enviada:', config.url);
    return config;
}, error => {
    // Manejar errores de petición
    return Promise.reject(error);
});
```

##### Interceptores de Respuesta:

```javascript
api.interceptors.response.use(response => {
    // Aquí puedes modificar la respuesta
    // Ej: normalizar la estructura de los datos
    console.log('Respuesta recibida:', response.status);
    return response;
}, error => {
    // Manejar errores de respuesta (4xx, 5xx, errores de red)
    if (error.response && error.response.status === 401) {
        console.error('Token expirado o no autorizado');
        // Redirigir a login, refrescar token, etc.
    }
    return Promise.reject(error);
});
```

#### Axios en su Código

Sus archivos `12.Api-Rest-1/clase07/index.js`, `13.Api-Rest-2/src/js/main.js` y `14.Api-Rest-3/App/src/main.js` demuestran un uso avanzado y correcto de Axios, incluyendo:

*   **Creación de instancias de Axios**: Para la API de gatos (`thecatapi.com`) y la API de películas (`themoviedb.org`), con `baseURL` y `headers` (incluyendo `x-api-key` o `Authorization`).
*   **Uso de `async/await` con Axios**: La forma preferida y más legible de manejar las promesas de Axios.
*   **Manejo de errores con `try...catch`**: Capturando los rechazos de Axios de forma estructurada.
*   **Métodos HTTP**: Uso de `api.get()`, `api.post()`, `api.delete()`.
*   **Envío de `FormData`**: Para subir archivos (`uploadMichiPhoto` en `clase07`).

```javascript
// Desde su código (ejemplo de 12.Api-Rest-1/clase07/index.js)
const options = {
    baseURL: "https://api.thecatapi.com/v1/",
    headers: { "X-Custom-Header": "foobar", "x-api-key": API_KEY },
    timeout: 10000,
};
const api = axios.create(options);

async function loadRandomMichis() {
    try {
        const resAxios = await api.get("/images/search?limit=3"); // Axios rechaza si status >= 400
        const { data, status } = resAxios; // Desestructuración del objeto de respuesta de Axios
        // ...
    } catch (error) {
        console.log("error : ", error); // error.response si es un error HTTP
        spanError.innerHTML = "error al consultar la API" + error.response.status; // Acceso al status del error
    }
}
```

---

### Ejemplos Ampliados y Corregidos

```javascript
// Simulación de un servidor API con Axios Mocks (para un entorno real, usaría un servidor real)
// npm install axios-mock-adapter
// import MockAdapter from 'axios-mock-adapter';
// const mock = new MockAdapter(axios);

// mock.onGet('https://mi-api.com/recurso').reply(200, { message: 'Datos mockeados' });
// mock.onPost('https://mi-api.com/login').reply(200, { token: 'abc123def' });
// mock.onGet('https://mi-api.com/protegido').reply(config => {
//     if (config.headers.Authorization === 'Bearer valido') {
//         return [200, { secret: 'Shhh!' }];
//     }
//     return [401, { message: 'Unauthorized' }];
// });

// Para los ejemplos, usaremos la configuración de su código, simulando thecatapi.com
const API_KEY = "dummy_api_key_for_example";
const catApi = axios.create({
    baseURL: "https://api.thecatapi.com/v1/",
    headers: { "x-api-key": API_KEY },
    timeout: 5000,
});

// Ejemplo 1: GET con Axios y manejo de errores automático
console.log("--- Axios GET y manejo de errores ---");
async function getCatImages() {
    try {
        console.log("Obteniendo imágenes de gatos...");
        const response = await catApi.get('/images/search?limit=2');
        console.log('Imágenes de gatos:', response.data.map(img => img.url));
        console.log('Status:', response.status);
    } catch (error) {
        console.error('Error al obtener imágenes de gatos:', error.message);
        if (error.response) {
            // El servidor respondió con un status fuera del rango 2xx
            console.error('Detalles del error (Axios):', error.response.status, error.response.data);
        } else if (error.request) {
            // La petición se hizo pero no se recibió respuesta
            console.error('No se recibió respuesta del servidor.');
        } else {
            // Algo más causó el error
            console.error('Error de configuración de la petición.');
        }
    }
}
getCatImages();

// Simular un endpoint que causa un error 400 (para Axios, esto es un rechazo)
catApi.interceptors.response.use(res => res, err => {
    if (err.config.url.includes('/error')) {
        return Promise.reject({ response: { status: 400, data: { message: 'Bad Request simulated' } } });
    }
    return Promise.reject(err);
});
async function getErrorExample() {
    try {
        console.log("\nObteniendo de endpoint que falla...");
        const response = await catApi.get('/error/endpoint');
        console.log(response.data);
    } catch (error) {
        console.error('Error en el endpoint:', error.response.status, error.response.data.message);
    }
}
getErrorExample();

// Ejemplo 2: Interceptores para añadir un token de autenticación
console.log("\n--- Interceptores de Petición ---");

// Añadir un interceptor a una nueva instancia para no afectar la anterior
const secureApi = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    timeout: 5000,
});

secureApi.interceptors.request.use(config => {
    // Si la configuración no tiene encabezado de autorización, lo añade
    if (!config.headers.Authorization) {
        const token = "Bearer EYJ_YOUR_MOVIE_DB_TOKEN"; // Obtener esto de localStorage o de donde sea
        config.headers.Authorization = token;
        console.log('Interceptor: Token de autorización añadido a la petición.');
    }
    return config;
}, error => {
    return Promise.reject(error);
});

async function getProtectedMovieData() {
    try {
        console.log("Obteniendo datos protegidos de películas...");
        const response = await secureApi.get('/movie/popular');
        console.log('Películas populares (parte):', response.data.results.slice(0, 2));
    } catch (error) {
        console.error('Error al obtener datos protegidos:', error.message);
        if (error.response && error.response.status === 401) {
            console.error('Interceptor de Respuesta: Token inválido o expirado. ¡Redirigir a login!');
        }
    }
}
getProtectedMovieData();
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Subida de Archivo con Axios y `FormData`**
    Adapte la función `uploadMichiPhoto` de su `clase07/index.js` para que utilice Axios en lugar de Fetch. Asegúrese de que el `FormData` se envíe correctamente y que el manejo de la respuesta (`data.id`) y errores sea adecuado. Simule la subida de un archivo.

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Subir Archivo con Axios</title>
    </head>
    <body>
        <h1>Subir Foto de Michi</h1>
        <form id="uploadingForm">
            <input type="file" id="fileInput" name="file" accept="image/*">
            <button type="submit">Subir</button>
        </form>
        <p id="uploadStatus"></p>

        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script>
            const API_KEY = "live_YOUR_CAT_API_KEY"; // Reemplaza con tu clave real
            const catApi = axios.create({
                baseURL: "https://api.thecatapi.com/v1/",
                headers: { "x-api-key": API_KEY },
            });

            const uploadingForm = document.getElementById('uploadingForm');
            const uploadStatus = document.getElementById('uploadStatus');

            async function uploadMichiPhoto() {
                // Su código aquí
            }

            uploadingForm.addEventListener('submit', async (event) => {
                event.preventDefault(); // Evitar el envío por defecto
                await uploadMichiPhoto();
            });
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Subida de Archivo con Axios y `FormData`

    const API_KEY = "live_YOUR_CAT_API_KEY"; // Reemplaza con tu clave real
    const catApi = axios.create({
        baseURL: "https://api.thecatapi.com/v1/",
        headers: { "x-api-key": API_KEY },
    });

    const uploadingForm = document.getElementById('uploadingForm');
    const uploadStatus = document.getElementById('uploadStatus');

    // Simulación de la respuesta de la API para la subida
    catApi.interceptors.request.use(config => {
        if (config.url === '/images/upload' && config.method === 'post') {
            console.log("Simulando subida de archivo...");
            uploadStatus.textContent = "Subiendo archivo...";
            return Promise.reject({
                response: {
                    status: 200,
                    data: { id: 'mock_img_id', url: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Uploaded' }
                }
            }); // Rechaza para que el catch lo capture, luego lo reescribe como éxito
        }
        return config;
    });

    catApi.interceptors.response.use(res => res, err => {
        if (err.response && err.response.config.url === '/images/upload' && err.response.status === 200) {
            // Esto es la respuesta mockeada del interceptor de request
            return Promise.resolve(err.response);
        }
        return Promise.reject(err);
    });

    async function uploadMichiPhoto() {
        console.group("uploadMichiPhoto");
        try {
            uploadStatus.textContent = "Iniciando subida...";
            const form = document.getElementById("uploadingForm");
            const formData = new FormData(form);

            // Axios automáticamente configura Content-Type para FormData
            const resAxios = await catApi.post(`/images/upload`, formData);
            const { data, status } = resAxios;

            console.log("Respuesta de subida:", resAxios);
            console.log("Datos de imagen:", data);
            console.log("Estado:", status);

            uploadStatus.textContent = `Archivo subido con éxito. ID: ${data.id}`;
            // Aquí se podría llamar a saveFavoriteMichi(data.id) o loadRandomMichis()
            console.log("Imagen subida ID:", data.id);
        } catch (error) {
            console.error("Error al subir archivo:", error);
            uploadStatus.textContent = `Error al subir archivo: ${error.message}`;
            if (error.response) {
                console.error("Detalles del error:", error.response.status, error.response.data);
                uploadStatus.textContent += ` (${error.response.status})`;
            }
        } finally {
            console.groupEnd();
        }
    }

    uploadingForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        await uploadMichiPhoto();
    });
    ```

2.  **Ejercicio: Cancelación de Peticiones con Axios**
    Cree una función `buscarPeliculasCancelable(query)` que realice una búsqueda de películas. La función debe devolver un objeto con la promesa de la petición y una función `cancelar()`. Si se llama a `cancelar()` antes de que la petición termine, esta debe ser abortada.

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Búsqueda Cancelable</title>
    </head>
    <body>
        <h1>Búsqueda de Películas Cancelable</h1>
        <input type="text" id="searchInput" placeholder="Buscar películas...">
        <button id="searchBtn">Buscar</button>
        <button id="cancelBtn">Cancelar Búsqueda</button>
        <div id="results"></div>

        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script>
            const TMDB_API_KEY = "TU_API_KEY_TMDB"; // Reemplaza con tu clave real
            const movieApi = axios.create({
                baseURL: "https://api.themoviedb.org/3/",
                headers: { "Authorization": `Bearer ${TMDB_API_KEY}` },
            });

            const searchInput = document.getElementById('searchInput');
            const searchBtn = document.getElementById('searchBtn');
            const cancelBtn = document.getElementById('cancelBtn');
            const resultsDiv = document.getElementById('results');

            let currentCancellationSource = null; // Para guardar el token de cancelación actual

            async function buscarPeliculasCancelable(query) {
                // Su código aquí
            }

            searchBtn.addEventListener('click', async () => {
                // Su código aquí para iniciar la búsqueda
            });

            cancelBtn.addEventListener('click', () => {
                // Su código aquí para cancelar la búsqueda
            });
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Cancelación de Peticiones con Axios

    const TMDB_API_KEY = "TU_API_KEY_TMDB"; // Reemplaza con tu clave real
    const movieApi = axios.create({
        baseURL: "https://api.themoviedb.org/3/",
        headers: { "Authorization": `Bearer ${TMDB_API_KEY}` },
    });

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const resultsDiv = document.getElementById('results');

    let currentCancellationSource = null; // Para guardar el token de cancelación actual

    async function buscarPeliculasCancelable(query) {
        // Crear un nuevo token de cancelación para esta petición
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        currentCancellationSource = source; // Guardar para poder cancelar externamente

        resultsDiv.textContent = 'Buscando...';

        try {
            const response = await movieApi.get('/search/movie', {
                params: { query },
                cancelToken: source.token // Adjuntar el token de cancelación a la petición
            });
            return response.data.results;
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Petición cancelada:', error.message);
                resultsDiv.textContent = 'Búsqueda cancelada.';
            } else {
                console.error('Error en la búsqueda de películas:', error);
                resultsDiv.textContent = 'Error al buscar películas.';
            }
            throw error; // Relanzar el error para que el llamador lo maneje si es necesario
        } finally {
            currentCancellationSource = null; // Limpiar el token una vez finalizada (o cancelada) la petición
        }
    }

    searchBtn.addEventListener('click', async () => {
        // Si ya hay una petición en curso, cancelarla antes de iniciar una nueva
        if (currentCancellationSource) {
            currentCancellationSource.cancel('Nueva búsqueda iniciada, cancelando anterior.');
        }

        const query = searchInput.value.trim();
        if (!query) {
            resultsDiv.textContent = 'Por favor, introduce un término de búsqueda.';
            return;
        }

        try {
            const peliculas = await buscarPeliculasCancelable(query);
            resultsDiv.innerHTML = '';
            if (peliculas.length > 0) {
                const ul = document.createElement('ul');
                peliculas.slice(0, 5).forEach(pelicula => { // Mostrar solo 5 resultados
                    const li = document.createElement('li');
                    li.textContent = pelicula.title;
                    ul.appendChild(li);
                });
                resultsDiv.appendChild(ul);
            } else {
                resultsDiv.textContent = 'No se encontraron películas.';
            }
        } catch (error) {
            // El catch interno de buscarPeliculasCancelable ya maneja el mensaje en resultsDiv
        }
    });

    cancelBtn.addEventListener('click', () => {
        if (currentCancellationSource) {
            currentCancellationSource.cancel('Búsqueda cancelada por el usuario.');
        } else {
            resultsDiv.textContent = 'No hay búsqueda en curso para cancelar.';
        }
    });
    ```

---

### Glosario Técnico

*   **Axios**: Librería cliente HTTP basada en promesas para navegador y Node.js, que simplifica las peticiones HTTP.
*   **Instancia de Axios**: Objeto creado con `axios.create()` que permite definir una configuración base para un conjunto de peticiones.
*   **`baseURL`**: Propiedad de configuración para Axios que define la URL base para todas las peticiones de una instancia.
*   **Encabezados HTTP (`headers`)**: Metadatos enviados con la petición HTTP (ej. `Content-Type`, `Authorization`).
*   **`timeout`**: Configuración para especificar el tiempo máximo de espera para una respuesta de la petición.
*   **`response.data`**: La propiedad del objeto de respuesta de Axios que contiene los datos de la respuesta del servidor (automáticamente parseados si son JSON).
*   **Interceptores de Petición**: Funciones que Axios ejecuta antes de que una petición sea enviada al servidor.
*   **Interceptores de Respuesta**: Funciones que Axios ejecuta antes de que una respuesta sea devuelta a `.then()` o `.catch()`.
*   **`FormData`**: Objeto que representa un conjunto de pares clave-valor que pueden ser enviados con una petición HTTP, comúnmente usado para formularios o subida de archivos.
*   **Cancelación de Peticiones**: Funcionalidad para abortar una petición HTTP en curso. En Axios, se implementa con `CancelToken.source()`.
*   **`axios.isCancel()`**: Función de Axios para verificar si un error es debido a una cancelación de petición.
*   **XSRF/CSRF (Cross-Site Request Forgery)**: Tipo de ataque web donde se engaña a un usuario para que ejecute acciones no deseadas en una aplicación web en la que está autenticado. Axios tiene protección integrada.
*   **Isomorfa**: Que el código puede ejecutarse tanto en el lado del cliente (navegador) como en el lado del servidor (Node.js).
*   **`XMLHttpRequest` (XHR)**: Objeto API más antiguo en el navegador para hacer peticiones HTTP asíncronas. Axios se basa en XHR en el navegador.

```