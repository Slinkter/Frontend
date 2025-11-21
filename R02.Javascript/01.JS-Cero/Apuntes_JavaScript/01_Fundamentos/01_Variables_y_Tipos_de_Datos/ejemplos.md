# Ejemplos Prácticos: Variables y Tipos de Datos

## 1. Declaración de Variables

A continuación, se muestran ejemplos prácticos sobre la declaración de variables, ilustrando las diferencias clave entre `var`, `let` y `const`.

### `let`: Scope de Bloque
`let` limita la visibilidad de la variable al bloque donde fue declarada.

```javascript
// Ejemplo 1: Scope de bloque con let
if (true) {
  let framework = 'React';
  console.log(framework); // 'React'
}
// console.log(framework); // ReferenceError: framework is not defined
// La variable 'framework' no existe fuera del bloque 'if'.
```

### `const`: Declaración de Constantes
`const` previene la reasignación de una variable.

```javascript
// Ejemplo 2: Inmutabilidad de la asignación con const
const PI = 3.14159;
// PI = 3.14; // TypeError: Assignment to constant variable.
// No se puede reasignar el valor de una constante.

// Ejemplo 3: 'const' con objetos
const persona = {
  nombre: 'Juan',
  edad: 30
};
// Es posible modificar las propiedades del objeto.
persona.edad = 31;
console.log(persona.edad); // 31

// Pero no se puede reasignar el objeto completo.
// persona = { nombre: 'Ana', edad: 25 }; // TypeError
```

## 2. Tipos de Datos Primitivos

Los tipos primitivos son inmutables. Observa cómo se comportan.

### `string`
```javascript
// Ejemplo 4: Inmutabilidad de los strings
let saludo = 'Hola';
saludo.toUpperCase(); // Esta operación NO modifica 'saludo'
console.log(saludo); // 'Hola'

let saludoMayusculas = saludo.toUpperCase(); // Crea un nuevo string
console.log(saludoMayusculas); // 'HOLA'
```

### `number`
```javascript
// Ejemplo 5: Operaciones numéricas
let a = 10;
let b = 0.5;
console.log(a * b); // 5
```

### `boolean`
```javascript
// Ejemplo 6: Lógica booleana
let esActivo = true;
if (esActivo) {
  console.log('El usuario está activo.');
}
```

### `null` vs `undefined`
Es crucial entender la diferencia semántica entre `null` y `undefined`.

```javascript
// Ejemplo 7: null - Ausencia explícita de valor
let datos = null; // El desarrollador asigna null intencionadamente.
console.log(datos); // null

// Ejemplo 8: undefined - Valor no asignado
let nombre; // Variable declarada pero no inicializada.
console.log(nombre); // undefined
```

## 3. Objetos: Paso por Referencia

Los objetos son mutables y se manipulan mediante referencias.

### Modificación a través de una Referencia
```javascript
// Ejemplo 9: Los objetos se pasan por referencia
let usuario1 = { nombre: 'Carlos' };
let usuario2 = usuario1; // usuario2 ahora apunta al mismo objeto

console.log(usuario1.nombre); // 'Carlos'
console.log(usuario2.nombre); // 'Carlos'

// Si modificamos el objeto a través de usuario2...
usuario2.nombre = 'Pedro';

// ...el cambio se refleja en usuario1, porque son el mismo objeto.
console.log(usuario1.nombre); // 'Pedro'
```

Este comportamiento es fundamental en JavaScript y tiene implicaciones directas en cómo se gestiona el estado en aplicaciones complejas. Una modificación en un lugar puede afectar a otras partes del sistema si no se maneja con cuidado.
