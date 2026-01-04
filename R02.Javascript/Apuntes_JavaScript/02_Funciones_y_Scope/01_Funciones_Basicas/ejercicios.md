# Ejercicios: Funciones

## Ejercicio 1: Convertir a Arrow Function

Reescribe la siguiente función usando sintaxis de Arrow Function y retorno implícito si es posible.

```javascript
function multiplicar(a, b) {
  return a * b;
}
```

<details>
<summary>Ver Solución</summary>

```javascript
const multiplicar = (a, b) => a * b;
```

</details>

## Ejercicio 2: Scope en Funciones

¿Qué imprime el siguiente código?

```javascript
let mensaje = "Hola Global";

function mostrar() {
  let mensaje = "Hola Local";
  console.log(mensaje);
}

mostrar();
console.log(mensaje);
```

<details>
<summary>Ver Solución</summary>

```text
"Hola Local"
"Hola Global"
```

</details>

## Ejercicio 3: Higher Order Functions (Intro)

Crea una función llamada `repetir` que reciba un número `n` y una función `accion`. La función `accion` debe ejecutarse `n` veces.

```javascript
function repetir(n, accion) {
  // Tu código
}

repetir(3, () => console.log("Hola"));
```

<details>
<summary>Ver Solución</summary>

```javascript
function repetir(n, accion) {
  for (let i = 0; i < n; i++) {
    accion(i); // Opcionalmente pasamos el índice
  }
}
```

</details>
