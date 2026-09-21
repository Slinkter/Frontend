# Apuntes 🚀

## Variables y operaciones

### 1️⃣ Responde las siguientes preguntas en la sección de comentarios:

-   ¿Qué es una variable y para qué sirve?

    Es un espacio reservado en memoria que nos permite almacenar información. Podemos almacenar diferentes tipos de datos para usarlos en nuestro código. En JS existe tres formas de crear una variable var, let, const. en ES6 nacen let & const que son variable de tipo scope y esto quiere decir que dependiendo del scope es su accesibilidad.

-   ¿Cuál es la diferencia entre declarar e inicializar una variable?

    Cuando declaramos una variable, simplemente nombramos la variable, sin indicarle que tipo de información o dato almacenara. En cambio, cuando inicializamos una variable indicamos el tipo de dato e información que va a almacenar.
    Ejemplo:

    ```jsx
    //Declarar una variable
    let nombre;
    //Inicializar la variable
    nombre = "Camilo";
    //Podemos generar este proceso en una sola linea de codigo.
    let nombre = "Camilo";
    ```

-   ¿Cuál es la diferencia entre sumar números y concatenar strings?

    Al momento sumar números estamos realizando una operación matemática con dos tipos de datos (Numbers) mientras que al concatenar estamos sumando dos tipos de datos (String) que son cadena de textos.

-   ¿Cuál operador me permite sumar o concatenar?

    El operador utilizado es el signo +

### 2️⃣ Determina el nombre y tipo de dato para almacenar en variables la siguiente información:

-   Nombre --> “String”
-   Apellido --> “String”
-   Nombre de usuario en Platzi --> “String”
-   Edad --> “Number”
-   Correo electrónico --> “String”
-   Mayor de edad --> “Boolean”
-   Dinero ahorrado --> “Number”
-   Deudas --> “Number”

### 3️⃣ Traduce a código JavaScript las variables del ejemplo anterior y deja tu código en los comentarios.

```jsx
let name = "Liam";
let lastName = "cave";
let user_name = "licave";
let age = 30;
let mail = "liamcave@gmail.com";
let adult = true;
let savedMoney = 09;
let debtMoney = 99;
```

### 4️⃣ Calcula e imprime las siguientes variables a partir de las variables del ejemplo anterior:

-   Nombre completo (nombre y apellido)

```jsx
//Nombre completo
let name = "liam";
let lastName = "cave";

console.log(`Mi nombre completo es ${name} ${lastName}`);
```

-   Dinero real (dinero ahorrado menos deudas)

