# Módulo 02: Abstracción y Estructuras de Datos

## Tema 2.3: El Objeto en Profundidad y JSON

### Clase: Modelado de Datos Complejos y su Intercambio

En JavaScript, el `Object` es el tipo de dato más fundamental y versátil después de los primitivos. Prácticamente todo en JavaScript es un objeto o se comporta como uno, desde las funciones y arrays hasta las fechas y las expresiones regulares. Los objetos permiten agrupar datos y funcionalidades relacionadas en entidades lógicas, lo que es esencial para el modelado de información compleja en cualquier aplicación. Complementariamente, **JSON (JavaScript Object Notation)** se ha convertido en el estándar de facto para el intercambio de datos entre un cliente y un servidor, debido a su simplicidad y legibilidad, derivando directamente de la sintaxis de objetos de JavaScript.

#### Objetos en JavaScript: Fundamentos

Un objeto es una colección de pares clave-valor (también conocidos como propiedades). Las claves (nombres de las propiedades) son cadenas de texto (o Símbolos), y los valores pueden ser de cualquier tipo de dato, incluyendo otros objetos y funciones.

##### Creación de Objetos

1.  **Literal de Objeto (Object Literal)**: La forma más común y sencilla.
    ```javascript
    const usuario = {
        nombre: "Carlos",
        edad: 30,
        activo: true,
        saludar: function() {
            console.log(`Hola, soy ${this.nombre}`);
        }
    };
    ```
2.  **Constructor `Object()`**: Menos común, pero útil para crear objetos vacíos.
    ```javascript
    const coche = new Object();
    coche.marca = "Toyota";
    coche.modelo = "Corolla";
    ```
3.  **`Object.create()`**: Permite crear un nuevo objeto utilizando un objeto existente como prototipo.
    ```javascript
    const protoUsuario = {
        saludar: function() { console.log("Hola!"); }
    };
    const nuevoUsuario = Object.create(protoUsuario);
    nuevoUsuario.nombre = "Marta";
    nuevoUsuario.saludar(); // Hola!
    ```

##### Acceso y Modificación de Propiedades

*   **Notación de Punto (`.`)**: Cuando la clave de la propiedad es un identificador válido.
    ```javascript
    console.log(usuario.nombre); // Carlos
    usuario.edad = 31;
    ```
*   **Notación de Corchetes (`[]`)**: Cuando la clave de la propiedad es dinámica (ej. una variable) o contiene caracteres especiales.
    ```javascript
    const clave = "activo";
    console.log(usuario[clave]); // true
    usuario["ciudad de residencia"] = "Madrid";
    ```

#### Características Avanzadas de Objetos (ES6+)

1.  **Propiedades Abreviadas (Property Shorthand)**:
    Si el nombre de la propiedad es el mismo que el nombre de la variable que contiene su valor, se puede abreviar.
    ```javascript
    const nombre = "Ana";
    const edad = 25;
    const persona = { nombre, edad }; // Equivalente a { nombre: nombre, edad: edad }
    ```

2.  **Métodos Abreviados (Method Shorthand)**:
    Sintaxis más concisa para definir métodos en objetos literales.
    ```javascript
    const calculadora = {
        sumar(a, b) { return a + b; },
        restar(a, b) { return a - b; }
    };
    ```

3.  **Nombres de Propiedad Calculados (Computed Property Names)**:
    Permite usar una expresión para el nombre de una propiedad al crear un objeto literal.
    ```javascript
    const prefijo = "producto";
    const id = 1;
    const item = {
        [prefijo + id]: "Leche",
        precio: 2.5
    }; // { producto1: "Leche", precio: 2.5 }
    ```

4.  **Desestructuración de Objetos (Object Destructuring)**:
    Permite extraer propiedades de objetos y asignarlas a variables separadas.

    ```javascript
    const { nombre, edad } = usuario;
    console.log(nombre, edad); // Carlos 31

    const { nombre: nombreCompleto, activo } = usuario; // Renombrar propiedades
    console.log(nombreCompleto, activo); // Carlos true

    const { ciudad = "Desconocida" } = usuario; // Valor por defecto
    console.log(ciudad); // Madrid (si existe), o "Desconocida"
    ```

