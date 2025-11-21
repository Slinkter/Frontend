# Módulo 05: Comunicación, Performance y Patrones

## Tema 5.3: Patrones de Interacción con APIs REST (Autenticación, Métodos)

### Clase: Estrategias para una Comunicación Eficiente y Segura con Servicios Web

Las **APIs REST (Representational State Transfer)** se han consolidado como el estándar de facto para la comunicación entre clientes (navegadores, aplicaciones móviles) y servidores. Comprender los principios de REST, los métodos HTTP adecuados y las estrategias de autenticación y autorización es fundamental para construir aplicaciones modernas que interactúen eficazmente con servicios web. Este tema profundiza en los patrones de interacción con APIs REST, utilizando herramientas como `Fetch` o `Axios`, y cómo aplicar la seguridad básica.

#### Principios de REST

REST no es un protocolo, sino un estilo arquitectónico que se basa en el protocolo HTTP. Se define por un conjunto de restricciones clave:

1.  **Client-Server**: Separación de la lógica del cliente y del servidor. El cliente se encarga de la interfaz de usuario, el servidor de la lógica de negocio y el almacenamiento de datos.
2.  **Stateless (Sin Estado)**: Cada petición del cliente al servidor debe contener toda la información necesaria para que el servidor la entienda y la procese. El servidor no debe guardar ningún contexto del cliente entre peticiones. Esto mejora la escalabilidad.
3.  **Cacheable**: Las respuestas pueden declararse como cacheables o no cacheables para mejorar el rendimiento del cliente y la escalabilidad del servidor.
4.  **Layered System (Sistema en Capas)**: Un cliente puede no saber si está conectado directamente al servidor final o a un intermediario (proxy, balanceador de carga).
5.  **Uniform Interface (Interfaz Uniforme)**: La clave de REST. Simplifica la arquitectura y mejora la visibilidad de las interacciones. Incluye:
    *   **Identificación de Recursos**: Cada recurso es identificado por una URL única (ej. `/usuarios`, `/usuarios/123`, `/productos/XYZ`).
    *   **Manipulación de Recursos a través de Representaciones**: Los clientes manipulan los recursos enviando y recibiendo representaciones (ej. JSON, XML).
    *   **Mensajes Autodescriptivos**: Cada mensaje HTTP (petición o respuesta) debe contener suficiente información para que el receptor entienda cómo procesarlo.
    *   **HATEOAS (Hypermedia As The Engine Of Application State)**: Los clientes interactúan con la aplicación a través de hypermedia proporcionada por el servidor (ej. enlaces en las respuestas JSON). Menos común en el uso de APIs frontend/backend.

#### Métodos HTTP y Operaciones CRUD

Los métodos HTTP (o verbos HTTP) son las acciones que un cliente desea realizar sobre un recurso. En REST, estos métodos se mapean directamente a las operaciones **CRUD (Create, Read, Update, Delete)**.

*   **`GET` (READ)**:
    *   Recupera una representación de un recurso o una lista de recursos.
    *   Debe ser idempotente (múltiples peticiones GET idénticas tienen el mismo efecto que una sola) y seguro (no cambia el estado del servidor).
    *   Ej: `GET /usuarios`, `GET /usuarios/123`.

*   **`POST` (CREATE)**:
    *   Crea un nuevo recurso en el servidor.
    *   No es idempotente (múltiples peticiones POST idénticas pueden crear múltiples recursos).
    *   Los datos se envían en el cuerpo de la petición.
    *   Ej: `POST /usuarios` (con datos del nuevo usuario en el cuerpo).

*   **`PUT` (UPDATE/REPLACE)**:
    *   Actualiza un recurso existente con una nueva representación completa. Si el recurso no existe, puede crearlo.
    *   Es idempotente (si se envía dos veces la misma petición PUT, el recurso resultante es el mismo).
    *   Ej: `PUT /usuarios/123` (con la representación completa y actualizada del usuario 123).

*   **`PATCH` (UPDATE/MODIFY)**:
    *   Actualiza parcialmente un recurso existente. Solo se envían los cambios, no la representación completa.
    *   No es idempotente por defecto.
    *   Ej: `PATCH /usuarios/123` (con solo el campo `email` actualizado).

