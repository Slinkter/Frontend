# Ejemplos Prácticos: Funciones en JavaScript

## 1. Declaración vs. Expresión de Función

La diferencia en cómo el *hoisting* afecta a cada tipo es crucial.

```javascript
// Ejemplo 1: Declaración de Función
// Se puede llamar antes de que sea declarada gracias al hoisting.
console.log(saludoDeclaracion()); // "Hola desde una declaración"

function saludoDeclaracion() {
  return "Hola desde una declaración";
}

// Ejemplo 2: Expresión de Función
// Intentar llamarla antes de la asignación produce un error.
// saludoExpresion(); // TypeError: saludoExpresion is not a function

const saludoExpresion = function() {
  return "Hola desde una expresión";
};

console.log(saludoExpresion()); // "Hola desde una expresión"
```

## 2. Funciones de Flecha (Arrow Functions)

Su sintaxis concisa las hace ideales para muchas situaciones.

```javascript
// Ejemplo 3: Sintaxis básica y retorno implícito
// Función tradicional
const sumarTradicional = function(a, b) {
  return a + b;
};

// Función de flecha equivalente con cuerpo
const sumarFlechaCuerpo = (a, b) => {
  return a + b;
};

// Con retorno implícito (si es una sola línea, se puede omitir el 'return' y las llaves)
const sumarFlechaConcisa = (a, b) => a + b;

console.log(sumarFlechaConcisa(5, 10)); // 15

// Si solo hay un parámetro, los paréntesis son opcionales
const alCuadrado = numero => numero * numero;
console.log(alCuadrado(4)); // 16
```

## 3. Funciones como Argumentos (Callbacks)

Pasar una función como argumento es la base del asincronismo y de muchos métodos de array.

```javascript
// Ejemplo 4: Un callback simple
function procesarDato(dato, callback) {
  console.log(`Procesando: ${dato}`);
  // Simulamos que el procesamiento toma tiempo
  setTimeout(() => {
    const datoProcesado = dato.toUpperCase();
    callback(datoProcesado);
  }, 1000);
}

function mostrarResultado(resultado) {
  console.log(`El resultado es: ${resultado}`);
}

procesarDato("mi dato importante", mostrarResultado);
// Después de 1 segundo, imprimirá: "El resultado es: MI DATO IMPORTANTE"

// Ejemplo 5: Usando una función anónima (de flecha) como callback en .map
const numeros = [1, 2, 3, 4];
const dobles = numeros.map(n => n * 2); // La función n => n * 2 es el callback
console.log(dobles); // [2, 4, 6, 8]
```

## 4. Funciones que Devuelven Otras Funciones

Este patrón es clave para la reutilización de lógica y la creación de funciones especializadas.

```javascript
// Ejemplo 6: Una función 'factory' que crea validadores
function crearValidador(longitudMinima) {
  // Devuelve una nueva función que recuerda 'longitudMinima' (esto es un closure)
  return function(texto) {
    return texto.length >= longitudMinima;
  };
}

const esNombreValido = crearValidador(2);
const esPasswordValido = crearValidador(8);

console.log(esNombreValido("Ana")); // true
console.log(esNombreValido(""));  // false
console.log(esPasswordValido("12345")); // false
console.log(esPasswordValido("passwordseguro")); // true
```

## 5. Parámetros por Defecto y el Objeto `arguments`

```javascript
// Ejemplo 7: Parámetros por defecto (ES6)
function crearProducto(nombre, precio = 10, categoria = "General") {
  return `Producto: ${nombre}, Precio: $${precio}, Categoría: ${categoria}`;
}

console.log(crearProducto("Libro"));
// "Producto: Libro, Precio: $10, Categoría: General"

console.log(crearProducto("Laptop", 1200, "Tecnología"));
// "Producto: Laptop, Precio: $1200, Categoría: Tecnología"
```
