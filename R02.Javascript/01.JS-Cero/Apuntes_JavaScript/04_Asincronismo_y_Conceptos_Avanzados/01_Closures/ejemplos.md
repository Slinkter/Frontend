# Ejemplos Prácticos: Closures (Clausuras)

## 1. El Closure Básico: Recordando el Entorno

Este es el ejemplo fundamental. La función interna `saludar()` "recuerda" la variable `mensaje` de su función padre `crearSaludo()`, incluso después de que `crearSaludo()` ha terminado.

```javascript
// Ejemplo 1: Una función que devuelve otra
function crearSaludo(saludo) {
  const mensaje = `${saludo},`; // Esta variable es "capturada" por el closure

  // Se devuelve la función interna, que forma un closure.
  return function(nombre) {
    console.log(`${mensaje} ${nombre}!`);
  };
}

// crearSaludo() ya terminó, pero la variable 'mensaje' sobrevive en el closure.
const saludoHola = crearSaludo('Hola');
const saludoAdios = crearSaludo('Adiós');

saludoHola('Juan');   // "Hola, Juan!"
saludoAdios('María'); // "Adiós, María!"
```

## 2. Estado Privado con el Patrón Módulo

Los closures son la forma canónica de crear variables "privadas" en JavaScript basado en funciones.

```javascript
// Ejemplo 2: Emulando una cuenta bancaria
function crearCuentaBancaria(saldoInicial = 0) {
  // 'saldo' es una variable privada. No se puede acceder a ella desde fuera.
  let saldo = saldoInicial;

  // Se devuelve un objeto con métodos públicos que "cierran sobre" 'saldo'.
  return {
    depositar: function(monto) {
      if (monto > 0) {
        saldo += monto;
        console.log(`Depositados: $${monto}. Saldo actual: $${saldo}`);
      }
    },
    retirar: function(monto) {
      if (monto > 0 && monto <= saldo) {
        saldo -= monto;
        console.log(`Retirados: $${monto}. Saldo actual: $${saldo}`);
      } else {
        console.log('Fondos insuficientes o monto inválido.');
      }
    },
    consultarSaldo: function() {
      return `El saldo actual es $${saldo}`;
    }
  };
}

const miCuenta = crearCuentaBancaria(100);

// No podemos acceder o modificar 'saldo' directamente.
// console.log(miCuenta.saldo); // undefined

// Solo podemos interactuar a través de la API pública.
miCuenta.depositar(50);     // Depositados: $50. Saldo actual: $150
miCuenta.retirar(30);       // Retirados: $30. Saldo actual: $120
miCuenta.retirar(200);      // Fondos insuficientes...
console.log(miCuenta.consultarSaldo()); // El saldo actual es $120
```

## 3. Currificación (Currying)

La currificación es una aplicación directa de los closures para crear funciones especializadas.

```javascript
// Ejemplo 3: Una función genérica para aplicar un impuesto
const aplicarImpuesto = (tasa) => {
  // Devuelve un closure que recuerda 'tasa'
  return (monto) => {
    return monto + (monto * tasa);
  };
};

// Creamos funciones especializadas a partir de la genérica
const aplicarIVA = aplicarImpuesto(0.21); // 21% de IVA
const aplicarImpuestoLujo = aplicarImpuesto(0.35); // 35% de impuesto de lujo

const precioProducto = 100;

console.log(`Precio con IVA: ${aplicarIVA(precioProducto)}`); // 121
console.log(`Precio con impuesto de lujo: ${aplicarImpuestoLujo(precioProducto)}`); // 135
```

## 4. El Problema Clásico del Bucle (y su Solución)

Este ejemplo ilustra por qué `let` (con su scope de bloque) resuelve un problema fundamental de closures que existía con `var`.

```javascript
// Ejemplo 4: El problema con 'var'
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    // Para cuando este callback se ejecuta, el bucle ya ha terminado.
    // Todas las 3 funciones de callback cierran sobre la MISMA variable 'i',
    // cuyo valor final es 3.
    console.log(`var i = ${i}`);
  }, 10);
}
// Salida: var i = 3 (tres veces)


// Ejemplo 5: La solución con 'let'
for (let j = 0; j < 3; j++) {
  // 'let' crea un nuevo scope de bloque para CADA iteración.
  // Cada callback cierra sobre una 'j' diferente y con el valor correcto.
  setTimeout(() => {
    console.log(`let j = ${j}`);
  }, 10);
}
// Salida:
// let j = 0
// let j = 1
// let j = 2
```
