# Clase 03: Closures y Contexto (this)

## 1. Closures (Clausuras)

Un **Closure** es la combinación de una función y el alcance léxico (lexical environment) en el que fue declarada. En términos prácticos, es una función que "recuerda" las variables de su entorno exterior, incluso después de que la función exterior haya terminado de ejecutarse.

### ¿Para qué sirven?

1.  **Datos Privados (Encapsulación):** Simular variables privadas que no pueden ser modificadas directamente desde el exterior.
2.  **Function Factories:** Crear funciones especializadas a partir de una plantilla.
3.  **Patrones de Diseño:** Module Pattern, Curry.

## 2. Contexto de Ejecución: `this`

El valor de `this` en JavaScript es una de las fuentes comunes de confusión. A diferencia del Scope (que es estático), el Contexto (`this`) es dinámico y depende de **cómo es invocada** la función.

### Reglas de `this` (Binding)

#### 2.1 Default Binding (Invocación Directa)

Función suelta `funcion()`.

- En modo estricto: `undefined`.
- En modo no estricto: Objeto global (`window` o `global`).

#### 2.2 Implicit Binding (Objeto)

Cuando se invoca como método de un objeto `objeto.metodo()`.

- `this` apunta al objeto que está a la izquierda del punto.

#### 2.3 Explicit Binding

Usando `call`, `apply` o `bind`.

- `funcion.call(obj, arg1, arg2)`: Invoca la función haciendo que `this` sea `obj`.
- `funcion.apply(obj, [args])`: Igual que call, pero recibe argumentos en array.
- `funcion.bind(obj)`: **No** invoca la función inmediatamente. Retorna una _nueva_ función con el `this` atado permanentemente a `obj`.

#### 2.4 New Binding

Usando el operador `new Constructor()`.

- `this` apunta al nuevo objeto que se está creando.

#### 2.5 Lexical Binding (Arrow Functions)

Las Arrow Functions **NO** tienen su propio `this`. Lo heredan del scope léxico superior (donde fueron escritas). Las reglas anteriores (call, apply, bind) no tienen efecto sobre ellas.
