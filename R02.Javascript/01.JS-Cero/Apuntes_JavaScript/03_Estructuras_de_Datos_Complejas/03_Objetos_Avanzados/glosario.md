# Glosario de Términos: Objetos Avanzados

### Objeto (Object)
**Definición:** Una colección de pares clave-valor. Las claves (o "propiedades") son strings o `Symbol`, y los valores pueden ser cualquier tipo de dato, incluyendo otros objetos o funciones. Son la estructura de datos no primitiva fundamental en JavaScript.

### Propiedad (Property)
**Definición:** Una asociación entre una clave y un valor dentro de un objeto. Se accede a ella mediante la notación de punto (`obj.propiedad`) o la notación de corchetes (`obj['propiedad']`).

### Método (Method)
**Definición:** Una propiedad de un objeto cuyo valor es una función.
- **Ejemplo:** En `{ saludar: function() { ... } }`, `saludar` es un método.

### Notación de Punto (Dot Notation)
**Definición:** Sintaxis para acceder a una propiedad de un objeto donde el nombre de la propiedad es un identificador válido de JavaScript.
- **Sintaxis:** `objeto.propiedad`

### Notación de Corchetes (Bracket Notation)
**Definición:** Sintaxis para acceder a una propiedad de un objeto donde el nombre de la propiedad es un string o una variable. Es necesaria cuando la clave no es un identificador válido (e.g., contiene espacios o guiones) o cuando se accede a la propiedad dinámicamente.
- **Sintaxis:** `objeto['propiedad-con-guion']` o `objeto[nombreDeVariable]`

### Mejoras de Literales de Objeto (Object Literal Enhancements - ES6)
**Definición:** Mejoras sintácticas introducidas en ES6 para hacer la creación de objetos más concisa.
- **Shorthand Properties (Propiedades Abreviadas):** Si una variable y una clave de objeto tienen el mismo nombre, se puede omitir el valor. `let nombre = 'Ana'; const obj = { nombre };` es igual a `{ nombre: nombre }`.
- **Shorthand Methods (Métodos Abreviados):** Se puede omitir la palabra clave `function` y los dos puntos al definir un método. `const obj = { saludar() { ... } };` es igual a `{ saludar: function() { ... } };`.
- **Computed Property Names (Nombres de Propiedad Calculados):** Permite usar una expresión (una variable) como clave de una propiedad dentro de la declaración del literal. `let clave = 'id'; const obj = { [clave]: 123 };`

### Desestructuración de Objetos (Object Destructuring - ES6)
**Definición:** Una sintaxis que permite desempaquetar valores de objetos en distintas variables. Es una forma muy común y legible de acceder a las propiedades de un objeto.
- **Sintaxis básica:** `const { nombre, edad } = persona;`
- **Con renombramiento:** `const { nombre: nombreCompleto } = persona;`
- **Con valores por defecto:** `const { nombre, profesion = 'No especificada' } = persona;`

### Operador de Propagación (Spread Operator - `...` - ES2018)
**Definición:** Permite expandir las propiedades de un objeto dentro de otro objeto literal. Es la forma moderna e inmutable de crear copias de objetos y de fusionarlos.
- **Copia superficial (Shallow copy):** `const copia = { ...original };`
- **Fusión:** `const fusionado = { ...obj1, ...obj2 };` (Las propiedades de `obj2` sobreescriben las de `obj1` si tienen la misma clave).

### Operador Rest (Rest Operator - `...` - ES2018)
**Definición:** Recoge el "resto" de las propiedades de un objeto en un nuevo objeto durante la desestructuración.
- **Sintaxis:** `const { id, ...restoDePropiedades } = usuario;`

### `Object.keys(obj)`
**Definición:** Devuelve un **array** que contiene los nombres (claves) de las propiedades **enumerables** de un objeto.

### `Object.values(obj)`
**Definición:** Devuelve un **array** que contiene los valores de las propiedades **enumerables** de un objeto.

### `Object.entries(obj)`
**Definición:** Devuelve un **array** de arrays, donde cada sub-array es un par `[clave, valor]` de las propiedades **enumerables** de un objeto. Es muy útil para iterar sobre un objeto como si fuera un mapa.

### Propiedad Enumerable
**Definición:** Un atributo interno de una propiedad que determina si aparecerá en bucles `for...in` y si será incluida en los resultados de `Object.keys`, `Object.values` y `Object.entries`. Por defecto, las propiedades creadas en literales de objeto son enumerables.
