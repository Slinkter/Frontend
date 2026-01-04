# Clase 02: Async / Await

Introducido en ES2017 (ES8), `async` y `await` son "azúcar sintáctico" sobre las Promesas. Permiten escribir código asíncrono que "parece" síncrono, mejorando drásticamente la legibilidad.

## 1. Funcionamiento

### 1.1 `async` function

- Declara que una función es asíncrona.
- **SIEMPRE** retorna una Promesa.
  - Si retornas un valor directo, la Promesa se resuelve con ese valor.
  - Si lanzas un error, la Promesa se rechaza.

### 1.2 `await`

- Solo se puede usar dentro de funciones `async` (o en top-level modules).
- **Pausa** la ejecución de la función `async` hasta que la Promesa esperada se resuelva.
- Si la promesa se resuelve, retorna el valor.
- Si se rechaza, lanza una excepción (que se debe atrapar con `try/catch`).

## 2. Manejo de Errores

A diferencia de `.catch()`, con async/await usamos el bloque estándar `try...catch` de JavaScript.

```javascript
async function getData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error capturado:", error);
  }
}
```

## 3. Paralelismo vs Secuencialidad

Un error común es hacer todo secuencial (`await` tras `await`) cuando las operaciones son independientes.

- **Secuencial (Más lento):**

  ```javascript
  const a = await getA(); // Espera...
  const b = await getB(); // Espera...
  ```

- **Paralelo (Más rápido):**
  ```javascript
  const [a, b] = await Promise.all([getA(), getB()]); // Esperan juntas
  ```
