# Glosario de Términos: Funciones en JavaScript

### Función (Function)
**Definición:** Un bloque de código reutilizable diseñado para realizar una tarea específica. Las funciones son objetos de primera clase en JavaScript, lo que significa que pueden ser tratadas como cualquier otro valor: pueden ser asignadas a variables, pasadas como argumentos a otras funciones y devueltas por otras funciones.

### Declaración de Función (Function Declaration/Statement)
**Definición:** Una de las formas de definir una función. Utiliza la palabra clave `function`, seguida del nombre de la función, una lista de parámetros y el cuerpo de la función. Las declaraciones de función son afectadas por el *hoisting*.
- **Sintaxis:** `function miFuncion(param) { /* ... */ }`

### Expresión de Función (Function Expression)
**Definición:** Una forma de definir una función asignándola a una variable. La función puede ser nombrada (para depuración) o anónima. Las expresiones de función no son afectadas por el *hoisting* de la misma manera que las declaraciones.
- **Sintaxis:** `const miFuncion = function(param) { /* ... */ };`

### Función de Flecha (Arrow Function - ES6)
**Definición:** Una sintaxis más concisa para escribir expresiones de función, introducida en ES6. Las funciones de flecha tienen un comportamiento particular con la palabra clave `this`, ya que no tienen su propio `this`, sino que lo heredan del contexto que las rodea (scope léxico).
- **Sintaxis:** `const miFuncion = (param) => { /* ... */ };`
- **Sintaxis concisa (retorno implícito):** `const sumar = (a, b) => a + b;`

### Parámetro (Parameter)
**Definición:** Una variable listada en la definición de una función. Actúa como un marcador de posición para un valor que se espera que la función reciba.

### Argumento (Argument)
**Definición:** El valor real que se pasa a una función cuando es invocada (llamada).

### Valor de Retorno (Return Value)
**Definición:** El valor que una función "devuelve" cuando ha completado su ejecución. Se especifica con la palabra clave `return`. Si una función no tiene una sentencia `return` explícita, devuelve `undefined` por defecto.

### IIFE (Immediately Invoked Function Expression)
**Definición:** Una "Expresión de Función Invocada Inmediatamente". Es una función que se define y se ejecuta en el mismo momento. Históricamente, se usaba para crear un scope privado y evitar contaminar el scope global.
- **Sintaxis:** `(function() { /* ... */ })();`

### Callback (Función de Devolución de Llamada)
**Definición:** Una función que se pasa como argumento a otra función, con la intención de que la función receptora la ejecute (la "llame de vuelta") en un momento posterior, generalmente después de que se complete una operación asíncrona o una tarea específica.

### Función de Orden Superior (Higher-Order Function)
**Definición:** Una función que cumple al menos una de las siguientes condiciones:
1.  Acepta una o más funciones como argumentos.
2.  Devuelve una función como resultado.
- **Ejemplos comunes:** `map`, `filter`, `reduce`.

### Hoisting (Elevación)
**Definición:** Un comportamiento de JavaScript en el que las declaraciones de variables (`var`) y funciones (declaraciones de función) se mueven conceptualmente al principio de su scope antes de la ejecución del código. Esto permite, por ejemplo, llamar a una función declarada antes de su definición en el código.
