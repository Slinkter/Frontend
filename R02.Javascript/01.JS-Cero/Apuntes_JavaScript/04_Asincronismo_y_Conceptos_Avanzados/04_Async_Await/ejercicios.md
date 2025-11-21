# Ejercicios Propuestos: Async/Await

## Ejercicio 1: Refactorización de una Cadena de Promesas

**Objetivo:** Convertir una función que utiliza `.then()` y `.catch()` a la sintaxis `async/await` para mejorar su legibilidad.

**Instrucciones:**
Toma la siguiente función `obtenerYProcesarDatos` y reescríbela como una función `async` llamada `obtenerYProcesarDatosAsync`. La nueva función debe tener exactamente la misma lógica, pero utilizando `async/await` y `try...catch`.

```javascript
function fetchDatos() {
  return new Promise(resolve => setTimeout(() => resolve({ id: 42, valor: 'Datos importantes' }), 1000));
}

function procesar(datos) {
  return new Promise(resolve => setTimeout(() => {
    const procesado = datos.valor.toUpperCase();
    resolve(procesado);
  }, 500));
}

// Función original con promesas
function obtenerYProcesarDatos() {
  console.log("Iniciando con .then()...");
  fetchDatos()
    .then(datos => {
      console.log("Datos recibidos:", datos);
      return procesar(datos);
    })
    .then(resultadoFinal => {
      console.log("Resultado procesado:", resultadoFinal);
    })
    .catch(error => {
      console.error("Error en la cadena de promesas:", error);
    });
}

// Tu implementación de 'obtenerYProcesarDatosAsync' aquí

// Llama a tu nueva función para probarla
// obtenerYProcesarDatosAsync();
```

<details>
<summary>Solución Razonada</summary>

```javascript
function fetchDatos() { /* ... */ }
function procesar(datos) { /* ... */ }

// Solución con async/await
async function obtenerYProcesarDatosAsync() {
  console.log("Iniciando con async/await...");
  try {
    // 1. Espera a que fetchDatos() se complete y asigna su valor.
    const datos = await fetchDatos();
    console.log("Datos recibidos:", datos);

    // 2. Espera a que procesar() se complete y asigna su valor.
    const resultadoFinal = await procesar(datos);
    console.log("Resultado procesado:", resultadoFinal);

  } catch (error) {
    // 3. Si CUALQUIERA de las promesas (await) es rechazada,
    // la ejecución salta a este bloque.
    console.error("Error en el bloque async:", error);
  }
}

// Llamada de prueba
obtenerYProcesarDatosAsync();
```

**Explicación:**
La versión `async/await` es superior en legibilidad por varias razones:
1.  **Flujo Lineal:** El código se lee como una serie de instrucciones síncronas, de arriba abajo. No hay anidación ni callbacks. `const datos = await fetchDatos();` es mucho más directo que el bloque `.then(datos => ...)`.
2.  **Variables:** No es necesario pasar resultados a través de múltiples `.then`. Las variables (`datos`, `resultadoFinal`) están disponibles en el mismo scope del bloque `try`, como en el código síncrono normal.
3.  **Manejo de Errores:** `try...catch` es un mecanismo estándar de JavaScript para el manejo de errores. Centraliza la captura de errores de múltiples pasos asíncronos en un solo lugar de una manera muy familiar.
</details>

---

## Ejercicio 2: Ejecución Paralela con `Promise.all` y `async/await`

**Objetivo:** Utilizar `async/await` junto con `Promise.all` para obtener datos de múltiples fuentes de forma eficiente y luego combinarlos.

**Instrucciones:**
Imagina que estás construyendo un agregador de noticias. Tienes tres funciones que obtienen noticias de diferentes fuentes. Como son independientes, deben ejecutarse en paralelo.
Crea una función `async` llamada `obtenerNoticiasCombinadas` que:
1.  Llame a las tres funciones de forma concurrente.
2.  Espere a que todas se completen.
3.  Combine los resultados de las tres en un solo array plano.
4.  Maneje cualquier posible error que pueda ocurrir durante las peticiones.

