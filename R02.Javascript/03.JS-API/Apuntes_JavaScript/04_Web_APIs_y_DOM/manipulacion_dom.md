# Módulo 04: El Navegador como Entorno de Ejecución

## Tema 4.2: Manipulación Avanzada del DOM

### Clase: Interacción Dinámica y Eficiente con la Estructura Web

El **Document Object Model (DOM)** es la interfaz que permite a JavaScript interactuar con el contenido, la estructura y el estilo de una página web. Una manipulación eficiente y consciente del DOM es crucial para construir interfaces de usuario dinámicas y reactivas. Este tema profundiza en las técnicas avanzadas para seleccionar elementos, modificar su contenido y atributos, gestionar clases CSS y optimizar el rendimiento al realizar múltiples cambios en el DOM.

#### Seleccionando Elementos del DOM

La selección de elementos es el primer paso para cualquier manipulación del DOM.

1.  **`document.getElementById(id)`**:
    *   Selecciona un único elemento por su atributo `id`.
    *   Es el método más rápido, pero solo funciona con IDs.

    ```javascript
    const titulo = document.getElementById('titulo');
    console.log(titulo.textContent);
    ```

2.  **`document.getElementsByClassName(className)`**:
    *   Devuelve una `HTMLCollection` (similar a un array) de todos los elementos que tienen una clase CSS específica.
    *   Es una colección "viva", lo que significa que se actualiza automáticamente si se añaden o eliminan elementos que coincidan.

    ```javascript
    const parrafos = document.getElementsByClassName('parrafo');
    console.log(parrafos[0].textContent);
    ```

3.  **`document.getElementsByTagName(tagName)`**:
    *   Devuelve una `HTMLCollection` de todos los elementos con un nombre de etiqueta específico.
    *   También es una colección "viva".

    ```javascript
    const divs = document.getElementsByTagName('div');
    ```

4.  **`document.querySelector(selector)`**:
    *   Devuelve el **primer** elemento que coincide con el selector CSS especificado.
    *   Es muy versátil, ya que acepta cualquier selector CSS (`#id`, `.clase`, `tag`, `[attr="value"]`, etc.).

    ```javascript
    const primerParrafo = document.querySelector('.parrafo');
    const inputBusqueda = document.querySelector('#searchForm input'); // Usado en su código
    ```

5.  **`document.querySelectorAll(selector)`**:
    *   Devuelve una `NodeList` de **todos** los elementos que coinciden con el selector CSS especificado.
    *   Es una colección "estática", lo que significa que no se actualiza automáticamente si los elementos cambian después de la consulta. A menudo se convierte a un array para usar métodos de array (`Array.from(nodeList)` o `[...nodeList]`).

    ```javascript
    const todosLosEnlaces = document.querySelectorAll('a');
    todosLosEnlaces.forEach(enlace => console.log(enlace.href));
    ```

#### Manipulando Contenido y Atributos

1.  **`element.textContent`**:
    *   Obtiene o establece el contenido de texto de un nodo, ignorando el HTML.
    *   Seguro contra ataques XSS.

    ```javascript
    titulo.textContent = "Nuevo Título";
    ```

2.  **`element.innerHTML`**:
    *   Obtiene o establece el contenido HTML de un nodo.
    *   Puede ser peligroso si se inserta contenido generado por el usuario (riesgo XSS).

    ```javascript
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = '<h2>Subtítulo</h2><p>Contenido nuevo.</p>';
    // Usado en su código para renderizar listas de películas/gatos: content.innerHTML = view;
    ```

3.  **`element.setAttribute(name, value)` / `element.getAttribute(name)`**:
    *   Establece o obtiene el valor de un atributo HTML.

    ```javascript
    const imagen = document.querySelector('img');
    imagen.setAttribute('src', 'nueva-imagen.jpg');
    console.log(imagen.getAttribute('alt'));
    // Usado en su código: movieImg.setAttribute("src", url); movieImg.setAttribute("alt", title);
    ```

4.  **`element.classList`**:
    *   Propiedad que devuelve un objeto `DOMTokenList` para manipular las clases CSS de un elemento de manera fácil y segura.
    *   Métodos: `add()`, `remove()`, `toggle()`, `contains()`.

    ```javascript
    titulo.classList.add('resaltado');
    titulo.classList.remove('oculto');
    if (titulo.classList.contains('activo')) {
        titulo.classList.toggle('activo');
    }
    // Usado en su código: headerSection.classList.add("header-container--long");
    ```

