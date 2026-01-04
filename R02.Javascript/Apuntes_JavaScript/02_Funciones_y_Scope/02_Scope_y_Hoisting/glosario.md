# Glosario: Scope

## L

### Lexical Scope (Alcance Léxico)

Mecanismo donde el alcance de una variable se define por su ubicación en el código fuente y funciones anidadas tienen acceso a las variables declaradas en su alcance exterior.

## S

### Shadowing (Sombreado)

Ocurre cuando una variable declarada en un cierto scope tiene el mismo nombre que una variable definida en un scope exterior. La variable interna oculta temporalmente a la externa dentro de su scope.

### Scope Chain (Cadena de Alcance)

La lista de todos los scopes disponibles para la función que se está ejecutando actualmente. JS busca variables subiendo por esta cadena, desde el scope más interno hacia el global.

## T

### Temporal Dead Zone (TDZ)

Zona temporal muerta. Tiempo desde que se entra al scope de una variable `let` o `const` hasta que esta es inicializada.
