# Ejercicios: Objetos Avanzados

## Ejercicio 1: Propiedad Privada Simulada

Crea un objeto `cuentaBancaria` que tenga una propiedad `_saldo` que no sea enumerable (no debe salir en un loop for...in), pero que sea accesible públicamente.

```javascript
const cuentaBancaria = {
  _saldo: 1000,
  titular: "Juan",
};
// Tu código para ocultar _saldo
```

<details>
<summary>Ver Solución</summary>

```javascript
Object.defineProperty(cuentaBancaria, "_saldo", {
  enumerable: false,
});

for (let key in cuentaBancaria) {
  console.log(key); // Solo imprime "titular"
}
console.log(cuentaBancaria._saldo); // 1000 (Accesible)
```

</details>

## Ejercicio 2: Objeto Constante

Crea un objeto que no permita agregar nuevas propiedades ni borrar las existentes, pero que SÍ permita modificar los valores de las propiedades que ya tiene.

```javascript
const configuracion = {
  puerto: 8080,
  host: "localhost",
};

// Tu código
```

<details>
<summary>Ver Solución</summary>
Se usará `Object.seal()`

```javascript
Object.seal(configuracion);

configuracion.puerto = 3000; // Funciona
configuracion.nuevaProp = "test"; // No hace nada (ignorado)
delete configuracion.host; // No hace nada (ignorado)

console.log(configuracion); // { puerto: 3000, host: "localhost" }
```

</details>
