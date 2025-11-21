# Ejercicios Propuestos: Variables y Tipos de Datos

## Ejercicio 1: Análisis de Scope

**Objetivo:** Analizar el scope de las variables y predecir la salida del código.

**Instrucciones:**
Observa el siguiente bloque de código. Sin ejecutarlo, predice qué se imprimirá en la consola y por qué.

```javascript
let a = 1;
const b = 2;

function miFuncion() {
  let c = 3;
  console.log(a); // ¿Qué se imprime aquí?

  if (true) {
    let a = 4; // Shadowing de la variable 'a' global
    console.log(a); // ¿Qué se imprime aquí?
    console.log(b); // ¿Qué se imprime aquí?
  }

  console.log(a); // ¿Qué se imprime aquí?
}

miFuncion();
// console.log(c); // ¿Qué sucede si descomentamos esta línea?
```

<details>
<summary>Solución Razonada</summary>

1.  **`console.log(a);` (dentro de la función, antes del `if`)**: Imprime `1`. La función `miFuncion` tiene acceso al scope global, donde `a` fue declarada e inicializada con el valor `1`.

2.  **`console.log(a);` (dentro del `if`)**: Imprime `4`. Dentro del bloque `if`, se declara una nueva variable `a` con `let`. Esta variable "ensombrece" (shadows) a la variable `a` del scope global solo dentro de este bloque. Por lo tanto, se imprime el valor de la `a` local.

3.  **`console.log(b);` (dentro del `if`)**: Imprime `2`. La variable `b` fue declarada en el scope global y es accesible desde cualquier scope anidado.

4.  **`console.log(a);` (dentro de la función, después del `if`)**: Imprime `1`. El scope del `let a = 4;` ha terminado. Volvemos al scope de la función, que sigue teniendo acceso a la variable `a` global, cuyo valor no ha cambiado.

5.  **`console.log(c);` (fuera de la función)**: Si se descomenta esta línea, se producirá un `ReferenceError: c is not defined`. La variable `c` fue declarada con `let` dentro de `miFuncion`, por lo que solo existe en el scope de esa función y no es accesible desde fuera.
</details>

---

## Ejercicio 2: Inmutabilidad vs. Mutabilidad

**Objetivo:** Demostrar la diferencia entre la manipulación de tipos de datos primitivos y objetos.

**Instrucciones:**
1.  Crea una función `modificarPrimitivo` que acepte un string, lo modifique dentro de la función y no devuelva nada.
2.  Crea una función `modificarObjeto` que acepte un objeto, modifique una de sus propiedades y no devuelva nada.
3.  Declara una variable con un string y otra con un objeto. Pásalas a sus respectivas funciones y, después, imprime ambas variables en la consola. Explica el resultado.

```javascript
// Tu código aquí

// Solución y análisis
```

<details>
<summary>Solución Razonada</summary>

```javascript
// 1. Función para primitivo
function modificarPrimitivo(str) {
  str = 'String modificado'; // Se reasigna 'str' a un nuevo valor en el scope local
}

// 2. Función para objeto
function modificarObjeto(obj) {
  obj.propiedad = 'Propiedad modificada'; // Se modifica el objeto a través de su referencia
}

// 3. Declaración e invocación
let miString = 'String original';
let miObjeto = { propiedad: 'Propiedad original' };

modificarPrimitivo(miString);
modificarObjeto(miObjeto);

console.log(miString); // Imprime 'String original'
console.log(miObjeto); // Imprime { propiedad: 'Propiedad modificada' }
```

**Explicación:**

-   **`miString`**: Los strings son primitivos y se pasan **por valor**. Cuando `modificarPrimitivo` es llamada, `str` se convierte en una copia local de `miString`. La reasignación `str = 'String modificado'` solo afecta a la variable `str` dentro del scope de la función. La variable original `miString` permanece inalterada.

-   **`miObjeto`**: Los objetos se pasan **por referencia**. La variable `obj` dentro de `modificarObjeto` recibe una referencia que apunta al *mismo objeto* en memoria que `miObjeto`. Por lo tanto, al modificar `obj.propiedad`, estamos modificando directamente el objeto original, y el cambio persiste fuera de la función.
</details>
