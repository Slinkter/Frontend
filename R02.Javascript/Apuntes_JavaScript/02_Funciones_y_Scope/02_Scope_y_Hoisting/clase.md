# Clase 02: Scope y Hoisting

## 1. Scope (Alcance)

El Scope define la accesibilidad (visibilidad) de las variables, funciones y objetos en alguna parte de tu código durante el tiempo de ejecución. Es fundamental para asegurar el principio de menor privilegio y evitar conflictos de nombres.

### 1.1 Scope Global

Variables declaradas fuera de cualquier función o bloque.

- En navegador: `window`.
- En Node.js: `global`.
- Accesible desde cualquier lugar del código.
- **Mala práctica:** Contaminar el scope global facilita colisiones y dificulta el mantenimiento.

### 1.2 Function Scope

Variables declaradas dentro de una función con `var`, `let` o `const`.

- Solo son accesibles dentro de esa función.
- Cada invocación de función crea un nuevo scope.

### 1.3 Block Scope (ES6)

Introducido con `let` y `const`.

- Variables limitadas al bloque `{}` donde fueron creadas (condicionales, loops).
- `var` **ignora** el scope de bloque (excepto en funciones) y "se fuga" al scope superior.

### 1.4 Lexical Scope (Scope Estático)

JavaScript utiliza un modelo de alcance léxico. Esto significa que el acceso a las variables se determina por la posición de las funciones en el código fuente (tiempo de escritura) y no por cómo se invocan (tiempo de ejecución).

- Una función recordará SIEMPRE el scope donde fue creada, incluso si se ejecuta en otro lugar. Esto es la base de los **Closures**.

## 2. Hoisting (Elevación)

Es el comportamiento por defecto de JS de mover las declaraciones al principio de su scope antes de que se ejecute el código.

### 2.1 Hoisting de Variables

- `var`: Se eleva la declaración `var nombre;` y se inicializa con `undefined`.
- `let` / `const`: Se eleva la declaración, pero entra en la **Temporal Dead Zone (TDZ)**. No tiene valor inicial y acceder a ella lanza error.

### 2.2 Hoisting de Funciones

- **Function Declarations:** Se elevan completas (nombre y cuerpo). Se pueden usar antes de declarar.
- **Function Expressions:** Depende de la variable contenedora (`var` = undefined, `const` = TDZ).
