## Clase 01

JavaScript es un lenguaje de programación dinámico que tiene la capacidad de ser utilizado en muchos dispositivos diferentes. Puede usarse en ordenadores personales, servidores web y teléfonos inteligentes. Es un lenguaje interpretado, orientado a objetos, débilmente tipado y dinámico.

Esta aplicación se emplea comúnmente para el desarrollo web front-end y más recientemente para algunos desarrollos back-end a través de frameworks como Node.Js. o Next.Js. Tiene características como la programación orientada a objetos, funciones y herencia basada en prototipos.

### ¿Cómo nace Javascript?

Nace con la necesidad de generar dinamismo en las páginas web y que a su vez los usuarios y las empresas pudieran interactuar unos con otros. Fue creado por Brendan Eich en 1995 y se convirtió en un estándar oficial del World Wide Web Consortium (W3C) en 1997.

### ¿Por qué decimos que Javascript es un lenguaje dinámico?

Corre directamente en la etapa de Runtime, sin una etapa de compilación previa. Esto permite probar nuestro código inmediatamente; pero también es lo que hace que los errores no se muestren sino hasta que se ejecuta el programa. Lo que se ve a primera vista, cuando se analiza el código, es muy probable que no sea lo que se va a obtener cuando el programa se ejecute.

JavaScript permite declarar (por ejemplo) variables cuyo valor (y tipo) solo se conocerá al momento de su ejecución en función de las condiciones dadas al momento de correrlo en un entorno real. En cambio, los lenguajes estáticos no compilarán en código ejecutable a menos que todos los valores (o tipos de valores) se conozcan por adelantado.

### ¿Por qué es débilmente tipado?

Porque los tipos de datos no están bien definidos en el lenguaje y permite, por ejemplo, operaciones entre numerosos y letras. Esto sucede porque el lenguaje asume tipos de datos que no necesariamente fueron los que se querían representar. Se pueden hacer operaciones entre tipos distintos de datos (enteros con strings, booleanos con enteros, etc.). Ejemplo:

```
4 + "7"; // 47
4 * "7"; // 28
2 + true; // 3
false - 3; // -3
```

### ¿Realmente es Javascript un lenguaje interpretado?

Sí, y la razón es que el navegador lee línea por línea nuestro código, el cual le indica lo que tiene que ir haciendo, sin la necesidad de compilar. Todo esto es controlado por el **motor** de Javascript V8 del navegador

### Qué significa que Javascript es Backwards Compatible

se trabaja bajo estandres , es necesario esperar hasta ser aprobado.
BABEL es compilador para usar nuevas versiones de javascript y los traduce para viejas versions de javascript.

Todas las funciones nuevas que salen para Javascript no dañarán el trabajo ya hecho previamente, pero no se podrá utilizar en nuestro entorno de trabajo inmediatamente. Para solucionar esto está Babel, que permite usar las nuevas características del lenguaje, pero lo transforma a una versión que el navegador pueda entender.

## Clase 02

JavaScript tiene una comunidad enorme de desarrolladores que fortalecen el dominio de este lenguaje. A continuación nos enfocaremos en las áreas que puedes aplicar para aprenderlo.

### Desarrollo Web

- Para construir aplicaciones web, existen librerías o frameworks robustos basados en JavaScript. Algunos de estos son: Angular, React o Vue.

### Desarrollo de aplicaciones (Desktop , Android & IOS)

- Electron es un framework que te permite construir aplicaciones de escritorio en Mac o Windows.
- React Native es un framework que te permite construir aplicaciones nativas en Android o iOS. Electron es un framework que te permite construir aplicaciones

### Backend o Internet of Things (IOT)

- Node.js es un entorno de ejecución de JavaScript del lado del servidor. Este te permite manejar las solicitudes y respuestas que el navegador recibe por medio del usuario, este componente se lo conoce como Backend, mientras que todas las interacciones con el usuario se denomina Frontend.Igualmente, puedes construir aplicaciones dedicadas al IOT (Internet of Things), que te permite relacionar objetos cotidianos con el internet.

### Clase 03

Tipos de Datos en Javascript

A.Tipos Primitivos

- undelined
- null
- boolean
- number
- string

B.Tipos Objecto

- date,error,class,array,function

### Apuntes

- Declativa y expresiones
- scope (Global,Functions ,Bloque,Code)
- Hoising
- Coercion explicita y implicita
- Validacion
-
