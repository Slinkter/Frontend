# Ejercicios: Scope

## Ejercicio 1: Shadowing (Sombreado)

¿Qué se imprimirá en consola?

```javascript
let x = 10;

function prueba() {
  let x = 20;
  if (true) {
    let x = 30;
    console.log(x); // (A)
  }
  console.log(x); // (B)
}

prueba();
console.log(x); // (C)
```

<details>
<summary>Ver Solución</summary>

- (A): 30
- (B): 20
- (C): 10

**Explicación:** Cada declaración `let x` en un nuevo bloque "sombrea" (oculta) la variable con el mismo nombre del scope superior.

</details>

## Ejercicio 2: El loop clásico y `var`

Analiza el siguiente código, muy común en entrevistas.

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

¿Qué imprime? ¿Por qué? ¿Cómo lo arreglas con `let`?

<details>
<summary>Ver Solución</summary>

**Imprime:** `3` `3` `3`

**Por qué:** `var` tiene scope de función (o global aquí), no de bloque. La variable `i` es compartida por todas las iteraciones. Cuando el `setTimeout` se ejecuta después de 100ms, el bucle ya terminó y `i` vale 3.

**Solución con let:**

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

`let` crea un nuevo binding de `i` para cada iteración del bloque.

</details>
