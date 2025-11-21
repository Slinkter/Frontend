# Apuntes de JavaScript: De Cero a Experto

Este repositorio contiene una reestructuración completa de apuntes de JavaScript, organizados de manera pedagógica y progresiva. El contenido ha sido curado, expandido y explicado siguiendo un nivel académico de postgrado, enfocado en la ingeniería de software y las buenas prácticas.

## Índice del Curso

### [Módulo 1: Fundamentos](./01_Fundamentos/)
La base sólida sobre la que se construye todo el conocimiento de JavaScript.

1.  **[Variables y Tipos de Datos](./01_Fundamentos/01_Variables_y_Tipos_de_Datos/)**
    -   `clase.md`: Gestión de estado, `let`/`const` vs `var`, primitivos vs objetos.
    -   `ejemplos.md`: Diferencia entre paso por valor y por referencia.
    -   `ejercicios.md`: Análisis de scope y mutabilidad.
    -   `glosario.md`: Definiciones de variable, tipo de dato, inmutabilidad.

2.  **[Operadores](./01_Fundamentos/02_Operadores/)**
    -   `clase.md`: El dilema de `==` vs `===`, cortocircuito y el operador ternario.
    -   `ejemplos.md`: Casos prácticos de `&&` y `||` para valores por defecto y ejecución condicional.
    -   `ejercicios.md`: Refactorización con operadores lógicos.
    -   `glosario.md`: Definiciones de operadores aritméticos, lógicos y de comparación.

3.  **[Strings y Numbers](./01_Fundamentos/03_Strings_y_Numbers/)**
    -   `clase.md`: Inmutabilidad de strings, plantillas literales, precisión de `number` y `NaN`.
    -   `ejemplos.md`: Manipulación de texto y formateo de números.
    -   `ejercicios.md`: Formateador de nombres de archivo y calculadora de propinas.
    -   `glosario.md`: Definiciones de `toFixed`, `parseInt`, `NaN`.

4.  **[Boolean y Conversión de Tipos](./01_Fundamentos/04_Boolean_y_Conversion_de_Tipos/)**
    -   `clase.md`: El concepto de "Truthy" y "Falsy", coerción implícita vs. conversión explícita.
    -   `ejemplos.md`: Identificación de valores "truthy" y "falsy", uso de `Boolean()` y `!!`.
    -   `ejercicios.md`: Depuración de funciones y limpieza de arrays.
    -   `glosario.md`: Definiciones de "truthy", "falsy", coerción.

### [Módulo 2: Funciones y Flujo de Control](./02_Funciones_y_Flujo_de_Control/)
El pilar de la reutilización y estructuración de código en JavaScript.

1.  **[Funciones](./02_Funciones_y_Flujo_de_Control/01_Funciones/)**
    -   `clase.md`: Las funciones como objetos de primera clase, declaración vs. expresión.
    -   `ejemplos.md`: Callbacks, funciones de orden superior y parámetros por defecto.
    -   `ejercicios.md`: Refactorización a funciones de flecha y creación de funciones de orden superior.
    -   `glosario.md`: Definiciones de callback, IIFE, hoisting.

2.  **[Scope y Hoisting](./02_Funciones_y_Flujo_de_Control/02_Scope_y_Hoisting/)**
    -   `clase.md`: Ámbito léxico, la evolución de scope de función a scope de bloque (`let`/`const`).
    -   `ejemplos.md`: La Zona Muerta Temporal (TDZ) y diferencias prácticas entre `var` y `let`.
    -   `ejercicios.md`: Predicción de salida y el clásico problema del bucle con `setTimeout`.
    -   `glosario.md`: Definiciones de scope global, de bloque, cadena de scopes.

3.  **[Strict Mode](./02_Funciones_y_Flujo_de_Control/03_Strict_Mode/)**
    -   `clase.md`: Hacia un JavaScript más seguro, prevención de errores silenciosos.
    -   `ejemplos.md`: Prevenir variables globales accidentales, el comportamiento de `this`.
    -   `ejercicios.md`: Depuración de objetos y prevención de contaminación del scope global.
    -   `glosario.md`: Definiciones de `"use strict";`, error silencioso.

### [Módulo 3: Estructuras de Datos Complejas](./03_Estructuras_de_Datos_Complejas/)
Cómo modelar y manipular datos de forma eficiente.

1.  **[Arrays](./03_Estructuras_de_Datos_Complejas/01_Arrays/)**
    -   `clase.md`: El paradigma mutable vs. inmutable, el operador de propagación.
    -   `ejemplos.md`: Métodos mutables (`push`, `splice`) vs. inmutables (`map`, `filter`).
    -   `ejercicios.md`: Eliminación inmutable y agregación de datos.
    -   `glosario.md`: Definiciones de métodos mutables e inmutables, copia superficial.

