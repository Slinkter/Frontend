# Módulo 01: Fundamentos Nucleares de JavaScript

## Tema 1.1: Variables, Alcance (Scope) y Memoria

### Clase: Entendiendo la Gestión de Datos en JavaScript

En JavaScript, las variables son contenedores con nombre para almacenar valores de datos. La forma en que declaramos estas variables y dónde lo hacemos tiene profundas implicaciones en su **alcance (scope)** y en cómo la **memoria** es gestionada por el motor de JavaScript. Una comprensión sólida de estos conceptos es fundamental para escribir código predecible, eficiente y libre de errores.

#### Declaración de Variables: `var`, `let` y `const`

Históricamente, JavaScript utilizaba únicamente `var` para la declaración de variables. Sin embargo, con ECMAScript 2015 (ES6), se introdujeron `let` y `const`, que abordan las deficiencias de `var` y promueven mejores prácticas de codificación.

1.  **`var`**:
    *   **Ámbito de función (Function Scope)**: Las variables declaradas con `var` están disponibles en toda la función donde son declaradas, o globalmente si se declaran fuera de cualquier función.
    *   **Elevación (Hoisting)**: Las declaraciones `var` son elevadas (hoisted) al inicio de su ámbito. Esto significa que puedes referenciar una variable `var` antes de su declaración, y JavaScript la inicializará con `undefined`.
    *   **Redeclaración**: Permite redeclarar la misma variable en el mismo ámbito sin error.

    ```javascript
    function ejemploVar() {
        console.log(x); // undefined (debido al hoisting)
        var x = 10;
        console.log(x); // 10

        var x = 20; // Redeclaración permitida
        console.log(x); // 20

        if (true) {
            var y = 30;
        }
        console.log(y); // 30 (var no tiene scope de bloque)
    }
    ejemploVar();
    // console.log(x); // ReferenceError: x is not defined (fuera de scope)
    ```

2.  **`let`**:
    *   **Ámbito de bloque (Block Scope)**: Las variables `let` están limitadas al bloque de código (definido por `{}`) donde son declaradas. Esto incluye bucles, condicionales y, por supuesto, funciones.
    *   **No elevación (No Hoisting)**: Aunque técnicamente `let` también se eleva, no se inicializa. Acceder a una variable `let` antes de su declaración resulta en un `ReferenceError` (conocido como "Temporal Dead Zone" o TDZ).
    *   **No redeclaración**: No permite redeclarar la misma variable en el mismo ámbito.

    ```javascript
    function ejemploLet() {
        // console.log(a); // ReferenceError: Cannot access 'a' before initialization (TDZ)
        let a = 10;
        console.log(a); // 10

        // let a = 20; // SyntaxError: Identifier 'a' has already been declared

        if (true) {
            let b = 30;
            console.log(b); // 30
        }
        // console.log(b); // ReferenceError: b is not defined (fuera de scope de bloque)
    }
    ejemploLet();
    ```

3.  **`const`**:
    *   **Ámbito de bloque (Block Scope)**: Al igual que `let`, `const` tiene ámbito de bloque.
    *   **No elevación (No Hoisting)**: También entra en la "Temporal Dead Zone".
    *   **No redeclaración y asignación única**: Requiere una asignación inicial y no permite la reasignación posterior. Una vez que se le asigna un valor, este no puede cambiar. Sin embargo, para objetos y arrays, `const` asegura que la *referencia* no cambie, pero el *contenido* del objeto o array sí puede ser modificado.

    ```javascript
    function ejemploConst() {
        const PI = 3.14159;
        console.log(PI); // 3.14159

        // PI = 3.0; // TypeError: Assignment to constant variable.

        const arr = [1, 2, 3];
        arr.push(4); // Permitido: se modifica el contenido del array
        console.log(arr); // [1, 2, 3, 4]

        // arr = [5, 6]; // TypeError: Assignment to constant variable.

        if (true) {
            const OBJ = { nombre: "Juan" };
            console.log(OBJ); // { nombre: 'Juan' }
        }
        // console.log(OBJ); // ReferenceError: OBJ is not defined (fuera de scope de bloque)
    }
    ejemploConst();
    ```
    **Mejores Prácticas**:
    *   Utilice `const` por defecto para todas sus declaraciones de variables.
    *   Si sabe que el valor de una variable necesita ser reasignado, utilice `let`.
    *   Evite `var` en código moderno debido a sus problemas de hoisting y alcance que pueden llevar a errores difíciles de depurar.

