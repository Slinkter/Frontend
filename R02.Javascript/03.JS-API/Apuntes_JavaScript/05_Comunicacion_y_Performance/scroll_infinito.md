# Módulo 05: Comunicación, Performance y Patrones

## Tema 5.5: Patrón de Diseño: Scroll Infinito para Experiencia de Usuario Fluida

### Clase: Carga de Contenido Dinámico a Demanda

El **scroll infinito** es un patrón de diseño de interfaz de usuario (UI) que carga dinámicamente más contenido a medida que el usuario se desplaza hacia el final de una página, eliminando la necesidad de paginación explícita (botones "Siguiente" o números de página). Es ampliamente adoptado en redes sociales, feeds de noticias y galerías de imágenes para ofrecer una experiencia de navegación fluida y continua. Este tema explora cómo implementar el scroll infinito en JavaScript, optimizando el rendimiento y la experiencia del usuario.

#### ¿Qué es el Scroll Infinito?

En lugar de cargar todo el contenido de una vez o dividirlo en páginas fijas, el scroll infinito extiende la página actual con nuevos datos cuando el usuario se acerca al final del contenido ya visible.

##### Ventajas:

*   **Experiencia de Usuario Fluida**: Elimina las interrupciones causadas por la recarga de páginas o la navegación explícita.
*   **Mayor Engagement**: Los usuarios tienden a desplazarse más y consumir más contenido.
*   **Facilidad de Navegación**: Especialmente útil en dispositivos móviles donde los clics de paginación pueden ser tediosos.

##### Desventajas:

*   **Problemas de Rendimiento**: Cargar y mantener un DOM muy grande puede ralentizar el navegador.
*   **Problemas de Usabilidad**: Dificulta el acceso al pie de página (`footer`) o a contenido que el usuario sabe que está "al final". También dificulta recordar la posición si el usuario abandona la página y regresa.
*   **Problemas de Accesibilidad**: Puede ser confuso para usuarios con lectores de pantalla.
*   **Consumo de Recursos**: Puede consumir más ancho de banda y memoria si el usuario no tiene intención de ver todo el contenido.

#### Implementación Clásica del Scroll Infinito (antes de `IntersectionObserver`)

Tradicionalmente, el scroll infinito se detectaba escuchando el evento `scroll` del objeto `window` y calculando la posición actual del scroll en relación con la altura total del documento.

```javascript
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Detectar si el usuario está cerca del final de la página (ej. 100px antes del final)
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        // Cargar más datos aquí
        console.log("¡Cargar más contenido!");
        // Aquí se llamaría a una función para hacer una petición a la API
    }
});
```

**Variables clave:**
*   `scrollTop`: La distancia desde la parte superior del documento que ha sido desplazada verticalmente.
*   `scrollHeight`: La altura total del contenido del documento, incluyendo lo no visible.
*   `clientHeight`: La altura del área visible del documento (el viewport).

**Problemas del enfoque clásico:**
*   **Intensivo para el CPU**: El evento `scroll` se dispara con mucha frecuencia, lo que puede causar "jank" (micropausas) en la interfaz de usuario si el manejador de eventos no está optimizado (`throttle` o `debounce`).
*   **Sensibilidad al Retardo**: Depende de la velocidad de la red y del renderizado; si la carga de nuevos datos es lenta, el usuario puede llegar al final y experimentar un "salto" o una página vacía.

#### Implementación Moderna con `IntersectionObserver`

Al igual que con el Lazy Loading de imágenes, `IntersectionObserver` es la herramienta preferida para implementar un scroll infinito eficiente. En lugar de monitorizar el scroll de toda la ventana, se observa un pequeño elemento (`sentinel` o `spinner`) que se coloca al final de la lista de contenido. Cuando este `sentinel` entra en el viewport, se disparará el callback del `IntersectionObserver`, indicando que es el momento de cargar más datos.

##### Pasos para Implementar con `IntersectionObserver`:

