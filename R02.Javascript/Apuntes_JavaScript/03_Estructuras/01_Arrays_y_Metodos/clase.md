# Clase 01: Arrays y Métodos de Iteración

## 1. Estructura de Datos: Array

Un Array en JavaScript es un objeto global de alto nivel tipo lista que se usa para almacenar secuencias de datos.

- **Tipado Dinámico:** Puede contener elementos de distintos tipos (`[1, "hola", true, {}]`).
- **Basado en Índices:** Acceso mediante índices numéricos empezando en 0.
- **Longitud Dinámica:** Se expanden o contraen automáticamente.

## 2. Métodos Mutables vs Inmutables

Es CRÍTICO distinguir entre métodos que modifican el array original y los que retornan uno nuevo. En la programación moderna (especialmente con React/Redux), se prefieren los inmutables.

### 2.1 Mutables (Modifican el original)

- `push()`, `pop()`: Añade/Elimina al final.
- `shift()`, `unshift()`: Elimina/Añade al inicio.
- `splice()`: Añade/Elimina en cualquier posición (Muy potente, pero destructivo).
- `sort()`: Ordena el array in-place.
- `reverse()`: Invierte el orden in-place.

### 2.2 Inmutables (Retornan nuevo array o valor)

- `concat()`: Une arrays.
- `slice()`: Extrae una porción (copia superficial).
- `toSorted()`, `toReversed()` (ES2023): Versiones inmutables de sort y reverse.
- **Map, Filter, Reduce:** (Ver abajo).

## 3. High Order Arrays Methods (La Trinidad Funcional)

Métodos que reciben una función callback para procesar cada elemento.

### 3.1 Map (`.map()`)

Transforma cada elemento del array.

- **Entrada:** Array de longitud N.
- **Salida:** NUEVO Array de longitud N.
- **Uso:** Convertir datos (ej. Array de Objetos -> Array de IDs).

### 3.2 Filter (`.filter()`)

Selecciona elementos que cumplan una condición.

- **Entrada:** Array de longitud N.
- **Salida:** NUEVO Array de longitud 0 a N.
- **Uso:** Eliminar elementos, buscar subconjuntos.

### 3.3 Reduce (`.reduce()`)

Reduce el array a un único valor (puede ser un número, string, objeto, u otro array).

- **Entrada:** Array de longitud N.
- **Salida:** Cualquier valor.
- **Uso:** Sumar totales, transformar estructuras de datos complejas.

## 4. Otros Métodos de Búsqueda y Validación

- `.find()`: Devuelve el _primer_ elemento que cumpla la condición.
- `.some()`: Devuelve `true` si _al menos uno_ cumple.
- `.every()`: Devuelve `true` si _todos_ cumplen.
- `.includes()`: Verifica si un valor primitivo existe.
- `.flat()`: "Aplana" arrays anidados (`[[1], [2]]` -> `[1, 2]`).