```javascript
function fetchNoticiasDeportivas() {
  return new Promise(resolve => setTimeout(() => resolve(['Noticia Deporte 1', 'Noticia Deporte 2']), 800));
}

function fetchNoticiasEconomicas() {
  return new Promise(resolve => setTimeout(() => resolve(['Noticia Eco 1']), 1200));
}

function fetchNoticiasTecnologicas() {
  // Simulemos un fallo en esta fuente
  return new Promise((resolve, reject) => setTimeout(() => reject(new Error('API de Tecnología caída')), 500));
}

// Tu implementación de 'obtenerNoticiasCombinadas' aquí


// Llama a tu función
// obtenerNoticiasCombinadas();
```

<details>
<summary>Solución Razonada</summary>

```javascript
function fetchNoticiasDeportivas() { /* ... */ }
function fetchNoticiasEconomicas() { /* ... */ }
function fetchNoticiasTecnologicas() { /* ... */ }

async function obtenerNoticiasCombinadas() {
  console.log("Buscando todas las noticias...");
  try {
    // 1. Inicia todas las promesas al mismo tiempo.
    const promesas = [
      fetchNoticiasDeportivas(),
      fetchNoticiasEconomicas(),
      fetchNoticiasTecnologicas()
    ];

    // 2. Usa Promise.all para esperar a que todas se resuelvan.
    // 'await' pausa la función aquí hasta que Promise.all se establezca.
    const resultados = await Promise.all(promesas);
    // Si alguna promesa falla (como fetchNoticiasTecnologicas),
    // esta línea nunca se alcanza y la ejecución salta al catch.

    // 3. Combina los arrays de resultados en uno solo.
    const noticiasCombinadas = resultados.flat();
    // Alternativa: const noticiasCombinadas = [].concat(...resultados);

    console.log("Noticias combinadas:", noticiasCombinadas);
    return noticiasCombinadas;

  } catch (error) {
    // 4. Captura el error si Promise.all es rechazado.
    console.error("No se pudieron obtener todas las noticias:", error.message);
    return []; // Devuelve un array vacío como fallback.
  }
}


// Para probar el caso de éxito, podemos modificar la función que falla:
/*
function fetchNoticiasTecnologicas() {
  return new Promise(resolve => setTimeout(() => resolve(['Noticia Tech 1']), 500));
}
*/

obtenerNoticiasCombinadas();
```

**Explicación:**

Este patrón es extremadamente común y poderoso.

1.  Al invocar las tres funciones (`fetchNoticias...()`) y almacenar sus promesas resultantes en el array `promesas` **antes** de usar `await`, nos aseguramos de que las tres operaciones de red comiencen su ejecución en paralelo.

2.  `await Promise.all(promesas)` es la clave. Pausa la función `obtenerNoticiasCombinadas` hasta que se cumpla una de dos condiciones:
    -   **Éxito:** Todas las promesas en el array `promesas` se resuelven. `await` entonces "desenvuelve" el resultado, que es un array de los resultados de cada promesa: `[ ['Noticia Deporte 1', ...], ['Noticia Eco 1'], ['Noticia Tech 1'] ]`.
    -   **Fallo:** Tan pronto como **una** de las promesas (en nuestro caso, `fetchNoticiasTecnologicas`) es rechazada, `Promise.all` se rechaza inmediatamente con el error de esa promesa. El `await` lanza esa excepción, y es capturada por nuestro bloque `catch`.

3.  `resultados.flat()` es un método de array útil (ES2019) que toma un array de arrays y lo "aplana" en un único array de primer nivel.

4.  El bloque `catch` nos permite manejar el fallo de manera centralizada, decidiendo qué hacer si el conjunto de operaciones no se puede completar (en este caso, registrar el error y devolver un array vacío).
</details>