5.  **`element.style`**:
    *   Permite acceder y modificar propiedades CSS directamente en línea.
    *   Las propiedades CSS se escriben en formato `camelCase` (ej. `backgroundColor` en lugar de `background-color`).

    ```javascript
    titulo.style.color = 'blue';
    titulo.style.fontSize = '24px';
    // Usado en su código: headerSection.style.background = `url(${movieImgUrl})`;
    ```

#### Creando y Eliminando Elementos

1.  **`document.createElement(tagName)`**:
    *   Crea un nuevo elemento HTML con el nombre de etiqueta especificado.
    *   El elemento aún no está en el DOM.

    ```javascript
    const nuevoDiv = document.createElement('div');
    ```

2.  **`document.createTextNode(text)`**:
    *   Crea un nuevo nodo de texto.

    ```javascript
    const texto = document.createTextNode('Este es un nuevo texto.');
    ```

3.  **`parent.appendChild(child)`**:
    *   Añade un nodo como último hijo de un nodo padre.

    ```javascript
    nuevoDiv.appendChild(texto);
    document.body.appendChild(nuevoDiv); // Añade el div al body
    // Usado en su código: movieContainer.appendChild(movieImg); trendingMoviesPreviewList.appendChild(movieContainer);
    ```

4.  **`parent.insertBefore(newNode, referenceNode)`**:
    *   Inserta un nodo antes de un nodo de referencia como hijo del nodo padre.

5.  **`parent.removeChild(child)`**:
    *   Elimina un nodo hijo especificado del DOM.

    ```javascript
    const elementoAEliminar = document.getElementById('alerta');
    if (elementoAEliminar) {
        elementoAEliminar.parentNode.removeChild(elementoAEliminar);
    }
    ```

#### Optimización del Rendimiento en Manipulación del DOM

La manipulación directa del DOM puede ser costosa en términos de rendimiento, ya que cada cambio puede desencadenar un repintado y un redibujado del navegador. Para optimizar:

1.  **Minimizar Operaciones de Lectura/Escritura**: Las lecturas y escrituras del DOM deben agruparse para evitar "reflows" y "repaints" repetidos.
2.  **Fragmentos de Documento (`DocumentFragment`)**:
    *   Cree y manipule elementos fuera del DOM principal utilizando `document.createDocumentFragment()`.
    *   Añada todos los elementos al fragmento y luego inserte el fragmento completo en el DOM en una única operación.

    ```javascript
    const fragmento = document.createDocumentFragment();
    for (let i = 0; i < 1000; i++) {
        const p = document.createElement('p');
        p.textContent = `Párrafo ${i}`;
        fragmento.appendChild(p);
    }
    document.body.appendChild(fragmento); // Una sola inserción en el DOM
    ```

3.  **Desacoplar el DOM del Código**: Utilice bibliotecas como React, Vue o Angular, que implementan un "Virtual DOM" para optimizar estas operaciones automáticamente. Si no usa un framework, intente abstraer las operaciones del DOM en funciones auxiliares.

#### Selección y creación de elementos en su código

Sus archivos `13.Api-Rest-2/src/js/node.js` y `14.Api-Rest-3/App/src/nodes.js` son claros ejemplos de la práctica de centralizar la selección de elementos del DOM. Esto mejora la legibilidad y facilita el mantenimiento, ya que todos los selectores están en un solo lugar.

Las funciones como `createMovies` y `createCategories` en `14.Api-Rest-3/App/src/main.js` ilustran la creación dinámica de elementos HTML mediante `document.createElement()`, `appendChild()`, `setAttribute()`, y la manipulación de `classList`. Esta es una práctica excelente para renderizar contenido basado en datos de manera eficiente.

---

### Ejemplos Ampliados y Corregidos

```javascript
// Ejemplo 1: Selección Avanzada con querySelectorAll y Array.from
console.log("--- Selección Avanzada ---");
// Suponemos que tenemos algunos elementos en el HTML:
/*
<div class="card">Item 1</div>
<div class="card active">Item 2</div>
<div class="card">Item 3</div>
*/
// HTML actual para simulación
document.body.innerHTML += `
    <div id="contenedor-items">
        <div class="card">Item 1</div>
        <div class="card active">Item 2</div>
        <div class="card">Item 3</div>
    </div>
    <button id="toggleButton">Toggle Items</button>
