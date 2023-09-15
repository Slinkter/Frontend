/* 
Clase 03/18 

Rendimiento en JS

el tiempo o espacio son recursos importante.
*/

/* 
Clase 04/18 

Tiempo = segundo,minutos
Espacio= bytes,kilobytes

 saber si el algorito se puede medir segun los recursos que utiliza

 Teoria de la complejidad

 es para entender el crecimiento de los recursos.


*/

/* 
Clase 05/18
- Complejidad espacial
se encarga de calcular cuanto espacio en memoria puede ocupar un algoritmo, a parte del espacio ocupado por los datos de entrada, existe el espacio auxiliar, el cual es el espacio creado por el mismo algoritmo para hacer otro procesos, por ejemplo: filtrar un array, hacer un sort de números, etc.
buscar que algoritmo consumen menos memoria
- El espacio auxiliar 
puede llegar a hacer mucho más grande que el espacio de los datos de entrada, y está relacionado al algoritmo mas que a los datos recibos.
*/

/* 
Clase 06/18
- Complejidad temperal

que algoritmo me toma mas tiempio realiza con un cantidad de proceso hace 

*/

/* 
Clase 07/18

*/

function contar(n) {
  for (let index = 0; index < n; index++) {
    console.log(index);
  }
}
let inicio = performance.now();
contar(1);
let final = performance.now();
let d = final - inicio;
console.log("el algoritmo contar ha durado", d, "ms.");
console.time("duracion");
contar(5);
console.timeEnd("duracion");

/* 
link 
https://360macky.github.io/visualization-time-complexity/

*/

/* 
complejidad espacial

- que variables se van a crear en algoritmo para crear espacio.
- Se observa cuantas variables se va a crear apartir de la ejecucion del algoritmo
- con los datos que nosotros damos
*/

function repetir(arreglo) {
  let arreglo_repetido = arreglo;
  return arreglo_repetido;
}

/* Clase 09/18 */
/* 

la complejidad se puede aplicar a todos los recursos 
se buscar un estandar a la complejidad

existe otras complejidad algoritmicas como: 
  - acceso a memoria
  - procesos paralelos
  - comparaciones

*/

/* Clase 10/18 

Analisis asintotico

 mediciones distintas e inexactas .
 para simplificar nace el concepto de Analisis asintotico.
 describe el comportamiento limitante de una funcion.
 es contrar algoritmo muy parecido a su complejidad

*/

/* Clase 11/18 */
/* 
NoTAcion Big-O

los peores casos , tener un poco mas,
lo que hace a Big-O tan importante es que se destaca en concentrarse en el caso peor de tu algoritmo
En el tope superior de nuestras mediciones. 
reconocer el uso de recursos de los algoritmos.
se recomienda que tenga un comportamiento lineal


*/

/*  Clase 12/18 */
/* 
Cálculo de la notación Big-O
La complejidad de un algoritmo nace de cuántos recursos utiliza el algoritmo al ejecutarse.

La notacion Big-O solo se enfoca en el crecimiento.

Un algoritmo puede correr en una computadora muy vieja-lenta o en una muy nueva-rapida, pero el crecimiento (ritmo) sea el mismo, la complejidad será la misma. Pero esto es en base a los recursos que esa computadora tiene.

Conclusión
Revisamos el código en nuestro algoritmo para medir su complejidad en la notación Big-O.
La notación Big-O consiste en encontrar la función que describe el crecimiento en el uso de recursos (tiempo o espacio), de allí que lo importante sea únicamente la función, no su desplazamiento a través del eje

*/
