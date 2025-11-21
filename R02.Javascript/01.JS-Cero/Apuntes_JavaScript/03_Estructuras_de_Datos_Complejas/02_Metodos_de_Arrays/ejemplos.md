# Ejemplos Prácticos: Métodos de Arrays

## 1. `map`: Transformar Datos

`map` es ideal para crear un nuevo array basado en el original, pero con sus elementos transformados.

```javascript
// Ejemplo 1: Obtener una lista de nombres de un array de objetos
const usuarios = [
  { id: 1, nombre: 'Elena', activo: true },
  { id: 2, nombre: 'Javier', activo: false }
];
const nombres = usuarios.map(usuario => usuario.nombre);
console.log(nombres); // ['Elena', 'Javier']

// Ejemplo 2: Crear componentes React (un caso de uso muy común)
const items = ['Manzana', 'Banana', 'Cereza'];
// const listaItems = items.map(item => <li key={item}>{item}</li>);
// Esto crearía un array de elementos <li> para renderizar en una lista.
```

## 2. `filter`: Seleccionar Datos

`filter` crea un nuevo array con solo los elementos que pasan una prueba.

```javascript
// Ejemplo 3: Encontrar todos los productos en stock
const productos = [
  { nombre: 'Laptop', enStock: true },
  { nombre: 'Mouse', enStock: false },
  { nombre: 'Teclado', enStock: true }
];
const productosDisponibles = productos.filter(producto => producto.enStock);
console.log(productosDisponibles);
// [{ nombre: 'Laptop', enStock: true }, { nombre: 'Teclado', enStock: true }]
```

## 3. `reduce`: Agregar Datos

`reduce` es la herramienta definitiva para "resumir" un array en un solo valor.

```javascript
// Ejemplo 4: Calcular el total de un carrito de compras
const carrito = [
  { producto: 'Libro', precio: 20 },
  { producto: 'Café', precio: 5 },
  { producto: 'Auriculares', precio: 50 }
];
const total = carrito.reduce((sumaTotal, item) => sumaTotal + item.precio, 0);
console.log(`Total a pagar: $${total}`); // Total a pagar: $75

// Ejemplo 5: Contar la frecuencia de elementos en un array
const votos = ['React', 'Vue', 'Angular', 'React', 'Vue', 'React'];
const recuentoVotos = votos.reduce((recuento, voto) => {
  recuento[voto] = (recuento[voto] || 0) + 1;
  return recuento;
}, {});
console.log(recuentoVotos); // { React: 3, Vue: 2, Angular: 1 }
```

## 4. `find` vs `findIndex`: Encontrar un Elemento

A menudo solo necesitas un elemento, no un array de ellos.

```javascript
// Ejemplo 6: Encontrar un usuario por su ID
const personas = [
  { id: 15, nombre: 'Ana' },
  { id: 23, nombre: 'Carlos' },
  { id: 42, nombre: 'Sofía' }
];

const carlos = personas.find(persona => persona.nombre === 'Carlos');
console.log(carlos); // { id: 23, nombre: 'Carlos' }

const noEncontrado = personas.find(persona => persona.nombre === 'Jorge');
console.log(noEncontrado); // undefined

const indiceDeSofia = personas.findIndex(persona => persona.id === 42);
console.log(indiceDeSofia); // 2
```

## 5. `some` y `every`: Validar Contenido

Responden preguntas de "sí/no" sobre el contenido del array.

```javascript
// Ejemplo 7: Comprobar permisos
const permisos = ['LEER', 'ESCRIBIR'];

// ¿Tiene el usuario permiso para escribir?
const puedeEscribir = permisos.some(permiso => permiso === 'ESCRIBIR');
console.log('¿Puede escribir?', puedeEscribir); // true

// ¿Tiene el usuario permiso para borrar?
const puedeBorrar = permisos.some(permiso => permiso === 'BORRAR');
console.log('¿Puede borrar?', puedeBorrar); // false

// Ejemplo 8: Validar si todas las tareas están completadas
const tareas = [
  { nombre: 'Tarea 1', completada: true },
  { nombre: 'Tarea 2', completada: true },
  { nombre: 'Tarea 3', completada: true }
];
const todasCompletadas = tareas.every(tarea => tarea.completada);
console.log('¿Están todas completadas?', todasCompletadas); // true
```

## 6. `sort`: Ordenamiento Personalizado

Recuerda que `sort` es mutable y requiere una función de comparación para casi todo excepto strings simples.

```javascript
// Ejemplo 9: Ordenar usuarios por edad
const gente = [
  { nombre: 'Marta', edad: 35 },
  { nombre: 'David', edad: 22 },
  { nombre: 'Elena', edad: 40 }
];

// Para no mutar el original, primero creamos una copia
const genteOrdenada = [...gente].sort((a, b) => a.edad - b.edad); // Ascendente
console.log(genteOrdenada);
// [{ nombre: 'David', edad: 22 }, { nombre: 'Marta', edad: 35 }, { nombre: 'Elena', edad: 40 }]

const genteOrdenadaDesc = [...gente].sort((a, b) => b.edad - a.edad); // Descendente
console.log(genteOrdenadaDesc);
// [{ nombre: 'Elena', edad: 40 }, { nombre: 'Marta', edad: 35 }, { nombre: 'David', edad: 22 }]
```
