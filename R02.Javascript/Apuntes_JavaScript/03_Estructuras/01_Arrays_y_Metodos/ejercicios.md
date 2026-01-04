# Ejercicios: Arrays

## Ejercicio 1: Transformación de Datos (Reduce)

Dado un array de empleados, agrúpalos por departamento usando `reduce`. El resultado debe ser un objeto.

```javascript
const empleados = [
  { nombre: "Ana", depto: "Ventas" },
  { nombre: "Pepe", depto: "Sistemas" },
  { nombre: "Juan", depto: "Ventas" },
  { nombre: "Maria", depto: "Sistemas" },
];

// Resultado esperado:
// {
//   Ventas: ["Ana", "Juan"],
//   Sistemas: ["Pepe", "Maria"]
// }
```

<details>
<summary>Ver Solución</summary>

```javascript
const agrupados = empleados.reduce((acc, empleado) => {
  const { depto, nombre } = empleado;
  // Si la clave no existe, la inicializamos como array vacío
  if (!acc[depto]) {
    acc[depto] = [];
  }
  // Pusheamos el nombre
  acc[depto].push(nombre);
  return acc;
}, {}); // Valor inicial objeto vacío
```

</details>

## Ejercicio 2: Búsqueda y Validación

Tienes dos arrays de números. Encuentra los números que están presentes en AMBOS arrays (Intersección), sin duplicados.

```javascript
const a = [1, 2, 3, 4, 5];
const b = [3, 4, 5, 6, 7];
```

<details>
<summary>Ver Solución</summary>

```javascript
// Usando filter y includes
const interseccion = a.filter((num) => b.includes(num));
console.log(interseccion); // [3, 4, 5]

// Versión optimizada con Set (para O(1) búsqueda)
const setB = new Set(b);
const interseccionOpt = a.filter((num) => setB.has(num));
```

</details>

## Ejercicio 3: Palíndromos

Escribe una función que verifique si una palabra es un palíndromo usando métodos de array (split, reverse, join).

```javascript
function esPalindromo(str) {
  // Tu código
}
```

<details>
<summary>Ver Solución</summary>

```javascript
const esPalindromo = (str) => {
  const limpio = str.toLowerCase().replace(/[\W_]/g, ""); // Limpiar espacios/símbolos
  return limpio === limpio.split("").reverse().join("");
};
```

</details>
