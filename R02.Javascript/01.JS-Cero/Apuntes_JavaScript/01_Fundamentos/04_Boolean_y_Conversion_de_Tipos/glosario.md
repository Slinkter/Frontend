# Glosario de Términos: Boolean y Conversión de Tipos

### Boolean (Booleano)
**Definición:** Un tipo de dato primitivo que representa un valor lógico. Solo puede tener uno de dos valores: `true` (verdadero) o `false` (falso). Es la base del flujo de control en la programación.

### Conversión de Tipo (Type Conversion)
**Definición:** El proceso de convertir un valor de un tipo de dato a otro. En JavaScript, la conversión puede ser explícita (realizada deliberadamente por el programador) o implícita (realizada automáticamente por el motor de JavaScript).

### Coerción de Tipo (Type Coercion)
**Definición:** Es la **conversión implícita** de tipos. El motor de JavaScript convierte automáticamente un tipo de dato en otro cuando se utiliza un operador. Es más común con operadores de comparación laxa (`==`) y operadores lógicos.
- **Ejemplo:** En la expresión `5 == '5'`, el string `'5'` es coaccionado a un `number` para la comparación.

### Conversión Explícita
**Definición:** Es la conversión de tipo que el programador realiza de forma manual y deliberada utilizando funciones o constructores del lenguaje.
- **Ejemplos:** `Number('10')`, `String(123)`, `Boolean(0)`.

### Truthy (Verdadero en contexto booleano)
**Definición:** Un valor que se considera `true` cuando se evalúa en un contexto booleano (por ejemplo, en una sentencia `if`). Casi todos los valores en JavaScript son "truthy".
- **Ejemplos de valores truthy:**
  - `true`
  - Cualquier número distinto de `0` (e.g., `1`, `-10`)
  - Cualquier string no vacío (e.g., `"hola"`, `"false"`)
  - Cualquier objeto (incluyendo `{}` y `[]`)
  - Cualquier función

### Falsy (Falso en contexto booleano)
**Definición:** Un valor que se considera `false` cuando se evalúa en un contexto booleano. Solo hay un número limitado de valores "falsy" en JavaScript, y es crucial memorizarlos.
- **La lista de valores falsy:**
  - `false`
  - `0`
  - `-0` (cero negativo)
  - `0n` (BigInt cero)
  - `""` (un string vacío)
  - `null`
  - `undefined`
  - `NaN` (Not a Number)

### `Boolean()`
**Definición:** Una función (y constructor) que se utiliza para la conversión explícita de un valor a su equivalente booleano. `Boolean(valor)` devuelve `false` si `valor` es "falsy" y `true` si es "truthy".

### Doble Negación (`!!`)
**Definición:** Un modismo de JavaScript que utiliza el operador de negación lógica (`!`) dos veces para convertir explícitamente cualquier valor a su equivalente booleano (`true` o `false`). Es una forma corta y común de escribir `Boolean(valor)`.
- **Ejemplo:** `!!'Hola'` devuelve `true`. `!!0` devuelve `false`.
