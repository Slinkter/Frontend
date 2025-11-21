# Ejercicios Propuestos: Métodos de Arrays

## Ejercicio 1: Aplanamiento y Procesamiento de un Pedido

**Objetivo:** Combinar `flatMap` y otros métodos para procesar una estructura de datos compleja.

**Instrucciones:**
Tienes un array de `pedidos`. Cada pedido contiene un array de `items`. Cada item tiene un `nombre` y un `precio`. Tu tarea es crear una lista (un array de strings) que contenga solo los nombres de todos los productos de todos los pedidos cuyo precio sea superior a 30.

```javascript
const pedidos = [
  {
    id: 1,
    items: [
      { nombre: 'Teclado', precio: 50 },
      { nombre: 'Mouse', precio: 25 }
    ]
  },
  {
    id: 2,
    items: [
      { nombre: 'Monitor', precio: 300 },
      { nombre: 'Webcam', precio: 45 }
    ]
  },
  {
    id: 3,
    items: []
  },
  {
    id: 4,
    items: [
      { nombre: 'Hub USB', precio: 20 }
    ]
  }
];

// Tu código aquí
const productosCaros = /* ... */;

console.log(productosCaros);
// Esperado: ['Teclado', 'Monitor', 'Webcam']
```

<details>
<summary>Solución Razonada</summary>

```javascript
const pedidos = [
  // ... (datos de los pedidos)
  { id: 1, items: [{ nombre: 'Teclado', precio: 50 }, { nombre: 'Mouse', precio: 25 }] },
  { id: 2, items: [{ nombre: 'Monitor', precio: 300 }, { nombre: 'Webcam', precio: 45 }] },
  { id: 3, items: [] },
  { id: 4, items: [{ nombre: 'Hub USB', precio: 20 }] }
];

// Solución usando flatMap
const productosCaros = pedidos.flatMap(pedido =>
  pedido.items
    .filter(item => item.precio > 30) // Filtra los items caros
    .map(item => item.nombre)        // Extrae sus nombres
);


// Solución equivalente con reduce para mayor claridad del proceso
const productosCarosConReduce = pedidos.reduce((acc, pedido) => {
  const itemsCarosDelPedido = pedido.items
    .filter(item => item.precio > 30)
    .map(item => item.nombre);
  
  return acc.concat(itemsCarosDelPedido);
}, []);


console.log(productosCaros);
console.log(productosCarosConReduce);
```

**Explicación (`flatMap`):**
El método `flatMap` es perfecto para este escenario. Combina un `map` y un `flat` de profundidad 1 en una sola operación eficiente.

1.  `pedidos.flatMap(callback)`: `flatMap` itera sobre cada `pedido`.
2.  **`pedido => ...`**: Para cada `pedido`, ejecutamos una sub-cadena de operaciones en su array `items`.
3.  **`pedido.items.filter(...)`**: Primero, filtramos los `items` para quedarnos solo con aquellos cuyo `precio` es mayor que 30.
4.  **`.map(...)`**: Luego, de esos items filtrados, mapeamos para extraer solo la propiedad `nombre`.
5.  El resultado del `map` para cada `pedido` es un array de nombres. Por ejemplo:
    -   Pedido 1: `['Teclado']`
    -   Pedido 2: `['Monitor', 'Webcam']`
    -   Pedido 3: `[]`
    -   Pedido 4: `[]`
6.  `flatMap` toma estos arrays resultantes (`['Teclado']`, `['Monitor', 'Webcam']`, `[]`, `[]`) y los "aplana" en un único array final: `['Teclado', 'Monitor', 'Webcam']`.

Esta solución es declarativa, legible y eficiente.
</details>

---

## Ejercicio 2: Búsqueda y Validación de Datos

**Objetivo:** Utilizar `find`, `some` y `every` para responder preguntas sobre un conjunto de datos.

**Instrucciones:**
Usando el siguiente array de `estudiantes`, responde a las siguientes preguntas utilizando el método de array más apropiado para cada caso.

1.  Encuentra el primer estudiante que haya aprobado (nota >= 5).
2.  Comprueba si algún estudiante ha suspendido (nota < 5).
3.  Comprueba si todos los estudiantes han aprobado.

```javascript
const estudiantes = [
  { nombre: 'Carlos', nota: 7 },
  { nombre: 'Isabel', nota: 4 },
  { nombre: 'David', nota: 9 },
  { nombre: 'Laura', nota: 6 }
];

// Tu código aquí
const primerAprobado = /* ... */;
const hayAlguienSuspendido = /* ... */;
const todosHanAprobado = /* ... */;

console.log("Primer estudiante aprobado:", primerAprobado);
// Esperado: { nombre: 'Carlos', nota: 7 }

console.log("¿Hay algún estudiante suspendido?", hayAlguienSuspendido);
// Esperado: true

console.log("¿Todos los estudiantes han aprobado?", todosHanAprobado);
// Esperado: false
```

<details>
<summary>Solución Razonada</summary>

```javascript
const estudiantes = [
  { nombre: 'Carlos', nota: 7 },
  { nombre: 'Isabel', nota: 4 },
  { nombre: 'David', nota: 9 },
  { nombre: 'Laura', nota: 6 }
];

// 1. Encuentra el primer estudiante que haya aprobado (nota >= 5).
// 'find' es ideal porque se detiene en cuanto encuentra la primera coincidencia.
const primerAprobado = estudiantes.find(est => est.nota >= 5);

// 2. Comprueba si algún estudiante ha suspendido (nota < 5).
// 'some' es perfecto para comprobar si "al menos uno" cumple la condición.
const hayAlguienSuspendido = estudiantes.some(est => est.nota < 5);

// 3. Comprueba si todos los estudiantes han aprobado.
// 'every' es la elección correcta para verificar si "todos" cumplen la condición.
const todosHanAprobado = estudiantes.every(est => est.nota >= 5);


console.log("Primer estudiante aprobado:", primerAprobado);
console.log("¿Hay algún estudiante suspendido?", hayAlguienSuspendido);
console.log("¿Todos los estudiantes han aprobado?", todosHanAprobado);
```

**Explicación de la Elección de Métodos:**

-   **Para la pregunta 1:** Se podría haber usado `filter`, pero `filter` recorrería todo el array y devolvería `[{...}, {...}, {...}]`. `find` es más eficiente porque solo necesitamos el primer resultado y se detiene inmediatamente después de encontrar a Carlos, sin necesidad de evaluar a David y Laura.

-   **Para la pregunta 2:** `some` es la herramienta semántica y computacionalmente correcta. Tan pronto como evalúa a Isabel (`nota: 4`), la condición `est.nota < 5` es `true`, por lo que `some` devuelve `true` inmediatamente y detiene la iteración. No necesita comprobar al resto de estudiantes.

-   **Para la pregunta 3:** `every` es el opuesto de `some`. Evalúa a Carlos (`nota: 7`, `true`), pero cuando llega a Isabel (`nota: 4`), la condición `est.nota >= 5` es `false`. En ese momento, `every` sabe que no todos los estudiantes cumplen la condición, por lo que devuelve `false` y detiene la iteración.

Elegir el método correcto no solo hace el código más legible, sino también más performante.
</details>