1.  **Crear un `sentinel`**: Un elemento DOM (ej. un `div` invisible) que se coloca al final de la lista de contenido actual.
2.  **Crear un `IntersectionObserver`**: Configurado para observar el `sentinel`.
    *   `root`: El contenedor con scroll (si la lista tiene su propio scroll) o `null` (el viewport del documento).
    *   `rootMargin`: Se puede usar un margen negativo para que el `callback` se dispare *antes* de que el `sentinel` sea completamente visible.
3.  **Manejar el `callback`**: Cuando el `sentinel` se intersecta (`entry.isIntersecting` es `true`), se realiza la petición para obtener la siguiente página de datos.
4.  **Actualizar el `sentinel`**: Una vez que se cargan los nuevos datos, se puede:
    *   Desconectar el `observer` del `sentinel` antiguo.
    *   Añadir el nuevo contenido al DOM.
    *   Crear un **nuevo `sentinel`** al final del nuevo contenido y empezar a observarlo.

##### Ventajas del Enfoque con `IntersectionObserver`:

*   **Eficiencia**: No requiere escuchar el evento `scroll` ni cálculos manuales, delegando la lógica de intersección al navegador.
*   **Rendimiento**: Ejecución asíncrona, no bloquea el hilo principal.
*   **Simplicidad**: El código es más limpio y fácil de entender.

#### Scroll Infinito en su Código

En `14.Api-Rest-3/App/src/main.js` y `14.Api-Rest-3/App/src/navigation.js`, se implementa un mecanismo de paginación que se activa al hacer scroll, lo cual es el corazón del scroll infinito.

*   **Variables de estado**: `page` (página actual), `maxPage` (número total de páginas).
*   **`infiniteScroll`**: Es una función que se asigna dinámicamente al listener de `scroll` de la ventana (`window.addEventListener("scroll", infiniteScroll, false);`). Esta función es el callback que verifica la posición del scroll.
*   **Lógica de detección**:
    ```javascript
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const isScrollBottom = scrollTop + clientHeight >= scrollHeight - 15; // Cargar 15px antes del final
    const isNotLastPage = page < maxPage;

    if (isScrollBottom && isNotLastPage) {
        page++;
        // ... realizar petición a la API con el nuevo número de página ...
        // ... añadir nuevos elementos al DOM ...
    }
    ```
*   **Manejo de eventos**: En `navigator()`, se añade y remueve el `infiniteScroll` listener para asegurar que solo esté activo en las páginas que lo requieren (ej. `trendsPage`, `searchPage`, `categoriesPage`). Esto es una buena práctica para evitar que el listener se ejecute innecesariamente o cause conflictos.

Si bien su implementación utiliza el enfoque clásico basado en el evento `scroll`, demuestra una clara comprensión de la lógica para detectar el final de la página y cargar más contenido. La adaptación a `IntersectionObserver` sería una mejora de rendimiento significativa.

---

### Ejemplos Ampliados y Corregidos

```javascript
// Simulación de una API con paginación
let currentPage = 1;
const totalPages = 5;
const itemsPerPage = 10;

async function fetchMoreItems(page) {
    console.log(`Simulando fetch de ítems para la página ${page}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            if (page > totalPages) {
                resolve([]); // No hay más ítems
            } else {
                const items = Array.from({ length: itemsPerPage }, (_, i) => `Ítem ${((page - 1) * itemsPerPage) + i + 1}`);
                resolve(items);
            }
        }, Math.random() * 1000 + 500); // Simula latencia de red
    });
}

// HTML base para el ejemplo
document.body.innerHTML += `
    <h1>Scroll Infinito</h1>
    <ul id="itemList" style="min-height: 500px; border: 1px solid #ddd; padding: 10px;"></ul>
    <div id="loadingSpinner" style="text-align: center; padding: 20px; display: none;">Cargando...</div>
    <div id="endOfContent" style="text-align: center; padding: 20px; display: none;">No hay más contenido.</div>
`;

const itemList = document.getElementById('itemList');
const loadingSpinner = document.getElementById('loadingSpinner');
const endOfContent = document.getElementById('endOfContent');

