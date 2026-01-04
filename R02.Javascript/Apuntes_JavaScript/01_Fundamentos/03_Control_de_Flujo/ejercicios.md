# Ejercicios: Control de Flujo

## Ejercicio 1: Switch

Convierte la siguiente cadena de `if/else` en un `switch`.

```javascript
const mascota = "perro";

if (mascota === "perro") {
  console.log("Guau");
} else if (mascota === "gato") {
  console.log("Miau");
} else if (mascota === "pajaro") {
  console.log("Pio");
} else {
  console.log("Silencio");
}
```

<details>
<summary>Ver Solución</summary>

```javascript
const mascota = "perro";

switch (mascota) {
  case "perro":
    console.log("Guau");
    break;
  case "gato":
    console.log("Miau");
    break;
  case "pajaro":
    console.log("Pio");
    break;
  default:
    console.log("Silencio");
}
// Nota: ¡No olvidar el break!
```

</details>

## Ejercicio 2: Bucles e Iteración

Dado un objeto con calificaciones de estudiantes, calcula el promedio usando un bucle.

```javascript
const calificaciones = {
  Juan: 10,
  Ana: 8,
  Pedro: 9,
};

// Tu código aquí
```

<details>
<summary>Ver Solución</summary>

```javascript
let suma = 0;
let cantidad = 0;

// Usamos Object.values() para obtener un array de los valores y poder usar for...of
// O usamos for...in para iterar las claves

// Opcion 1: for...of con Object.values
const notas = Object.values(calificaciones);
for (const nota of notas) {
  suma += nota;
}
const promedio = suma / notas.length;

console.log(promedio); // 9
```

</details>

## Ejercicio 3: Try/Catch y JSON

Escribe una función que intente parsear un string JSON. Si falla, debe devolver `null` en lugar de romper el programa.

```javascript
function safeJsonParse(str) {
  // Tu código
}
```

<details>
<summary>Ver Solución</summary>

```javascript
function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch (error) {
    return null;
  }
}

console.log(safeJsonParse('{"a":1}')); // {a: 1}
console.log(safeJsonParse("Not A JSON")); // null
```

</details>
