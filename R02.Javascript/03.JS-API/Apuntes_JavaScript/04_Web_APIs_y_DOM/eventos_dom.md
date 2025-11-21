# Módulo 04: El Navegador como Entorno de Ejecución

## Tema 4.3: Gestión de Eventos del Usuario

### Clase: Interacciones Dinámicas y Reactivas en la Interfaz de Usuario

Las aplicaciones web modernas no son estáticas; responden a las acciones del usuario, a los cambios del navegador y a otros sucesos. Los **eventos** son la forma en que JavaScript detecta estas ocurrencias y permite ejecutar código en respuesta a ellas. La correcta gestión de eventos es fundamental para crear interfaces de usuario interactivas, accesibles y con una buena experiencia de usuario. Este tema cubrirá los principios de los eventos del DOM, cómo escucharlos, cómo propagarlos y las mejores prácticas para gestionarlos.

#### ¿Qué Son los Eventos del DOM?

Un evento es una señal que indica que algo ha sucedido. En el contexto del navegador, los eventos pueden ser generados por el usuario (ej. un clic de ratón, una pulsación de tecla), por el navegador (ej. la carga de una página, el redimensionamiento de una ventana) o por otros sistemas (ej. eventos de red, eventos multimedia).

Algunos eventos comunes:
*   **Eventos de Ratón**: `click`, `dblclick`, `mousedown`, `mouseup`, `mousemove`, `mouseover`, `mouseout`.
*   **Eventos de Teclado**: `keydown`, `keyup`, `keypress`.
*   **Eventos de Formulario**: `submit`, `focus`, `blur`, `change`, `input`.
*   **Eventos de Documento/Ventana**: `load`, `unload`, `DOMContentLoaded`, `resize`, `scroll`.
*   **Eventos de Media**: `play`, `pause`, `ended`, `canplay`.

#### Registro de Manejadores de Eventos (Event Handlers)

Hay varias formas de registrar una función para que se ejecute cuando ocurre un evento:

1.  **Atributos HTML (NO RECOMENDADO)**:
    Se especifica el manejador directamente en el HTML.
    ```html
    <button onclick="alert('Hola!')">Haz clic</button>
    ```
    *   **Desventajas**: Mezcla HTML y JavaScript, dificulta la legibilidad y el mantenimiento, y es una mala práctica de separación de preocupaciones.

2.  **Propiedades del DOM**:
    Se asigna una función a una propiedad del elemento DOM.
    ```javascript
    const boton = document.getElementById('miBoton');
    boton.onclick = function() {
        console.log("Botón clicado!");
    };
    // Solo se puede asignar un manejador por evento. Si asignas otro, sobrescribirá el anterior.
    ```

3.  **`element.addEventListener(event, handler, options)` (RECOMENDADO)**:
    Es la forma estándar y más potente de registrar manejadores de eventos.
    *   `event`: El nombre del evento (sin el prefijo "on", ej. "click", "keydown").
    *   `handler`: La función que se ejecutará cuando ocurra el evento.
    *   `options` (opcional): Objeto con opciones (`capture`, `once`, `passive`, `signal`).

    ```javascript
    const boton = document.getElementById('miBoton');
    boton.addEventListener('click', () => {
        console.log("Botón clicado con addEventListener!");
    });
    boton.addEventListener('click', () => {
        console.log("Otro manejador para el mismo clic!");
    });
    // Permite múltiples manejadores para el mismo evento en el mismo elemento.
    // Usado extensivamente en su código: searchFormBtn.addEventListener("click", () => { ... });
    ```
    **Removiendo Event Listeners**:
    Es crucial remover los `event listeners` cuando ya no son necesarios (ej. cuando se elimina un elemento del DOM o al cambiar de página en una SPA) para prevenir fugas de memoria. Para remover un listener con `removeEventListener`, la función que se pasó como `handler` debe ser la misma instancia de función.

    ```javascript
    const miFuncionClic = () => console.log("Clic!");
    boton.addEventListener('click', miFuncionClic);
    // ... en algún momento ...
    boton.removeEventListener('click', miFuncionClic);
    // Usado en su código: window.removeEventListener("scroll", infiniteScroll, { passive: false });
    ```