5.  **Spread Operator (`...`) para Objetos (ES2018)**:
    Permite copiar propiedades de un objeto a otro o fusionar objetos.

    ```javascript
    const datosBase = { id: 1, activo: true };
    const detalles = { nombre: "Juan", edad: 25 };
    const usuarioCompleto = { ...datosBase, ...detalles };
    // { id: 1, activo: true, nombre: "Juan", edad: 25 }

    const clonUsuario = { ...usuario }; // Clonación superficial
    ```

##### Métodos Utilitarios de `Object`

*   **`Object.keys(obj)`**: Devuelve un array con los nombres de las propiedades enumerables propias de un objeto.
*   **`Object.values(obj)`**: Devuelve un array con los valores de las propiedades enumerables propias de un objeto.
*   **`Object.entries(obj)`**: Devuelve un array de arrays `[clave, valor]` para cada propiedad enumerable propia de un objeto.

    ```javascript
    const producto = { nombre: "Monitor", precio: 300 };
    console.log(Object.keys(producto));   // ["nombre", "precio"]
    console.log(Object.values(producto)); // ["Monitor", 300]
    console.log(Object.entries(producto));// [["nombre", "Monitor"], ["precio", 300]]
    ```

#### JSON: JavaScript Object Notation

JSON es un formato de texto ligero para el intercambio de datos. Es fácil de leer y escribir para los humanos, y fácil de analizar y generar para las máquinas. Se basa en un subconjunto de la sintaxis de objetos de JavaScript, pero es independiente del lenguaje.

##### Reglas Clave de JSON:

*   Las claves (nombres de propiedades) deben ser **siempre cadenas de texto encerradas en comillas dobles**.
*   Los valores pueden ser `string`, `number`, `boolean`, `null`, `object` (otro objeto JSON) o `array` (otro array JSON).
*   No se permiten funciones, `undefined`, `Date`, `RegExp` ni comentarios.

##### Métodos para Trabajar con JSON

1.  **`JSON.stringify(valor, replacer, space)`**:
    Convierte un valor de JavaScript (objeto o primitivo) a una cadena JSON.
    *   `replacer` (opcional): Una función o array para controlar cómo se transforman o filtran los valores.
    *   `space` (opcional): Un número (para espacios) o una cadena (para tabulaciones) para dar formato a la salida JSON.

    ```javascript
    const datos = { nombre: "Elena", edad: 28, activo: true };
    const jsonString = JSON.stringify(datos);
    console.log(jsonString); // '{"nombre":"Elena","edad":28,"activo":true}'

    const jsonFormateado = JSON.stringify(datos, null, 2); // 2 espacios de indentación
    /*
    {
      "nombre": "Elena",
      "edad": 28,
      "activo": true
    }
    */
    ```

2.  **`JSON.parse(cadenaJSON, reviver)`**:
    Convierte una cadena JSON a un objeto o valor de JavaScript.
    *   `reviver` (opcional): Una función que se llama para cada clave-valor antes de que el objeto final sea devuelto. Útil para transformar los valores durante la lectura (ej. convertir cadenas de fecha a objetos `Date`).

    ```javascript
    const parsedObject = JSON.parse(jsonString);
    console.log(parsedObject.nombre); // Elena
    ```

#### Uso en la Práctica: `localStorage`

Un ejemplo práctico de su código donde `JSON.stringify` y `JSON.parse` son fundamentales es en la persistencia de datos con `localStorage`:

```javascript
// Desde el código fuente
function likedMovieList() {
    const db_local = localStorage.getItem("liked_movies"); // Obtiene la cadena JSON
    const item = JSON.parse(db_local); // Convierte la cadena JSON a objeto JS
    return item ? item : {}; // Si no hay nada, devuelve un objeto vacío
}

function stateLikeMovie(movie) {
    const id = movie.id;
    const list = likedMovieList(); // Obtiene la lista actual como objeto JS
    // Modifica el objeto JS...
    if (list[id]) {
        list[id] = undefined; // o delete list[id]
    } else {
        list[id] = movie;
    }
    // Guarda el objeto JS actualizado como cadena JSON en localStorage
    localStorage.setItem("liked_movies", JSON.stringify(list));
}
```

---

### Ejemplos Ampliados y Corregidos

