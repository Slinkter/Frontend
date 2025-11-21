# Módulo 01: Fundamentos Nucleares de JavaScript

## Tema 1.3: Operadores y Coerción

### Clase: Interacción y Transformación de Valores mediante Operadores

En JavaScript, los **operadores** son símbolos o palabras clave que realizan una operación sobre uno o más valores (operandos) y producen un resultado. Combinados con la **coerción de tipos**, que es la conversión automática o explícita de valores de un tipo a otro, los operadores son herramientas fundamentales para la lógica y la manipulación de datos en cualquier aplicación JavaScript. Comprender su comportamiento y cómo interactúan con los diferentes tipos de datos es esencial para escribir código predecible y evitar sorpresas.

#### Tipos de Operadores

JavaScript clasifica los operadores en varias categorías:

1.  **Operadores de Asignación**: Asignan un valor a una variable.
    *   `=` (asignación simple)
    *   `+=`, `-=`, `*=`, `/=`, `%=` (asignación con operación)
    *   `**=`, `&=`, `|=`, `^=`, `<<=`, `>>=`, `>>>=` (asignación con operación más compleja)
    *   `&&=`, `||=`, `??=` (asignación lógica, ES2021)

    ```javascript
    let x = 10;
    x += 5; // x es 15
    let y = null;
    y ??= 20; // y es 20 (asignación si y es null o undefined)
    ```

2.  **Operadores Aritméticos**: Realizan operaciones matemáticas.
    *   `+` (suma)
    *   `-` (resta)
    *   `*` (multiplicación)
    *   `/` (división)
    *   `%` (módulo, resto de la división)
    *   `**` (exponenciación, ES2016)
    *   `++` (incremento)
    *   `--` (decremento)

    ```javascript
    let a = 10;
    let b = 3;
    console.log(a + b);   // 13
    console.log(a % b);   // 1
    console.log(a ** b);  // 1000
    a++;                  // a es 11
    ```

3.  **Operadores de Comparación**: Comparan dos valores y devuelven un booleano (`true` o `false`).
    *   `==` (igualdad abstracta)
    *   `!=` (desigualdad abstracta)
    *   `===` (igualdad estricta)
    *   `!==` (desigualdad estricta)
    *   `>` (mayor que)
    *   `<` (menor que)
    *   `>=` (mayor o igual que)
    *   `<=` (menor o igual que)

    **¡Advertencia sobre `==` y `!=`!** Estos operadores realizan **coerción de tipos** antes de comparar. Siempre se recomienda usar `===` y `!==` para evitar comportamientos inesperados, ya que comparan tanto el valor como el tipo sin coerción.

    ```javascript
    console.log(5 == "5");   // true (coerción)
    console.log(5 === "5");  // false (sin coerción, tipos diferentes)
    console.log(null == undefined); // true
    console.log(null === undefined); // false
    ```

4.  **Operadores Lógicos**: Combinan expresiones booleanas.
    *   `&&` (AND lógico): Devuelve el primer valor `falsy` o el último valor `truthy`.
    *   `||` (OR lógico): Devuelve el primer valor `truthy` o el último valor `falsy`.
    *   `!` (NOT lógico): Invierte el valor booleano.
    *   `??` (Nullish Coalescing, ES2020): Devuelve el operando de la derecha si el de la izquierda es `null` o `undefined`.

    ```javascript
    console.log(true && false);     // false
    console.log(0 || "Hola");       // "Hola"
    console.log(!true);             // false
    let valor = null;
    let resultado = valor ?? "Defecto"; // "Defecto"
    ```

5.  **Operadores Unarios**: Operan sobre un único operando.
    *   `typeof`: Devuelve el tipo de dato de un operando.
    *   `+` (unario): Intenta convertir el operando a un número.
    *   `-` (unario): Intenta convertir el operando a un número y lo niega.
    *   `delete`: Elimina una propiedad de un objeto o un elemento de un array.

    ```javascript
    console.log(typeof 10);     // "number"
    console.log(+"100");        // 100
    console.log(-"20");         // -20
    const obj = { prop: 1 };
    delete obj.prop;
    console.log(obj.prop);      // undefined
    ```

6.  **Operadores Relacionales**: Utilizados con el operador `in` y `instanceof`.
    *   `in`: Verifica si una propiedad existe en un objeto (o en su cadena de prototipos).
    *   `instanceof`: Verifica si un objeto es una instancia de un constructor particular.

    ```javascript
    const car = { make: 'Honda', model: 'Accord', year: 1998 };
    console.log('make' in car); // true
    console.log(car instanceof Object); // true
    ```

