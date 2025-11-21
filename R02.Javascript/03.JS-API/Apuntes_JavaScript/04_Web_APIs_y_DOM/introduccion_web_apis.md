# Módulo 04: El Navegador como Entorno de Ejecución

## Tema 4.1: APIs del Navegador: DOM y BOM

### Clase: La Interfase de JavaScript con el Mundo Exterior

JavaScript, por sí mismo, es un lenguaje de programación de propósito general. Sin embargo, su ubicuidad en el desarrollo web se debe a su estrecha integración con el entorno del navegador, que le proporciona un vasto conjunto de herramientas para interactuar con la página web y con el propio navegador. Estas herramientas se conocen como **Web APIs (Application Programming Interfaces)**. Las dos Web APIs más importantes y fundamentales para el desarrollo frontend son el **DOM (Document Object Model)** y el **BOM (Browser Object Model)**.

#### JavaScript y el Entorno de Ejecución

Es crucial entender que el motor de JavaScript (ej. V8 en Chrome) es solo una parte de lo que hace posible la ejecución de código en un navegador. El navegador proporciona un "entorno de ejecución" que incluye:

*   **Motor de JavaScript**: Ejecuta el código JavaScript.
*   **Web APIs**: Funcionalidades adicionales para interactuar con el entorno (DOM, `fetch`, `setTimeout`, etc.).
*   **Event Loop**: Orquesta la ejecución de código síncrono y asíncrono.
*   **Cola de Microtareas/Macrotareas**: Donde se gestionan los callbacks asíncronos.

#### Document Object Model (DOM): El Contenido de la Página

El DOM es una interfaz de programación para documentos HTML, XML y SVG. Representa la página como una estructura de objetos donde cada parte del documento (elementos, atributos, texto) es un "nodo". Permite que JavaScript acceda y manipule el contenido, la estructura y el estilo de una página web.

##### Características Clave del DOM:

*   **Representación en Árbol**: El documento se modela como un árbol de nodos, donde cada nodo es un objeto. El nodo raíz es el objeto `document`.
*   **Interfase para Manipulación**: Proporciona métodos y propiedades para:
    *   **Seleccionar Elementos**: Encontrar elementos HTML específicos (ej., por ID, clase, etiqueta).
    *   **Manipular Contenido**: Cambiar el texto, HTML interno de un elemento.
    *   **Manipular Estructura**: Crear nuevos elementos, añadir, mover o eliminar nodos.
    *   **Manipular Estilos**: Cambiar las propiedades CSS de los elementos.
    *   **Manejar Eventos**: Reaccionar a interacciones del usuario (clics, teclado) o eventos del navegador (carga de página).

##### Ejemplo de Abstracción del DOM:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Página</title>
</head>
<body>
    <h1 id="titulo">Hola, Mundo!</h1>
    <p class="parrafo">Este es un párrafo.</p>
