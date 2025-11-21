# Ejemplos Prácticos: Booleanos y Conversión de Tipos

## 1. Identificando Valores "Truthy" y "Falsy"

Comprender qué valores se evalúan como `true` o `false` es la base para controlar el flujo de un programa.

```javascript
// Ejemplo 1: Lista de valores "falsy"
// Estos son los únicos 8 valores que se comportan como 'false'
const falsyValues = [false, 0, "", null, undefined, NaN, -0, 0n];

falsyValues.forEach(val => {
  if (val) {
    // Este bloque nunca se ejecutará
  } else {
    console.log(`El valor '${val}' (tipo: ${typeof val}) es falsy.`);
  }
});

// Ejemplo 2: Algunos valores "truthy"
// Cualquier otra cosa es 'truthy'
const truthyValues = [true, 1, "hello", {a: 1}, [1, 2], function() {}];

truthyValues.forEach(val => {
  if (val) {
    console.log(`El valor '${val}' (tipo: ${typeof val}) es truthy.`);
  }
});

// ¡Cuidado con estos casos!
console.log("--- Casos Engañosos ---");
if ("false") console.log("'false' (el string) es truthy.");
if ("0") console.log("'0' (el string) es truthy.");
if ([]) console.log("[] (array vacío) es truthy.");
if ({}) console.log("{} (objeto vacío) es truthy.");
```

## 2. Conversión Explícita a Booleano

Para evitar ambigüedades, es mejor convertir explícitamente un valor a booleano cuando la intención es clara.

```javascript
// Ejemplo 3: Usando Boolean() y la doble negación (!!)
const nombre = "Ana";
const puntos = 0;
const configuracion = null;

// Usando Boolean() - más legible para principiantes
const nombreEsValido = Boolean(nombre); // true
const tienePuntos = Boolean(puntos);   // false (porque 0 es falsy)
const tieneConfig = Boolean(configuracion); // false (porque null es falsy)

console.log(`Nombre válido: ${nombreEsValido}`);
console.log(`Tiene puntos: ${tienePuntos}`);
console.log(`Tiene config: ${tieneConfig}`);

// Usando !! - un modismo común y más corto
const nombreEsValido2 = !!nombre; // true
const tienePuntos2 = !!puntos;   // false
const tieneConfig2 = !!configuracion; // false

console.log(`Nombre válido (con !!): ${nombreEsValido2}`);
console.log(`Tiene puntos (con !!): ${tienePuntos2}`);
console.log(`Tiene config (con !!): ${tieneConfig2}`);
```

## 3. Coerción Implícita en la Práctica

La coerción implícita ocurre constantemente en el código JavaScript. Aquí vemos algunos de los casos más comunes.

```javascript
// Ejemplo 4: En sentencias 'if'
const cantidad = 5;
if (cantidad) { // cantidad (5) es truthy
  console.log(`Hay ${cantidad} productos en el carrito.`);
}

const carritoVacio = 0;
if (carritoVacio) { // carritoVacio (0) es falsy
  // Este código no se ejecuta
}

// Ejemplo 5: Con el operador lógico OR (||)
// Se usa para asignar valores por defecto. Devuelve el primer valor 'truthy'.
const perfilUsuario = { profesion: null };
const profesion = perfilUsuario.profesion || "No especificada";
console.log(`Profesión: ${profesion}`); // "No especificada"

// Ejemplo 6: Con el operador lógico AND (&&)
// Se usa para ejecutar algo solo si una condición es 'truthy'.
const puedeEjecutar = true;
puedeEjecutar && console.log("La acción se ha ejecutado.");

const noPuedeEjecutar = false;
noPuedeEjecutar && console.log("Esta acción nunca se ejecutará.");
```

Este conocimiento es fundamental para leer y entender código escrito por otros desarrolladores, ya que estos patrones son extremadamente comunes.
