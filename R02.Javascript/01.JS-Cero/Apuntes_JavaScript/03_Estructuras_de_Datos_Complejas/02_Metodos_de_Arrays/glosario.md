# Glosario de Términos: Métodos de Arrays

### Método de Array
**Definición:** Una función que pertenece al prototipo del objeto `Array` y que realiza una operación sobre un array. Se clasifican principalmente en métodos de iteración, mutables y de acceso.

### Callback (Función de Devolución de Llamada)
**Definición:** Una función que se pasa como argumento a un método de array (como `map`, `filter`, `forEach`, etc.). El método del array se encarga de ejecutar este callback para cada uno de los elementos del array.

### Métodos de Iteración (Inmutables)
**Definición:** Métodos que recorren un array para realizar una operación, generalmente devolviendo un nuevo array o un valor agregado. No modifican el array original.

- **`map(callback)`:** Ejecuta el `callback` en cada elemento y devuelve un **nuevo array** con los resultados de cada llamada. El array resultante siempre tiene la misma longitud que el original.
  - `callback(elemento, indice, array)`

- **`filter(callback)`:** Devuelve un **nuevo array** que contiene solo los elementos para los cuales el `callback` devolvió `true` (o un valor "truthy").
  - `callback(elemento, indice, array)`

- **`reduce(callback, valorInicial)`:** Ejecuta un `callback` "reductor" en cada elemento del array para reducirlo a un **único valor**.
  - `callback(acumulador, elemento, indice, array)`
  - `valorInicial` es opcional, pero muy recomendado. Es el valor inicial del `acumulador`.

- **`forEach(callback)`:** Ejecuta el `callback` para cada elemento del array. Su principal propósito es ejecutar **efectos secundarios** (como `console.log`). Su valor de retorno es siempre `undefined`.

### Métodos de Búsqueda y Condicionales
**Definición:** Métodos que verifican si los elementos de un array cumplen ciertas condiciones.

- **`find(callback)`:** Devuelve el **primer elemento** del array que cumple con la condición del `callback`. Si ningún elemento cumple la condición, devuelve `undefined`.
  - `callback(elemento, indice, array)`

- **`findIndex(callback)`:** Similar a `find`, pero devuelve el **índice** del primer elemento que cumple la condición. Si no lo encuentra, devuelve `-1`.

- **`some(callback)`:** Devuelve `true` si **al menos un elemento** del array cumple con la condición del `callback`. Se detiene tan pronto como encuentra uno. Devuelve `false` si ninguno cumple.
  - `callback(elemento, indice, array)`

- **`every(callback)`:** Devuelve `true` si **todos los elementos** del array cumplen con la condición del `callback`. Se detiene tan pronto como encuentra uno que no cumple. Devuelve `false` si al menos uno no cumple.
  - `callback(elemento, indice, array)`

- **`includes(valor, desdeIndice)`:** Devuelve `true` si el array contiene un `valor` específico, o `false` si no. Utiliza una comparación estricta (`===`), pero con la particularidad de que puede encontrar `NaN`.

### Métodos de Aplanamiento (ES2019)
**Definición:** Métodos para trabajar con arrays anidados.

- **`flat(profundidad)`:** Crea un **nuevo array** con todos los sub-arrays concatenados recursivamente hasta la `profundidad` especificada. `profundidad` por defecto es `1`.
- **`flatMap(callback)`:** Equivalente a ejecutar un `map` seguido de un `flat` con profundidad `1`. Es más eficiente que hacer las dos operaciones por separado.

### `sort(callbackDeComparacion)`
**Definición:** Un método **mutable** que ordena los elementos de un array. Por defecto, convierte los elementos a strings y los ordena lexicográficamente. Para ordenar numéricamente o de forma personalizada, es **esencial** proporcionar un `callbackDeComparacion`.
- `callbackDeComparacion(a, b)`:
  - Debe devolver un número negativo si `a` debe ir antes que `b`.
  - Debe devolver un número positivo si `b` debe ir antes que `a`.
  - Debe devolver `0` si su orden relativo no cambia.
  - **Para orden ascendente numérico:** `(a, b) => a - b`
  - **Para orden descendente numérico:** `(a, b) => b - a`
