# Ejercicios: Fundamentos de Variables

## Ejercicio 1: Análisis de Scope

¿Cuál será el resultado en consola del siguiente código? Justifica tu respuesta.

```javascript
var a = 1;
let b = 2;

if (true) {
  var a = 10;
  let b = 20;
  console.log("Dentro del bloque:", a, b);
}

console.log("Fuera del bloque:", a, b);
```

<details>
<summary>Ver Solución</summary>

**Resultado:**

- Dentro del bloque: 10, 20
- Fuera del bloque: 10, 2

**Justificación:**

- `var a` no respeta el scope de bloque del `if`, por lo tanto, la re-declaración dentro del bloque sobrescribe la variable global `a`, cambiando su valor a 10 permanentemente.
- `let b` tiene scope de bloque. La variable `b` dentro del `if` es una variable totalmente distinta a la `b` de fuera. Al salir del bloque, la `b` externa mantiene su valor original de 2.
</details>

## Ejercicio 2: Inmutabilidad

Dado el siguiente objeto declarado con `const`, ¿cómo podrías evitar que sus propiedades sean modificadas?

```javascript
const config = {
  apiKey: "12345",
  url: "https://api.com",
};

config.url = "https://hacker.com"; // Actualmente esto es posible.
```

Investiga sobre `Object.freeze()`.

<details>
<summary>Ver Solución</summary>

Se debe utilizar `Object.freeze(config)`.

```javascript
const config = {
  apiKey: "12345",
  url: "https://api.com",
};

Object.freeze(config);

config.url = "https://hacker.com"; // Esto no tendrá efecto (o lanzará error en Strict Mode)
console.log(config.url); // "https://api.com"
```

**Explicación:** `const` solo protege la referencia de la variable. `Object.freeze()` protege el contenido del objeto, haciéndolo inmutable a nivel de propiedades shallow (superficiales).

</details>

## Ejercicio 3: Tipos de Datos

Identifica el tipo de dato de las siguientes expresiones sin ejecutar el código:

1. `typeof NaN`
2. `typeof (1 + "2")`
3. `typeof (!!1)`

<details>
<summary>Ver Solución</summary>

1. **"number"**: `NaN` (Not a Number) es técnicamente un valor numérico definido en el estándar IEEE 754.
2. **"string"**: Al sumar un número y un string, JS coerze el número a string y concatena. "12".
3. **"boolean"**: El operador `!` niega, `!!` saca el valor booleano verdadero ("truthy") del número 1.
</details>
