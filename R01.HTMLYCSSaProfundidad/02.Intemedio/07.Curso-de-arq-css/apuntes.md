https://emilysdominguez.notion.site/Arquitecturas-CSS-af3de095ef7c4ea4b6492b5f6568297b

https://mateorol.notion.site/Arquitectura-4da59144051d4b879e8187e8e6e653af

## C-1 : ¿Qué son las arquitecturas CSS?

Necesitamos hacer que el CSS sea:

- Limpio 🧹: Sin código innecesario y bien organizado.
- Escalable 📈: Listo para crecer y adaptarse a proyectos más grandes.
- Mantenible 🔧: Fácil de mantener y modificar sin problemas.

Para lograrlo, podemos aplicar principios de programación orientada a objetos, como:

- SOLID 🤝: Un conjunto de cinco principios para un código de calidad y fácil de mantener.
- DRY 🌵: No repitas código, ¡mejor eficiencia y menos errores!
- IMMUTABILITY ⛔️: Promueve la inmutabilidad para datos más seguros.

ARQUITECTURA

- Cómo se divide el código en archivos y carpetas.

Y cómo trabajamos con nuestros selectores (Nombramientos de clases)

## C-2 :SOLID, DRY e Inmutabilidad en CSS

### SOLID

SOLID es un acrónimo acuñado por Robert C. Martin en el cual se representan los cinco principios básicos de la programación orientada a objetos. La intención de seguir estos principios es eliminar malos diseños, evitar la refactorización y construir un código más eficiente y fácil.

S : Single resposability principle : (cada css no debe abarca muchos estilo)
O: open-close principle:
L :Un objeto puede ser reemplazado por un subojeto sin romper el programas,si esta permitido hereador de un estilo general
I: no sobreescribir estilo hererados
D:no depender de modulos de alto nivel

### DRY

dont repeat yourself

### inmutabilidad

no debe ser modificado

## C-3 : BEM

B:bloque
E:elemento
M:modificado

debe ser facil de leer
organiza las clases css
evitar selectore anidados

## C-4 : Casos practicos de BEM

ejemplo en imagenes
ejemplo que no debe ser en imaganes
-no se debe usar bloque-modificador en elemento
-p>i : class card-icon (bloque\_\_elemento_elemento)

## C-5 :Errores comunes al implementar BEM