// Función para renderizar ítems
function renderItems(items) {
    const fragment = document.createDocumentFragment();
    items.forEach(itemText => {
        const li = document.createElement('li');
        li.textContent = itemText;
        fragment.appendChild(li);
    });
    itemList.appendChild(fragment);
}

// Ejemplo 1: Scroll Infinito con Evento Scroll (su enfoque)
console.log("--- Scroll Infinito (Enfoque Clásico) ---");

let isLoading = false; // Flag para evitar múltiples peticiones

// El manejador de scroll infinito
const classicInfiniteScroll = async () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50; // Cargar 50px antes del final

    if (isNearBottom && !isLoading && currentPage <= totalPages) {
        isLoading = true;
        loadingSpinner.style.display = 'block';

        const newItems = await fetchMoreItems(currentPage);
        if (newItems.length > 0) {
            renderItems(newItems);
            currentPage++;
        } else {
            endOfContent.style.display = 'block';
        }

        loadingSpinner.style.display = 'none';
        isLoading = false;
    } else if (currentPage > totalPages && !endOfContent.style.display === 'block') {
         endOfContent.style.display = 'block';
    }
};

window.addEventListener('scroll', classicInfiniteScroll);

// Cargar la primera página
classicInfiniteScroll();
// Nota: Ejecutar manualmente una primera vez para cargar el contenido inicial


// Ejemplo 2: Scroll Infinito con IntersectionObserver (enfoque moderno)
console.log("\n--- Scroll Infinito (Enfoque Moderno con IntersectionObserver) ---");

// Reiniciar estado para este ejemplo
itemList.innerHTML = '';
currentPage = 1;
isLoading = false;
loadingSpinner.style.display = 'none';
endOfContent.style.display = 'none';

// Crear el elemento sentinel
const sentinel = document.createElement('div');
sentinel.id = 'sentinel';
sentinel.style.height = '1px';
sentinel.style.width = '100%';
sentinel.style.backgroundColor = 'transparent'; // Invisible
itemList.after(sentinel); // Colocarlo justo después de la lista

const modernInfiniteScrollObserver = new IntersectionObserver(async (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && !isLoading && currentPage <= totalPages) {
        isLoading = true;
        loadingSpinner.style.display = 'block';
        sentinel.style.display = 'none'; // Ocultar el sentinel mientras se carga

        const newItems = await fetchMoreItems(currentPage);
        if (newItems.length > 0) {
            renderItems(newItems);
            currentPage++;
            // Re-observar el sentinel si la lista ha crecido y ha cambiado su posición
            // No es estrictamente necesario si el sentinel se mueve con el contenido
        } else {
            endOfContent.style.display = 'block';
            modernInfiniteScrollObserver.unobserve(sentinel); // Detener la observación
        }

        loadingSpinner.style.display = 'none';
        sentinel.style.display = 'block';
        isLoading = false;
    } else if (currentPage > totalPages) {
        modernInfiniteScrollObserver.unobserve(sentinel); // Detener la observación si no hay más páginas
        endOfContent.style.display = 'block';
    }
}, {
    root: null, // Observar con respecto al viewport
    rootMargin: '100px 0px', // Disparar 100px antes de que el sentinel sea visible
    threshold: 0 // Cualquier visibilidad
});

modernInfiniteScrollObserver.observe(sentinel);

