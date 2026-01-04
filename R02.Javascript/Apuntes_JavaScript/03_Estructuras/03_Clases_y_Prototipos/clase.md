# Clase 03: Clases y Prototipos

## 1. Prototipos: El corazón de JS

JavaScript es un lenguaje basado en prototipos, no en clases (aunque la sintaxis moderna nos haga pensar lo contrario).

### 1.1 `prototype` vs `__proto__`

- `Constuctor.prototype`: Es un objeto que servirá de modelo para las nuevas instancias creadas con `new Constructor()`. Solo existe en funciones.
- `obj.__proto__`: (O `Object.getPrototypeOf(obj)`). Es el enlace real en cada objeto que apunta a su prototipo.

### 1.2 La Cadena de Prototipos (Prototype Chain)

Cuando intentas acceder a `obj.propiedad`:

1.  JS busca en el objeto mismo (`own property`).
2.  Si no está, busca en `obj.__proto__`.
3.  Si no está, busca en `obj.__proto__.__proto__`.
4.  Así sucesivamente hasta llegar a `Object.prototype.__proto__` que es `null`.

## 2. Clases (ES6)

Las clases son "Sugar Syntax" sobre la herencia prototípica. Hacen el código más legible y orientado a objetos de estilo clásico, pero por debajo sigue funcionando igual.

### Sintaxis

- **constructor:** Método especial para inicializar.
- **Métodos:** Se definen en el prototipo automáticamente.
- **Static:** Métodos que pertenecen a la clase, no a la instancia (utilidades).
- **Extends:** Herencia.
- **Super:** Llama al constructor o métodos de la clase padre.

## 3. Pilares de la POO en JS

### 3.1 Herencia

Usando `extends` o asignando `prototype` manualmente (antiguo).

### 3.2 Polimorfismo

Sobreescribir métodos del padre en la clase hija.

### 3.3 Encapsulamiento

Simulado con `_convencion` o usando campos privados reales `#campoPrivado` (ES2022).

### 3.4 Abstracción

Ocultar complejidad a través de métodos simples.
