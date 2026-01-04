# Clase 01: Funciones Básicas

## 1. Definición y Declaración

Una función es un bloque de código autónomo diseñado para realizar una tarea específica. En JavaScript, las funciones son "ciudadanos de primera clase" (First-Class Citizens), lo que significa que pueden ser tratadas como cualquier otra variable (asignadas, pasadas como argumentos, retornadas).

### 1.1 Declaración de Función (Function Declaration)

Usa la palabra clave `function`.

- **Hoisting:** Las declaraciones de función son elevadas completamente. Se pueden invocar antes de ser declaradas en el código.

```javascript
saludar(); // Funciona gracias al hoisting

function saludar() {
  console.log("Hola");
}
```

### 1.2 Expresión de Función (Function Expression)

Se asigna una función (usualmente anónima) a una variable.

- **Hoisting:** Se comporta como la variable (`var`, `let`, `const`). Si es `var`, es `undefined` al inicio; si es `let/const`, está en TDZ. No se pueden invocar antes de la declaración.

```javascript
// saludarExpression(); // ReferenceError (si es const/let)

const saludarExpression = function () {
  console.log("Hola desde expresión");
};
```

### 1.3 Funciones Flecha (Arrow Functions) - ES6

Sintaxis más concisa para expresiones de función.

- **Sintaxis:** `(param) => { cuerpo }`
- **Retorno Implícito:** Si el cuerpo es una sola expresión (sin llaves), el valor se retorna automáticamente.
- **Importante:** No tienen su propio `this`, `arguments`, ni `super`. Heredan el `this` del contexto léxico (donde fueron definidas).

## 2. Parámetros y Argumentos

- **Parámetros:** Variables listadas en la definición.
- **Argumentos:** Valores reales pasados a la función.
- **Parámetros por defecto (ES6):** `function suma(a, b = 0) { ... }`

## 3. Retorno de Valores

Toda función en JS retorna un valor. Si no se especifica `return`, retorna `undefined`.
