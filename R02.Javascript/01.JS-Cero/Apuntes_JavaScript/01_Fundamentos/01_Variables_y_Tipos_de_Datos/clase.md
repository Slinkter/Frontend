# Clase: Variables y Tipos de Datos en JavaScript

## 1. Introducción a la Gestión de Estado y Datos

En cualquier sistema de software, la gestión de datos es un pilar fundamental. JavaScript, como lenguaje de programación dinámicamente tipado, ofrece un modelo flexible pero riguroso para la manipulación de datos. Comprender a fondo cómo JavaScript gestiona las variables y los tipos de datos es esencial para construir aplicaciones robustas, escalables y mantenibles.

Una **variable** no es más que una abstracción de una ubicación en memoria. Es una etiqueta simbólica que asociamos a un valor para poder referenciarlo y manipularlo a lo largo de nuestro código.

## 2. Declaración de Variables: `var`, `let` y `const`

ECMAScript 2015 (ES6) introdujo `let` y `const`, modernizando la declaración de variables y solucionando problemas históricos asociados con `var`.

- **`var`**: Antes de ES6, `var` era la única forma de declarar variables. Su principal característica es que tiene un **scope de función** (function-scoped). Esto significa que una variable declarada con `var` es accesible en toda la función en la que se define, sin importar el bloque (`{...}`) en el que se encuentre. Esto puede llevar a comportamientos inesperados debido al *hoisting*.

- **`let`**: Introduce el **scope de bloque** (block-scoped). Una variable declarada con `let` solo es accesible dentro del bloque en el que se define (por ejemplo, un bucle `for` o un `if`). Esto proporciona un control más granular y predecible sobre el ciclo de vida de una variable.

- **`const`**: También tiene scope de bloque. Se utiliza para declarar constantes, es decir, variables cuyo valor no puede ser reasignado. Es importante destacar que `const` no hace que el valor sea inmutable, sino que la *asignación* es constante. Si la constante es un objeto o un array, su contenido interno sí puede ser modificado.

**Recomendación de Ingeniería:** Priorizar siempre `const` por defecto. Utilizar `let` únicamente cuando se sepa que la variable necesitará ser reasignada. Evitar `var` en código moderno para prevenir efectos secundarios no deseados.

## 3. Tipos de Datos en JavaScript

JavaScript es un lenguaje de **tipado dinámico**, lo que significa que no es necesario declarar el tipo de dato de una variable. El motor de JavaScript infiere el tipo en tiempo de ejecución. Los tipos de datos se dividen en dos categorías principales:

### 3.1. Tipos de Datos Primitivos

Los primitivos son datos **inmutables**. Cualquier operación que parezca modificar un primitivo en realidad crea un nuevo valor en memoria.

- **`string`**: Representa texto. Se define con comillas simples, dobles o plantillas literales (template literals).
- **`number`**: Representa tanto números enteros como de punto flotante. JavaScript utiliza el estándar IEEE 754 para la representación de números, lo que puede llevar a ciertas imprecisiones en cálculos de alta precisión.
- **`boolean`**: Representa los valores lógicos `true` y `false`. Es fundamental para el flujo de control.
- **`null`**: Representa la ausencia intencionada de un valor. Es un valor asignado explícitamente.
- **`undefined`**: Indica que una variable ha sido declarada pero aún no tiene un valor asignado.
- **`symbol`**: (ES6) Un valor único e inmutable, útil para claves de propiedades de objetos que deben ser únicas.

### 3.2. Tipo de Dato Objeto (Object)

A diferencia de los primitivos, los objetos son **mutables** y se utilizan para almacenar colecciones de datos y entidades más complejas.

- **`object`**: Es una colección de pares clave-valor. Las claves son strings o symbols, y los valores pueden ser de cualquier tipo, incluidos otros objetos. Los arrays, las funciones y las expresiones regulares son, de hecho, tipos especiales de objetos en JavaScript.

La diferencia fundamental entre primitivos y objetos radica en cómo se gestionan en memoria. Los primitivos se pasan **por valor**, mientras que los objetos se pasan **por referencia**. Esto significa que cuando se asigna un objeto a una nueva variable, ambas variables apuntan a la *misma* ubicación en memoria.

## 4. Conclusión

Una comprensión sólida de cómo funcionan las variables y los tipos de datos es el primer paso para dominar JavaScript. La elección correcta entre `let` y `const`, junto con un manejo consciente de la diferencia entre tipos primitivos y objetos, previene errores comunes y sienta las bases para escribir código limpio, eficiente y profesional.
