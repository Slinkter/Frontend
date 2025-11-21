# Ejercicios Propuestos: Closures

## Ejercicio 1: Logger con Contexto

**Objetivo:** Crear una función de orden superior que genere "loggers" especializados usando closures para recordar un contexto.

**Instrucciones:**
Crea una función `crearLogger(contexto)`. Esta función debe devolver una nueva función (un closure). La función devuelta aceptará un `mensaje` (string) y lo imprimirá en la consola, anteponiendo el `contexto` original.

```javascript
// Tu código para 'crearLogger' aquí

// Casos de prueba
const loggerAPI = crearLogger('[API]');
const loggerUI = crearLogger('[UI]');
const loggerDB = crearLogger('[DATABASE]');

loggerAPI('Petición recibida');    // Esperado: [API] Petición recibida
loggerUI('Botón clickeado');      // Esperado: [UI] Botón clickeado
loggerDB('Conexión establecida'); // Esperado: [DATABASE] Conexión establecida
loggerAPI('Respuesta enviada');    // Esperado: [API] Respuesta enviada
```

<details>
<summary>Solución Razonada</summary>

```javascript
function crearLogger(contexto) {
  // La función devuelta es un closure. "Recuerda" el valor de 'contexto'
  // que se le pasó a crearLogger.
  return function(mensaje) {
    console.log(`${contexto} ${mensaje}`);
  };
}

// Versión concisa con funciones de flecha (currying)
const crearLoggerFlecha = contexto => mensaje => console.log(`${contexto} ${mensaje}`);

// Casos de prueba
const loggerAPI = crearLogger('API');
const loggerUI = crearLogger('UI');
const loggerDB = crearLogger('DATABASE');

loggerAPI('Petición recibida');
loggerUI('Botón clickeado');
loggerDB('Conexión establecida');
loggerAPI('Respuesta enviada');
```

**Explicación:**

1.  Cuando se llama a `crearLogger('[API]')`, se crea un scope de ejecución. Dentro de este scope, la variable `contexto` tiene el valor `'[API]'`.
2.  `crearLogger` devuelve la función anónima `function(mensaje) { ... }`.
3.  Esta función devuelta (que asignamos a `loggerAPI`) mantiene una referencia a su scope léxico original. Es decir, "recuerda" que `contexto` era `'[API]'`. Esto es el closure.
4.  Cuando más tarde llamamos a `loggerAPI('Petición recibida')`, la función se ejecuta. Busca la variable `contexto`, no la encuentra en su propio scope, así que la busca en su scope léxico "recordado" y la encuentra con el valor `'[API]'`.
5.  Lo mismo sucede para `loggerUI` y `loggerDB`, cada uno con su propio closure y su propio valor "recordado" de `contexto`. Cada logger es una función independiente con su propio estado persistente.
</details>

---

## Ejercicio 2: Gestor de Tareas con Estado Privado

**Objetivo:** Implementar el patrón módulo usando un closure para crear un gestor de tareas con un estado (`tareas`) que no pueda ser modificado directamente desde fuera.

**Instrucciones:**
Crea una función `crearGestorDeTareas()` que devuelva un objeto. Este objeto debe tener los siguientes métodos:
-   `agregarTarea(tarea)`: Añade un string de tarea a una lista interna.
-   `listarTareas()`: Devuelve un array con todas las tareas añadidas.
-   `completarTarea(tarea)`: Elimina una tarea de la lista interna.

El array de tareas debe ser "privado", es decir, no debe ser accesible directamente desde el objeto devuelto.

```javascript
// Tu código para 'crearGestorDeTareas' aquí

// Casos de prueba
const miGestor = crearGestorDeTareas();

// No debería ser posible acceder o modificar las tareas directamente.
// miGestor.tareas = []; // Esto no debe afectar al gestor.

miGestor.agregarTarea('Aprender Closures');
miGestor.agregarTarea('Hacer la compra');
miGestor.agregarTarea('Llamar al banco');

console.log(miGestor.listarTareas());
// Esperado: ['Aprender Closures', 'Hacer la compra', 'Llamar al banco']

miGestor.completarTarea('Hacer la compra');

console.log(miGestor.listarTareas());
// Esperado: ['Aprender Closures', 'Llamar al banco']

// Intentar acceder a la variable interna (debería devolver undefined)
console.log(miGestor.tareas); // undefined
```

<details>
<summary>Solución Razonada</summary>

```javascript
function crearGestorDeTareas() {
  // 'tareas' es la variable privada. Solo es accesible dentro de este scope.
  let tareas = [];

  // Devolvemos un objeto cuya API pública consiste en métodos
  // que son closures y, por lo tanto, tienen acceso a 'tareas'.
  return {
    agregarTarea: function(tarea) {
      if (tarea && typeof tarea === 'string') {
        tareas.push(tarea);
      }
    },
    
    listarTareas: function() {
      // Devolvemos una copia para evitar que el array interno sea modificado desde fuera.
      return [...tareas];
    },
    
    completarTarea: function(tarea) {
      // Usamos filter para una eliminación inmutable dentro del closure.
      const nuevasTareas = tareas.filter(t => t !== tarea);
      tareas = nuevasTareas;
    }
  };
}

// Casos de prueba
const miGestor = crearGestorDeTareas();

miGestor.agregarTarea('Aprender Closures');
miGestor.agregarTarea('Hacer la compra');
miGestor.agregarTarea('Llamar al banco');

console.log(miGestor.listarTareas());

miGestor.completarTarea('Hacer la compra');

console.log(miGestor.listarTareas());

console.log(miGestor.tareas); // undefined
```

**Explicación:**

Este es un ejemplo perfecto del **Patrón Módulo**.
1.  La variable `let tareas = [];` vive dentro del scope de `crearGestorDeTareas`.
2.  La función devuelve un objeto. Este objeto no tiene una propiedad `tareas`.
3.  Sin embargo, los métodos `agregarTarea`, `listarTareas` y `completarTarea` fueron declarados dentro del mismo scope que `tareas`. Por lo tanto, forman un closure y mantienen acceso a la variable `tareas`.
4.  Desde fuera, no hay forma de leer o escribir en la variable `tareas` directamente. La única manera de interactuar con la lista de tareas es a través de la interfaz pública (el objeto con los tres métodos) que hemos diseñado.
5.  Una mejora de seguridad en `listarTareas` es devolver una copia (`[...tareas]`). Si solo devolviéramos `tareas`, el código externo obtendría una referencia al array interno y podría mutarlo (e.g., con `.push()`), rompiendo el encapsulamiento.
</details>
