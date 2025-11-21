# Módulo 05: Comunicación, Performance y Patrones

## Tema 5.4: Optimización del Renderizado: Lazy Loading y `IntersectionObserver`

### Clase: Mejorando la Percepción de Velocidad y la Experiencia de Usuario

La **performance web** es un factor crítico para el éxito de cualquier aplicación. Los usuarios esperan que las páginas carguen rápidamente y que sean interactivas y fluidas. Uno de los mayores cuellos de botella en el rendimiento, especialmente en sitios con mucho contenido multimedia, es la carga inicial de recursos como imágenes y videos. La técnica de **Lazy Loading (carga perezosa)**, facilitada modernamente por la Web API `IntersectionObserver`, permite cargar estos recursos solo cuando son necesarios, mejorando significativamente la velocidad de carga percibida y el rendimiento general de la aplicación.

#### El Problema de la Carga Ansiosa (Eager Loading)

Tradicionalmente, un navegador descarga todos los recursos referenciados en el HTML tan pronto como los encuentra. Esto se conoce como carga ansiosa o "eager loading". Si una página contiene muchas imágenes, videos o iframes, incluso si están fuera de la vista inicial del usuario (below the fold), el navegador intentará cargarlos todos al principio. Esto puede llevar a:

*   **Mayor tiempo de carga inicial**: El navegador gasta tiempo y ancho de banda descargando recursos no visibles.
*   **Mayor consumo de recursos**: Se consume más CPU y memoria en el dispositivo del usuario.
*   **Menor puntuación en métricas de rendimiento**: Como First Contentful Paint (FCP) o Largest Contentful Paint (LCP).
*   **Peor experiencia de usuario**: La página puede parecer lenta o "congelada".

#### Lazy Loading (Carga Perezosa)

El Lazy Loading es una técnica que retrasa la carga de objetos no críticos, como imágenes, videos o iframes, hasta el momento en que son necesarios (es decir, cuando entran en el viewport del usuario).

##### Beneficios:

*   **Mejora la velocidad de carga inicial**: El navegador solo descarga lo que el usuario ve de inmediato.
*   **Ahorro de ancho de banda**: Se descargan menos datos, beneficiando a usuarios con conexiones lentas o planes de datos limitados.
*   **Menor uso de recursos del sistema**: Menos elementos para renderizar y gestionar inicialmente.
*   **Mejora de las métricas de rendimiento web**: Impacto positivo en SEO y experiencia de usuario.

#### Implementación Tradicional de Lazy Loading (antes de `IntersectionObserver`)

Antes de `IntersectionObserver`, el Lazy Loading a menudo se implementaba escuchando el evento `scroll` y calculando manualmente si un elemento estaba en el viewport.

```javascript
// Pseudocódigo de implementación antigua
function lazyLoadImages() {
    const imagenes = document.querySelectorAll('img[data-src]');
    imagenes.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
    });
}

window.addEventListener('scroll', lazyLoadImages);
window.addEventListener('resize', lazyLoadImages);
window.addEventListener('DOMContentLoaded', lazyLoadImages);
```

**Problemas de este enfoque**:
*   **Costoso en rendimiento**: Escuchar el evento `scroll` y realizar cálculos de `getBoundingClientRect()` en cada fotograma de scroll puede ser muy intensivo para el CPU, especialmente en páginas con muchos elementos.
*   **Inexactitud**: Las comprobaciones pueden no ser precisas debido a la velocidad del scroll o la latencia.

#### `IntersectionObserver` API: La Solución Moderna

La `IntersectionObserver` API (parte de las Web APIs) proporciona una forma asíncrona y no bloqueante de observar los cambios en la intersección de un elemento objetivo con un elemento ancestro (o el viewport del documento). Es la solución preferida para el Lazy Loading y otras funcionalidades que dependen de la visibilidad de los elementos.

##### ¿Cómo Funciona `IntersectionObserver`?

