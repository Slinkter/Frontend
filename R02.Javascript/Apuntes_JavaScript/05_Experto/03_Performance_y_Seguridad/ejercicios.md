# Ejercicios: Optimización

## Ejercicio 1: Implementar Memoización

Crea una función `memoize` que reciba una función costosa y la optimice cacheando sus resultados basados en los argumentos.

```javascript
function fibonacci(n) {
  if (n <= 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Tu función memoize
const fibonacciMemo = memoize(fibonacci);
```

<details>
<summary>Ver Solución</summary>

```javascript
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args); // Simple key gen
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

</details>

## Ejercicio 2: Fragmentos Documentales

Optimiza la siguiente función que inserta 1000 items al DOM uno por uno (causando 1000 reflows).

```javascript
const lista = document.getElementById("lista");
for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  lista.appendChild(li); // ❌ Costoso
}
```

<details>
<summary>Ver Solución</summary>

```javascript
const lista = document.getElementById("lista");
const fragment = document.createDocumentFragment(); // ✅ En memoria

for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}

lista.appendChild(fragment); // ✅ Solo 1 Reflow
```

</details>