#### Alcance (Scope): Global, Función y Bloque

El scope determina la accesibilidad (visibilidad) de las variables y funciones en diferentes partes de su código.

1.  **Scope Global**:
    *   Las variables declaradas fuera de cualquier función o bloque tienen scope global.
    *   Pueden ser accedidas desde cualquier parte del programa.
    *   Declarar muchas variables globales es una mala práctica ya que pueden colisionar y dificultan el mantenimiento.

    ```javascript
    const mensajeGlobal = "Hola desde el scope global";

    function saludar() {
        console.log(mensajeGlobal); // Accesible
    }
    saludar();
    console.log(mensajeGlobal); // Accesible
    ```

2.  **Scope de Función (Function Scope)**:
    *   Las variables declaradas dentro de una función con `var`, `let` o `const` solo son accesibles dentro de esa función.
    *   Cada llamada a la función crea un nuevo scope.

    ```javascript
    function crearContador() {
        let contador = 0; // Scope de función
        return function() {
            contador++;
            console.log(contador);
        };
    }

    const incrementar = crearContador();
    incrementar(); // 1
    incrementar(); // 2
    // console.log(contador); // ReferenceError: contador is not defined
    ```

3.  **Scope de Bloque (Block Scope)**:
    *   Introducido con `let` y `const` en ES6.
    *   Las variables son accesibles solo dentro del bloque (`{}`) donde fueron declaradas.
    *   Esto mejora la modularidad y evita "fugas" de variables en bucles o condicionales.

    ```javascript
    if (true) {
        let producto = "Laptop";
        const precio = 1200;
        var disponible = true; // NO tiene scope de bloque
    }

    // console.log(producto); // ReferenceError
    // console.log(precio);    // ReferenceError
    console.log(disponible); // true (¡Problema de var!)
    ```

#### Gestión de Memoria y Recolección de Basura

JavaScript es un lenguaje con gestión automática de memoria, lo que significa que el motor de JavaScript se encarga de asignar y liberar memoria.

*   **Asignación de Memoria**
: Cuando se crean variables, funciones, objetos, etc., el motor asigna espacio en memoria para almacenarlos.
*   **Recolección de Basura (Garbage Collection)**
: Es el proceso por el cual el motor de JavaScript identifica y libera la memoria que ya no es accesible o utilizada por el programa. El algoritmo más común es "Mark-and-sweep".

    *   **Mark**: El recolector de basura "marca" todas las variables que son accesibles desde la raíz (variables globales, stack actual).
    *   **Sweep**: Luego "barre" toda la memoria, eliminando las variables no marcadas.

Comprender el scope es crucial aquí: si una variable sale de su scope y ya no hay referencias a ella, se convierte en candidata para la recolección de basura, liberando recursos.

**Fugas de Memoria (Memory Leaks)**
: Aunque la gestión de memoria es automática, pueden ocurrir fugas de memoria si se mantienen referencias innecesarias a objetos que ya no se usan. Ejemplos comunes incluyen:
*   Variables globales accidentales.
*   Timers (`setInterval`, `setTimeout`) que no se limpian.
*   Event listeners que no se remueven de elementos DOM.
*   Cierres (closures) que capturan variables de gran tamaño innecesariamente.

---

### Ejemplos Ampliados y Corregidos

Aquí se presentan ejemplos prácticos que ilustran los conceptos de variables, scope y la importancia de `let`/`const` sobre `var`.

