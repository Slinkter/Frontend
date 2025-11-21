# Ejemplos Prácticos: Strings y Numbers

## 1. Manipulación de Strings

Los métodos de `String` son la base para procesar texto en JavaScript.

### Plantillas Literales (Template Literals)
Son la forma moderna y recomendada de construir strings.

```javascript
// Ejemplo 1: Interpolación y multilínea
const producto = {
  nombre: 'Laptop Pro',
  precio: 1500,
  disponible: true
};

const fichaProducto = `
-------------------------
Producto: ${producto.nombre}
Precio:   $${producto.precio}
Stock:    ${producto.disponible ? 'Sí' : 'No'}
-------------------------
`;

console.log(fichaProducto);
```

### Métodos Comunes de Strings
Estos métodos no modifican el string original, sino que devuelven uno nuevo.

```javascript
// Ejemplo 2: Extracción, reemplazo y división
const frase = 'JavaScript es un lenguaje versátil y poderoso.';

// .substring(inicio, fin) - Extrae una parte del string
const palabra = frase.substring(0, 10);
console.log(palabra); // 'JavaScript'

// .replace(valorABuscar, nuevoValor) - Reemplaza la primera ocurrencia
const nuevaFrase = frase.replace('JavaScript', 'JS');
console.log(nuevaFrase); // 'JS es un lenguaje versátil y poderoso.'

// .toUpperCase() / .toLowerCase() - Conversión a mayúsculas/minúsculas
console.log(frase.toUpperCase()); // 'JAVASCRIPT ES UN LENGUAJE VERSÁTIL Y PODEROSO.'

// .split(separador) - Divide el string en un array
const palabras = frase.split(' ');
console.log(palabras); // ['JavaScript', 'es', 'un', 'lenguaje', 'versátil', 'y', 'poderoso.']
```

## 2. Manipulación de Numbers

El manejo correcto de los números es crucial, especialmente en conversiones y cálculos.

### Conversión de Strings a Numbers
Es importante elegir el método adecuado según el contexto.

```javascript
// Ejemplo 3: parseInt, parseFloat y Number
const str1 = '25.5px';
const str2 = '100%';
const str3 = ' 3.14 ';
const str4 = '3.14 es PI';

// parseInt ignora lo que no es número al final y trunca decimales
console.log(parseInt(str1, 10)); // 25 (el 'px' es ignorado)

// parseFloat captura los decimales
console.log(parseFloat(str3)); // 3.14 (los espacios son ignorados)
console.log(parseFloat(str4)); // 3.14 (el texto después del número es ignorado)

// Number() es más estricto y devuelve NaN si hay caracteres extra no numéricos
console.log(Number(str1)); // NaN
console.log(Number(str3)); // 3.14
```

### Formateo de Números
Muy útil para mostrar números al usuario final.

```javascript
// Ejemplo 4: .toFixed() para formateo decimal
const precio = 49.95678;

// Redondear a 2 decimales para mostrarlo como dinero
const precioFormateado = precio.toFixed(2);
console.log(precioFormateado); // '49.96' (devuelve un string)
console.log(typeof precioFormateado); // 'string'

// Para volver a usarlo en cálculos, hay que convertirlo de nuevo a número
const total = parseFloat(precioFormateado) * 2;
console.log(total); // 99.92
```

### El caso `NaN`
Recordar siempre usar `Number.isNaN()` para verificar si un valor es `NaN`.

```javascript
// Ejemplo 5: Comprobando NaN
let resultado = 'Hola' / 5;
console.log(resultado); // NaN

if (Number.isNaN(resultado)) {
  console.log('La operación no produjo un número válido.');
}

// No hagas esto:
if (resultado === NaN) {
  // Este bloque nunca se ejecutará
  console.log('Esta comprobación no funciona.');
}
```
