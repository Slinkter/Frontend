# Ejercicios Propuestos: DOM

Para estos ejercicios, puedes usar el archivo `index.html` creado para los ejemplos o crear un HTML simple que contenga los elementos necesarios.

## Ejercicio 1: Creación de una Lista de Tareas (To-Do List)

**Objetivo:** Combinar la selección, creación de elementos y manejo de eventos para crear una aplicación interactiva simple.

**Instrucciones:**
Crea una pequeña lista de tareas. Debes tener:
1.  Un campo de texto (`<input type="text">`) para escribir la nueva tarea.
2.  Un botón (`<button>`) para añadir la tarea.
3.  Una lista vacía (`<ul>`) donde aparecerán las tareas.

La funcionalidad debe ser:
-   Cuando el usuario escriba algo en el input y haga clic en el botón, se debe crear un nuevo `<li>` con el texto del input y añadirse a la lista `<ul>`.
-   El campo de texto debe limpiarse después de añadir la tarea.
-   Si el campo de texto está vacío, no se debe añadir ninguna tarea.

**HTML de base:**
```html
<input type="text" id="new-task-input" placeholder="Nueva tarea...">
<button id="add-task-btn">Añadir Tarea</button>
<ul id="task-list"></ul>
```

<details>
<summary>Solución Razonada</summary>

```javascript
// 1. Seleccionar los elementos del DOM con los que vamos a trabajar.
const taskInput = document.querySelector('#new-task-input');
const addButton = document.querySelector('#add-task-btn');
const taskList = document.querySelector('#task-list');

// 2. Crear la función que se ejecutará al hacer clic en el botón.
function addTask() {
  // 3. Obtener el valor del input y quitar espacios en blanco.
  const taskText = taskInput.value.trim();

  // 4. Validar que el texto no esté vacío (guarda).
  if (taskText === '') {
    alert('Por favor, escribe una tarea.');
    return;
  }

  // 5. Crear el nuevo elemento 'li'.
  const newTask = document.createElement('li');
  
  // 6. Asignar el texto de la tarea.
  newTask.textContent = taskText;

  // 7. Añadir el 'li' a la lista 'ul'.
  taskList.appendChild(newTask);

  // 8. Limpiar el campo de texto y devolver el foco para la siguiente tarea.
  taskInput.value = '';
  taskInput.focus();
}

// 9. Registrar el manejador de eventos en el botón.
addButton.addEventListener('click', addTask);

// Bonus: Permitir añadir tareas también al presionar "Enter" en el input.
taskInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});
```

**Explicación:**
Este ejercicio sigue el flujo completo de la manipulación del DOM:
1.  **Selección:** Obtenemos referencias a los elementos con los que necesitamos interactuar.
2.  **Manejo de Eventos:** Usamos `addEventListener` para escuchar el evento `click` en el botón.
3.  **Lectura de Valores:** Leemos la propiedad `.value` del input para saber qué quiere añadir el usuario.
4.  **Creación de Elementos:** Usamos `document.createElement('li')` para crear un nuevo nodo en memoria.
5.  **Modificación:** Asignamos el texto a la propiedad `.textContent` del nuevo `li`.
6.  **Inserción en el DOM:** Usamos `appendChild` para hacer visible el nuevo elemento en la página.
7.  **UX (User Experience):** Limpiamos el input y le devolvemos el foco para que el usuario pueda añadir otra tarea rápidamente.
</details>

---

## Ejercicio 2: Modal Simple con Delegación de Eventos

**Objetivo:** Crear una ventana modal y cerrarla de diferentes maneras, utilizando el patrón de delegación de eventos.

**Instrucciones:**
Crea un modal simple que esté oculto por defecto.
1.  Un botón "Abrir Modal" hará visible el modal.
2.  El modal debe tener un botón de "Cerrar" (una "X") en la esquina.
3.  Hacer clic tanto en el botón "Cerrar" como en el fondo oscuro del modal (el "overlay") debe ocultar el modal. Utiliza **un solo** event listener en el contenedor del modal para lograr esto (delegación de eventos).

**HTML/CSS de base:**
```html
<button id="open-modal-btn">Abrir Modal</button>

<div id="modal-overlay" class="hidden">
  <div class="modal-content">
    <h2>Ventana Modal</h2>
    <p>Este es el contenido del modal.</p>
    <button id="close-modal-btn">X</button>
  </div>
</div>

<style>
  .hidden { display: none; }
  #modal-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background-color: rgba(0,0,0,0.5);
  }
  .modal-content {
    position: relative; background-color: white;
    width: 50%; margin: 15% auto; padding: 20px;
  }
  #close-modal-btn { position: absolute; top: 10px; right: 10px; }
</style>
```

<details>
<summary>Solución Razonada</summary>

```javascript
// Selección de elementos
const openBtn = document.querySelector('#open-modal-btn');
const modalOverlay = document.querySelector('#modal-overlay');

// Función para abrir el modal
function openModal() {
  modalOverlay.classList.remove('hidden');
}

// Función para cerrar el modal
function closeModal() {
  modalOverlay.classList.add('hidden');
}

// Listener para el botón de abrir
openBtn.addEventListener('click', openModal);

// ---- Delegación de Eventos para Cerrar ----

// 1. Añadimos un único listener al contenedor principal del modal.
modalOverlay.addEventListener('click', (event) => {
  // 2. Comprobamos qué elemento originó el clic (event.target).
  
  // Si el clic fue directamente en el overlay (el fondo oscuro)
  // O si el clic fue en el botón de cerrar.
  if (event.target === modalOverlay || event.target.id === 'close-modal-btn') {
    closeModal();
  }
});
```

**Explicación de la Delegación de Eventos:**
En lugar de poner un listener en el botón de cerrar y otro en el overlay, ponemos uno solo en el `modalOverlay`.

1.  El evento `click` se dispara en el elemento más profundo que se haya clickeado.
2.  El evento luego "burbujea" hacia arriba en el árbol del DOM.
3.  Nuestro listener en `modalOverlay` captura el evento, sin importar si el origen fue el propio overlay, el botón de cerrar, el `<p>` o el `<h2>`.
4.  Dentro del listener, la clave es la condición `if`.
    -   `event.target === modalOverlay`: Esta condición es `true` solo si el usuario hizo clic directamente en el fondo semitransparente (el div con id `modal-overlay`) y no en uno de sus hijos.
    -   `event.target.id === 'close-modal-btn'`: Esta condición es `true` si el usuario hizo clic en el botón con el id `close-modal-btn`.
5.  Al usar un `||` (OR), cerramos el modal si cualquiera de las dos condiciones se cumple.
6.  Si el usuario hace clic en el contenido del modal (el `<h2>` o el `<p>`), `event.target` será ese elemento, y ninguna de las dos condiciones será `true`, por lo que el modal no se cerrará, que es el comportamiento deseado.

Este patrón es extremadamente eficiente y robusto, especialmente para componentes complejos con múltiples elementos clickeables.
</details>
