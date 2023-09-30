/* Clase 01 */
// introduccion
/* Clase 02  */
/* 

QUE ES ASINCRONISMO ?

Los lenguajes de programacion son sincronicos proque tienen que ejecutar
tarea por tareas, en si JS es sincrono y utiliza un subproceso como hilo.

Js es single-threaded

Js procesa en un solo hilo , 

Js es Bloqueante 

una tarea puede ser bloqueada hasta que termine . por ejemplo un alert 
la aplicacion no puede avanzar hasta atender ese alert 

Js es no bloquenate

un tareas se resolvie rapido independiente del resultado 

JS es Sincrono

las tareas se ejecunta de manera secuencial. las tareas debe esperar hasta q termine la
tarea anterior

Js es asincrono

las tareas puede ser resultadas mas tarde para que otras tareas se pueden resolver
es decirl el resultado es diferido a otras tareas.

Js es Concurencia

eventos basado en eventloop  

Js es EventLoop

que es un patro de diseño que esperar 
y distribuye los eventos

*** Forma de procesar o manejar Asicronia 

****  Callback
es una funcion, que es parte un argumento de una funcion , que sera incovacada
****  Promesas (ES6)
es una funcion no-bloqueante asicronia ,puede cumplir una promesa ahora , futuro o nunca .
**** Async / Await (ES2017)
es una funciona asincrona sin bloqueo , solo es sintaxis mas amigable

con estas formas js puede simular multi-hilo por estas herramientas


Js es un lenguaje de programacion no bloqueante asicrono donde existe el bucle de un solo
hilo para interfaces I/O 


*/

/* 
Clase 03

*** Event Loop
es un patron de diseño se distribuye eventos o mensaje de un programa
es un bucle , funciona solo si el stack esta vacio para que el task queue pueda mover las tareas
ya realizadas 
*** Memory Heap 
es un recurso , espacio en memoria donde los elementos estan asignados
*** Call Stack
Apila y organiza las instrucciones de un programa 
*** Task queue
Maneja las concurrencias 
solo se agrega las tareas que ya esta listas para pasar al stack
*** MicroTask Queue
tiene prioridad superior a resolver como promesas
*** Web APIs 
js y node , manipulacion de archivos del os y peticiones Http
(imagen)
http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D


*/

/* Clase 05.
configuraion vscode code run
*/
/* Clase 06 */
/* 
callback

settime out es un callback 

la llamada de una funcion dentro de una funcion 





*/

/* Clase 07 */

/* 
uso de una api fake de platzi

[https://fakeapi.platzi.com/]

nos ayudar a pedir las peticions html , xml json .

uso de xmlhttprequest


*/

/* CLASE 08 */
/* 
FETCH DATA

añillar multiplex llamados en un callback
uso de 


*/

/* Clase 09 */
/* 
que son las promesas???

es algo puede pasar o no, es usado para computacion asincronas


*/

/* Clase 10 */
/* 
Fetch 

se instala un paquete fetch

*/

/* Clase 11 */
/* 
uso de fetch y post

*/

/* Clase 12  */

/* 
Guarda los datos con fetch post
*/

/* Clase 15/26 : Funciones asíncronas 

es un flujo asycn await



*/

/* 
Clase 16/26 : Try and catch

uso de fake api de platzi

Nos permite crear un bloque a intentar (try), 
y otro por si falla o se produce una excepción (catch).

*/

/* 
Clase 17/26 : Try and catch

ejercios de platzi 


*/

/* 
Clase 18/26 : ¿Cómo enfrentar los errores?

Plantear el codigo en papel y luego en codigo


*/
/* 
Clase 19/26 :Generators
es un opcion de sync

es una funcion que puede llamar o para solicitudes 
itera varios elementos que se integran al flujo 





*/
/* 
Clase 21/26 : Consumiendo API

uso de rapiapi
https://rapidapi.com/ytdlfree/api/youtube-v31

*/

/* Clase 22/26 */

/* 
uso de gh-pages

npm install gh-pages --save-dev

se modifica en packeage.json
script{
    deploy : "gh-pages -d src"
}

en terminal :

npm run deploy  --> ejecutar el script
se habilida actions github 


*/

/* Clase 23/26  : Ejercicios */
/* Clase 24/26  : Comentarios */
/* Clase 25/26 : recomendaciones*/
/* Clase 26/26 : retos y certificacion*/
