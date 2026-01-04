# Ejercicios: Async / Await

## Ejercicio 1: Convertir función

Transforma la siguiente función basada en promesas a async/await.

```javascript
function esperarDosSegundos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Listo");
    }, 2000);
  });
}

function ejecutar() {
  console.log("Inicio");
  esperarDosSegundos().then((msg) => {
    console.log(msg);
    console.log("Fin");
  });
}
```

<details>
<summary>Ver Solución</summary>

```javascript
async function ejecutar() {
  console.log("Inicio");
  const msg = await esperarDosSegundos();
  console.log(msg);
  console.log("Fin");
}
```

</details>

## Ejercicio 2: Manejo de Errores

Crea una función `async` llamada `obtenerDatosSeguros` que llame a una función `apiInestable()`.

- Si `apiInestable` falla, debe atrapar el error y retornar un objeto `{ error: true, mensaje: "Falló" }`.
- Si tiene éxito, retorna `{ error: false, data: ... }`.

```javascript
async function apiInestable() {
  if (Math.random() > 0.5) throw new Error("Boom!");
  return "Datos correctos";
}

// Tu función aquí
```

<details>
<summary>Ver Solución</summary>

```javascript
async function obtenerDatosSeguros() {
  try {
    const data = await apiInestable();
    return { error: false, data };
  } catch (e) {
    return { error: true, mensaje: "Falló" };
  }
}
```

</details>
