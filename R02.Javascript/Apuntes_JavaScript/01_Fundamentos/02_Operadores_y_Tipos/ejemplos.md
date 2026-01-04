# Ejemplos: Operadores y Coerción

## 1. Short-Circuit Evaluation (Cortocircuito)

Patrón común para asignación condicional o ejecución segura.

```javascript
// Operador OR (||) para valores por defecto (Antiguo)
function saludar(nombre) {
  // Si nombre es falsy (null, undefined, ""), usa "Invitado"
  const nombreFinal = nombre || "Invitado";
  console.log(`Hola ${nombreFinal}`);
}

saludar("Ana"); // "Hola Ana"
saludar(""); // "Hola Invitado" -> "" es falsy, pasa al segundo valor.
```

## 2. Nullish Coalescing (??) - La forma moderna

Soluciona el bug de `||` con el número 0.

```javascript
const configuracion = {
  volumen: 0, // El usuario quiere silencio
  brillo: null, // No definido, usar default
};

// Usando OR (||)
const volumen = configuracion.volumen || 50;
console.log(volumen); // 50 (Incorrecto, 0 es falsy)

// Usando Nullish (??)
const volumenCorrecto = configuracion.volumen ?? 50;
console.log(volumenCorrecto); // 0 (Correcto, solo salta con null/undefined)
```

## 3. Coerción Implícita Peligrosa

```javascript
console.log(1 < 2 < 3); // true
// Paso a paso:
// (1 < 2) -> true
// true < 3 -> (true se convierte a 1) -> 1 < 3 -> true

console.log(3 > 2 > 1); // false
// Paso a paso:
// (3 > 2) -> true
// true > 1 -> (true se convierte a 1) -> 1 > 1 -> false
```
