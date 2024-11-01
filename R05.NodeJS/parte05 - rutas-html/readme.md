## modelo cliente servidor

-   Cliente : navegador que solicita algo al servidor
-   Servidor : programa que ejecuta en el servidor fisico que es un servicio envia info al navegador
-   Formato de comunicacion : protocolo HTTP
-   Protocolo : conjunto de reglas que transmiten informacion entre dispositivos
-   Protocolo HTTP :
-   Solicitud HTTP (Request-client) : sus elementos son

    -   1. Method : que accion debe realizar en el servidor(solicita a base de datos, insertar imagen,consultas)
    -   2. Path : donde esta ubicado el recursos a consultar o modificar
    -   3. Version :
    -   4. Headers : mas infor para el servidor
    -   5. Body : mas informacion para insertar en la base de datos

-   Method HTTPS : indica la intencion del cliente ()
    -   GET : Solicitar un recurso especifico (html o imagen)
    -   POST : Crear un recurso especifico(insertar)
    -   PUT : Modificar un recurso especifico (cambiar)
    -   DELETE : Eliminar un recurso especifico(borrar)
    -   OTROS :
-   Respuesta HTTP (Response-server) :
    -   1. Status Code : 100-200-300-400-500 ¿Que paso en en server?
    -   2. Status Text :
    -   3. Version :
    -   4. Headers
    -   5. Body : enviar al cliente informacion
    -   Node y Express podemos especificar codigos de estados

## Primer servidor con Node.js

-   para crear el primer servidor node se necesita el **modulo http**
-   este servidor escucha solicitudes
-   puerto : ubicacion virtual en el S.O.
-   req y res
-

## Estructura de una URL

-   uniform resource locator
-   direccion de un recurso en el servidor
-   subdominio : www.\_\_\_
-   dominio : .google. referencia unica
-   (TLD)dominio nivel superior : .org|.com|.edu
-   (Path) camino : /recurso/item