```javascript
// Ejemplo 1: Hoisting con var vs. Temporal Dead Zone con let/const
console.log("--- Ejemplo de Hoisting y TDZ ---");
console.log(variableVar); // undefined
// console.log(variableLet); // ReferenceError: Cannot access 'variableLet' before initialization
// console.log(variableConst); // ReferenceError: Cannot access 'variableConst' before initialization

var variableVar = "Soy var";
let variableLet = "Soy let";
const variableConst = "Soy const";

console.log(variableVar); // Soy var
console.log(variableLet); // Soy let
console.log(variableConst); // Soy const

// Ejemplo 2: Scope de Bloque vs. Scope de Función
console.log("\n--- Ejemplo de Scope ---");
function ejemploScopes() {
    var funcVar = "Variable de función (var)";
    let funcLet = "Variable de función (let)";
    const funcConst = "Variable de función (const)";

    if (true) {
        var blockVar = "Variable de bloque (var)"; // ¡Cuidado! Es de función
        let blockLet = "Variable de bloque (let)";
        const blockConst = "Variable de bloque (const)";
        console.log(blockLet); // Accesible
        console.log(blockConst); // Accesible
    }

    console.log(funcVar); // Accesible
    console.log(funcLet); // Accesible
    console.log(funcConst); // Accesible
    console.log(blockVar); // Accesible (¡ERROR COMÚN con var!)
    // console.log(blockLet); // ReferenceError: blockLet is not defined
    // console.log(blockConst); // ReferenceError: blockConst is not defined
}
ejemploScopes();

// Ejemplo 3: Modificación de const (referencias vs. valores)
console.log("\n--- Ejemplo de Const ---");
const miObjeto = { nombre: "Alice", edad: 30 };
miObjeto.edad = 31; // Permitido: se modifica una propiedad del objeto
console.log(miObjeto); // { nombre: 'Alice', edad: 31 }

// miObjeto = { profesion: "Developer" }; // Error: Assignment to constant variable.

const miArray = [1, 2, 3];
miArray.push(4); // Permitido: se añade un elemento al array
console.log(miArray); // [1, 2, 3, 4]

// miArray = [5, 6]; // Error: Assignment to constant variable.
```

---

### Ejercicios de Consolidación

Para reforzar los conceptos, resuelva los siguientes ejercicios.

1.  **Ejercicio: Identificación de Scope y Hoisting**
    Dado el siguiente código, prediga la salida de cada `console.log()` y explique por qué. Luego, ejecute el código para verificar sus respuestas.

    ```javascript
    var a = 1;
    let b = 2;
    const c = 3;

    function testScope() {
        console.log(a); // ?
        console.log(b); // ?
        console.log(c); // ?

        var a = 10;
        let b = 20;
        // const c = 30; // Si descomentas esta línea, ¿qué pasaría y por qué?

        console.log(a); // ?
        console.log(b); // ?
        console.log(c); // ?

        if (true) {
            var a = 100;
            let b = 200;
            const c = 300;
            console.log(a); // ?
            console.log(b); // ?
            console.log(c); // ?
        }
        console.log(a); // ?
        console.log(b); // ?
        console.log(c); // ?
    }
testScope();
    console.log(a); // ?
    console.log(b); // ?
    console.log(c); // ?
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Identificación de Scope y Hoisting

    var a = 1; // Global var
    let b = 2; // Global let
    const c = 3; // Global const

    function testScope() {
        // En este punto, 'a' (var interno) está hoisted pero es undefined.
        // 'b' y 'c' (let/const internos) están en la TDZ.
        // Las 'b' y 'c' globales son inaccesibles por la TDZ.
        console.log(a); // undefined (var a = 10; está hoisted aquí)
        // console.log(b); // ReferenceError (TDZ para let b = 20;)
        // console.log(c); // ReferenceError (TDZ para const c = 30;) - Si estuviera descomentada

        // Como 'const c = 30;' está comentada, la 'c' global (3) es accesible.
        console.log(c); // 3 (accede a la 'c' global porque no hay una 'c' con scope de función/bloque declarada con let/const)

        var a = 10; // Declara una nueva 'a' en scope de función. La 'a' global no se ve afectada aquí.
        let b = 20; // Declara una nueva 'b' en scope de función.
        // const c = 30; // Si se descomenta, sería un ReferenceError en la línea anterior debido a TDZ.

        console.log(a); // 10 (la 'a' de función)
        console.log(b); // 20 (la 'b' de función)
        console.log(c); // 3 (la 'c' global)

        if (true) {
            var a = 100; // ¡Cuidado! Redeclara la 'a' de función.
            let b = 200; // Nueva 'b' en scope de bloque.
            const c = 300; // Nueva 'c' en scope de bloque.
            console.log(a); // 100 (la 'a' de función ha sido redeclarada por 'var')
            console.log(b); // 200 (la 'b' de bloque)
            console.log(c); // 300 (la 'c' de bloque)
        }
        console.log(a); // 100 (la 'a' de función, modificada por el var dentro del if)
        console.log(b); // 20 (la 'b' de función, la de bloque ya no es accesible)
        console.log(c); // 3 (la 'c' global, la de bloque ya no es accesible)
    }
testScope();
    console.log(a); // 1 (la 'a' global no fue afectada por 'var a = 10;' ni 'var a = 100;' dentro de la función)
    console.log(b); // 2 (la 'b' global)
    console.log(c); // 3 (la 'c' global)
    ```

