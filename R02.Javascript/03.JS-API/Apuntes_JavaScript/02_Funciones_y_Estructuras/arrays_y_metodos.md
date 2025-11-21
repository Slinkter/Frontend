# Módulo 02: Abstracción y Estructuras de Datos

## Tema 2.2: Manejo de Colecciones: Arrays y sus Métodos

### Clase: Optimizando la Manipulación de Listas con Arrays

Los **Arrays** son una de las estructuras de datos más fundamentales y utilizadas en JavaScript, permitiendo almacenar colecciones ordenadas de valores. Sin embargo, su verdadero poder reside en la amplia gama de **métodos** incorporados que JavaScript proporciona para manipular, transformar y consultar estos arrays de manera eficiente. Dominar estos métodos no solo hace el código más conciso y legible, sino que también aprovecha las optimizaciones internas del motor de JavaScript, crucial para aplicaciones de alto rendimiento.

#### ¿Qué es un Array?

Un `Array` es un objeto global de JavaScript que es esencialmente una lista o colección ordenada de elementos. Cada elemento en un array tiene un índice numérico (comenzando desde `0`) que representa su posición.

```javascript
const frutas = ["manzana", "banana", "cereza"];
console.log(frutas[0]); // "manzana"
console.log(frutas.length); // 3
```

#### Creación de Arrays

1.  **Literal de Array (la forma más común)**:
    ```javascript
    const numeros = [1, 2, 3, 4, 5];
    const mixto = [1, "hola", true, { a: 1 }];
    ```
2.  **Constructor `Array()`**:
    ```javascript
    const arrayVacio = new Array();
    const arrayConTamano = new Array(5); // Crea un array con 5 posiciones vacías
    const arrayConValores = new Array(1, 2, 3);
    ```
3.  **`Array.from()`**:
    Permite crear un nuevo `Array` a partir de un objeto iterable o array-like. Muy útil para convertir NodeLists del DOM o argumentos de función a arrays reales.
    ```javascript
    const nodeList = document.querySelectorAll('div');
    const divsArray = Array.from(nodeList);

    const argumentos = (function() { return arguments; })();
    const argsArray = Array.from(argumentos);
    ```
4.  **`Array.of()`**:
    Crea un nuevo `Array` con un número variable de argumentos, independientemente del número o tipo de los argumentos.
    ```javascript
    const arrayUnico = Array.of(7);    // [7]
    const arrayMultiple = Array.of(1, 2, 'tres'); // [1, 2, 'tres']
    ```

#### Métodos Esenciales de Arrays

Los métodos de arrays pueden clasificarse en varias categorías:

##### 1. Métodos Mutadores (Modifican el array original)

*   **`push()`**: Añade uno o más elementos al final del array y devuelve la nueva longitud.
*   **`pop()`**: Elimina el último elemento del array y lo devuelve.
*   **`shift()`**: Elimina el primer elemento del array y lo devuelve.
*   **`unshift()`**: Añade uno o más elementos al principio del array y devuelve la nueva longitud.
*   **`splice(start, deleteCount, item1, ...)`**: Cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos.
*   **`sort()`**: Ordena los elementos de un array in-place y devuelve el array ordenado. Por defecto, ordena como cadenas.
*   **`reverse()`**: Invierte el orden de los elementos de un array in-place.
*   **`fill(value, start, end)`**: Rellena todos los elementos de un array con un valor estático desde un índice inicial a uno final.

##### 2. Métodos Accesores (No modifican el array original, devuelven un nuevo array o valor)

*   **`concat()`**: Combina dos o más arrays. Devuelve un nuevo array.
*   **`slice(start, end)`**: Devuelve una copia superficial de una porción del array en un nuevo array.
*   **`join(separator)`**: Une todos los elementos de un array en una cadena, usando un separador.
*   **`indexOf(element, fromIndex)`**: Devuelve el primer índice en el que se puede encontrar un elemento dado.
*   **`lastIndexOf(element, fromIndex)`**: Devuelve el último índice en el que se puede encontrar un elemento dado.
*   **`includes(element, fromIndex)`** (ES6): Determina si un array incluye un determinado elemento, devuelve `true` o `false`.
*   **`flat(depth)`** (ES2019): Crea un nuevo array con todos los elementos de sub-array concatenados recursivamente hasta la profundidad especificada.

