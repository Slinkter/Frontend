# Ejercicios: Event Loop Quiz

## Ejercicio 1: Predicción Avanzada

¿Cuál es el orden de salida?

```javascript
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("script end");
```

<details>
<summary>Ver Solución</summary>

**Orden:**

1. `script start`
2. `async1 start`
3. `async2` (Síncrono dentro de async)
4. `promise1` (El executor de Promise es síncrono)
5. `script end`
6. `async1 end` (Microtask - await retorna y pone el resto en microtask)
7. `promise2` (Microtask)
8. `setTimeout` (Macrotask)

Nota: Dependiendo del entorno, `async1 end` y `promise2` pueden intercambiarse, pero ambos van antes de `setTimeout`.

</details>

## Ejercicio 2: Bloqueo Visual

¿Por qué el siguiente código congela el GIF de carga de la página?

```javascript
function calculoPesado() {
  // Loop de 5 segundos
  const end = Date.now() + 5000;
  while (Date.now() < end) {}
  console.log("Terminado");
}
```

<details>
<summary>Ver Solución</summary>

Porque JavaScript corre en el mismo hilo que el renderizado del navegador (UI). El `while` mantiene ocupado el Call Stack durante 5 segundos. El Event Loop no puede dar paso a la tarea de "Render/Paint" hasta que el Stack esté vacío.

</details>
