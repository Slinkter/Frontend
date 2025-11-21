# Módulo 02: Abstracción y Estructuras de Datos

## Tema 2.1: El Rol de las Funciones

### Clase: Las Funciones como Bloques Constructivos de la Lógica

Las funciones son uno de los conceptos más fundamentales y poderosos en JavaScript. No son solo un medio para agrupar bloques de código reutilizables, sino que actúan como "ciudadanos de primera clase" (`first-class citizens`), lo que significa que pueden ser asignadas a variables, pasadas como argumentos a otras funciones (callbacks) y devueltas como resultados de otras funciones (closures). Una comprensión profunda de las funciones, sus formas de declaración y sus características es indispensable para dominar JavaScript.

#### ¿Qué son las Funciones?

Una función es un bloque de código diseñado para realizar una tarea particular. Puede recibir datos (parámetros), procesarlos y devolver un resultado. La principal ventaja de las funciones es la **reutilización de código**, evitando la duplicación y haciendo el programa más modular y fácil de mantener.

#### Formas de Declarar Funciones

JavaScript ofrece varias sintaxis para definir funciones:

1.  **Declaración de Función (Function Declaration)**:
    Es la forma tradicional de definir una función. Son elevadas (hoisted), lo que significa que pueden ser llamadas antes de su definición en el código.

    ```javascript
    function saludar(nombre) {
        return `Hola, ${nombre}!`;
    }
    console.log(saludar("Ana")); // Hola, Ana!
    ```

2.  **Expresión de Función (Function Expression)**:
    Una función definida como parte de una expresión, a menudo asignada a una variable. A diferencia de las declaraciones, las expresiones de función no son elevadas completamente; la variable es elevada, pero no su valor (la función), por lo que no pueden ser llamadas antes de su asignación.

    ```javascript
    const sumar = function(a, b) {
        return a + b;
    };
    console.log(sumar(5, 3)); // 8

    // console.log(restar(10, 5)); // ReferenceError: Cannot access 'restar' before initialization
    const restar = function(a, b) {
        return a - b;
    };
    ```

3.  **Funciones Flecha (Arrow Functions - ES6)**:
    Una sintaxis más concisa para escribir expresiones de función. Tienen algunas diferencias clave con las funciones tradicionales, principalmente en cómo manejan `this` y `arguments`. Son ideales para funciones anónimas y callbacks.

    ```javascript
    const multiplicar = (a, b) => a * b; // Implícitamente devuelve a * b
    console.log(multiplicar(4, 2)); // 8

    const decirHola = () => console.log("Hola!");
    decirHola();

    const obtenerUsuario = id => ({ id: id, activo: true }); // Paréntesis para devolver un objeto literal
    console.log(obtenerUsuario(1)); // { id: 1, activo: true }
    ```
    **Características clave de las Funciones Flecha**:
    *   **Sintaxis concisa**: Especialmente para funciones de una sola línea o que devuelven un objeto literal.
    *   **No tienen su propio `this`**: Heredan el `this` de su contexto envolvente léxico. Esto resuelve problemas comunes con `this` en callbacks.
    *   **No tienen `arguments`**: No tienen su propio objeto `arguments` (se puede usar `...rest` parameters en su lugar).
    *   **No pueden ser usadas como constructores (`new`)**.
    *   **No son elevadas (`hoisted`)**.

#### Parámetros y Argumentos

*   **Parámetros**: Las variables listadas entre paréntesis en la definición de la función.
*   **Argumentos**: Los valores reales que se pasan a la función cuando se llama.

##### Características Avanzadas de Parámetros

1.  **Parámetros por Defecto (Default Parameters - ES6)**:
    Permiten inicializar parámetros con un valor predeterminado si no se proporciona un argumento o si el argumento es `undefined`.

    ```javascript
    function saludarConDefecto(nombre = "Invitado", saludo = "Hola") {
        return `${saludo}, ${nombre}`;
    }
    console.log(saludarConDefecto("Carlos"));    // Hola, Carlos!
    console.log(saludarConDefecto());           // Hola, Invitado!
    console.log(saludarConDefecto("Marta", "Qué tal")); // Qué tal, Marta!
    ```

