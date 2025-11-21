# Ejercicios Propuestos: Scope y Hoisting

## Ejercicio 1: Predicción de Salida

**Objetivo:** Evaluar la comprensión de la cadena de scopes, el scope de bloque y el hoisting.

**Instrucciones:**
Analiza el siguiente código y, sin ejecutarlo, predice el orden y el valor de cada `console.log`. Justifica cada predicción basándote en los conceptos de scope y hoisting.

```javascript
var a = 1;
let b = 2;

function funcionExterna() {
  var a = 10;
  let b = 20;

  console.log(a, b); // Predicción 1

  function funcionInterna() {
    var a = 100;
    console.log(a, b); // Predicción 2
  }

  funcionInterna();
  console.log(a); // Predicción 3
}

console.log(a); // Predicción 4
funcionExterna();
console.log(a, b); // Predicción 5
```

<details>
<summary>Solución Razonada</summary>

El orden de ejecución de los `console.log` es: 4, 1, 2, 3, 5.

1.  **Predicción 4: `console.log(a);` (línea 18)**
    -   **Salida:** `1`
    -   **Justificación:** Esta línea está en el scope global. Accede a la variable `a` global, que fue inicializada con `1`.

2.  **Predicción 1: `console.log(a, b);` (línea 8)**
    -   **Salida:** `10 20`
    -   **Justificación:** Estamos dentro de `funcionExterna`. Esta función tiene sus propias variables `a` (declarada con `var`) y `b` (declarada con `let`). Estas variables "ensombrecen" (shadow) a las globales. Por lo tanto, se imprimen los valores del scope de `funcionExterna`.

3.  **Predicción 2: `console.log(a, b);` (línea 12)**
    -   **Salida:** `100 20`
    -   **Justificación:** Ahora estamos en `funcionInterna`.
        -   Para `a`: `funcionInterna` tiene su propia variable `a` declarada con `var` e inicializada a `100`. Esta ensombrece a la `a` de `funcionExterna`. Se imprime `100`.
        -   Para `b`: `funcionInterna` no tiene su propia variable `b`. Siguiendo la cadena de scopes, busca en su scope padre, `funcionExterna`, donde encuentra `let b = 20`. Se imprime `20`.

4.  **Predicción 3: `console.log(a);` (línea 15)**
    -   **Salida:** `10`
    -   **Justificación:** La ejecución de `funcionInterna` ha terminado. Volvemos al scope de `funcionExterna`. La `var a = 100` de `funcionInterna` ya no existe. El `console.log` imprime el valor de la variable `a` que pertenece a `funcionExterna`, que es `10`.

5.  **Predicción 5: `console.log(a, b);` (línea 20)**
    -   **Salida:** `1 2`
    -   **Justificación:** La ejecución de `funcionExterna` ha terminado. Estamos de vuelta en el scope global. Las variables `a` y `b` de `funcionExterna` ya no son accesibles. Se imprimen los valores de las variables `a` y `b` globales.
</details>

---

## Ejercicio 2: El Clásico Bucle con `setTimeout`

**Objetivo:** Comprender por qué el scope de bloque de `let` resuelve un problema histórico de JavaScript.

**Instrucciones:**
1.  Ejecuta y analiza el primer bucle (con `var`). Explica por qué el resultado no es `0, 1, 2, 3, 4`.
2.  Ejecuta y analiza el segundo bucle (con `let`). Explica por qué este sí funciona como se espera.

```javascript
// Problema con 'var'
function bucleConVar() {
  for (var i = 0; i < 5; i++) {
    setTimeout(function() {
      console.log('var:', i);
    }, 10);
  }
}
bucleConVar(); // ¿Qué imprime y por qué?

// Solución con 'let'
function bucleConLet() {
  for (let i = 0; i < 5; i++) {
    setTimeout(function() {
      console.log('let:', i);
    }, 10);
  }
}
bucleConLet(); // ¿Qué imprime y por qué?
```

<details>
<summary>Solución Razonada</summary>

### 1. Análisis del Bucle con `var`

-   **Salida:**
    ```
    var: 5
    var: 5
    var: 5
    var: 5
    var: 5
    ```
-   **Justificación:**
    Debido a que `var` tiene **scope de función**, solo existe una única variable `i` para todo el bucle. El `setTimeout` programa la ejecución de las funciones callback para *después* de que el bucle haya terminado completamente. Para cuando los callbacks se ejecutan, el bucle ya ha finalizado, y el valor final de la variable `i` compartida es `5`. Todos los cinco callbacks, al ejecutarse, leen el mismo y único valor actual de `i`, que es `5`.

### 2. Análisis del Bucle con `let`

-   **Salida:**
    ```
    let: 0
    let: 1
    let: 2
    let: 3
    let: 4
    ```
-   **Justificación:**
    La palabra clave `let` tiene **scope de bloque**. Esto significa que en cada iteración del bucle `for`, se crea una **nueva variable `i`** con el valor correspondiente a esa iteración. Cada función callback de `setTimeout` "captura" (cierra sobre) una `i` diferente y específica de su propia iteración. Cuando los callbacks se ejecutan, cada uno tiene acceso a su propia "instantánea" de `i`, produciendo el resultado esperado.
</details>
