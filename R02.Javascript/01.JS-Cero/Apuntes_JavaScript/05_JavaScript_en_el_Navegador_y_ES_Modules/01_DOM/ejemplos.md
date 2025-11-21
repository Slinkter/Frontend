# Ejemplos Prácticos: Manipulación del DOM

Estos ejemplos se basan en el archivo `index.html` adjunto. Para probarlos, puedes copiar el código JavaScript en una etiqueta `<script>` al final del `<body>` de ese archivo.

## 1. Selección de Elementos

`querySelector` y `querySelectorAll` son las herramientas preferidas para encontrar elementos en el DOM.

```javascript
// Ejemplo 1: Seleccionando elementos
// Seleccionar por ID
const titulo = document.querySelector('#main-title');
console.log(titulo);

// Seleccionar por clase
const intro = document.querySelector('.intro');
console.log(intro);

// Seleccionar por etiqueta (devuelve el primero)
const primerParrafo = document.querySelector('p');
console.log(primerParrafo);

// Seleccionar todos los items de una lista
const items = document.querySelectorAll('#item-list li');
console.log(items); // Devuelve una NodeList
```

## 2. Modificación de Contenido y Estilos

Una vez que tienes un elemento, puedes cambiar su contenido, clases, estilos y atributos.

```javascript
// Ejemplo 2: Modificando el contenido
// Usando textContent (seguro)
titulo.textContent = '¡Hola, DOM!';

// Usando innerHTML (cuidado con el contenido de usuario)
const container = document.querySelector('#container');
// container.innerHTML = '<h2>Nuevo subtítulo</h2><p>Contenido reemplazado.</p>';

// Ejemplo 3: Modificando clases y estilos
// classList es la forma moderna de manejar clases
titulo.classList.add('highlight');

// Manipulación directa de estilos (inline styles)
intro.style.color = 'blue';
intro.style.fontSize = '18px';
```

## 3. Creación y Adición de Nuevos Elementos

Este es el flujo para añadir contenido dinámicamente a la página.

```javascript
// Ejemplo 4: Añadir un nuevo item a la lista
const lista = document.querySelector('#item-list');

// 1. Crear el nuevo elemento
const nuevoItem = document.createElement('li');

// 2. Configurar su contenido
nuevoItem.textContent = 'Item 4 (nuevo)';

// 3. Añadirlo al DOM
lista.appendChild(nuevoItem);
```

## 4. Manejo de Eventos con `addEventListener`

Así es como hacemos que la página sea interactiva.

```javascript
// Ejemplo 5: Listener para el botón "Añadir Item"
const botonAnadir = document.querySelector('#add-item-btn');

botonAnadir.addEventListener('click', () => {
  const itemCount = lista.children.length;
  const itemParaAnadir = document.createElement('li');
  itemParaAnadir.textContent = `Item ${itemCount + 1} (dinámico)`;
  lista.appendChild(itemParaAnadir);
});

// Ejemplo 6: Listener para el botón "Resaltar"
const botonResaltar = document.querySelector('#toggle-highlight-btn');

botonResaltar.addEventListener('click', () => {
  // .toggle() añade la clase si no está, y la quita si ya está.
  titulo.classList.toggle('highlight');
});
```

## 5. Delegación de Eventos (Event Delegation)

Este es un patrón avanzado y muy eficiente para manejar eventos en listas o elementos dinámicos.

```javascript
// Ejemplo 7: En lugar de añadir un listener a cada 'li',
// añadimos uno solo a su contenedor 'ul'.
const listaItems = document.querySelector('#item-list');

listaItems.addEventListener('click', (evento) => {
  // Comprobamos si el elemento que originó el clic es un LI
  if (evento.target && evento.target.tagName === 'LI') {
    // evento.target es el 'li' específico que fue clickeado
    const itemClickeado = evento.target;
    console.log(`Clickeaste en: ${itemClickeado.textContent}`);
    itemClickeado.style.textDecoration = 'line-through'; // Tachar el item
  }
});
```
Con este único listener en `<ul>`, cualquier `<li>` que se añada en el futuro (como con el botón "Añadir Item") funcionará automáticamente con este evento de clic, sin necesidad de añadirle un nuevo listener.