2.  **Parámetros Rest (`...rest` Parameters - ES6)**:
    Permiten representar un número indefinido de argumentos como un array. Deben ser el último parámetro en la lista.

    ```javascript
    function sumarTodo(...numeros) {
        return numeros.reduce((total, num) => total + num, 0);
    }
    console.log(sumarTodo(1, 2, 3, 4, 5)); // 15

    function registrar(nivel, ...mensajes) {
        console.log(`[${nivel.toUpperCase()}]: ${mensajes.join(" ")}`);
    }
    registrar("INFO", "Usuario logueado", "IP: 192.168.1.1"); // [INFO]: Usuario logueado IP: 192.168.1.1
    ```

3.  **Destructuring en Parámetros (Parameter Destructuring - ES6)**:
    Permite desempaquetar valores de objetos o arrays directamente en los parámetros de la función.

    ```javascript
    function mostrarInfoUsuario({ nombre, edad }) {
        console.log(`Nombre: ${nombre}, Edad: ${edad}`);
    }
    const usuario = { nombre: "Luisa", edad: 28, ciudad: "Madrid" };
    mostrarInfoUsuario(usuario); // Nombre: Luisa, Edad: 28

    function procesarArray([primero, segundo, ...resto]) {
        console.log(`Primero: ${primero}, Segundo: ${segundo}, Resto: ${resto}`);
    }
    procesarArray([10, 20, 30, 40, 50]); // Primero: 10, Segundo: 20, Resto: 30,40,50
    ```

#### Funciones de Primera Clase (First-Class Functions)

En JavaScript, las funciones son tratadas como cualquier otra variable. Esto significa que pueden:
*   Ser asignadas a variables o propiedades de objetos.
*   Ser pasadas como argumentos a otras funciones (conocidas como `callbacks`).
*   Ser devueltas como el resultado de otras funciones (formando `closures`).

Este concepto es fundamental para entender patrones como los **callbacks**, las **funciones de orden superior (`higher-order functions`)** (que toman funciones como argumentos o devuelven funciones) y los **closures**.

```javascript
// Función de orden superior que toma una función como argumento
function ejecutarOperacion(operacion, a, b) {
    return operacion(a, b);
}

// Pasando funciones como argumentos (callbacks)
console.log(ejecutarOperacion(sumar, 10, 5));     // 15
console.log(ejecutarOperacion(multiplicar, 10, 5)); // 50
```

---

### Ejemplos Ampliados y Corregidos

