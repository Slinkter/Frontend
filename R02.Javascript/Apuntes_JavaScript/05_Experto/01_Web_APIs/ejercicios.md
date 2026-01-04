# Ejercicios: Web APIs

## Ejercicio 1: Manipulación del DOM

Crea una función `crearLista(array, contenedorId)` que reciba un array de strings y el ID de un elemento contenedor. La función debe:

1. Limpiar el contenedor.
2. Crear una lista `ul`.
3. Por cada string, crear un `li` y agregarlo al `ul`.
4. Agregar el `ul` al contenedor.

```javascript
// HTML asume: <div id="app"></div>
const frutas = ["Manzana", "Pera", "Uva"];

// Tu código
```

<details>
<summary>Ver Solución</summary>

```javascript
/**
 * Genera una lista desordenada (ul) a partir de un array y la inserta en el DOM.
 * Utiliza DocumentFragment para minimizar el reflow y mejorar el rendimiento.
 *
 * @param {string[]} items - Array de strings con los contenidos de la lista.
 * @param {string} containerId - ID del elemento DOM donde se insertará la lista.
 * @returns {void}
 */
function crearLista(items, containerId) {
  const contenedor = document.getElementById(containerId);
  if (!contenedor) return;

  contenedor.innerHTML = ""; // Limpiar

  const ul = document.createElement("ul");
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    fragment.appendChild(li);
  });

  ul.appendChild(fragment);
  contenedor.appendChild(ul);
}
```

</details>

## Ejercicio 2: Persistencia

Crea una función que guarde el tema actual ("light" o "dark") en LocalStorage cada vez que se cambie. Y otra función que al cargar la página lea esa preferencia y la retorne.

```javascript
// Tu código
```

<details>
<summary>Ver Solución</summary>

```javascript
/**
 * Guarda la preferencia de tema del usuario en el almacenamiento local.
 * @param {('light'|'dark')} tema - El tema a guardar.
 */
function guardarTema(tema) {
  localStorage.setItem("temaPrefix_ui", tema);
}

/**
 * Recupera la preferencia de tema del usuario.
 * @returns {string} El tema guardado o 'light' por defecto.
 */
function cargarTema() {
  return localStorage.getItem("temaPrefix_ui") || "light";
}
```

</details>
