# Ejemplos Prácticos: Operadores en JavaScript

## 1. Operadores de Comparación: `===` vs `==`

La diferencia entre la igualdad estricta y la laxa es uno de los conceptos más importantes a la hora de comparar valores en JavaScript.

```javascript
// Ejemplo 1: Igualdad Estricta (===)
// Compara valor y tipo. Es predecible y la opción recomendada.
console.log('5 === 5:', 5 === 5);         // true (mismo valor, mismo tipo)
console.log("'5' === 5:", '5' === 5);       // false (diferente tipo: string vs number)
console.log('0 === false:', 0 === false);   // false (diferente tipo: number vs boolean)

// Ejemplo 2: Igualdad Laxa (==)
// Intenta convertir los tipos para que coincidan antes de comparar. Puede ser impredecible.
console.log("'5' == 5:", '5' == 5);         // true (el string '5' se convierte a número)
console.log('0 == false:', 0 == false);     // true (false se convierte a 0)
console.log('null == undefined:', null == undefined); // true (un caso especial definido en la especificación)
```

## 2. Operadores Lógicos y Evaluación de Cortocircuito

El cortocircuito es una característica poderosa para escribir código más conciso.

### `||` (OR) para valores por defecto
El operador `||` es perfecto para asignar un valor por defecto si una variable es "falsy" (`null`, `undefined`, `0`, `''`, `false`).

```javascript
// Ejemplo 3: Asignar un nombre de usuario por defecto
let nombreGuardado = null;
let nombreUsuario = nombreGuardado || 'Invitado';
console.log(nombreUsuario); // 'Invitado'

let nombreGuardado2 = 'Ana';
let nombreUsuario2 = nombreGuardado2 || 'Invitado';
console.log(nombreUsuario2); // 'Ana'
```

### `&&` (AND) para ejecución condicional
El operador `&&` es útil para ejecutar una acción solo si se cumple una condición, evitando un `if`.

```javascript
// Ejemplo 4: Llamar a una función solo si el objeto de configuración está disponible
let config = { tema: 'oscuro' };
// let config = null; // Prueba descomentando esta línea

function aplicarTema(tema) {
  console.log(`Aplicando tema: ${tema}`);
}

// En lugar de: if (config) { aplicarTema(config.tema); }
config && aplicarTema(config.tema);
// Si 'config' es null, la expresión se detiene y 'aplicarTema' nunca se llama.
```

## 3. Operador Ternario

Es una alternativa elegante y concisa a una sentencia `if-else` simple.

```javascript
// Ejemplo 5: Determinar si un usuario puede votar
let edad = 20;
let mensaje = (edad >= 18) ? 'Puede votar' : 'No puede votar';
console.log(mensaje); // 'Puede votar'

// Ejemplo 6: Asignar el costo de envío
let totalCompra = 150;
let costoEnvio = (totalCompra > 100) ? 0 : 10;
console.log(`Costo de envío: $${costoEnvio}`); // Costo de envío: $0
```

## 4. Operadores Aritméticos

Más allá de lo básico, el operador de módulo (`%`) y el de exponenciación (`**`) son muy útiles.

```javascript
// Ejemplo 7: Operador de Módulo (%) para saber si un número es par
let numero = 7;
if (numero % 2 === 0) {
  console.log('El número es par.');
} else {
  console.log('El número es impar.'); // Esto se imprimirá
}

// Ejemplo 8: Operador de Exponenciación (**)
let lado = 4;
let areaCuadrado = lado ** 2; // 4 elevado a la 2
console.log(`El área de un cuadrado de lado ${lado} es ${areaCuadrado}`); // 16
```
