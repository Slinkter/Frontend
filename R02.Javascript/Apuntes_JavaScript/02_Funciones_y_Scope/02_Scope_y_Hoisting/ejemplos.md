# Ejemplos: Scope

## 1. La fuga de `var`

```javascript
if (true) {
  var fugitivo = "Me escapé";
  const seguro = "Estoy atrapado";
}

console.log(fugitivo); // "Me escapé" (Bloque ignorado)
try {
  console.log(seguro); // ReferenceError
} catch (e) {
  console.log(e.message);
}
```

## 2. Lexical Scope Anidado

```javascript
const global = "Global";

function externa() {
  const variableExterna = "Externa";

  function interna() {
    const variableInterna = "Interna";
    // interna puede ver variables de externa y de global (Scope Chain)
    console.log(`${variableInterna} - ${variableExterna} - ${global}`);
  }

  interna();
}

externa();
```

## 3. Hoisting: Declaración vs Expresión

```javascript
// Function Declaration - OK
console.log(sumar(2, 2)); // 4

function sumar(a, b) {
  return a + b;
}

// Function Expression - Error
try {
  console.log(restar(5, 2)); // TypeError: restar is not a function (si es var) o ReferenceError (si es const)
} catch (e) {
  console.log("Fallo esperado:", e.message);
}

var restar = function (a, b) {
  return a - b;
};
```
