# Glosario de Términos: DOM (Document Object Model)

### DOM (Document Object Model)
**Definición:** Una interfaz de programación (API) para documentos HTML y XML. Representa la estructura del documento como un árbol de objetos, donde cada nodo del árbol corresponde a una parte del documento (como un elemento, un atributo o un texto). El DOM permite a los lenguajes de scripting como JavaScript leer y manipular dinámicamente el contenido, la estructura y el estilo de un documento.

### `document`
**Definición:** Un objeto global, disponible en el entorno del navegador, que representa la raíz del árbol del DOM para la página actual. Es el punto de entrada principal para acceder y manipular cualquier parte de la página.

### Nodo (Node)
**Definición:** El término genérico para cualquier objeto en el árbol del DOM. Hay varios tipos de nodos, incluyendo:
- **Element Node (Nodo de Elemento):** Representa una etiqueta HTML, como `<div>`, `<p>`, `<a>`.
- **Text Node (Nodo de Texto):** Representa el contenido de texto dentro de un elemento.
- **Attribute Node (Nodo de Atributo):** Representa un atributo de un elemento (aunque rara vez se manipulan directamente).
- **Comment Node (Nodo de Comentario):** Representa un comentario HTML (`<!-- ... -->`).

### Elemento (Element)
**Definición:** Un tipo específico de nodo que representa una etiqueta HTML. Los elementos son los nodos con los que más se interactúa en la manipulación del DOM.

### Selección de Elementos (Element Selection)
**Definición:** El proceso de obtener una referencia a uno o más nodos de elemento del DOM para poder manipularlos.
- **`document.getElementById('id')`**: Selecciona el único elemento con un `id` específico. Es el método más rápido.
- **`document.getElementsByClassName('clase')`**: Devuelve una **HTMLCollection** (una colección viva, similar a un array) de todos los elementos que tienen una clase específica.
- **`document.getElementsByTagName('tag')`**: Devuelve una **HTMLCollection** de todos los elementos con un nombre de etiqueta específico (e.g., `'p'`).
- **`document.querySelector('selector')`**: Devuelve el **primer** elemento del documento que coincide con un selector CSS especificado. Es muy versátil.
- **`document.querySelectorAll('selector')`**: Devuelve una **NodeList** (una colección estática, similar a un array) de todos los elementos que coinciden con un selector CSS.

### HTMLCollection vs. NodeList
**Definición:** Colecciones de nodos similares a arrays pero con diferencias clave.
- **HTMLCollection (Viva/Live):** Se actualiza automáticamente si se añaden o eliminan elementos del DOM que coincidan con el selector original. Devuelta por `getElementsByClassName` o `getElementsByTagName`.
- **NodeList (Estática/Static):** Generalmente estática. No se actualiza si el DOM cambia. Devuelta por `querySelectorAll`. Contiene no solo nodos de elemento, sino cualquier tipo de nodo.

### Manipulación del DOM
**Definición:** El proceso de cambiar la estructura, el contenido o el estilo de un documento después de que se ha cargado.
- **Creación de Elementos:** `document.createElement('tag')`
- **Añadir Elementos:**
  - `parentNode.appendChild(childNode)`: Añade un nodo al final de la lista de hijos de un padre.
  - `parentNode.insertBefore(newNode, referenceNode)`: Inserta un nodo antes de otro nodo de referencia.
- **Eliminar Elementos:** `parentNode.removeChild(childNode)` o `childNode.remove()` (más moderno).
- **Modificar Contenido:**
  - `element.textContent`: Obtiene o establece el contenido de texto de un nodo y sus descendientes. Es más seguro y performante que `innerHTML`.
  - `element.innerHTML`: Obtiene o establece el contenido HTML de un elemento. **Peligroso** si se usa con contenido de usuario no saneado, ya que puede llevar a ataques de Cross-Site Scripting (XSS).
- **Modificar Estilos:** `element.style.property = 'value'` (e.g., `element.style.color = 'red'`).
- **Modificar Atributos:** `element.setAttribute('attr', 'value')`, `element.getAttribute('attr')`.
- **Modificar Clases:** `element.classList.add('clase')`, `element.classList.remove('clase')`, `element.classList.toggle('clase')`.

### Evento (Event)
**Definición:** Una acción o suceso que ocurre en el navegador, como un clic de ratón, la pulsación de una tecla, o la finalización de la carga de una página.

### Manejador de Eventos (Event Handler / Event Listener)
**Definición:** Una función que se ejecuta en respuesta a un evento específico que ocurre en un elemento específico.
- **`element.addEventListener('eventType', callback)`**: El método moderno y recomendado para registrar un manejador de eventos. Permite registrar múltiples manejadores para el mismo evento en el mismo elemento.
  - `eventType`: Un string que representa el tipo de evento (e.g., `'click'`, `'keydown'`, `'submit'`).
  - `callback`: La función que se ejecutará cuando el evento ocurra.

### Propagación de Eventos (Event Propagation)
**Definición:** El mecanismo que define cómo los eventos se propagan a través del DOM. Tiene dos fases principales:
1.  **Capturing Phase (Fase de Captura):** El evento viaja desde el nodo raíz (`window`) hacia abajo hasta el elemento objetivo.
2.  **Bubbling Phase (Fase de Burbujeo):** El evento "burbujea" desde el elemento objetivo hacia arriba hasta el nodo raíz.
Por defecto, `addEventListener` registra los manejadores en la fase de burbujeo.
