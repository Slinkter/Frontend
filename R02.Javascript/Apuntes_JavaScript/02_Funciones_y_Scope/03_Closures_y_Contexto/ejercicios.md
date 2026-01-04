# Ejercicios: Closures y Contexto

## Ejercicio 1: Solucionando el Loop con Closures

Si no pudiéramos usar `let` en el ejercicio del `setTimeout` del módulo anterior, ¿cómo lo solucionarías usando una IIFE (que crea un closure)?

```javascript
for (var i = 0; i < 3; i++) {
  // Tu código aquí para que imprima 0, 1, 2
  setTimeout(() => console.log(i), 100);
}
```

<details>
<summary>Ver Solución</summary>

```javascript
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
```

Se pasa `i` como argumento `j` a la IIFE. La función interna del `setTimeout` cierra sobre la variable `j` de la IIFE, que mantiene el valor correcto de esa iteración.

</details>

## Ejercicio 2: `this` perdido

¿Por qué falla el siguiente código y cómo lo arreglas usando `bind`?

```javascript
const usuario = {
  nombre: "Ana",
  saludar() {
    console.log(`Hola ${this.nombre}`);
  },
};

const saludarExterno = usuario.saludar;
saludarExterno(); // "Hola undefined"
```

<details>
<summary>Ver Solución</summary>

Falla porque al asignar el método a una variable suelta `saludarExterno`, se pierde el enlace con `usuario`. Al invocarla como `saludarExterno()`, es una invocación directa y `this` es global/undefined.

**Solución:**

```javascript
const saludarExterno = usuario.saludar.bind(usuario);
saludarExterno(); // "Hola Ana"
```

</details>
