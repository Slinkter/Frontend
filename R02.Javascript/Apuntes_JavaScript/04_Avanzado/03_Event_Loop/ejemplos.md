# Ejemplos: Orden de Ejecución (Event Loop)

## 1. Stack vs Microtasks vs Tasks

Analiza el siguiente código y predice el orden.

```javascript
console.log("1. Script start");

setTimeout(() => {
  console.log("2. Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise");
});

console.log("4. Script end");
```

### Explicación Paso a Paso:

1. `console.log('1...')` -> Stack -> Ejecuta -> Sale.
2. `setTimeout` -> Web API (Timer 0ms) -> Callback Queue (espera).
3. `Promise` -> Resuelta -> `.then` va a Microtask Queue.
4. `console.log('4...')` -> Stack -> Ejecuta -> Sale.
5. Stack vacío. Event Loop revisa Microtasks.
6. Ejecuta `console.log('3. Promise')`. Microtasks vacía.
7. Event Loop revisa Callback Queue.
8. Ejecuta `console.log('2. Timeout')`.

**Resultado:** 1, 4, 3, 2.

## 2. Inanición del Event Loop (Starvation)

Si llenamos infinitamente la Microtask Queue, la Callback Queue (ej. clicks del usuario) NUNCA se ejecutará.

```javascript
// Cuidado: Esto bloqueará el navegador aunque sea asíncrono
function loopInfinito() {
  return Promise.resolve().then(loopInfinito);
}
// loopInfinito();
```

El Event Loop se quedará atrapado vaciando microtasks y nunca pasará al renderizado ni a la Callback Queue.