// Cargar la primera página para el enfoque moderno (el observer lo manejará)
fetchMoreItems(currentPage).then(items => {
    renderItems(items);
    currentPage++;
});
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Scroll Infinito con Estado de Carga y Mensaje de "No Hay Más"**
    Implemente un scroll infinito que cargue ítems (simulados por `fetchMoreItems`). Debe mostrar un spinner de carga (`loadingSpinner`) mientras se obtienen los datos y un mensaje de "No hay más contenido" (`endOfContent`) cuando se han cargado todas las páginas. Utilice el enfoque que considere más eficiente (`IntersectionObserver` es preferible).

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Scroll Infinito</title>
        <style>
            #content-list {
                min-height: 500px;
                border: 1px solid #ccc;
                padding: 10px;
            }
            .item {
                padding: 10px;
                border-bottom: 1px dashed #eee;
            }
            #loading-spinner, #no-more-content {
                text-align: center;
                padding: 20px;
                font-weight: bold;
                display: none; /* Inicialmente ocultos */
            }
        </style>
    </head>
    <body>
        <h1>Mi Lista de Contenido</h1>
        <div id="content-list"></div>
        <div id="loading-spinner">Cargando más items...</div>
        <div id="no-more-content">¡Has llegado al final del contenido!</div>

        <script>
            // Simulación de API con paginación
            let currentPage = 1;
            const totalPages = 5;
            const itemsPerPage = 10;

            async function fetchMoreItems(page) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        if (page > totalPages) {
                            resolve([]);
                        } else {
                            const items = Array.from({ length: itemsPerPage }, (_, i) => `Ítem ${((page - 1) * itemsPerPage) + i + 1} (Página ${page})`);
                            resolve(items);
                        }
                    }, Math.random() * 800 + 300); // Simula latencia de red
                });
            }

            const contentList = document.getElementById('content-list');
            const loadingSpinner = document.getElementById('loading-spinner');
            const noMoreContent = document.getElementById('no-more-content');

            let isLoading = false;
            let currentSentinel = null;

            function renderItems(items) {
                const fragment = document.createDocumentFragment();
                items.forEach(itemText => {
                    const div = document.createElement('div');
                    div.classList.add('item');
                    div.textContent = itemText;
                    fragment.appendChild(div);
                });
                contentList.appendChild(fragment);
            }

            // Su código aquí para el Scroll Infinito
            // (Usando IntersectionObserver y las funciones de arriba)

            // Iniciar la carga de la primera página
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Scroll Infinito con Estado de Carga y Mensaje de "No Hay Más"

    // Simulación de API con paginación (la misma del ejercicio)
    let currentPage = 1;
    const totalPages = 5;
    const itemsPerPage = 10;

    async function fetchMoreItems(page) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (page > totalPages) {
                    resolve([]);
                } else {
                    const items = Array.from({ length: itemsPerPage }, (_, i) => `Ítem ${((page - 1) * itemsPerPage) + i + 1} (Página ${page})`);
                    resolve(items);
                }
            }, Math.random() * 800 + 300); // Simula latencia de red
        });
    }

    const contentList = document.getElementById('content-list');
    const loadingSpinner = document.getElementById('loading-spinner');
    const noMoreContent = document.getElementById('no-more-content');

    let isLoading = false;
    let observer = null; // Para almacenar el IntersectionObserver
    let sentinel = null; // Para el elemento que observamos

    function renderItems(items) {
        const fragment = document.createDocumentFragment();
        items.forEach(itemText => {
            const div = document.createElement('div');
            div.classList.add('item');
            div.textContent = itemText;
            fragment.appendChild(div);
        });
        contentList.appendChild(fragment);
    }

    async function loadContent() {
        if (isLoading || currentPage > totalPages) {
            return;
        }

        isLoading = true;
        loadingSpinner.style.display = 'block';
        if (sentinel) {
            observer.unobserve(sentinel); // Deja de observar el sentinel anterior
            sentinel.remove(); // Elimina el sentinel anterior
        }

        const newItems = await fetchMoreItems(currentPage);

        if (newItems.length > 0) {
            renderItems(newItems);
            currentPage++;
            if (currentPage <= totalPages) {
                // Crear y observar un nuevo sentinel al final del contenido
                sentinel = document.createElement('div');
                sentinel.id = 'dynamic-sentinel';
                sentinel.style.height = '1px';
                sentinel.style.backgroundColor = 'transparent';
                contentList.appendChild(sentinel);
                observer.observe(sentinel);
            } else {
                noMoreContent.style.display = 'block';
            }
        } else {
            noMoreContent.style.display = 'block';
        }

        loadingSpinner.style.display = 'none';
        isLoading = false;
    }

    // Inicializar el IntersectionObserver
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadContent();
            }
        });
    }, {
        root: null, // El viewport del documento
        rootMargin: '100px', // Cargar cuando el sentinel esté a 100px del viewport
        threshold: 0
    });

    // Iniciar la carga de la primera página
    loadContent(); // La primera carga no necesita esperar al scroll, directamente desde el inicio
    ```

2.  **Ejercicio: Paginación de Scroll Infinito con "Load More" Button como Fallback**
    Modifique el ejercicio anterior. En lugar de cargar automáticamente al llegar al final, implemente un botón "Cargar Más" que aparezca al final de la lista. Cuando el usuario haga clic en este botón, se deben cargar los nuevos ítems. El botón solo debe aparecer si hay más contenido por cargar y ocultarse durante la carga. Cuando no haya más contenido, el botón debe desaparecer y mostrarse el mensaje "No hay más contenido."

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Scroll Infinito con Botón</title>
        <style>
            #content-list {
                min-height: 500px;
                border: 1px solid #ccc;
                padding: 10px;
            }
            .item {
                padding: 10px;
                border-bottom: 1px dashed #eee;
            }
            #loading-spinner-btn, #no-more-content-btn, #load-more-btn {
                text-align: center;
                padding: 20px;
                font-weight: bold;
                display: none; /* Inicialmente ocultos */
            }
            #load-more-btn {
                display: block; /* Mostrar el botón inicialmente */
                margin: 20px auto;
                padding: 10px 20px;
                cursor: pointer;
            }
        </style>
    </head>
    <body>
        <h1>Mi Lista de Contenido (con Botón)</h1>
        <div id="content-list-btn"></div>
        <button id="load-more-btn">Cargar Más</button>
        <div id="loading-spinner-btn">Cargando más items...</div>
        <div id="no-more-content-btn">¡Has llegado al final del contenido!</div>

        <script>
            // Simulación de API con paginación (misma que el ejercicio 1)
            let currentPageBtn = 1;
            const totalPagesBtn = 5;
            const itemsPerPageBtn = 10;

            async function fetchMoreItemsBtn(page) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        if (page > totalPagesBtn) {
                            resolve([]);
                        } else {
                            const items = Array.from({ length: itemsPerPageBtn }, (_, i) => `Ítem ${((page - 1) * itemsPerPageBtn) + i + 1} (Página ${page})`);
                            resolve(items);
                        }
                    }, Math.random() * 800 + 300);
                });
            }

            const contentListBtn = document.getElementById('content-list-btn');
            const loadMoreBtn = document.getElementById('load-more-btn');
            const loadingSpinnerBtn = document.getElementById('loading-spinner-btn');
            const noMoreContentBtn = document.getElementById('no-more-content-btn');

            let isLoadingBtn = false;

            function renderItemsBtn(items) {
                const fragment = document.createDocumentFragment();
                items.forEach(itemText => {
                    const div = document.createElement('div');
                    div.classList.add('item');
                    div.textContent = itemText;
                    fragment.appendChild(div);
                });
                contentListBtn.appendChild(fragment);
            }

            async function loadMoreContentBtn() {
                // Su código aquí
            }

            loadMoreBtn.addEventListener('click', loadMoreContentBtn);

            // Cargar la primera página al inicio
            loadMoreContentBtn();
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Paginación de Scroll Infinito con "Load More" Button como Fallback

    // Simulación de API con paginación (misma que el ejercicio 1)
    let currentPageBtn = 1;
    const totalPagesBtn = 5;
    const itemsPerPageBtn = 10;

    async function fetchMoreItemsBtn(page) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (page > totalPagesBtn) {
                    resolve([]);
                } else {
                    const items = Array.from({ length: itemsPerPageBtn }, (_, i) => `Ítem ${((page - 1) * itemsPerPageBtn) + i + 1} (Página ${page})`);
                    resolve(items);
                }
            }, Math.random() * 800 + 300);
        });
    }

    const contentListBtn = document.getElementById('content-list-btn');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadingSpinnerBtn = document.getElementById('loading-spinner-btn');
    const noMoreContentBtn = document.getElementById('no-more-content-btn');

    let isLoadingBtn = false;

    function renderItemsBtn(items) {
        const fragment = document.createDocumentFragment();
        items.forEach(itemText => {
            const div = document.createElement('div');
            div.classList.add('item');
            div.textContent = itemText;
            fragment.appendChild(div);
        });
        contentListBtn.appendChild(fragment);
    }

    async function loadMoreContentBtn() {
        if (isLoadingBtn) {
            return;
        }

        isLoadingBtn = true;
        loadMoreBtn.style.display = 'none'; // Ocultar el botón durante la carga
        loadingSpinnerBtn.style.display = 'block'; // Mostrar spinner

        const newItems = await fetchMoreItemsBtn(currentPageBtn);

        if (newItems.length > 0) {
            renderItemsBtn(newItems);
            currentPageBtn++;
            if (currentPageBtn <= totalPagesBtn) {
                loadMoreBtn.style.display = 'block'; // Volver a mostrar el botón si hay más páginas
            } else {
                noMoreContentBtn.style.display = 'block'; // Mostrar mensaje de fin si no hay más
            }
        } else {
            noMoreContentBtn.style.display = 'block'; // Mostrar mensaje de fin si no hay ítems
        }

        loadingSpinnerBtn.style.display = 'none'; // Ocultar spinner
        isLoadingBtn = false;
    }

    loadMoreBtn.addEventListener('click', loadMoreContentBtn);

    // Cargar la primera página al inicio
    loadMoreContentBtn();
    ```

