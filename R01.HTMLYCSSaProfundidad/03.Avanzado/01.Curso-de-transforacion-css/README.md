## Clase 01/20 : 5 razones para usar animaciones en la web

01 - Animaciones ayudan al cerebro
02 - Animaciones comunican
03 - Animaciones con el contexto dela info
04 - Coreografia UI , coherencia de animaciones
05 - Animaciones llamanda la atencion

## Clase 02/20 : Propiedades para crear animaciones con CSS y propiedades animables

03 conceptops fundamentos
-Transform : hace una tranformacion de los elementos de HTML (div puede rotar o aumentar el tamaño , se modifica al nivel fisico de los elementos )
-Transition : se parece a animaciones, se diferencia es de ir a un lado A a lado B (no puede existe un cambio en medio o camino)
-Animaciones (siguiente curso) : si existe un cambio en medio cuando se mueve de lado A y lado B.

## Clase 03/20 : Pseudo-clases y pseudo-elementos en las animaciones

### pseudo clase

a:link {
color: hotpink;
}
a:visited {
color: red;
}

a:hover {
color: blue;
background-color: blueviolet;
}
p:not(.marivillas) {
color: lightsalmon;
}
.container div:nth-child(1) {
color: lightgreen;
}

### pseudo elemento

div::before {
content: " :V ";
}
div::after {
content: " :P ";
}

## Clase 04/20 : Timing functions, planos y ejes

### timing function

Es la representación de la progresión en función del tiempo de cada ciclo de la animación. Representa la aceleración del elemento desde un punto A hasta un punto B.

