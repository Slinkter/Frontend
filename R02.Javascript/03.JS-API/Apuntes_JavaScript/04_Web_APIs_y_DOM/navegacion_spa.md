# Módulo 04: El Navegador como Entorno de Ejecución

## Tema 4.4: Creando una Single Page Application (SPA) con `location.hash`

### Clase: Principios de Navegación Client-Side sin Recargas de Página

Las **Single Page Applications (SPAs)** han revolucionado la experiencia de usuario en la web al ofrecer interfaces fluidas y dinámicas, similares a las aplicaciones de escritorio. A diferencia de las aplicaciones tradicionales (MPA - Multi Page Applications) que recargan la página completa en cada navegación, una SPA carga una única página HTML y actualiza su contenido de forma dinámica utilizando JavaScript, lo que mejora significativamente la velocidad y la interactividad.

Una de las formas más simples y antiguas de implementar un enrutamiento client-side en una SPA es utilizando la propiedad **`location.hash`** del objeto `window.location`.

#### ¿Qué es `location.hash`?

La propiedad `hash` de `window.location` devuelve la parte de la URL que comienza con el símbolo de almohadilla (`#`), incluyendo el propio símbolo. Por ejemplo, en la URL `https://ejemplo.com/pagina#seccion1`, el `location.hash` sería `"#seccion1"`.

*   **Cambiar el `hash`**: Modificar `location.hash` (ej. `location.hash = "#nueva-seccion"`) no provoca una recarga completa de la página. En su lugar, el navegador desplaza la vista a un elemento con un `id` que coincida con el `hash`, si existe. Además, añade una nueva entrada al historial del navegador.
*   **Evento `hashchange`**: El navegador dispara un evento `hashchange` en el objeto `window` cada vez que el valor de `location.hash` cambia. Este evento es crucial para detectar la navegación en una SPA basada en `hash`.

#### Implementando un Enrutamiento Básico Basado en `hash`

El patrón fundamental para una SPA con `location.hash` implica:

1.  **Escuchar el evento `hashchange`**: Un manejador de eventos en `window` detecta cualquier cambio en el `hash`.
2.  **Una función `navigator()` central**: Esta función examina el valor actual de `location.hash` y decide qué vista o componente debe mostrar.
3.  **Actualización dinámica del DOM**: Basado en el `hash`, JavaScript manipula el DOM para mostrar el contenido correspondiente, ocultando las vistas anteriores y mostrando las nuevas, sin recargar la página.

##### Ejemplo Simplificado del Ciclo de Vida:

```javascript
window.addEventListener('hashchange', navigator);
window.addEventListener('DOMContentLoaded', navigator); // Para la carga inicial

function navigator() {
    if (location.hash.startsWith('#home')) {
        mostrarHomePage();
    } else if (location.hash.startsWith('#productos')) {
        const idProducto = location.hash.split('=')[1];
        mostrarDetalleProducto(idProducto);
    } else {
        // Por defecto, ir a home si el hash no es reconocido
        mostrarHomePage();
    }
}

function mostrarHomePage() {
    // Ocultar otras secciones, mostrar la de inicio
    console.log("Mostrando Home Page");
    document.getElementById('home-section').style.display = 'block';
    document.getElementById('productos-section').style.display = 'none';
}

function mostrarDetalleProducto(id) {
    // Ocultar otras secciones, mostrar la de productos
    console.log(`Mostrando detalle del producto: ${id}`);
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('productos-section').style.display = 'block';
    // Aquí se cargarían los datos del producto y se actualizaría el DOM
}
```

#### Uso de `location.hash` y `history.back()` en su Código

Sus archivos `13.Api-Rest-2/src/js/navigation.js` y `14.Api-Rest-3/App/src/navigation.js` son un ejemplo práctico y bien implementado de este patrón.

*   **`window.addEventListener("DOMContentLoaded", navigator, false);`**: Asegura que la función `navigator` se ejecute al cargar la página, para renderizar la vista inicial según el `hash` (o la vista por defecto si no hay `hash`).
*   **`window.addEventListener("hashchange", navigator, false);`**: Escucha los cambios en el `hash` para redirigir internamente la aplicación.
*   **Función `navigator()`**: Utiliza `location.hash.startsWith()` y `location.hash.split("=")` para parsear el hash y determinar la "ruta" actual.
    *   `#trends` -> `trendsPage()`
    *   `#search=` -> `searchPage()`
    *   `#movie=` -> `movieDetailsPage()`
    *   `#category=` -> `categoriesPage()`
    *   Por defecto -> `homePage()`
