# Ejemplos: Callbacks y Promesas

## 1. Del Callback Hell a Promesas

### Con Callbacks (Callback Hell)

```javascript
doSomething(function (result) {
  doSomethingElse(
    result,
    function (newResult) {
      doThirdThing(
        newResult,
        function (finalResult) {
          console.log("Got the final result: " + finalResult);
        },
        failureCallback
      );
    },
    failureCallback
  );
}, failureCallback);
```

### Con Promesas (Chaining)

```javascript
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => {
    console.log("Got the final result: " + finalResult);
  })
  .catch(failureCallback); // Maneja errores de cualquiera de los pasos anteriores
```

## 2. Creando una Promesa (Promisification)

Envolver una API basada en callbacks (como `setTimeout`) en una Promesa.

```javascript
function esperar(ms) {
  return new Promise((resolve, reject) => {
    if (ms < 0) {
      reject(new Error("El tiempo no puede ser negativo"));
    } else {
      setTimeout(() => {
        resolve(`Esperé ${ms} ms`);
      }, ms);
    }
  });
}

esperar(1000)
  .then((msg) => console.log(msg))
  .catch((err) => console.error(err));
```

## 3. Promise.all vs AllSettled

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.reject("Error en p2");
const p3 = Promise.resolve(3);

// Promise.all
Promise.all([p1, p2, p3])
  .then(console.log)
  .catch((err) => console.error("All falló:", err)); // "All falló: Error en p2"

// Promise.allSettled
Promise.allSettled([p1, p2, p3]).then((results) =>
  console.log("AllSettled:", results)
);
/*
[
  { status: 'fulfilled', value: 1 },
  { status: 'rejected', reason: 'Error en p2' },
  { status: 'fulfilled', value: 3 }
]
*/
```