En esta página web (https://easings.net/{target="_blank"}) podrás observar varias “timing functions” y cómo es su animación haciendo hover en cada bloque. No es necesario aprendertelas de memoria, solo conocerlas.

### Cubic-bezier

Es una función de CSS para representar una timing function mediante cuatro puntos a lo largo de la curva, de los cuales únicamente ingresamos los dos puntos intermedios.

Página web para crear una función Cubic-bezier{target="\_blank"}

### Planos y ejes

El navegador está constituido de tres planos y ejes: el ancho o X; el alto o Y; y el de profundidad o Z.

El eje X positivo está hacia la derecha; el eje Y positivo está hacia abajo; y el eje Z positivo está hacia el usuario. Estos son muy importantes para mover los elementos del HTML desde un punto inicial hacia un punto final.

### Contexto de apilamiento

El contexto de apilamiento consiste en la superposición de capas o elementos a lo largo del eje Z. Esto es importante para evitar que un elemento esté ocultando a otro o colocar una imagen de fondo a la página web.

https://easings.net/

https://cubic-bezier.com/#.17,.67,.83,.17

## Clase 05/20 : Transform translate

Transform es una propiedad CSS que sirve para transformar un elemento HTML mediante funciones. Estas funciones permitirán trasladar, escalar, rotar o torcer a lo largo, ancho y profundidad del elemento.

Primero, revisaremos las propiedades para transformaciones 2D, es decir en un solo plano. Después, con algunas otras propiedades CSS aplicaremos transformaciones 3D.

Translate para transformaciones

Translate es una función de la propiedad “transform” que te permite trasladar un elemento HTML a través de los ejes del navegador. El valor que recibe puede ser una longitud (px, rem, etc.) o un porcentaje.

selector {
transform: translate(10px, -10px);
transform: translate(20%, -20%);
}

uso para fondo
https://cssgradient.io/gradient-backgrounds/

## Clase 06/20 : Transform rotate, scale, skew y matrix

### Rotate para transformaciones

Rotate es una función de la propiedad transform que te permite rotar un elemento HTML a través de los ejes del navegador. El valor que recibe es un ángulo, por ejemplo, “45deg” (45 grados) o “2rad” (2 radianes). Los ángulos positivos están en sentido horario, y los negativos en sentido antihorario.

### Scale para transformaciones

Scale es una función de la propiedad transform que te permite escalar un elemento HTML a través de sus ejes. El valor que recibe es un número multiplicador al elemento original.

Si el elemento es igual a 1 entonces sigue como el original; mayor a 1 aumenta de tamaño; y, menor a 1 disminuye de tamaño.

### Skew para transformaciones

Skew es una función de la propiedad transform que te permite torcer un elemento HTML a través de sus ejes en dos dimensiones. El valor que recibe es un ángulo para cada eje en el que el elemento se distorsionará.

### Matrix para transformaciones

Matrix es una función de la propiedad transform que te permite realizar varios efectos en uno solo.

### Orden en el código para transformaciones

Solamente puede existir una sola propiedad transform en el código de CSS, por lo que si escribimos otra regla CSS con otra transformación, esta se sobreescribirá y solo ejecutará la última. Por ende, utiliza varias funciones en la misma propiedad transform para realizar varias transformaciones.

## Clase 07/20 : Transform origin

El origen es el punto en el cual la transformación se ejecutará. La propiedad transform-origin permite cambiar el origen de las transformaciones, que por defecto está en el centro del elemento.

## Clase 08/20 : Transform style y perspective

Ya revisaste las propiedades para realizar transformaciones en 2D, si te fijaste bien, habrás notado que cuando se realiza una transformación en un solo eje (por ejemplo rotateX) el elemento permanece en un solo plano.

Con las transformaciones 3D observaremos el elemento transformarse en diferentes planos.

Por lo tanto, es momento para aplicar transformaciones en 3D. Las propiedades CSS para esto serán: transform-style y perspective

Transform style para transformaciones en 3D
La propiedad transform-style de CSS establece si un elemento hijo está en el plano 2D (flat) o 3D (preserve-3d). Por defecto, el elemento está con valor flat.

selector {
transform-style: preserve-3d;
}
Perspective para transformaciones en 3D
La propiedad perspective se utiliza para proveer de profundidad a un elemento con respecto al usuario y dar la sensación de 3D.

El valor que recibe la propiedad es una longitud (px, rem, etc.) que representa la profundidad del plano para construir la perspectiva.

Por defecto, el origen para las transformaciones 3D está en el centro, pero se puede modificar con la propiedad perpective-origin.

Cambiar el origen de la perspectiva.

La propiedad perspective-origin es la encargada de cambiar el origen de la perspectiva, por lo que el usuario percibirá de diferente forma el elemento.

## Clase 09/20 :Backface visibility

## Clase 17/20 :Propiedades recomendadas y no recomendadas para animar

- height
- backgroun-color
- transform
- opacity

## Clase 18/20 :Aceleración de hardware y la propiedad will-change

La aceleración por hardware permite usar componentes específicos de tu ordenador para quitar trabajo al procesador de tu dispositivo. Uno de estos componentes puede ser una tarjeta gráfica, que puede usarse para renderizar o mostrar el contenido del navegador en tu pantalla.

### Propiedades al animar

En la clase anterior, aprendiste que existen propiedades que se deben animar y otras que no, esto se debe a un proceso de renderizado, este proceso consta de varios pasos: JavaScript, Style, Layout y Composite. Los tres últimos determinan si son adecuados para una animacion, con respecto al rendimiento. Las propiedades recomendables son opacity y transform, porque estas solo necesitan del último paso.

### Problemas de la aceleración por hardware

Las imágenes no cargan correctamente.
En los vídeos, la imagen o el sonido no se reproduce correctamente.
Algunas partes del navegador aparecen mal diseñadas.

### Propiedad will-change

La propiedad will-change de CSS sirve para anticipar y preparar los cambios de una transformación. Este tipo de optimizaciones puede aumentar la capacidad de respuesta de una página al realizar un trabajo potencialmente costoso en rendimiento.

En el siguiente ejemplo, observa la transición con una propiedad no recomendable y luego agregando la propiedad will-change. ¿Notaste que la transición no es fluida? ¿Qué tanto tiembla el elemento?

Ejemplo comparativo para usar “will-change”.{target="\_blank"}
El elemento con la propiedad no recomendable tiembla un poco porque la animación no es fluido y requiere de más recursos, impactando en el rendimiento de la animación.