#### El Objeto Evento (`Event Object`)

Cuando un evento se dispara, el manejador recibe un objeto `Event` como argumento. Este objeto contiene información detallada sobre el evento que ocurrió.

Propiedades comunes:
*   `event.type`: Tipo de evento (ej. "click", "keydown").
*   `event.target`: El elemento DOM que originó el evento.
*   `event.currentTarget`: El elemento DOM al que se adjuntó el manejador de eventos.
*   `event.clientX`, `event.clientY`: Coordenadas del ratón relativas a la ventana.
*   `event.key`, `event.code`: Información de la tecla pulsada (para eventos de teclado).
*   `event.preventDefault()`: Detiene la acción por defecto del navegador para el evento (ej. enviar un formulario, seguir un enlace).
*   `event.stopPropagation()`: Detiene la propagación del evento a elementos padre.
*   `event.stopImmediatePropagation()`: Detiene la propagación y la ejecución de otros manejadores en el mismo elemento.

```javascript
document.querySelector('a').addEventListener('click', (event) => {
    event.preventDefault(); // Evita que el navegador siga el enlace
    console.log("No fui a:", event.target.href);
});
```

#### Flujo de Eventos: Bubbling y Capturing

Cuando un evento se dispara en un elemento, no solo se maneja en ese elemento, sino que también se propaga a través del árbol DOM. Este proceso tiene dos fases:

1.  **Capturing (Fase de Captura)**: El evento desciende desde la raíz del DOM (window, document, html, body) hasta el elemento objetivo.
2.  **Bubbling (Fase de Burbujeo)**: El evento asciende desde el elemento objetivo de vuelta a la raíz del DOM.

Por defecto, `addEventListener` registra manejadores en la fase de burbujeo. Para registrar en la fase de captura, se usa `true` como tercer argumento o `{ capture: true }` en las opciones.

```html
<div id="padre">
    <button id="hijo">Clic</button>
</div>
```
```javascript
document.getElementById('padre').addEventListener('click', () => console.log("Clic en Padre (Burbujeo)"));
document.getElementById('hijo').addEventListener('click', () => console.log("Clic en Hijo (Burbujeo)"));
// Salida al hacer clic en 'Hijo':
// Clic en Hijo (Burbujeo)
// Clic en Padre (Burbujeo)

document.getElementById('padre').addEventListener('click', () => console.log("Clic en Padre (Captura)"), true); // O { capture: true }
document.getElementById('hijo').addEventListener('click', () => console.log("Clic en Hijo (Captura)"), true);
// Salida al hacer clic en 'Hijo':
// Clic en Padre (Captura)
// Clic en Hijo (Captura)
```

#### Delegación de Eventos (Event Delegation)

Es una técnica poderosa para optimizar la gestión de eventos, especialmente útil cuando se tienen muchos elementos similares que necesitan el mismo manejador de eventos (ej. una lista larga), o cuando se añaden elementos dinámicamente al DOM.

En lugar de adjuntar un manejador a cada elemento individual, se adjunta un único manejador a un elemento padre común. El manejador del padre utiliza `event.target` para identificar qué elemento hijo específico fue el que disparó el evento.

```html
<ul id="listaItems">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```
```javascript
document.getElementById('listaItems').addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') { // Verifica si el clic fue en un <li>
        console.log("Se hizo clic en:", event.target.textContent);
    }
});

// Ahora, si añadimos un nuevo <li> dinámicamente, no necesitamos adjuntarle un listener
const nuevoLi = document.createElement('li');
nuevoLi.textContent = "Item Dinámico";
document.getElementById('listaItems').appendChild(nuevoLi);
// El manejador del padre funcionará automáticamente para el nuevo item.
// Usado en su código para los botones de eliminar películas favoritas:
// const deleteButtons = document.querySelectorAll(".btnDelete");
// for (const button of deleteButtons) { button.addEventListener("click", ...)}
// Esto puede optimizarse con delegación si la lista es muy grande o dinámica.
```

#### Eventos Personalizados (`CustomEvent`)

JavaScript permite crear y disparar eventos personalizados, lo que es útil para la comunicación entre diferentes módulos de su aplicación, o entre componentes desacoplados.

