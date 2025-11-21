# Módulo 01: Fundamentos Nucleares de JavaScript

## Tema 1.4: Estructuras de Control y Flujo

### Clase: Orquestación Lógica en JavaScript

Las **estructuras de control de flujo** son herramientas fundamentales en JavaScript que dictan el orden en que las instrucciones se ejecutan. Permiten que el programa tome decisiones (estructuras condicionales) y repita bloques de código (estructuras de bucle), haciendo que el código sea dinámico y capaz de responder a diferentes escenarios. Una correcta aplicación de estas estructuras es vital para construir algoritmos eficientes y lógicos.

#### Estructuras Condicionales: Toma de Decisiones

Permiten ejecutar bloques de código específicos solo si una condición determinada es verdadera.

1.  **`if...else if...else`**:
    Es la estructura condicional más básica. Evalúa una condición y ejecuta el bloque de código asociado si la condición es `true`. Permite encadenar múltiples condiciones.

    ```javascript
    let temperatura = 25;

    if (temperatura > 30) {
        console.log("Hace mucho calor.");
    } else if (temperatura > 20) {
        console.log("Hace una temperatura agradable.");
    } else {
        console.log("Hace frío.");
    }
    ```

2.  **`switch`**:
    Permite comparar una expresión con múltiples valores posibles (casos). Es útil cuando se tienen muchas condiciones basadas en el mismo valor.

    ```javascript
    let diaSemana = "martes";

    switch (diaSemana) {
        case "lunes":
            console.log("Inicio de semana.");
            break;
        case "viernes":
            console.log("Casi fin de semana.");
            break;
        case "sabado":
        case "domingo":
            console.log("Fin de semana.");
            break;
        default:
            console.log("Día de la semana regular.");
            break;
    }
    ```
    *   **`break`**: Es crucial para salir del bloque `switch` una vez que se encuentra una coincidencia. Si se omite, la ejecución continuará en el siguiente `case` (`fall-through`).
    *   **`default`**: Se ejecuta si ningún `case` coincide.

3.  **Operador Condicional (Ternario)**:
    Es una forma concisa de escribir una sentencia `if...else` simple en una sola línea.
    Sintaxis: `condicion ? valorSiVerdadero : valorSiFalso`.

    ```javascript
    let edad = 18;
    let mensaje = (edad >= 18) ? "Eres mayor de edad" : "Eres menor de edad";
    console.log(mensaje); // "Eres mayor de edad"
    ```

#### Estructuras de Bucle: Repetición de Código

Permiten ejecutar un bloque de código repetidamente mientras una condición sea verdadera o para cada elemento en una colección.

1.  **`for`**:
    Es el bucle más común y flexible. Se utiliza para repetir un bloque de código un número específico de veces.
    Sintaxis: `for (inicialización; condición; expresiónFinal) { ... }`

    ```javascript
    for (let i = 0; i < 5; i++) {
        console.log("Iteración " + i);
    }
    ```

2.  **`while`**:
    Repite un bloque de código mientras una condición especificada sea `true`. La condición se evalúa antes de cada iteración.

    ```javascript
    let contador = 0;
    while (contador < 3) {
        console.log("Contador: " + contador);
        contador++;
    }
    ```

3.  **`do...while`**:
    Similar a `while`, pero la condición se evalúa *después* de ejecutar el bloque de código por primera vez. Esto garantiza que el bloque se ejecute al menos una vez.

    ```javascript
    let i = 0;
    do {
        console.log("Valor: " + i);
        i++;
    } while (i < 0); // Se ejecuta una vez, aunque la condición sea falsa inicialmente
    ```

4.  **`for...in`**:
    Itera sobre las propiedades **enumerables** de un objeto. No se recomienda para arrays debido a que puede iterar sobre propiedades inesperadas o en un orden no garantizado.

    ```javascript
    const persona = { nombre: "Pedro", edad: 30 };
    for (const clave in persona) {
        console.log(`${clave}: ${persona[clave]}`);
    }
    // Salida:
    // nombre: Pedro
    // edad: 30
    ```