```javascript
// Ejemplo 1: Creación de objetos con Propiedades Abreviadas y Métodos
console.log("--- Propiedades y Métodos Abreviados ---");
const nombreProducto = "Smartphone";
const precioProducto = 599;

const producto = {
    nombreProducto,      // Equivalente a nombreProducto: nombreProducto
    precioProducto,      // Equivalente a precioProducto: precioProducto
    mostrarInfo() {      // Equivalente a mostrarInfo: function() { ... }
        console.log(`Producto: ${this.nombreProducto}, Precio: $${this.precioProducto}`);
    }
};
producto.mostrarInfo(); // Producto: Smartphone, Precio: $599

// Ejemplo 2: Nombres de Propiedad Calculados
console.log("\n--- Nombres de Propiedad Calculados ---");
const keyDinamica = "marca";
const valorDinamico = "Samsung";

const dispositivo = {
    tipo: "tablet",
    [keyDinamica]: valorDinamico // La clave 'marca' se crea a partir del valor de keyDinamica
};
console.log(dispositivo); // { tipo: 'tablet', marca: 'Samsung' }

// Ejemplo 3: Desestructuración y Spread Operator en Objetos
console.log("\n--- Desestructuración y Spread ---");
const configuracionUsuario = {
    tema: "dark",
    notificaciones: true,
    idioma: "es",
    region: "EU"
};

const { tema, idioma, ...otrasPreferencias } = configuracionUsuario;
console.log(`Tema: ${tema}, Idioma: ${idioma}`); // Tema: dark, Idioma: es
console.log(`Otras preferencias: `, otrasPreferencias); // { notificaciones: true, region: 'EU' }

const configPorDefecto = { tema: "light", fuente: "Arial", tamaño: 14 };
const miConfig = { ...configPorDefecto, ...configuracionUsuario }; // Fusiona objetos, las propiedades duplicadas se sobrescriben con las del último objeto
console.log("Configuración final:", miConfig);
// { tema: 'dark', fuente: 'Arial', tamaño: 14, notificaciones: true, idioma: 'es', region: 'EU' }

// Ejemplo 4: JSON.stringify y JSON.parse
console.log("\n--- JSON.stringify y JSON.parse ---");
const complejo = {
    cadena: "hola",
    numero: 123,
    booleano: true,
    nulo: null,
    arreglo: [1, 2, "tres"],
    objetoAnidado: { a: 1, b: false },
    // funcion: () => console.log("no se stringifica"), // Las funciones se ignoran
    // indefinido: undefined // undefined se ignora
};

const jsonString = JSON.stringify(complejo, null, 2);
console.log("Objeto a JSON:\n", jsonString);

const objetoReconstruido = JSON.parse(jsonString);
console.log("JSON a Objeto JS:", objetoReconstruido);
console.log(objetoReconstruido.cadena); // hola
// console.log(objetoReconstruido.funcion); // undefined
```

---

### Ejercicios de Consolidación

1.  **Ejercicio: Clonación Profunda de Objetos (Limitado)**
    Cree una función `clonarObjeto(obj)` que tome un objeto simple (sin funciones, `undefined`, `Date`, etc.) y devuelva una copia completamente independiente de él. Utilice `JSON.stringify` y `JSON.parse` para lograr una clonación "profunda" limitada.

    ```javascript
    const objetoOriginal = {
        a: 1,
        b: { c: 2, d: [3, 4] },
        e: "texto"
    };

    function clonarObjeto(obj) {
        // Su código aquí
    }

    const objetoClonado = clonarObjeto(objetoOriginal);
    console.log(objetoClonado);
    console.log(objetoClonado === objetoOriginal); // false (deben ser objetos diferentes)
    console.log(objetoClonado.b === objetoOriginal.b); // false (los objetos anidados también deben ser diferentes)

    // Modifique el clon para probar la independencia
    objetoClonado.b.c = 99;
    console.log(objetoOriginal.b.c); // Debe seguir siendo 2
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 1: Clonación Profunda de Objetos (Limitado)

    function clonarObjeto(obj) {
        // Convierte el objeto a una cadena JSON y luego lo vuelve a parsear.
        // Esto rompe todas las referencias y crea un nuevo objeto con nuevas referencias,
        // logrando una clonación profunda para objetos que JSON puede serializar.
        return JSON.parse(JSON.stringify(obj));
    }

    const objetoOriginal = {
        a: 1,
        b: { c: 2, d: [3, 4] },
        e: "texto"
    };

    const objetoClonado = clonarObjeto(objetoOriginal);
    console.log(objetoClonado);
    console.log(objetoClonado === objetoOriginal); // false
    console.log(objetoClonado.b === objetoOriginal.b); // false

    objetoClonado.b.c = 99;
    console.log(objetoOriginal.b.c); // 2
    ```