2.  **Ejercicio: Fuga de Memoria Potencial**
    Identifique una posible fuga de memoria en el siguiente fragmento de código y proponga una solución para evitarla.

    ```javascript
    let bigData = new Array(1000000).fill('some data');
    let element = document.createElement('div');
    document.body.appendChild(element);

    element.addEventListener('click', function() {
        console.log(bigData.length);
        // ¿Hay algún problema aquí?
    });

    // Más tarde, el elemento es removido del DOM
    // document.body.removeChild(element);
    // element = null;
    ```

    **Solución Razonada:**
    Una fuga de memoria potencial ocurre porque el `event listener` (`function()`) crea un cierre (closure) que "captura" la variable `bigData`. Aunque `element` sea removido del DOM y `element = null`, el `event listener` todavía existe en la memoria (esperando ser disparado) y, con él, la referencia a `bigData`. Esto impide que `bigData` sea recolectado por el recolector de basura.

    **Solución:** Remover explícitamente el `event listener` cuando el elemento ya no sea necesario.

    ```javascript
    let bigData = new Array(1000000).fill('some data');
    let element = document.createElement('div');
    document.body.appendChild(element);

    // Guardamos la referencia a la función del listener
    const myClickListener = function() {
        console.log(bigData.length);
    };

    element.addEventListener('click', myClickListener);

    // Más tarde, cuando el elemento es removido del DOM y ya no se necesita
    document.body.removeChild(element);
    element.removeEventListener('click', myClickListener); // ¡Importante! Remover el listener
    element = null; // Permitir que el elemento (y bigData si no hay otras referencias) sea recolectado
    bigData = null; // Liberar explícitamente si ya no se usará
    ```

---

### Glosario Técnico

*   **Variable**: Un contenedor con nombre para almacenar un valor de datos.
*   **`var`**: Palabra clave antigua para declarar variables, con ámbito de función y hoisting completo (`undefined`).
*   **`let`**: Palabra clave moderna para declarar variables con ámbito de bloque y Temporal Dead Zone (TDZ). Permite la reasignación.
*   **`const`**: Palabra clave moderna para declarar variables con ámbito de bloque y TDZ. No permite la reasignación de su valor (o de su referencia para objetos/arrays).
*   **Hoisting (Elevación)**: Comportamiento de JavaScript de mover las declaraciones al inicio de su ámbito antes de la ejecución del código. Con `var`, la inicialización también se eleva (`undefined`); con `let`/`const`, solo la declaración (creando TDZ).
*   **Scope (Alcance)**: La región del código donde una variable o función es accesible.
*   **Scope Global**: Las variables son accesibles desde cualquier parte del programa.
*   **Scope de Función**: Las variables son accesibles solo dentro de la función donde fueron declaradas.
*   **Scope de Bloque**: Las variables (declaradas con `let`/`const`) son accesibles solo dentro del bloque (`{}`) donde fueron declaradas.
*   **Temporal Dead Zone (TDZ)**: El período entre el inicio del bloque donde se declara una variable `let`/`const` y su declaración real. Acceder a la variable en este período causa un `ReferenceError`.
*   **Recolección de Basura (Garbage Collection)**: Proceso automático de JavaScript para liberar memoria que ya no está siendo utilizada por el programa.
*   **Fuga de Memoria (Memory Leak)**: Ocurre cuando un programa consume memoria pero no la libera cuando ya no es necesaria, lo que puede llevar a una ralentización o colapso del sistema.
*   **Cierre (Closure)**: Una función que "recuerda" el entorno (scope léxico) en el que fue creada, incluso si esa función es ejecutada fuera de su scope original. Puede ser una causa de fugas de memoria si se usa incorrectamente.

```