`;

const todasLasTarjetas = document.querySelectorAll('.card');
console.log(`Número de tarjetas: ${todasLasTarjetas.length}`); // 3 (NodeList estática)

// Convertir NodeList a Array para usar métodos de Array
Array.from(todasLasTarjetas).filter(card => card.classList.contains('active'))
                            .forEach(activeCard => console.log('Tarjeta activa:', activeCard.textContent));

// Ejemplo 2: Manipulación Dinámica de Elementos con DocumentFragment
console.log("\n--- Manipulación con DocumentFragment ---");
const listaDinamica = document.createElement('ul');
const fragmentoDocumento = document.createDocumentFragment(); // Crea un fragmento
const datos = ['Elemento A', 'Elemento B', 'Elemento C', 'Elemento D'];

datos.forEach(itemText => {
    const li = document.createElement('li');
    li.textContent = itemText;
    fragmentoDocumento.appendChild(li); // Añade al fragmento, no al DOM directo
});

listaDinamica.appendChild(fragmentoDocumento); // Una sola inserción al DOM
document.body.appendChild(listaDinamica);
console.log("Lista dinámica añadida al DOM.");

// Ejemplo 3: Modificación de Estilos en Línea y Clases
console.log("\n--- Modificación de Estilos y Clases ---");
const toggleButton = document.getElementById('toggleButton');
const contenedorItems = document.getElementById('contenedor-items');

toggleButton.addEventListener('click', () => {
    contenedorItems.classList.toggle('oculto'); // Suponiendo una clase CSS 'oculto'
    if (contenedorItems.classList.contains('oculto')) {
        contenedorItems.style.backgroundColor = '#fdd';
        console.log("Items ocultos y fondo rojo.");
    } else {
        contenedorItems.style.backgroundColor = ''; // Elimina el estilo en línea
        console.log("Items visibles y fondo normal.");
    }
});
// Para que funcione, añadir un CSS .oculto { display: none; }
// simulado:
const style = document.createElement('style');
style.textContent = '.oculto { display: none; }';
document.head.appendChild(style);
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Galería de Imágenes Dinámica**
    Cree una función `crearGaleria(urlsImagenes, contenedorId)` que reciba un array de URLs de imágenes y el `id` de un contenedor existente en el HTML. La función debe:
    1.  Obtener el contenedor por su `id`.
    2.  Por cada URL en el array, crear un elemento `<img>`.
    3.  Asignar la URL como `src` y un texto alternativo genérico (ej. "Imagen de la galería").
    4.  Añadir una clase CSS `galeria-img` a cada imagen.
    5.  Añadir todas las imágenes al contenedor de forma eficiente (usando `DocumentFragment`).

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Galería Dinámica</title>
        <style>
            #galeria-container {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-top: 20px;
            }
            .galeria-img {
                width: 150px;
                height: 150px;
                object-fit: cover;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <h1>Mi Galería de Imágenes</h1>
        <div id="galeria-container"></div>

        <script>
            const urls = [
                "https://picsum.photos/id/237/150/150",
                "https://picsum.photos/id/238/150/150",
                "https://picsum.photos/id/239/150/150",
                "https://picsum.photos/id/240/150/150"
            ];

            function crearGaleria(urlsImagenes, contenedorId) {
                // Su código aquí
            }

            crearGaleria(urls, "galeria-container");
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Galería de Imágenes Dinámica

    function crearGaleria(urlsImagenes, contenedorId) {
        const contenedor = document.getElementById(contenedorId);
        if (!contenedor) {
            console.error(`Contenedor con ID '${contenedorId}' no encontrado.`);
            return;
        }

        const fragmento = document.createDocumentFragment();

        urlsImagenes.forEach((url, index) => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = `Imagen de la galería ${index + 1}`;
            img.classList.add('galeria-img');
            fragmento.appendChild(img);
        });

        contenedor.appendChild(fragmento);
    }

    const urls = [
        "https://picsum.photos/id/237/150/150",
        "https://picsum.photos/id/238/150/150",
        "https://picsum.photos/id/239/150/150",
        "https://picsum.photos/id/240/150/150"
    ];
    crearGaleria(urls, "galeria-container");
    ```

