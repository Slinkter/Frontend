# Ejemplos Prácticos: Async/Await

## 1. De `.then()` a `async/await`

Este ejemplo muestra la transformación directa de una cadena de promesas a la sintaxis `async/await`.

```javascript
function obtenerUsuario(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Buscando usuario con id: ${id}...`);
      resolve({ id, nombre: 'David' });
    }, 1000);
  });
}

// Ejemplo 1a: Usando .then()
function procesarConThen() {
  obtenerUsuario(1)
    .then(usuario => {
      console.log('Usuario encontrado (con .then):', usuario);
    })
    .catch(error => {
      console.error('Error (con .then):', error);
    });
}
// procesarConThen();

// Ejemplo 1b: Usando async/await
async function procesarConAsyncAwait() {
  try {
    // 'await' pausa la función y espera a que la promesa se resuelva.
    // El valor resuelto se asigna directamente a la variable 'usuario'.
    const usuario = await obtenerUsuario(2);
    console.log('Usuario encontrado (con async/await):', usuario);
  } catch (error) {
    // Si la promesa es rechazada, se lanza una excepción que es
    // capturada por el bloque catch.
    console.error('Error (con async/await):', error);
  }
}
procesarConAsyncAwait();
```

## 2. Flujo Secuencial

`async/await` brilla al escribir operaciones asíncronas que dependen una de la otra.

```javascript
// Ejemplo 2: Pasos dependientes
function pasoA() {
  return new Promise(resolve => setTimeout(() => resolve('Resultado A'), 500));
}
function pasoB(datosDeA) {
  return new Promise(resolve => setTimeout(() => resolve(`${datosDeA} + Resultado B`), 500));
}
function pasoC(datosDeB) {
  return new Promise(resolve => setTimeout(() => resolve(`${datosDeB} + Resultado C`), 500));
}

async function ejecutarSecuencia() {
  console.log('Iniciando secuencia...');
  try {
    const resA = await pasoA();
    console.log('Paso A completado.');
    
    const resB = await pasoB(resA);
    console.log('Paso B completado.');

    const resC = await pasoC(resB);
    console.log('Paso C completado.');
    
    console.log('Resultado final:', resC);
  } catch (error) {
    console.error('La secuencia falló:', error);
  }
}

ejecutarSecuencia();
```

## 3. Ejecución en Paralelo con `Promise.all`

Para tareas independientes, `Promise.all` sigue siendo la herramienta correcta, y `await` se usa para esperar el resultado conjunto.

```javascript
// Ejemplo 3: Descargar varias piezas de datos a la vez
function getRecurso(nombre, tiempo) {
  return new Promise(resolve => setTimeout(() => resolve(`Datos de ${nombre}`), tiempo));
}

async function obtenerDashboard() {
  console.log('Obteniendo datos del dashboard...');
  console.time('dashboard'); // Inicia temporizador

  try {
    // Inicia todas las peticiones en paralelo
    const promesaUsuarios = getRecurso('usuarios', 800);
    const promesaProductos = getRecurso('productos', 1200);
    const promesaOrdenes = getRecurso('ordenes', 500);

    // Espera a que todas las promesas se completen
    const [usuarios, productos, ordenes] = await Promise.all([
      promesaUsuarios,
      promesaProductos,
      promesaOrdenes
    ]);

    console.log('Usuarios:', usuarios);
    console.log('Productos:', productos);
    console.log('Órdenes:', ordenes);
    
  } catch (error) {
    console.error('Fallo al obtener datos del dashboard:', error);
  } finally {
    console.timeEnd('dashboard'); // El tiempo total es ~1200ms (el de la promesa más lenta)
  }
}

obtenerDashboard();
```

## 4. Manejo de Errores con `try...catch`

`try...catch` proporciona una forma unificada y familiar de manejar los rechazos de las promesas.

```javascript
// Ejemplo 4: Capturando un rechazo
function operacionQueFalla() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Fallo catastrófico')), 1500);
  });
}

async function intentarOperacion() {
  console.log('Intentando operación riesgosa...');
  try {
    const resultado = await operacionQueFalla();
    // Esta línea nunca se ejecuta
    console.log('Éxito:', resultado);
  } catch (error) {
    // El 'await' lanza la razón del rechazo, que es capturada aquí.
    console.error(`¡Capturado! -> ${error.message}`);
  } finally {
    console.log('Bloque finally: me ejecuto siempre.');
  }
}

intentarOperacion();
```
La sintaxis `async/await` hace que el manejo de errores asíncronos se sienta casi idéntico al manejo de errores síncronos, lo cual es una gran ventaja en términos de legibilidad y mantenibilidad.
