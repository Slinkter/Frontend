## Clase 01/20 : Tu responsabilidad como frontend developer

uso de un proyecto api , optimizar de imagenes , consulta de query , experenciea de ux
optimzar imagenes , lazyloading ,

## Clase 02/20 : Caché vs. memoria

exiten optimzaciones para backend y frontend

optimizacion de tiempo de obtener la info desde la API (Frontend) .
existen 2 estrategias : cache y memoria
ayudar a no pedir de nuevo la solitud http al servidor.

### Cache (solicitar al backend)

el cache es donde el navegador debe traer la ultima informacion desde backend .exsite condiciones para volver a llamar al solicitud .
se optimzador guarda cache en el navegador

### Memoization(solicitar en local)

en el codigo JS se guarda la info que ya solicutamos para no pedir al servidor.

es un "objeto (estructura de dato)" que pregunta si esta actualizador , si no esta actualizado pide de nuevo la informacion.

se borrar cuando usamos refrese de la pagina (f5)

## Clase 03 :Debuggeando caché y networking

es necesario terminar el curso de anterior a este

## Clase 04/20 :Loading spinners vs. loading skeletons

en Tiempo de espera de una solicitud , se crearn pantalla de cargas : Loading spinner vs loading skeletons.

loading screens debe ser facil de entender y mostrar informacion de espera .

es una estrategias de buenas practicas.

## Clase 05/20 :pantalla de carga

## Clase 06/20 :Intersection Observer

es nativo de JS , nos ayuda a implementar lazy loading

// options : root document windows
let observer = new IntersectionObserver(callback, options);
const callback = (entries) => {
entries.forEach(element=>{
element.src
})
};

## Clase 07/20 : Lazy loading

## Clase 08/20 : Imágenes por defecto

## Clase 09/20 : Scroll infinito vs. paginación

### Paginacion :

el contenido est orgnizado por paginas (pagina de ventas de productos / e-commers) , la cantidad de producto es fija en cada pagina . para resultados especifoco. la pagina no adicitiva

### Scrrol infinito ,

todo los productos carga en una "sola pagina",la navegacion es adicitiva . carga de mas contenido (instagrama) . no se recomienda usar footer.

## Clase 14/20 : Local Storage vs. API real

### local Storage

es mucho mas rapido de que una API
el navegador debe soportear LocalStorage.
es un almacenamiento local en el navegador
No tiene authentication
No recuperar sesesion
No token , no apikey ,no datos privados (malas practicas) . se recomienda session-storage o una API.

### Api Real

permite recuperar la sesion y datos privados
