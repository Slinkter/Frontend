# Glosario de Términos: Arrays

### Array (Arreglo)
**Definición:** Un objeto global, de alto nivel, que se utiliza para almacenar una colección ordenada de elementos en una única variable. Los arrays en JavaScript son de tamaño dinámico y pueden contener elementos de diferentes tipos de datos.

### Índice (Index)
**Definición:** La posición de un elemento dentro de un array. Los arrays en JavaScript están basados en un índice cero, lo que significa que el primer elemento se encuentra en el índice `0`, el segundo en el `1`, y así sucesivamente. El último elemento se encuentra en el índice `array.length - 1`.

### Elemento (Element)
**Definición:** Un valor individual dentro de un array. Puede ser de cualquier tipo de dato: `string`, `number`, `boolean`, `object`, `null`, `undefined`, e incluso otro `array`.

### Array Literal
**Definición:** La forma más común y recomendada de crear un array, utilizando corchetes `[]`.
- **Sintaxis:** `const miArray = [1, 'hola', true];`

### Propiedad `length`
**Definición:** Una propiedad fundamental de cada array que devuelve (o establece) el número de elementos en ese array. Es siempre un entero no negativo y es uno más que el índice más alto del array.

### Mutabilidad
**Definición:** Los arrays en JavaScript son objetos mutables. Esto significa que su contenido puede ser modificado después de su creación, por ejemplo, añadiendo, eliminando o cambiando elementos.
- **Ejemplo:** `miArray[0] = 'nuevo valor';` modifica el array original.

### Métodos Mutables (Mutator Methods)
**Definición:** Métodos de array que modifican el array original sobre el que son llamados.
- **Ejemplos clave:**
  - **`push(elem)`:** Añade uno o más elementos al **final** del array.
  - **`pop()`:** Elimina el **último** elemento del array y lo devuelve.
  - **`shift()`:** Elimina el **primer** elemento del array y lo devuelve.
  - **`unshift(elem)`:** Añade uno o más elementos al **principio** del array.
  - **`splice(start, deleteCount, ...items)`:** Un método poderoso para añadir, eliminar o reemplazar elementos en cualquier posición del array.
  - **`sort()`:** Ordena los elementos del array (a menudo requiere una función de comparación).
  - **`reverse()`:** Invierte el orden de los elementos del array.

### Métodos Inmutables (Non-Mutator/Accessor Methods)
**Definición:** Métodos de array que **no** modifican el array original, sino que devuelven un nuevo array o un nuevo valor como resultado de la operación. Estos métodos son la base de la programación funcional con arrays.
- **Ejemplos clave:**
  - **`map(callback)`:** Crea un nuevo array con los resultados de llamar a una función para cada elemento del array.
  - **`filter(callback)`:** Crea un nuevo array con todos los elementos que pasan la prueba implementada por la función proporcionada.
  - **`reduce(callback, initialValue)`:** Aplica una función a un acumulador y a cada elemento del array (de izquierda a derecha) para reducirlo a un solo valor.
  - **`slice(start, end)`:** Devuelve una copia superficial de una porción del array en un nuevo array.
  - **`concat(...arrays)`:** Se usa para unir dos o más arrays.
  - **`forEach(callback)`:** Ejecuta una función una vez por cada elemento del array (no devuelve nada útil, su valor de retorno es `undefined`).

### Copia Superficial (Shallow Copy)
**Definición:** Una copia de un array donde la estructura del array es copiada, pero los elementos internos (si son objetos o arrays) no son duplicados. La copia y el original comparten las mismas referencias a los objetos internos. Métodos como `slice()` y el operador de propagación (`...`) realizan copias superficiales.

### Operador de Propagación (Spread Operator - `...` - ES6)
**Definición:** Una sintaxis que permite expandir un iterable (como un array) en lugares donde se esperan cero o más argumentos (para llamadas a funciones) o elementos (para literales de array). Es una forma moderna y muy utilizada para crear copias de arrays y para la concatenación.
- **Sintaxis:** `const copia = [...miArray];`
