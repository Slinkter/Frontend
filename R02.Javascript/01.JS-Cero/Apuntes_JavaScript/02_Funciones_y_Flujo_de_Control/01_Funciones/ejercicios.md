# Ejercicios Propuestos: Funciones

## Ejercicio 1: Refactorización a Función de Flecha

**Objetivo:** Practicar la sintaxis de las funciones de flecha y el retorno implícito.

**Instrucciones:**
Toma el siguiente array de objetos y utiliza el método `.map()` para crear un nuevo array de strings. Cada string debe tener el formato `"Nombre: [nombre], Edad: [edad]"`. Resuelve el ejercicio utilizando una función de flecha concisa (en una sola línea).

```javascript
const usuarios = [
  { id: 1, nombre: 'Carlos', edad: 30 },
  { id: 2, nombre: 'Isabel', edad: 25 },
  { id: 3, nombre: 'David', edad: 42 }
];

// Tu código aquí
const descripciones = usuarios.map(/* ... */);

console.log(descripciones);
// Esperado:
// [
//   "Nombre: Carlos, Edad: 30",
//   "Nombre: Isabel, Edad: 25",
//   "Nombre: David, Edad: 42"
// ]
```

<details>
<summary>Solución Razonada</summary>

```javascript
const usuarios = [
  { id: 1, nombre: 'Carlos', edad: 30 },
  { id: 2, nombre: 'Isabel', edad: 25 },
  { id: 3, nombre: 'David', edad: 42 }
];

// Solución:
// El método .map() espera un callback. Usamos una función de flecha.
// 'usuario' es el parámetro que representa cada objeto del array.
// Usamos plantillas literales para construir el string.
// Como es una sola expresión, podemos usar el retorno implícito.
const descripciones = usuarios.map(
  usuario => `Nombre: ${usuario.nombre}, Edad: ${usuario.edad}`
);

console.log(descripciones);
```

**Explicación:**
El método `.map()` crea un nuevo array aplicando una función (el callback) a cada elemento del array original.
1.  **`usuario => ...`**: Definimos una función de flecha que recibe un parámetro, `usuario`, que será cada uno de los objetos del array `usuarios` en cada iteración.
2.  **`` `Nombre: ${usuario.nombre}, Edad: ${usuario.edad}` ``**: Esta es una plantilla literal que construye el string deseado. Como es la única expresión en la función de flecha, se convierte en su valor de retorno implícito.
3.  `.map()` recolecta cada uno de estos strings devueltos y los agrupa en el nuevo array `descripciones`.

Esta solución es un ejemplo perfecto de código JavaScript moderno: conciso, declarativo y altamente legible.
</details>

---

## Ejercicio 2: Creación de una Función de Orden Superior

**Objetivo:** Diseñar una función que devuelva otra función (un closure) para crear un sistema de filtrado genérico.

**Instrucciones:**
Crea una función de orden superior llamada `filtrarPorPropiedad`. Esta función debe aceptar un nombre de propiedad (un string, por ejemplo, `"categoria"`) y devolver una **nueva función**.

La función devuelta debe aceptar un valor y, a su vez, devolver **otra nueva función**.

Esta última función será el callback final para un `.filter()`. Aceptará un objeto y devolverá `true` si la propiedad del objeto coincide con el valor proporcionado.

El objetivo es poder usarla de la siguiente manera:
`productos.filter(filtrarPorPropiedad("categoria")("Electrónica"))`

```javascript
const productos = [
  { nombre: 'Laptop', categoria: 'Electrónica', precio: 1200 },
  { nombre: 'Libro', categoria: 'Libros', precio: 25 },
  { nombre: 'Monitor', categoria: 'Electrónica', precio: 300 },
  { nombre: 'Teclado', categoria: 'Accesorios', precio: 50 }
];

// Tu código para 'filtrarPorPropiedad' aquí

// Casos de prueba
const filtrarPorElectronica = filtrarPorPropiedad("categoria")("Electrónica");
const productosElectronicos = productos.filter(filtrarPorElectronica);
console.log(productosElectronicos);
// Esperado: [{ nombre: 'Laptop', ... }, { nombre: 'Monitor', ... }]

const productosDeLibros = productos.filter(filtrarPorPropiedad("categoria")("Libros"));
console.log(productosDeLibros);
// Esperado: [{ nombre: 'Libro', ... }]
```

<details>
<summary>Solución Razonada</summary>

```javascript
const productos = [
  { nombre: 'Laptop', categoria: 'Electrónica', precio: 1200 },
  { nombre: 'Libro', categoria: 'Libros', precio: 25 },
  { nombre: 'Monitor', categoria: 'Electrónica', precio: 300 },
  { nombre: 'Teclado', categoria: 'Accesorios', precio: 50 }
];

// Solución con funciones de flecha (currying)
const filtrarPorPropiedad = (propiedad) => (valor) => (objeto) => {
  return objeto[propiedad] === valor;
};

// Solución con funciones tradicionales para mayor claridad
function filtrarPorPropiedadTradicional(propiedad) {
  // La primera función recuerda 'propiedad'
  return function(valor) {
    // La segunda función recuerda 'propiedad' y 'valor'
    return function(objeto) {
      // Esta es la función que finalmente se pasa a .filter()
      return objeto[propiedad] === valor;
    };
  };
}


// Casos de prueba
const filtrarPorElectronica = filtrarPorPropiedad("categoria")("Electrónica");
const productosElectronicos = productos.filter(filtrarPorElectronica);
console.log(productosElectronicos);

const productosDeLibros = productos.filter(filtrarPorPropiedad("categoria")("Libros"));
console.log(productosDeLibros);
```

**Explicación:**

Este patrón se conoce como **currificación (currying)**, que consiste en tomar una función que acepta múltiples argumentos y transformarla en una secuencia de funciones, cada una aceptando un solo argumento.

1.  **`filtrarPorPropiedad("categoria")`**: Se llama a la primera función. Esta recuerda la `propiedad` (`"categoria"`) y devuelve la segunda función.

2.  **`("Electrónica")`**: Se llama a la segunda función, pasándole el `valor` (`"Electrónica"`). Esta función, a su vez, recuerda tanto `propiedad` como `valor` y devuelve la tercera y última función.

3.  **`productos.filter(...)`**: El método `.filter` recibe la tercera función. Por cada `producto` en el array, `.filter` la ejecuta: `(objeto) => objeto["categoria"] === "Electrónica"`. Esta función devuelve `true` o `false`, que es exactamente lo que `.filter` necesita para decidir si mantener o descartar el elemento.

Este enfoque permite crear "filtros" altamente reutilizables y configurables de una manera muy funcional y declarativa.
</details>