##### 3. Métodos Iteradores (No modifican el array original, itera sobre los elementos)

Estos métodos son funciones de orden superior, ya que toman una función `callback` como argumento. Son cruciales para el desarrollo moderno de JavaScript.

*   **`forEach(callback)`**: Ejecuta una función provista una vez por cada elemento del array. No devuelve un nuevo array.

    ```javascript
    const nums = [1, 2, 3];
    nums.forEach(num => console.log(num * 2)); // 2, 4, 6
    ```

*   **`map(callback)`**: Crea un nuevo array con los resultados de la llamada a la función `callback` aplicada a cada uno de sus elementos. **Ideal para transformar arrays.**

    ```javascript
    const cuadrados = nums.map(num => num * num); // [1, 4, 9]
    ```

*   **`filter(callback)`**: Crea un nuevo array con todos los elementos que pasan la prueba implementada por la función `callback` proporcionada. **Ideal para seleccionar subconjuntos de arrays.**

    ```javascript
    const pares = nums.filter(num => num % 2 === 0); // [2]
    ```

*   **`reduce(callback, initialValue)`**: Ejecuta una función `reductora` sobre cada elemento del array, pasándole un `acumulador` y el valor actual, para reducir el array a un único valor. **Ideal para sumar, contar, aplanar, etc.**

    ```javascript
    const sumaTotal = nums.reduce((acc, current) => acc + current, 0); // 6
    ```

*   **`some(callback)`**: Comprueba si al menos un elemento del array cumple con la condición implementada por la función `callback`. Devuelve `true` o `false`.

    ```javascript
    const tienePar = nums.some(num => num % 2 === 0); // true
    ```

*   **`every(callback)`**: Comprueba si todos los elementos del array cumplen con la condición implementada por la función `callback`. Devuelve `true` o `false`.

    ```javascript
    const todosPares = nums.every(num => num % 2 === 0); // false
    ```

*   **`find(callback)`** (ES6): Devuelve el primer elemento del array que cumple con la función de prueba proporcionada.
*   **`findIndex(callback)`** (ES6): Devuelve el índice del primer elemento del array que cumple con la función de prueba proporcionada.

#### Desestructuración de Arrays (Array Destructuring - ES6)

Permite extraer valores de arrays directamente en variables separadas, utilizando una sintaxis similar a la creación de literales de array.

```javascript
const coordenadas = [10, 20, 30];
const [x, y, z] = coordenadas;
console.log(x, y, z); // 10 20 30

const [primero, , tercero] = frutas; // Saltar elementos
console.log(primero, tercero); // "manzana", "cereza"

const [encabezado, ...resto] = [1, 2, 3, 4]; // Rest operator para capturar el resto
console.log(encabezado, resto); // 1, [2, 3, 4]
```

---

### Ejemplos Ampliados y Corregidos

