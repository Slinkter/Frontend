# Glosario de Términos: Strings y Numbers

### String (Cadena de Texto)
**Definición:** Un tipo de dato primitivo que representa una secuencia de caracteres. En JavaScript, los strings son inmutables, lo que significa que no pueden ser modificados una vez creados. Se delimitan con comillas simples (`'...'`), comillas dobles (`"..."`) o plantillas literales (`` `...` ``).

### Number (Número)
**Definición:** Un tipo de dato primitivo que representa valores numéricos. JavaScript utiliza un único tipo `number` para todos los números, incluyendo enteros y de punto flotante, siguiendo el estándar de doble precisión de 64 bits IEEE 754.

### Inmutabilidad
**Definición:** Propiedad de un tipo de dato (como los `string`) que impide que su valor sea modificado después de su creación. Cualquier operación que parezca alterar un string en realidad crea y devuelve un nuevo string.

### Método de String
**Definición:** Una función incorporada que pertenece al prototipo del objeto `String`. Permite realizar operaciones sobre un string y, dado que los strings son inmutables, generalmente devuelven un nuevo string como resultado.
- **Ejemplos:** `.toUpperCase()`, `.substring()`, `.replace()`.

### Plantilla Literal (Template Literal - ES6)
**Definición:** Una forma avanzada de string que permite la interpolación de expresiones y texto multilínea. Se delimitan con acentos graves (`` ` ``).
- **Interpolación:** Inclusión de variables o expresiones dentro de un string usando la sintaxis `${...}`.

### `NaN` (Not-a-Number)
**Definición:** Una propiedad del objeto global que representa un valor que no es un número legal. Típicamente, es el resultado de una operación matemática que ha fallado o que no puede producir un resultado numérico válido. `NaN` es el único valor en JavaScript que no es igual a sí mismo (`NaN !== NaN`).

### `toFixed()`
**Definición:** Un método del prototipo de `Number` que formatea un número utilizando notación de punto fijo, devolviendo un string con una cantidad específica de decimales. Es útil para representar valores monetarios.

### `parseInt()` y `parseFloat()`
**Definición:** Funciones globales que analizan un argumento de tipo string y devuelven un número.
- **`parseInt(string, radix)`:** Analiza un string y devuelve un número entero. El segundo argumento (`radix`) especifica la base del sistema numérico (e.g., 10 para decimal, 2 para binario).
- **`parseFloat(string)`:** Analiza un string y devuelve un número de punto flotante.

### Concatenación
**Definición:** La operación de unir dos o más strings para formar uno nuevo. Se puede realizar con el operador de adición (`+`) o con el método `.concat()`. La forma moderna y recomendada es usar plantillas literales.
