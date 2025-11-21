# Clase: Scope y Hoisting - Los Pilares de la Arquitectura Léxica

## 1. Introducción: Definiendo el Contexto de Ejecución

El `scope` (ámbito) es uno de los conceptos más fundamentales y definitorios de JavaScript. Es el mecanismo que gobierna cómo y desde dónde se puede acceder a las variables y funciones. Una comprensión profunda del scope no es un mero ejercicio académico; es un requisito indispensable para escribir código modular, predecible y libre de errores.

El `scope` responde a la pregunta: "¿A qué variables tengo acceso en este preciso punto del código?". La respuesta está determinada por cómo y dónde se declaran las funciones y variables, un principio conocido como **Ámbito Léxico (Lexical Scope)**.

## 2. El Ámbito Léxico y la Cadena de Scopes

El ámbito léxico significa que el scope se define en el momento de la compilación (o, más precisamente, en el momento de la "creación" del código) y está basado en la anidación física de bloques y funciones en el código fuente.

```javascript
const variableGlobal = 'Global';

function funcionExterna() {
  const variableExterna = 'Externa';

  function funcionInterna() {
    const variableInterna = 'Interna';
    // Desde aquí, tenemos acceso a todas las variables
    console.log(variableGlobal, variableExterna, variableInterna);
  }

  funcionInterna();
  // console.log(variableInterna); // ReferenceError
}

funcionExterna();
// console.log(variableExterna); // ReferenceError
```

Cuando `funcionInterna` se ejecuta, busca una variable primero en su propio scope local. Si no la encuentra, busca en el scope de su padre léxico (`funcionExterna`). Si tampoco está allí, continúa hacia arriba hasta el scope global. Esta secuencia de búsqueda se conoce como la **cadena de scopes (scope chain)**. Es unidireccional: un scope interno puede ver hacia afuera, pero un scope externo no puede ver hacia adentro.

## 3. La Evolución del Scope: De `var` a `let`/`const`

### 3.1. Scope de Función (`var`)
Antes de ES6, `var` era la única forma de declarar variables, y su scope estaba ligado a la función contenedora más cercana.

```javascript
function ejemploVar() {
  if (true) {
    var contador = 10;
  }
  // 'contador' es accesible aquí, fuera del bloque if.
  // Esto puede ser fuente de errores.
  console.log(contador); // 10
}
```
Este comportamiento, donde una variable "se filtra" fuera de su bloque, era a menudo contraintuitivo.

### 3.2. Scope de Bloque (`let` y `const` - ES6)
`let` y `const` introdujeron el **scope de bloque**, que es más granular y predecible. Una variable declarada con `let` o `const` solo existe dentro del bloque (`{...}`) en el que fue definida.

```javascript
function ejemploLet() {
  if (true) {
    let contador = 10;
    console.log(contador); // 10
  }
  // console.log(contador); // ReferenceError: contador is not defined
}
```
**Principio de Ingeniería:** El scope de bloque es superior para el diseño de software robusto. Permite un mejor encapsulamiento, reduce la "contaminación" de scopes superiores y previene errores al reutilizar nombres de variables en diferentes bloques. La regla moderna es: usar `const` por defecto, `let` si la variable necesita ser reasignada, y evitar `var`.

## 4. Hoisting: El "Engaño" de la Declaración

El *hoisting* es un comportamiento de JavaScript donde las declaraciones de variables y funciones son procesadas antes de que se ejecute cualquier código. Conceptualmente, es como si se "elevaran" al principio de su scope. Sin embargo, su comportamiento varía drásticamente.

### 4.1. Hoisting de Declaraciones de Función
Las declaraciones de función se elevan por completo (cuerpo incluido).
```javascript
hola(); // Funciona perfectamente

function hola() {
  console.log('Hola Mundo');
}
```

### 4.2. Hoisting de `var`
Solo se eleva la declaración, no la inicialización. La variable existe, pero su valor es `undefined`.
```javascript
console.log(miVar); // undefined (No es un ReferenceError)
var miVar = 'Mi Valor';
console.log(miVar); // "Mi Valor"
```

### 4.3. Hoisting de `let` y `const` y la TDZ
`let` y `const` también son elevadas, pero entran en un estado especial llamado **Zona Muerta Temporal (Temporal Dead Zone - TDZ)**. No son inicializadas y cualquier intento de acceder a ellas antes de su declaración explícita en el código resulta en un `ReferenceError`.

```javascript
// console.log(miLet); // ReferenceError: Cannot access 'miLet' before initialization
let miLet = 'Mi Valor';
console.log(miLet); // "Mi Valor"
```
La TDZ no es un castigo, es una **medida de seguridad**. Impone la disciplina de declarar las variables antes de usarlas, eliminando una clase entera de errores relacionados con el hoisting de `var`.

## 5. Conclusión: Arquitectura de Código a través del Scope

Dominar el scope y el hoisting es esencial para controlar el ciclo de vida y la visibilidad de los datos en una aplicación. El ámbito léxico, combinado con el scope de bloque de `let` y `const`, proporciona las herramientas para construir componentes encapsulados y modulares, mientras que la TDZ actúa como una red de seguridad contra errores lógicos. Entender estos mecanismos no es solo "saber JavaScript", es saber cómo arquitecturar software limpio y mantenible.