*   **`DELETE` (DELETE)**:
    *   Elimina un recurso especificado.
    *   Es idempotente.
    *   Ej: `DELETE /usuarios/123`.

#### Autenticación y Autorización en APIs REST

La seguridad es primordial. Se necesita verificar la identidad del cliente (**Autenticación**) y determinar si el cliente tiene permiso para realizar una acción o acceder a un recurso (**Autorización**).

##### 1. Basada en Tokens (Bearer Tokens)

Es el método más común para APIs REST modernas, especialmente con JWT (JSON Web Tokens).

*   **Proceso**:
    1.  El cliente envía credenciales (ej. usuario/contraseña) a un endpoint de login (`POST /login`).
    2.  El servidor autentica y, si es exitoso, devuelve un token (JWT).
    3.  El cliente almacena este token (ej. en `localStorage`, `sessionStorage` o `cookies`).
    4.  Para cada petición subsecuente a recursos protegidos, el cliente incluye el token en el encabezado `Authorization` con el prefijo `Bearer`.

*   **Encabezado `Authorization`**:
    `Authorization: Bearer <TU_TOKEN_AQUI>`

*   **Implementación en `Fetch`**:

    ```javascript
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${tuToken}`
        }
    });
    ```

*   **Implementación en `Axios`**:

    ```javascript
    const api = axios.create({
        baseURL: '...',
        headers: {
            'Authorization': `Bearer ${tuToken}`
        }
    });
    // O usando interceptores para añadirlo dinámicamente
    api.interceptors.request.use(config => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    ```
    *Su código utiliza este patrón con `Bearer eyJhbGc...` para `themoviedb.org`.*

##### 2. Claves API (API Keys)

Más simple, pero menos seguro para APIs con datos de usuario sensibles. Se usa para identificar al cliente y, a menudo, para controlar el acceso y las cuotas de uso.

*   **Proceso**: La clave API se incluye directamente en la URL como un parámetro de consulta (`?api_key=TU_CLAVE`) o en un encabezado personalizado (`X-API-KEY`).
*   **Problema**: Exponer la clave API en el frontend puede ser un riesgo si la clave tiene privilegios elevados o es fácil de robar.
*   *Su código usa `api_key` como parámetro de consulta para `thecatapi.com`.*

##### 3. Cookies

Utilizadas tradicionalmente. El servidor envía una cookie después del login, y el navegador la gestiona automáticamente en peticiones posteriores al mismo dominio.
*   **Ventaja**: El navegador se encarga de enviarlas automáticamente.
*   **Desventaja**: Vulnerables a CSRF sin protección adicional; pueden ser más complejas de gestionar en SPAs o con APIs en dominios diferentes.

#### Manejo de Errores Específicos de API

Además del manejo genérico de errores de red o HTTP (visto en temas anteriores), es importante interpretar los códigos de estado HTTP y los mensajes de error que devuelve la API.

*   **Códigos de Estado HTTP**:
    *   `2xx` (Éxito): `200 OK`, `201 Created`, `204 No Content`.
    *   `4xx` (Errores del Cliente): `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `429 Too Many Requests`.
    *   `5xx` (Errores del Servidor): `500 Internal Server Error`, `503 Service Unavailable`.
*   **Cuerpo de Error**: Muchas APIs REST devuelven un objeto JSON en el cuerpo de la respuesta con detalles adicionales sobre el error, como `{"code": 1001, "message": "Invalid credentials"}`. Siempre intente parsear este cuerpo en su bloque `catch`.

#### Envío de Datos de Formularios (`FormData`)

Cuando se trabaja con formularios HTML, especialmente aquellos que incluyen subida de archivos, el objeto **`FormData`** es muy útil. Permite construir un conjunto de pares clave-valor que representan campos de formulario de forma sencilla.

*   **Creación**: `new FormData(formElement)` o `new FormData()` y añadir pares con `append()`.
*   **Uso en `Fetch`**: Se pasa directamente como `body` sin `JSON.stringify()`. El navegador establecerá el `Content-Type` correcto (`multipart/form-data`) automáticamente.
*   **Uso en `Axios`**: También se pasa directamente como `body`. Axios lo maneja correctamente.
*   *Su código en `clase07/index.js` para `uploadMichiPhoto` utiliza `FormData` para enviar imágenes a la API de gatos.*

```javascript
// Desde su código (simplificado)
async function uploadMichiPhoto() {
    const form = document.getElementById("uploadingForm");
    const formData = new FormData(form); // Captura datos del formulario

    // Con Fetch:
    // const response = await fetch('/images/upload', {
    //     method: 'POST',
    //     body: formData // Fetch setea Content-Type por sí mismo
    // });

    // Con Axios (como en su código):
    const resAxios = await api.post(`/images/upload`, formData); // Axios también lo maneja
    // ...
}
```

---

### Ejemplos Ampliados y Corregidos

```javascript
// Simulación de una API con Axios para los ejemplos
const mockApi = axios.create({
    baseURL: 'https://mi-api-rest.com',
});

// Interceptores para simular respuestas (solo para fines de ejemplo)
mockApi.interceptors.request.use(config => {
    // Simular un retardo de red
    return new Promise(resolve => setTimeout(() => resolve(config), Math.random() * 500 + 100));
});

mockApi.interceptors.response.use(res => {
    // Simular un endpoint que siempre falla
    if (res.config.url.includes('/recurso-fallido')) {
        return Promise.reject({ response: { status: 404, data: { message: 'Recurso no encontrado simulado' } } });
    }
    // Simular autenticación fallida
    if (res.config.url.includes('/protegido') && (!res.config.headers || !res.config.headers.Authorization || res.config.headers.Authorization !== 'Bearer mi_token_valido')) {
        return Promise.reject({ response: { status: 401, data: { message: 'Token inválido' } } });
    }
    return res;
}, err => Promise.reject(err));


// Ejemplo 1: Petición GET con Bearer Token
console.log("--- GET con Bearer Token ---");
async function getProtectedData(token) {
    try {
        console.log("Intentando obtener datos protegidos...");
        const response = await mockApi.get('/protegido', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Datos protegidos:', response.data);
    } catch (error) {
        console.error('Error al obtener datos protegidos:', error.response ? error.response.status : error.message, error.response ? error.response.data.message : '');
    }
}
getProtectedData("mi_token_valido");
getProtectedData("token_invalido");

// Ejemplo 2: Petición POST para crear un usuario
console.log("\n--- POST para Crear Recurso ---");
async function createUser(userData) {
    try {
        console.log("Creando nuevo usuario:", userData);
        const response = await mockApi.post('/usuarios', userData);
        console.log('Usuario creado:', response.data);
    } catch (error) {
        console.error('Error al crear usuario:', error.response ? error.response.status : error.message, error.response ? error.response.data.message : '');
    }
}
createUser({ nombre: "Luisa", email: "luisa@example.com" });

// Ejemplo 3: Petición DELETE
console.log("\n--- DELETE para Eliminar Recurso ---");
async function deleteResource(id) {
    try {
        console.log(`Eliminando recurso con ID: ${id}`);
        // Suponemos que la API devuelve un 204 No Content para DELETE exitoso
        const response = await mockApi.delete(`/recursos/${id}`);
        console.log(`Recurso ${id} eliminado. Status: ${response.status}`);
    } catch (error) {
        console.error(`Error al eliminar recurso ${id}:`, error.response ? error.response.status : error.message);
    }
}
deleteResource(123);
deleteResource('recurso-fallido'); // Simula error 404
```

---


### Ejercicios de Consolidación

1.  **Ejercicio: Petición de Login y Almacenamiento de Token**
    Cree una función `login(username, password)` que simule una petición `POST` a un endpoint de login (`/login`).
    *   Si las credenciales son `user/pass`, la API simulará un éxito y devolverá un `token` JWT.
    *   Si las credenciales son incorrectas, la API simulará un error `401 Unauthorized`.
    *   Almacene el `token` exitoso en `localStorage`.
    *   Utilice `Axios` y `async/await`.

    ```javascript
    // Re-utilice o configure una instancia de Axios para este ejercicio
    const authApi = axios.create({
        baseURL: 'https://api-auth-ejemplo.com',
    });

    // Simular API de autenticación con interceptores
    authApi.interceptors.request.use(config => {
        if (config.url === '/login' && config.method === 'post') {
            const { username, password } = JSON.parse(config.data);
            if (username === 'user' && password === 'pass') {
                return Promise.reject({ response: { status: 200, data: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' } } });
            } else {
                return Promise.reject({ response: { status: 401, data: { message: 'Credenciales inválidas' } } });
            }
        }
        return config;
    });
    authApi.interceptors.response.use(res => res, err => {
        if (err.response && err.response.status === 200 && err.response.config.url === '/login') {
            return Promise.resolve(err.response); // Esto es para el mock del request interceptor
        }
        return Promise.reject(err);
    });

    async function login(username, password) {
        // Su código aquí
    }

    (async () => {
        console.log("\n--- Ejercicio de Login ---");
        await login('user', 'pass');
        await login('user', 'wrong_pass');
    })();
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Petición de Login y Almacenamiento de Token

    const authApi = axios.create({
        baseURL: 'https://api-auth-ejemplo.com',
    });

    // Simular API de autenticación con interceptores (como en el ejercicio)
    authApi.interceptors.request.use(config => {
        if (config.url === '/login' && config.method === 'post') {
            const { username, password } = JSON.parse(config.data);
            if (username === 'user' && password === 'pass') {
                return Promise.reject({ response: { status: 200, data: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' } } });
            } else {
                return Promise.reject({ response: { status: 401, data: { message: 'Credenciales inválidas' } } });
            }
        }
        return config;
    });
    authApi.interceptors.response.use(res => res, err => {
        if (err.response && err.response.status === 200 && err.response.config.url === '/login') {
            return Promise.resolve(err.response);
        }
        return Promise.reject(err);
    });


    async function login(username, password) {
        try {
            console.log(`Intentando login con usuario: ${username}`);
            const response = await authApi.post('/login', { username, password });
            const { token } = response.data;
            localStorage.setItem('jwt_token', token);
            console.log('Login exitoso. Token guardado:', token);
            return token;
        } catch (error) {
            console.error('Login fallido:', error.response ? error.response.data.message : error.message);
            throw error; // Relanzar el error para un manejo externo
        }
    }

    (async () => {
        console.log("\n--- Ejercicio de Login ---");
        await login('user', 'pass');
        console.log("Token en localStorage:", localStorage.getItem('jwt_token'));
        await login('user', 'wrong_pass');
    })();
    ```

2.  **Ejercicio: Obtener Recurso Protegido con Interceptor de Autenticación**
    Cree una nueva instancia de Axios (`protectedApi`). Configure un interceptor de petición que añada automáticamente el token JWT (obtenido del `localStorage`) al encabezado `Authorization` para cada petición. Luego, intente obtener un recurso protegido (`/profile`).

    ```javascript
    // Re-utilice el token de localStorage del ejercicio anterior
    // const token = localStorage.getItem('jwt_token');

    const protectedApi = axios.create({
        baseURL: 'https://api-auth-ejemplo.com',
    });

    // Simular API de perfil
    protectedApi.interceptors.request.use(config => {
        if (config.url === '/profile' && config.method === 'get') {
            if (config.headers.Authorization === `Bearer ${localStorage.getItem('jwt_token')}`) {
                return Promise.reject({ response: { status: 200, data: { id: 1, nombre: 'Usuario Protegido' } } });
            } else {
                return Promise.reject({ response: { status: 401, data: { message: 'Acceso no autorizado al perfil' } } });
            }
        }
        return config;
    });
    protectedApi.interceptors.response.use(res => res, err => {
        if (err.response && err.response.status === 200 && err.response.config.url === '/profile') {
            return Promise.resolve(err.response);
        }
        return Promise.reject(err);
    });

    // Añada el interceptor aquí
    // Su código aquí para el interceptor

    async function getProfile() {
        // Su código aquí para la petición
    }

    (async () => {
        console.log("\n--- Ejercicio: Recurso Protegido ---");
        // Asegúrese de que haya un token válido en localStorage para esta prueba
        // localStorage.setItem('jwt_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
        await getProfile();
        localStorage.removeItem('jwt_token'); // Limpiar el token para la siguiente prueba
        await getProfile(); // Debería fallar sin token
    })();
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Obtener Recurso Protegido con Interceptor de Autenticación

    const protectedApi = axios.create({
        baseURL: 'https://api-auth-ejemplo.com',
    });

    // Simular API de perfil con interceptores (como en el ejercicio)
    protectedApi.interceptors.request.use(config => {
        if (config.url === '/profile' && config.method === 'get') {
            if (config.headers.Authorization === `Bearer ${localStorage.getItem('jwt_token')}`) {
                return Promise.reject({ response: { status: 200, data: { id: 1, nombre: 'Usuario Protegido' } } });
            } else {
                return Promise.reject({ response: { status: 401, data: { message: 'Acceso no autorizado al perfil' } } });
            }
        }
        return config;
    });
    protectedApi.interceptors.response.use(res => res, err => {
        if (err.response && err.response.status === 200 && err.response.config.url === '/profile') {
            return Promise.resolve(err.response);
        }
        return Promise.reject(err);
    });

    // Añada el interceptor aquí
    protectedApi.interceptors.request.use(config => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Interceptor: Añadiendo token para:', config.url);
        return config;
    }, error => {
        return Promise.reject(error);
    });

    async function getProfile() {
        try {
            console.log('Intentando obtener perfil...');
            const response = await protectedApi.get('/profile');
            console.log('Perfil obtenido:', response.data);
        } catch (error) {
            console.error('Error al obtener perfil:', error.response ? error.response.data.message : error.message);
        }
    }

    (async () => {
        console.log("\n--- Ejercicio: Recurso Protegido ---");
        // Asegúrese de que haya un token válido en localStorage para esta prueba
        localStorage.setItem('jwt_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
        await getProfile();
        localStorage.removeItem('jwt_token'); // Limpiar el token para la siguiente prueba
        await getProfile(); // Debería fallar sin token
    })();
    ```

---

### Glosario Técnico

*   **API REST (Representational State Transfer)**: Estilo arquitectónico para construir servicios web distribuidos, basado en los principios de HTTP.
*   **CRUD**: Acrónimo de las cuatro operaciones básicas que se pueden realizar sobre los recursos de una API: Create, Read, Update, Delete.
*   **Métodos HTTP**: Verbos que indican la acción a realizar sobre un recurso (GET, POST, PUT, PATCH, DELETE).
*   **`GET`**: Recuperar datos.
*   **`POST`**: Crear un nuevo recurso.
*   **`PUT`**: Reemplazar un recurso existente.
*   **`PATCH`**: Actualizar parcialmente un recurso existente.
*   **`DELETE`**: Eliminar un recurso.
*   **Idempotente**: Una operación que produce el mismo resultado si se ejecuta una o varias veces. (GET, PUT, DELETE son idempotentes; POST no).
*   **Stateless (Sin Estado)**: Principio de REST que indica que cada petición del cliente debe ser independiente y contener toda la información necesaria.
*   **Interfaz Uniforme**: Restricción de REST que define cómo los clientes interactúan con los recursos (URLs, métodos HTTP, representaciones).
*   **Autenticación**: Proceso de verificar la identidad de un usuario o cliente.
*   **Autorización**: Proceso de determinar si un usuario autenticado tiene permiso para acceder a un recurso o realizar una acción.
*   **Token (Bearer Token)**: Cadena de caracteres que actúa como credencial de seguridad. Se envía en el encabezado `Authorization` con el prefijo "Bearer".
*   **JWT (JSON Web Token)**: Un estándar abierto (RFC 7519) que define una forma compacta y autocontenida para transmitir información de forma segura entre partes como un objeto JSON.
*   **Clave API (API Key)**: Un identificador único que se usa para autenticar una aplicación o usuario en una API.
*   **Encabezado `Authorization`**: Encabezado HTTP estándar para enviar credenciales de autenticación.
*   **`FormData`**: Objeto JavaScript para construir y enviar datos de formularios, incluyendo archivos, en peticiones HTTP.
*   **HTTP Status Codes**: Códigos numéricos de tres dígitos en las respuestas HTTP que indican el resultado de la petición (ej. 200 OK, 401 Unauthorized, 404 Not Found, 500 Internal Server Error).
*   **XSRF/CSRF (Cross-Site Request Forgery)**: Vulnerabilidad de seguridad donde un atacante puede engañar a un usuario para que envíe una petición HTTP a un sitio web vulnerable sin su conocimiento o consentimiento.
