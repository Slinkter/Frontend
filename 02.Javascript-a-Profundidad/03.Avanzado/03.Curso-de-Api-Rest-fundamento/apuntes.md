<!-- Clase01  -->

Saber html y css , debido a que manipula el DOM
Enteder funcion JS Engine
Asincronismo con JS (promesas,async-wait,fetch)

## que es una API REST ??

API : Aplication program interface(interfaz) permite interatuar con frontend y backend
REST : Representation state transfererprocol, comunicacion http con backend

<!-- Clase02  -->

flujo de comunicacion de usuario frontend backend

### Server side rendering

el usuario hace un solicitud al servidor y la respuesta es un HTML ,este proceso se llama _Server side rendering_.en este proceso se trae muchas paginas html desde el servidor lo cual lo hace lento.

### single page applications (SPA)

otro flujo o proceso es _single page applications (SPA)_
donde javascript se genera un html y manipula el DOM
controla o escucha eventos para hace solictura a un API, este proceso solo carga sola una vez un html y la logica para generar o responder una solicitud del usuario esta en el archivo JS

<!-- clase 03 -->

uso de API gratis ,

https://github.com/public-apis/public-apis

https://thedogapi.com/

uso de consulta de una api de gatos con html y JS con un button

<!-- Clase 04  -->

### EndPoints

modificar el resultado para del API
una API puede tener diferentes rutas para solicitar distinto contenido

### QueryParameters

son informacion extra para espificiar para solicitar el contenido

/categoria?seach="fun"

<!-- Clase 05 -->

ejemplo de uso de api con query

que son los Status Code ??? son respuesta del backend

2xx---> conexion ok.

    201 : se creo algo
    202 : se creo algo pero no se termino
    203 :

3xx---> es un re-direccion.

    307 : es temporal la ruta
    308 : existe la ruta al 100%

4xx---> el frontend tiene falla o error de solicitud.

    401 : la ruta que consultamos no existe o no esta autorizado
    402 : paga para ingresar
    404 : nuestra solicitura no existe
    418 :

5xx---> el backend falló ,sobre carga de solicitudes

    501 :

<!-- Clase 06 -->

### Que es una API KEY

es una forma para que el backend identifica quien hace la solicitud(usuario)

autorizacion!=autenticacion
Autorizacion : nivel de permision del usuario.
Autenticacion : identifica al usuario .

los dos trabajan juntos para permite o prohibir los accesos a la informacion.

las otras formas son:

    -AuthorizacionBasic
    -OAuth 2.0
    -AccessKey + secretKey

para este curso se usara :

    -Application-based authentication
    -User-based authentication

<!-- Clase 07 -->

## Maquetacion del proyecto

uso de subir fotos de una api

<!-- Clase 07 -->

## ¿Qué son los Métodos HTTP?

los metodos https el frontedn le envio un spoiler al backend de la solicutra (GET,POST,PUT,PATCH,DELETE)

- GET : es para consumir infomormacion o leer
- POST : nos sirver para crear cosas en el backend
- PUT : edita la informacio por completo
- PATCH: edita la informacion parcialmente
- DELETE : borrar informacion
<!-- Clase 08 -->

<!-- Clase 09 -->

implementacion de favorito en gatos

<!-- Clase  -->

¿Que son los Headers HTTP?

<!-- Clase  -->

Header de autorizacion

<!-- Clase  -->

Headers de Content-type
existe varios forma de enviar datos en los header
a los backend desde fronted

<!-- Clase -->

FormData