---

### Glosario Técnico

*   **Scroll Infinito**: Patrón de diseño UI donde el contenido se carga dinámicamente a medida que el usuario se desplaza hacia el final de la página.
*   **Paginación**: Dividir el contenido en páginas separadas, navegables con controles explícitos (ej. botones "Siguiente", números de página).
*   **`scrollTop`**: Propiedad de `document.documentElement` (o `document.body`) que indica la cantidad de píxeles que un elemento ha sido desplazado verticalmente.
*   **`scrollHeight`**: Propiedad de `document.documentElement` (o `document.body`) que indica la altura total del contenido de un elemento, incluyendo lo no visible.
*   **`clientHeight`**: Propiedad de `document.documentElement` (o `document.body`) que indica la altura del área visible de un elemento (el viewport).
*   **`IntersectionObserver`**: API moderna para detectar de forma eficiente cuándo un elemento entra o sale del viewport de otro elemento.
*   **`sentinel`**: Elemento pequeño y a menudo invisible, colocado al final de una lista de contenido, que se observa con `IntersectionObserver` para detectar cuándo el usuario está cerca de cargar más datos.
*   **`debounce`**: Técnica para retrasar la ejecución de una función hasta que haya pasado un cierto tiempo sin que se vuelva a llamar.
*   **`throttle`**: Técnica para limitar la frecuencia de ejecución de una función a un máximo de una vez en un intervalo de tiempo determinado.
*   **Carga Dinámica**: Carga de contenido o recursos a medida que son necesarios, en lugar de cargarlos todos al inicio.
*   **Experiencia de Usuario (UX)**: La forma en que un usuario se siente al interactuar con un sistema.
*   **DOM Pesado**: Un Document Object Model con una gran cantidad de nodos, lo que puede afectar negativamente el rendimiento del navegador.
*   **Renderizado**: El proceso que realiza el navegador para mostrar el contenido de una página web en la pantalla.
*   **"Below the fold"**: Contenido de una página web que no es visible en la pantalla inicial del usuario y requiere scroll para ser visto.
*   **"Above the fold"**: Contenido de una página web que es inmediatamente visible para el usuario sin necesidad de scroll.
*   **Bandera de Carga (`isLoading`)**: Una variable booleana utilizada para evitar que se realicen múltiples peticiones de datos de forma concurrente mientras una ya está en progreso.