2.  **[Métodos de Arrays](./03_Estructuras_de_Datos_Complejas/02_Metodos_de_Arrays/)**
    -   `clase.md`: `map`, `filter` y `reduce` como pilares de la transformación de datos.
    -   `ejemplos.md`: Casos prácticos de `find`, `some`, `every` y `sort`.
    -   `ejercicios.md`: Aplanamiento de datos con `flatMap` y validación de datos.
    -   `glosario.md`: Definiciones de `find`, `some`, `every`, `flatMap`.

3.  **[Objetos Avanzados](./03_Estructuras_de_Datos_Complejas/03_Objetos_Avanzados/)**
    -   `clase.md`: Mejoras de literales de ES6, desestructuración y el patrón de inmutabilidad con `spread`.
    -   `ejemplos.md`: Desestructuración anidada y en parámetros, uso del operador `rest`.
    -   `ejercicios.md`: Fusión de configuraciones e inversión de objetos.
    -   `glosario.md`: Definiciones de desestructuración, `spread` vs `rest`, `Object.keys/values/entries`.

### [Módulo 4: Asincronismo y Conceptos Avanzados](./04_Asincronismo_y_Conceptos_Avanzados/)
Dominando el modelo de concurrencia de JavaScript.

1.  **[Closures](./04_Asincronismo_y_Conceptos_Avanzados/01_Closures/)**
    -   `clase.md`: La memoria persistente de las funciones, estado privado y encapsulamiento.
    -   `ejemplos.md`: Patrón módulo, currificación y el problema del bucle con `var`.
    -   `ejercicios.md`: Creación de loggers con contexto y gestores con estado privado.
    -   `glosario.md`: Definiciones de closure, ámbito léxico, variable libre.

2.  **[Callbacks](./04_Asincronismo_y_Conceptos_Avanzados/02_Callbacks/)**
    -   `clase.md`: El modelo de concurrencia y el Event Loop. El problema del "Callback Hell".
    -   `ejemplos.md`: Callbacks síncronos y asíncronos, la convención "error-first".
    -   `ejercicios.md`: Creación de una función de orden superior y refactorización de un "Callback Hell".
    -   `glosario.md`: Definiciones de asincronía, Event Loop, Callback Hell.

3.  **[Promises](./04_Asincronismo_y_Conceptos_Avanzados/03_Promises/)**
    -   `clase.md`: Un nuevo contrato para la asincronía, el poder del encadenamiento.
    -   `ejemplos.md`: Encadenamiento, `Promise.all` y `Promise.allSettled`.
    -   `ejercicios.md`: "Promisificar" una función con callback y orquestación con `Promise.all`.
    -   `glosario.md`: Estados de una promesa, `.then`, `.catch`, `.finally`.

4.  **[Async/Await](./04_Asincronismo_y_Conceptos_Avanzados/04_Async_Await/)**
    -   `clase.md`: Azúcar sintáctico sobre promesas. Ejecución secuencial vs. paralela.
    -   `ejemplos.md`: Refactorización de `.then()` a `async/await`, manejo de errores con `try...catch`.
    -   `ejercicios.md`: Refactorización de cadenas de promesas y ejecución paralela.
    -   `glosario.md`: Definiciones de `async`, `await`, `try...catch`, Top-Level Await.

### [Módulo 5: JavaScript en el Navegador y ES Modules](./05_JavaScript_en_el_Navegador_y_ES_Modules/)
Aplicando JavaScript en su entorno principal.

1.  **[DOM (Document Object Model)](./05_JavaScript_en_el_Navegador_y_ES_Modules/01_DOM/)**
    -   `clase.md`: El DOM como API, selección y manipulación de nodos, delegación de eventos.
    -   `ejemplos.md`: Ejemplos interactivos de selección, modificación, creación y eventos.
    -   `ejercicios.md`: Creación de una To-Do list y una ventana modal.
    -   `glosario.md`: Definiciones de nodo, elemento, `querySelector`, `addEventListener`.

2.  **[Módulos (ESM)](./05_JavaScript_en_el_Navegador_y_ES_Modules/02_Modulos_ESM/)**
    -   `clase.md`: El fin del scope global, `import`/`export`, importaciones dinámicas.
    -   `ejemplos.md`: Ejemplo multi-archivo de importaciones nombradas, por defecto y de namespace.
    -   `ejercicios.md`: Refactorización a módulos y carga condicional con `import()`.
    -   `glosario.md`: Definiciones de módulo, `import`, `export`, `type="module"`, tree shaking.
