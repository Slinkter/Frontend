# Módulo 01: Fundamentos Nucleares de JavaScript

## Tema 1.2: Tipos de Datos y Coerción

### Clase: Clasificación y Transformación de Valores en JavaScript

JavaScript es un lenguaje de programación de tipado dinámico y débilmente tipado. Esto significa que no es necesario declarar explícitamente el tipo de una variable antes de usarla (el tipo se determina en tiempo de ejecución), y el lenguaje realiza conversiones implícitas de tipos cuando es necesario (coerción). Una comprensión profunda de los tipos de datos y cómo se transforman es crucial para evitar errores inesperados y escribir código robusto.

#### Tipos de Datos en JavaScript

En JavaScript, los valores se dividen en dos categorías principales: **Primitivos** y **Objetos**.

##### 1. Tipos de Datos Primitivos (Primitives)

Son valores inmutables (no pueden ser alterados) y no tienen métodos. Cuando se asigna una variable primitiva a otra, se copia el valor.

*   **`String`**: Representa secuencias de caracteres. Se definen con comillas simples (`' '`), dobles (`" "`) o plantillas literales (backticks `` ` ``).
    ```javascript
    let nombre = "Juan";
    let saludo = `Hola, ${nombre}`; // Plantilla literal
    ```
*   **`Number`**: Representa tanto números enteros como de coma flotante. Incluye valores especiales como `Infinity`, `-Infinity` y `NaN` (Not-a-Number).
    ```javascript
    let edad = 30;
    let precio = 99.99;
    let resultado = 0 / 0; // NaN
    ```
*   **`Boolean`**: Representa un valor lógico: `true` o `false`.
    ```javascript
    let esActivo = true;
    let tienePermiso = false;
    ```
*   **`Undefined`**: Representa una variable que ha sido declarada pero a la que aún no se le ha asignado un valor. Es un tipo y un valor.
    ```javascript
    let sinValor;
    console.log(sinValor); // undefined
    ```
*   **`Null`**: Representa la ausencia intencional de cualquier valor de objeto. Es un valor asignado explícitamente, no un tipo de dato en sí mismo, pero a menudo se comporta como tal. Técnicamente, `typeof null` devuelve `"object"`, lo cual es un error histórico del lenguaje.
    ```javascript
    let objetoVacio = null;
    console.log(typeof objetoVacio); // "object" (¡paradójico!)
    ```
*   **`Symbol`** (ES6): Representa un valor único e inmutable que puede ser usado como clave de propiedad para objetos.
    ```javascript
    const id = Symbol('id');
    const otroId = Symbol('id');
    console.log(id === otroId); // false
    ```
*   **`BigInt`** (ES2020): Representa números enteros con una precisión arbitraria. Permite trabajar con números que exceden el límite de `Number`. Se crea añadiendo `n` al final de un entero.
    ```javascript
    const numeroGrande = 9007199254740991n;
    ```

##### 2. Tipo de Dato Objeto (Object)

Representa colecciones de datos y entidades más complejas. Los objetos son mutables; cuando se asigna una variable objeto a otra, se copia la *referencia* a la memoria, no el valor en sí.

*   **`Object`**: El tipo base para todos los objetos. Puede ser un objeto literal (`{}`), una instancia de clase, arrays, funciones, etc.
    ```javascript
    let persona = {
        nombre: "Ana",
        edad: 25
    };
    ```
*   **`Array`**: Una subclase especial de `Object` para almacenar colecciones ordenadas de elementos.
    ```javascript
    let numeros = [1, 2, 3];
    ```
*   **`Function`**: Son objetos de primera clase. Pueden ser pasadas como argumentos, devueltas por otras funciones, y asignadas a variables.
    ```javascript
    function saludar() { /* ... */ }
    ```
*   Otros objetos built-in: `Date`, `RegExp`, `Map`, `Set`, `Promise`, etc.

#### Coerción de Tipos (Type Coercion)

La coerción de tipos es la conversión automática o implícita de valores de un tipo de dato a otro. JavaScript realiza coerción en diversos contextos:

1.  **A String**: Ocurre en la concatenación con el operador `+` si uno de los operandos es una cadena.
    ```javascript
    console.log(10 + "objetos"); // "10objetos"
    console.log(true + "es verdadero"); // "truees verdadero"
    ```
2.  **A Number**: 
    *   **Operadores matemáticos (excepto `+` con strings)**: `*`, `/`, `-`, `%`, etc.
    *   **Operadores relacionales**: `>`, `<`, `>=`, `<=`.
    *   **Operadores unarios**: `+` (para convertir a número), `-` (para convertir a número y negar).
    ```javascript
    console.log("5" * "2"); // 10
    console.log(+"10"); // 10
    console.log("10" > 5); // true ( "10" se convierte a 10)
    ```
3.  **A Boolean**: Ocurre en contextos booleanos como declaraciones `if`, operadores lógicos (`&&`, `||`, `!`).
    *   **Valores `falsy`**: `false`, `0`, `-0`, `""` (cadena vacía), `null`, `undefined`, `NaN`. Estos se evalúan como `false`.
    *   **Valores `truthy`**: Cualquier otro valor se evalúa como `true`.
    ```javascript
    if (0) { console.log("Nunca se ejecuta"); }
    if ("hello") { console.log("Se ejecuta"); }
    console.log(!![]); // true (array vacío es truthy)
    ```

#### Conversión Explícita (Type Conversion)

Es la conversión manual o explícita de valores de un tipo a otro, utilizando funciones o métodos específicos.

*   **A String**: `String()`, `.toString()`.
    ```javascript
    let num = 123;
    console.log(String(num)); // "123"
    console.log(num.toString()); // "123"
    ```
*   **A Number**: `Number()`, `parseInt()`, `parseFloat()`, `+` unario.
    ```javascript
    let str = "456";
    console.log(Number(str)); // 456
    console.log(parseInt("10.5px")); // 10
    console.log(parseFloat("10.5px")); // 10.5
    ```
*   **A Boolean**: `Boolean()`, `!!`.
    ```javascript
    let val = 0;
    console.log(Boolean(val)); // false
    console.log(!!val); // false
    ```

#### Operadores de Igualdad: `==` vs. `===`

Es fundamental entender la diferencia para evitar errores.

*   **`==` (Igualdad abstracta)**: Realiza coerción de tipos si los operandos son de tipos diferentes antes de comparar sus valores.
    ```javascript
    console.log(5 == "5"); // true ( "5" se convierte a 5)
    console.log(0 == false); // true ( 0 se convierte a false)
    console.log(null == undefined); // true
    ```
*   **`===` (Igualdad estricta)**: Compara los valores *sin realizar coerción de tipos*. Si los tipos son diferentes, devuelve `false` directamente. Es la forma recomendada de comparación.
    ```javascript
    console.log(5 === "5"); // false (tipo diferente)
    console.log(0 === false); // false (tipo diferente)
    console.log(null === undefined); // false (tipo diferente)
    ```

---

### Ejemplos Ampliados y Corregidos

```javascript
// Ejemplo 1: Coerción con Operador '+'
console.log("--- Coerción con '+' ---");
console.log(5 + "5");         // "55" (Number a String)
console.log("10" + true);     // "10true" (Boolean a String)
console.log(null + " mundo"); // "null mundo" (Null a String)
console.log(undefined + " hola"); // "undefined hola" (Undefined a String)
console.log(5 + true);        // 6 (true a 1)
console.log(5 + false);       // 5 (false a 0)

// Ejemplo 2: Coerción a Number en operadores matemáticos (excepto '+')
console.log("\n--- Coerción a Number ---");
console.log("10" - 5);        // 5 (String a Number)
console.log("20" / "2");      // 10 (Strings a Number)
console.log("hello" * 5);     // NaN (String no convertible a Number)
console.log(true * 7);        // 7 (true a 1)

// Ejemplo 3: Coerción a Boolean
console.log("\n--- Coerción a Boolean ---");
console.log(Boolean(0));      // false
console.log(Boolean(""));     // false
console.log(Boolean(null));   // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));    // false
console.log(Boolean(" "));    // true (espacio es truthy)
console.log(Boolean({}));     // true (objeto vacío es truthy)
console.log(Boolean([]));     // true (array vacío es truthy)

// Ejemplo 4: Conversión Explícita
console.log("\n--- Conversión Explícita ---");
let numStr = "123.45";
console.log(Number(numStr));      // 123.45
console.log(parseInt(numStr));    // 123
console.log(parseFloat(numStr));  // 123.45

let myNum = 789;
console.log(String(myNum));       // "789"
console.log(myNum.toString());    // "789"

let myBool = 1;
console.log(Boolean(myBool));     // true
console.log(!!myBool);            // true

// Ejemplo 5: Comparaciones con '==' vs '==='
console.log("\n--- '==' vs '===' ---");
console.log(0 == "");         // true
console.log(0 === "");        // false

console.log("1" == 1);        // true
console.log("1" === 1);       // false

console.log(null == undefined); // true
console.log(null === undefined); // false

console.log([] == ![]);       // true (¡Coerción compleja!)
// ![] es false. [] == false => [] se convierte a "", "" == false => "" a 0, 0 == 0 => true
console.log([] === ![]);      // false
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Predicción de Coerción**
    Prediga el resultado y el tipo de dato de las siguientes expresiones sin ejecutarlas. Luego, verifique sus respuestas.

    ```javascript
    console.log(1 + "2" + 3);
    console.log(1 + +"2" + 3);
    console.log(5 - "3");
    console.log("hello" || "world");
    console.log(0 && "JavaScript");
    console.log(!!null);
    console.log(!"");
    console.log(null == 0);
    console.log(undefined == null);
    console.log(NaN == NaN);
    console.log(true + true);
    console.log({} + []);
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Predicción de Coerción

    console.log(1 + "2" + 3);       // "123" (number 1 a string "1", luego concatena "2", luego "3")
    console.log(1 + +"2" + 3);      // 6 (+"2" convierte "2" a number 2, luego 1+2+3)
    console.log(5 - "3");           // 2 ("3" se convierte a number 3)
    console.log("hello" || "world"); // "hello" (cadena no vacía es truthy, devuelve el primer valor truthy)
    console.log(0 && "JavaScript"); // 0 (0 es falsy, devuelve el primer valor falsy)
    console.log(!!null);            // false (null es falsy, !! lo convierte a boolean)
    console.log(!"");               // true ("" es falsy, ! lo convierte a true)
    console.log(null == 0);         // false (null solo es igual a undefined con ==, no a 0)
    console.log(undefined == null); // true (coerción especial, se consideran iguales)
    console.log(NaN == NaN);        // false (NaN nunca es igual a sí mismo, ni siquiera con ===)
    console.log(true + true);       // 2 (true se convierte a 1)
    console.log({} + []);           // "[object Object]" (en muchos entornos; {} se coerce a string, luego concatena [])
                                    // Nota: En un navegador, si {} es la primera parte de una expresión, puede ser interpretado como un bloque vacío, resultando en `+[]` lo cual es 0.
                                    // Pero en un `console.log` o dentro de una expresión más grande, se comporta como objeto.
                                    // '{} + []' -> '[object Object]' + '' -> '[object Object]'
    ```

2.  **Ejercicio: Manipulación de Tipos y Comprobación Estricta**
    Cree una función que reciba dos argumentos, `a` y `b`. La función debe devolver `true` si ambos argumentos son del mismo tipo Y sus valores son estrictamente iguales, `false` en caso contrario.

    ```javascript
    function sonIgualesYMismoTipo(a, b) {
        // Su código aquí
    }

    console.log(sonIgualesYMismoTipo(1, 1));        // true
    console.log(sonIgualesYMismoTipo(1, "1"));      // false
    console.log(sonIgualesYMismoTipo(true, true));  // true
    console.log(sonIgualesYMismoTipo(null, undefined)); // false
    console.log(sonIgualesYMismoTipo({}, {}));      // false (¿Por qué?)
    const obj1 = { a: 1 };
    const obj2 = obj1;
    console.log(sonIgualesYMismoTipo(obj1, obj2));  // true
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Manipulación de Tipos y Comprobación Estricta

    function sonIgualesYMismoTipo(a, b) {
        // La igualdad estricta (===) ya comprueba tanto el valor como el tipo.
        // Si los tipos son diferentes, === devuelve false.
        // Si los tipos son iguales, compara los valores.
        // Para objetos, compara si son el mismo objeto en memoria (misma referencia).
        return a === b;
    }

    console.log(sonIgualesYMismoTipo(1, 1));        // true
    console.log(sonIgualesYMismoTipo(1, "1"));      // false
    console.log(sonIgualesYMismoTipo(true, true));  // true
    console.log(sonIgualesYMismoTipo(null, undefined)); // false
    console.log(sonIgualesYMismoTipo({}, {}));      // false (son dos objetos diferentes en memoria, aunque estructuralmente idénticos)
    const obj1 = { a: 1 };
    const obj2 = obj1;
    console.log(sonIgualesYMismoTipo(obj1, obj2));  // true (ambas variables referencian el mismo objeto en memoria)
    ```

---

### Glosario Técnico

*   **Tipado Dinámico**: El tipo de una variable se determina en tiempo de ejecución, no necesita declaración explícita.
*   **Tipado Débil**: JavaScript realiza conversiones de tipos implícitas (coerción) cuando es necesario.
*   **Primitivos**: Tipos de datos inmutables y sin métodos (`String`, `Number`, `Boolean`, `Undefined`, `Null`, `Symbol`, `BigInt`). Se copian por valor.
*   **Objeto**: Tipo de dato mutable que representa colecciones de datos complejos. Incluye objetos literales, arrays, funciones, etc. Se copian por referencia.
*   **`String`**: Secuencia de caracteres.
*   **`Number`**: Números enteros y de coma flotante.
*   **`Boolean`**: `true` o `false`.
*   **`Undefined`**: Variable declarada sin valor asignado.
*   **`Null`**: Ausencia intencional de valor.
*   **`Symbol`**: Valor único e inmutable (ES6).
*   **`BigInt`**: Números enteros de precisión arbitraria (ES2020).
*   **Coerción de Tipos (Type Coercion)**: Conversión automática e implícita de un tipo a otro por el motor de JavaScript.
*   **Conversión Explícita (Type Conversion)**: Conversión manual de tipos mediante funciones (`Number()`, `String()`, `Boolean()`, `parseInt()`, `parseFloat()`).
*   **`truthy`**: Valores que se evalúan como `true` en un contexto booleano.
*   **`falsy`**: Valores que se evalúan como `false` en un contexto booleano (`false`, `0`, `""`, `null`, `undefined`, `NaN`).
*   **`==` (Igualdad Abstracta)**: Compara valores después de realizar coerción de tipos si es necesario.
*   **`===` (Igualdad Estricta)**: Compara valores y tipos sin coerción. Es la forma preferida.