*   **Manipulación de Clases**: Las funciones como `homePage()`, `trendsPage()`, etc., manejan el estado visual de la aplicación añadiendo y quitando clases CSS (`inactive`) a las diferentes secciones para mostrarlas u ocultarlas. Esto es una técnica común para alternar vistas sin manipular `display: none` directamente.
*   **`history.back()`**: Su `arrowBtn.addEventListener("click", () => { history.back(); });` permite al usuario navegar hacia atrás en el historial del navegador, lo que es un comportamiento esperado en una SPA.

#### Ventajas del Enrutamiento Basado en `hash`:

*   **Simplicidad**: Fácil de implementar y entender.
*   **Compatibilidad**: Funciona en todos los navegadores, incluso los muy antiguos.
*   **No requiere configuración de servidor**: El servidor siempre devuelve el mismo HTML principal, sin importar el `hash` de la URL.

#### Desventajas y Alternativas:

*   **Estética de la URL**: La URL contiene el `#`, lo que puede no ser tan "limpio" o "SEO-friendly" como las URL sin hash.
*   **Problemas de SEO**: Los motores de búsqueda tradicionalmente ignoraban la parte `hash` de la URL, lo que dificultaba la indexación de las diferentes "páginas" de la SPA. Aunque esto ha mejorado, las URL "limpias" son preferibles para SEO.
*   **API `History` (PushState/ReplaceState)**: Una alternativa más moderna y recomendada es la **History API** (`pushState`, `replaceState`). Permite manipular el historial del navegador para cambiar la URL sin recargar la página y sin usar `#`. Esto resulta en URL más "limpias" y mejores para SEO. Sin embargo, requiere una configuración adicional en el servidor para asegurarse de que todas las rutas válidas de la SPA devuelvan el mismo HTML principal (evitando errores 404).

    ```javascript
    // Ejemplo de History API
    // history.pushState(state, title, url);
    // history.replaceState(state, title, url);
    // window.addEventListener('popstate', (event) => { /* manejar cambios de URL */ });
    ```
    Aunque sus notas no exploran `pushState` explícitamente, su implementación basada en `location.hash` es un excelente punto de partida para entender los fundamentos del enrutamiento client-side.

---

### Ejemplos Ampliados y Corregidos

```javascript
// Simulación de las secciones de su aplicación para el ejemplo
document.body.innerHTML += `
    <section id="home-view" class="active-section" style="border: 1px solid blue; padding: 10px; margin-top: 20px;">
        <h2>Home (Sección Activa)</h2>
        <p>Contenido principal de la aplicación.</p>
        <a href="#trends">Ir a Tendencias</a>
        <a href="#search=javascript">Buscar 'javascript'</a>
    </section>
    <section id="trends-view" class="hidden-section" style="border: 1px solid red; padding: 10px; margin-top: 20px;">
        <h2>Tendencias</h2>
        <p>Aquí se mostrarán las tendencias.</p>
        <button id="backButton">Volver</button>
    </section>
    <section id="search-view" class="hidden-section" style="border: 1px solid green; padding: 10px; margin-top: 20px;">
        <h2>Resultados de Búsqueda</h2>
        <p id="searchQueryDisplay">Buscando...</p>
        <button id="backButtonSearch">Volver</button>
    </section>
