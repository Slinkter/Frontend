https://emilysdominguez.notion.site/Arquitecturas-CSS-af3de095ef7c4ea4b6492b5f6568297b

https://mateorol.notion.site/Arquitectura-4da59144051d4b879e8187e8e6e653af

## C-1 : ¿Qué son las arquitecturas CSS?

Necesitamos hacer que el CSS sea:

-   Limpio 🧹: Sin código innecesario y bien organizado.
-   Escalable 📈: Listo para crecer y adaptarse a proyectos más grandes.
-   Mantenible 🔧: Fácil de mantener y modificar sin problemas.

Arquitectura

-   Cómo se divide el código en archivos y carpetas.
-   Y cómo trabajamos con nuestros selectores (_Nombramientos de clases_)

Principios de programación orientada a objetos para CSS

-   SOLID 🤝: Un conjunto de cinco principios para un código de calidad y fácil de mantener.
-   DRY 🌵: No repitas código, ¡mejor eficiencia y menos errores!
-   IMMUTABILITY ⛔️: Promueve la inmutabilidad para datos más seguros.

## C-2 :SOLID, DRY e Inmutabilidad en CSS

### SOLID

SOLID es un acrónimo acuñado por Robert C. Martin
Representan los cinco principios básicos de la programación orientada a objetos.

-   S : Single resposability principle : cada clase debe hacer una sola cosa.
-   O : open-close principle : padre - hijo no sobreheradar
-   L : Liskov subtitution : Una clase derivada debe poder ser utilizada en lugar de la clase base sin romper el comportamiento esperado del programa
-   I : Interface Segregation : No sobreescribir estilo hererados
-   D : Depency inversion : No depender de modulos de alto nivel

### DRY

-   dont repeat yourself
-   Reducir la repetición de código
-

### inmutabilidad

Objeto cuyo estado no puede ser modificado una vez creado.
no debe ser modificado, el mal uso de !importal en subclase

## C-3 : BEM

(Block Element Modifier): Es una metodología que se centra en la estructura del HTML y nombra las clases de manera descriptiva para formar bloques (componentes), elementos y modificadores.

B:bloque
E:elemento
M:modificado

<div class="comment__button--like">
    something
</div>

-   Bloque: contenedor principal.
    -   Card, button, form, menú, header…
-   Elementos: partes internas.
    -   Icon, text, item, image, input, button…
-   Modificador: variaciones (del bloque y elementos).
    -   Active, big, right, secondary, red…

1. Para tener un CSS más fácil de leer, entender, mantener y escalar.
2. Para organizar las clases de CSS en módulos independientes.
3. Para evitar selectores anidados y código largo insostenible.

## C-4 : Casos practicos de BEM

ejemplo en imagenes
ejemplo que no debe ser en imaganes
-no se debe usar bloque-modificador en elemento
-p>i : class card-icon (bloque\_\_elemento_elemento)

## C-5 :Errores comunes al implementar BEM

## Atomic Design

Se refiere a lineamientos para crear componentes (útil para organización de carpetas).

-   Atomos --> Label input Button (elementos que ya no se puede dividir mas)
-   Moleculas --> <div> label input buttom </div>
-   Organismos --> <Header> <div> label input buttom </div> </Header>
-   Plantillas --> Body> header main footer
-   Paginas --> contenido de texto e imgs en dentro de las plantillas

## Arquictura OOCSS

-   Object Oriented CSS
-   OOCSS es una metodología de desarrollo de CSS que se basa en principios de programación orientada a objetos.
-   Su objetivo es crear estilos reutilizables, modulares y mantenibles para construir interfaces de usuario eficientes y escalables.
    -OOCSS busca separar la estructura y el diseño visual, lo que significa que los estilos que definen la apariencia visual de un elemento deben ser independientes de la estructura del HTML.

principios

-   Separacion de estrucutra y diseño :
-   Separacion de contendeor y contenido :

## Arquictura SMACSS

S:`SCALABLE`
M:`MODULAR`
A:`ARQUITECTURE`
C:`CASCADING`
S:`STYLE`
S:`SHEET`

Es una arquitectura modular escalable para CSS, consiste en separar los proyecto en diferentes tipos de carpetas

CATEGORIAS

-   Base
-   Layout
-   Module
-   State
-   Theme

## Arquictura ITCSS

ITCSS es una colección de principios y métricas. La idea es visualizar el css como un triángulo invertido en capas. Suele usarse esta arquitectura en proyectos grandes

Triangulo : Magnitud especificidad claridad
