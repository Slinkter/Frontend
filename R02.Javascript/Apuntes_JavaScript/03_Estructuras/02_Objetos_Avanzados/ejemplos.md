# Ejemplos: Objetos Avanzados

## 1. Definiendo Propiedades (defineProperty)

```javascript
const persona = {};

Object.defineProperty(persona, "nombre", {
  value: "Juan",
  writable: false, // Inmutable
  enumerable: true,
  configurable: false, // No se puede borrar
});

console.log(persona.nombre); // "Juan"
persona.nombre = "Pedro"; // Falla silenciosamente (o error en strict mode)
console.log(persona.nombre); // "Juan"

delete persona.nombre; // false
```

## 2. Getters y Setters

Útiles para validación o propiedades computadas.

```javascript
const usuario = {
  nombre: "Ana",
  apellido: "Perez",

  get nombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  },

  set nombreCompleto(valor) {
    const partes = valor.split(" ");
    this.nombre = partes[0];
    this.apellido = partes[1];
  },
};

console.log(usuario.nombreCompleto); // "Ana Perez"
usuario.nombreCompleto = "Maria Lopez";
console.log(usuario.nombre); // "Maria"
```

## 3. Deep Freeze (Recursivo)

`Object.freeze` es superficial. Si un objeto tiene otro objeto dentro, este último sigue siendo mutable.

```javascript
const config = {
  db: { host: "localhost" },
};

Object.freeze(config);
config.db.host = "127.0.0.1"; // Funciona! (Peligro)
console.log(config.db.host); // "127.0.0.1"

// Tip: Para inmutabilidad real en producción, usar librerías como Immutable.js o Immer,
// o implementar un deepFreeze recursivo.
function deepFreeze(obj) {
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === "object" && obj[prop] !== null) {
      deepFreeze(obj[prop]);
    }
  });
  return Object.freeze(obj);
}
```