`;

// Helper para ocultar/mostrar secciones
function toggleSection(sectionId, show) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.toggle('active-section', show);
        section.classList.toggle('hidden-section', !show);
    }
}

// Función navigator central (simplificada para el ejemplo)
function appNavigator() {
    // Es buena práctica "limpiar" antes de mostrar
    toggleSection('home-view', false);
    toggleSection('trends-view', false);
    toggleSection('search-view', false);

    const hash = window.location.hash;

    if (hash.startsWith('#trends')) {
        toggleSection('trends-view', true);
        console.log("Navegando a Tendencias.");
    } else if (hash.startsWith('#search=')) {
        toggleSection('search-view', true);
        const query = hash.split('=')[1];
        document.getElementById('searchQueryDisplay').textContent = `Buscando: ${decodeURIComponent(query)}`;
        console.log(`Navegando a Búsqueda: ${query}`);
    } else {
        // Por defecto, si no hay hash o es desconocido
        toggleSection('home-view', true);
        console.log("Navegando a Home.");
    }
    // Desplazar al inicio de la página
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

// Event Listeners
window.addEventListener('hashchange', appNavigator);
window.addEventListener('DOMContentLoaded', appNavigator);

// Botones de volver
document.getElementById('backButton').addEventListener('click', () => {
    history.back();
});
document.getElementById('backButtonSearch').addEventListener('click', () => {
    history.back();
});

// Inicialización de la vista
appNavigator();
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Enrutador Simple con `location.hash` y Mensajes Dinámicos**
    Cree un enrutador simple para una SPA con dos vistas: "Productos" y "Acerca de".
    1.  Tendrá enlaces en el HTML como `<a href="#productos">Productos</a>` y `<a href="#acerca">Acerca de</a>`.
    2.  Implemente una función `router()` que se ejecute en `DOMContentLoaded` y `hashchange`.
    3.  La vista de "Productos" debe mostrar el texto "Esta es la sección de productos."
    4.  La vista de "Acerca de" debe mostrar el texto "Información sobre nuestra empresa."
    5.  Si el hash no coincide con ninguna ruta, debe mostrar un mensaje "Página no encontrada."
    6.  Utilice `divs` ocultos/mostrados con clases CSS (`active-route`, `hidden-route`).

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>SPA Router Hash</title>
        <style>
            .hidden-route { display: none; }
            .active-route { display: block; }
            nav a { margin-right: 15px; }
            section { border: 1px solid #eee; padding: 20px; margin-top: 20px; }
        </style>
    </head>
    <body>
        <nav>
            <a href="#productos">Productos</a>
            <a href="#acerca">Acerca de</a>
            <a href="#contacto">Contacto (no definida)</a>
        </nav>

        <section id="productos-view" class="hidden-route">
            <h2>Nuestros Productos</h2>
            <p>Esta es la sección de productos.</p>
        </section>

        <section id="acerca-view" class="hidden-route">
            <h2>Acerca de Nosotros</h2>
            <p>Información sobre nuestra empresa.</p>
        </section>

        <section id="not-found-view" class="hidden-route">
            <h2>Página no encontrada</h2>
            <p>Lo sentimos, la ruta que buscas no existe.</p>
        </section>

        <script>
            function router() {
                // Su código aquí
            }

            window.addEventListener('hashchange', router);
            window.addEventListener('DOMContentLoaded', router);
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Enrutador Simple con `location.hash` y Mensajes Dinámicos

    function router() {
        const hash = window.location.hash;

        // Ocultar todas las secciones primero
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active-route');
            section.classList.add('hidden-route');
        });

        // Mostrar la sección correspondiente
        if (hash === '#productos') {
            document.getElementById('productos-view').classList.remove('hidden-route');
            document.getElementById('productos-view').classList.add('active-route');
        } else if (hash === '#acerca') {
            document.getElementById('acerca-view').classList.remove('hidden-route');
            document.getElementById('acerca-view').classList.add('active-route');
        } else {
            document.getElementById('not-found-view').classList.remove('hidden-route');
            document.getElementById('not-found-view').classList.add('active-route');
        }
    }

    window.addEventListener('hashchange', router);
    window.addEventListener('DOMContentLoaded', router);
    ```

