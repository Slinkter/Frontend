profesora github

https://github.com/platzi/curso-clean-code-javascript

# Scope en JavaScript

En JavaScript, el concepto de **scope** (alcance) determina dónde y cómo se pueden acceder a las variables. Existen tres tipos principales de scope: global, local (o de función) y de bloque. Cada uno tiene características distintas:

## Scope Global

-   Las variables declaradas en el scope global están disponibles en cualquier parte del código.
-   Se declaran fuera de cualquier función o bloque.
-   Ejemplo:

    ```javascript
    var globalVar = "Soy global";

    function mostrarGlobal() {
        console.log(globalVar); // Accede a la variable global
    }

    mostrarGlobal(); // Imprime "Soy global"
    ```

## Scope Local ( Función)

-   Las variables declaradas dentro de una función solo son accesibles dentro de esa función.
-   Se crean usando var, let o const dentro de una función.
-   Ejemplo:

```javascript
function miFuncion() {
    var localVar = "Soy local";
    console.log(localVar); // Accede a la variable local
}
miFuncion(); // Imprime "Soy local"
console.log(localVar); // Error: localVar no está definida fuera de la función
```

## Scope de Bloque (if)

-   Las variables declaradas dentro de un bloque (delimitado por {}) solo son accesibles dentro de ese bloque.
-   Se crean usando let o const.
-   Ejemplo:

```javascript
if (true) {
    let blockVar = "Soy de bloque";
    console.log(blockVar); // Accede a la variable de bloque
}
console.log(blockVar); // Error: blockVar no está definida fuera del bloque
```

## Diferencias Clave

-   Global vs Local: Las variables globales están disponibles en todo el programa, mientras que las locales solo dentro de la función donde se declaran.
-   Local vs Bloque: Las variables locales se limitan a la función, mientras que las de bloque se limitan al bloque específico donde se declaran.
-   Comprender estos tipos de scope es crucial para evitar errores y conflictos en tu código.

```

```
