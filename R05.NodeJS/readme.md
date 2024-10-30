00:00:00 Inicio del Curso

🔹 Introducción a Node.js
00:01:23 Introducción a Node.js
00:07:24 Conceptos básicos
00:16:29 Aplicaciones de Node.js
00:21:01 Descargar e instalar Node.js
00:24:34 Confirmar versión de Node.js
00:26:35 El REPL de Node.js

🔹 Módulos de Node.js y primer programa
00:31:02 Primer programa con Node.js
00:34:38 Módulos en Node.js
00:37:47 Crear un módulo
00:40:28 Exportar e importar
00:51:07 Exportar varios elementos
00:58:05 Sintaxis de desestructuración y require.
01:01:49 Módulos principales de Node.js
01:03:27 El módulo console
01:08:54 El módulo process
01:16:48 El módulo os
01:21:05 El módulo Timers
01:39:21 El módulo fs

🔹 npm y el formato JSON
02:10:38 Introducción a npm
02:16:09 Crear paquete con npm
02:25:05 Introducción al formato JSON
02:43:14 Instalar y desinstalar paquetes con npm
02:55:50 package-lock.json

🔹 Eventos y JavaScipt asíncrono
03:00:11 Eventos en Node.js
03:07:27 Módulo events
03:16:06 Promesas en JavaScript
03:20:21 Práctica de Promesas
03:40:26 .catch()
03:44:09 Encadenar promesas y async await

🔹 HTTP y rutas en Node.js
04:13:17 Modelo cliente-servidor
04:16:14 Solicitudes HTTP
04:21:23 Métodos HTTP
04:24:12 Respuestas HTTP
04:27:35 Códigos de estado HTTP
04:35:03 Tu primer servidor con Node.js
04:50:14 req y res
05:10:08 Estructura de una URL
05:20:57 El módulo url
05:26:30 Routing en Node.js

🔹 Nodemon
06:14:39 Nodemon

🔹 Express
06:24:41 Introducción a Express
06:27:25 Express - Conceptos importantes
06:36:03 Crear un proyecto con Express
06:45:36 Primeros pasos con Express
06:52:42 Agregar rutas en Express
06:58:34 Parámetros de Ruta
07:15:31 Parámetros query
07:22:32 Routers en Express
07:30:25 Routers en distintos archivos
07:42:33 POST, PUT, PATCH y DELETE

08:29:02 Comentarios finales

## ¿que es nodejs ?

-   Entorno de ejecucion de javascript orientado a eventos asincrnos
-   Entorno de ejecucion : Infraestructura donde se ejecutar la aplicacion javascript
-   antes js se ejecutaba en navegadores
-   node permite ejecutar en la terminal de cualquier S.O.
-   node se usa para desarrolo backend (servidores para aplicaciones web)
-   Evento Sincrono : es parte del proceso principal de aplicacion. si bloque la aplicacion.
-   Eventos Asincrono : evento que se ejecutar indepedientemente del proceso princial de la aplicacion,no bloque la aplicacion.
    -   Una aplicacion puede tener varios eventos ,
    -   Ejemplos de eventos asicronos : base de datos , obtener informacion que demorar al solicitar.
-   Node es multiplataforma (S.O.) , codigo abierto , se base en el motor v8 de googlechrome.
-   Motor v8 , es una copia desde el motor de google-chrome.

## Conceptos importante

1. Arquitecutas

-   Arquitecuta cliente-servidor :

2. Desarrollo web

-   Front-end : parte de presentacion y funcional para el usuario
-   Back-end : parte de desarrolo de servidores . maneja solicitudes y base de datos .

3. Protocolo

-   Conjuto de reglas que permite la comunicacion entre el cliente y servidor.
-   Protocolo HTTP / HTTPS

4. Base de datos :

-   Conjuntos de datos estructurados. (en tablas) , util para consultar

4. Paginas web

-   Estaticas :
-   Dinamicas : interacion con el usuario , solicita peticiones al servidor

## Aplicaciones de node

-   Aplicaciones escalabes (incrementar o adaptar el rendimiento) y tiempo real (conexion bidirecacional entre cliente-servidor)
-   Desarrollo APIS (interfaz de programacion de aplicaciones) y Back-end (servidores-DB)
-   API : es un intermediario entre programas cliente-servidor.

## No es NODE

-   No es lenguaje de programacion
-   No es libreria
-   No es framework

## Si es NODE

-   Entorno de ejecucion en una terminar
-   Usa lenguaje de programacion de javascript

## Ejecutar codigo NODE

-   Se crear un archivo file.js
-   en la termina se buscar el archivo en lista y se ejeecutar "[node file.js] "

## Modulos en nodejs

-   funciones y variable separadas
-   evitar repetir codigo
-   reutilizar codigo
-   facil de encontrar errores por modulos
-   facil de modificar codigo
-   facil de agregar nueva funcionalidad
-   modulo = archivo js
-   importar = dar acceso a variables y funciones
-   exportar = disponible para otros modulos

## Modulo built - in (core)

-   moduilos que viene incorporador en Node
-   para tareas comunes
    -   HTTP/HTTPS
    -   FS : File System : sistema de archivo,
        -   metodos : leer,modificar copiar eliminar cambiar nombre un archivo
        -   los metodos son asincronos (no bloquea el proceso principal )
        -   se puede configurara para que sea sincronos (sync)
    -
    -   OS : Operating System : info del dispositivo donde se ejecuta node
    -   Path

## modulo console

-   similar a console.log() de la web para ejecutar JS
-

## Modulo process

-   info del proceso que se ejecuta

## Modulo timers (temporizador)

-   espera un tiempo x para ejecutar una funcion
    -   setTimeout() : espera x milisegundos para ejecutar ,
    -   setImmediate() : primero se ejecuta sincrono y luego codigo asincronico
    -   setInterval() : ejecutar infinitoveces