#### Coerción de Tipos Profundizada

La coerción de tipos es la conversión implícita de valores de un tipo de dato a otro. Si bien puede ser conveniente, es una fuente común de errores en JavaScript. Ocurre con frecuencia en:

*   **Operadores Aritméticos**:
    *   El operador `+` es especial: si un operando es un `String`, convierte el otro a `String` y concatena. De lo contrario, intenta convertir a `Number` y suma.
    *   Otros operadores (`-`, `*`, `/`, `%`) siempre intentan convertir ambos operandos a `Number`.
    ```javascript
    console.log(1 + "2");      // "12"
    console.log("1" + 2);      // "12"
    console.log(1 + 2);        // 3
    console.log("10" - "5");   // 5
    console.log("hola" - 5);   // NaN (no puede convertir "hola" a número)
    ```
*   **Operadores de Comparación (`==`, `!=`)**: Como se mencionó, fuerzan la conversión.
*   **Contextos Lógicos**: `if`, `while`, `&&`, `||`, `!`. Valores `truthy` y `falsy`.

    | Valor        | Coerce a Boolean (Falsy) |
    | :----------- | :----------------------- |
    | `false`      | `false`                  |
    | `0`          | `false`                  |
    | `-0`         | `false`                  |
    | `""`         | `false`                  |
    | `null`       | `false`                  |
    | `undefined`  | `false`                  |
    | `NaN`        | `false`                  |
    | `document.all` | `false` (caso especial, obsoleto) |

    Todos los demás valores son `truthy`.

#### Precedencia de Operadores

Determina el orden en que los operadores son evaluados en una expresión. Los operadores con mayor precedencia se evalúan primero. Los paréntesis `()` pueden usarse para anular la precedencia.

Ejemplo de precedencia (de mayor a menor relevancia):
1.  Paréntesis: `()`
2.  Incremento/Decremento: `++`, `--`
3.  Multiplicación/División/Módulo: `*`, `/`, `%`
4.  Suma/Resta: `+`, `-`
5.  Comparación: `<`, `>`, `<=`, `>=`
6.  Igualdad: `==`, `!=`, `===`, `!==`
7.  AND Lógico: `&&`
8.  OR Lógico: `||`
9.  Asignación: `=`, `+=`, etc.

```javascript
let res = 2 + 3 * 4; // 2 + 12 = 14
let resParentesis = (2 + 3) * 4; // 5 * 4 = 20
```

---

### Ejemplos Ampliados y Corregidos