```javascript
// Crear un evento personalizado
const miEventoPersonalizado = new CustomEvent('misDatosCargados', {
    detail: {
        usuarioId: 123,
        datos: { nombre: "Ana", items: 5 }
    },
    bubbles: true, // El evento burbujeará
    cancelable: true // Se puede cancelar con preventDefault()
});

// Adjuntar un listener al documento o a un elemento específico
document.addEventListener('misDatosCargados', (event) => {
    console.log("Evento personalizado disparado:", event.type);
    console.log("Detalles del evento:", event.detail);
});

// Disparar el evento en un elemento
document.getElementById('algunElemento').dispatchEvent(miEventoPersonalizado);
```

---

### Ejemplos Ampliados y Corregidos

```javascript
// Partes de su código original que usan Event Listeners
// main.js - Manejo de clicks en botones de películas/categorías
// movieContainer.addEventListener("click", () => { location.hash = "#movie=" + movie.id; });
// categoryTitle.addEventListener("click", () => { location.hash = "#category=" + category.id + "-" + category.name; });

// navigation.js - Eventos de la ventana y botones
// searchFormBtn.addEventListener("click", () => { location.hash = "#search=" + searchFormInput.value; });
// trendingBtn.addEventListener("click", () => { location.hash = "#trends"; });
// arrowBtn.addEventListener("click", () => { history.back(); });
// window.addEventListener("DOMContentLoaded", navigator, false);
// window.addEventListener("hashchange", navigator, false);
// window.addEventListener("scroll", infiniteScroll, false);
// window.removeEventListener("scroll", infiniteScroll, { passive: false }); // Remoción de listeners

// Ejemplo 1: Prevención de Comportamiento por Defecto y Propagación
console.log("--- Prevención de Comportamiento y Propagación ---");

// HTML de prueba para este ejemplo
document.body.innerHTML += `
<div id="outerDiv" style="border: 1px solid blue; padding: 20px;">
    Outer Div
    <a href="https://www.google.com" id="myLink" style="display: block; margin-top: 10px;">Ir a Google (enlace)</a>
</div>
`;

const myLink = document.getElementById('myLink');
const outerDiv = document.getElementById('outerDiv');

myLink.addEventListener('click', (event) => {
    console.log("Clic en el enlace!");
    event.preventDefault(); // Previene la navegación
    event.stopPropagation(); // Detiene el burbujeo a outerDiv
});

outerDiv.addEventListener('click', () => {
    console.log("Clic en el div exterior!");
});

// Si haces clic en el enlace:
// Clic en el enlace!
// (El clic en el div exterior no se muestra debido a stopPropagation())


// Ejemplo 2: Delegación de Eventos en una Lista Dinámica
console.log("\n--- Delegación de Eventos ---");

// HTML de prueba para este ejemplo
document.body.innerHTML += `
<ul id="dynamicList" style="border: 1px solid green; padding: 10px; margin-top: 20px;">
    <li>Item estático 1</li>
    <li>Item estático 2</li>
</ul>
<button id="addItemButton">Añadir Item</button>
`;

const dynamicList = document.getElementById('dynamicList');
const addItemButton = document.getElementById('addItemButton');
let itemCount = 2;

// Un solo manejador para todos los clics en la lista
dynamicList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') { // Verifica si el clic fue en un <li>
        console.log(`Clic delegado en: ${event.target.textContent}`);
        event.target.style.backgroundColor = '#e0ffe0'; // Cambia el color del item clicado
    }
});

addItemButton.addEventListener('click', () => {
    itemCount++;
    const newItem = document.createElement('li');
    newItem.textContent = `Item dinámico ${itemCount}`;
    dynamicList.appendChild(newItem);
    console.log(`Añadido: Item dinámico ${itemCount}`);
});

// Haz clic en los items existentes y luego añade nuevos items y clica en ellos.
// Verás que el manejador delegado funciona para todos.
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Interacción con Teclado (Captura de Entrada)**
    Cree un `input` de tipo texto en el HTML. Luego, cree una función en JavaScript que se ejecute cada vez que el usuario presiona una tecla en ese `input`. Esta función debe:
    1.  Imprimir en la consola el carácter de la tecla presionada (`event.key`).
    2.  Si la tecla presionada es "Enter", debe prevenir la acción por defecto (si la hubiera, como enviar un formulario) y limpiar el contenido del `input`.
    3.  Asegúrese de adjuntar el listener de forma eficiente.

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Evento de Teclado</title>
    </head>
    <body>
        <h1>Entrada de Texto</h1>
        <input type="text" id="myInput" placeholder="Escribe aquí y presiona Enter">

        <script>
            // Su código aquí
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Interacción con Teclado (Captura de Entrada)

    const myInput = document.getElementById('myInput');

    myInput.addEventListener('keydown', (event) => {
        console.log("tecla presionada:", event.key);

        if (event.key === 'Enter') {
            event.preventDefault(); // Evita la acción por defecto (ej. submit si es parte de un form)
            myInput.value = '';     // Limpia el input
            console.log("Enter presionado, input limpiado.");
        }
    });
    ```

