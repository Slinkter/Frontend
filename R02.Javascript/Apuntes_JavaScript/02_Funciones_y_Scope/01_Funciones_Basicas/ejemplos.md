# Ejemplos: Funciones

## 1. Variaciones de Arrow Functions

```javascript
// Sin parámetros (requiere paréntesis)
const saludar = () => "Hola";

// Un solo parámetro (paréntesis opcionales)
const cuadrado = (x) => x * x;

// Múltiples parámetros (requiere paréntesis)
const suma = (a, b) => a + b;

// Cuerpo con múltiples líneas (requiere llaves y return explícito)
const calculoComplejo = (a, b) => {
  const resultado = a + b;
  return resultado * 2;
};

// Retornar un objeto literales (requiere paréntesis envolventes para no confundir con bloque)
const crearUsuario = (nombre) => ({ nombre: nombre, activo: true });
```

## 2. Callback Functions

Funciones que se pasan como argumento a otras funciones. Base de la programación asíncrona y funcional en JS.

```javascript
function procesarEntrada(usuario, callback) {
  const nombre = usuario.nombre;
  callback(nombre);
}

const saludo = (nombre) => console.log(`Bienvenido ${nombre}`);

procesarEntrada({ nombre: "Carlos" }, saludo); // "Bienvenido Carlos"
```

## 3. IIFE (Immediately Invoked Function Expression)

Funciones que se ejecutan tan pronto como se definen. (Patrón antiguo para encapsular scope, menos usado con módulos ES6).

```javascript
(function () {
  const secreto = "Nadie me ve desde fuera";
  console.log("Me ejecuto inmediatamente");
})();
```
