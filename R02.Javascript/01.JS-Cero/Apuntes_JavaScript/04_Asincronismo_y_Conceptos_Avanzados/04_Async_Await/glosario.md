# Glosario de Términos: Async/Await

### `async`
**Definición:** Una palabra clave que se coloca antes de la declaración de una función (`async function miFuncion() { ... }`) para definirla como una **función asíncrona**.
- **Comportamiento Clave:**
  1.  Una función `async` **siempre** devuelve una `Promise`.
  2.  Si la función retorna un valor, ese valor se convierte en el valor de resolución de la promesa (`Promise.resolve(valor)`).
  3.  Si la función lanza un error, ese error se convierte en la razón de rechazo de la promesa (`Promise.reject(error)`).
  4.  Permite el uso de la palabra clave `await` dentro de ella.

### `await`
**Definición:** Un operador que solo puede ser utilizado **dentro de una función `async`**. Se coloca antes de una `Promise` y pausa la ejecución de la función `async` hasta que la `Promise` se establezca (`settled`).
- **Comportamiento Clave:**
  1.  Si la `Promise` se cumple (`fulfilled`), `await` "desenvuelve" la promesa y la expresión completa evalúa al valor de resolución de la promesa.
  2.  Si la `Promise` es rechazada (`rejected`), `await` lanza el valor de rechazo como una excepción de JavaScript.

### Azúcar Sintáctico (Syntactic Sugar)
**Definición:** Una sintaxis añadida a un lenguaje de programación para hacer que ciertas construcciones sean más fáciles de leer o expresar, sin cambiar la funcionalidad subyacente. `async/await` es azúcar sintáctico sobre las **Promesas**. El código `async/await` es convertido por los motores de JavaScript (o transpiladores) a código basado en `.then()` y `.catch()`.

### `try...catch`
**Definición:** Un bloque de manejo de excepciones síncrono de JavaScript. En el contexto de `async/await`, es el mecanismo principal y recomendado para manejar los rechazos de las promesas.
- **`try`**: El código dentro del bloque `try` se ejecuta. Si una promesa a la que se le aplica `await` es rechazada, la ejecución del bloque `try` se detiene y salta al bloque `catch`.
- **`catch (error)`**: Este bloque se ejecuta si se lanza una excepción en el bloque `try`. La variable `error` contiene el valor de rechazo de la promesa.

### Ejecución Secuencial
**Definición:** En `async/await`, cuando se utiliza `await` en varias promesas una tras otra, el código se ejecuta de forma secuencial. La segunda operación no comienza hasta que la primera ha terminado por completo. Esto es ideal para tareas dependientes.
- **Ejemplo:**
  ```javascript
  const resultado1 = await operacion1();
  const resultado2 = await operacion2(resultado1);
  ```

### Ejecución en Paralelo
**Definición:** Para ejecutar operaciones asíncronas independientes en paralelo dentro de una función `async`, no se debe usar `await` de forma secuencial. En su lugar, se utiliza `Promise.all()` en combinación con `await`.
- **Ejemplo:**
  ```javascript
  const [resultado1, resultado2] = await Promise.all([
    operacion1(),
    operacion2()
  ]);
  ```

### Top-Level Await (ES2022)
**Definición:** Una característica que permite el uso de la palabra clave `await` fuera de una función `async`, pero solo en el nivel superior de un **módulo de ES6**. Antes de esto, `await` estaba estrictamente limitado al interior de funciones `async`.
- **Caso de uso:** Útil para la inicialización de módulos, por ejemplo, para cargar dependencias o configuraciones de forma asíncrona antes de que el resto del módulo se ejecute.
