# Glosario de Términos: Operadores en JavaScript

### Operador
**Definición:** Un operador es un símbolo especial que se utiliza para realizar operaciones sobre operandos (valores o variables). El resultado de una operación es, típicamente, un nuevo valor.
- **Ejemplo:** En `5 + 3`, el `+` es el operador y `5` y `3` son los operandos.

### Operadores Aritméticos
**Definición:** Son operadores que realizan operaciones matemáticas básicas.
- **`+` (Adición):** Suma dos operandos.
- **`-` (Sustracción):** Resta el segundo operando del primero.
- **`*` (Multiplicación):** Multiplica dos operandos.
- **`/` (División):** Divide el primer operando por el segundo.
- **`%` (Módulo):** Devuelve el resto de una división entera.
- **`**` (Exponenciación - ES2016):** Eleva el primer operando a la potencia del segundo.
- **`++` (Incremento):** Aumenta el valor de un operando en uno.
- **`--` (Decremento):** Disminuye el valor de un operando en uno.

### Operadores de Asignación
**Definición:** Se utilizan para asignar un valor a una variable.
- **`=` (Asignación simple):** Asigna el valor del operando derecho al operando izquierdo.
- **`+=`, `-=`, `*=`, `/=`, `%=`, `**=` (Asignación compuesta):** Realizan una operación aritmética y luego asignan el resultado a la variable. Ejemplo: `x += y` es equivalente a `x = x + y`.

### Operadores de Comparación
**Definición:** Comparan dos valores y devuelven un resultado booleano (`true` o `false`).
- **`==` (Igualdad laxa):** Compara dos valores después de realizar una conversión de tipo si es necesario (coerción). **No recomendado en la mayoría de los casos.**
- **`!=` (Desigualdad laxa):** El opuesto de `==`.
- **`===` (Igualdad estricta):** Compara dos valores sin realizar conversión de tipo. Compara tanto el valor como el tipo. **Es el operador de igualdad recomendado.**
- **`!==` (Desigualdad estricta):** El opuesto de `===`.
- **`>` (Mayor que), `<` (Menor que), `>=` (Mayor o igual que), `<=` (Menor o igual que):** Comparan el orden de los valores.

### Operadores Lógicos
**Definición:** Se utilizan para combinar o invertir expresiones booleanas.
- **`&&` (AND Lógico):** Devuelve `true` si ambos operandos son verdaderos.
- **`||` (OR Lógico):** Devuelve `true` si al menos uno de los operandos es verdadero.
- **`!` (NOT Lógico):** Invierte el valor booleano de un operando.

### Operador Ternario (o Condicional)
**Definición:** Es el único operador en JavaScript que toma tres operandos. Es una forma concisa de escribir una sentencia `if-else`.
- **Sintaxis:** `condicion ? expresionSiVerdadero : expresionSiFalso`

### Coerción (Type Coercion)
**Definición:** Es la conversión automática o implícita de valores de un tipo de dato a otro, realizada por el motor de JavaScript. Ocurre comúnmente durante las comparaciones con operadores de igualdad laxa (`==`).