5.  **`for...of`** (ES6):
    Itera sobre valores de objetos **iterables** (como `Array`, `String`, `Map`, `Set`, `NodeList`). Es la forma preferida para iterar sobre los elementos de arrays.

    ```javascript
    const colores = ["rojo", "verde", "azul"];
    for (const color of colores) {
        console.log(color);
    }
    // Salida:
    // rojo
    // verde
    // azul
    ```

#### Control de Flujo Adicional

*   **`break`**: Termina la ejecución del bucle más interno o de la sentencia `switch` y transfiere el control a la sentencia siguiente.
*   **`continue`**: Salta la iteración actual de un bucle y continúa con la siguiente.
*   **`return`**: Termina la ejecución de una función y devuelve un valor.

#### Consideraciones Adicionales

*   **Recursividad**: Una función que se llama a sí misma. Es una alternativa a los bucles para resolver ciertos problemas, pero requiere una condición de parada clara para evitar bucles infinitos y desbordamientos de pila.
*   **`eval()`**: Una función global que evalúa una cadena de texto como código JavaScript. **Su uso está altamente desaconsejado** debido a riesgos de seguridad (inyección de código) y problemas de rendimiento (dificulta la optimización por el motor de JS).

---

### Ejemplos Ampliados y Corregidos

```javascript
// Ejemplo 1: Uso de if-else if-else con múltiples condiciones
console.log("--- Condicionales: if-else if-else ---");
let hora = 14; // Hora en formato 24h

if (hora < 0 || hora > 24) {
    console.log("Hora inválida.");
} else if (hora < 12) {
    console.log("Buenos días.");
} else if (hora < 19) {
    console.log("Buenas tardes.");
} else {
    console.log("Buenas noches.");
}
// Salida: Buenas tardes.

// Ejemplo 2: switch para opciones de menú
console.log("\n--- Condicionales: switch ---");
let opcionMenu = 2; // 1: Abrir, 2: Guardar, 3: Cerrar

switch (opcionMenu) {
    case 1:
        console.log("Abriendo archivo...");
        break;
    case 2:
        console.log("Guardando cambios...");
        break;
    case 3:
        console.log("Cerrando aplicación.");
        break;
    default:
        console.log("Opción no reconocida.");
        break;
}
// Salida: Guardando cambios...

// Ejemplo 3: Bucle for con break y continue
console.log("\n--- Bucles: for con break y continue ---");
for (let i = 0; i < 10; i++) {
    if (i === 3) {
        console.log("Saltando la iteración 3.");
        continue; // Salta la iteración actual
    }
    if (i === 7) {
        console.log("Rompiendo el bucle en la iteración 7.");
        break; // Sale del bucle
    }
    console.log("Número: " + i);
}
// Salida:
// Número: 0
// Número: 1
// Número: 2
// Saltando la iteración 3.
// Número: 4
// Número: 5
// Número: 6
// Rompiendo el bucle en la iteración 7.


// Ejemplo 4: Iterando sobre un array y un objeto con for...of y for...in
console.log("\n--- Bucles: for...of y for...in ---");
const frutas = ["manzana", "pera", "uva"];
console.log("Frutas (for...of):");
for (const fruta of frutas) {
    console.log(fruta);
}

const config = { tema: "dark", idioma: "es", notificaciones: true };
console.log("Configuración (for...in):");
for (const key in config) {
    // Es buena práctica usar hasOwnProperty para evitar propiedades de la cadena de prototipos
    if (config.hasOwnProperty(key)) {
        console.log(`${key}: ${config[key]}`);
    }
}
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Calculadora Simple con `switch`**
    Cree una función `calcular(operacion, num1, num2)` que reciba una cadena `operacion` ("sumar", "restar", "multiplicar", "dividir") y dos números. Utilice una estructura `switch` para realizar la operación correspondiente y devolver el resultado. Si la operación no es válida, debe devolver un mensaje de error.

    ```javascript
    function calcular(operacion, num1, num2) {
        // Su código aquí
    }

    console.log(calcular("sumar", 5, 3));     // 8
    console.log(calcular("dividir", 10, 2));  // 5
    console.log(calcular("restar", 7, 4));    // 3
    console.log(calcular("multiplicar", 6, 3)); // 18
    console.log(calcular("potencia", 2, 3)); // "Operación no válida."
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Calculadora Simple con `switch`

    function calcular(operacion, num1, num2) {
        switch (operacion) {
            case "sumar":
                return num1 + num2;
            case "restar":
                return num1 - num2;
            case "multiplicar":
                return num1 * num2;
            case "dividir":
                if (num2 === 0) {
                    return "Error: División por cero.";
                }
                return num1 / num2;
            default:
                return "Operación no válida.";
        }
    }

    console.log(calcular("sumar", 5, 3));     // 8
    console.log(calcular("dividir", 10, 2));  // 5
    console.log(calcular("restar", 7, 4));    // 3
    console.log(calcular("multiplicar", 6, 3)); // 18
    console.log(calcular("potencia", 2, 3)); // "Operación no válida."
    console.log(calcular("dividir", 10, 0)); // "Error: División por cero."
    ```

2.  **Ejercicio: Suma de Elementos Pares en un Array**
    Escriba una función `sumarPares(arr)` que reciba un array de números. La función debe utilizar un bucle `for...of` para iterar sobre el array y sumar solo los números pares.

    ```javascript
    function sumarPares(arr) {
        // Su código aquí
    }

    console.log(sumarPares([1, 2, 3, 4, 5, 6])); // 12 (2 + 4 + 6)
    console.log(sumarPares([1, 3, 5, 7]));      // 0
    console.log(sumarPares([]));                // 0
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Suma de Elementos Pares en un Array

    function sumarPares(arr) {
        let suma = 0;
        for (const numero of arr) {
            if (numero % 2 === 0) { // Comprobamos si el número es par
                suma += numero;
            }
        }
        return suma;
    }

    console.log(sumarPares([1, 2, 3, 4, 5, 6])); // 12
    console.log(sumarPares([1, 3, 5, 7]));      // 0
    console.log(sumarPares([]));                // 0
    ```

---

### Glosario Técnico

*   **Estructura de Control**: Bloques de código que alteran el flujo normal de ejecución de un programa.
*   **Condicional**: Estructura que ejecuta código basado en si una condición es verdadera o falsa (ej. `if`, `else if`, `else`, `switch`, operador ternario).
*   **Bucle (Loop)**: Estructura que repite un bloque de código múltiples veces (ej. `for`, `while`, `do...while`, `for...in`, `for...of`).
*   **`if`**: Ejecuta un bloque de código si una condición es verdadera.
*   **`else if`**: Evalúa una condición alternativa si la anterior `if` o `else if` fue falsa.
*   **`else`**: Ejecuta un bloque de código si ninguna de las condiciones `if` o `else if` anteriores fue verdadera.
*   **`switch`**: Compara una expresión con múltiples valores posibles (`case`).
*   **`break`**: Termina la ejecución de un bucle o `switch`.
*   **`default`**: El bloque de código en un `switch` que se ejecuta si ningún `case` coincide.
*   **Operador Ternario**: Condicional conciso de una línea (`condicion ? valorSiVerdadero : valorSiFalso`).
*   **`for`**: Bucle para un número predefinido de iteraciones.
*   **`while`**: Bucle que se ejecuta mientras una condición es verdadera (evalúa antes de iterar).
*   **`do...while`**: Bucle que se ejecuta al menos una vez, y luego continúa mientras una condición sea verdadera (evalúa después de iterar).
*   **`for...in`**: Itera sobre las claves (nombres de propiedades) enumerables de un objeto.
*   **`for...of`**: Itera sobre los valores de objetos iterables (arrays, strings, etc.).
*   **`continue`**: Salta la iteración actual de un bucle y pasa a la siguiente.
*   **Recursividad**: Técnica donde una función se llama a sí misma para resolver un problema.
*   **`eval()`**: Función global (desaconsejada) que ejecuta código JavaScript a partir de una cadena.

```javascript
