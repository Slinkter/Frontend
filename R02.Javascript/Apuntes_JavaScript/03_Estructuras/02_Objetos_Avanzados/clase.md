# Clase 02: Objetos Avanzados

## 1. Descriptores de Propiedades

En JavaScript, las propiedades de un objeto no son simples pares clave-valor. Internamente, cada propiedad tiene un conjunto de atributos conocidos como "Property Descriptors" que definen su comportamiento.

Para ver los descriptores: `Object.getOwnPropertyDescriptor(obj, 'prop')`
Para definirlos: `Object.defineProperty(obj, 'prop', { ... })`

### Atributos de Datos

1.  **value:** El valor real de la propiedad.
2.  **writable:** Si `true`, el valor puede cambiarse. Si `false`, es de solo lectura.
3.  **enumerable:** Si `true`, aparece en bucles `for...in` y `Object.keys()`.
4.  **configurable:** Si `true`, se puede borrar la propiedad o modificar sus descriptores. Si `false`, la propiedad está "bloqueada" (no se puede borrar ni reconfigurar, excepto cambiar `writable` de true a false).

### Atributos de Acceso (Accessors)

En lugar de `value` y `writable`, tienen:

1.  **get:** Función que retorna el valor.
2.  **set:** Función que asigna el valor.

## 2. Inmutabilidad de Objetos

JavaScript ofrece métodos para restringir la modificación de objetos.

### 2.1 `Object.preventExtensions(obj)`

- No se pueden añadir nuevas propiedades.
- Se pueden borrar y modificar las existentes.

### 2.2 `Object.seal(obj)` (Sellar)

- Como `preventExtensions` + `configurable: false` para todas las propiedades.
- No se pueden añadir ni borrar propiedades.
- **SÍ** se pueden modificar los valores de las propiedades existentes (si eran `writable`).

### 2.3 `Object.freeze(obj)` (Congelar)

- Nivel máximo de inmutabilidad nativa.
- Como `seal` + `writable: false`.
- El objeto es inmutable (Shallow: solo primer nivel).

## 3. Métodos Estáticos de Object (ES6+)

- `Object.keys(obj)`: Array de claves enumerables.
- `Object.values(obj)`: Array de valores.
- `Object.entries(obj)`: Array de arrays `[clave, valor]`.
- `Object.fromEntries(iterable)`: Inverso de `entries`.
- `Object.assign(target, ...sources)`: Copia propiedades (shallow).
