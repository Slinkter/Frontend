# Clase: Async/Await - Escribiendo Código Asíncrono como si fuera Síncrono

## 1. Introducción: La Cima de la Pirámide de la Asincronía

`async/await`, introducido en ES2017, es la sintaxis más moderna y legible para trabajar con operaciones asíncronas en JavaScript. No es una nueva forma de manejar la asincronía, sino **azúcar sintáctico (syntactic sugar)** construido sobre las **Promesas**. Su objetivo es permitirnos escribir código asíncrono que se lee y se estructura de manera muy similar al código síncrono, eliminando casi por completo la necesidad de encadenar `.then()`.

-   La palabra clave `async` define una función que siempre devolverá una promesa.
-   La palabra clave `await` pausa la ejecución de una función `async` hasta que una promesa se resuelva, "desenvolviendo" su valor.

Esta combinación permite un modelo mental de "pausar y reanudar" que es mucho más intuitivo que el encadenamiento de callbacks.

## 2. La Transformación de Promesas a Async/Await

La sintaxis `async/await` es una traducción directa del encadenamiento de promesas.

**Código con Promesas:**
```javascript
function obtenerDatos() {
  return fetch('https://api.example.com/data')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta de la red');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error('Hubo un problema con la petición:', error);
      // Lanzar el error de nuevo para que el llamador sepa que falló
      throw error;
    });
}
```

**Código equivalente con Async/Await:**
```javascript
async function obtenerDatos() {
  try {
    const response = await fetch('https://api.example.com/data');
    
    if (!response.ok) {
      throw new Error('Error en la respuesta de la red');
    }

    const data = await response.json();
    
    console.log(data);
    return data;
    
  } catch (error) {
    console.error('Hubo un problema con la petición:', error);
    // Lanzar el error de nuevo para que el llamador sepa que falló
    throw error;
  }
}
```
Las ventajas son evidentes:
- **Linealidad:** El código se lee de arriba abajo, sin bloques `.then()`.
- **Manejo de Errores:** Se utiliza el bloque `try...catch`, un mecanismo síncrono estándar de JavaScript, para manejar los rechazos de las promesas. Esto permite un manejo de errores más unificado y potente.
- **Depuración:** Es mucho más fácil depurar código `async/await` paso a paso, ya que se asemeja a la ejecución síncrona.

## 3. Principios Fundamentales de `async` y `await`

### `async`
Una función declarada con `async` tiene dos propiedades garantizadas:
1.  **Siempre devuelve una promesa:** Si la función retorna un valor, la promesa se resuelve con ese valor. Si lanza una excepción, la promesa se rechaza con esa excepción.
2.  **Permite el uso de `await`:** La palabra clave `await` solo es válida dentro de una función `async`.

### `await`
El operador `await` hace dos cosas:
1.  **Pausa la función:** Detiene la ejecución de la función `async` hasta que la promesa a su derecha se establezca (`settled`).
2.  **Desenvuelve el valor:**
    -   Si la promesa se cumple (`fulfilled`), `await` devuelve el valor de resolución.
    -   Si la promesa es rechazada (`rejected`), `await` lanza una excepción con el valor del rechazo.

**Importante:** `await` solo pausa la función `async` que lo contiene, no bloquea el hilo principal de JavaScript. El Event Loop sigue funcionando normalmente en segundo plano.

## 4. Orquestación: Ejecución Secuencial vs. Paralela

Un error común es usar `await` de forma secuencial para operaciones que podrían realizarse en paralelo, creando un cuello de botella innecesario.

**Ejecución Secuencial (Incorrecto para tareas independientes):**
```javascript
async function obtenerDatosSecuencial() {
  // Espera a que termine la primera antes de INICIAR la segunda. Ineficiente.
  const usuario = await fetch('/api/usuario');
  const posts = await fetch('/api/posts');
}
```

**Ejecución en Paralelo (Correcto para tareas independientes):**
Para ejecutar operaciones en paralelo, se deben iniciar todas las promesas a la vez y luego esperar a que todas se completen usando `Promise.all`.

```javascript
async function obtenerDatosEnParalelo() {
  // Inicia ambas peticiones al mismo tiempo
  const promesaUsuario = fetch('/api/usuario');
  const promesaPosts = fetch('/api/posts');

  // Espera a que AMBAS se completen
  const [respuestaUsuario, respuestaPosts] = await Promise.all([
    promesaUsuario,
    promesaPosts
  ]);
  
  // ... procesar respuestas
}
```
Esta combinación de `async/await` con `Promise.all` es el patrón estándar para la paralelización eficiente de tareas asíncronas.

## 5. Manejo de Errores con `try...catch`

El bloque `try...catch` es la forma idiomática de manejar errores en código `async/await`. Cualquier rechazo en una promesa a la que se le aplica `await` dentro del bloque `try` será capturado por el bloque `catch`.

```javascript
async function obtenerMultiplesDatos() {
  try {
    const [res1, res2] = await Promise.all([
      fetch('/api/endpoint1'),
      fetch('/api/endpoint2_que_falla')
    ]);
    // Este código no se ejecuta si una de las promesas falla
  } catch (error) {
    // El 'error' es la razón del rechazo de la primera promesa que falló.
    console.error('Ocurrió un error durante una de las peticiones:', error);
  }
}
```
Esto permite un manejo de errores centralizado y limpio para múltiples operaciones asíncronas.

## 6. Conclusión

`async/await` no reemplaza a las promesas, sino que las complementa, proporcionando una interfaz de nivel superior que mejora drásticamente la ergonomía del desarrollador. Permite escribir código asíncrono complejo con la claridad y la estructura del código síncrono, reduciendo la carga cognitiva y facilitando la creación de flujos de datos robustos y mantenibles. Dominar `async/await` es, hoy en día, indispensable para cualquier desarrollador de JavaScript profesional.
