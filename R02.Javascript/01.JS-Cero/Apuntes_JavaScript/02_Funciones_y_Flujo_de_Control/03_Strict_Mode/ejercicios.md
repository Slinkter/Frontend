# Ejercicios Propuestos: Strict Mode

## Ejercicio 1: Depuración de un Objeto

**Objetivo:** Comprender cómo el modo estricto revela errores silenciosos al manipular objetos.

**Instrucciones:**
1.  Analiza el siguiente código. Está diseñado para actualizar un objeto de usuario.
2.  Sin ejecutarlo, predice qué sucederá en modo no estricto.
3.  Activa el modo estricto (`"use strict";`) al principio de la función.
4.  Explica los errores que aparecen y cómo el modo estricto te ayudó a identificarlos.

```javascript
function actualizarUsuario(usuario) {
  // "use strict"; // Descomenta esta línea

  // Intento 1: Asignar una nueva propiedad a un objeto congelado
  Object.freeze(usuario);
  try {
    usuario.ultimaConexion = new Date();
  } catch (e) {
    console.error("Error en Intento 1:", e.message);
  }


  // Intento 2: Crear una variable global accidentalmente
  try {
    nombreCompleto = `${usuario.nombre} ${usuario.apellido}`;
  } catch (e) {
    console.error("Error en Intento 2:", e.message);
  }


  // Intento 3: Eliminar una propiedad no configurable
  try {
    delete usuario.nombre;
  } catch (e) {
    console.error("Error en Intento 3:", e.message);
  }

  return nombreCompleto;
}

const usuario = { nombre: 'Juan', apellido: 'Perez' };
Object.defineProperty(usuario, 'nombre', { configurable: false });

actualizarUsuario(usuario);
```

<details>
<summary>Solución Razonada</summary>

### Comportamiento sin Modo Estricto

1.  **Intento 1:** `usuario.ultimaConexion = new Date();` falla silenciosamente. `Object.freeze()` previene nuevas propiedades, pero en modo no estricto, el intento de asignación simplemente no hace nada, sin lanzar un error. No se imprime nada en la consola.
2.  **Intento 2:** `nombreCompleto = ...` crea una variable global `window.nombreCompleto`. Esto es una "fuga" de variables y una mala práctica, pero no lanza un error. La función devuelve el nombre completo correctamente.
3.  **Intento 3:** `delete usuario.nombre;` falla silenciosamente. La propiedad `nombre` fue definida como no configurable, por lo que no se puede eliminar. El `delete` devuelve `false`, pero no lanza un error.

El código se ejecuta "sin problemas", pero con dos errores lógicos ocultos y una mala práctica.

### Comportamiento con `"use strict";`

Al descomentar `"use strict";`, el comportamiento cambia drásticamente:

1.  **Error en Intento 1:** `TypeError: Cannot add property ultimaConexion, object is not extensible`. El modo estricto convierte el fallo silencioso en un error explícito. Ahora sabemos exactamente por qué la propiedad no se pudo añadir.

2.  **Error en Intento 2:** `ReferenceError: nombreCompleto is not defined`. El modo estricto prohíbe las variables globales accidentales. Nos obliga a declarar la variable correctamente con `let`, `const` o `var`. La solución sería `const nombreCompleto = ...`.

3.  **Error en Intento 3:** `TypeError: Cannot delete property 'nombre' of #<Object>`. De nuevo, el modo estricto nos informa explícitamente que no podemos eliminar una propiedad no configurable, en lugar de fallar silenciosamente.

**Conclusión:**
El modo estricto actuó como una herramienta de depuración indispensable. Reveló tres problemas críticos que en el modo normal habrían pasado desapercibidos, llevando a un comportamiento impredecible de la aplicación y a la contaminación del scope global. Obliga a escribir un código más correcto y robusto desde el principio.
</details>

---

## Ejercicio 2: `this` y Contexto

**Objetivo:** Demostrar cómo el modo estricto previene la "contaminación" del objeto global a través de `this`.

**Instrucciones:**
La siguiente función `setNombreGlobal` fue escrita con la intención de modificar una propiedad de un objeto. Sin embargo, si se llama incorrectamente, puede crear una variable global.
1.  Llama a la función de la manera incorrecta (como una función simple, no como un método de un objeto).
2.  Observa lo que sucede en modo no estricto.
3.  Activa el modo estricto dentro de la función y explica por qué se produce un error y cómo esto protege el código.

```javascript
function setNombre(nuevoNombre) {
  // "use strict"; // Descomenta esta línea

  // El autor de esta función esperaba que 'this' fuera siempre un objeto 'persona'.
  this.nombre = nuevoNombre;
}

const persona = { nombre: 'Ana', setNombre: setNombre };

// Llamada correcta: 'this' es 'persona'
persona.setNombre('Isabel');
console.log(persona.nombre); // "Isabel"

// Llamada incorrecta: 'this' es el objeto global (window) en modo no estricto.
setNombre('Mundo'); // ¿Qué pasa aquí?

// ¿Qué imprime esto en modo no estricto?
console.log(window.nombre);

// ¿Qué error se produce en modo estricto y por qué?
```

<details>
<summary>Solución Razonada</summary>

### Comportamiento sin Modo Estricto

1.  `persona.setNombre('Isabel');` funciona como se espera. `this` dentro de `setNombre` se refiere al objeto `persona`, por lo que `persona.nombre` se actualiza a `"Isabel"`.
2.  `setNombre('Mundo');` es la llamada problemática. Como no se proporciona un contexto de objeto, `this` dentro de la función apunta por defecto al objeto global (`window`). La línea `this.nombre = nuevoNombre;` se convierte en `window.nombre = 'Mundo';`.
3.  `console.log(window.nombre);` imprime `"Mundo"`. Se ha contaminado el scope global sin querer.

### Comportamiento con `"use strict";`

Al activar el modo estricto dentro de la función `setNombre`:

1.  La llamada correcta (`persona.setNombre(...)`) sigue funcionando igual, porque `this` está correctamente enlazado al objeto `persona`.
2.  En la llamada incorrecta (`setNombre('Mundo');`), el comportamiento de `this` cambia. En modo estricto, cuando una función se llama sin un contexto explícito, `this` es `undefined`.
3.  La línea `this.nombre = nuevoNombre;` intenta ejecutar `undefined.nombre = 'Mundo';`. Esto inmediatamente lanza un `TypeError: Cannot set properties of undefined (setting 'nombre')`.

**Conclusión:**
El modo estricto previene la contaminación del scope global al cambiar el valor por defecto de `this` de `window` a `undefined`. El `TypeError` que se genera nos alerta inmediatamente de que estamos llamando a la función de una manera que su autor probablemente no previó, permitiéndonos corregir el error en lugar de dejar que cause efectos secundarios impredecibles en el estado global de la aplicación.
</details>