2.  **Ejercicio: Extracción de Propiedades con Destructuring y Valores por Defecto**
    Cree una función `obtenerDetallesConfiguracion(config)` que reciba un objeto `config`. La función debe extraer las propiedades `tema`, `idioma`, y `fuente` del objeto. Si alguna de estas propiedades no existe, debe usar los siguientes valores por defecto: `tema: "light"`, `idioma: "en"`, `fuente: "sans-serif"`. La función debe devolver un nuevo objeto con estas tres propiedades.

    ```javascript
    const config1 = { tema: "dark", idioma: "es" };
    const config2 = { fuente: "monospace" };
    const config3 = {};

    function obtenerDetallesConfiguracion(config) {
        // Su código aquí
    }

    console.log(obtenerDetallesConfiguracion(config1)); // { tema: "dark", idioma: "es", fuente: "sans-serif" }
    console.log(obtenerDetallesConfiguracion(config2)); // { tema: "light", idioma: "en", fuente: "monospace" }
    console.log(obtenerDetallesConfiguracion(config3)); // { tema: "light", idioma: "en", fuente: "sans-serif" }
    ```

    **Solución Razonada:**
    ```javascript
    // Solución al Ejercicio 2: Extracción de Propiedades con Destructuring y Valores por Defecto

    function obtenerDetallesConfiguracion(config) {
        // Desestructuración con valores por defecto directamente en la firma de la función
        const {
            tema = "light",
            idioma = "en",
            fuente = "sans-serif"
        } = config;

        return { tema, idioma, fuente };
    }

    const config1 = { tema: "dark", idioma: "es" };
    const config2 = { fuente: "monospace" };
    const config3 = {};

    console.log(obtenerDetallesConfiguracion(config1));
    console.log(obtenerDetallesConfiguracion(config2));
    console.log(obtenerDetallesConfiguracion(config3));
    ```

---

### Glosario Técnico

*   **Objeto**: Colección de pares clave-valor; tipo de dato fundamental en JavaScript.
*   **Propiedad**: Un par clave-valor dentro de un objeto.
*   **Clave/Nombre de Propiedad**: Identificador único de una propiedad (generalmente una cadena).
*   **Valor de Propiedad**: El dato asociado a una clave en un objeto.
*   **Literal de Objeto**: Sintaxis `{}` para crear un objeto.
*   **`Object.create()`**: Método para crear un nuevo objeto con un prototipo especificado.
*   **Notación de Punto**: Acceso a propiedades usando `objeto.propiedad`.
*   **Notación de Corchetes**: Acceso a propiedades usando `objeto['propiedad']`. Útil para claves dinámicas.
*   **Propiedades Abreviadas (Property Shorthand)**: Sintaxis concisa para definir propiedades cuando la clave y la variable tienen el mismo nombre.
*   **Métodos Abreviados (Method Shorthand)**: Sintaxis concisa para definir métodos en objetos literales.
*   **Nombres de Propiedad Calculados (Computed Property Names)**: Uso de expresiones para definir nombres de propiedades dinámicamente.
*   **Desestructuración de Objetos**: Extraer propiedades de objetos en variables separadas.
*   **Spread Operator (`...`) para Objetos**: Copiar o fusionar propiedades de objetos.
*   **`Object.keys()`**: Devuelve un array con las claves de un objeto.
*   **`Object.values()`**: Devuelve un array con los valores de un objeto.
*   **`Object.entries()`**: Devuelve un array de pares `[clave, valor]` de un objeto.
*   **JSON (JavaScript Object Notation)**: Formato de texto para el intercambio de datos basado en la sintaxis de objetos de JavaScript.
*   **`JSON.stringify()`**: Convierte un valor JavaScript a una cadena JSON.
*   **`JSON.parse()`**: Convierte una cadena JSON a un objeto JavaScript.
*   **`localStorage`**: Almacenamiento persistente de pares clave-valor en el navegador.
*   **Clonación Profunda**: Crear una copia de un objeto donde todos los objetos anidados también son copias independientes, no referencias. `JSON.parse(JSON.stringify(obj))` es una forma limitada.