1.  **Crear un `IntersectionObserver`**:
    Se crea una instancia pasándole una función `callback` y un objeto de `options` opcional.
    *   `callback(entries, observer)`: Se ejecuta cuando un elemento objetivo entra o sale del área de intersección. `entries` es un array de objetos `IntersectionObserverEntry`, uno por cada objetivo que ha cambiado su estado de intersección.
    *   `options`:
        *   `root`: El elemento ancestro que se utiliza como viewport para comprobar la visibilidad. Por defecto es el viewport del documento (`null`).
        *   `rootMargin`: Un margen alrededor del `root` que se usa para aumentar o reducir el área de intersección. Utiliza una sintaxis similar a la del `margin` de CSS (ej. "100px 0px"). Permite cargar elementos *antes* de que entren completamente en el viewport.
        *   `threshold`: Un número o un array de números entre `0` y `1`, indicando qué porcentaje de visibilidad del objetivo debe ocurrir para que se dispare el `callback`. `0` significa que el callback se dispara tan pronto como un pixel del objetivo es visible; `1` significa que el callback se dispara cuando el objetivo está completamente visible.

2.  **Observar Elementos**:
    Se utiliza el método `observer.observe(targetElement)` para indicar al observador qué elemento debe monitorear.

3.  **Dejar de Observar**:
    *   `observer.unobserve(targetElement)`: Deja de observar un elemento específico.
    *   `observer.disconnect()`: Deja de observar todos los elementos.

##### Propiedades Clave de `IntersectionObserverEntry`

Cada `entry` en el array del callback tiene propiedades importantes:
*   `entry.isIntersecting`: (Boolean) `true` si el elemento objetivo está actualmente interceptando con el `root`.
*   `entry.target`: El elemento DOM que está siendo observado.
*   `entry.intersectionRatio`: El ratio de visibilidad del `target` dentro del `root`.

#### Lazy Loading de Imágenes con `IntersectionObserver`

Este es el patrón común para implementar Lazy Loading en imágenes.

1.  **HTML**: Utilice un atributo `data-src` para la URL real de la imagen y un `src` provisional (o vacío/placeholder) para evitar la carga inicial.
    ```html
    <img data-src="imagen_real.jpg" src="placeholder.png" alt="Descripción">
    ```

2.  **JavaScript**:

    ```javascript
    const lazyLoader = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // Si el elemento está en el viewport o cerca
                const img = entry.target;
                img.src = img.dataset.src; // Carga la imagen real
                img.removeAttribute('data-src'); // Opcional, para evitar re-carga
                observer.unobserve(img); // Deja de observar la imagen una vez cargada
            }
        });
    }, {
        rootMargin: '100px 0px', // Cargar 100px antes de que la imagen entre en el viewport
        threshold: 0 // Se activa tan pronto como un píxel sea visible
    });

    // Observar todas las imágenes con el atributo data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        lazyLoader.observe(img);
    });
    ```
    *Su código en `14.Api-Rest-3/App/src/main.js` implementa exactamente este patrón, demostrando una comprensión avanzada de esta técnica.*

#### `IntersectionObserver` en su Código

En `14.Api-Rest-3/App/src/main.js`, se define y utiliza `lazyLoader`:

```javascript
// Desde su código:
const lazyLoader = new IntersectionObserver((io) => {
    io.forEach((item) => {
        if (item.isIntersecting) {
            const url = item.target.getAttribute("data-img");
            item.target.setAttribute("src", url);
        }
    });
}, null); // null como options significa que usa los valores por defecto (root: viewport, rootMargin: 0px, threshold: 0)
```
Luego, dentro de `createMovies`, se asigna el `data-img` y se observa cada imagen:
```javascript
// Desde su código (extracto)
function createMovies(...) {
    // ...
    movieImg.setAttribute(isLazyload ? "data-img" : "src", url); // isLazyload es un booleano
    // ...
    if (lazyLoad) {
        lazyLoader.observe(movieImg);
    }
    // ...
}
```
Esto es un uso directo y efectivo de `IntersectionObserver` para Lazy Loading de las imágenes de películas.

