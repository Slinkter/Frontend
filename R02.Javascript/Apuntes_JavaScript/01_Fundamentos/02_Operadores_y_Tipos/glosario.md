# Glosario: Operadores y Tipos

## F

### Falsy

Un valor que se evalúa como `false` en un contexto booleano. Los únicos falsy son: `false`, `0`, `""`, `null`, `undefined`, `NaN`.

## N

### NaN (Not-a-Number)

Propiedad del objeto global que representa un valor que no es un número válido legalmente (por ejemplo, resultado de `0/0` o `Number("texto")`), aunque su tipo `typeof` es 'number'.

### Nullish

Término que agrupa exclusivamente a los valores `null` y `undefined`. Es utilizado por el operador `??` (Nullish Coalescing).

## O

### Operador Unario

Operador que requiere un solo operando. Ejemplos: `typeof`, `!`, `++`, `delete`.

### Operador Ternario

El único operador en JS que toma tres operandos: `condición ? exprSiTrue : exprSiFalse`. Se usa como atajo para `if...else`.

## S

### Short-Circuit Evaluation (Evaluación de Cortocircuito)

Estrategia donde el segundo argumento de un operador lógico (`&&`, `||`) se evalúa solo si el primer argumento no es suficiente para determinar el valor de la expresión.

## T

### Truthy

Cualquier valor que NO es falsy. En un contexto booleano se evalúa como `true`.
