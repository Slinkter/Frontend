# Glosario de Términos: Closures (Clausuras)

### Closure (Clausura)
**Definición:** Un closure (o clausura) es la combinación de una función y el ámbito léxico en el que dicha función fue declarada. Esta combinación permite que la función "recuerde" y siga teniendo acceso a las variables de su scope exterior, incluso después de que la función exterior haya terminado su ejecución.

### Ámbito Léxico (Lexical Scope)
**Definición:** Es el principio que determina el scope de una función basándose en su ubicación física en el código fuente. Una función anidada tiene acceso a las variables de su función contenedora. El ámbito léxico es el prerrequisito para que los closures existan.

### Función Anidada (Nested Function)
**Definición:** Una función que es declarada dentro de otra función. La función anidada (interna) tiene acceso al scope de la función contenedora (externa).

### Variable Libre (Free Variable)
**Definición:** Dentro de una función, una variable libre es aquella que no es ni un parámetro ni una variable local de dicha función. El closure "captura" estas variables libres de su ámbito padre para que sigan siendo accesibles.

### Estado Privado (Private State)
**Definición:** En el contexto de los closures, se refiere a la capacidad de crear variables que solo son accesibles a través de una o más funciones devueltas, pero que no son accesibles directamente desde fuera. Esto permite emular variables y métodos privados, un pilar del encapsulamiento.

### Encapsulamiento (Encapsulation)
**Definición:** Un principio de la programación orientada a objetos (y del buen diseño de software en general) que consiste en agrupar datos (propiedades) y los métodos que operan sobre esos datos en una sola unidad (como un objeto o un módulo), y restringir el acceso directo a algunos de los componentes del objeto. Los closures son el mecanismo principal para lograr encapsulamiento en JavaScript basado en funciones.

### Función de Orden Superior (Higher-Order Function)
**Definición:** Una función que devuelve otra función o que toma otra función como argumento. Las funciones de orden superior que devuelven funciones son el patrón más común para crear closures.

### Currificación (Currying)
**Definición:** Una técnica de programación funcional, que es posible gracias a los closures, donde una función que toma múltiples argumentos es transformada en una secuencia de funciones, cada una de las cuales toma un único argumento.
- **Ejemplo:** `sumar(a, b, c)` se convierte en `sumar(a)(b)(c)`. Cada llamada devuelve un nuevo closure que recuerda los argumentos anteriores.

### IIFE (Immediately Invoked Function Expression)
**Definición:** Una Expresión de Función Invocada Inmediatamente. Antes de la llegada de los módulos de ES6, las IIFE eran el patrón principal para crear un scope aislado y evitar la contaminación del scope global. Un IIFE crea un closure que puede mantener un estado privado.
- **Sintaxis:** `(function() { /* código privado aquí */ })();`
