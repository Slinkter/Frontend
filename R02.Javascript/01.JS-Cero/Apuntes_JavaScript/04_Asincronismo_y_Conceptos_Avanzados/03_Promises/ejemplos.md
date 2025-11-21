# Ejemplos Prácticos: Promesas (Promises)

## 1. Creando y Consumiendo una Promesa Simple

Este ejemplo encapsula un `setTimeout` para demostrar el flujo básico de una promesa.

```javascript
// Ejemplo 1: Creando una promesa
const promesaDeDescarga = new Promise((resolve, reject) => {
  console.log('Iniciando descarga...');
  
  setTimeout(() => {
    const exito = true;
    if (exito) {
      resolve('¡Descarga completada!'); // La promesa se cumple
    } else {
      reject(new Error('Fallo en la red.')); // La promesa se rechaza
    }
  }, 2000);
});

// Consumiendo la promesa
console.log('Promesa creada. Esperando resultado...');

promesaDeDescarga
  .then(mensajeDeExito => {
    console.log('Resultado:', mensajeDeExito);
  })
  .catch(error => {
    console.error('Error:', error.message);
  })
  .finally(() => {
    console.log('Operación de descarga finalizada (éxito o fallo).');
  });
```

## 2. Encadenamiento de Promesas (Promise Chaining)

El encadenamiento es la solución al "Callback Hell". El código se lee de forma secuencial y plana.

```javascript
// Ejemplo 2: Secuencia de pasos asíncronos
function paso1() {
  return new Promise(resolve => {
    setTimeout(() => resolve('Paso 1 OK'), 500);
  });
}

function paso2(datosPaso1) {
  console.log(`Recibido del paso 1: ${datosPaso1}`);
  return new Promise(resolve => {
    setTimeout(() => resolve('Paso 2 OK'), 500);
  });
}

function paso3(datosPaso2) {
  console.log(`Recibido del paso 2: ${datosPaso2}`);
  return new Promise(resolve => {
    setTimeout(() => resolve('Proceso Finalizado'), 500);
  });
}

// Encadenamiento
paso1()
  .then(resultado1 => paso2(resultado1))
  .then(resultado2 => paso3(resultado2))
  .then(resultadoFinal => console.log(resultadoFinal))
  .catch(error => console.error('Algo falló:', error));
```

## 3. `Promise.all`: Ejecución en Paralelo

Se usa cuando necesitas que varias operaciones asíncronas se completen antes de continuar.

```javascript
// Ejemplo 3: Descargar datos de usuario y sus posts simultáneamente
const fetchUsuario = new Promise(resolve => {
  setTimeout(() => resolve({ id: 1, nombre: 'Juan' }), 800);
});

const fetchPosts = new Promise(resolve => {
  setTimeout(() => resolve(['Post 1', 'Post 2']), 1200);
});

const fetchPermisos = new Promise(resolve => {
  setTimeout(() => resolve(['admin', 'editor']), 500);
});

console.time('Promise.all'); // Inicia un temporizador
Promise.all([fetchUsuario, fetchPosts, fetchPermisos])
  .then(resultados => {
    // 'resultados' es un array con los valores de cada promesa, en el mismo orden.
    const [usuario, posts, permisos] = resultados;

    console.log('Usuario:', usuario);
    console.log('Posts:', posts);
    console.log('Permisos:', permisos);
    console.timeEnd('Promise.all'); // Detiene el temporizador. Tarda ~1200ms (lo que tarda la promesa más lenta).
  })
  .catch(console.error);

// Ejemplo 3b: ¿Qué pasa si una falla?
const promesaQueFalla = Promise.reject(new Error('Fallo intencionado'));

Promise.all([fetchUsuario, promesaQueFalla, fetchPosts])
  .then(resultados => {
    // Este bloque nunca se ejecuta
    console.log('Resultados de .all con fallo:', resultados);
  })
  .catch(error => {
    // .all se rechaza inmediatamente con el error de la primera promesa que falló.
    console.error('Promise.all falló:', error.message);
  });
```

## 4. `Promise.allSettled`: Esperar a Todas sin Importar el Resultado

Útil cuando el fallo de una operación no debe impedir que se conozca el resultado de las demás.

```javascript
// Ejemplo 4: Verificando el estado de varios servicios
const servicio1 = Promise.resolve('Servicio 1 OK');
const servicio2 = Promise.reject(new Error('Servicio 2 Caído'));
const servicio3 = Promise.resolve('Servicio 3 OK');

Promise.allSettled([servicio1, servicio2, servicio3])
  .then(resultados => {
    console.log('Resultados de allSettled:');
    resultados.forEach(res => {
      if (res.status === 'fulfilled') {
        console.log(`- Éxito: ${res.value}`);
      } else {
        console.log(`- Fallo: ${res.reason.message}`);
      }
    });
  });
// Salida:
// - Éxito: Servicio 1 OK
// - Fallo: Servicio 2 Caído
// - Éxito: Servicio 3 OK
```
`allSettled` es mucho más seguro que `all` si necesitas que todas las operaciones se intenten.
