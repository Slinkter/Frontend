# Ejemplos: Closures y this

## 1. Closure para Privacidad de Datos

```javascript
function crearContador() {
  let contador = 0; // Variable "privada"

  return {
    incrementar: function () {
      contador++;
      console.log(contador);
    },
    obtenerValor: function () {
      return contador;
    },
  };
}

const miContador = crearContador();
miContador.incrementar(); // 1
miContador.incrementar(); // 2
console.log(miContador.contador); // undefined (No accesible directamente)
```

## 2. `this` y Arrow Functions

```javascript
const objeto = {
  nombre: "Objeto A",
  metodoNormal: function () {
    console.log("Normal:", this.nombre);
  },
  metodoArrow: () => {
    console.log("Arrow:", this.nombre);
  },
  metodoConTimeOut: function () {
    // Solución antigua: const self = this;
    setTimeout(() => {
      // Arrow function hereda 'this' del método 'metodoConTimeOut'
      console.log("Timeout:", this.nombre);
    }, 100);
  },
};

objeto.metodoNormal(); // "Normal: Objeto A" (Correcto)
objeto.metodoArrow(); // "Arrow: undefined" (Hereda de global/window)
objeto.metodoConTimeOut(); // "Timeout: Objeto A" (Correcto, gracias al scope léxico)
```

## 3. Explicit Binding (call, apply)

```javascript
const persona1 = {
  nombre: "Juan",
  saludar: function (saludo) {
    console.log(`${saludo}, soy ${this.nombre}`);
  },
};

const persona2 = { nombre: "Maria" };

// Préstamo de método
persona1.saludar("Hola"); // "Hola, soy Juan"
persona1.saludar.call(persona2, "Hola"); // "Hola, soy Maria"
persona1.saludar.apply(persona2, ["Saludos"]); // "Saludos, soy Maria"
```