2.  **Ejercicio: Implementación de un "Botón Volver" Global**
    Modifique la solución del ejercicio anterior para añadir un botón "Volver" en cada sección (Productos y Acerca de). Este botón debe utilizar `history.back()` para navegar al estado anterior del navegador.

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>SPA Router Hash con Historial</title>
        <style>
            .hidden-route { display: none; }
            .active-route { display: block; }
            nav a { margin-right: 15px; }
            section { border: 1px solid #eee; padding: 20px; margin-top: 20px; }
            .back-button { margin-top: 10px; padding: 8px 15px; cursor: pointer; }
        </style>
    </head>
    <body>
        <nav>
            <a href="#productos">Productos</a>
            <a href="#acerca">Acerca de</a>
        </nav>

        <section id="productos-view" class="hidden-route">
            <h2>Nuestros Productos</h2>
            <p>Esta es la sección de productos.</p>
            <button class="back-button">Volver</button>
        </section>

        <section id="acerca-view" class="hidden-route">
            <h2>Acerca de Nosotros</h2>
            <p>Información sobre nuestra empresa.</p>
            <button class="back-button">Volver</button>
        </section>

        <section id="not-found-view" class="hidden-route">
            <h2>Página no encontrada</h2>
            <p>Lo sentimos, la ruta que buscas no existe.</p>
            <button class="back-button">Volver</button>
        </section>

        <script>
            function router() {
                // ... (código del ejercicio 1) ...
            }

            // Su código aquí para el botón Volver
            window.addEventListener('hashchange', router);
            window.addEventListener('DOMContentLoaded', () => {
                router();
                // Adjuntar listeners a los botones "Volver"
                document.querySelectorAll('.back-button').forEach(button => {
                    button.addEventListener('click', () => {
                        history.back();
                    });
                });
            });
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Implementación de un "Botón Volver" Global

    function router() {
        const hash = window.location.hash;

        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active-route');
            section.classList.add('hidden-route');
        });

        if (hash === '#productos') {
            document.getElementById('productos-view').classList.remove('hidden-route');
            document.getElementById('productos-view').classList.add('active-route');
        } else if (hash === '#acerca') {
            document.getElementById('acerca-view').classList.remove('hidden-route');
            document.getElementById('acerca-view').classList.add('active-route');
        } else {
            document.getElementById('not-found-view').classList.remove('hidden-route');
            document.getElementById('not-found-view').classList.add('active-route');
        }
    }

    window.addEventListener('hashchange', router);
    window.addEventListener('DOMContentLoaded', () => {
        router(); // Ejecutar el router en la carga inicial
        // Adjuntar listeners a todos los botones con la clase 'back-button'
        document.querySelectorAll('.back-button').forEach(button => {
            button.addEventListener('click', () => {
                history.back(); // Navegar hacia atrás en el historial del navegador
            });
        });
    });
    ```

---

### Glosario Técnico

*   **Single Page Application (SPA)**: Aplicación web que carga un solo documento HTML y actualiza su contenido dinámicamente mediante JavaScript, sin recargas de página completas.
*   **Multi Page Application (MPA)**: Aplicación web tradicional que recarga la página completa en cada navegación.
*   **`window.location.hash`**: Propiedad del objeto `location` que devuelve la parte del URL que comienza con el `#`.
*   **Evento `hashchange`**: Evento disparado en el objeto `window` cuando `location.hash` cambia.
*   **`window.history`**: Objeto BOM que proporciona acceso al historial de navegación de la pestaña.
*   **`history.back()`**: Método que navega a la entrada anterior en el historial del navegador.
*   **`history.forward()`**: Método que navega a la entrada siguiente en el historial del navegador.
*   **`history.go(delta)`**: Método que navega a una entrada específica en el historial (`delta` positivo para adelante, negativo para atrás).
*   **History API (`pushState`, `replaceState`)**: API más moderna para manipular el historial del navegador sin recargar la página y sin usar `#` en la URL.
*   **Enrutamiento Client-Side**: Lógica en el lado del cliente (navegador) que determina qué contenido mostrar basándose en la URL o el estado de la aplicación, sin una recarga completa de la página.
*   **`DOMContentLoaded`**: Evento que se dispara cuando el documento HTML ha sido completamente cargado y parseado.
*   **SEO (Search Engine Optimization)**: Prácticas destinadas a mejorar la visibilidad de un sitio web en los resultados orgánicos de los motores de búsqueda. A menudo, las URL limpias (`pushState`) son preferidas para SEO sobre las URL con `hash`.
*   **UX (User Experience)**: La experiencia general que tiene un usuario al interactuar con un producto o servicio. Las SPAs suelen mejorar la UX gracias a su fluidez.
