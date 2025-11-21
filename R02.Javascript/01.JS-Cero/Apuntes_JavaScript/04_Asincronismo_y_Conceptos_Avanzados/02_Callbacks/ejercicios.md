# Ejercicios Propuestos: Callbacks

## Ejercicio 1: Creación de una Función de Orden Superior

**Objetivo:** Implementar una función de orden superior que acepte un array y un callback para imitar el comportamiento de `Array.prototype.map`.

**Instrucciones:**
Crea una función llamada `miMap`. Esta función debe aceptar dos argumentos: un array y un `callback`. Debe iterar sobre cada elemento del array, aplicar el `callback` a cada elemento y devolver un **nuevo array** con los resultados. No puedes usar el método `.map()` original en tu implementación.

```javascript
// Tu código para la función 'miMap' aquí

// Casos de prueba
const numeros = [1, 4, 9];
const raices = miMap(numeros, (num) => Math.sqrt(num));
console.log(raices); // Esperado: [1, 2, 3]

const nombres = ["Carlos", "Diana"];
const saludos = miMap(nombres, (nombre) => `Hola, ${nombre}`);
console.log(saludos); // Esperado: ["Hola, Carlos", "Hola, Diana"]
```

<details>
<summary>Solución Razonada</summary>

```javascript
function miMap(arr, callback) {
  // 1. Crear un nuevo array vacío para almacenar los resultados.
  const nuevoArray = [];

  // 2. Iterar sobre el array original.
  for (let i = 0; i < arr.length; i++) {
    const elemento = arr[i];
    // 3. Aplicar el callback al elemento actual.
    const resultado = callback(elemento, i, arr);
    // 4. Añadir el resultado al nuevo array.
    nuevoArray.push(resultado);
  }

  // 5. Devolver el nuevo array.
  return nuevoArray;
}

// Casos de prueba
const numeros = [1, 4, 9];
const raices = miMap(numeros, (num) => Math.sqrt(num));
console.log(raices); // [1, 2, 3]

const nombres = ["Carlos", "Diana"];
const saludos = miMap(nombres, (nombre) => `Hola, ${nombre}`);
console.log(saludos); // ["Hola, Carlos", "Hola, Diana"]
```

**Explicación:**
Este ejercicio demuestra la esencia de una función de orden superior.
-   `miMap` no sabe *qué* transformación hacer. Su única responsabilidad es iterar sobre el array y gestionar la creación del nuevo array.
-   El `callback` es el que contiene la lógica específica de la transformación (`Math.sqrt` o la creación del saludo).
-   Al pasar diferentes callbacks a `miMap`, podemos reutilizar la lógica de iteración para realizar una infinidad de transformaciones diferentes. Esto separa las responsabilidades (`cómo` iterar vs. `qué` hacer en cada iteración), lo cual es un principio fundamental del buen diseño de software.
</details>

---

## Ejercicio 2: Refactorización de un "Callback Hell"

**Objetivo:** Refactorizar un ejemplo de "Callback Hell" para hacerlo más legible y mantenible, nombrando las funciones y sacándolas de la anidación.

**Instrucciones:**
Toma el siguiente código que sufre de "Callback Hell" y reestructúralo. Define cada paso lógico como una función nombrada separada y luego organízalas para que el flujo sea más fácil de seguir, reduciendo la profundidad de la anidación.

```javascript
// Código original con "Callback Hell"
function obtenerDatosDeUsuario(id, callback) {
  // Simula la búsqueda de datos de configuración
  setTimeout(() => {
    console.log("Configuración leída.");
    const config = { url: `api.test.com/users/${id}` };
    // Simula la petición a la API
    setTimeout(() => {
      console.log(`Pidiendo datos de ${config.url}...`);
      const datosUsuario = { nombre: 'Juan', id: id };
      // Simula la escritura en un log
      setTimeout(() => {
        console.log("Escribiendo en el log...");
        callback(null, datosUsuario);
      }, 500);
    }, 500);
  }, 500);
}

// Llamada original
obtenerDatosDeUsuario(123, (err, data) => {
  if (err) {
    console.error("Hubo un error en el proceso");
  } else {
    console.log("Proceso finalizado, datos recibidos:", data);
  }
});
```

<details>
<summary>Solución Razonada</summary>

```javascript
// Refactorización

// 1. Define cada paso como una función nombrada que sigue la convención error-first.

function paso3_escribirLog(datosUsuario, callbackFinal) {
  setTimeout(() => {
    console.log("Escribiendo en el log...");
    // Suponemos que este paso no puede fallar
    callbackFinal(null, datosUsuario);
  }, 500);
}

function paso2_pedirDatosAPI(config, callbackPaso3) {
  setTimeout(() => {
    console.log(`Pidiendo datos de ${config.url}...`);
    const datosUsuario = { nombre: 'Juan', id: config.id };
    callbackPaso3(null, datosUsuario);
  }, 500);
}

function paso1_leerConfig(id, callbackPaso2) {
  setTimeout(() => {
    console.log("Configuración leída.");
    const config = { url: `api.test.com/users/${id}`, id: id };
    callbackPaso2(null, config);
  }, 500);
}


// 2. Orquesta las llamadas, manejando el error en cada nivel.
//    Esto aún es anidado, pero mucho más legible y organizado.

function obtenerDatosDeUsuarioRefactorizado(id, callbackFinal) {
  paso1_leerConfig(id, (err1, config) => {
    if (err1) {
      console.error("Error en el paso 1");
      return callbackFinal(err1); // Propagar el error
    }

    paso2_pedirDatosAPI(config, (err2, datosUsuario) => {
      if (err2) {
        console.error("Error en el paso 2");
        return callbackFinal(err2);
      }

      paso3_escribirLog(datosUsuario, (err3, resultadoFinal) => {
        if (err3) {
          console.error("Error en el paso 3");
          return callbackFinal(err3);
        }
        
        callbackFinal(null, resultadoFinal);
      });
    });
  });
}


// Llamada refactorizada
obtenerDatosDeUsuarioRefactorizado(123, (err, data) => {
  if (err) {
    console.error("Hubo un error en el proceso global");
  } else {
    console.log("Proceso refactorizado finalizado, datos recibidos:", data);
  }
});
```

**Explicación:**

Aunque el código refactorizado todavía tiene una estructura anidada, hemos ganado varias ventajas significativas:

1.  **Legibilidad:** Cada función tiene un nombre claro que describe su propósito (`paso1_leerConfig`, `paso2_pedirDatosAPI`, etc.). Esto hace que el flujo general sea mucho más fácil de entender.
2.  **Reutilización:** Ahora, cada paso es una función independiente. `paso2_pedirDatosAPI`, por ejemplo, podría ser reutilizada en otra parte de la aplicación con un objeto de configuración diferente.
3.  **Testeabilidad:** Es mucho más fácil escribir pruebas unitarias para funciones pequeñas y enfocadas como `paso1_leerConfig` que para una única función monolítica y anidada.

Esta refactorización es un paso intermedio. El siguiente nivel de mejora sería utilizar **Promesas** para aplanar completamente esta estructura, eliminando la anidación por completo. Este ejercicio demuestra el límite de la legibilidad que se puede alcanzar solo con callbacks.
</details>
