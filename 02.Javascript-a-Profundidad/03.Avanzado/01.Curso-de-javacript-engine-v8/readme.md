<!-- Clase 03 -->

el motor de javascript

el archivo de js tiene que ser traducido a codigo de computadora(Machine code)
para eso se usa motor de JS , no computadora no entiende el archivo JS directamente.

este proceso de traduccion se conoces como _JUST IN TIME COMPILE_ ,

[https://dev.to/lydiahallie/javascript-visualized-the-javascript-engine-4cdf]

<!-- Clase 04 -->

V8 es un motor que corre en google-chrome
se crea debido a google maps era muy lento .

<!-- Clase 05 -->

dentro del motor ,
antes de traducir se genera
-un entorno global(global environment) ,
-corre el codigo (Execution context) : apila las tareas
-parse del archivo

<!-- Clase 06 -->

## Ejemplo de Objeto global y hoisting

explicacion de windows = this

hoisting en variable y funcion

    solo pasa para variable y funciones ,cuando no le queda claro , el engine js(motor) trata de intepretarlo y los sube la variable y/o funcion en proceso de ejecucion en un archivo aparte se ponen en primeras lineas , es decir , engine JS(motor) orderna el codigo de variable a funcion y interpreta cada variable y funcion y luego asigna valores como undefined .

```
console.log(nombre) // undefilned
nombre ="Luis " // error
var nombre ="Jhonatan" //
console.log(nombre)
```

<!-- CLASE 07 -->

## Memory Heap

single thread : sifgnica que JS solo puede hacer una tareja a la vez.

el codigo en si (variable y funciones ) se almacena en _Memory Heap_ para ser enviado al _CallStack_ para se ejecutado

<!-- CLASE 08 -->

## CallStack

es una pila de tareas , se empiza de la ultima pila donde le espera el _Global Object_ este proceso paso a paso se llama _single thread_ (synchronous) ,

explicacion de codigo con debugg

## Garbage Collection

JS nos ayuda a limpiar el stack , se hacer mark-sweep , aplica para valores pasadaos por default , tambien puede crashear con uso de bucle infinitos

## StackOverFlow

se evita ,  
ocurent _Call Stack_ cuando se desborda de tareas apiladas , lo cual provoca el crasheo del _call stack_ es decir el navegado se cierra.

## Javascript RunTime

JS al ser _single thread_ toma mucho tiempo en ejecutar los codigo, para reducir tiempo se aplica el metodo "asincronimos"

## Que es es la asincronia en Javascript

como un metodo aparte , se lo enviar al navegador a trabajar fuera de su JS runtime(memory heap y callstarck) es decir , la asicronia se entiende como una Web API y cuando termina se devuelte al _call stack_
