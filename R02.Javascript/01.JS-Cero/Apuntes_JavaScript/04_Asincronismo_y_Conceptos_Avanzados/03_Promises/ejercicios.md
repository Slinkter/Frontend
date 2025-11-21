# Ejercicios Propuestos: Promesas

## Ejercicio 1: "Promisificar" una Función con Callback

**Objetivo:** Adaptar una función clásica basada en callbacks al mundo moderno de las promesas.

**Instrucciones:**
Toma la siguiente función `obtenerDatos` que utiliza un callback de estilo "error-first". Crea una nueva función `obtenerDatosConPromesa` que envuelva a `obtenerDatos` y devuelva una promesa. La promesa debe resolverse con los datos si la operación tiene éxito y rechazarse con el error si falla.

```javascript
// Función original basada en callbacks
function obtenerDatos(id, callback) {
  setTimeout(() => {
    if (id === 1) {
      callback(null, { id: 1, nombre: 'Dato de prueba' });
    } else {
      callback(new Error('ID no encontrado'));
    }
  }, 1000);
}

// Tu código para la función 'obtenerDatosConPromesa' aquí

// Casos de prueba
// 1. Caso de éxito
obtenerDatosConPromesa(1)
  .then(datos => {
    console.log('Éxito:', datos); // Esperado: { id: 1, nombre: 'Dato de prueba' }
  })
  .catch(error => {
    console.error('Este no debería ejecutarse:', error);
  });

// 2. Caso de fallo
obtenerDatosConPromesa(2)
  .then(datos => {
    console.log('Este no debería ejecutarse:', datos);
  })
  .catch(error => {
    console.error('Fallo:', error.message); // Esperado: ID no encontrado
  });
```

<details>
<summary>Solución Razonada</summary>

```javascript
// Función original (sin cambios)
function obtenerDatos(id, callback) {
  setTimeout(() => {
    if (id === 1) {
      callback(null, { id: 1, nombre: 'Dato de prueba' });
    } else {
      callback(new Error('ID no encontrado'));
    }
  }, 1000);
}


// Implementación de la función "promisificada"
function obtenerDatosConPromesa(id) {
  // 1. Devolvemos una nueva promesa.
  return new Promise((resolve, reject) => {
    // 2. Dentro de la promesa, llamamos a la función original.
    obtenerDatos(id, (error, datos) => {
      // 3. El callback de la función original ahora controla la promesa.
      if (error) {
        // Si la función original devuelve un error, rechazamos la promesa.
        reject(error);
      } else {
        // Si devuelve datos, resolvemos la promesa con esos datos.
        resolve(datos);
      }
    });
  });
}

// Casos de prueba (sin cambios)
// ...
```

**Explicación:**
Este patrón se conoce como "promisifying" (promisificación). Es una forma de crear una capa de abstracción moderna sobre una API antigua.

1.  `obtenerDatosConPromesa` crea e inmediatamente devuelve un objeto `Promise`. La promesa comienza en estado `pending`.
2.  Dentro del *executor* de la promesa, invocamos la función asíncrona original, `obtenerDatos`.
3.  Le pasamos a `obtenerDatos` un callback que hemos definido nosotros. Este callback es el "puente" entre el mundo de los callbacks y el mundo de las promesas.
4.  Cuando `obtenerDatos` termina, llama a nuestro callback.
    -   Si lo llama con un `error`, nuestro callback invoca a `reject(error)`, lo que hace que la promesa pase al estado `rejected`.
    -   Si lo llama con `datos`, nuestro callback invoca a `resolve(datos)`, haciendo que la promesa pase a `fulfilled`.

De esta manera, hemos "traducido" el resultado de una función de callback a los estados de una promesa, permitiendo que se consuma con `.then()` y `.catch()`.
</details>

---

## Ejercicio 2: Orquestación de Peticiones con `Promise.all`

**Objetivo:** Utilizar `Promise.all` para ejecutar múltiples operaciones asíncronas en paralelo y procesar los resultados una vez que todas hayan terminado.

**Instrucciones:**
Simula la obtención de los datos de un "dashboard". Necesitas obtener la información del usuario, sus notificaciones y la configuración de su cuenta. Cada una de estas operaciones es una promesa separada. Utiliza `Promise.all` para esperar a que las tres promesas se completen y luego imprime un objeto consolidado con toda la información.

```javascript
function fetchUserInfo() {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id: 1, nombre: 'Ana' }), 600);
  });
}

function fetchNotifications() {
  return new Promise(resolve => {
    setTimeout(() => resolve(['Nuevo mensaje', 'Tarea pendiente']), 1000);
  });
}

function fetchAccountSettings() {
  return new Promise(resolve => {
    setTimeout(() => resolve({ theme: 'dark', language: 'es' }), 800);
  });
}

// Tu código aquí
// Usa Promise.all para obtener todos los datos y luego imprime el objeto dashboardData.

/*
const dashboardData = {
  user: { id: 1, nombre: 'Ana' },
  notifications: ['Nuevo mensaje', 'Tarea pendiente'],
  settings: { theme: 'dark', language: 'es' }
};
*/
```

<details>
<summary>Solución Razonada</summary>

```javascript
function fetchUserInfo() { /* ... */ }
function fetchNotifications() { /* ... */ }
function fetchAccountSettings() { /* ... */ }


// 1. Creamos un array con las promesas que queremos ejecutar.
const promesas = [
  fetchUserInfo(),
  fetchNotifications(),
  fetchAccountSettings()
];

// 2. Pasamos el array a Promise.all.
Promise.all(promesas)
  .then(resultados => {
    // 3. 'resultados' es un array que contiene los valores de resolución
    //    de cada promesa, en el mismo orden en que las pusimos en el array.
    //    [userInfo, notifications, accountSettings]
    
    // 4. Usamos desestructuración para asignar los resultados a variables claras.
    const [user, notifications, settings] = resultados;

    // 5. Construimos el objeto final.
    const dashboardData = {
      user,
      notifications,
      settings
    };

    console.log('Datos del Dashboard:', dashboardData);
  })
  .catch(error => {
    // Este bloque se ejecutaría si CUALQUIERA de las promesas fallara.
    console.error('Error al cargar el dashboard:', error);
  });
```

**Explicación:**

1.  `Promise.all` es la herramienta perfecta para este escenario porque las tres operaciones (`fetchUserInfo`, `fetchNotifications`, `fetchAccountSettings`) son independientes entre sí y pueden ejecutarse en paralelo.
2.  El tiempo total de ejecución será determinado por la promesa más lenta (en este caso, `fetchNotifications` con 1000ms). `Promise.all` no espera a que una termine para empezar la otra.
3.  El bloque `.then` solo se ejecuta cuando **todas** las promesas dentro del array se han cumplido con éxito.
4.  La desestructuración de arrays (`const [user, notifications, settings] = resultados;`) es una forma muy limpia y legible de asignar los valores del array de resultados a variables individuales, basándose en su posición.
5.  Si alguna de las promesas en el array se rechazara, `Promise.all` se rechazaría inmediatamente y la ejecución saltaría directamente al bloque `.catch`, ignorando los resultados de las promesas que sí tuvieron éxito.
</details>
