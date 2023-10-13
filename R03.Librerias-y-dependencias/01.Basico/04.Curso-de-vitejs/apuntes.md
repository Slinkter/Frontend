#

## Clase 01/19 : ¿Qué es Vite?

- recolecta todas las tecnologias que se utilizan en el estándar de desarrollo web moderno
- Mucho más veloz, compila y transpila más rápido.
- Vite es una herramienta que se caracteriza por ser bastante rápido tanto en configuración como en velocidad para realizar su tarea de transpilar o compilar. Aparte que trae una experiencia de desarrollo bastante trabajada.

## Clase 02/19 : Historia del Ecosistema de JavaScript

### El ecosistema antes de Vite.js

- Cuando la web comenzó, las páginas eran únicamente texto, con algunas imágenes y enlaces (HTML). Después surgieron los navegadores con la característica de procesar CSS, con el tiempo fue necesario agregar nuevas funcionalidades a la web, se necesitaba una web dinámica y como respuesta llego JS.

- Temas
  - Módulos y librerías : importacion de varios modulos en html generaba error.
  - IIFE : evita la colision de variables al importar modulos
  - Minificacion : ayudaba a la performance de la web en archivos grandes , reduce el espacio entre lineas de codigo
  - Bundling : un proceso donde se toman todos estos módulos y lo conviertes en un solo archivo minificado y listo para utilizar.
- Primera generación
  - Node.js :uso de Sass , Stylus , Grunt y Gulp
  - Yeoman Generator :
  - Frameworks : Aparecen los primeros frameworks (Angular.js, Ember.js, Backbone.js) que traen consigo el concepto de trabajar con el lenguaje y estructura que te proveen. Surge la necesidad de tener múltiples carpetas y archivos, estructurados de una manera muy específica, los cuales tienen que pasar por la transpilacion, es decir, encontrarse en una etapa de desarrollo y luego generar una versión para producción.
  - ES6 & Babel.js (compatibilidad): Aparece ECMAScript 6 y con ello Babel.js, una herramienta que te permite utilizar ES6 (Estándar de JS) en desarrollo y luego convertirlo en una versión más antigua, para de esta manera ordenadores más antiguos poder ejecutar el código. De esta manera teniendo las últimas características de JS y siendo retro compatibles.
- Segunda generación de herramientas

  - Frameworks nuevos como React.js, Vue.js y Angular io.
    ESLINT y Prettier, herramientas enfocadas en el desarrollo. Las cuales formatean el código con un código estándar, teniendo ahora un código más organizado.
    Bundlers como Webpack, esbuild o parcel

  - Webpack : funciona mediante una configuración donde se pasan los archivos de desarrollo a código de producción. trae un gran problema, es muy lento y necesita demasiada configuración, surgiendo alternativas a este como esbuild (mucho más rápido), parcel (menos configuración necesaria) o rollup (código más optimizado)

  - TypeScript (TS) : un lenguaje de programación tipado que se transpila hacia JS bastante útil

- Tercera generación de herramientas
  - Vite : trae una mejor experiencia para los desarrolladores, con una mayor velocidad y sin necesidad de una configuración complicada

## Clase 03/19 : Características de Vite

- Optimizacion de codigo : Vite optimiza muchos de los procesos por los que tiene que pasar el código, para de tal modo enfocarse en un mejor rendimiento y experiencia de desarrollo.
- Pre-bundling
- Dependency resolving
- Hot module replacement (HMR)
- Importación de archivos
- Integración simple con TypeScript
- Optimizacion para produccion
- Soporte a Web Workers y Web Assembly
