# Ejemplos: Async / Await

## 1. Reescribiendo Promesas a Async/Await

### Versión Promesas

```javascript
function getUsuario(id) {
  return fetch(`/api/users/${id}`)
    .then((res) => res.json())
    .then((user) => {
      return fetch(`/api/posts/${user.postId}`);
    })
    .then((res) => res.json())
    .catch((err) => console.error(err));
}
```

### Versión Async/Await

```javascript
async function getUsuario(id) {
  try {
    const resUser = await fetch(`/api/users/${id}`);
    const user = await resUser.json();

    const resPost = await fetch(`/api/posts/${user.postId}`);
    const post = await resPost.json();

    return post;
  } catch (err) {
    console.error(err);
  }
}
```

## 2. Loops Asíncronos (Cuidado)

Usar `forEach` con async/await **NO** funciona como esperas (no espera a que termine la callback). Usa `for...of`.

```javascript
const urls = ["url1", "url2", "url3"];

// MAL: Se disparan todas "a la vez" pero el contexto superior no espera
urls.forEach(async (url) => {
  const res = await fetch(url);
  console.log(res);
});

// BIEN (Secuencial): Espera uno por uno
async function procesarSerie() {
  for (const url of urls) {
    const res = await fetch(url);
    console.log(res);
  }
}

// BIEN (Paralelo): Dispara todos y espera al final
async function procesarParalelo() {
  const promesas = urls.map((url) => fetch(url));
  const resultados = await Promise.all(promesas);
}
```