```jsx
//Dinero ahorrado
let savedMoney = 99;
let debtMoney = 9;
let totalMoney = savedMoney - debtMoney;
console.log(`El total de mi dinero actual es: $${totalMoney`});
```

## Funciones

### 1️⃣ Responde las siguientes preguntas en la sección de comentarios:

-   ¿Qué es una función?

    Es un conjunto de acciones que nos permitirá reutilizar en nuestro código y siempre deben devolver un resultado. Podemos crear diferentes funciones con parámetros distintos y luego utilizar la información para realizar un evento o acción dentro de nuestro código.

-   ¿Cuándo me sirve usar una función en mi código?

    Cuando necesitamos repetir una acción en nuestro código, en vez de escribir una suma, por ejemplo en cada línea, podemos crear una función que nos permita sumar elementos cada vez que lo necesitemos y solo cambiamos sus parámetros.

-   ¿Cuál es la diferencia entre parámetros y argumentos de una función?

    Los parámetros son las variables declaras y solicitadas en nuestra función, al momento de realizar el llamado de nuestra funciones nos exigirá declarar nuestras variables que vendrían a ser nuestros argumentos de la función.

    ```jsx
    function myFunction(parámetro1 + parámetro2) {
      //... All my code here
    }

    myFunction(argumento + argumento2);
    /* al invocar la funcion se inserta los argumentos  en el espacio de los parametros respectivos.*/

    ```

### 2️⃣ Convierte el siguiente código en una función, pero, cambiando cuando sea necesario las variables constantes por parámetros y argumentos en una función:

```jsx
const name = "Liam";
const lastname = "Cave";
const completeName = name + lastname;
const nickname = "Slinkter";

console.log(
    "Mi nombre es " +
        completeName +
        ", pero prefiero que me digas " +
        nickname +
        "."
);

//My solution
function presentation(name, lastName, nickName) {
    return console.log(
        `Mi nombre completo es ${name} ${lastName}, pero prefiero que me digas ${nickName}.`
    );
}

presentation("Liam ", "cave", "Slinker");
```

## Condicionales

### 1️⃣ Responde las siguientes preguntas en la sección de comentarios:

-   ¿Qué es un condicional?
    Es una expresión que nos permite evaluar si es True o False.
-   ¿Qué tipos de condicionales existen en JavaScript y cuáles son sus diferencias?
    -   If..else
    -   Switch
        Con el condicional If…Else podemos tener diferentes expresiones para evaluar dependiente del caso, y generar tantos If o else como sea necesario. Mientras que Switch case toma una sola expresión de entrada pero puede evaluar todos los casos como sea necesario de una forma más ordenada.
-   ¿Puedo combinar funciones y condicionales?
    Podemos encadenar una respusta desde un condional a otro pero no podemos combinarlo dentro de una misma expresión. Si podemos ocuparlos de forma separada y luego encadenar una acción dependiendo del resultado.

### 2️⃣ Replica el comportamiento del siguiente código que usa la sentencia switch utilizando if, else y else if:

```jsx
const tipoDeSuscripcion = "Basic";

switch (tipoDeSuscripcion) {
    case "Free":
        console.log("Solo puedes tomar los cursos gratis");
        break;
    case "Basic":
        console.log(
            "Puedes tomar casi todos los cursos de Platzi durante un mes"
        );
        break;
    case "Expert":
        console.log(
            "Puedes tomar casi todos los cursos de Platzi durante un año"
        );
        break;
    case "ExpertPlus":
        console.log(
            "Tú y alguien más pueden tomar TODOS los cursos de Platzi durante un año"
        );
        break;
}

//My solution
const tipoDeSuscripcion = "Basic";

if (tipoDeSuscripcion == "Free") {
    console.log("Solo puedes tomar los cursos gratis");
} else if (tipoDeSuscripcion == "Basic") {
    console.log("Puedes tomar casi todos los cursos de Platzi durante un mes");
} else if (tipoDeSuscripcion == "Expert") {
    console.log("Puedes tomar casi todos los cursos de Platzi durante un año");
} else if (tipoDeSuscripcion == "ExpertPlus") {
    console.log(
        "Tú y alguien más pueden tomar TODOS los cursos de Platzi durante un año"
    );
} else {
    console.log("No tienes ninguna suscripción");
}
```

### 3️⃣ Replica el comportamiento de tu condicional anterior con if, else y else if, pero ahora solo con if (sin else ni else if).

> 💡 Bonus: si ya eres una experta o experto en el lenguaje, te desafío a comentar cómo replicar este comportamiento con arrays u objetos y un solo condicional. 😏

```jsx
let typeSuscripción = ["Free", "Basic", "Expert", "ExpertPlus"];

let infoSuscripción = [
    "solo puedes tomar los cursos gratis",
    "puedes tomar casi todos los cursos de Platzi durante un mes",
    "puedes tomar casi todos los cursos de Platzi durante un año",
    "tú y alguien más pueden tomar TODOS los cursos de Platzi durante un año",
];

let userSuscription = "Expert";

for (let i = 0; i < typeSuscripción.length; i++) {
    if (userSuscription == typeSuscripción[i]) {
        console.log(
            `Si estas suscrito al plan ${typeSuscripción[i]} en el cual ${infoSuscripción[i]}`
        );
    }
}
```

## Ciclos

### 1️⃣ Responde las siguientes preguntas en la sección de comentarios:

-   ¿Qué es un ciclo?
    Un ciclo es un bucle que se repite hasta que se cumpla una condición.
-   ¿Qué tipos de ciclos existen en JavaScript?
    Ciclo For, While, etc.
-   ¿Qué es un ciclo infinito y por qué es un problema?
    Un ciclo infinito es cuando la condición es infinita, nunca se cumple y, por lo tanto, no existe termino al proceso, por consecuencia nuestro código puede fallar y ralentizar nuestras computadoras.
-   ¿Puedo mezclar ciclos y condicionales?
    Sí, podemos condicionar un ciclo para que se repita todas las veces hasta que se cumplan una condición que internamente puede tener otra condición para su evaluación.

### 2️⃣ Replica el comportamiento de los siguientes ciclos for utilizando ciclos while:

```jsx
for (let i = 0; i < 5; i++) {
    console.log("El valor de i es: " + i);
}

for (let i = 10; i >= 2; i--) {
    console.log("El valor de i es: " + i);
}

//My Solution
let i = 0;
while (i < 5) {
    i++;
    console.log(`El valor de i es: ${i}`);
}

let i = 10;

while (i >= 2) {
    i--;
    console.log(`El valor de i es: ${i}`);
}
```

### 3️⃣ Escribe un código en JavaScript que le pregunte a los usuarios cuánto es `2 + 2`. Si responden bien, mostramos un mensaje de felicitaciones, pero si responden mal, volvemos a empezar.

> 💡 Pista: puedes usar la función prompt de JavaScript.

```jsx
//Basic Math Quiz
let num = 10;
let num2 = 10;
const result = num + num2;

let questions = {
    q1: `Cuanto es ${num} + ${num2}`,
};

function Quizzer() {
    let userInput = prompt(questions.q1);

    if (userInput == result) {
        alert("Felicitaciones, respondiste correctamente el desafio 😎");
    } else {
        alert(
            "lamentablemente, tu respuesta es incorrecta, sigue practicando ❌!"
        );
    }
}

Quizzer();
```

## Listas

### 1️⃣ Responde las siguientes preguntas en la sección de comentarios:

-   ¿Qué es un array?
    Un array es una colecciones de elementos con valores de una sola variable. Se escriben dentro de [ … ], separado por una coma.
-   ¿Qué es un objeto?
    Es una colección de datos relacionados con múltiples variables con sus valores.
-   ¿Cuándo es mejor usar objetos o arrays?
    Ocupamos objetos cuando el conjunto de elementos es muy grande y de distintos tipos de valores.
-   ¿Puedo mezclar arrays con objetos o incluso objetos con arrays?

### 2️⃣ Crea una función que pueda recibir cualquier array como parámetro e imprima su primer elemento.

```jsx
let myArray = [
    "Manchester",
    "London",
    "Liverpool",
    "Birmingham",
    "Leeds",
    "Carlisle",
];

function readArray(array) {
    console.log(array[0]);
}

readArray(myArray);
```

### 3️⃣ Crea una función que pueda recibir cualquier array como parámetro e imprima todos sus elementos uno por uno (no se vale imprimir el array completo).

```javascript
let myArray = [
    "Manchester",
    "London",
    "Liverpool",
    "Birmingham",
    "Leeds",
    "Carlisle",
];

function printAllElements(array) {
    // Usar for...of es más moderno y legible para iterar elementos
    for (const element of array) {
        console.log(element);
    }
}

printAllElements(myArray);
```

### 4️⃣ Crea una función que pueda recibir cualquier objeto como parámetro e imprima todos sus elementos uno por uno (no se vale imprimir el objeto completo).

```jsx
let myCar = {
    make: "Ford",
    model: "Mustang",
    year: 1969,
};

function readObject(object) {
    for (let key in object) {
        console.log(object[key]);
    }
}

readObject(myCar);
```
