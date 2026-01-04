# Clase 03: Control de Flujo y Ciclos

## 1. Estructuras Condicionales

Permiten ejecutar bloques de código distintos basándose en condiciones booleanas.

### 1.1 If, Else If, Else

Es la estructura fundamental.

- Se recomienda evitar el anidamiento excesivo ("Callback Hell" o "Arrow Code").
- Usar **Early Return** es una buena práctica para reducir la complejidad ciclomática.

### 1.2 Switch

Útil para múltiples condiciones sobre una misma variable.

- Usa comparación estricta (`===`).
- Importante usar `break` para evitar el "Fallthrough" (ejecución en cascada), a menos que sea intencional.

### 1.3 Operador Ternario

`condicion ? verdadero : falso`. Ideal para asignaciones simples. No abusar para lógica compleja.

## 2. Ciclos (Bucles)

Estructuras para repetir código.

### 2.1 Ciclos Clásicos

- **For:** Control preciso con contador. `for (init; condition; update)`.
- **While:** Repite mientras la condición sea true. Riesgo de loops infinitos si no se actualiza la condición.
- **Do...While:** Similar a While, pero garantiza al menos una ejecución.

### 2.2 Ciclos de Iteración (ES6+)

- **For...of:** Itera sobre valores iterables (Arrays, Strings, Maps, Sets). Es más moderno y legible que el `for` clásico para recorrer datos.
- **For...in:** Itera sobre las **propiedades enumerables** de un objeto (incluyendo las heredadas de la cadena de prototipos). **No recomendado para Arrays**.

## 3. Manejo de Errores (Try / Catch)

Permite manejar errores en tiempo de ejecución de forma graciosa para evitar que la aplicación colapse.

```javascript
try {
  // Código susceptible a fallar
  throw new Error("Algo salió mal"); // Lanzar error manual
} catch (error) {
  // Manejo del error
  console.error(error.message);
} finally {
  // Se ejecuta SIEMPRE, haya error o no.
  // Útil para limpieza de recursos (cerrar archivos, conexiones).
}
```

## 4. Break y Continue

- **Break:** Termina el bucle inmediatamente.
- **Continue:** Salta la iteración actual y pasa a la siguiente.