```javascript
// Partes de su código original que usan arrays y métodos (refactorizados para claridad)
const data = [
    { id: '123', image: { url: 'cat1.jpg' } },
    { id: '456', image: { url: 'cat2.jpg' } },
    { id: '789', image: { url: 'cat3.jpg' } },
];

const view = data
    .map(
        (item) => `
          <article>
            <img src="${item.image.url}" width="150" alt="${item.image.id}" />
            <button class="btnDelete" id="${item.id}" name="${item.id} " >
              delete
            </button>
          </article>`
    )
    .join(""); // El método .join() convierte un array en una cadena.

// En otro archivo se usa Object.values para convertir un objeto de objetos en un array de objetos
function likedMovieList() {
    const db_local = localStorage.getItem("liked_movies");
    const item = JSON.parse(db_local);
    return item ? item : {};
}

function getLikedMovies() {
    const likedmovies = likedMovieList(); // { 'id1': movie1, 'id2': movie2 }
    const moviesArray = Object.values(likedmovies); // Convierte a [movie1, movie2]
    // ... luego moviesArray se usa con createMovies
}

// Otro ejemplo con Array.from() (NodeList a Array)
// const deleteButtons = document.querySelectorAll(".btnDelete");
// Array.from(deleteButtons).forEach(button => { /* ... */ });
```
```javascript
// Ejemplo 1: Transformación con map y filter
console.log("--- Transformación con map y filter ---");
const productos = [
    { id: 1, nombre: "Laptop", precio: 1200, categoria: "electronica" },
    { id: 2, nombre: "Mouse", precio: 25, categoria: "electronica" },
    { id: 3, nombre: "Libro", precio: 20, categoria: "libros" },
    { id: 4, nombre: "Teclado", precio: 75, categoria: "electronica" },
];

const nombresElectronica = productos
    .filter(producto => producto.categoria === "electronica") // Filtra productos de electrónica
    .map(producto => producto.nombre.toUpperCase());          // Transforma a nombres en mayúsculas

console.log(nombresElectronica); // ["LAPTOP", "MOUSE", "TECLADO"]

// Ejemplo 2: Reducción con reduce
console.log("\n--- Reducción con reduce ---");
const carrito = [
    { item: "Camisa", precio: 20, cantidad: 2 },
    { item: "Pantalón", precio: 50, cantidad: 1 },
    { item: "Calcetines", precio: 5, cantidad: 3 },
];

const totalCarrito = carrito.reduce((acumulador, producto) => {
    return acumulador + (producto.precio * producto.cantidad);
}, 0); // 0 es el valor inicial del acumulador

console.log(`El total del carrito es: $${totalCarrito}`); // $105

// Ejemplo 3: Desestructuración y Rest Operator en Arrays
console.log("\n--- Desestructuración y Rest ---");
const numerosGrandes = [100, 200, 300, 400, 500];
const [primero, segundo, ...restoNumeros] = numerosGrandes;

console.log(`Primer número: ${primero}`);     // 100
console.log(`Segundo número: ${segundo}`);    // 200
console.log(`Resto de números: ${restoNumeros}`); // [300, 400, 500]

// Clonación de un array con slice() o spread operator
const original = [1, 2, 3];
const copiaSlice = original.slice(); // [1, 2, 3]
const copiaSpread = [...original];   // [1, 2, 3]
console.log(original === copiaSlice); // false
console.log(original === copiaSpread); // false
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Filtrar y Calcular Promedio**
    Dado un array de objetos `estudiantes`, donde cada objeto tiene `nombre` y `calificacion`.
    Escriba una función `calcularPromedioAprobados(estudiantes)` que:
    1.  Filtre solo a los estudiantes con una calificación mayor o igual a 70 (considerados "aprobados").
    2.  Calcule el promedio de las calificaciones de los estudiantes aprobados.
    3.  Devuelva el promedio. Si no hay estudiantes aprobados, debe devolver `0`.

    ```javascript
    const estudiantes = [
        { nombre: "Ana", calificacion: 85 },
        { nombre: "Luis", calificacion: 60 },
        { nombre: "Marta", calificacion: 92 },
        { nombre: "Pedro", calificacion: 70 },
        { nombre: "Sofía", calificacion: 45 }
    ];

    function calcularPromedioAprobados(estudiantes) {
        // Su código aquí
    }

    console.log(calcularPromedioAprobados(estudiantes)); // (85 + 92 + 70) / 3 = 82.33...
    console.log(calcularPromedioAprobados([{ nombre: "Juan", calificacion: 50 }])); // 0
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Filtrar y Calcular Promedio

    function calcularPromedioAprobados(estudiantes) {
        const aprobados = estudiantes.filter(estudiante => estudiante.calificacion >= 70);

        if (aprobados.length === 0) {
            return 0;
        }

        const sumaCalificaciones = aprobados.reduce((acum, estudiante) => acum + estudiante.calificacion, 0);

        return sumaCalificaciones / aprobados.length;
    }

    const estudiantes = [
        { nombre: "Ana", calificacion: 85 },
        { nombre: "Luis", calificacion: 60 },
        { nombre: "Marta", calificacion: 92 },
        { nombre: "Pedro", calificacion: 70 },
        { nombre: "Sofía", calificacion: 45 }
    ];

    console.log(calcularPromedioAprobados(estudiantes)); // 82.33333333333333
    console.log(calcularPromedioAprobados([{ nombre: "Juan", calificacion: 50 }])); // 0
    ```

2.  **Ejercicio: Encontrar el Elemento Más Largo**
    Escriba una función `encontrarPalabraMasLarga(palabras)` que reciba un array de cadenas de texto. La función debe encontrar y devolver la palabra más larga del array. Si el array está vacío, debe devolver una cadena vacía. Utilice `reduce`.

    ```javascript
    function encontrarPalabraMasLarga(palabras) {
        // Su código aquí
    }

    console.log(encontrarPalabraMasLarga(["manzana", "pera", "kiwi", "banana"])); // "banana"
    console.log(encontrarPalabraMasLarga(["sol", "luna"])); // "luna"
    console.log(encontrarPalabraMasLarga([])); // ""
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Encontrar el Elemento Más Largo

    function encontrarPalabraMasLarga(palabras) {
        if (palabras.length === 0) {
            return "";
        }
        return palabras.reduce((palabraMasLarga, palabraActual) => {
            return palabraActual.length > palabraMasLarga.length ? palabraActual : palabraMasLarga;
        }, ""); // El valor inicial del acumulador es una cadena vacía
    }

    console.log(encontrarPalabraMasLarga(["manzana", "pera", "kiwi", "banana"])); // "banana"
    console.log(encontrarPalabraMasLarga(["sol", "luna"])); // "luna"
    console.log(encontrarPalabraMasLarga([])); // ""
    ```

---

### Glosario Técnico

*   **Array**: Objeto global de JavaScript para almacenar una colección ordenada de elementos.
*   **Índice**: Posición numérica de un elemento en un array, comenzando desde `0`.
*   **Literal de Array**: Sintaxis `[]` para crear un array.
*   **`Array.from()`**: Crea un nuevo array a partir de un objeto iterable o array-like.
*   **`Array.of()`**: Crea un nuevo array con un número variable de argumentos.
*   **Métodos Mutadores**: Métodos que modifican el array original (ej. `push`, `pop`, `splice`, `sort`).
*   **Métodos Accesores**: Métodos que no modifican el array original, devolviendo una copia o un nuevo valor (ej. `concat`, `slice`, `join`, `includes`).
*   **Métodos Iteradores**: Métodos de orden superior que iteran sobre los elementos del array y toman una función `callback` (ej. `forEach`, `map`, `filter`, `reduce`, `some`, `every`, `find`).
*   **`forEach()`**: Ejecuta una función para cada elemento.
*   **`map()`**: Crea un nuevo array transformando cada elemento.
*   **`filter()`**: Crea un nuevo array con elementos que cumplen una condición.
*   **`reduce()`**: Reduce el array a un único valor.
*   **`some()`**: Comprueba si al menos un elemento cumple una condición.
*   **`every()`**: Comprueba si todos los elementos cumplen una condición.
*   **Desestructuración de Arrays**: Sintaxis para extraer valores de arrays en variables separadas.
*   **`Spread Operator` (`...`)**: Para expandir un array en argumentos individuales o elementos de otro array. También para clonación superficial.
*   **`Rest Parameters` (`...`)**: Para recoger un número indefinido de argumentos de una función en un array.