```javascript
// Ejemplo 1: Coerción en Operadores Aritméticos
console.log("--- Coerción Aritmética ---");
console.log("10" + 5);      // "105" (concatenación)
console.log("10" - 5);      // 5 (resta numérica, "10" se convierte a 10)
console.log("10" * "2");    // 20 (multiplicación numérica)
console.log("20" / "hola"); // NaN (división, "hola" no se puede convertir a número)
console.log(true + 1);      // 2 (true se convierte a 1)
console.log(false - 1);     // -1 (false se convierte a 0)

// Ejemplo 2: Operadores Lógicos y Coerción a Booleano
console.log("\n--- Operadores Lógicos ---");
let valorA = 0;
let valorB = "texto";
let valorC = null;

console.log(valorA || valorB);    // "texto" (0 es falsy, devuelve el segundo operando)
console.log(valorB && valorA);    // 0 (valorB es truthy, pero valorA es falsy, devuelve valorA)
console.log(!valorC);             // true (null es falsy, !invierte a true)
console.log(!!valorB);            // true (doble negación para convertir a booleano estricto)

// Ejemplo 3: Operador Nullish Coalescing (??)
console.log("\n--- Nullish Coalescing (??) ---");
let usuario = { nombre: "Pedro", edad: null, cargo: undefined, email: "" };

let edadUsuario = usuario.edad ?? "Edad no especificada"; // "Edad no especificada"
let cargoUsuario = usuario.cargo ?? "Sin cargo";         // "Sin cargo"
let emailUsuario = usuario.email ?? "No tiene email";     // "" (cadena vacía NO es nullish, por lo tanto, email es "")
let telefonoUsuario = usuario.telefono ?? "No disponible"; // "No disponible"

console.log({ edadUsuario, cargoUsuario, emailUsuario, telefonoUsuario });

// Comparación con el operador OR lógico (||)
let emailConOR = usuario.email || "No tiene email"; // "No tiene email" (la cadena vacía "" es falsy)
console.log(`Email con ||: ${emailConOR}`); // Muestra la diferencia clave entre || y ??
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Evaluación de Expresiones con Coerción**
    Prediga el resultado de las siguientes expresiones. Considere la precedencia de operadores y la coerción de tipos.

    ```javascript
    console.log("5" + 3 * 2);
    console.log("10" / "2" + "5");
    console.log(null || 0 && "verdadero");
    console.log(undefined ?? "valor por defecto" || "otro valor");
    console.log(typeof (+"10" + 20));
    console.log(Boolean("false"));
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Evaluación de Expresiones con Coerción

    console.log("5" + 3 * 2);           // "56" (3*2=6, luego "5"+6="56")
    console.log("10" / "2" + "5");      // "55" ("10"/"2"=5, luego 5+"5"="55")
    console.log(null || 0 && "verdadero"); // 0 (0 && "verdadero" evalúa a 0 (falsy), luego null || 0 evalúa a 0)
    console.log(undefined ?? "valor por defecto" || "otro valor"); // "valor por defecto" (undefined ?? "..." -> "valor por defecto", luego "valor por defecto" || "..." -> "valor por defecto" (truthy))
    console.log(typeof (+"10" + 20));   // "number" (+"10"=10, 10+20=30, typeof 30 es "number")
    console.log(Boolean("false"));      // true (la cadena "false" NO es un valor falsy, es una cadena no vacía, por lo tanto, es truthy)
    ```

2.  **Ejercicio: Implementación de Comparación Segura**
    Cree una función `compararValores(val1, val2)` que devuelva:
    *   `true` si `val1` y `val2` son estrictamente iguales.
    *   Si no son estrictamente iguales pero `val1 == val2` es `true` (es decir, son iguales con coerción), la función debe imprimir un mensaje de advertencia "Advertencia: Comparación con coerción. Valores son iguales pero tipos diferentes." y luego devolver `false`.
    *   En cualquier otro caso, debe devolver `false`.

    ```javascript
    function compararValores(val1, val2) {
        // Su código aquí
    }

    console.log(compararValores(10, 10));        // true
    console.log(compararValores(10, "10"));      // Advertencia..., false
    console.log(compararValores(null, undefined)); // Advertencia..., false
    console.log(compararValores(true, 1));       // Advertencia..., false
    console.log(compararValores(5, 7));          // false
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Implementación de Comparación Segura

    function compararValores(val1, val2) {
        if (val1 === val2) {
            return true;
        } else if (val1 == val2) {
            console.warn("Advertencia: Comparación con coerción. Valores son iguales pero tipos diferentes.");
            return false;
        } else {
            return false;
        }
    }

    console.log(compararValores(10, 10));        // true
    console.log(compararValores(10, "10"));      // Advertencia..., false
    console.log(compararValores(null, undefined)); // Advertencia..., false
    console.log(compararValores(true, 1));       // Advertencia..., false
    console.log(compararValores(5, 7));          // false
    ```

---

### Glosario Técnico

*   **Operador**: Símbolo o palabra clave que realiza una operación sobre valores.
*   **Operador de Asignación**: Asigna un valor a una variable (ej. `=`, `+=`).
*   **Operador Aritmético**: Realiza operaciones matemáticas (ej. `+`, `-`, `*`).
*   **Operador de Comparación**: Compara valores y devuelve un booleano (ej. `==`, `===`, `>`, `<`).
*   **Operador Lógico**: Combina expresiones booleanas (ej. `&&`, `||`, `!`, `??`).
*   **Operador Unario**: Opera sobre un único operando (ej. `typeof`, `+` unario, `-` unario).
*   **Operador `??` (Nullish Coalescing)**: Devuelve el operando de la derecha si el de la izquierda es `null` o `undefined`.
*   **Precedencia de Operadores**: El orden en que los operadores son evaluados en una expresión.
*   **Coerción de Tipos**: Conversión automática e implícita de tipos por JavaScript.
*   **Igualdad Abstracta (`==`)**: Compara valores después de coerción de tipos.
*   **Igualdad Estricta (`===`)**: Compara valores y tipos sin coerción, preferida para evitar errores.
*   **`truthy` / `falsy`**: Valores que se evalúan como `true` o `false` respectivamente en un contexto booleano.

```javascript