</body>
</html>
```

El DOM representaría esto como una jerarquía de objetos:

*   `Window` (objeto global del navegador)
    *   `Document` (representa el documento HTML)
        *   `HTML`
            *   `HEAD`
                *   `META`
                *   `TITLE`
            *   `BODY`
                *   `H1` (con id="titulo", contenido "Hola, Mundo!")
                *   `P` (con class="parrafo", contenido "Este es un párrafo.")

#### Browser Object Model (BOM): El Entorno del Navegador

El BOM es una colección de objetos globales proporcionados por el navegador que permiten a JavaScript interactuar con el navegador en sí, no solo con el contenido de la página. El objeto global `window` es el objeto raíz del BOM y, de hecho, el `document` (DOM) es una propiedad del objeto `window`.

##### Objetos Clave del BOM (propiedades de `window`):

*   **`window`**: Es el objeto global en el lado del cliente (navegador). Representa la ventana del navegador y proporciona acceso a todas las funcionalidades del navegador. Todas las variables globales y funciones declaradas en el script se convierten en propiedades y métodos del objeto `window`.
*   **`navigator`**: Contiene información sobre el navegador del usuario (nombre, versión, sistema operativo, etc.).
    ```javascript
    console.log(navigator.userAgent); // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ..."
    console.log(navigator.platform); // "Win32"
    ```
*   **`screen`**: Contiene información sobre la pantalla del usuario (altura, anchura, disponibilidad de pantalla, etc.).
    ```javascript
    console.log(screen.width, screen.height); // Ancho y alto de la pantalla
    ```
*   **`location`**: Contiene información sobre la URL actual de la página y permite redirigir el navegador a una nueva URL.
    ```javascript
    console.log(location.href);     // La URL completa
    console.log(location.protocol); // "http:" o "https:"
    location.assign("https://www.google.com"); // Redirige a Google
    ```
    *En su código, `location.hash` es utilizado para implementar enrutamiento client-side sin recargar la página.*
*   **`history`**: Contiene el historial de navegación de la ventana. Permite navegar hacia atrás (`history.back()`) o hacia adelante (`history.forward()`).
    *En su código, `history.back()` se usa para el botón de retroceso.*
*   **`localStorage` y `sessionStorage`**: Permiten almacenar pares clave-valor de forma persistente o durante la sesión en el navegador. (Ver Tema 4.5).
*   **`fetch()`**: API para realizar peticiones de red (ver Tema 5.1).
*   **`setTimeout()` y `setInterval()`**: Funciones para ejecutar código después de un retardo o repetidamente.

#### La Relación entre DOM y BOM

*   El `window` es el objeto global que contiene el `document`.
*   El `window` es el "navegador", y el `document` es el "contenido" dentro de ese navegador.
*   Cualquier cosa que hagas en la página web utilizando JavaScript implica, de alguna manera, interactuar con el DOM o el BOM.

```javascript
// Accediendo al DOM a través del BOM
console.log(window.document.title); // Acceso al título de la página
```

#### Web APIs Utilizadas en su Código

En los archivos `.js` proporcionados, se observa un uso intensivo de Web APIs, entre ellas:

*   **`document.getElementById()`**: Para seleccionar elementos por su ID.
*   **`document.querySelector()` y `document.querySelectorAll()`**: Para seleccionar elementos usando selectores CSS.
*   **`element.classList.add()`, `.remove()`, `.toggle()`**: Para manipular clases CSS.
*   **`element.setAttribute()`, `.getAttribute()`**: Para manipular atributos HTML.
*   **`document.createElement()`, `element.appendChild()`**: Para crear y añadir nuevos elementos al DOM.
*   **`element.addEventListener()`**: Para registrar funciones que reaccionan a eventos (ej., `click`, `hashchange`).
*   **`location.hash`**: Para el enrutamiento client-side.
*   **`history.back()`**: Para navegar en el historial del navegador.
*   **`localStorage.setItem()`, `localStorage.getItem()`**: Para persistencia de datos.
*   **`fetch()` y `XMLHttpRequest` (o `axios` que los abstrae)**: Para peticiones de red.
*   **`IntersectionObserver`**: Para implementar lazy loading (carga perezosa).

Estos son solo algunos ejemplos, pero demuestran cómo las Web APIs son la interfaz principal entre su código JavaScript y la funcionalidad del navegador.

---

### Ejemplos Ampliados y Corregidos

```javascript
// Este bloque refleja las selecciones de elementos de sus archivos 'nodes.js'
// y su uso en 'main.js' y 'navigation.js'.

// Selección de elementos del DOM (a través del objeto document)
const headerSection = document.querySelector("#header");
const trendingPreviewSection = document.querySelector("#trendingPreview");
const categoriesPreviewSection = document.querySelector("#categoriesPreview");
const genericSection = document.querySelector("#genericList");
const movieDetailSection = document.querySelector("#movieDetail");
const likedMoviesSection = document.querySelector("#liked");

const searchForm = document.querySelector("#searchForm");
const trendingMoviesPreviewList = document.querySelector(".trendingPreview-movieList");
const categoriesPreviewList = document.querySelector(".categoriesPreview-list");
const movieDetailCategoriesList = document.querySelector("#movieDetail .categories-list");
const relatedMoviesContainer = document.querySelector(".relatedMovies-scrollContainer");
const likedMoviesListArticle = document.querySelector(".liked-movieList");

const headerTitle = document.querySelector(".header-title");
const arrowBtn = document.querySelector(".header-arrow");
const headerCategoryTitle = document.querySelector(".header-title--categoryView");

const searchFormInput = document.querySelector("#searchForm input");
const searchFormBtn = document.querySelector("#searchBtn");
const trendingBtn = document.querySelector(".trendingPreview-btn");

// Manipulación del BOM (a través del objeto window y sus propiedades)
console.log("--- Información del Navegador (BOM) ---");
console.log(`URL actual: ${window.location.href}`);
console.log(`Hash actual: ${window.location.hash}`);
console.log(`User Agent: ${window.navigator.userAgent}`);
console.log(`Plataforma: ${window.navigator.platform}`);
console.log(`Ancho de pantalla: ${window.screen.width}px`);

// Ejemplo de uso de history en un listener (su código)
/*
arrowBtn.addEventListener("click", () => {
  window.history.back(); // Navega a la página anterior en el historial del navegador
});
*/

// Ejemplo de manipulación de clases (su código)
/*
function homePage() {
  headerSection.classList.remove("header-container--long");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  // ... otras manipulaciones de clases ...
}
*/

// Ejemplo de cómo las Web APIs se utilizan para tareas asíncronas
console.log("\n--- Web APIs Asíncronas ---");
console.log("Antes de setTimeout.");
window.setTimeout(() => { // setTimeout es una Web API
    console.log("Callback de setTimeout ejecutado después de 1 segundo.");
}, 1000);
console.log("Después de setTimeout.");