2.  **Ejercicio: Contador de Caracteres en un `textarea`**
    Cree un `textarea` y un `span` en el HTML. Luego, usando JavaScript, implemente una funcionalidad que muestre en el `span` el número de caracteres que el usuario ha escrito en el `textarea` en tiempo real. Además, si el número de caracteres excede 100, el `textarea` debe volverse de color rojo, de lo contrario, debe ser blanco.

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Contador de Caracteres</title>
        <style>
            textarea {
                width: 300px;
                height: 100px;
                margin-bottom: 10px;
                border: 1px solid #ccc;
            }
            .exceso-caracteres {
                background-color: #ffe0e0;
                border-color: red;
            }
        </style>
    </head>
    <body>
        <h1>Contador de Caracteres</h1>
        <textarea id="myTextarea" maxlength="200"></textarea><br>
        <span id="charCount">0 caracteres</span>

        <script>
            // Su código aquí
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Contador de Caracteres en un `textarea`

    const myTextarea = document.getElementById('myTextarea');
    const charCountSpan = document.getElementById('charCount');
    const limiteCaracteres = 100;

    myTextarea.addEventListener('input', () => {
        const longitudActual = myTextarea.value.length;
        charCountSpan.textContent = `${longitudActual} caracteres`;

        if (longitudActual > limiteCaracteres) {
            myTextarea.classList.add('exceso-caracteres');
            charCountSpan.style.color = 'red'; // También podemos cambiar el color del span
        } else {
            myTextarea.classList.remove('exceso-caracteres');
            charCountSpan.style.color = 'black';
        }
    });

    // Inicializar el contador al cargar la página
    charCountSpan.textContent = `${myTextarea.value.length} caracteres`;
    ```

---

### Glosario Técnico

*   **DOM (Document Object Model)**: Interfaz de programación para documentos HTML que permite a JavaScript acceder y manipular su contenido.
*   **`document`**: Objeto global que representa el documento HTML cargado en el navegador.
*   **`getElementById()`**: Método para seleccionar un elemento por su atributo `id`.
*   **`getElementsByClassName()`**: Devuelve una `HTMLCollection` de elementos con una clase específica.
*   **`getElementsByTagName()`**: Devuelve una `HTMLCollection` de elementos con una etiqueta específica.
*   **`querySelector()`**: Devuelve el primer elemento que coincide con un selector CSS.
*   **`querySelectorAll()`**: Devuelve una `NodeList` de todos los elementos que coinciden con un selector CSS.
*   **`HTMLCollection`**: Colección "viva" de elementos DOM.
*   **`NodeList`**: Colección "estática" de nodos DOM.
*   **`element.textContent`**: Propiedad para obtener o establecer el contenido de texto de un elemento.
*   **`element.innerHTML`**: Propiedad para obtener o establecer el contenido HTML de un elemento.
*   **`element.setAttribute()` / `element.getAttribute()`**: Métodos para manipular atributos HTML.
*   **`element.classList`**: Objeto `DOMTokenList` para gestionar clases CSS (`add`, `remove`, `toggle`).
*   **`element.style`**: Propiedad para acceder y modificar estilos CSS en línea.
*   **`document.createElement()`**: Crea un nuevo elemento HTML.
*   **`document.createTextNode()`**: Crea un nuevo nodo de texto.
*   **`parent.appendChild()`**: Añade un nodo como último hijo.
*   **`parent.insertBefore()`**: Inserta un nodo antes de un nodo de referencia.
*   **`parent.removeChild()`**: Elimina un nodo hijo.
*   **`DocumentFragment`**: Un nodo ligero que sirve como contenedor temporal para construir un subárbol del DOM de forma eficiente antes de insertarlo en el documento real en una única operación.
*   **XSS (Cross-Site Scripting)**: Tipo de vulnerabilidad de seguridad web donde un atacante inyecta scripts maliciosos en páginas web vistas por otros usuarios. Relevante al usar `innerHTML`.
*   **Reflow / Repaint**: Procesos de renderizado del navegador que se activan al cambiar la geometría (reflow) o el estilo (repaint) de los elementos del DOM, impactando el rendimiento. Minimizarlos es clave.