2.  **Ejercicio: Validación de Formulario con Delegación y `preventDefault`**
    Cree un formulario HTML simple con un `input` de email y un botón de `submit`. Use JavaScript para validar que el `input` de email no esté vacío antes de enviar el formulario. Implemente la validación usando delegación de eventos en el formulario. Si el email está vacío, debe mostrar una alerta al usuario y prevenir el envío del formulario.

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Validación de Formulario</title>
    </head>
    <body>
        <h1>Validación de Contacto</h1>
        <form id="myForm">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br><br>
            <button type="submit">Enviar</button>
        </form>

        <script>
            // Su código aquí
        </script>
    </body>
    </html>
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Validación de Formulario con Delegación y `preventDefault`

    const myForm = document.getElementById('myForm');
    const emailInput = document.getElementById('email');

    myForm.addEventListener('submit', (event) => {
        // Prevenir el envío por defecto del formulario
        event.preventDefault();

        if (emailInput.value.trim() === '') {
            alert('El campo de email no puede estar vacío.');
            emailInput.focus(); // Enfocar el input para que el usuario lo corrija
        } else {
            alert('Formulario enviado exitosamente (simulado)!');
            // Aquí se enviaría el formulario real o se haría una petición AJAX
            // event.target.submit(); // Para enviar el formulario de forma programática
        }
    });
    ```

---

### Glosario Técnico

*   **Evento**: Señal que indica que algo ha sucedido en el navegador o en el DOM.
*   **Manejador de Eventos (Event Handler)**: Función que se ejecuta en respuesta a un evento.
*   **`addEventListener()`**: Método preferido para adjuntar manejadores de eventos a elementos.
*   **`removeEventListener()`**: Método para eliminar manejadores de eventos.
*   **`Event Object`**: Objeto que se pasa al manejador de eventos, conteniendo información sobre el evento.
*   **`event.target`**: El elemento DOM que disparó el evento.
*   **`event.currentTarget`**: El elemento DOM al que el manejador de eventos fue adjuntado.
*   **`event.preventDefault()`**: Detiene la acción por defecto del navegador para un evento.
*   **`event.stopPropagation()`**: Detiene la propagación de un evento a elementos padre.
*   **`event.stopImmediatePropagation()`**: Detiene la propagación y la ejecución de otros manejadores en el mismo elemento.
*   **Bubbling (Burbujeo)**: Fase de propagación de eventos donde el evento asciende desde el elemento objetivo hacia la raíz del DOM.
*   **Capturing (Captura)**: Fase de propagación de eventos donde el evento desciende desde la raíz del DOM hacia el elemento objetivo.
*   **Delegación de Eventos**: Técnica de optimización donde un único manejador de eventos en un elemento padre gestiona eventos de múltiples elementos hijos, utilizando `event.target`.
*   **`CustomEvent`**: Constructor para crear y disparar eventos personalizados en el DOM.
*   **`dispatchEvent()`**: Método para disparar un evento en un elemento.
*   **`DOMContentLoaded`**: Evento que se dispara cuando el documento HTML ha sido completamente cargado y parseado.
*   **Fugas de Memoria**: Ocurren si los `event listeners` no se eliminan correctamente, manteniendo referencias a objetos que ya no se usan.

```