// La interacción con APIs externas (fetch/axios) también es a través de Web APIs (Networking)
/*
async function getTrendingMoviesPreview() {
    const resAxios = await api.get(`trending/movie/day`); // api.get usa la Web API fetch/XMLHttpRequest internamente
    // ...
}
*/
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Manipulación de Elementos con DOM y BOM**
    Cree una función `mostrarInfoNavegador()` que:
    1.  Cree un nuevo elemento `div` en el DOM.
    2.  Añada a este `div` la información del `userAgent` del navegador, el `ancho` y `alto` de la pantalla.
    3.  Añada una clase CSS `info-box` al `div`.
    4.  Añada este `div` al `body` del documento.
    5.  Añada un botón dentro del `div` que, al hacer clic, redirija a `https://developer.mozilla.org/` (utilizando `window.location.assign`).

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Ejercicio DOM y BOM</title>
        <style>
            .info-box {
                border: 1px solid #ccc;
                padding: 10px;
                margin: 20px;
                background-color: #f9f9f9;
                font-family: sans-serif;
            }
            .info-box button {
                margin-top: 10px;
                padding: 8px 15px;
                cursor: pointer;
            }
        </style>
    </head>
    <body>
        <h1>Información del Navegador</h1>
        <!-- Aquí se añadirá el div generado por JS -->

        <script>
            function mostrarInfoNavegador() {
                // Su código aquí
            }
            mostrarInfoNavegador();
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Manipulación de Elementos con DOM y BOM

    function mostrarInfoNavegador() {
        // 1. Crear nuevo elemento div
        const infoDiv = document.createElement('div');

        // 2. Añadir información del userAgent, ancho y alto de pantalla
        infoDiv.innerHTML = `
            <p><strong>User Agent:</strong> ${navigator.userAgent}</p>
            <p><strong>Resolución de Pantalla:</strong> ${screen.width}x${screen.height}</p>
        `;

        // 3. Añadir clase CSS
        infoDiv.classList.add('info-box');

        // 4. Crear y añadir botón de redirección
        const botonRedireccion = document.createElement('button');
        botonRedireccion.textContent = "Ir a MDN Web Docs";
        botonRedireccion.addEventListener('click', () => {
            window.location.assign("https://developer.mozilla.org/");
        });
        infoDiv.appendChild(botonRedireccion);

        // 5. Añadir este div al body del documento
        document.body.appendChild(infoDiv);
    }
    mostrarInfoNavegador();
    ```

2.  **Ejercicio: Alerta Personalizada al Cargar la Página**
    Utilice el evento `DOMContentLoaded` del objeto `window` para mostrar una alerta que salude al usuario con un mensaje personalizado. La alerta debe decir: "¡Bienvenido a la página, [nombre de usuario]!". El nombre de usuario debe obtenerse de un `prompt()` que se ejecuta una única vez cuando la página se carga por primera vez. Si el usuario no introduce un nombre, debe usar "Invitado".

    ```javascript
    // Su código aquí para el evento DOMContentLoaded
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Alerta Personalizada al Cargar la Página

    window.addEventListener('DOMContentLoaded', () => {
        let nombreUsuario = prompt("Por favor, introduce tu nombre:") || "Invitado";
        alert(`¡Bienvenido a la página, ${nombreUsuario}!`);
    });
    ```

---

### Glosario Técnico

*   **Web APIs**: Interfaces de Programación de Aplicaciones proporcionadas por el entorno del navegador (o Node.js) para extender las capacidades de JavaScript.
*   **DOM (Document Object Model)**: Interfaz de programación para documentos HTML/XML/SVG, que los representa como un árbol de objetos manipulable por JavaScript.
*   **BOM (Browser Object Model)**: Conjunto de objetos proporcionados por el navegador para interactuar con el navegador en sí (ej. `window`, `navigator`, `location`, `history`).
*   **`window`**: Objeto global del navegador, raíz del BOM.
*   **`document`**: Objeto que representa el documento HTML cargado, raíz del DOM.
*   **`navigator`**: Objeto BOM con información sobre el navegador.
*   **`screen`**: Objeto BOM con información sobre la pantalla del usuario.
*   **`location`**: Objeto BOM con información sobre la URL actual y para redirección.
*   **`location.hash`**: Parte de la URL que comienza con `#`, utilizada comúnmente para enrutamiento client-side.
*   **`history`**: Objeto BOM que permite navegar por el historial de la sesión.
*   **`localStorage`**: Almacenamiento persistente de datos clave-valor en el navegador.
*   **`sessionStorage`**: Almacenamiento de datos clave-valor para la duración de una sesión del navegador.
*   **`fetch()`**: Web API para realizar peticiones de red.
*   **`setTimeout()` / `setInterval()`**: Web APIs para temporizadores.
*   **`element.addEventListener()`**: Método del DOM para adjuntar funciones que reaccionan a eventos.
*   **`DOMContentLoaded`**: Evento del DOM que se dispara cuando el documento HTML ha sido completamente cargado y parseado.
*   **`prompt()`**: Función BOM para mostrar un cuadro de diálogo con un mensaje pidiendo una entrada de texto al usuario.
*   **`alert()`**: Función BOM para mostrar un cuadro de diálogo con un mensaje.
