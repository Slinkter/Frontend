# Ejercicios: Promesas

## Ejercicio 1: Delay Promisificado

Crea una función llamada `delay` que reciba una duración en milisegundos y retorne una promesa que se resuelva después de ese tiempo.

```javascript
function delay(ms) {
  // Tu código
}

delay(1000).then(() => console.log("Hola después de 1 segundo"));
```

<details>
<summary>Ver Solución</summary>

```javascript
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
```

</details>

## Ejercicio 2: Carrera de Promesas

Simula dos peticiones a servidor con `setTimeout`. Una tarda 500ms y otra 1000ms. Usa `Promise.race` para obtener el resultado de la más rápida.

```javascript
const peticionLenta = new Promise((resolve) =>
  setTimeout(() => resolve("Lenta"), 1000)
);
const peticionRapida = new Promise((resolve) =>
  setTimeout(() => resolve("Rápida"), 500)
);

// Tu código
```

<details>
<summary>Ver Solución</summary>

```javascript
Promise.race([peticionLenta, peticionRapida]).then((ganadora) =>
  console.log(ganadora)
); // "Rápida"
```

</details>

## Ejercicio 3: Importante - Manejo de Errores

¿Qué imprime el siguiente código?

```javascript
Promise.resolve("Éxito")
  .then((res) => {
    throw new Error("Oh no!");
  })
  .catch((err) => {
    return "Error recuperado";
  })
  .then((res) => {
    console.log(res);
  });
```

<details>
<summary>Ver Solución</summary>

**Imprime:** `"Error recuperado"`

**Explicación:**

1. El primer `then` lanza un error, por lo que la promesa se rechaza.
2. El `catch` atrapa el error. Como el `catch` NO lanza otro error y retorna un string, la cadena de promesas se "recupera" y pasa a estado `fulfilled` con el valor retornado.
3. El último `then` recibe el valor retornado por el `catch`.
</details>