--- 

### Ejemplos Ampliados y Corregidos

```javascript
// Simulación de una galería de imágenes con muchas imágenes
// HTML base para el ejemplo
document.body.innerHTML += `
    <h1>Galería de Imágenes (Lazy Loaded)</h1>
    <div id="gallery-container" style="height: 400px; overflow-y: scroll; border: 1px solid #ccc; padding: 10px;">
        <!-- Imágenes se añadirán aquí dinámicamente -->
    </div>
    <div style="height: 1000px;"></div> <!-- Espacio para hacer scroll -->
`;

const galleryContainer = document.getElementById('gallery-container');

// Generar muchas imágenes para el ejemplo
for (let i = 0; i < 20; i++) {
    const img = document.createElement('img');
    img.setAttribute('data-src', `https://picsum.photos/id/${1000 + i}/300/200`);
    img.src = 'https://via.placeholder.com/300x200/cccccc/ffffff?text=Loading...'; // Placeholder
    img.alt = `Imagen ${i + 1}`;
    img.style.display = 'block';
    img.style.marginBottom = '10px';
    galleryContainer.appendChild(img);
}

// Ejemplo 1: Implementación de Lazy Loading con IntersectionObserver
console.log("--- Lazy Loading con IntersectionObserver ---");

const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src; // Carga la imagen real
                img.removeAttribute('data-src'); // Elimina el atributo para no volver a cargarlo
                observer.unobserve(img); // Deja de observar esta imagen
                console.log(`Imagen cargada: ${img.alt}`);
            }
        }
    });
}, {
    root: galleryContainer, // Observar intersección dentro del div con scroll
    rootMargin: '50px 0px', // Cargar imágenes cuando estén a 50px del borde
    threshold: 0.1 // 10% de la imagen visible
});

// Observar todas las imágenes con data-src dentro de la galería
document.querySelectorAll('#gallery-container img[data-src]').forEach(img => {
    lazyImageObserver.observe(img);
});

console.log("Scroll dentro de la galería para ver las imágenes cargarse.");

// Ejemplo 2: Implementación de un "sticky header" con IntersectionObserver
console.log("\n--- Sticky Header con IntersectionObserver ---");

// HTML de prueba para el ejemplo
document.body.innerHTML += `
    <header id="stickyHeader" style="background-color: #333; color: white; padding: 10px; position: sticky; top: 0; z-index: 100; text-align: center;">
        Este es un Header Sticky
    </header>
    <div id="sentinel" style="height: 1px; background-color: transparent;"></div>
    <div style="height: 1500px; background-color: #f0f0f0; padding: 20px;">
        <p>Contenido debajo del header. Haz scroll.</p>
        <p>El header debería volverse "sticky" cuando el sentinel sale de vista.</p>
    </div>
`;

const stickyHeader = document.getElementById('stickyHeader');
const sentinel = document.getElementById('sentinel'); // Un elemento invisible justo debajo del header

// Crear un observer para el sentinel
const stickyObserver = new IntersectionObserver(
    ([entry]) => {
        // Cuando el sentinel deja de intersectar (sale de la vista), el header se vuelve sticky
        // Cuando el sentinel intersecta (vuelve a la vista), el header deja de ser sticky
        if (entry.isIntersecting) {
            stickyHeader.style.boxShadow = 'none';
        } else {
            stickyHeader.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        }
    },
    {
        root: null, // El viewport del documento
        threshold: 0 // Observar tan pronto como el sentinel esté 0% visible
    }
);

// Observar el sentinel
stickyObserver.observe(sentinel);

