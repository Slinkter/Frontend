# Ejemplos Prácticos: Callbacks

## 1. Callback Síncrono

Los callbacks no siempre son asíncronos. Muchos métodos de array los usan de forma síncrona.

```javascript
// Ejemplo 1: Callback en .map()
const nombres = ['ana', 'luis', 'marta'];

// La función de flecha es el callback que .map() ejecuta por cada elemento.
const nombresMayusculas = nombres.map(nombre => nombre.toUpperCase());

console.log(nombresMayusculas); // ['ANA', 'LUIS', 'MARTA']

// Ejemplo 2: Creando nuestra propia función con callback síncrono
function procesarArray(arr, callback) {
  const resultado = [];
  for (let i = 0; i < arr.length; i++) {
    resultado.push(callback(arr[i]));
  }
  return resultado;
}

const numeros = [1, 2, 3, 4];
const dobles = procesarArray(numeros, n => n * 2);
console.log(dobles); // [2, 4, 6, 8]
```

## 2. Callback Asíncrono

Este es el caso de uso más común, donde el callback se ejecuta cuando una tarea en segundo plano finaliza.

```javascript
// Ejemplo 3: setTimeout
console.log('1. Iniciando temporizador...');

setTimeout(() => {
  // Este callback se pone en la Cola de Callbacks después de 2 segundos.
  // El Event Loop lo ejecutará cuando la Pila de Llamadas esté vacía.
  console.log('3. ¡Temporizador cumplido!');
}, 2000);

console.log('2. Temporizador iniciado. El hilo principal no se bloquea.');
```

## 3. Convención Error-First

Este patrón es crucial para manejar errores en operaciones asíncronas basadas en callbacks.

```javascript
// Ejemplo 4: Simulando una función que puede fallar
function descargarArchivo(nombreArchivo, callback) {
  console.log(`Iniciando descarga de ${nombreArchivo}...`);

  setTimeout(() => {
    // Simulamos un error aleatorio
    const tuvoExito = Math.random() > 0.3; // 70% de éxito

    if (tuvoExito) {
      // Si hay éxito, el primer argumento del callback es 'null'
      const contenido = `Contenido del archivo ${nombreArchivo}`;
      callback(null, contenido);
    } else {
      // Si hay un error, el primer argumento es un objeto de Error
      const error = new Error(`No se pudo descargar ${nombreArchivo}`);
      callback(error, null);
    }
  }, 1500);
}

// Usando la función
descargarArchivo('documento.pdf', (error, contenido) => {
  // Siempre comprobamos el error primero
  if (error) {
    console.error('ERROR:', error.message);
    return;
  }

  // Si llegamos aquí, sabemos que 'contenido' es válido
  console.log('ÉXITO:', contenido);
});
```

## 4. Callback Hell (La Pirámide de la Muerte)

Este ejemplo muestra cómo la anidación de callbacks para tareas secuenciales se vuelve rápidamente ilegible.

```javascript
// Ejemplo 5: Simulación de un proceso secuencial
function paso1(callback) {
  setTimeout(() => {
    console.log('Paso 1 completado');
    callback(null, 'resultado-paso-1');
  }, 500);
}

function paso2(datosPaso1, callback) {
  setTimeout(() => {
    console.log('Paso 2 completado con', datosPaso1);
    callback(null, 'resultado-paso-2');
  }, 500);
}

function paso3(datosPaso2, callback) {
  setTimeout(() => {
    console.log('Paso 3 completado con', datosPaso2);
    callback(null, 'RESULTADO FINAL');
  }, 500);
}

// La pirámide
paso1((error1, resultado1) => {
  if (error1) {
    console.error('Error en Paso 1');
  } else {
    paso2(resultado1, (error2, resultado2) => {
      if (error2) {
        console.error('Error en Paso 2');
      } else {
        paso3(resultado2, (error3, resultado3) => {
          if (error3) {
            console.error('Error en Paso 3');
          } else {
            console.log('Proceso finalizado:', resultado3);
          }
        });
      }
    });
  }
});
```
La sangría profunda y la repetición del manejo de errores hacen que este código sea muy frágil. Este es el problema exacto que las Promesas y `async/await` resuelven elegantemente.