```javascript
// Ejemplo 1: Declaración, Expresión y Función Flecha
console.log("--- Declaración, Expresión y Función Flecha ---");

// Declaración
function presentar(nombre) {
    return `Hola, me llamo ${nombre}`;
}
console.log(presentar("Elena")); // Puede ser llamada antes de su definición

// Expresión
const calcularArea = function(ancho, alto) {
    return ancho * alto;
};
console.log(`El área es ${calcularArea(5, 10)}.`);

// Función Flecha
const duplicar = numero => numero * 2; // Sintaxis concisa para una sola expresión
console.log(`Duplicar 7: ${duplicar(7)}.`);

const crearMensaje = (usuario, mensaje) => {
    // Más de una línea, requiere llaves y return explícito
    const fecha = new Date().toLocaleDateString();
    return `[${fecha}] ${usuario}: ${mensaje}`;
};
console.log(crearMensaje("Admin", "Sistema iniciado."));

// Ejemplo 2: Parámetros por Defecto y Rest
console.log("\n--- Parámetros por Defecto y Rest ---");

function configurarMensaje(texto = "Mensaje por defecto", importancia = "normal") {
    return `[${importancia.toUpperCase()}] ${texto}`;
}
console.log(configurarMensaje());                    // [NORMAL] Mensaje por defecto
console.log(configurarMensaje("Alerta de seguridad", "alta")); // [ALTA] Alerta de seguridad

function promediar(...notas) {
    if (notas.length === 0) return 0;
    const suma = notas.reduce((acc, curr) => acc + curr, 0);
    return suma / notas.length;
}
console.log(`Promedio de (8, 9, 7): ${promediar(8, 9, 7)}`);    // 8
console.log(`Promedio de (5): ${promediar(5)}`);               // 5
console.log(`Promedio de (): ${promediar()}`);                 // 0

// Ejemplo 3: Destructuring en Parámetros
console.log("\n--- Destructuring en Parámetros ---");

function imprimirDetallesProducto({ nombre, precio, stock = 0 }) {
    console.log(`Producto: ${nombre}, Precio: $${precio}, Stock: ${stock}`);
}
const producto = { nombre: "Laptop", precio: 1200, stock: 5 };
imprimirDetallesProducto(producto); // Producto: Laptop, Precio: $1200, Stock: 5
imprimirDetallesProducto({ nombre: "Teclado", precio: 75 }); // Stock usará el valor por defecto: 0

function obtenerPrimerosDos([val1, val2]) {
    console.log(`Primer valor: ${val1}, Segundo valor: ${val2}`);
}
obtenerPrimerosDos([100, 200, 300]); // Primer valor: 100, Segundo valor: 200
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Refactorización a Función Flecha**
    Refactorice la siguiente función tradicional a su equivalente en función flecha, usando la sintaxis más concisa posible.

    ```javascript
    function esPar(numero) {
        return numero % 2 === 0;
    }

    console.log(esPar(4)); // true
    console.log(esPar(7)); // false
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Refactorización a Función Flecha

    const esPar = numero => numero % 2 === 0;

    console.log(esPar(4)); // true
    console.log(esPar(7)); // false
    ```

2.  **Ejercicio: Función de Orden Superior con Callback**
    Cree una función `operarNumeros(num1, num2, operacion)` que reciba dos números y una función `operacion` (callback). `operarNumeros` debe ejecutar `operacion` con `num1` y `num2` como argumentos y devolver el resultado.

    Luego, cree las funciones `sumar` y `restar` como callbacks y utilícelas con `operarNumeros`.

    ```javascript
    function operarNumeros(num1, num2, operacion) {
        // Su código aquí
    }

    const sumar = (a, b) => a + b;
    const restar = (a, b) => a - b;

    console.log(operarNumeros(10, 5, sumar));   // 15
    console.log(operarNumeros(10, 5, restar));  // 5
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Función de Orden Superior con Callback

    function operarNumeros(num1, num2, operacion) {
        // La función `operacion` (callback) es invocada directamente aquí
        return operacion(num1, num2);
    }

    const sumar = (a, b) => a + b;
    const restar = (a, b) => a - b;

    console.log(operarNumeros(10, 5, sumar));   // 15
    console.log(operarNumeros(10, 5, restar));  // 5
    ```

---

### Glosario Técnico

*   **Función**: Bloque de código reutilizable diseñado para realizar una tarea específica.
*   **Declaración de Función (Function Declaration)**: Forma tradicional de definir una función. Elevada (hoisted).
*   **Expresión de Función (Function Expression)**: Función definida como parte de una expresión. No elevada.
*   **Función Flecha (Arrow Function)**: Sintaxis concisa para expresiones de función (ES6). No tiene su propio `this`, no es elevada.
*   **`first-class citizens` (Ciudadanos de Primera Clase)**: Entidades (en este caso, funciones) que pueden ser tratadas como valores, asignadas a variables, pasadas como argumentos y devueltas por otras funciones.
*   **Parámetros**: Variables listadas en la definición de la función.
*   **Argumentos**: Valores reales pasados a una función cuando se llama.
*   **Parámetros por Defecto (Default Parameters)**: Valores predeterminados para parámetros si no se proporcionan argumentos.
*   **Parámetros Rest (`...rest` Parameters)**: Permite agrupar un número indefinido de argumentos en un array.
*   **Destructuring en Parámetros**: Desempaquetar valores de objetos o arrays directamente en los parámetros de la función.
*   **Callback**: Una función pasada como argumento a otra función, para ser ejecutada más tarde.
*   **Función de Orden Superior (Higher-Order Function)**: Una función que toma una o más funciones como argumentos, o devuelve una función como resultado.
*   **`this`**: Contexto de ejecución de una función, cómo se refiere al objeto actual. Las funciones flecha tienen un `this` léxico.

```