console.log("Haz scroll y observa cómo el header añade una sombra al volverse sticky.");
```

--- 

### Ejercicios de Consolidación

1.  **Ejercicio: Lazy Loading de Componentes/Secciones**
    Extienda la idea de Lazy Loading a elementos no-imagen. Imagine que tiene varias secciones complejas en su página que contienen lógica JavaScript pesada (ej. un mapa interactivo, un reproductor de video embebido, un widget de comentarios). Cree un HTML con varias secciones `div` que tienen un atributo `data-load-src` apuntando a un archivo JavaScript (`.js`) que contiene la lógica para inicializar esa sección.
    Implemente un `IntersectionObserver` que, cuando una sección entra en el viewport:
    1.  Cargue dinámicamente el archivo `.js` especificado en `data-load-src` usando `fetch` y `eval()` (solo para este ejercicio, `eval()` es generalmente desaconsejado en producción por seguridad).
    2.  Ejecute la lógica de inicialización contenida en ese `.js`.
    3.  Luego de cargar el script, remueva el atributo `data-load-src` y deje de observar esa sección.

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-M">
        <title>Lazy Load de Componentes</title>
        <style>
            .component-section {
                height: 300px;
                border: 1px solid #ccc;
                margin-bottom: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5em;
                background-color: #f9f9f9;
            }
        </style>
    </head>
    <body>
        <h1>Lazy Load de Componentes Dinámicos</h1>

        <div class="component-section" id="section1">
            Componente 1 (Siempre visible)
        </div>
        <div style="height: 800px;"></div> <!-- Espacio para scroll -->
        <div class="component-section" id="section2" data-load-src="componente2.js">
            Componente 2 (Se carga al hacer scroll)
        </div>
        <div style="height: 800px;"></div> <!-- Espacio para scroll -->
        <div class="component-section" id="section3" data-load-src="componente3.js">
            Componente 3 (Se carga al hacer scroll)
        </div>

        <script>
            // Su código JavaScript para el IntersectionObserver aquí
            // Simulación de los archivos JS de componentes
            // componente2.js contenido: `console.log('Lógica de Componente 2 cargada!'); document.getElementById('section2').textContent = 'Componente 2: ¡Activo!';`
            // componente3.js contenido: `console.log('Lógica de Componente 3 cargada!'); document.getElementById('section3').textContent = 'Componente 3: ¡Listo!';`
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Lazy Loading de Componentes/Secciones

    // Simulación de los archivos JS de componentes (en un entorno real, serían archivos separados)
    const mockComponentScripts = {
        'componente2.js': `console.log('Lógica de Componente 2 cargada!'); document.getElementById('section2').textContent = 'Componente 2: ¡Activo!';`,
        'componente3.js': `console.log('Lógica de Componente 3 cargada!'); document.getElementById('section3').textContent = 'Componente 3: ¡Listo!';`
    };

    const componentObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(async entry => {
            if (entry.isIntersecting) {
                const targetSection = entry.target;
                const scriptSrc = targetSection.getAttribute('data-load-src');

                if (scriptSrc) {
                    try {
                        console.log(`Cargando script para ${targetSection.id} desde ${scriptSrc}`);
                        // En un entorno real, usarías fetch(scriptSrc).then(res => res.text());
                        const scriptCode = mockComponentScripts[scriptSrc]; // Simulación de fetch
                        if (scriptCode) {
                            eval(scriptCode); // ¡Usar eval() con precaución!
                            targetSection.removeAttribute('data-load-src');
                            observer.unobserve(targetSection); // Deja de observar una vez cargado
                        } else {
                            console.error(`Script ${scriptSrc} no encontrado.`);
                        }
                    } catch (error) {
                        console.error(`Error al cargar o ejecutar script para ${targetSection.id}:`, error);
                    }
                }
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // Cargar cuando el 10% de la sección es visible
    });

    document.querySelectorAll('.component-section[data-load-src]').forEach(section => {
        componentObserver.observe(section);
    });
    ```

