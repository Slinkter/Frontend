# Ejercicios Propuestos: Arrays

## Ejercicio 1: Eliminación Inmutable

**Objetivo:** Practicar la eliminación de un elemento de un array de forma inmutable, sin usar `splice`.

**Instrucciones:**
Crea una función `eliminarElemento` que reciba dos argumentos: un array y un `id` del elemento a eliminar. La función debe devolver un **nuevo array** sin el objeto que tiene ese `id`. El array original no debe ser modificado. Utiliza métodos inmutables como `filter`.

```javascript
const usuarios = [
  { id: 101, nombre: 'Ana' },
  { id: 102, nombre: 'Luis' },
  { id: 103, nombre: 'Marta' }
];

// Tu código para la función 'eliminarElemento' aquí

// Casos de prueba
const idAEliminar = 102;
const usuariosActualizados = eliminarElemento(usuarios, idAEliminar);

console.log(usuariosActualizados); // Esperado: [{ id: 101, nombre: 'Ana' }, { id: 103, nombre: 'Marta' }]
console.log(usuarios); // Esperado: (el array original no debe cambiar)
// [{ id: 101, nombre: 'Ana' }, { id: 102, nombre: 'Luis' }, { id: 103, nombre: 'Marta' }]
```

<details>
<summary>Solución Razonada</summary>

```javascript
const usuarios = [
  { id: 101, nombre: 'Ana' },
  { id: 102, nombre: 'Luis' },
  { id: 103, nombre: 'Marta' }
];

function eliminarElemento(arr, id) {
  // El método .filter() es perfecto para esto.
  // Crea un nuevo array que contiene solo los elementos para los cuales
  // la función de callback devuelve 'true'.
  // En este caso, mantenemos todos los usuarios cuyo 'id' NO es igual
  // al 'id' que queremos eliminar.
  return arr.filter(usuario => usuario.id !== id);
}

// Casos de prueba
const idAEliminar = 102;
const usuariosActualizados = eliminarElemento(usuarios, idAEliminar);

console.log('Array actualizado:', usuariosActualizados);
console.log('Array original:', usuarios);
```

**Explicación:**
El método `filter` es la herramienta inmutable ideal para la eliminación. Itera sobre cada `usuario` del array `usuarios` y ejecuta la condición `usuario.id !== id`.
-   Para `{ id: 101, ... }`: `101 !== 102` es `true`. El elemento se mantiene.
-   Para `{ id: 102, ... }`: `102 !== 102` es `false`. El elemento es descartado.
-   Para `{ id: 103, ... }`: `103 !== 102` es `true`. El elemento se mantiene.

`filter` devuelve un **nuevo array** con los elementos que pasaron la prueba, cumpliendo así el requisito de inmutabilidad. El array `usuarios` original permanece intacto.
</details>

---

## Ejercicio 2: Transformación y Agregación de Datos

**Objetivo:** Combinar los métodos `filter`, `map` y `reduce` para realizar una transformación de datos compleja.

**Instrucciones:**
Dado el siguiente array de transacciones, realiza las siguientes operaciones en una sola cadena de métodos:
1.  Filtra solo las transacciones que son de tipo `"ingreso"`.
2.  De las transacciones filtradas, extrae (mapea) solo sus montos.
3.  Suma (reduce) todos los montos para obtener el total de ingresos.

```javascript
const transacciones = [
  { id: 'a', tipo: 'ingreso', monto: 150 },
  { id: 'b', tipo: 'gasto', monto: 50 },
  { id: 'c', tipo: 'ingreso', monto: 200 },
  { id: 'd', tipo: 'gasto', monto: 80 },
  { id: 'e', tipo: 'ingreso', monto: 120 }
];

// Tu código aquí
const totalIngresos = /* ... encadena los métodos aquí ... */;

console.log(`El total de ingresos es: ${totalIngresos}`); // Esperado: 470
```

<details>
<summary>Solución Razonada</summary>

```javascript
const transacciones = [
  { id: 'a', tipo: 'ingreso', monto: 150 },
  { id: 'b', tipo: 'gasto', monto: 50 },
  { id: 'c', tipo: 'ingreso', monto: 200 },
  { id: 'd', tipo: 'gasto', monto: 80 },
  { id: 'e', tipo: 'ingreso', monto: 120 }
];

const totalIngresos = transacciones
  .filter(transaccion => transaccion.tipo === 'ingreso') // 1. Filtrar
  .map(ingreso => ingreso.monto)                        // 2. Mapear
  .reduce((acumulador, monto) => acumulador + monto, 0); // 3. Reducir

console.log(`El total de ingresos es: ${totalIngresos}`); // 470
```

**Explicación del Encadenamiento:**

El encadenamiento de métodos de array es una técnica poderosa de la programación funcional que permite realizar operaciones complejas de forma legible y sin variables intermedias.

1.  **`transacciones.filter(...)`**:
    -   **Entrada:** El array original `transacciones`.
    -   **Salida:** Un nuevo array que solo contiene los objetos de ingreso:
        `[{ id: 'a', ... }, { id: 'c', ... }, { id: 'e', ... }]`

2.  **`.map(...)`**:
    -   **Entrada:** El array resultante del `filter`.
    -   **Salida:** Un nuevo array que solo contiene los montos de los ingresos:
        `[150, 200, 120]`

3.  **`.reduce(...)`**:
    -   **Entrada:** El array de montos resultante del `map`.
    -   **Funcionamiento:**
        -   `reduce` toma dos argumentos: un callback `(acumulador, monto) => acumulador + monto` y un valor inicial para el acumulador, `0`.
        -   Iteración 1: `acumulador` es `0`, `monto` es `150`. Devuelve `150`.
        -   Iteración 2: `acumulador` es `150`, `monto` es `200`. Devuelve `350`.
        -   Iteración 3: `acumulador` es `350`, `monto` es `120`. Devuelve `470`.
    -   **Salida:** El valor final del acumulador: `470`.

Este patrón es extremadamente común para el procesamiento de datos en JavaScript.
</details>
