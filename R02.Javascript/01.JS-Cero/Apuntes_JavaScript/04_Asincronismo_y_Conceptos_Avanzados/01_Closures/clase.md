# Clase: Closures - La Memoria Persistente de las Funciones

## 1. Introducción: Más Allá del Scope Léxico

Ya hemos establecido que el **ámbito léxico** permite que una función anidada acceda a las variables de su función contenedora. Un **closure** (o clausura) es la manifestación natural de este principio, pero con una consecuencia extraordinaria: la función anidada mantiene este acceso a su scope exterior **incluso después de que la función exterior haya finalizado su ejecución**.

Un closure no es algo que se "crea" con una sintaxis especial. Es un fenómeno fundamental que ocurre cada vez que una función es declarada. La función "cierra sobre" (closes over) o "captura" las variables de su entorno, creando una mochila persistente de datos.

La definición formal: **Un closure es la combinación de una función y el ámbito léxico en el que fue declarada.**

## 2. El Mecanismo del Closure en Acción

Analicemos el ejemplo canónico:

```javascript
function crearContador() {
  let contador = 0; // 'contador' es parte del scope de 'crearContador'

  // La función anidada 'incrementar' se declara dentro de este scope.
  // Por lo tanto, tiene acceso a 'contador'.
  return function incrementar() {
    contador++;
    return contador;
  };
}

// 1. Llamamos a crearContador().
//    - Se crea la variable 'contador' (valor 0).
//    - Se crea la función 'incrementar'.
//    - Se devuelve la función 'incrementar'.
// 2. La ejecución de crearContador() TERMINA.
//    - Podríamos pensar que 'contador' debería ser destruido por el Garbage Collector.
const miContador = crearContador();

// 3. 'miContador' ahora es la función 'incrementar'.
//    Gracias al closure, 'incrementar' "recuerda" su scope léxico
//    y mantiene una referencia viva a la variable 'contador'.

console.log(miContador()); // 1
console.log(miContador()); // 2
console.log(miContador()); // 3

// Cada llamada a crearContador crea un NUEVO scope y un NUEVO closure.
const miOtroContador = crearContador();
console.log(miOtroContador()); // 1 (es un contador independiente)
```

## 3. Aplicaciones Prácticas y Patrones de Diseño

Los closures no son solo una curiosidad teórica; son la base de muchos de los patrones más importantes en JavaScript.

### 3.1. Encapsulamiento y Estado Privado (El Patrón Módulo)

Antes de las clases de ES6, los closures eran la forma principal de emular variables y métodos privados. Este patrón, conocido como el "Module Pattern", es fundamental para el encapsulamiento.

```javascript
function crearCalculadora() {
  let resultado = 0; // Variable privada

  // Métodos públicos que tienen acceso a la variable privada gracias al closure.
  const sumar = (n) => resultado += n;
  const restar = (n) => resultado -= n;
  const obtenerResultado = () => resultado;

  // Devolvemos un objeto que expone solo la API pública.
  return {
    sumar,
    restar,
    obtenerResultado
  };
}

const calc = crearCalculadora();
calc.sumar(10);
calc.restar(3);
// calc.resultado; // undefined. No podemos acceder directamente al estado interno.
console.log(calc.obtenerResultado()); // 7
```
El objeto devuelto es una API pública. El estado interno (`resultado`) está completamente encapsulado y solo puede ser modificado a través de los métodos expuestos, previniendo la manipulación externa no deseada.

### 3.2. Currificación (Currying) y Funciones de Orden Superior

Los closures hacen posible la currificación, una técnica donde una función que toma múltiples argumentos se descompone en una secuencia de funciones, cada una tomando un solo argumento. Cada función devuelta es un closure que recuerda el argumento anterior.

```javascript
// Función no currificada
const sumar = (a, b, c) => a + b + c;

// Función currificada
const sumarCurry = a => b => c => a + b + c;

const sumar5 = sumarCurry(5); // Devuelve un closure que recuerda que a = 5
const sumar5y10 = sumar5(10); // Devuelve un closure que recuerda a = 5 y b = 10
console.log(sumar5y10(3)); // 18
```
Este patrón es muy potente para crear funciones especializadas a partir de funciones más genéricas.

### 3.3. Callbacks y Manejo de Eventos
El ejemplo clásico del bucle con `setTimeout` es un problema de closures. `let` resuelve el problema creando un nuevo scope de bloque para cada iteración, permitiendo que el callback del `setTimeout` cierre sobre una variable diferente en cada paso. Con `var`, todos los callbacks cerraban sobre la *misma* variable, cuyo valor final era el del final del bucle.

## 4. Consideraciones de Memoria (Garbage Collection)

Dado que los closures mantienen vivas las referencias a sus scopes externos, pueden, si no se gestionan adecuadamente, llevar a un consumo de memoria mayor de lo esperado. Mientras la función interna (el closure) sea accesible, las variables que ha capturado no podrán ser liberadas por el recolector de basura (Garbage Collector).

En la mayoría de los casos, esto no es un problema. Sin embargo, en aplicaciones de larga duración o al manejar grandes conjuntos de datos, es importante ser consciente de este mecanismo. Por ejemplo, en manejadores de eventos, si un closure captura una referencia a un elemento del DOM grande que ya ha sido eliminado de la página, podría prevenir que ese elemento sea liberado de la memoria (una "fuga de memoria").

## 5. Conclusión

Los closures son una consecuencia directa y poderosa del ámbito léxico de JavaScript. Son el mecanismo que da "memoria" a las funciones, permitiéndoles recordar el entorno en el que fueron creadas. Comprender los closures es fundamental no solo para resolver acertijos de entrevistas, sino para dominar patrones de diseño esenciales como el encapsulamiento, las funciones de orden superior y la gestión del estado, que son omnipresentes en el desarrollo de software moderno con JavaScript.
