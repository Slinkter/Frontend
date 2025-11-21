# Clase: El Arsenal Funcional de los Métodos de Array

## 1. Introducción: De la Iteración Imperativa a la Declarativa

Históricamente, la iteración sobre arrays en JavaScript se realizaba con bucles `for` imperativos. Este enfoque, aunque funcional, es verboso, propenso a errores (como los errores "off-by-one") y mezcla la lógica de la iteración (`cómo` hacerlo) con la lógica de negocio (`qué` hacer).

```javascript
// Enfoque imperativo
const numeros = [1, 2, 3];
const dobles = [];
for (let i = 0; i < numeros.length; i++) {
  dobles.push(numeros[i] * 2);
}
```

Los métodos de array modernos, popularizados por la programación funcional, ofrecen un enfoque **declarativo**. Abstraen el mecanismo de iteración y nos permiten expresar directamente nuestra intención.

```javascript
// Enfoque declarativo
const numeros = [1, 2, 3];
const dobles = numeros.map(n => n * 2);
```
Este cambio de paradigma no es solo sintáctico; promueve un código más limpio, legible y componible.

## 2. Los Tres Pilares de la Transformación de Arrays

`map`, `filter` y `reduce` son las herramientas fundamentales para la manipulación funcional e inmutable de arrays.

### 2.1. `map`: Transformación 1 a 1
`map` es el método para transformar una colección. Recorre un array, aplica una función de transformación a cada elemento y devuelve un **nuevo array** de la misma longitud con los elementos transformados.

**Principio clave:** Se usa cuando quieres un nuevo array de la misma longitud que el original, pero con sus elementos modificados.
**Caso de uso:** Extraer una propiedad de un array de objetos, convertir datos a un nuevo formato.

```javascript
const usuarios = [{ nombre: 'Ana' }, { nombre: 'Luis' }];
const nombres = usuarios.map(u => u.nombre); // ['Ana', 'Luis']
```

### 2.2. `filter`: Selección Condicional
`filter` es el método para seleccionar un subconjunto de una colección. Recorre un array, aplica una función de predicado (que devuelve `true` o `false`) a cada elemento y devuelve un **nuevo array** con solo los elementos que pasaron el predicado.

**Principio clave:** Se usa cuando quieres un nuevo array con algunos de los elementos del original.
**Caso de uso:** Eliminar elementos no válidos, buscar todos los elementos que coincidan con una condición.

```javascript
const numeros = [1, 2, 3, 4, 5, 6];
const pares = numeros.filter(n => n % 2 === 0); // [2, 4, 6]
```

### 2.3. `reduce`: El Agregador Universal
`reduce` es el más potente y abstracto de los tres. Su propósito es "reducir" un array a un único valor. Este "único valor" puede ser cualquier cosa: un número, un string, un booleano, un objeto, o incluso otro array.

`reduce` toma dos argumentos:
1.  Un `callback` reductor: `(acumulador, elementoActual) => nuevoAcumulador`
2.  Un `valorInicial` para el `acumulador`.

**Principio de Ingeniería:** **Siempre** proporcionar un `valorInicial`. Omitirlo hace que `reduce` use el primer elemento del array como valor inicial, lo cual puede causar errores inesperados, especialmente en arrays vacíos.

```javascript
// Caso de uso: Sumar todos los elementos
const total = numeros.reduce((suma, n) => suma + n, 0);

// Caso de uso avanzado: Agrupar objetos por una propiedad
const personas = [
  { nombre: 'Ana', ciudad: 'Madrid' },
  { nombre: 'Luis', ciudad: 'Barcelona' },
  { nombre: 'Marta', ciudad: 'Madrid' }
];
const personasPorCiudad = personas.reduce((acc, persona) => {
  const ciudad = persona.ciudad;
  if (!acc[ciudad]) {
    acc[ciudad] = [];
  }
  acc[ciudad].push(persona);
  return acc;
}, {});
// Resultado: { Madrid: [...], Barcelona: [...] }
```
`map` y `filter` pueden, de hecho, ser implementados usando `reduce`, lo que demuestra su flexibilidad fundamental.

## 3. Métodos de Búsqueda y Validación

A menudo, no necesitamos transformar o filtrar, sino simplemente encontrar un elemento o verificar una condición.

-   **`find` vs. `filter`**: `find` devuelve el **primer elemento** que cumple una condición y se detiene, lo que es más eficiente si solo necesitas un resultado. `filter` siempre recorre todo el array y devuelve un array de todos los resultados.
-   **`some` vs. `every`**: Son los "validadores" de arrays.
    -   `some` (alguno): Responde a la pregunta "¿Existe al menos un elemento que cumpla esto?". Devuelve `true` tan pronto como encuentra una coincidencia.
    -   `every` (todos): Responde a la pregunta "¿Cumplen todos los elementos esto?". Devuelve `false` tan pronto como encuentra un elemento que no cumple.
-   **`includes`**: Es la forma más simple y legible de comprobar la existencia de un valor primitivo en un array. Prefiérelo sobre `indexOf` para simples comprobaciones de existencia.

## 4. El Método `sort`: La Mutación Engañosa

El método `sort` es una excepción importante: es **mutable**. Modifica el array original. Además, su comportamiento por defecto puede ser muy engañoso.

```javascript
const precios = [100, 20, 5];
precios.sort(); // [100, 20, 5] -> Incorrecto. Ordena lexicográficamente: "100", "20", "5"
```

**Regla de oro:** Para ordenar cualquier cosa que no sean strings simples, **siempre** proporciona una función de comparación.

```javascript
// Orden ascendente numérico
precios.sort((a, b) => a - b); // [5, 20, 100]

// Orden descendente numérico
precios.sort((a, b) => b - a); // [100, 20, 5]
```
Si necesitas ordenar de forma inmutable, primero haz una copia del array: `[...miArray].sort(...)`.

## 5. Conclusión

Los métodos de array de JavaScript son mucho más que simples utilidades; son un conjunto de herramientas que permiten un estilo de programación funcional, declarativo y robusto. Dominar el uso correcto de `map`, `filter` y `reduce` es un paso crucial para pasar de escribir código que "funciona" a escribir código que es elegante, mantenible y expresivo. La elección deliberada de estos métodos sobre bucles imperativos es una característica distintiva del código JavaScript de alta calidad.
