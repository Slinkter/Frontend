# Clase 02: Operadores, Tipos y Coerción

## 1. Operadores en JavaScript

Los operadores son símbolos o palabras clave que realizan operaciones sobre uno o más operandos (valores).

### 1.1 Operadores Aritméticos

Además de los básicos (`+`, `-`, `*`, `/`, `%`), ECMAScript introduce:

- **Exponenciación (`**`):** `2 \*\* 3`es igual a`8`. Equivale a `Math.pow(2, 3)`.
- **Incremento/Decremento (`++`, `--`):** Cuidado con la posición (prefijo vs sufijo).
  - `let a = 1; console.log(a++); // 1 (Devuelve valor previo)`
  - `let b = 1; console.log(++b); // 2 (Incrementa y devuelve)`

### 1.2 Operadores de Comparación

- **Igualdad Abstracta (`==`):** Realiza coerción de tipos antes de comparar. `1 == '1'` es `true`. **Evitar su uso.**
- **Igualdad Estricta (`===`):** Sin coerción. Tipos y valores deben ser idénticos. **Usar siempre por defecto.**
- **Desigualdad (`!=` vs `!==`):** Aplica la misma lógica (Abstracta vs Estricta).

### 1.3 Operadores Lógicos

- **AND (`&&`):** Devuelve el primer valor _Falsy_ o el último valor (Short-circuit evaluation).
- **OR (`||`):** Devuelve el primer valor _Truthy_ o el último valor.
- **Nullish Coalescing (`??`):** (ES2020) Devuelve el lado derecho solo si el lado izquierdo es `null` o `undefined`. Útil para valores `0` o `""` que son falsy pero válidos.

### 1.4 Operadores Unarios

- `typeof`: Devuelve el tipo de dato.
- `delete`: Elimina una propiedad de un objeto.
- `void`: Evalúa una expresión y devuelve `undefined`.

## 2. Coerción de Tipos (Type Coercion)

Es la conversión de un valor de un tipo a otro. Puede ser explícita o implícita.

### 2.1 Coerción Explícita

Cuando el desarrollador fuerza la conversión.

- `Number("123")` // 123
- `String(123)` // "123"
- `Boolean(1)` // true

### 2.2 Coerción Implícita

Ocurre automáticamente cuando se usan operadores con tipos incompatibles.

- `1 + "2" = "12"` (Concatenación tiene preferencia sobre suma si hay un string).
- `"2" * 3 = 6` (Operadores matemáticos `- * / %` convierten strings a números).
- `if ("hola") {...}` (Coerción a booleano en contextos condicionales).

## 3. Truthy & Falsy

En JavaScript, cualquier valor puede ser evaluado en un contexto booleano (como un `if`).

### Valores Falsy

Son valores que se evalúan como `false`:

1.  `false`
2.  `0` (y `-0`)
3.  `""` (String vacío)
4.  `null`
5.  `undefined`
6.  `NaN`
7.  `0n` (BigInt)

### Valores Truthy

Todo lo que no sea Falsy, es Truthy. Ejemplos contraintuitivos que son **true**:

- `[]` (Array vacío)
- `{}` (Objeto vacío)
- `"0"` (String "0")
- `"false"` (String "false")