2.  **Ejercicio: Detección de Visibilidad para Animaciones (con `IntersectionObserver`)**
    Cree un HTML con varios elementos `div` que inicialmente estén ocultos o con una opacidad de `0`. Cuando un `div` entra en el viewport, debe añadirle una clase CSS (ej. `animated-in`) que contenga una animación (ej. `fadeInUp`). Cuando el elemento sale del viewport, debe remover esa clase.

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Animaciones al Scroll</title>
        <style>
            .animated-box {
                height: 200px;
                background-color: #4CAF50;
                color: white;
                margin: 40px auto;
                width: 80%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 2em;
                opacity: 0; /* Inicialmente invisible */
                transform: translateY(50px); /* Inicialmente desplazado */
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            .animated-in {
                opacity: 1;
                transform: translateY(0);
            }
        </style>
    </head>
    <body>
        <h1>Animaciones al Scroll</h1>
        <div style="height: 500px;"></div> <!-- Espacio para scroll -->

        <div class="animated-box">Elemento Animado 1</div>
        <div class="animated-box">Elemento Animado 2</div>
        <div style="height: 600px;"></div> <!-- Espacio para scroll -->
        <div class="animated-box">Elemento Animado 3</div>
        <div class="animated-box">Elemento Animado 4</div>

        <script>
            // Su código JavaScript para el IntersectionObserver aquí
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Detección de Visibilidad para Animaciones (con `IntersectionObserver`)

    const animatedBoxes = document.querySelectorAll('.animated-box');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated-in');
            } else {
                entry.target.classList.remove('animated-in');
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.5 // El 50% del elemento debe ser visible para activar
    });

    animatedBoxes.forEach(box => {
        animationObserver.observe(box);
    });
    ```

--- 

### Glosario Técnico

*   **Performance Web**: La velocidad y eficiencia con la que una aplicación web se carga y responde a las interacciones del usuario.
*   **Lazy Loading (Carga Perezosa)**: Técnica que retrasa la carga de recursos (imágenes, videos, scripts) hasta que son realmente necesarios o visibles en el viewport del usuario.
*   **Eager Loading (Carga Ansiosa)**: Carga de todos los recursos al inicio, independientemente de su visibilidad.
*   **`IntersectionObserver` API**: Web API que proporciona una forma asíncrona y eficiente de detectar cuándo un elemento entra o sale del viewport de otro elemento (o del documento).
*   **`IntersectionObserverEntry`**: Objeto que describe el cambio en la intersección de un elemento observado.
*   **`isIntersecting`**: Propiedad de `IntersectionObserverEntry` que indica si el elemento objetivo está actualmente interceptando con el `root`.
*   **`root`**: El elemento que se usa como viewport para comprobar la intersección. Si es `null`, se usa el viewport del documento.
*   **`rootMargin`**: Margen que se añade alrededor del `root` para aumentar o reducir el área de intersección (ej. "100px 0px").
*   **`threshold`**: Un número o array de números que representa el porcentaje de visibilidad del elemento objetivo que debe alcanzarse para disparar el `callback`.
*   **`observer.observe(target)`**: Inicia la observación de un elemento.
*   **`observer.unobserve(target)`**: Detiene la observación de un elemento específico.
*   **`observer.disconnect()`**: Detiene la observación de todos los elementos por parte de ese observador.
*   **`data-src`**: Atributo HTML personalizado utilizado en Lazy Loading para almacenar la URL real de un recurso, que se carga dinámicamente.
*   **`getBoundingClientRect()`**: Método que devuelve el tamaño de un elemento y su posición relativa al viewport. Era usado en implementaciones antiguas de Lazy Loading, pero es menos eficiente.
*   **Reflow / Repaint**: Procesos de renderizado del navegador. Un "reflow" (o layout) recalcula la geometría de los elementos, mientras que un "repaint" simplemente vuelve a dibujar los píxeles. Ambos son costosos y se minimizan con `IntersectionObserver`.
*   **First Contentful Paint (FCP)**: Métrica de rendimiento que mide el tiempo desde que la página comienza a cargarse hasta que cualquier parte del contenido de la página es visible en la pantalla.
*   **Largest Contentful Paint (LCP)**: Métrica de rendimiento que informa el tiempo de renderizado de la imagen o bloque de texto más grande visible dentro del viewport, siendo una indicación importante del rendimiento de carga percibido.
